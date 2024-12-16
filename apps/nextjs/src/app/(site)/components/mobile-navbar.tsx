"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import IconUserRound, {
  FileImageIcon,
  IconArrowBigUp,
  IconArrowRight,
  IconAudioLines,
  IconBot,
  IconChevronDown,
  IconChevronRight,
  IconClone,
  IconCopyright,
  IconEar,
  IconFileStack,
  IconGlobe,
  IconHandshake,
  IconHistory,
  IconLibraryBig,
  IconLightbulb,
  IconMic2,
  IconMonitorPlay,
  IconPencilLine,
  IconPocketKnife,
  IconXCircle,
  XIcon as LogOut,
} from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "~/app/fonts";
import SignInOutMobile from "./navbar/profile-nav-item/sing-in-out-mobile";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  signOut: () => Promise<void>;
  signIn: () => Promise<void>;
  session: Session | null;
  plan: string | undefined;
}
export function MobileNav({
  isOpen,
  onClose,
  signOut,
  signIn,
  session,
  plan,
}: MobileNavProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      title: "Script Writing",
      href: "#",
      icon: <IconPencilLine className="h-5 w-5" />,
      subItems: [
        {
          title: "Script-Coach",
          description: "Create your script with the aid of the best AI",
          href: "/chat",
          icon: <IconBot className="h-5 w-5 font-bold" />,
        },
        {
          title: "Translate Text",
          description: "Translate text and audio to multiple languages.",
          href: "/translatetext",
          icon: <IconGlobe className="h-5 w-5" />,
        },
        {
          title: "Free Tools",
          description: "Easy to use tools to help you with your script.",
          href: "/script-timer",
          icon: <IconPocketKnife className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Voice AI",
      href: "#",
      icon: <IconAudioLines className="h-5 w-5" />,
      subItems: [
        {
          title: "Text to Voice",
          description: " Add text, listen to the best grammar & voices",
          href: "/texttovoice",
          icon: <IconMic2 className="h-5 w-5" />,
        },
        {
          title: "Voice Cloning",
          description: " Give us an audio and we will create a voice for you",
          href: "/voicecloning",
          icon: <IconClone className="h-5 w-5" />,
        },
        {
          title: "Translate Audio",
          description: "Upload an Audio File and we will translate it",
          href: "/translateaudio",
          icon: <IconEar className="h-5 w-5" />,
        },
        {
          title: "Voice Library",
          description: "Dozens of voices to review & choose",
          href: "/library",
          icon: <IconLibraryBig className="h-5 w-5" />,
        },
        {
          title: "Voice History",
          description: "Voice to download and share",
          href: "/history",
          icon: <IconHistory className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Image Creator",
      href: "/image-generator",
      icon: <FileImageIcon className="h-5 w-5" />,
    },
    {
      title: "Plagiarism & AI Detector",
      href: "/plagiarism-detector",
      icon: <IconCopyright className="h-5 w-5" />,
    },
    {
      title: "Story University",
      href: "/masterclasses",
      icon: <IconMonitorPlay className="h-5 w-5" />,
    },
    {
      title: "Plans",
      href: "/plans",
      icon: <IconFileStack className="h-5 w-5" />,
    },
  ];

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute left-0 right-0 top-[55px] z-50 bg-blue-600 lg:hidden"
    >
      <nav className={`flex flex-col ${poppins.className}`}>
        {menuItems.map((item) => (
          <div key={item.title} className="border-b border-blue-500">
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className="flex w-full items-center justify-between p-4 text-white hover:bg-blue-700"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openSubmenu === item.title ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mr-4"
                  >
                    <IconChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openSubmenu === item.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white"
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="text-cp-primary block p-4 hover:bg-blue-800"
                          onClick={onClose}
                        >
                          <div className="flex items-center gap-3">
                            {subItem.icon}
                            <div>
                              <span>{subItem.title}</span>
                              <p className="mt-1 text-sm text-black">
                                {subItem.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={item.href}
                className="flex w-full items-center p-4 text-white hover:bg-blue-700"
                onClick={onClose}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              </Link>
            )}
          </div>
        ))}
        <div className="p-4">
          <Link
            href="/my-profile"
            className="block text-white hover:text-blue-100"
            onClick={onClose}
          >
            <div className="flex items-center gap-3">
              {/* Icon Column */}
              <div className="flex-shrink-0">
                <IconUserRound />
              </div>
              {/* Text Column */}
              <div>
                <div className="font-bold">My profile</div>
                <div className="text-sm text-blue-200">
                  See and/or edit your profile information
                </div>
              </div>
            </div>
          </Link>
          <div className="mt-4 space-y-4">
            <Link
              href="/plans"
              className="block text-white hover:text-blue-100"
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                {/* Icon Column */}
                <div className="flex-shrink-0">
                  <IconArrowBigUp />
                </div>
                {/* Text Column */}
                <div>
                  <div className="font-bold">Upgrade Subscription</div>
                  <div className="text-sm text-blue-200">
                    Current plan:{" "}
                    <span className="font-semibold">{plan ?? ""}</span>
                  </div>
                </div>
              </div>
            </Link>
            <SignInOutMobile
              onSignInOut={session ? signOut : signIn}
              label={session ? "Sign out" : "Sign in"}
            />
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
