import Image from "next/image";
import { useRouter } from "next/navigation";

import { IconClose } from "@voiceai/ui/@/components/ui/icons";

import { poppins, roboto } from "~/app/fonts";
import Button from "../../button";
import Director from "../modalimgs/DirectorImg.png";

interface CheckoutModalProps {
  onClose: () => void;
}

export default function CheckoutLoginModal({ onClose }: CheckoutModalProps) {
  const router = useRouter();

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur ${poppins.className}`}
    >
      <div className="bg-cp-bakground relative h-[545px] w-[925px] overflow-hidden rounded-xl border border-primary shadow-xl">
        <button className="absolute right-4 top-4" onClick={onClose}>
          <IconClose className="h-5 w-5 text-white" />
        </button>
        <div className="flex h-full">
          {/* Left section */}
          <div className="flex h-full w-[400px] flex-col items-center justify-center bg-gray-100">
            <div className="relative flex h-[330px] w-[330px] items-center justify-center">
              <Image
                src={Director}
                alt="Trial is about to expire image"
                width={350}
                height={350}
              />
            </div>
          </div>

          {/* Right section */}
          <div className="bg-cp-primary flex w-[525px] flex-col items-center pb-[60px] text-white">
            <div className="flex w-[375px] flex-grow flex-col items-center justify-start px-[75px] pt-[60px]">
              <div className="mb-[44px] h-[85px] w-[375px] items-center">
                <h2 className="mb-[12px] text-center text-[24px] font-bold leading-[28px]">
                  Happy to help you!
                </h2>
                <p className="text-center text-[16px] font-bold leading-[22px]">
                  Please log in to update your account and start creating!
                </p>
              </div>
              <p
                className={`${roboto.className} mt-8 w-[300px] text-center text-[18px]`}
              >
                Let's do this! You're just a few clicks away from creating.
              </p>
            </div>
            <Button
              label="Take me there"
              onClick={() => router.push("/register")}
              type="accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
