import dayjs from "./dayjs";

/**
 * @description dayjs'in humanize işlemi çok yuvarlama yapıyor. Direkt değere ihtiyacımız olduğunda bu utili kullanın.
 * @example Örnek çıktı: 90 saniye -> 1 dakika 30 saniye (humanize ile: 2 dakika)
 * @param duration - saniye cinsinden süre
 * @returns yıl, ay, gün,saat, dakika, saniye cinsinden süre
 */
function formatReadingTime(duration: number) {
  if (duration <= 0) return "Geçersiz süre";

  const computedDuration = dayjs.duration(duration, "seconds");
  /**
   * 60'ın katları olan dakika ve saniye değerleri bir üste dönüşebilir ve bu değer 0 olabilir. Ayrıca saat ve dakika direkt 0 da olabilir. Fakat biz
   * 12 saat 0 dakika 5 saniye veya 0 saat 0 dakika 56 saniye gibi bir gösterim istemeyiz. Bu koşulları kontrol etmek için bir array oluşturup ilgili değerler
   * varsa push ediyor, sonunda join edilmiş halini return ediyoruz.
   */
  const timeParts = [];

  const years = computedDuration.years();
  const months = computedDuration.months();
  const days = computedDuration.days();
  const hours = computedDuration.hours();
  const minutes = computedDuration.minutes();
  const seconds = computedDuration.seconds();

  if (years > 0) timeParts.push(`${years} yıl`);
  if (months > 0) timeParts.push(`${months} ay`);
  if (days > 0) timeParts.push(`${days} gün`);
  if (hours > 0) timeParts.push(`${hours} saat`);
  if (minutes > 0) timeParts.push(`${minutes} dakika`);
  if (seconds > 0) timeParts.push(`${seconds} saniye`);

  return timeParts.join(" ");
}

export default formatReadingTime;
