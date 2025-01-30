import ShareVideoClient from "./share-video-client";

export default function ShareVideoPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const url = searchParams.url as string | undefined;

  return <ShareVideoClient initialUrl={url} />;
}
