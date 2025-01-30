import { notFound } from "next/navigation";

import AudioPlayerShare from "~/app/_components/audioplayerShare";

interface SharePageProps {
  params: { slug: string[] };
  searchParams: { url: string };
}

export default function SharePage({ params, searchParams }: SharePageProps) {
  const audioUrl = searchParams.url;

  if (!audioUrl) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Shared Audio</h1>
      <AudioPlayerShare src={audioUrl} />
    </div>
  );
}
