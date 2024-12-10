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
    <div className="h-[495px] w-[312px] overflow-hidden rounded-[16px] bg-white lg:h-[592px] lg:w-[452px]">
      <div className="relative h-[223px] w-[312px] lg:h-[331px] lg:w-[452px]">
        <Image src={image} alt={imageAlt} fill />
      </div>
      <div className="flex h-[272px] w-full flex-col items-center justify-between p-6 lg:h-[261px] lg:p-[32px]">
        <div className="w-full">
          <h3 className="text-cp-primary mb-3 text-[22px] font-bold leading-[26px] lg:text-[28px] lg:leading-[34px]">
            {title}
          </h3>
          <p
            className={`text-[16px] font-normal leading-[23px] lg:text-[18px] lg:leading-[25px] ${roboto.className}`}
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
      className={`${poppins.className} flex w-full justify-center bg-gradient-to-br from-[#0066FF] to-black py-8 lg:py-[60px]`}
    >
      <div className="w-full px-6 lg:w-[1024px] lg:px-10">
        <div className="mb-6 flex flex-col items-center text-center lg:mb-[52px]">
          <h2 className="mb-3 text-[26px] font-bold leading-[31px] text-white lg:text-[34px] lg:leading-[41px]">
            What to use Co-Producer for
          </h2>
          <p className="text-cp-accent w-full text-[18px] font-normal leading-[25px] lg:w-[685px] lg:text-[20px] lg:leading-[28px]">
            A pre-production tool for ideating, planning, creating and improving
            your video content
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-10">
          {cards.map((card, index) => (
            <LearnMoreCard
              key={index}
              {...card}
              action={() => router.push("/")}
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center pt-6 lg:pt-[40px]">
          <Button
            label="Take me there"
            type="accent"
            className="w-full lg:w-[400px]"
            onClick={() => router.push("/register")}
          />

          <span
            className={`${roboto.className} mt-4 text-center text-sm font-normal leading-[20px] text-white`}
          >
            Free trial. No card needed
          </span>
        </div>
      </div>
    </section>
  );
}
