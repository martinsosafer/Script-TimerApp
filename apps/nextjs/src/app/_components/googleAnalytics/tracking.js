/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const trackEvent = ({ action, category, label, value }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
