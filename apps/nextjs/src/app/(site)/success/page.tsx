"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti";

import { AspectRatio } from "@voiceai/ui/@/components/ui/aspect-ratio";

import { api } from "~/utils/api";
import SlideCards from "../components/slide-cards";
import ThanksCard from "../components/thanksCard";

enum Plans {
  STUDENT = "Student Plan",
  CREATOR = "Creator Plan",
  BUSINESS = "Business Plan",
}

async function stripeSession(sessionId: string) {
  try {
    const response = await fetch(
      `/api/getStripeSession?sessionId=${sessionId}`,
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const stripeSession = await response.json();
    return stripeSession as { name: string };
  } catch (error) {
    console.error("ERROR", error);
    return null;
  }
}

function SuccessPage() {
  const [session, setSession] = useState({});
  const searchParams = useSearchParams();
  const id = searchParams.get("sessionId");

  const { data: userData, isSuccess } = api.auth.getSession.useQuery();

  const { mutateAsync: updateStudent } = api.user.updateStudent.useMutation({
    onSuccess(data) {
      console.log("Subscription updated successfully:", data);
    },
    onError(error) {
      console.error("Error updating subscription:", error);
    },
  });
  const { mutateAsync: updateCreator } = api.user.updateCreator.useMutation({
    onSuccess(data) {
      console.log("Subscription updated successfully:", data);
    },
    onError(error) {
      console.error("Error updating subscription:", error);
    },
  });
  const { mutateAsync: updateBusiness } = api.user.updateBusiness.useMutation({
    onSuccess(data) {
      console.log("Subscription updated successfully:", data);
    },
    onError(error) {
      console.error("Error updating subscription:", error);
    },
  });

  const handleStudent = async (userId: string) => {
    try {
      await updateStudent({ userId });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  const handleCreator = async (userId: string) => {
    try {
      await updateCreator({ userId });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  const handleBusiness = async (userId: string) => {
    try {
      await updateBusiness({ userId });
    } catch (error) {
      console.error("Error giving subscription:", error);
    }
  };

  function handleSubscriptionUdate(name: string, userId: string) {
    console.log("PLAN and ID", name, userId);
    if (name === Plans.STUDENT) {
      handleStudent(userId);
    }
    if (name === Plans.CREATOR) {
      handleCreator(userId);
    }
    if (name === Plans.BUSINESS) {
      handleBusiness(userId);
    }
  }

  async function fetchSession(id: string) {
    try {
      const result = await stripeSession(id);
      if (isSuccess && result) {
        const { name } = result;
        handleSubscriptionUdate(name, userData?.user.id);
      }
      return session;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchSession(id);
  }, [id, setSession, isSuccess]);

  return (
    <div className="mb-20 flex min-h-screen flex-col items-center justify-center space-y-4 text-center">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={1000}
        recycle={false}
        gravity={0.1}
        initialVelocityX={2}
        initialVelocityY={10}
        colors={["#0123e7", "#eb8806"]}
      />
      <ThanksCard />
      <AspectRatio ratio={30 / 8}>
        <iframe
          src="https://player.vimeo.com/video/904618003?h=e72a50f24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          title="Script-Timer Ai_ On boarding video (Short version) (1)"
        />
      </AspectRatio>
      <h2 className="mb-8 text-5xl font-bold tracking-wider text-primary">
        Welcome to Our Site!
      </h2>
      <SlideCards />
    </div>
  );
}
export default SuccessPage;
