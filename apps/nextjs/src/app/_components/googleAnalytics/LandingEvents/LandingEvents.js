import GoogleTracking from "../googleTracking";

export const TextToVoiceClick = GoogleTracking({
  action: "TextToVoiceLandingButton",
  category: "LandingPage",
  label: "Text to speech landing buton in hero section",
  value: "Click",
});

export const landingPageButtonClick = GoogleTracking({
  action: "landing_page_button_press",
  category: "navigation",
  label: "Landing page button pressed",
  value: "Home",
});
