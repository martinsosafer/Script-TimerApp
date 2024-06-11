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
  image: string;
}

interface VideoPageProps {
  searchParams: VideoData;
  relatedVideos: VideoData[];
}

const VideoPage: React.FC<VideoPageProps> = ({
  searchParams,
  relatedVideos,
}) => {
  return <VideoComponent data={searchParams} relatedVideos={relatedVideos} />;
};

export default VideoPage;
