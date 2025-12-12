// Centralized currency utilities for detection, conversion, and formatting.
// Designed to be framework-agnostic so it can be reused in services,
// server components, and client-side hooks.

export type CurrencyCode = string;

export type ExchangeRates = {
  base: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  fetchedAt: number;
  source: "live" | "fallback";
};

const ONE_HOUR_MS = 60 * 60 * 1000;

// Base currency for storing product prices in the system.
export const PRICING_BASE_CURRENCY: CurrencyCode =
  process.env.NEXT_PUBLIC_PRICING_BASE_CURRENCY?.toUpperCase() || "USD";

// Default currency to display if detection fails or product forces a currency.
export const DEFAULT_DISPLAY_CURRENCY: CurrencyCode =
  process.env.NEXT_PUBLIC_DEFAULT_CURRENCY?.toUpperCase() || PRICING_BASE_CURRENCY;

// Static fallback rates to avoid blank states when live rates are unavailable.
export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  INR: 83.1,
  PKR: 278.5,
  AED: 3.67,
  CAD: 1.37,
  AUD: 1.55,
  JPY: 152.4,
  CNY: 7.24,
};

// Region to primary currency mapping (extend as needed).
const REGION_TO_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD",
  CA: "CAD",
  GB: "GBP",
  EU: "EUR",
  IN: "INR",
  PK: "PKR",
  AE: "AED",
  AU: "AUD",
  NZ: "NZD",
  SG: "SGD",
  JP: "JPY",
  CN: "CNY",
};

let cachedRates: ExchangeRates | null = null;

const buildFallbackRates = (base: CurrencyCode): ExchangeRates => ({
  base,
  rates: {
    ...FALLBACK_RATES,
    [base]: 1,
  },
  fetchedAt: Date.now(),
  source: "fallback",
});

const getLocale = (): string => {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return "en-US";
};

const localeToRegion = (locale: string): string | undefined => {
  try {
    // Intl.Locale provides robust region parsing when available.
    // Fall back silently if runtime does not support it.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const intlLocale = new Intl.Locale(locale);
    return intlLocale?.maximize?.().region;
  } catch {
    return undefined;
  }
};

export const detectCurrency = (
  fallback: CurrencyCode = DEFAULT_DISPLAY_CURRENCY
): CurrencyCode => {
  if (typeof navigator !== "undefined") {
    const locales = navigator.languages ?? [navigator.language];
    for (const locale of locales) {
      const region = localeToRegion(locale);
      if (region && REGION_TO_CURRENCY[region]) {
        return REGION_TO_CURRENCY[region];
      }
    }
  }
  return fallback;
};

const fetchLiveRates = async (base: CurrencyCode): Promise<Record<string, number>> => {
  const endpoint =
    process.env.NEXT_PUBLIC_EXCHANGE_RATE_API ||
    `https://open.er-api.com/v6/latest/${base}`;

  const response = await fetch(endpoint, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates (${response.status})`);
  }

  const data = await response.json();

  // Support the Open ER API response shape
  if (data.result === "success" && data.rates) {
    return data.rates as Record<string, number>;
  }

  // Support generic "rates" payloads
  if (data.rates) {
    return data.rates as Record<string, number>;
  }

  throw new Error("Unexpected exchange rates payload");
};

export const getExchangeRates = async (
  base: CurrencyCode = PRICING_BASE_CURRENCY
): Promise<ExchangeRates> => {
  const now = Date.now();

  if (
    cachedRates &&
    cachedRates.base === base &&
    now - cachedRates.fetchedAt < ONE_HOUR_MS
  ) {
    return cachedRates;
  }

  try {
    const liveRates = await fetchLiveRates(base);
    cachedRates = {
      base,
      rates: {
        ...liveRates,
        [base]: 1,
      },
      fetchedAt: now,
      source: "live",
    };
    return cachedRates;
  } catch (error) {
    console.error("Using fallback exchange rates:", error);
    cachedRates = buildFallbackRates(base);
    return cachedRates;
  }
};

export const convertAmount = (
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  exchange: ExchangeRates
): number => {
  if (!Number.isFinite(amount)) return 0;
  if (from === to) return amount;

  const toRate = exchange.rates[to];
  if (!toRate) return amount;

  if (from === exchange.base) {
    return amount * toRate;
  }

  const fromRate = exchange.rates[from];
  if (!fromRate) return amount;

  const amountInBase = amount / fromRate;
  return amountInBase * toRate;
};

export const formatCurrency = (
  amount: number,
  currency: CurrencyCode,
  locale?: string
): string => {
  const formatter = new Intl.NumberFormat(locale || getLocale(), {
    style: "currency",
    currency,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
};

export const convertAndFormat = (
  amount: number,
  targetCurrency: CurrencyCode,
  exchange: ExchangeRates,
  options?: { locale?: string; fromCurrency?: CurrencyCode }
): string => {
  const value = convertAmount(
    amount,
    options?.fromCurrency || exchange.base,
    targetCurrency,
    exchange
  );
  return formatCurrency(value, targetCurrency, options?.locale);
};

export const availableCurrencies = (): CurrencyCode[] =>
  Array.from(new Set([...Object.keys(FALLBACK_RATES), PRICING_BASE_CURRENCY]));


