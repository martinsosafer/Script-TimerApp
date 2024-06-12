import React from "react";

import IntroVideo from "../featuredVideo/introvideo";
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
  if (videos.length === 0) {
    return <p>No videos available for this category.</p>;
  }

  const firstVideo = videos[0];
  const remainingVideos = videos.slice(1);

  return (
    <div>
      <IntroVideo video={firstVideo} />

      <section className="mt-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {remainingVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </section>
    </div>
  );
};

export default VideoCards;
