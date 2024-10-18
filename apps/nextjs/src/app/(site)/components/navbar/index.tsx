"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import type { Session } from "next-auth";
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

import { RevealText } from "~/app/animations/RevealText";
import { hasValidPlan } from "../../siteUtils";
import MobileNavBar from "../mobile-navbar";
import ExperimentalNavItem from "./experimental";
import ImagesNavItem from "./imaimages-nav-item";
import MasterclassesNavItem from "./masterclass-nav-item";
import PlagNavItem from "./plagiarism-nav-item";
import PlansNavItem from "./plans-nav-item";
import ProfileNavItem from "./profile-nav-item";
import SignInOut from "./profile-nav-item/sign-in-out";
import ScriptCoachNavItem from "./script-coach-nav-item";
import TextToVoiceNavItem from "./text-to-voice-nav-item";
import UpgradeNavItem from "./upgrade-nav-item";

export interface NavBarProps {
  signOut: () => Promise<void>;
  signIn: () => Promise<void>;
  session: Session | null;
}

export default function NewNavBar({ signOut, signIn, session }: NavBarProps) {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Get subscription info
  const subscriptionData = session?.user.subscription?.status;

  return (
    <header className="sticky top-0 z-50 mb-8 flex h-16 w-full items-center justify-between bg-primary px-8 py-14">
      <Link
        href="/"
        className="flex flex-col font-poppins text-primary-foreground"
      >
        <RevealText>
          {/* Container for better alignment */}
          <div className="flex flex-col items-start">
            {/* Main title */}
            <span className="text-left font-poppins text-4xl font-bold">
              Co-Producer
            </span>
            {/* Subtitle positioned directly below the main title */}
            <span className="text-left text-sm text-white">
              Created by Script-Timer
            </span>
          </div>
        </RevealText>
      </Link>

      <nav className="mt-4 hidden md:block lg:block xl:block">
        <ul className="flex items-center justify-center font-semibold">
          <HoverCard>
            <HoverCardTrigger asChild>
              <li className="group relative px-3 py-2 text-primary-foreground">
                <ScriptCoachNavItem />
              </li>
            </HoverCardTrigger>
          </HoverCard>
          <li className="group relative items-center px-3 py-2 text-primary-foreground">
            <TextToVoiceNavItem />
          </li>

          <li className="group relative px-3 py-2 text-primary-foreground hover:cursor-default">
            <ImagesNavItem />
          </li>
          <li className="group relative px-3 py-2 text-primary-foreground hover:cursor-default">
            <PlagNavItem />
          </li>
          <li className="group relative px-3 py-2 text-primary-foreground hover:cursor-default">
            <MasterclassesNavItem />
          </li>
          <li className="group relative px-3 py-2 text-primary-foreground hover:cursor-default">
            <PlansNavItem />
          </li>
        </ul>
      </nav>

      <nav className="sm:block md:hidden lg:hidden xl:hidden">
        <button
          className="inline-flex items-center rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          onClick={toggleMenu}
        >
          <IconArrowDown />
          <span>Menu</span>
        </button>
      </nav>

      <nav>
        <ul className="flex items-center">
          {session && (
            <li>
              <UpgradeNavItem />
            </li>
          )}
          {!session && (
            <li>
              <SignInOut onSignInOut={signIn} label={"Sign in"} color="light" />
            </li>
          )}
          <li>
            <Button
              variant="ghost"
              size="lg"
              onClick={toggleTheme}
              className=""
            >
              {!theme ? null : theme === "dark" ? (
                <IconMoon className="transition-all" />
              ) : (
                <IconSun className="transition-all" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </li>
          <li>
            <ProfileNavItem
              signOut={signOut}
              signIn={signIn}
              plan={subscriptionData}
              session={session}
            />
          </li>
        </ul>
      </nav>

      <AnimatePresence>
        {open && <MobileNavBar toggle={toggleMenu} />}
      </AnimatePresence>
    </header>
  );
}
