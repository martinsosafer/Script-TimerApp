"use client";

import React from "react";

import { Button } from "@voiceai/ui";
import {
  IconArrowRight,
  IconHandshake,
} from "@voiceai/ui/@/components/ui/icons";

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <dialog className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur">
      <div className="container mx-auto flex  flex-col bg-white">
        <div className="my-auto mb-8 mt-12 grid w-full grid-cols-1 md:grid-cols-2 md:gap-5 xl:gap-14">
          <div className="col-span-1 flex flex-col justify-center text-center lg:text-start">
            <div className="mb-4 flex items-center justify-center lg:justify-normal">
              <img
                className="h-5"
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-1.png"
                alt="logo"
              />
              <h4 className="ml-2 text-sm font-bold uppercase tracking-widest text-primary">
                Get full access
              </h4>
            </div>
            <h1 className="text-dark-grey-900 mb-8 text-4xl font-extrabold leading-tight lg:text-6xl">
              Elevate your speech
            </h1>
            <p className="text-grey-900 mb-6 text-base font-normal leading-7 lg:w-3/4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              autem optio odit voluptas. Maiores facilis fuga eveniet alias
              temporibus repellendus autem dolorum odio nisi error soluta modi,
              minus cupiditate voluptas..
            </p>
            <div className="flex flex-col items-center gap-4 lg:flex-row">
              <Button
                className="flex  items-center rounded-xl bg-primary px-7 py-4 text-sm font-bold text-primary-foreground transition duration-300 hover:text-tertiary focus:ring-4"
                type="button"
                size="sm"
              >
                <IconHandshake className="mr-2" />
                Get started now
              </Button>
              <Button
                className="flex items-center rounded-2xl border border-black bg-secondary px-7 py-4 text-sm font-medium text-secondary-foreground hover:bg-secondary"
                type="button"
                size="sm"
                onClick={onClose}
              >
                <IconArrowRight className="mr-2" />
                Remind me later
              </Button>
            </div>
          </div>
          <div className="col-span-1 hidden items-center justify-end md:flex">
            <img
              className="w-4/5  rounded-lg"
              src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/header-1.png"
              alt="header image"
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
