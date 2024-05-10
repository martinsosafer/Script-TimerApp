// VideoCards.tsx
import React from "react";

import VideoCard from "../videocard/videocard";
import videoCardData from "./videocardsdata";

const VideoCards: React.FC = () => {
  return (
    <section className="mt-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {videoCardData.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </section>
  );
};

export default VideoCards;
