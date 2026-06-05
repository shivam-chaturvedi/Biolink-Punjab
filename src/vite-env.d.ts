/// <reference types="vite/client" />

interface Window {
  gtag?: (
    command: "config" | "event",
    targetIdOrEventName: string,
    params?: Record<string, unknown>
  ) => void;
  dataLayer?: unknown[];
}
