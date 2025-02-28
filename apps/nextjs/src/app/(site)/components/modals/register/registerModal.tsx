import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import {
  HappyToHelpDraw,
  IconSpinner,
} from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";
import { createUser } from "~/app/signin/actions";
import RegisterFormModal from "./register-form-modal/registerFormModal";

interface RegisterModalProps {
  // subData?: SubscriptionData | null | undefined;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  //   page:
  //     | "home"
  //     | "voice"
  //     | "chat"
  //     | "courses"
  //     | "plagiarism"
  //     | "translator"
  //     | "clone"
  //     | "recorder"
  //     | "image";
}

export default function RegisterModal({
  setOpenModal,
  openModal,
  // page,
}: RegisterModalProps) {
  const [loading, setLoading] = useState(false);
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      await createUser({ email, appSumoCode: code });
    } catch (error) {
      alert(
        "An error occurred while signing in. Please check your credentials",
      );
      console.log("ERROR", error);
    }
    setLoading(false);
  }

  if (!openModal) {
    return null;
  }

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur ${poppins.className}`}
    >
      <div className=" h-[532px] w-[312px]  overflow-hidden rounded-xl border border-primary bg-white  shadow-xl lg:h-[545px] lg:w-[925px]">
        <div className="flex h-full flex-col lg:flex-row">
          {/* Left section */}
          <div className="flex h-[151px] w-full items-start justify-center bg-[#F5F5F7] lg:h-full lg:w-[400px] lg:items-center">
            <i className="mt-[-36px] flex w-[90%] lg:mt-0 lg:w-full lg:justify-center">
              <HappyToHelpDraw />
            </i>
          </div>

          {/* Right section */}
          <div className="bg-cp-primary z-10 flex h-[402px] w-full flex-col items-center justify-between px-3 py-4 text-white lg:h-full lg:w-[525px] lg:pb-[60px]">
            <div className="flex w-full flex-col items-center justify-start lg:w-[375px] lg:px-[75px] lg:pt-[60px]">
              <div className="flex w-full flex-col items-center gap-2 lg:h-[85px] lg:w-[375px]">
                <h2 className="text-center text-xl font-bold leading-[28px] lg:text-[24px] lg:leading-[33.6px]">
                  Happy to help!
                </h2>
                <p className="text-center text-sm lg:text-[16px] lg:leading-[22px]">
                  Let's get you in the app:
                </p>
              </div>
            </div>
            {/* <RegisterFormModal /> */}

            {/* Email link form */}
            <div className="w-full">
              <div className="relative mb-4 mt-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    EMAIL ME A LINK
                  </span>
                </div>
              </div>
              <form
                onSubmit={handleLogin}
                className="mx-auto flex w-full max-w-md flex-col space-y-4"
              >
                <div className="flex flex-col space-y-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    className="rounded-md border border-gray-300 px-3 py-2 text-[0.9rem]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-cp-secondary flex h-[42px] items-center justify-center rounded-md py-2 text-[0.9rem] font-semibold text-white"
                >
                  {loading ? (
                    <IconSpinner className="h-6 w-6 animate-spin" />
                  ) : (
                    "Email my immediate access"
                  )}
                </button>
              </form>
            </div>

            <p className="text-center font-poppins text-xs font-normal leading-snug lg:text-[14px] lg:leading-5">
              Free trial. No credit card needed.
            </p>

            {/* Placed the button at the bottom with padding alignment */}
            {/* <div className="flex w-full flex-col items-center lg:mt-10 lg:w-[375px]">
              <p className="text-center font-poppins text-xs font-normal leading-snug lg:text-[14px] lg:leading-5">
                Free trial. No credit card needed.
              </p>
            </div> */}
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpenModal(false)}
        className="absolute right-4 top-4 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Close modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 lg:h-8 lg:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
