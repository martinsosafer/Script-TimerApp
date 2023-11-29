"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CogIcon from "@heroicons/react/24/outline/CogIcon";

import { Button } from "@voiceai/ui";

const TopNavigation = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" top-0 z-50 flex w-full flex-col justify-between bg-blue-700 p-3">
      {/* Logo and Hamburger Icon */}
      <div className="flex items-center justify-between">
        <div className="hidden text-center text-2xl text-white md:block">
          insta<strong>voice</strong>
        </div>

        {/* Mobile Hamburger Icon */}
        {/* <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Bars3Icon className="h-6 w-6 text-white" />
          </Button>
        </div> */}

        {/* Logo Centered for Mobile and Desktop View */}
        <div className="flex-grow md:hidden">
          <div className="text-center text-2xl text-white">
            insta<strong>voice</strong>
          </div>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            className="bg-transparent  focus:text-neutral-500"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <CogIcon className="h-6 w-6 text-white" />
          </Button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg"
            >
              <Link
                href="/settings"
                passHref
                className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <Link
                href="/history"
                passHref
                className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                History
              </Link>
              <button
                onClick={() => {
                  /* Handle logout logic */
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>

        {/* setting drop down */}
        {/* <div className="hidden items-center rounded-full border border-white px-2 py-2 md:flex">
          <CogIcon className="h-6 w-6" />
        </div> */}
      </div>

      {/* Mobile Navigation Menu, shown/hidden based on state */}
      {/* {isMobileMenuOpen && (
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
      )} */}
    </div>
  );
};

export default TopNavigation;
