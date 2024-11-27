import Link from "next/link";

import Button from "./button";
import Logo from "./logo";

export default function DemoNavbar() {
  return (
    <header className="bg-cp-primary h-[138px] w-full">
      <div className="mx-auto flex h-full items-center justify-between px-10">
        {/* Logo Section */}
        <div className="ml-[40px]">
          <Logo coColor="white" producerColor="black" />
        </div>

        {/* Button Section */}
        <div className="mr-[40px]">
          <Link href="/register">
            <Button label="Try it free" type="accent" />
          </Link>
        </div>
      </div>
    </header>
  );
}
