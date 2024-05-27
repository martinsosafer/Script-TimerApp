"use client";

import React, { useState } from "react";

import VideoCards from "../components/masterclasses/videocards/videocards";
import videoCardData from "../components/masterclasses/videocards/videocardsdata";
import VideoCategories from "../components/masterclasses/videocategories/videocategories";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredVideos = selectedCategory
    ? videoCardData.filter((video) => video.course === selectedCategory)
    : videoCardData;

  return (
    <section className="flex-start mb-16 flex-col px-5 py-6 lg:px-20">
      <VideoCategories onSelectCategory={setSelectedCategory} />

      <VideoCards videos={filteredVideos} />

      <h1 className="mt-5">LoadMore button if needed </h1>
    </section>
  );
}
