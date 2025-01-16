import { notFound } from "next/navigation";

import VideoPlayerShare from "~/app/_components/videoplayerShare";

interface SharePageProps {
  params: { slug: string[] };
  searchParams: { url: string };
}

export default function ShareVideoPage({
  params,
  searchParams,
}: SharePageProps) {
  const videoUrl = searchParams.url;

  if (!videoUrl) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Shared Video</h1>
      <VideoPlayerShare src={videoUrl} />
    </div>
  );
}
