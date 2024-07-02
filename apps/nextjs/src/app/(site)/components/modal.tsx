"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@voiceai/ui";
import {
  IconArrowRight,
  IconHandshake,
} from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";
import modalpicture from "../../../../public/modalimage.svg";

interface SubData {
  status: string | undefined;
  userId: string;
}

function Modal({ status, userId }: SubData) {
  const router = useRouter();
  const isSubscriptionActive =
    status &&
    (status === "CREATOR" ||
      status === "STUDENT" ||
      status === "BUSINESS" ||
      status === "FREE_TRIAL");

  const [modalOpen, setModalOpen] = useState(!isSubscriptionActive);

  const closeModal = () => {
    setModalOpen(false);
  };

  const { mutateAsync: initialFreeTrial } =
    api.user.initialFreeTrial.useMutation({
      onSuccess(data) {
        console.log("Free trial initiated successfully:", data);
        // Optionally handle success
      },
      onError(error) {
        console.error("Error initiating free trial:", error);
      },
    });

  const handleInitialFreeTrial = async () => {
    try {
      if (userId) {
        await initialFreeTrial({ userId });
      } else {
        console.error("User ID not found in session data");
      }
    } catch (error) {
      console.error("Error initiating free trial:", error);
    }
  };

  const startFreeTrialAndCloseModal = async () => {
    closeModal(); // Close the modal immediately
    await handleInitialFreeTrial();
  };

  // Ensure that hooks are called before any conditional return
  if (!modalOpen) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex w-full max-w-4xl flex-col rounded-xl bg-white p-6 md:flex-row md:p-10 lg:p-12">
        <div className="hidden md:flex md:w-1/2 md:items-center">
          <Image
            className="w-full rounded-lg"
            src={modalpicture}
            alt="header image"
          />
        </div>
        <div className="flex flex-col justify-center text-center md:w-1/2 md:text-left">
          {!userId && (
            <h3 className="mb-3 px-4 text-center font-semibold">
              Please look around and login to create scripts, voices, and learn.
            </h3>
          )}
          <div className="mb-4 flex items-center justify-center md:justify-start">
            <img
              className="h-4 md:h-5"
              src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-1.png"
              alt="logo"
            />
            <h4 className="ml-2 text-sm font-bold uppercase tracking-widest text-primary">
              Start Now
            </h4>
          </div>
          <h1 className="text-dark-grey-900 mb-8 text-3xl font-extrabold leading-tight md:text-4xl">
            Your voice matters
          </h1>
          <p className="text-grey-900 mb-6 text-sm font-normal leading-7 md:text-base">
            Hi there, please add a discounted subscription before new (slightly
            higher) pricing levels are introduced in just days.
          </p>
          <span className="font-extrabold text-primary">
            Join a membership today and SAVE 50%
          </span>
          <div className="mt-4 flex flex-col items-center gap-4 md:flex-row md:items-start">
            <Link href="/plans">
              <Button
                className="flex items-center rounded-xl bg-tertiary px-7 py-4 text-lg font-bold text-black hover:bg-tertiary focus:ring-4"
                type="button"
                size="sm"
              >
                <IconHandshake className="mr-2" />
                Get Full Access
              </Button>
            </Link>

            <Button
              className="flex items-center rounded-2xl border border-black bg-secondary px-7 py-4 text-xs font-medium text-secondary-foreground hover:bg-secondary"
              type="button"
              size="sm"
              onClick={
                userId
                  ? startFreeTrialAndCloseModal
                  : () => router.push("/register")
              }
            >
              <IconArrowRight className="mr-2" />
              Start free trial
            </Button>
          </div>
          <button
            className="mt-4 hover:text-primary hover:underline"
            onClick={closeModal}
          >
            {" "}
            Or continue with a free tour
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
