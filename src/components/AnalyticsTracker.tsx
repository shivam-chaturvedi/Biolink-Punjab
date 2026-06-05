import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackSiteOpen } from "@/lib/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackSiteOpen(location.pathname);
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsTracker;
