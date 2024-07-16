import React from "react";

import VideoComponent from "../videocomponent/videocomponent";

interface VideoData {
  id: number;
  course: string;
  title: string;
  name: string;
  videoUrl: string;
  avatarUrl: string;
  description: string;
}
interface RelatedVideos {
  id: number;
  course: string;
  title: string;
  name: string;
  videoUrl: string;
  avatarUrl: string;
  description: string;
  image: string;
}
interface VideoPageProps {
  searchParams: VideoData;
  relatedVideos: RelatedVideos[];
  previousVideo: RelatedVideos | null;
  nextVideo: RelatedVideos | null;
}

const VideoPage: React.FC<VideoPageProps> = ({
  searchParams,
  relatedVideos,
  previousVideo,
  nextVideo,
}) => {
  return (
    <VideoComponent
      data={searchParams}
      relatedVideos={relatedVideos}
      previousVideo={previousVideo}
      nextVideo={nextVideo}
    />
  );
};

export default VideoPage;
