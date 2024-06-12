import React from "react";

import { AspectRatio } from "@voiceai/ui/@/components/ui/aspect-ratio";

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

interface FeaturedVideoProps {
  video: Video;
}

const IntroVideo: React.FC<FeaturedVideoProps> = ({ video }) => {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-bold">{video.title}</h2>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <AspectRatio ratio={16 / 8}>
          <iframe
            src={video.videoUrl}
            title={video.title}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="h-full w-full"
          />
        </AspectRatio>
      </div>
      <p>{video.description}</p>
    </div>
  );
};

export default IntroVideo;
