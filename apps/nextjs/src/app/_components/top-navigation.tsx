"use client";

import React, { useState } from "react";
import Link from "next/link";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import ChartPieIcon from "@heroicons/react/24/outline/ChartPieIcon";
import ClipboardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import ClockIcon from "@heroicons/react/24/outline/ClockIcon";
import FolderIcon from "@heroicons/react/24/outline/FolderIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Avatar from "boring-avatars";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@voiceai/ui";

const navItems = [
  { name: "Generate voice & script", href: "/generate", icon: ClipboardIcon },
  { name: "History", href: "/history", icon: ClockIcon },
  { name: "Voice library", href: "/voice-library", icon: FolderIcon },
  { name: "Resources", href: "/resources", icon: ChartPieIcon },
  { name: "Account", href: "/account", icon: UserIcon, mobileOnly: true },
];

const USER_ONE = "User one";

const TopNavigation = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className=" top-0 z-50 flex w-full flex-col justify-between bg-blue-700 p-3">
      {/* Logo and Hamburger Icon */}
      <div className="flex items-center justify-between">
        <div className="hidden text-center text-2xl text-white md:block">
          insta<strong>voice</strong>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            <Bars3Icon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Logo Centered for Mobile and Desktop View */}
        <div className="flex-grow md:hidden">
          <div className="text-center text-2xl text-white">
            insta<strong>voice</strong>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems
                .filter((item) => !item.mobileOnly)
                .map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      className="flex items-center p-2 text-white hover:bg-blue-800"
                      href={item.href}
                      passHref
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User Avatar */}
        <div className="hidden items-center rounded-full border border-white p-2 md:flex">
          <Avatar
            size={40}
            name={USER_ONE}
            variant="pixel" // You can choose other variants like 'beam', 'pixel', etc.
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} // Define your color palette
          />
          <span className="ml-2 text-white">{USER_ONE}</span>
        </div>
      </div>

      {/* Mobile Navigation Menu, shown/hidden based on state */}
      {isMobileMenuOpen && (
        <div className="flex w-full grow flex-col justify-center">
          <NavigationMenu
            className={`md:hidden ${
              isMobileMenuOpen ? "flex" : "hidden"
            } max-w-screen-md justify-center`}
          >
            <NavigationMenuList className="flex w-max flex-col">
              {navItems.map((item) => (
                <NavigationMenuItem className="w-full" key={item.name}>
                  <Link
                    href={item.href}
                    passHref
                    className="flex items-center justify-center p-2 text-white hover:bg-blue-800"
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </div>
  );
};

export default TopNavigation;
