// import { Suspense } from "react";

import { Button } from "@voiceai/ui";

import { AuthShowcase } from "./_components/auth-showcase";

// import {
//   CreatePostForm,
//   PostCardSkeleton,
//   PostList,
// } from "./_components/posts";

export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          VoiceAI
        </h1>
        {/* <AuthShowcase /> */}

        <Button>TEST</Button>

        {/* <CreatePostForm />
        <div className="h-[40vh] w-full max-w-2xl overflow-y-scroll">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList />
          </Suspense>
        </div> */}
      </div>
    </main>
  );
}
