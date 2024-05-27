import React from "react";

import VideoCard from "../videocard/videocard";

interface Video {
  id: number;
  course: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  videoUrl: string;
  description: string;
}

interface VideoCardsProps {
  videos: Video[];
}

const VideoCards: React.FC<VideoCardsProps> = ({ videos }) => {
  return (
    <section className="mt-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </section>
  );
};

export default VideoCards;
