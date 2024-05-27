import { StaticImageData } from "next/image";



import MauryPic from "../../../../../../public/MauryProfile.png";


export interface Video {
  id: number;
  image: string;
  title: string;
  name: string;
  videoUrl: string;
  avatarUrl: StaticImageData;
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
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
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  //Demo and Sell: Shortcut to the Finals
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 1,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 2,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 3,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 4,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 5,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 6,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 7,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 8,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 9,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 10,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 11,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 12,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    course: "Demo and Sell: Shortcut to the Finals",
    id: 13,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Course Overview",
    name: "Maury Rogow",
    avatarUrl: MauryPic,
    videoUrl:
      "https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
];

export default videoCardData;