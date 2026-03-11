export const CurrencyCode = {
    TRY: "TRY",
    EUR: "EUR",
    USD: "USD",
    GBP: "GBP"
} as const;
export type CurrencyCode = (typeof CurrencyCode)[keyof typeof CurrencyCode];
export const TransactionStatus = {
    DRAFT: "DRAFT",
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
} as const;
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
export const Direction = {
    INCOME: "INCOME",
    EXPENSE: "EXPENSE",
    NEUTRAL: "NEUTRAL"
} as const;
export type Direction = (typeof Direction)[keyof typeof Direction];
export const CalculationType = {
    FIXED: "FIXED",
    PERCENTAGE: "PERCENTAGE"
} as const;
export type CalculationType = (typeof CalculationType)[keyof typeof CalculationType];
export const Effect = {
    ADD: "ADD",
    SUBTRACT: "SUBTRACT"
} as const;
export type Effect = (typeof Effect)[keyof typeof Effect];
export const ShareStatus = {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED",
    SPAM: "SPAM"
} as const;
export type ShareStatus = (typeof ShareStatus)[keyof typeof ShareStatus];
export const ShareRole = {
    VIEWER: "VIEWER",
    EDITOR: "EDITOR"
} as const;
export type ShareRole = (typeof ShareRole)[keyof typeof ShareRole];
