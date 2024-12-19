import { useRouter } from "next/navigation";
import type { Session } from "next-auth";

import Button from "~/app/(site)/components/button";
import { poppins } from "~/app/fonts";
import MockUpBlock from "../../sections/widget-mock-block";

interface HerogProps {
  title?: string;
  description?: string;
  sub_description?: string;
  video_url?: string;
  session: Session | null | undefined;
  path: string;
}

export default function FreeDemoHero({
  title,
  description,
  sub_description,
  video_url,
  session,
  path,
}: HerogProps) {
  const router = useRouter();

  function spiltTitle(title: string) {
    const titleArray = title.split(" ");
    const half = Math.ceil(titleArray.length / 2);
    const first = titleArray.slice(0, half).join(" ");
    const second = titleArray.slice(half).join(" ");
    return { first, second };
  }

  const defaultSubDescription =
    "Engage your audience, create scripts, voice overs, storyboards, blogs and videos with our custom built AI library!";

  const defaultVideo =
    "https://player.vimeo.com/video/1020211350?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479";

  return (
    <section
      className={`from-cp-primary flex w-full flex-col items-center bg-gradient-to-br to-black ${poppins.className} py-[32px] lg:py-[60px]`}
    >
      <div className="flex w-full flex-col items-center p-6 lg:w-[1024px] lg:p-10">
        <div className="flex w-full flex-col justify-between lg:flex-row lg:gap-8">
          <div className="lg:w-[452px]">
            {title && (
              <h3 className="text-cp-accent text-[22px] font-bold lg:text-2xl">
                {title}
              </h3>
            )}
            <h2 className="text-[32px] font-bold leading-[38px] text-white lg:mt-5 lg:text-[50px] lg:leading-[60px]">
              {description ? spiltTitle(description).first : "You're creating"}
            </h2>
            <h2 className="text-cp-secondary text-[32px] font-bold leading-[38px] lg:text-[50px] lg:leading-[60px]">
              {description ? spiltTitle(description).second : "an experience"}
              <span className="text-white">.</span>
            </h2>
            <h4 className="mt-4 text-[18px] text-white lg:mt-6 lg:text-xl">
              {sub_description ?? defaultSubDescription}
            </h4>
            <div className="mt-4 flex w-full flex-col items-center gap-4 lg:mt-10 lg:flex-row lg:justify-between">
              <Button
                label="Try a sample"
                type="secondary-accent"
                onClick={() => router.push("#freeDemo")}
                className="w-full px-[8px] lg:w-[206px]"
              />
              <Button
                label="Open full studio"
                type="accent"
                onClick={() =>
                  router.push(session ? "/texttovoice" : `${path}/#loginForm`)
                }
                className="w-full px-[8px] lg:w-[206px]"
              />
            </div>
          </div>
          <div className="mt-[32px] flex w-full justify-center lg:mt-0 lg:w-[493px] lg:flex-col">
            <div className="bg-cp-primary mt-4 h-[180px] w-[312px] overflow-hidden rounded-lg p-2 lg:h-[276px] lg:w-[470px]">
              <iframe
                src={video_url ?? defaultVideo}
                className="h-full w-full rounded-lg"
                allow="autoplay; fullscreen; picture-in-picture"
                title="Script-Timer Ai Onboarding video"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex w-full flex-col items-center lg:mt-[120px]">
          <MockUpBlock session={session} path={path} />
        </div>
      </div>
    </section>
  );
}
