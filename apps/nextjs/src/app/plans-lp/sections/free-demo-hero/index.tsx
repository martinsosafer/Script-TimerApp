import type { Session } from "next-auth";

import { poppins } from "~/app/fonts";
import MockUpBlock from "../../sections/widget-mock-block";

interface HerogProps {
  session: Session | null | undefined;
  path: string;
}

export default function FreeDemoHero({ session, path }: HerogProps) {
  return (
    <section
      className={`from-cp-primary flex w-full flex-col items-center bg-gradient-to-br to-black ${poppins.className} py-[32px] lg:py-[60px]`}
    >
      <div className="mt-12 flex w-full flex-col items-center lg:mt-[120px]">
        <MockUpBlock session={session} path={path} />
      </div>
    </section>
  );
}
