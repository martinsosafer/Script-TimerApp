export const types = ["Woman", "Man"] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
}

export const models: Model<ModelType>[] = [
  {
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "Lisa",
    description: "Great strong voice",
    type: "Woman",
    strengths:
      "Power, strength, and authority. A deep voice is often associated with authority and strength.",
  },
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "Shayle",
    description: "Shayle is an english soft woman",
    type: "Woman",
    strengths: "Soothing, comforting, and kind",
  },

  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "Mary",
    description: "Young voice suitable for children's stories",
    type: "Woman",
    strengths: "Playful, youthful, and energetic",
  },
  {
    id: " be638fb1-973b-4471-a49c-290325085802",
    name: "Lamar",
    description:
      "Friendly, conversational, and easy to listen to. This voice is great for long-form content.",
    type: "Man",
    strengths:
      "Reading long-form content, such as articles, books, and other media",
  },
  {
    id: "b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb",
    name: "Mike",
    description:
      "Most general voice. This voice is great for most use cases, and is the default voice for most applications.",
    type: "Man",
  },
  {
    id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
    name: "Robin",
    description:
      "Actionable young voice. This voice is great for short-form content, such as ads, and other media where a call to action is required.",
    type: "Man",
    strengths: "Action and comic books",
  },
];
