import { trackEvent } from "./tracking";

const GoogleTracking = (
  /** @type {{ action: any; category: any; label: any; value: any; }} */ eventProps,
  /** @type {() => void} */ originalOnClick,
) => {
  return () => {
    if (eventProps) {
      trackEvent(eventProps);
    }
    if (originalOnClick) {
      originalOnClick();
    }
  };
};

export default GoogleTracking;
