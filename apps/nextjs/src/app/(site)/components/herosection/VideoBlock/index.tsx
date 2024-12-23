import React from "react";

export default function VideoBlock() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="h-[530px] w-[944px] overflow-hidden rounded-2xl shadow-lg">
        <iframe
          className="h-full w-full"
          allowFullScreen
          allow="clipboard-write"
          title="vimeo Video Player"
          src="https://player.vimeo.com/video/1017801784?color&amp;autopause=0&amp;loop=0&amp;muted=0&amp;title=1&amp;portrait=1&amp;byline=1#t="
        ></iframe>
      </div>
    </div>
  );
}
