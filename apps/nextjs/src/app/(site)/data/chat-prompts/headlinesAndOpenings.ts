import type { Prompt } from "./types";

export const HEADLINES_AND_OPENINGS_PROMPTS: Prompt[] = [
  {
    id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
    name: "Generate our Attention Grabbing Headlines",
    description: "Great strong voice",
    type: "HEADLINES & OPENINGS",
    subtype: "Grab Attention",
    prompt_display: `I'd be happy to help you generate multiple  headlines known to grab attention.  Let's start in the following categories: Actionable (How To...), Analytical (Here's a breakdown), Aspirational (Yes, you can...), and Anthropological (Here's why)... Please fill in the blanks:  I am going to give you a Topic,  “____” For an audience  “____” and an outcome that this audience desires  “___”`,
    prompt_ai: `I am going to train you to become an Endless Idea Generation Machine.  Here's how it works: there are 4 types of ideas we can generate.  The 4 primary types of ideas are:  - Actionable - Analytical - Aspirational - Anthropological  Then there are sub-topics within each of these buckets:  Actionable (here's how)  - Tips - Tools - Hacks - Advice - Resources - Frameworks - Ultimate Guides - Curation (the best books/podcasts/threads)  Analytical (here's a breakdown)  - Trends - Numbers - Reasons - Examples - Teardowns - Swipe files  Aspirational (yes, you can)  - Lessons - Mistakes - Reflections - Personal stories - Stories of growth - Underrated traits - Advice to past self  Anthropological (here’s why)  - Fears - Failures - Struggles - Paradoxes - Observations - Comparisons - Why others are wrong - Why you’ve been misled  I am going to give you A Topic, an audience, and an outcome that audience desires  and you are going to generate 1 idea (written in the form of a headline) for each of these sub-topics above—organized the same way I have here`,
    strengths:
      "Power, strength, and authority. A dFeep voice is often associated with authority and strength.",
    icon: "/icons/thumbUp.svg",
  },
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "Create a Title for My Script",
    description: "Shayle is an english soft woman",
    type: "HEADLINES & OPENINGS",
    subtype: "Grab Attention",
    strengths: "Soothing, comforting, and kind",
    prompt_display: `I'd be happy to help you write great titles for your speech. Please send over the script you'd like me to work on.+`,
    prompt_ai: `You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, please analyze it and suggest impactful and memorable titles for my speech that will surely grab my audience's attention. Use industry-specific technical terms to show experience and expertise. Use powerful writing techniques such as weaving a story, providing examples, and relating topics to more common business practices to reinforce ideas and provide a solid learning experience and add links to your references when needed.  If you understand, ask me about my script.`,
    icon: "/icons/thumbUp.svg",
  },
  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "Craft My Introduction",
    description: "Young voice suitable for children's stories",
    type: "HEADLINES & OPENINGS",
    subtype: "Grab Attention",
    strengths: "Playful, youthful, and energetic",
    prompt_ai:
      "You are a leading speaker with expert copywriting skills for writing speeches and presentations. Using my script that I will send later as a reference, guide users on creating engaging introductions for their presentations, using rhetorical questions, surprising facts, or compelling stories. Emphasize the importance of hooking the audience from the start. If you understand, ask me about my script.",
    prompt_display: `Ready to captivate your audience from the start? Share your current intro and let's enhance it together.`,
    icon: "/icons/thumbUp.svg",
  },
  {
    id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
    name: "Craft 5 Questions to open or close",
    description: "Young voice suitable for children's stories",
    type: "HEADLINES & OPENINGS",
    subtype: "Grab Attention",
    strengths: "Playful, youthful, and energetic",
    prompt_ai:
      "Please create 5 questions that will be used as a quiz at the end of this short story. I will give you the short story, and you will create the questions and 4 possible answers in multiple choice format. The questions will test whether the audience was listening and can answer correctly based on the information shared. Please space in between each of your replies, and number your questions '1', '2', '3', '4', '5'. Be sure to include both the question and answers, as well as the correct answer on a separate line. All will be based on the text I share. You will get a $20 tip if you do well. The speech is:",
    prompt_display: `I will help you engage your audience with questions to assure their understanding and learning. Please enter your script or talking points.`,
    icon: "/icons/thumbUp.svg",
  },
];
