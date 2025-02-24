import type { StaticImageData } from "next/image";

import {
  AimHigherThan,
  AiToolsThatSalesAndMarketersNeed,
  AnalyzeVistualCalls,
  AnMBAInSalesUsingChatGPT,
  AskRelatableQuestions,
  Breakdown,
  BuildBetterCustomerJourneysWithAI,
  BuildRapportByBeingReal,
  ContinueTransforming,
  ContinuingToStrengthen,
  ControlTheRoom,
  CourseOverview,
  CreateAnElegantPresentation,
  CreateExplainerVideosHeyGen,
  CreateImpactInYour,
  CustomerJourney,
  DesignAndLayoutYourLandingPage,
  DiscoverThePain,
  ElevatorPitch,
  Empathy,
  EngageAndEstablish,
  EpicCaptureStory,
  ExecDec,
  ExpandYourCareer,
  ExploreUsingAiToCreate,
  ExploreUsingAiToCreate2,
  GenerateALeadMagnetWithAI,
  HowToSparkBrandAwarenessWithAIGFX,
  IdentifyYourProspect,
  IntegrateSoftwareWithZapier,
  InternalSmartPages,
  Intro,
  LearnToLove,
  LeverageBenefits,
  LeverageDifferent,
  Listen,
  LoseYourAgenda,
  MakeAProductDemoVideo,
  MicroStories,
  MountainTop,
  NextSteps,
  OnTeam,
  OpeningAStory,
  PostProductionSecrets,
  RapportBuildingIs,
  RelaxMirrorAnd,
  RepurposingContentForGlobalAudience,
  RetainAndGrow,
  ScriptTemplates,
  SelectingTheRight,
  ShutDownTheDistractions,
  SocialMediaPostsForYourBusinessWithAI,
  SpiceUpYourPitch,
  Story,
  TellYourCustomersAGreatStory,
  The5Emotions,
  The10Commandments,
  The10Lights,
  TheArtOfPostProduction,
  TheCloser,
  TheCreativeBrief,
  TheElementsOfA,
  TheIdeaFactory,
  TheQuest,
  TheStuff,
  TurnObstacleInto,
  UnicornSales,
  UpgradeYourPitch,
  WhatMakesAGreatSpeech,
  WhatNotToDo,
  WhatToAvoid,
  WhyIsBuildingRapportCriticalTo,
  WhySalesStories,
  WhyStoryWorks,
  Wiifm,
  WintThePerson,
} from "~/assets/masterclasses";

const MauryPic =
  "https://8ipgp5xevb8hkgbh.public.blob.vercel-storage.com/Images/MauryProfile-DQEwqsYnn5Zn6cYJmG4KRghwWCcGMe.jpg";

export interface Video {
  id: number;
  image: StaticImageData;
  number: string;
  title: string;
  name: string;
  videoUrl: string;
  avatarUrl: string;
  description: string;
  course: string;
}

const videoCardData: Video[] = [
  //STORIES THAT SPEED SALES
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "1",
    image: WhySalesStories,
    title: "Why Sales Stories Are Important",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948866900?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "The power of storytelling in sales and how it can help you connect with your customers on an emotional level, build trust, and ultimately close more deals.",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "2",
    image: SelectingTheRight,
    title: "Selecting The Right Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948867375?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Learn how to identify the perfect story to tell for each sales situation, considering your audience and the specific product or service you're selling.",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "3",
    image: The10Commandments,
    title: "The 10 commandments of Great Sales Stories",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948867513?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Discover the essential principles for crafting compelling sales stories that resonate with your customers.",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "4",
    image: The5Emotions,
    title: "The Five Emotions that Drive a Great Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948867728?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "The five key emotions that can make your sales stories more impactful and persuasive.",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "5",
    image: ElevatorPitch,
    title: "Elevator Pitch Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948868342?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Craft a concise and captivating story that effectively communicates the value proposition of your product or service in a short amount of time",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "6",
    image: EpicCaptureStory,
    title: "Epic Capture Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948868442?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Use storytelling to capture your audience's attention and paint a picture of the problem your product or service solves.",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "7",
    image: OpeningAStory,
    title: "Opening a Story With SCIPAB",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948868843?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Discover the SCIPAB framework for crafting a powerful opening for your sales stories that grabs your audience's interest from the start.",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "8",
    image: UnicornSales,
    title: "Unicorn Sales Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948868933?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Use unexpected stories to differentiate yourself and make your sales pitch more memorable.",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "9",
    image: Wiifm,
    title: "WIIFM-demo story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948869055?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Learn how to craft a WIIFM story that effectively demonstrates the value proposition of your product or service to your customer.",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "10",
    image: TheCloser,
    title: "The closer story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948869144?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This module will equip you with the skills to use storytelling techniques to close the deal and secure the sale.",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "11",
    image: RetainAndGrow,
    title: "Retain and Grow-together stories",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948869213?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Discover how to leverage storytelling to build long-term relationships with your customers and foster ongoing growth.",
  },
  {
    course: "Stories That Transform Marketing",
    id: 1,
    number: "12",
    image: NextSteps,
    title: "Next Steps",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948869335?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Put your learnings into action and effectively integrate storytelling into your sales process.",
  },
  //How to Create Stunning Videos
  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "1",
    image: CourseOverview,
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948912357?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This introductory module will provide a general introduction to the course, outlining the key concepts, topics covered, and overall objectives of this Masterclass.",
  },
  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "2",
    image: WhyStoryWorks,
    title: "Why Story Works ",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948918148?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Delve into the power of storytelling in sales and explore why stories are effective tools for capturing attention, building trust, and ultimately driving sales.",
  },
  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "3",
    image: TheQuest,
    title: "The Quest",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948918591?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Learn how to properly structure your stories, so they spark interest in your pprospects.",
  },
  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "4",
    image: CustomerJourney,
    title: "Customer Journey Value Ladder",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948919468?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=5847",
    description:
      "Understand your customer's journey and how to position your product or service as the key to overcoming challenges and achieving value at each stage.",
  },
  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "5",
    image: The10Lights,
    title: "The 10 Commandments",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948920176?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description: "Ten core principles for creating effective sales videos.",
  },
  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "6",
    image: TheStuff,
    title: "The STUFF",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948920603?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Learn structure, key talking points, unique selling features, and persuasive techniques.",
  },
  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "7",
    image: TheCreativeBrief,
    title: "The Creative Brief",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948920956?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Create a clear and concise creative brief that outlines the goals, target audience, messaging, and desired style for your sales video.",
  },
  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "8",
    image: TheIdeaFactory,
    title: " The Idea Factory",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948921422?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description: "Develop a strong sharp story that drives sales.",
  },
  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "9",
    image: ScriptTemplates,
    title: "Script Templates",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948922216?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Script templates and frameworks to serve as a foundation for crafting your sales video script.",
  },
  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "10",
    image: TheArtOfPostProduction,
    title: "The Art Of Post Production",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948922636?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This module will delve into the editing process, including techniques and tools to refine your sales video for maximum impact.",
  },

  {
    course: "How to Create Stunning Videos",
    id: 2,
    number: "11",
    image: PostProductionSecrets,
    title: " Post Production Secrets",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948922636?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Learn advanced editing tricks and secrets to elevate the production quality of your sales videos.",
  },
  //Present and Win Your Audience
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "1",
    image: Intro,
    title: "Intro",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949218099?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Overview of the course and introduction of key concepts for crafting a winning sales presentation.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "2",
    image: WhatNotToDo,
    title: "What Not To Do",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949219977?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Learn from common mistakes! This module explores pitfalls to avoid during your sales demo and presentation.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "3",
    image: Breakdown,
    title: "Breakdown",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949220808?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Deconstructing complex features of your product or service for clear explanation.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "4",
    image: DiscoverThePain,
    title: "Discover the Pain",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949228697?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Effective salespeople understand their customer's challenges. This module will equip you with techniques to identify your customer's pain points and unmet needs.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "5",
    image: Empathy,
    title: "Empathy",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949229603?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Connecting with your customer on a human level is key. This module will explore building rapport and demonstrating empathy for their situation.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "6",
    image: MountainTop,
    title: "Mountain Top",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949231492?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Painting a vivid picture of the ideal outcome your product or service can help achieve for the customer.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "7",
    image: OnTeam,
    title: "On Team",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949232232?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "How to position your company and team as a trusted partner invested in the customer's success.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "8",
    image: Story,
    title: "Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949233527?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "How to craft narratives into your sales presentation to connect with your audience emotionally.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "9",
    image: MicroStories,
    title: "Micro Stories",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949235265?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Not every story needs to be an epic. This module focus on using short, impactful stories or anecdotes to illustrate your points.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "10",
    image: ExecDec,
    title: "Exec Dec",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949235962?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Strategies to tailor your presentation to resonate with decision-makers, and close more deals.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "11",
    image: Listen,
    title: "Listen",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949236670?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Sales conversations are a two-way street. This module covers the importance of active listening and responding to your customer's questions and concerns.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "12",
    image: LeverageBenefits,
    title: "Leverage Benefits",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949237105?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Don't just list features! This module will focus on translating features into clear benefits that address the customer's needs.",
  },
  {
    course: "Present and Win Your Audience",
    id: 3,
    number: "13",
    image: NextSteps,
    title: "Next Steps",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949237603?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Next steps to follow to apply the concepts learned in this course in real-life situations.",
  },
  //Delivering a Great Virtual Sales Pitch
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "1",
    image: WhatMakesAGreatSpeech,
    title: "What Makes a Great Sales Pitch",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949264160?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "The key characteristics of a successful virtual sales pitch and differentiate it from traditional in-person presentations.",
  },
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "2",
    image: TheElementsOfA,
    title: "The Elements of a Great Sales Pitch",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949265443?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This module will break down the essential components of a compelling virtual sales pitch. We'll explore aspects like structure, content, and delivery style.",
  },
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "3",
    image: EngageAndEstablish,
    title: "Engage and Establish to Gain Prospects",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949266361?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This module will equip you with techniques to capture attention, build rapport, and convert virtual interactions into qualified leads.",
  },
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "4",
    image: IdentifyYourProspect,
    title: "Identify your Prospect's Biggest Pain Point",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949267313?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Understanding your customer's challenges is crucial. This module will equip you with strategies to uncover your prospect's most pressing pain points during a virtual pitch.",
  },
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "5",
    image: CreateImpactInYour,
    title: "Create Impact in Your Sales Pitch",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949267962?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      " Go beyond the ordinary! This module will focus on crafting impactful statements and demonstrations that resonate with your audience in a virtual setting.",
  },
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "6",
    image: AimHigherThan,
    title: "Aim higher than closing the Deal",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949268824?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Explore strategies for building long-term relationships and exceeding customer expectations beyond the initial sale.",
  },
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "7",
    image: UpgradeYourPitch,
    title: "Upgrade your Pitch With Five Key Emotions",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949269709?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "The power of emotions applies virtually too! This module will explore how to integrate specific emotions into your pitch to connect with your audience on a deeper level.",
  },
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "8",
    image: LeverageDifferent,
    title: "Leverage Different Learning Styles",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949270385?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This module will equip you with strategies to tailor your virtual pitch to accommodate various learning styles and preferences.",
  },
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "9",
    image: SpiceUpYourPitch,
    title: "Spice Up Your Pitch",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949271011?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Avoid monotony! Tips and techniques to inject creativity and keep your virtual pitch engaging throughout.",
  },
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "10",
    image: TurnObstacleInto,
    title: "Turn Obstacles Into Opportunities",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949276679?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Challenges are inevitable. Let's explore strategies for overcoming common hurdles in virtual sales presentations and turning them into opportunities to connect with your audience.",
  },
  {
    course: "Create with Hollywood Movie Storylines",
    id: 4,
    number: "11",
    image: ContinueTransforming,
    title: "Continue Transforming Your Great Pitch",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949277343?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Success is an ongoing journey. This closing module provides resources and strategies for continuous improvement and refinement of your virtual sales pitch.",
  },
  //Building Rapport on Virtual Sales Calls
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "1",
    image: WhyIsBuildingRapportCriticalTo,
    title: "Why is Building Rapport Critical To Remote Selling",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949294190?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This opening module will explore the importance of building rapport in virtual sales calls to successfully close deals.",
  },
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "2",
    image: LoseYourAgenda,
    title: "Lose Your Agenda",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949295137?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Don't push the sale, you're there to serve and help your customers. And you need to make that clear.",
  },
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "3",
    image: ShutDownTheDistractions,
    title: "Shut Down the Distractions",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949295840?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Creating a focused environment is key. Let's explore strategies for minimizing distractions on both your end and potentially helping the customer do the same, ensuring a productive virtual call.",
  },
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "4",
    image: ControlTheRoom,
    title: "Control the Room",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949296635?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Techniques for directing the conversation flow, establishing control over the virtual space without being dominant, and ensuring everyone feels heard.",
  },
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "5",
    image: WintThePerson,
    title: "Win the Person, Not the Sale",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949297490?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "The importance of building genuine connections with your customer, and strategies for prioritizing their needs and understanding their perspective.",
  },
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "6",
    image: BuildRapportByBeingReal,
    title: "Build Rapport By Being Real",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949298643?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Authenticity is key! Strategies for showcasing your genuine personality and building trust with your customer.",
  },
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "7",
    image: RelaxMirrorAnd,
    title: "Relax,Mirror, and Reiterate",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949299760?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "How to create a calm and comfortable virtual environment, subtly mirroring positive customer behaviors, and summarizing key points to reinforce understanding..",
  },
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "8",
    image: AskRelatableQuestions,
    title: "Ask Relatable Questions",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949300437?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Effective questioning is crucial. This module will equip you with strategies for crafting questions that resonate with your customer's experiences and encourage deeper conversation.",
  },
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "9",
    image: LearnToLove,
    title: "Learn to Love to Question Their Answers",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949301364?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Follow up on customer responses with additional questions to gain a clearer understanding of their needs and motivations.",
  },
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "10",
    image: WhatToAvoid,
    title: "What to Avoid",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949302443?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Learn to identify common pitfalls to avoid during virtual sales calls that could hinder rapport building.",
  },
  {
    course: "How to Build Rapport with Your Audience",
    id: 5,
    number: "11",
    image: RapportBuildingIs,
    title: "Rapport Building is a Learned Trait",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949303163?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Remember, building rapport is a skill that can be honed and improved through practice and active learning.",
  },
  //Customer Journey Mapping With Generative AI
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "1",
    image: AiToolsThatSalesAndMarketersNeed,
    title: "AI tools that Sales and Marketers Need",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053883585?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "The explosion of AI is helping and replacing marketing professionals. As a marketer, it means you need to step up your game and learn AI tools. As a brand, it means your sales will thrive or die based on the stories you tell more than ever before.",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "2",
    image: ExploreUsingAiToCreate,
    title: "Explore the Customer Journey GFX Cut",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053884730?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "It's not the strongest species that survive, or the most intelligent ones, but the ones that are most responsive to change. And we see that in companies because the ones that don't adapt are the ones that fail.",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "3",
    image: BuildBetterCustomerJourneysWithAI,
    title: "Build Better Customers Journeys with AI",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053885965?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "When you have a strong story and you're building it faster and getting brand awareness, you can actually charge more for your products because you're more valuable in the eyes of consumers.",
  },

  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "4",
    image: HowToSparkBrandAwarenessWithAIGFX,
    title: "How to spark brand awareness with AI GFX",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053886930?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Now we're at the Top of Funnel, and the next few videos are going to be focused on creating scripts that create videos, webinars, podcasts, social media, and drive SEO to your website.",
  },

  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "5",
    image: SocialMediaPostsForYourBusinessWithAI,
    title: "Social Media Posts for your Business with AI",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053883585?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Now that you have a great script and you've created your podcast video or long form content, take advantage of that incredible ability in AI to expand on it and create more value. ",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "6",
    image: GenerateALeadMagnetWithAI,
    title: "Generate Interest with SEO and Blogs",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053888405?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This will keep you from failing when creating content and save you thousands of dollars. You want to start with what people want to know in your industry and create and deliver content about those areas. ",
  },

  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "7",
    image: GenerateALeadMagnetWithAI,
    title: "Generate a Lead Magnet With AI",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053890108?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Simple and consumable tools, tips, and lessons are best. They're called lead magnets. It's information that people care about and they care enough that they'll give you their contact information to have a look. ",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "8",
    image: InternalSmartPages,
    title: "Internal Smart Pages on Social Platforms GFX",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053890791?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "We're now entering the middle stages of the funnel, where price only wins in the absence of value. So, adding value is paramount to everything else. Otherwise, you lose to the lowest price.",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "9",
    image: DesignAndLayoutYourLandingPage,
    title: "Design and Lay out your Landing Page and Website",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053891633?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "For some people, a view-only page is not enough. So to build trust, you need a landing page to capture leads. And now, let's go further. This is exciting. You can design a $10,000 website in minutes with no code and AI. ",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "10",
    image: AnMBAInSalesUsingChatGPT,
    title: "An MBA in Sales using ChatGPT",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053892653?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This video is kind of like earning an MBA in sales. It's here, because your job is so hard today. At the same time, consumers want to buy without help and in less time, they want more value and higher service. So you need to walk in prepared. ",
  },

  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "11",
    image: IntegrateSoftwareWithZapier,
    title: "Integrate Software with Zapier",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053894141?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "You need to get emails sent and drip campaigns started. I'd like to share with you how to cut integration expenses in half, or even more, using AI.",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "12",
    image: CreateExplainerVideosHeyGen,
    title: "Create Explainer Videos for Customer with HeyGen",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053896532?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "A digital version of me can deliver video after video after video. Now, the software category that we're looking at is new and maybe even just a little bit creepy, seeing myself in a video saying things I didn't say before. ",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "13",
    image: MakeAProductDemoVideo,
    title: "Make a Product Demo video with Descript",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053897645?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "How would you like 20 pieces of content with about two minutes of work? Well, that's why OpusClip is here to help you. You can start with one long video and get multiple video clips in editing, from long videos, like maybe it's your CEO or executive speech, a podcast, interviews, webinars.",
  },

  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "14",
    image: TellYourCustomersAGreatStory,
    title: "Tell your Customers a Great Story with these 10 rules",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053898396?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Even with the tools that AI delivers, you need to be excellent at storytelling to open doors and keep them open and elevate your career. Others might just be using tools. The ability to create is unique and it's human. AI is not able to do this for you yet. So, it's so important to use the rules of great story so you can create them for you, your brand, and your company.",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "15",
    image: ExploreUsingAiToCreate2,
    title: "Explore Using AI to Create Great Product demos With Guidde",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053900595?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "As you may have seen in my course on sales narratives, there's a cadence and emotions you need to deliver when you demo. This is a tool that compliments that cadence and saves hours of time, and possibly saves your designer from doing the work. It's a plugin for Chrome called Guidde. ",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "16",
    image: AnalyzeVistualCalls,
    title: "Analyze Virtual Calls with Fireflies for Discovery Sessions",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053901304?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "So now you've got a prospect that's aware, educated on a solution, and has been given information on how you benefit them, if you have VDRs, now is when the sales team will talk to your client and likely have a deeper discovery call, and then craft a proposal or even a full presentation. So with Fireflies, instead of spending hours on the phone with a client frantically taking notes, you can let Fireflies do its job.",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "17",
    image: CreateAnElegantPresentation,
    title: "Create an Elegant Presentation",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053901908?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "So in this part of the customer journey, you've had a great discovery call and it's time to create a killer presentation. So that's where we introduce Gamma. Gamma creates pitch decks to help you really elegantly create presentations, and infographics.",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "18",
    image: RepurposingContentForGlobalAudience,
    title: "Repurposing Content for a Global Audience",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053902476?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Most design programs, like Photoshop, are for pros, and Canva was created to be different. It was made for everyone to use, and it has advanced. It's become extremely popular because it's so useful and simple to use. And it also now has AI tools inside.",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "19",
    image: ExpandYourCareer,
    title: "Expand your career by Building a CV with AI",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053903984?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Now that you can leverage AI to efficiently create or repurpose content and implement strategies to establish yourself as a thought leader in your industry, you might just want a promotion. So let's take a minute and use AI to create your resume.",
  },
  {
    course: "Customer Journey Mapping With Generative AI",
    id: 6,
    number: "20",
    image: ContinuingToStrengthen,
    title: "Continuing to strengthen customer journeys with AI",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/1053905611?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "Now you're able to create a funnel with organic content, from scripts, to emails, to designs, to videos, and help you create every step of the customer journey. For next steps, I would love to help you perfect your pitch and your story.",
  },
];

export default videoCardData;
