import type { Dispatch, SetStateAction } from "react";

import { HappyToHelpDraw } from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";

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
          <div className="bg-cp-primary z-10 flex h-[402px] w-full flex-col items-center pb-8 text-white lg:h-full lg:w-[525px] lg:pb-[60px]">
            <div className="flex w-full flex-grow flex-col items-center justify-start px-4 pt-8 lg:w-[375px] lg:px-[75px] lg:pt-[60px]">
              <div className="mb-6 w-full items-center lg:mb-[44px] lg:h-[85px] lg:w-[375px]">
                <h2 className="mb-2 text-center text-xl font-bold leading-tight lg:text-[24px] lg:leading-[33.6px]">
                  {/* {currentPage?.message} */}
                </h2>
                {/* {currentPage?.subMessage && (
                  <p className="text-center text-sm font-bold leading-snug lg:text-[16px] lg:leading-[22px]">
                    {currentPage.subMessage.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                )} */}
              </div>
              <div className="w-full lg:h-[192px] lg:w-[375px]">
                <p className="mb-2 text-left text-[16px] font-bold leading-[22.4px] lg:text-[20px] lg:leading-[28px]">
                  Let's do it!:
                </p>
                <div className="lg:h-[149px] lg:w-[374px]">
                  <ul className="list-inside list-disc font-roboto text-[14px]  leading-[19px] lg:text-lg">
                    {/* {currentPage?.list.map((item, index) => (
                      <li key={index} className="mb-2 ml-3">
                        {item}
                      </li>
                    ))} */}
                  </ul>
                </div>
              </div>
            </div>

            {/* Placed the button at the bottom with padding alignment */}
            {/* <div className="mt-6 flex w-full flex-col items-center lg:mt-10 lg:w-[375px]">
              <button className="bg-cp-secondary mb-2 h-10 w-full rounded-md px-4 py-1 text-sm font-bold uppercase leading-tight text-white hover:bg-orange-500 lg:mb-[8px] lg:h-[45px] lg:w-[375px] lg:px-[24px] lg:py-[2px] lg:text-base lg:leading-[20px]">
                <Link href="/signin">LOGIN-FREE</Link>
              </button>
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
