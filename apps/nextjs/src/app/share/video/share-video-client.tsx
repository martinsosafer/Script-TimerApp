"use client";

import { useEffect, useState } from "react";

export default function ShareVideoClient({
  initialUrl,
}: {
  initialUrl?: string;
}) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof initialUrl === "string") {
      setVideoUrl(decodeURIComponent(initialUrl));
    }
  }, [initialUrl]);

  if (!videoUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <video controls className="mx-auto w-full max-w-3xl" src={videoUrl}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
