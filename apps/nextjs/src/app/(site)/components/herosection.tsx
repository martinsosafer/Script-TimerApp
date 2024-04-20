"use client";

import React from "react";
import Link from "next/link";

import { AspectRatio } from "@voiceai/ui/@/components/ui/aspect-ratio";

import useModal from "~/app/hooks/useModal";
import { api } from "~/utils/api";
import Modal from "./modal";

export default function HeroSection() {
  const { data: session } = api.auth.getSession.useQuery();

  const { data: subscriptionData } = api.subscription.mySubscription.useQuery();

  const isSubscriptionActive =
    subscriptionData &&
    (subscriptionData.status === "CREATOR" ||
      subscriptionData.status === "STUDENT" ||
      subscriptionData.status === "FREE" ||
      subscriptionData.status === "FREE_TRIAL");
  const { closeModal, showModal } = useModal(isSubscriptionActive);
  const { mutateAsync: initialFreeTrial } =
    api.user.initialFreeTrial.useMutation({
      onSuccess(data) {
        console.log("Free trial initiated successfully:", data);
      },
      onError(error) {
        console.error("Error initiating free trial:", error);
      },
    });
  const handleInitialFreeTrial = async () => {
    try {
      let userId;
      if (session?.user.id) {
        // If session contains userId, use it
        userId = session.user.id;
      } else {
        // If userId is not available in session, handle it accordingly
        // For example, you might prompt the user to login or provide a message
        console.error("User ID not found in session data");
        return;
      }
      await initialFreeTrial({ userId });
    } catch (error) {
      console.error("Error initiating free trial:", error);
    }
  };
  return (
    <section className="w-full py-6 md:py-12 lg:py-12 xl:py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-5 mt-2  flex  flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className=" font-roboto text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
              Welcome!
            </h1>
            <p className="max-w-[600px] text-primary dark:text-gray-400 md:text-xl">
              Learn the newest capabilities to make you the ultimate creator &
              presenter.
            </p>
          </div>
          <AspectRatio ratio={20 / 8}>
            <iframe
              src="https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Script-Timer Ai_ On boarding video (Short version) (1)"
            />
          </AspectRatio>

          <div className="mb-5 flex flex-col space-x-4 space-y-4 md:flex-row">
            <p className="my-auto font-bold text-primary">Skip to:</p>
            <a
              target="_blank"
              className="inline-flex h-9 items-center justify-center rounded-xl bg-sky-400 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="https://script-timer.com/blogs/"
              rel="noreferrer"
            >
              More Training
            </a>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="/chat"
            >
              Script Coach
            </Link>
            <Link
              className="y inline-flex h-9 items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="/texttospeech"
            >
              Text2Speech
            </Link>
          </div>
        </div>
      </div>
      {showModal && !isSubscriptionActive && (
        <Modal
          onClose={closeModal}
          handleInitialFreeTrial={handleInitialFreeTrial}
        />
      )}
    </section>
  );
}
