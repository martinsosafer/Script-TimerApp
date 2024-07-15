import React, { useState } from "react";

import type { SubscriptionData } from "~/lib/types";
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
  subData: SubscriptionData | null | undefined;
  setOpenNoSessionModal: () => void;
}

const VideoCards: React.FC<VideoCardsProps> = ({
  videos,
  subData,
  setOpenNoSessionModal,
}) => {
  const [visibleCount, setVisibleCount] = useState(4);

  if (videos.length === 0) {
    return <p>No videos available for this category.</p>;
  }

  const firstVideo = videos[0];
  const remainingVideos = videos.slice(0, visibleCount);

  const loadMoreVideos = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div>
      <IntroVideo video={firstVideo} />

      <section className="mt-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {remainingVideos.map((video) => (
          <button
            key={video.id}
            onClick={subData ? undefined : () => setOpenNoSessionModal()}
          >
            <VideoCard video={video} subData={subData?.status} />
          </button>
        ))}
      </section>

      {visibleCount < videos.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMoreVideos}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCards;
