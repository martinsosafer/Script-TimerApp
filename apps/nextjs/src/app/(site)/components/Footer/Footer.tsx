import React from "react";
import Image from "next/image";
import Link from "next/link";

import { RevealText } from "~/app/animations/RevealText";
import ScriptTimerLogo from "../../../../../public/ScriptTimerLogo.png";
import { footerData, footerSocialNetworks } from "./FooterData";

export default function Footer() {
  return (
    <div className="w-full bg-primary">
      <div className="mx-20 mt-4 justify-between md:flex">
        <Link
          href="/"
          className="flex flex-col font-poppins text-primary-foreground"
        >
          <RevealText>
            <div className="flex items-center justify-start">
              <Image
                src={ScriptTimerLogo}
                alt="Script-Timer AI Logo"
                width={200}
                height={60}
                className="h-auto w-auto"
              />
            </div>
          </RevealText>
        </Link>
        {footerData.map(({ id, title, links }) => (
          <div key={id}>
            <h4 className="mt-8 font-poppins   font-semibold text-primary-foreground md:mt-0">
              <RevealText>{title}</RevealText>
            </h4>
            {links.map(({ id, name, link }) => (
              <Link
                key={id}
                href={link}
                target="_blank"
                className="mt-4 block text-primary-foreground hover:text-white"
              >
                <RevealText>{name}</RevealText>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className=" my-7 border-[1px] border-white" />

      <div className="  mx-20 items-center justify-between md:flex">
        <div className="my-3 text-primary-foreground">
          <RevealText>
            {" "}
            2024 SCRIPT TIMER by Rip Media Group | All rights reserved | Privacy
            Policy
          </RevealText>
        </div>
        <div className="flex gap-5">
          {footerSocialNetworks.map(({ id, icon, link }) => (
            <Link
              key={id}
              href={link}
              target="_blank"
              className="text-2xl text-primary-foreground"
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
