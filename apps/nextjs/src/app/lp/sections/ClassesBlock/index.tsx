import Image from "next/image";

import { poppins } from "~/app/fonts";
import AtlassianImg from "../../../../public/AtlassianImg.png";
import GoogleImg from "../../../../public/GoogleImg.png";
import NotionImg from "../../../../public/NotionImg.png";

export default function ClassesBlock() {
  return (
    <div className={`h-full w-full bg-white  ${poppins.className}`}>
      <div className="container mx-auto mt-[70px] items-center text-center ">
        <div className="mb-[54px] grid items-center gap-[40px] md:grid-cols-2">
          <div className="mb-8 mr-6 flex flex-col items-end justify-end text-left text-[28px] font-normal leading-[33.6px] text-black">
            Write more engaging scripts <br /> with classes taught by <br />{" "}
            Hollywood producers.
          </div>

          <div className="flex flex-wrap justify-start  gap-[18px]">
            <Image
              src={NotionImg}
              alt="NotionLogo"
              className="h-[40px] w-[105px] object-contain"
            />

            <Image
              src={AtlassianImg}
              alt="Atlassian Logo"
              className="h-[40px] w-[105px] object-contain"
            />

            <Image
              src={GoogleImg}
              alt="Google Logo"
              className="h-[40px] w-[105px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
