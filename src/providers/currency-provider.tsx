"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  availableCurrencies,
  convertAmount,
  DEFAULT_DISPLAY_CURRENCY,
  ExchangeRates,
  FALLBACK_RATES,
  formatCurrency,
  getExchangeRates,
  PRICING_BASE_CURRENCY,
  detectCurrency,
} from "@/lib/currency";
import type { CurrencyCode } from "@/lib/currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  baseCurrency: CurrencyCode;
  exchangeRates: ExchangeRates;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amount: number, options?: { currency?: CurrencyCode; locale?: string }) => string;
  convertPrice: (amount: number, targetCurrency?: CurrencyCode) => number;
  supportedCurrencies: CurrencyCode[];
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const initialExchangeRates: ExchangeRates = {
  base: PRICING_BASE_CURRENCY,
  rates: {
    ...FALLBACK_RATES,
    [PRICING_BASE_CURRENCY]: 1,
  },
  fetchedAt: Date.now(),
  source: "fallback",
};

export function CurrencyProvider({
  children,
  defaultCurrency,
}: {
  children: React.ReactNode;
  defaultCurrency?: CurrencyCode;
}) {
  const [currency, setCurrency] = useState<CurrencyCode>(
    defaultCurrency || detectCurrency(DEFAULT_DISPLAY_CURRENCY)
  );
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(initialExchangeRates);

  // Fetch live rates once per session; fallback rates keep UI responsive.
  useEffect(() => {
    let isMounted = true;

    getExchangeRates(PRICING_BASE_CURRENCY)
      .then((data) => {
        if (!isMounted) return;
        setExchangeRates(data);
      })
      .catch(() => {
        // Already defaulted to fallback rates; no-op.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const supportedCurrencies = useMemo(() => availableCurrencies(), []);

  const normalizeCurrency = useCallback(
    (code?: CurrencyCode): CurrencyCode =>
      (code || currency || DEFAULT_DISPLAY_CURRENCY).toUpperCase(),
    [currency]
  );

  const convertPrice = useCallback(
    (amount: number, targetCurrency?: CurrencyCode) =>
      convertAmount(
        amount,
        PRICING_BASE_CURRENCY,
        normalizeCurrency(targetCurrency),
        exchangeRates
      ),
    [exchangeRates, normalizeCurrency]
  );

  const formatPrice = useCallback(
    (amount: number, options?: { currency?: CurrencyCode; locale?: string }) => {
      const targetCurrency = normalizeCurrency(options?.currency);
      const converted = convertPrice(amount, targetCurrency);
      return formatCurrency(converted, targetCurrency, options?.locale);
    },
    [convertPrice, normalizeCurrency]
  );

  const value: CurrencyContextValue = {
    currency,
    baseCurrency: PRICING_BASE_CURRENCY,
    exchangeRates,
    setCurrency: (code: CurrencyCode) => setCurrency(code.toUpperCase()),
    formatPrice,
    convertPrice,
    supportedCurrencies,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = (): CurrencyContextValue => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

