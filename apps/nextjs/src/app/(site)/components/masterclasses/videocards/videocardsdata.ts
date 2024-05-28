const MauryPic =
  "https://media.licdn.com/dms/image/D4E03AQEllFdlVv9JvQ/profile-displayphoto-shrink_800_800/0/1710177885632?e=1722470400&v=beta&t=ZytZa0Mnwzlgci64KNB9kux2hUyhB2iek-RsoF_Tc50";
export interface Video {
  id: number;
  image: string;
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
    course: "Stories That Speed Sales",
    id: 1,
    image:
      "https://img.freepik.com/free-vector/flat-geometric-fashion-youtube-thumbnail_23-2148900774.jpg?size=626&ext=jpg",
    title: "Why Sales Stories Are Important",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948866900?h=833d6245c7&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 1. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 2,
    image:
      "https://img.freepik.com/free-psd/social-media-promo-template-male-self-care-grooming_23-2150229402.jpg?size=626&ext=jpg&uid=R148334585&ga=GA1.1.373835230.1715357954&semt=ais_user",
    title: "Selecting The Right Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948867375?h=eca61f951b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 2. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 3,
    image:
      "https://img.freepik.com/free-vector/wine-party-flat-youtube-channel-cover_23-2149405491.jpg?size=626&ext=jpg&ga=GA1.1.1229927488.1715432513&semt=ais_user",
    title: "The 10 commandments of Great Sales Stories",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948867513?h=72f5ad7b95&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 3. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 4,
    image:
      "https://img.freepik.com/free-psd/flat-design-creativity-concept-youtube-cover_23-2150248470.jpg?w=740&t=st=1715432600~exp=1715433200~hmac=e53dcba2cd95d0adeacfafe34f5a2bcb014c6c821d3f1dd4e9c5ac379d367ee1",
    title: "The Five Emotions that Drive a Great Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948867728?h=0b971a9362&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 4. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 5,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Elevator Pitch Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948868342?h=b8e444d957&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 6,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Epic Capture Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948868442?h=1f110e7c1b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 7,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Opening a Story With SCIPAB",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948868843?h=481604f956&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 8,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Unicorn Sales Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948868933?h=ea450850dd&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 9,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "WIIFM-demo story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948869055?h=15a1af35f8&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 10,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "The closer story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948869144?h=77f926389e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 11,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Retain and Grow-together stories",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948869213?h=4a802099f1&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Stories That Speed Sales",
    id: 12,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Next Steps",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948869335?h=ea6dc238f6&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  //Lights, Camera, Sales
  {
    course: "Lights, Camera, Sales",
    id: 1,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948912357?h=ccb3bb7d60&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 2,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Why Story Works ",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948917297?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 3,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "The Quest",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948918148?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 4,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Customer Journey Value Ladder",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948918591?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 5,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "The 10 Commandments",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948919468?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 6,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "The STUFF",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948920176?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 7,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "The Creative Brief",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948920603?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 8,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: " The Idea Factory",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948920956?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 9,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Script Templates",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948921422?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 10,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "The Art Of Post Production",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948922216?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 10,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "The Art Of Post Production",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948922636?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Lights, Camera, Sales",
    id: 11,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: " Post Production Secrets",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/948922636?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=584799",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  //Demo and Sell: Shortcut to the Finals
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 1,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Intro",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949218099?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 2,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "What Not To Do",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949219977?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 3,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Breakdown",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949220808?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 4,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Discover the Pain",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949228697?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 5,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Empathy",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949229603?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 6,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Mountain Top",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949231492?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 7,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "On Team",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949232232?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 8,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Story",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949233527?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 9,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Micro Stories",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949235265?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 10,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Exec Dec",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949235962?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 11,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Listen",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949236670?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 12,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Leverage Benefits",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949237105?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 13,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Next Steps",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949237603?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  //Delivering a Great Virtual Sales Pitch
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 1,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "What Makes a Great Sales Pitch",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949264160?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 2,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "The Elements of a Great Sales Pitch",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949265443?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 3,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Engage and Establish to Gain Prospects",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949266361?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 4,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Identify your Prospect's Biggest Pain Point",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949267313?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 5,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Create Impact in Your Sales Pitch",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949267962?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 6,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Aim higher than closing the Deal",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949268824?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 7,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Upgrade your Pitch With Five Key Emotions",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949269709?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 8,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Leverage Different Learning Styles",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949270385?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 9,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Spice Up Your Pitch",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949271011?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 10,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Turn Obstacles Into Opportunities",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949276679?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Delivering a Great Virtual Sales Pitch",
    id: 11,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Continue Transforming Your Great Pitch",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949277343?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  //Building Rapport on Virtual Sales Calls
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 1,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Why is Building Rapport Critical To Remote Selling",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949294190?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 2,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Lose Your Agenda",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949295137?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 3,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Shut Down the Distractions",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949295840?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 4,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Control the Room",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949296635?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 5,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Win the Person, Not the Sale",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949297490?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 6,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Build Rapport By Being Real",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949298643?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 7,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Relax,Mirror, and Reiterate",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949299760?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 8,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Ask Relatable Questions",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949300437?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 9,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Learn to Love to Question Their Answers",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949301364?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 10,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "What to Avoid",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949302443?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Building Rapport on Virtual Sales Calls",
    id: 11,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Rapport Building is a Learned Trait",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/949303163?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
];

export default videoCardData;
