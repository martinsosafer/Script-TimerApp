"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@voiceai/ui";
import {
  IconArrowRight,
  IconHandshake,
} from "@voiceai/ui/@/components/ui/icons";

import modalpicture from "../../../../public/modalimage.svg";

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <dialog className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="container mx-auto flex flex-col rounded-xl bg-white p-6 md:p-10 lg:p-16">
        <div className="my-auto mb-8 grid w-full grid-cols-1 md:mt-12 md:grid-cols-2 md:gap-5 xl:gap-14">
          <div className="col-span-1 flex flex-col justify-center text-center lg:text-start">
            <div className="mb-4 flex items-center justify-center lg:justify-normal">
              <img
                className="h-4 md:h-5"
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-1.png"
                alt="logo"
              />
              <h4 className="ml-2 text-sm font-bold uppercase tracking-widest text-primary">
                Start Now
              </h4>
            </div>
            <h1 className="text-dark-grey-900 mb-8 text-3xl font-extrabold leading-tight md:text-4xl lg:text-6xl">
              Your voice matters
            </h1>
            <p className="text-grey-900 mb-6 text-sm font-normal leading-7 md:text-base lg:w-3/4">
              Hi there, please add a discounted subscription before new
              (slightly higher) pricing levels are introduced in just days.
            </p>
            <span className="font-extrabold text-primary">
              {" "}
              Join a membership today and SAVE 50%
            </span>
            <div className="mt-4 flex flex-col items-center gap-4 md:flex-row">
              <Link
                href="https://script-timer.com/voice123-promo-pricing/"
                target="_blank"
              >
                <Button
                  className="flex items-center rounded-xl bg-tertiary px-7 py-4 text-lg font-bold text-black hover:bg-tertiary focus:ring-4 md:text-xl"
                  type="button"
                  size="sm"
                >
                  <IconHandshake className="mr-2" />
                  Get Full Access
                </Button>
              </Link>
              <Button
                className="flex items-center rounded-2xl border border-black bg-secondary px-7 py-4 text-xs font-medium text-secondary-foreground hover:bg-secondary md:text-sm"
                type="button"
                size="sm"
                onClick={onClose}
              >
                <IconArrowRight className="mr-2" />
                Start free trial
              </Button>
            </div>
          </div>
          <div className="col-span-1 hidden items-center justify-end md:flex">
            <Image
              className="w-full rounded-lg"
              src={modalpicture}
              alt="header image"
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
