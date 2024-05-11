export interface Video {
  id: number;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  description: string;
}

const videoCardData: Video[] = [
  {
    id: 1,
    image:
      "https://img.freepik.com/free-vector/flat-geometric-fashion-youtube-thumbnail_23-2148900774.jpg?size=626&ext=jpg",
    title: "Video 1",
    name: "John Doe",
    avatarUrl:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1715432996~exp=1715436596~hmac=a02f59aff47060e1c1699c6f63d106e101e4e8297d566e872af14783ce292010&w=740",
    description:
      "This is a longer description of video 1. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-psd/social-media-promo-template-male-self-care-grooming_23-2150229402.jpg?size=626&ext=jpg&uid=R148334585&ga=GA1.1.373835230.1715357954&semt=ais_user",
    title: "Video 2",
    name: "Jane Smith",
    avatarUrl:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1715432996~exp=1715436596~hmac=a02f59aff47060e1c1699c6f63d106e101e4e8297d566e872af14783ce292010&w=740",
    description:
      "This is a longer description of video 2. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/free-vector/wine-party-flat-youtube-channel-cover_23-2149405491.jpg?size=626&ext=jpg&ga=GA1.1.1229927488.1715432513&semt=ais_user",
    title: "Video 3",
    name: "Alice Johnson",
    avatarUrl:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1715432996~exp=1715436596~hmac=a02f59aff47060e1c1699c6f63d106e101e4e8297d566e872af14783ce292010&w=740",
    description:
      "This is a longer description of video 3. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    id: 4,
    image:
      "https://img.freepik.com/free-psd/flat-design-creativity-concept-youtube-cover_23-2150248470.jpg?w=740&t=st=1715432600~exp=1715433200~hmac=e53dcba2cd95d0adeacfafe34f5a2bcb014c6c821d3f1dd4e9c5ac379d367ee1",
    title: "Video 4",
    name: "Bob Williams",
    avatarUrl:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1715432996~exp=1715436596~hmac=a02f59aff47060e1c1699c6f63d106e101e4e8297d566e872af14783ce292010&w=740",
    description:
      "This is a longer description of video 4. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
  {
    id: 5,
    image:
      "https://img.freepik.com/free-vector/lifestyle-blog-banner-template-woman-outfits-collection_53876-118007.jpg?w=740&t=st=1715432629~exp=1715433229~hmac=22bb2510d9a3f2b676db5835be19f191193d6524f45a471c77e5dc3cff30bedb",
    title: "Video 5",
    name: "Ella Brown",
    avatarUrl:
      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?t=st=1715432996~exp=1715436596~hmac=a02f59aff47060e1c1699c6f63d106e101e4e8297d566e872af14783ce292010&w=740",
    description:
      "This is a longer description of video 5. It provides more details about the content and what viewers can expect to learn or enjoy. Feel free to modify it as needed.",
  },
];

export default videoCardData;
