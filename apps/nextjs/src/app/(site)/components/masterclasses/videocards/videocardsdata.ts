import type { StaticImageData } from "next/image";

import {
  AimHigherThan,
  AskRelatableQuestions,
  Breakdown,
  BuildRapportByBeingReal,
  ContinueTransforming,
  ControlTheRoom,
  CourseOverview,
  CreateImpactInYour,
  CustomerJourney,
  DiscoverThePain,
  ElevatorPitch,
  Empathy,
  EngageAndEstablish,
  EpicCaptureStory,
  ExecDec,
  IdentifyYourProspect,
  Intro,
  LearnToLove,
  LeverageBenefits,
  LeverageDifferent,
  Listen,
  LoseYourAgenda,
  MicroStories,
  MountainTop,
  NextSteps,
  OnTeam,
  OpeningAStory,
  PostProductionSecrets,
  RapportBuildingIs,
  RelaxMirrorAnd,
  RetainAndGrow,
  ScriptTemplates,
  SelectingTheRight,
  ShutDownTheDistractions,
  SpiceUpYourPitch,
  Story,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 1,
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
    id: 3,
    number: "4",
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 1,
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
    id: 2,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 1,
    number: "11",
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
    id: 2,
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
    id: 3,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
];

export default videoCardData;
