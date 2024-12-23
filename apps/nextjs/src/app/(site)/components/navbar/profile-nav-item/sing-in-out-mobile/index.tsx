"use client";

import { useRouter } from "next/navigation";

import { IconArrowRight } from "@voiceai/ui/@/components/ui/icons";

interface Props {
  onSignInOut: () => Promise<void>;
  label: string;
}

export default function SignInOutMobile({ onSignInOut, label }: Props) {
  const router = useRouter();

  const handleClick = async () => {
    await onSignInOut();
    if (label === "Sign in") {
      router.push("/signin");
    } else {
      router.push("/");
    }
  };

  return (
    <button
      className="bg-cp-secondary block w-full rounded-lg px-4 py-3 text-center font-semibold text-white transition duration-300 ease-in-out hover:bg-orange-600"
      onClick={handleClick}
    >
      <span className="mr-2">{label}</span>
      <IconArrowRight className="ml-2 inline-block h-4 w-4" />
    </button>
  );
}
