import React from "react";

export default function VideoBlock() {
  return (
    <div className="flex items-center justify-center p-6 lg:p-10">
      <div className="h-[176px] w-[316px] overflow-hidden rounded-2xl shadow-lg lg:h-[530px] lg:w-[944px]">
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
