import React from "react";

import VideoCards from "../components/masterclasses/videocards/videocards";

export default function page() {
  return (
    <section className="flex-start mb-16 flex-col px-5 py-6 lg:px-20">
      <h1>Categories</h1>

      <VideoCards />

      <h1>LoadMore</h1>
    </section>
  );
}
