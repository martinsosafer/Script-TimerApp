import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "~/app/(site)/components/button";
import { poppins, roboto } from "~/app/fonts";
import { cards } from "./utils";

interface LearnMoreCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  action: () => void;
}

function LearnMoreCard({
  title,
  description,
  image,
  imageAlt,
  action,
}: LearnMoreCardProps) {
  return (
    <div className="h-[592px] w-[452px] overflow-hidden rounded-[16px] bg-white">
      <div className="relative h-[331px] w-[452px]">
        <Image src={image} alt={imageAlt} fill />
      </div>
      <div className="flex w-full flex-col items-center p-[32px]">
        <div className="w-full">
          <h3 className="text-cp-primary mb-3 text-[28px] font-bold leading-[34px]">
            {title}
          </h3>
          <p
            className={`text-[18px] font-normal leading-[25px] ${roboto.className} mt-3`}
          >
            {description}
          </p>
        </div>

        <Button
          type="secondary"
          label="Learn More"
          onClick={action}
          className="mt-7"
        />
      </div>
    </div>
  );
}

export default function LearnMoreBlock() {
  const router = useRouter();

  return (
    <section
      className={`${poppins.className} flex w-full justify-center bg-gradient-to-br from-[#0066FF] to-black py-[60px]`}
    >
      <div className="w-[1024px] px-10">
        <div className="mb-[52px] flex flex-col items-center text-center">
          <h2 className="mb-3 text-[34px] font-bold leading-[41px] text-white">
            What to use Co-Producer for
          </h2>
          <p className="text-cp-accent w-[685px] text-[20px] font-normal leading-[28px]">
            A pre-production tool for ideating, planning, creating and improving
            your video content
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-10">
          {cards.map((card, index) => (
            <LearnMoreCard
              key={index}
              {...card}
              action={() => router.push("/")}
            />
          ))}
        </div>
        <div className="mr-5 flex flex-col items-center justify-center pt-[40px]">
          <Button
            label="Take me there"
            type="accent"
            className="w-[400px]"
            onClick={() => router.push("/register")}
          />

          <span
            className={`${roboto.className} mt-4 text-center text-[14px] font-normal leading-[20px] text-white`}
          >
            Free trial. No card needed
          </span>
        </div>
      </div>
    </section>
  );
}
