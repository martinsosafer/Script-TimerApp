"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

import { Button } from "@voiceai/ui";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import {
  IconArrowDown,
  IconMoon,
  IconSun,
} from "@voiceai/ui/@/components/ui/icons";

import { api } from "~/utils/api";
import { hasValidPlan } from "../../siteUtils";
import MobileNavBar from "../mobile-navbar";
import LearnNavItem from "./learn-nav-item";
import PlansNavItem from "./plans-nav-item";
import ProfileNavItem from "./profile-nav-item";
import ScriptCoachNavItem from "./script-coach-nav-item";
import TextToVoiceNavItem from "./text-to-voice-nav-item";

export default function NewNavBar({
  signOut,
}: {
  signOut: () => Promise<null>;
}) {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  //Get subscription info
  const { data: subscriptionData } = api.subscription.mySubscription.useQuery();

  return (
    <header className=" sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-primary px-8">
      <Link
        href={`/`}
        className="font-poppins text-2xl font-bold text-primary-foreground"
      >
        Script Timer
      </Link>

      <nav className="mt-4 hidden md:block lg:block xl:block">
        <ul className="flex items-center justify-center font-semibold">
          <li className="group relative items-center px-3 py-2 text-primary-foreground">
            <TextToVoiceNavItem />
          </li>
          <HoverCard>
            <HoverCardTrigger asChild>
              <li
                className={`group relative px-3 py-2 text-primary-foreground ${!hasValidPlan(subscriptionData?.status) && "pointer-events-none opacity-50"}`}
              >
                <ScriptCoachNavItem />
              </li>
            </HoverCardTrigger>
            {!hasValidPlan(subscriptionData?.status) && (
              <HoverCardContent>
                <p>This section is only available for paying users.</p>
              </HoverCardContent>
            )}
          </HoverCard>
          <li className="group relative px-3 py-2 text-primary-foreground ">
            <LearnNavItem />
          </li>
          <li className="group relative px-3 py-2 text-primary-foreground hover:cursor-default ">
            <PlansNavItem />
          </li>
        </ul>
      </nav>
      <nav className=" ml-6 sm:block md:hidden lg:hidden xl:hidden">
        <button
          className="inline-flex items-center rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          onClick={toggleMenu}
        >
          <IconArrowDown />
          <span>Menu</span>
        </button>
      </nav>
      <nav>
        <ul className="flex">
          <li>
            <Button
              variant="ghost"
              size="lg"
              onClick={toggleTheme}
              className=""
            >
              {!theme ? null : theme === "dark" ? (
                <IconMoon className="transition-all " />
              ) : (
                <IconSun className="transition-all" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </li>
          <li>
            <ProfileNavItem signOut={signOut} plan={subscriptionData?.status} />
          </li>
        </ul>
      </nav>
      <AnimatePresence>
        {open && <MobileNavBar toggle={toggleMenu} />}
      </AnimatePresence>
    </header>
  );
}
