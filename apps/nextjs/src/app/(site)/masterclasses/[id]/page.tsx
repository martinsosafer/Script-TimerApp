import React from "react";

import VideoComponent from "../../components/masterclasses/videocomponent/videocomponent";

interface VideoData {
  title: string;
  name: string;
  videoUrl: string;
  avatarUrl: string;
  description: string;
}

interface VideoPageProps {
  searchParams: VideoData;
}

const VideoPage: React.FC<VideoPageProps> = ({ searchParams }) => {
  return <VideoComponent data={searchParams} />;
};

export default VideoPage;
