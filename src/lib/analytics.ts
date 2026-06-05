export const GA_MEASUREMENT_ID = "G-Q7FB1SRK26";
const VISIT_COUNT_KEY = "biolink:visit-count";

type GtagCommand = "config" | "event";

type GtagFn = (
  command: GtagCommand,
  targetIdOrEventName: string,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

export const isAnalyticsEnabled = () => Boolean(window.gtag);

export const trackPageView = (path: string, title: string) => {
  if (!window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  });
};

export const trackSiteOpen = (pathname: string) => {
  const currentCount = Number(localStorage.getItem(VISIT_COUNT_KEY) || "0");
  const nextCount = currentCount + 1;
  localStorage.setItem(VISIT_COUNT_KEY, String(nextCount));

  if (!window.gtag) return;

  const navType =
    performance.getEntriesByType("navigation")[0]?.type ?? "navigate";

  window.gtag("event", "Total Users", {
    page_path: pathname,
    visit_count: nextCount,
    navigation_type: navType,
    is_first_visit: nextCount === 1,
  });
};
