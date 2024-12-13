"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import type { Session } from "next-auth";
import { useTheme } from "next-themes";

import { Button } from "@voiceai/ui";
import {
  HoverCard,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import {
  BurgerIcon,
  IconArrowDown,
  IconMoon,
  IconSun,
  XIcon,
} from "@voiceai/ui/@/components/ui/icons";

import { RevealText } from "~/app/animations/RevealText";
import Logo from "../logo";
import MobileNavBar, { MobileNav } from "../mobile-navbar";
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  // Get subscription info
  const subscriptionData = session?.user.subscription?.status;

  return (
    <header className="bg-cp-primary sticky top-0 z-50 flex h-[64px] w-full items-center justify-between lg:h-16 lg:px-8 lg:py-14">
      <Link
        href="/"
        className="flex flex-col font-poppins text-primary-foreground"
      >
        <RevealText>
          {/* Adjust alignment wrapper */}
          <div className="ml-3 mt-2  flex items-center justify-center">
            <Logo coColor="white" producerColor="black" />
          </div>
        </RevealText>
      </Link>

      <nav className="mt-4 hidden  lg:block ">
        <ul className="flex items-center justify-center gap-[20px] font-semibold">
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

      <nav className="mr-4 sm:block md:hidden lg:hidden xl:hidden">
        <button
          className="inline-flex items-center px-4 py-2 font-bold text-white hover:text-blue-100"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <BurgerIcon className="h-6 w-6" />
          )}
        </button>
      </nav>

      <nav className="hidden lg:block">
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
        {isOpen && (
          <MobileNav
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            signOut={signOut}
            signIn={signIn}
            session={session}
             plan={subscriptionData}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
