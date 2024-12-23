import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";

import Button from "~/app/(site)/components/button";
import { poppins, roboto } from "~/app/fonts";

interface HerogProps {
  title: string;
  description: string;
  sub_description: string;
  video_url: string;
  session: Session | null | undefined;
  path: string;
}

export default function RegularHero({
  title,
  description,
  sub_description,
  video_url,
  session,
  path,
}: HerogProps) {
  const router = useRouter();
  return (
    <section
      className={`from-cp-primary flex w-full flex-col items-center bg-gradient-to-br to-black ${poppins.className} py-[32px] lg:py-[60px]`}
    >
      <div className="flex w-full flex-col items-center px-6 lg:w-[1024px] lg:px-10">
        <div className="flex w-full flex-col justify-between lg:flex-row">
          <div className="lg:w-[409px]">
            <h1 className="text-[32px] font-bold leading-[38px] text-white lg:text-[58px] lg:leading-[70px]">
              {title}
            </h1>
            <h3 className="text-cp-accent mt-5 text-[18px] font-normal lg:text-xl">
              {description}
            </h3>
            <h4 className="mt-4 text-[18px] font-bold text-white lg:text-xl">
              {sub_description}
            </h4>
          </div>
          <div className="mt-[32px] flex w-full justify-center lg:mt-0 lg:w-[452px] lg:flex-col">
            <div className="relative hidden h-[250px] w-full overflow-hidden rounded-md lg:flex">
              <Image
                src="/TextToVoiceLanding.gif"
                fill
                alt="text to voice gif"
              />
            </div>
            <div className="relative h-[184px] w-[144px] overflow-hidden rounded-md lg:hidden">
              <Image
                src="/mobile-landing-hero.png"
                fill
                alt="text to voice gif"
              />
            </div>
            <div className="ml-6 flex flex-col items-center justify-between gap-[13px] lg:ml-0 lg:mt-[52px] lg:w-full lg:flex-row">
              <Button
                label="Text to Voice"
                type="secondary-accent"
                onClick={() => router.push("/texttovoice")}
                className="w-[142px] px-[8px]"
              />
              <Button
                label="Script Writer"
                type="secondary-accent"
                onClick={() => router.push("/chat")}
                className="w-[142px] px-[8px]"
              />
              <Button
                label="University"
                type="secondary-accent"
                onClick={() => router.push("/masterclasses")}
                className="w-[142px] px-[8px]"
              />
            </div>
          </div>
        </div>
        {video_url && (
          <div className="mt-12 flex w-full flex-col items-center lg:mt-[100px] lg:w-[633px]">
            <h2 className="text-cp-accent text-[22px] font-bold lg:text-[36px]">
              Watch how Co-Producer
            </h2>
            <h2 className="text-center text-[22px] font-bold text-white lg:text-[36px]">
              saves you time, money and stress
            </h2>
            <div className="bg-cp-primary mt-4 h-[180px] w-[312px] overflow-hidden rounded-lg p-2 lg:h-[362px] lg:w-[633px]">
              <iframe
                src={video_url}
                className="h-full w-full rounded-lg"
                allow="autoplay; fullscreen; picture-in-picture"
                title="Script-Timer Ai Onboarding video"
              />
            </div>
            <Button
              label="Take me there"
              type="accent"
              onClick={() => router.push(session ? "/" : `${path}/#loginForm`)}
              className="mt-[24px] w-full lg:w-[311px]"
            />
            <p className={`${roboto.className} mt-2 text-sm text-white`}>
              Free trial. No card needed.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
