import Image from "next/image";

import { roboto } from "~/app/fonts";

export default function Explore() {
  return (
    <section className="mt-[100px] flex flex-col items-center">
      <p className="w-[460px] text-center text-[24px] font-bold">
        Explore all the capabilities to become a better and faster creator
      </p>
      <div
        className={`${roboto.className} mt-[48px] flex w-[893px] justify-around gap-2 text-[18px] font-bold`}
      >
        <div className="w-[205px]" />
        <span className="w-[122px] text-center">FREE</span>
        <span className="w-[122px] text-center">EDUCATION</span>
        <span className="w-[122px] text-center">CREATOR</span>
        <span className="w-[122px] text-center">BUSINESS</span>
      </div>
      <div className="relative h-[860px] w-[893px]">
        <Image alt="Voice Ai" src="/Voice AI.png" fill />
      </div>
      <div className="relative mt-[48px] h-[242px] w-[893px]">
        <Image alt="Voice Ai" src="/Script Writing.png" fill />
      </div>
      <div className="relative mt-[48px] h-[242px] w-[893px]">
        <Image alt="Voice Ai" src="/Images (Experimental).png" fill />
      </div>
      <div className="relative mt-[48px] h-[428px] w-[893px]">
        <Image alt="Voice Ai" src="/Plagiarism detection.png" fill />
      </div>
      <div className="relative mt-[48px] h-[345px] w-[893px]">
        <Image alt="Voice Ai" src="/Masterclasses.png" fill />
      </div>
    </section>
  );
}
