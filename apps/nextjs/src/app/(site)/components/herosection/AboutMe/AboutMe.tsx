import React from "react";
import Image from "next/image";
import Link from "next/link";

import { RevealText } from "~/app/animations/RevealText";
import PrimaryButton from "../../primary-button";
import { MotionTransition } from "../MotionTransition";

export function AboutMe() {
  return (
    <div>
      <MotionTransition>
        <h1 className="mt-5 text-center font-poppins text-3xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
          Welcome
        </h1>
      </MotionTransition>
      <div className=" relative p-4  md:py-10">
        <div className="mx-auto grid max-w-5xl md:grid-cols-2">
          <div>
            <RevealText>
              <h1 className="font-poppins text-5xl font-semibold ">
                Improve your speech with
                <span className="block text-primary">Script Timer</span>
                and be creative
              </h1>
            </RevealText>
            <RevealText>
              <p className=" mt-2 max-w-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                veniam architecto, pariatur vel sed ea molestias, laborum
                officia, sint eius dicta corrupti delectus enim dolorem?
                Exercitationem laudantium molestias quis perspiciatis!
              </p>
            </RevealText>
            <RevealText>
              <div className="mt-2">
                <PrimaryButton>
                  <Link href="">LinkedIn</Link>
                </PrimaryButton>
              </div>
            </RevealText>
          </div>

          <MotionTransition className=" ml-12 flex items-center  justify-center">
            <Image
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQY2Fe8J7XSuFcbYtI7AItCG8hgYFiFpcja6m8DcwTSCkj2cAzX"
              alt="User"
              className="w-full rounded-full"
            />
          </MotionTransition>
        </div>
        {/* {showModal && !isSubscriptionActive && (
        <Modal
        onClose={closeModal}
        handleInitialFreeTrial={handleInitialFreeTrial}
        />
      )} */}
      </div>
    </div>
  );
}
