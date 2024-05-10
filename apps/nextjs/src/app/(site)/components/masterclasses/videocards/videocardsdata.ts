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
    avatarUrl: "avatar-url-1.jpg",
    description: "Description of video 1",
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-vector/flat-geometric-fashion-youtube-thumbnail_23-2148900774.jpg?size=626&ext=jpg",
    title: "Video 2",
    name: "Jane Smith",
    avatarUrl: "avatar-url-2.jpg",
    description: "Description of video 2",
  },
];

export default videoCardData;
