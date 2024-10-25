import Link from "next/link";

import { IconUserRound, IconWallet } from "@voiceai/ui/@/components/ui/icons";

import type { NavBarProps } from "..";
import SignInOut from "./sign-in-out";

interface ProfileProps extends NavBarProps {
  plan: string | undefined;
}

export default function ProfileNavItem({
  signOut,
  signIn,
  plan,
  session,
}: ProfileProps) {
  return (
    <div className="group relative">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white">
        <IconUserRound className="text-white" />
      </div>

      <div className="invisible absolute -left-64 top-2 z-50 min-w-[300px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100 ">
        <div className="relative top-6 w-full rounded-xl bg-slate-100 p-6 shadow-xl dark:bg-primary-foreground">
          <div className="absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-slate-100 transition-transform duration-500 ease-in-out group-hover:translate-x-[14.5rem] dark:bg-primary-foreground" />
          <div className="relative z-10">
            <div className="mt-2 grid grid-cols-1 gap-6">
              {session && (
                <ul className="mt-1 text-[15px]">
                  <li>
                    <Link
                      href={"/my-profile"}
                      className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                    >
                      <div className="flex items-center gap-1">
                        {/* Envuelve el icono y el texto en un div flex */}
                        <span className="flex h-6 w-6 items-center justify-center">
                          <IconUserRound className="h-5 w-5" />
                        </span>
                        <span className="mt-0.5">My Profile</span>
                      </div>
                      <p className="font-normal text-gray-500">
                        See and/or edit your profile information.
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/new-plans"}
                      className="-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-200 hover:via-blue-200 hover:to-orange-200 hover:text-indigo-600 dark:text-secondary-foreground dark:hover:bg-gradient-to-br dark:hover:from-gray-800 dark:hover:via-gray-700 dark:hover:to-gray-600 dark:hover:text-indigo-600"
                    >
                      <div className="flex items-center gap-1">
                        {/* Envuelve el icono y el texto en un div flex */}
                        <span className="flex h-6 w-6 items-center justify-center">
                          <IconWallet className="h-5 w-5" />
                        </span>
                        <span className="mt-0.5">Upgrade Subscription</span>
                      </div>
                      <p className="font-normal text-gray-500">
                        Current Plan: <strong>{plan ?? ""}</strong>
                      </p>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <SignInOut
            onSignInOut={session ? signOut : signIn}
            label={session ? "Sign out" : "Sign in"}
          />
        </div>
      </div>
    </div>
  );
}
