import type { CurrencyCodeType } from "@excolog/database";
import { db } from "@excolog/database";

/**
 * Get the current exchange rate for a currency (rate to TRY)
 * TRY always returns 1
 */
export async function getExchangeRate(
  currency: CurrencyCodeType,
): Promise<number> {
  if (currency === "TRY") {
    return 1;
  }

  const rate = await db
    .selectFrom("ExchangeRate")
    .select("rate")
    .where("currency", "=", currency)
    .executeTakeFirst();

  return rate?.rate ?? 1;
}

/**
 * Get all exchange rates at once for better performance
 * Returns a map of currency -> rate
 */
export async function getAllExchangeRates(): Promise<
  Record<CurrencyCodeType, number>
> {
  const rates = await db
    .selectFrom("ExchangeRate")
    .select(["currency", "rate"])
    .execute();

  const rateMap: Record<string, number> = {
    TRY: 1, // TRY is always 1
  };

  for (const rate of rates) {
    rateMap[rate.currency] = rate.rate;
  }

  return rateMap as Record<CurrencyCodeType, number>;
}

/**
 * Convert amount to TRY using the current exchange rate
 */
export async function convertToTry(
  amount: number,
  currency: CurrencyCodeType,
): Promise<number> {
  if (currency === "TRY") {
    return amount;
  }

  const rate = await getExchangeRate(currency);
  return amount * rate;
}

/**
 * Update or create exchange rate
 */
export async function upsertExchangeRate(
  currency: CurrencyCodeType,
  rate: number,
  source?: string,
) {
  if (currency === "TRY") {
    throw new Error("Cannot set exchange rate for TRY");
  }

  const existing = await db
    .selectFrom("ExchangeRate")
    .select("id")
    .where("currency", "=", currency)
    .executeTakeFirst();

  if (existing) {
    return db
      .updateTable("ExchangeRate")
      .set({
        rate,
        source: source ?? "manual",
        updatedAt: new Date(),
      })
      .where("currency", "=", currency)
      .returningAll()
      .executeTakeFirst();
  }

  return db
    .insertInto("ExchangeRate")
    .values({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      currency,
      rate,
      source: source ?? "manual",
    })
    .returningAll()
    .executeTakeFirst();
}

/**
 * List all exchange rates
 */
export async function listExchangeRates() {
  return db.selectFrom("ExchangeRate").selectAll().execute();
}

/**
 * Fetch exchange rates from free API (exchangerate-api.com)
 * @param baseCurrency - Base currency (default: TRY)
 * @returns Exchange rates for EUR and USD relative to TRY
 */
export async function fetchExchangeRatesFromAPI(
  baseCurrency: "TRY" = "TRY",
): Promise<{ EUR: number; USD: number } | null> {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`,
    );

    if (!response.ok) {
      console.error("Failed to fetch exchange rates:", response.statusText);
      return null;
    }

    const data = await response.json();

    if (!data.rates || !data.rates.EUR || !data.rates.USD) {
      console.error("Invalid response format from exchange rate API");
      return null;
    }

    // API returns rates FROM TRY, so 1 TRY = X EUR/USD
    // We need rates TO TRY, so we need to invert
    // If 1 TRY = 0.02 EUR, then 1 EUR = 50 TRY
    return {
      EUR: 1 / data.rates.EUR,
      USD: 1 / data.rates.USD,
    };
  } catch (error) {
    console.error("Error fetching exchange rates from API:", error);
    return null;
  }
}

/**
 * Update exchange rates from API
 * Fetches latest rates and updates the database
 * @returns Updated exchange rates or null if failed
 */
export async function updateExchangeRatesFromAPI(): Promise<{
  success: boolean;
  rates?: { EUR: number; USD: number };
  error?: string;
}> {
  const rates = await fetchExchangeRatesFromAPI("TRY");

  if (!rates) {
    return {
      success: false,
      error: "Failed to fetch exchange rates from API",
    };
  }

  try {
    await Promise.all([
      upsertExchangeRate("EUR", rates.EUR, "api"),
      upsertExchangeRate("USD", rates.USD, "api"),
    ]);

    return {
      success: true,
      rates,
    };
  } catch (error) {
    console.error("Error updating exchange rates in database:", error);
    return {
      success: false,
      error: "Failed to update exchange rates in database",
    };
  }
}
