"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { poppins, roboto } from "~/app/fonts";
import { api } from "~/utils/api";
import Button from "../../(site)/components/button";

export default function Landing() {
  const pathname = usePathname();
  const router = useRouter();
  const segment = pathname.split("/").pop()!;

  const {
    data: landing,
    isLoading,
    isError,
  } = api.landings.getLanding.useQuery({ segment });

  return (
    <main className="w-full">
      <nav className="bg-cp-primary flex h-[138px] w-full items-center justify-between p-10">
        <div className="relative h-[57px] w-[253px]">
          <Image src="/cp-logo.png" alt="Co-Producer logo" fill />
        </div>
        <Button
          label="Try it free"
          type="accent"
          onClick={() => router.push("/")}
        />
      </nav>
      <div>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching data</div>}
        {!isLoading && !landing && <div>No landing page found</div>}
      </div>
      {landing && (
        <section
          className={`bg-cp-background from-cp-primary flex w-full flex-col items-center bg-gradient-to-br to-black ${poppins.className} py-[60px]`}
        >
          <div className="flex w-[1024px] flex-col items-center px-10">
            <div className="flex w-full justify-between">
              <div className="w-[409px]">
                <h1 className="text-[58px] font-bold leading-[70px] text-white">
                  {landing.title}
                </h1>
                <h3 className="text-cp-accent mt-5 text-xl font-normal">
                  {landing.description}
                </h3>
                <h4 className="mt-4 text-xl font-bold text-white">
                  In minutes! - not weeks
                </h4>
              </div>
              <div className="flex w-[452px] flex-col">
                <div className="relative h-[250px] w-full overflow-hidden rounded-md">
                  <Image
                    src="/TextToVoiceLanding.gif"
                    fill
                    alt="text to voice gif"
                  />
                </div>
                <div className="mt-[52px] flex w-full items-center justify-between gap-[13px]">
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
            <div className="mt-[100px] flex w-[633px] flex-col items-center">
              <h2 className="text-cp-accent text-[36px] font-bold">
                Watch how Co-Producer
              </h2>
              <h2 className="text-[36px] font-bold text-white">
                saves you time, money and stress
              </h2>
              <div className="bg-cp-primary mt-4 h-[362px] w-full overflow-hidden rounded-lg p-2">
                <iframe
                  src={landing.video_url}
                  className="h-full w-full rounded-lg"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="Script-Timer Ai Onboarding video"
                />
              </div>
              <Button
                label="Take me there"
                type="accent"
                onClick={() => router.push("/")}
                className="mt-[24px] w-[311px]"
              />
              <p className={`${roboto.className} mt-2 text-sm text-white`}>
                Free trial. No card needed.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
