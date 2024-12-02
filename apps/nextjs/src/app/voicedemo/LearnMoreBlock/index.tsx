import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
} from "@voiceai/ui/@/components/ui/card";

import Button from "~/app/(site)/components/button";
import { poppins, roboto } from "~/app/fonts";

interface LearnMoreCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

function LearnMoreCard({
  title,
  description,
  image,
  imageAlt,
}: LearnMoreCardProps) {
  return (
    <Card className="h-[592px] w-[452px]  overflow-hidden">
      <CardContent className="">
        <Image
          src={image}
          alt={imageAlt}
          width={400}
          height={300}
          className="object-fit h-full w-full"
        />
        <div className="px-[32px] pb-[28px] pt-[32px]">
          <h3 className="text-cp-primary mb-3 text-[28px]  font-bold leading-[34px]">
            {title}
          </h3>
          <p
            className={`text-[18px]  font-normal leading-[25px] ${roboto.className}`}
          >
            {description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="items-center justify-center">
        <Button type="secondary" label="Learn More" />
      </CardFooter>
    </Card>
  );
}

export default function LearnMoreBlock() {
  const cards = [
    {
      title: "Pre-Production & Story",
      description:
        "Craft videos with ease and precision, ensure your brand story drives desired results. Go from idea to script to voice to storyboard in minutes.",
      image: "/LearnMoreImg1.png",
      imageAlt: "Pre-production and story development visualization",
    },
    {
      title: "Social Media Creation",
      description:
        "Blend education and entertainment effortlessly. Keep viewers engaged while educating them with the right hooks, posts, content and videos.",
      image: "/LearnMoreImg2.png",
      imageAlt: "Social media content creation visualization",
    },
    {
      title: "Marketing and Leads",
      description:
        "Get ahead of the competition by creating MQL and SQL and adding value with content that appeals to your particular audience.",
      image: "/LearnMoreImg3.png",
      imageAlt: "Marketing and leads visualization",
    },
    {
      title: "Masterclass Content",
      description:
        "Your learning is delivered by instructors seen at Harvard, Microsoft, Cisco and hundreds of others. Improve your career with knowledge.",
      image: "/LearnMoreImg4.png",
      imageAlt: "Masterclass content visualization",
    },
  ];

  return (
    <section
      className={`${poppins.className} w-full bg-gradient-to-br from-[#0066FF] to-black py-12 `}
    >
      <div className="container px-4 md:px-6">
        <div className="mb-[52px] text-center">
          <h2 className="mb-3 text-[34px]  font-bold leading-[41px]  text-white">
            What to use Co-Producer for
          </h2>
          <p className="text-[20px]  font-normal leading-[28px] text-white/80">
            A pre-production tool for ideating, planning, creating and improving
            <br />
            your video content
          </p>
        </div>
        <div className="mx-auto grid w-[970px] grid-cols-1 gap-y-8 md:grid-cols-2">
          {cards.map((card, index) => (
            <LearnMoreCard key={index} {...card} />
          ))}
        </div>
        <div className="mr-5 flex flex-col items-center justify-center pb-[60px] pt-[40px]">
          <Link href="/register">
            <Button label="Take me there" type="accent" className="w-[400px]" />
          </Link>
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
