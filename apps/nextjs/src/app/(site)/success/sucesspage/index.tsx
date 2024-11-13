"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti";

import { auth } from "@voiceai/auth";

import { api } from "~/utils/api";
import addOnSuccess from "../addOnSuccess";
import AddOnSuccess from "../addOnSuccess";
import SuccessMessage from "../SuccessMessage";

interface Plan {
  id: string;
  interval: string;
  active: boolean;
  amount: number;
}

interface PlansProps {
  userSession: Session | null;
  subscription: Plan | null;
}
enum Plans {
  STUDENT = "Student Plan",
  CREATOR = "Creator Plan",
  BUSINESS = "Business Plan",
  STUDENTCLMO = "Plagiarism + Ai Detection: Edu / Mo",
  CREATORCLMO = "Plagiarism + Ai Detection: Creator / Mo",
  BUSINESSCLMO = "Plagiarism + Ai Detection: Business / Mo",
  STUDENTCLYR = "Plagiarism + Ai Detection: Edu / Yr",
  CREATORCLYR = "Plagiarism + Ai Detection: Creator / Yr",
  BUSINESSCLYR = "Plagiarism + Ai Detection: Business / Yr",
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

    return stripeSession as { name: string; id: string };
  } catch (error) {
    console.error("ERROR", error);
    return null;
  }
}

function SuccessPage({ userSession, subscription }: PlansProps) {
  const [session, setSession] = useState({});
  const searchParams = useSearchParams();
  const id = searchParams.get("sessionId");

  const { data: userData, isSuccess } = api.auth.getSession.useQuery();
  const userPlan = userData?.user.subscription?.status;
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
  const { mutateAsync: updateStudentClMo } =
    api.user.updateStudentClMO.useMutation({
      onSuccess(data) {
        console.log("Subscription updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating subscription:", error);
      },
    });
  const { mutateAsync: updateCreatorClMo } =
    api.user.updateCreatorClMO.useMutation({
      onSuccess(data) {
        console.log("Subscription updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating subscription:", error);
      },
    });
  const { mutateAsync: updateBusinessClMo } =
    api.user.updateBusinessClMO.useMutation({
      onSuccess(data) {
        console.log("Subscription updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating subscription:", error);
      },
    });
  const { mutateAsync: updateStudentClYr } =
    api.user.updateStudentClYR.useMutation({
      onSuccess(data) {
        console.log("Subscription updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating subscription:", error);
      },
    });
  const { mutateAsync: updateCreatorClYr } =
    api.user.updateCreatorClYR.useMutation({
      onSuccess(data) {
        console.log("Subscription updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating subscription:", error);
      },
    });
  const { mutateAsync: updateBusinessClYr } =
    api.user.updateBusinessClYR.useMutation({
      onSuccess(data) {
        console.log("Subscription updated successfully:", data);
      },
      onError(error) {
        console.error("Error updating subscription:", error);
      },
    });
  //HANDLERS

  const handleStudent = async (userId: string, planId: string) => {
    try {
      await updateStudent({ userId, planId });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  const handleCreator = async (userId: string, planId: string) => {
    try {
      await updateCreator({ userId, planId });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  const handleBusiness = async (userId: string, planId: string) => {
    try {
      await updateBusiness({ userId, planId });
    } catch (error) {
      console.error("Error giving subscription:", error);
    }
  };
  //COPYLEAKS HANDLERS
  const handleStudentClMO = async (userId: string, planId: string) => {
    try {
      await updateStudentClMo({ userId, planId });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  const handleCreatorClMO = async (userId: string, planId: string) => {
    try {
      await updateCreatorClMo({ userId, planId });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  const handleBusinessClMO = async (userId: string, planId: string) => {
    try {
      await updateBusinessClMo({ userId, planId });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  const handleStudentClYR = async (userId: string, planId: string) => {
    try {
      await updateStudentClYr({ userId, planId });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  const handleCreatorClYr = async (userId: string, planId: string) => {
    try {
      await updateCreatorClYr({ userId, planId });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  const handleBusinessClYr = async (userId: string, planId: string) => {
    try {
      await updateBusinessClYr({ userId, planId });
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };
  function handleSubscriptionUdate(
    name: string,
    planId: string,
    userId: string,
  ) {
    console.log("PLAN and ID", name, planId, userId);
    if (name === Plans.STUDENT) {
      handleStudent(userId, planId);
    }
    if (name === Plans.CREATOR) {
      handleCreator(userId, planId);
    }
    if (name === Plans.BUSINESS) {
      handleBusiness(userId, planId);
    }
    // New plans
    if (name === Plans.STUDENTCLMO) {
      handleStudentClMO(userId, planId);
    }
    if (name === Plans.CREATORCLMO) {
      handleCreatorClMO(userId, planId);
    }
    if (name === Plans.BUSINESSCLMO) {
      handleBusinessClMO(userId, planId);
    }
    if (name === Plans.STUDENTCLYR) {
      handleStudentClYR(userId, planId);
    }
    if (name === Plans.CREATORCLYR) {
      handleCreatorClYr(userId, planId);
    }
    if (name === Plans.BUSINESSCLYR) {
      handleBusinessClYr(userId, planId);
    }
  }

  async function fetchSession(id: string) {
    try {
      const result = await stripeSession(id);
      if (isSuccess && result) {
        const { name, id } = result;
        handleSubscriptionUdate(name, id, userData?.user.id);
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
    <div className=" flex h-full flex-col items-center  text-center">
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
      <SuccessMessage />

      <AddOnSuccess
        userSession={userSession}
        intereval={subscription?.interval}
        userPlan={userPlan}
      />
    </div>
  );
}
export default SuccessPage;
