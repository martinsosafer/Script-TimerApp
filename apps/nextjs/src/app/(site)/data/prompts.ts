export const types = [
  "GRAB ATTENTION WITH HEADLINES & OPENINGS",
  "IMPROVE YOUR SPEECH",
  "ENHANCE YOUR PRESENTATION",
  "BOOST YOUR VIDEO SCRIPT",
  "IMPROVE SALES",
] as const;

export type PromptType = (typeof types)[number];

export interface Prompt<Type = string> {
  id: string;
  name: string;
  description: string;
  prompt_display: string;
  prompt_ai: string;
  strengths?: string;
  type: Type;
}

export const prompts: Prompt<PromptType>[] = [
  {
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "GENERATE FOUR ATTENTION GRABBING HEADLINES",
    description: "Great strong voice",
    type: "GRAB ATTENTION WITH HEADLINES & OPENINGS",
    prompt_display: `I'd be happy to help you generate multiple  headlines known to grab attention.  Let's start in the following categories: Actionable (How To...), Analytical (Here's a breakdown), Aspirational (Yes, you can...), and Anthropological (Here's why)... Please fill in the blanks:  I am going to give you a Topic,  “____” For an audience  “____” and an outcome that this audience desires  “___”`,
    prompt_ai: `I am going to train you to become an Endless Idea Generation Machine.  Here's how it works: there are 4 types of ideas we can generate.  The 4 primary types of ideas are:  - Actionable - Analytical - Aspirational - Anthropological  Then there are sub-topics within each of these buckets:  Actionable (here's how)  - Tips - Tools - Hacks - Advice - Resources - Frameworks - Ultimate Guides - Curation (the best books/podcasts/threads)  Analytical (here's a breakdown)  - Trends - Numbers - Reasons - Examples - Teardowns - Swipe files  Aspirational (yes, you can)  - Lessons - Mistakes - Reflections - Personal stories - Stories of growth - Underrated traits - Advice to past self  Anthropological (here’s why)  - Fears - Failures - Struggles - Paradoxes - Observations - Comparisons - Why others are wrong - Why you’ve been misled  I am going to give you A Topic, an audience, and an outcome that audience desires  and you are going to generate 1 idea (written in the form of a headline) for each of these sub-topics above—organized the same way I have here`,
    strengths:
      "Power, strength, and authority. A deep voice is often associated with authority and strength.",
  },
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "CREATE A TITLE FOR MY SCRIPT",
    description: "Shayle is an english soft woman",
    type: "GRAB ATTENTION WITH HEADLINES & OPENINGS",
    strengths: "Soothing, comforting, and kind",
    prompt_display: `I'd be happy to help you write great titles for your speech. Please send over the script you'd like me to work on.`,
    prompt_ai: `You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, please analyze it and suggest impactful and memorable titles for my speech that will surely grab my audience's attention. Use industry-specific technical terms to show experience and expertise. Use powerful writing techniques such as weaving a story, providing examples, and relating topics to more common business practices to reinforce ideas and provide a solid learning experience and add links to your references when needed.  If you understand, ask me about my script.`,
  },
  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "CRAFT MY INTRODUCTION",
    description: "Young voice suitable for children's stories",
    type: "GRAB ATTENTION WITH HEADLINES & OPENINGS",
    strengths: "Playful, youthful, and energetic",
    prompt_ai:
      "You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, guide users on creating engaging introductions for their presentations, using rhetorical questions, surprising facts, or compelling stories. Emphasize the importance of hooking the audience from the start. If you understand, ask me about my script.",
    prompt_display: `Ready to captivate your audience from the start? Share your current intro and let's enhance it together.`,
  },
  {
    id: "be638fb1-973b-4471-a49c-290325085802",
    name: "Suggest great endings & call em' to action",
    description:
      "Friendly, conversational, and easy to listen to. This voice is great for long-form content.",
    type: "IMPROVE YOUR SPEECH",
    strengths:
      "Reading long-form content, such as articles, books, and other media",
    prompt_ai: `You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, please analyze it and suggest an impactful ending and call to action for my speech that will surely grab my audience's attention. Use industry-specific technical terms to show experience and expertise. Use powerful writing techniques such as weaving a story, providing examples, and relating topics to more common business practices to reinforce ideas and provide a solid learning experience and add links to your references when needed.  If you understand, ask me about my script.`,
    prompt_display: `I'd be happy to help you write a great ending and call to action for your speech. Please send over the script you'd like me to work on.`,
  },
  {
    id: "5a0bddef-2fee-499e-8ae8-ef35dc719163",
    name: "Make my speech less boring",
    description:
      "Friendly, conversational, and easy to listen to. This voice is great for long-form content.",
    type: "IMPROVE YOUR SPEECH",
    strengths:
      "Reading long-form content, such as articles, books, and other media",
    prompt_ai: `You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, please analyze it to make it less boring by adding spice and exciting stuff. Use industry-specific technical terms to show experience and expertise. Use powerful writing techniques such as weaving a story, providing examples, and relating topics to more common business practices to reinforce ideas and provide a solid learning experience and add links to your references when needed.  If you understand, ask me about my script.`,
    prompt_display: `I'd be happy to help make your speech more exciting. Please send over the script you'd like me to work on.`,
  },
  {
    id: "346b756a-a602-46ba-946f-95f4ca24bf1f",
    name: "Turn my speech into TedTalk",
    description:
      "Friendly, conversational, and easy to listen to. This voice is great for long-form content.",
    type: "IMPROVE YOUR SPEECH",
    strengths:
      "Reading long-form content, such as articles, books, and other media",
    prompt_ai: `You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, please improve it and compose key elements of TED Talk-style speeches that I can incorporate. Use industry-specific technical terms to show experience and expertise. Use powerful writing techniques such as weaving a story, providing examples, and relating topics to more common business practices to reinforce ideas and provide a solid learning experience and add links to your references when needed.  If you understand, ask me about my script.`,
    prompt_display: `I'd be happy to help you TED Talk-ify your speech. Please send over the script you'd like me to work on.`,
  },
  {
    id: "9facf58f-9980-4a3a-ac06-2e669d7a76e2",
    name: "Add Humor that Works",
    description:
      "Friendly, conversational, and easy to listen to. This voice is great for long-form content.",
    type: "IMPROVE YOUR SPEECH",
    strengths:
      "Reading long-form content, such as articles, books, and other media",
    prompt_ai: `You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, What types of humor can I incorporate into my speech to engage the audience? If you understand, ask me about my script.`,
    prompt_display: `I'd be happy to make your speech more fun. Please send over the script you'd like me to work on.`,
  },
  {
    id: "ce0ce3a2-8205-472f-b4c4-dd88eabbb76e",
    name: "Storytelling Secrets",
    description:
      "Friendly, conversational, and easy to listen to. This voice is great for long-form content.",
    type: "IMPROVE YOUR SPEECH",
    strengths:
      "Reading long-form content, such as articles, books, and other media",
    prompt_ai: `You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, How can I effectively use storytelling to make my speech more relatable and memorable? If you understand, ask me about my script.`,
    prompt_display: `I'd be happy to help improve your storytelling prowess. Please send over the script you'd like me to work on.`,
  },
  {
    id: "4e7d193c-ae11-44fd-b082-b077d0184ae3",
    name: "Interactive Q&A Sessions",
    description:
      "Friendly, conversational, and easy to listen to. This voice is great for long-form content.",
    type: "IMPROVE YOUR SPEECH",
    strengths:
      "Reading long-form content, such as articles, books, and other media",
    prompt_ai: `You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, How can I effectively manage and engage with the audience during Q&A sessions? If you understand, ask me about my script.`,
    prompt_display: `I'd be happy to help improve your Q&A Interactions. Please send over the script you'd like me to work on.`,
  },
  {
    id: "defbd3f2-0649-4973-a609-d7de18b08687",
    name: "Audience Engagement Techniques",
    description:
      "Friendly, conversational, and easy to listen to. This voice is great for long-form content.",
    type: "IMPROVE YOUR SPEECH",
    strengths:
      "Reading long-form content, such as articles, books, and other media",
    prompt_ai: `You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, What methods can I use to keep the audience interested and involved throughout my speech? If you understand, ask me about my script.`,
    prompt_display: `I'd be happy to help you with engagement techniques based on your speech. Please send over the script you'd like me to work on.`,
  },
  {
    id: "caf635a1-362c-42f8-9911-3d60571d96b3",
    name: "Craft a Compelling Story",
    description:
      "Friendly, conversational, and easy to listen to. This voice is great for long-form content.",
    type: "IMPROVE YOUR SPEECH",
    strengths:
      "Reading long-form content, such as articles, books, and other media",
    prompt_ai: `You specialize in crafting engaging speech manuscripts. Assist the user in developing a strong narrative for their speech, focusing on building a coherent and compelling storyline that resonates with the audience. If you understand, ask me about my script.`,
    prompt_display: `Let's create a narrative that captivates. Share your manuscript draft, and I'll help weave a compelling story.`,
  },
  {
    id: "736e3812-42aa-48a4-90d3-db543aed87bb",
    name: "Incorporate Strong Openings and Closings",
    description:
      "Friendly, conversational, and easy to listen to. This voice is great for long-form content.",
    type: "IMPROVE YOUR SPEECH",
    strengths:
      "Reading long-form content, such as articles, books, and other media",
    prompt_ai: `You are experienced in creating impactful speech manuscripts. Guide the user on writing strong openings and closings for their speech, ensuring they grab attention at the beginning and leave a lasting impression at the end. If you understand, ask me about my script.`,
    prompt_display: `Start and end with impact. Share your speech, and let's craft memorable openings and conclusions.`,
  },
  //   {
  //     id: "b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb",
  //     name: "MANUSCRIPTS",
  //     description:
  //       "Most general voice. This voice is great for most use cases, and is the default voice for most applications.",
  //     type: "IMPROVE YOUR SPEECH",
  //   },
  //   {
  //     id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
  //     name: "COMMEMORATIVE SPEECH",
  //     description:
  //       "Actionable young voice. This voice is great for short-form content, such as ads, and other media where a call to action is required.",
  //     type: "IMPROVE YOUR SPEECH",
  //     strengths: "Action and comic books",
  //   },
  //   {
  //     id: "bbd57291-4622-4a21-9eed-dd6bd786fdd2",
  //     name: "PITCH SPEECH",
  //     description:
  //       "Actionable young voice. This voice is great for short-form content, such as ads, and other media where a call to action is required.",
  //     type: "IMPROVE YOUR SPEECH",
  //     strengths: "Action and comic books",
  //   },
];
