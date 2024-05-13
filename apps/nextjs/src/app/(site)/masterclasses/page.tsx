import React from "react";

import VideoCards from "../components/masterclasses/videocards/videocards";
import VideoCategories from "../components/masterclasses/videocategories/videocategories";

export default function page() {
  return (
    <section className="flex-start mb-16 flex-col px-5 py-6 lg:px-20">
      <VideoCategories />

      <VideoCards />

      <h1 className=" mt-5">LoadMore button if needed </h1>
    </section>
  );
}
