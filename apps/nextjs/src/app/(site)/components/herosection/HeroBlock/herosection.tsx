"use client";

import React from "react";
import Link from "next/link";

import { AspectRatio } from "@voiceai/ui/@/components/ui/aspect-ratio";

import { RevealText } from "~/app/animations/RevealText";
import useModal from "~/app/hooks/useModal";
import { api } from "~/utils/api";
import Modal from "../../modal";
import PrimaryButton from "../../primary-button";
import MotionTransition from "../MotionTransition/MotionTransition";

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
    <div>
      <MotionTransition>
        <h1 className="py-6 text-center font-poppins text-3xl  font-bold tracking-tighter text-primary sm:text-5xl  xl:text-6xl/none">
          Welcome
        </h1>
      </MotionTransition>
      <div className=" relative">
        <div className="mx-auto mt-2 grid max-w-5xl md:grid-cols-2">
          <div className="mt-4 ">
            <RevealText>
              <h1 className="font-poppins text-3xl  font-semibold  sm:text-3xl xl:text-5xl/none ">
                Go From Idea to Script to Quality Voice Over in
                <span className="block text-primary"> 90 seconds</span>
              </h1>
            </RevealText>
            <RevealText>
              <p className="  max-w-md">
                Script-Timer’s Ai writing, voices, and professionally led
                classes were all created to save you hours of work and thousands
                of dollars. Try them here:
              </p>
            </RevealText>
            <RevealText>
              <div className="flex justify-center  gap-3">
                <PrimaryButton>
                  <Link href="/texttospeech">Text to Voice</Link>
                </PrimaryButton>
                <PrimaryButton>
                  <Link href="/chat">Script Coach</Link>
                </PrimaryButton>
                <PrimaryButton>
                  <Link
                    href="https://script-timer.com/lcs-masterclass/"
                    target="_blank"
                  >
                    Masterclasses
                  </Link>
                </PrimaryButton>
              </div>
            </RevealText>
          </div>

          <MotionTransition className=" ml-6 mt-6  flex items-center justify-center">
            <AspectRatio
              ratio={16 / 9}
              style={{
                maxWidth: "600px",
              }}
            >
              <iframe
                src="https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                className="flex h-full w-full items-center justify-center border-4 border-primary"
                allow="autoplay; fullscreen; picture-in-picture"
                title="Script-Timer Ai_ On boarding video (Short version) (1)"
              />
            </AspectRatio>
          </MotionTransition>
        </div>
        {/* {showModal && !isSubscriptionActive && (
        <Modal
        onClose={closeModal}
        handleInitialFreeTrial={handleInitialFreeTrial}
        />
      )} */}
      </div>
    </div>
  );
}
