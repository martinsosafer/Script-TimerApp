import ShareVideoClient from "./share-video-client";

export default function ShareVideoPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const url = searchParams.url as string | undefined;
  const email = searchParams.email as string | undefined;

  return <ShareVideoClient initialUrl={url} sharedByEmail={email} />;
}
