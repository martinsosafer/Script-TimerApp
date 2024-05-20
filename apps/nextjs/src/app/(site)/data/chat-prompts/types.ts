export const types = [
  "HEADLINES & OPENINGS",
  "IMPROVE YOUR SPEECH",
  "ENHANCE YOUR PRESENTATION",
  "BOOST YOUR VIDEO SCRIPT",
  "IMPROVE SALES",
] as const;

export const headlinesAndopeningSubtypes = ["Grabb Attention"] as const;

export const improveYourSpeechsubtypes = [
  "Essential Speech Improvements",
  "Manuscripts",
  "Conmemorative Speech",
  "Pitch Speech",
] as const;

export const enhanceYourPresentationSubtypes = [
  "Presentation Boost",
  "School reports",
  "PowerPoint Presentations",
  "Informative Presentations",
  "Persuasive Presentations",
  "Training Presentations",
] as const;

export const boostYourVideoScriptSubtypes = [
  "Business Videos Scripts",
  "Explainer Videos",
  "Video Interviews",
  "Videos for School",
  "Short Films",
  "Youtube Vlogs",
  "TikTok Videos",
] as const;

export const improveSalesSubtypes = [
  "B2B Sales",
  "B2C Sales",
  "Pitch Decks",
  "Effective Demos",
  "Direct Sales",
  "Business Development Sales",
  "LinkedIn Posts (with keywords)",
] as const;

export type PromptType = (typeof types)[number];

export type PromptSubType = (
  | typeof improveYourSpeechsubtypes
  | typeof headlinesAndopeningSubtypes
  | typeof enhanceYourPresentationSubtypes
  | typeof boostYourVideoScriptSubtypes
  | typeof improveSalesSubtypes
)[number];

export interface Prompt {
  id: string;
  name: string;
  description: string;
  prompt_display: string;
  prompt_ai: string;
  strengths?: string;
  type: PromptType;
  subtype: PromptSubType;
  icon: string;
}
