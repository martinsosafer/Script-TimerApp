import ShareAudioClient from "./share-audio";

export default function ShareAudioPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const url = searchParams.url as string | undefined;
  const email = searchParams.email as string | undefined;

  return <ShareAudioClient initialUrl={url} sharedByEmail={email} />;
}
