import React from "react";
import Image from "next/image";
import Link from "next/link";

import { RevealText } from "~/app/animations/RevealText";
import { footerData, footerSocialNetworks } from "./FooterData";

export default function Footer() {
  return (
    <div className="mx-auto  mt-24 max-w-5xl p-6 md:-mt-40">
      <div className="justify-between md:flex">
        <div>
          <h2 className="font-poppins font-bold text-primary">SCRIPT TIMER</h2>
          <RevealText>
            <p className="text-primaryDark mt-5 max-w-[250px]">
              A new way of speech
            </p>
          </RevealText>
        </div>
        {footerData.map(({ id, title, links }) => (
          <div key={id}>
            <h4 className="mt-8 font-poppins text-lg md:mt-0">
              <RevealText>{title}</RevealText>
            </h4>
            {links.map(({ id, name, link }) => (
              <Link
                key={id}
                href={link}
                className="text-primaryDark mt-4 block hover:text-white"
              >
                <RevealText>{name}</RevealText>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="my-7 border-[1px] border-[#3F3E45]" />

      <div className="items-center justify-between md:flex">
        <div className="my-3">
          <RevealText>
            {" "}
            2024 SCRIPT TIMER by Rip Media Group | All rights reserved | Privacy
            Policy
          </RevealText>
        </div>
        <div className="flex gap-5">
          {footerSocialNetworks.map(({ id, icon, link }) => (
            <Link key={id} href={link} className="text-2xl">
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
