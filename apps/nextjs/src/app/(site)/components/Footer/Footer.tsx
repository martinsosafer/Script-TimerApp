import React from "react";
import Image from "next/image";
import Link from "next/link";

import { RevealText } from "~/app/animations/RevealText";
import { footerData, footerSocialNetworks } from "./FooterData";

export default function Footer() {
  return (
    <div className="mx-auto  mt-24  w-full   bg-gradient-to-b from-blue-600 via-blue-400 to-blue-600 md:-mt-40">
      <div className="mx-20 justify-between md:flex">
        <div>
          <h2 className="font-poppins text-2xl font-bold text-primary-foreground">
            SCRIPT TIMER
          </h2>
          <RevealText>
            <p className=" mt-2 max-w-[250px] from-accent text-lg  text-primary-foreground">
              A new way of speech
            </p>
          </RevealText>
        </div>
        {footerData.map(({ id, title, links }) => (
          <div key={id}>
            <h4 className="mt-8 font-poppins text-lg text-primary-foreground md:mt-0">
              <RevealText>{title}</RevealText>
            </h4>
            {links.map(({ id, name, link }) => (
              <Link
                key={id}
                href={link}
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
