"use client";

import React from "react";
import Image from "next/image";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import David from "~/app/(site)/components/herosection/Testimonials/Testimonialspic/DavidJoo.jpg";
import Jill from "~/app/(site)/components/herosection/Testimonials/Testimonialspic/Jill.png";
import RandomPerson4 from "~/app/(site)/components/herosection/Testimonials/Testimonialspic/randomperson4.png";
import RandomPerson5 from "~/app/(site)/components/herosection/Testimonials/Testimonialspic/randomperson5.png";
import RandomPerson6 from "~/app/(site)/components/herosection/Testimonials/Testimonialspic/randomperson6.png";
import Susan from "~/app/(site)/components/herosection/Testimonials/Testimonialspic/Susan.png";
import { RevealText } from "~/app/animations/RevealText";
import { roboto } from "~/app/fonts";

const testimonialsData = [
  {
    id: 1,
    name: "Susan Crandall",
    work: "Senior Director of marketing at LexisNexis",
    testimonial:
      "LexisNexis was searching for the right agency, something innovative, creative, and cutting edge...",
    image: Susan,
  },
  {
    id: 2,
    name: "David Joo",
    work: "CEO at KnowRe",
    testimonial:
      "We are overwhelmed with thanks...Thank you for your support and tools!",
    image: David,
  },
  {
    id: 3,
    name: "Jill Bauman",
    work: "CEO at Imagine L.A.",
    testimonial:
      "It is such a pleasure working with you, your team is unbelievably CREATIVE and ORGANIZED.",
    image: Jill,
  },
  {
    id: 4,
    name: "David Jon",
    work: "Pres at EduNow",
    testimonial:
      "You got us started down the amazing path we are on.THANK YOU!",
    image: RandomPerson4,
  },
  {
    id: 5,
    name: "Lisa Diggs",
    work: "CMO ",
    testimonial:
      "Thanks to you, we have simplified our process by hours. Actually, it saves days!",
    image: RandomPerson5,
  },
  {
    id: 6,
    name: "Lorena Rijurfd",
    work: "Executive Producer",
    testimonial: "Script Timer helps me tremendously in my job presentations.",
    image: RandomPerson6,
  },
];

export default function Slide() {
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 2, spaceBetween: 30 },
        }}
        freeMode={{
          enabled: true,
          momentum: true,
          momentumRatio: 0.3,
        }}
        centeredSlides={false} // Optional: Set to true if you want slides to center
        touchReleaseOnEdges={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="h-auto w-full !overflow-visible py-5 sm:h-[320px] sm:py-10 md:max-w-5xl"
      >
        {testimonialsData.map(({ id, name, work, testimonial, image }) => (
          <SwiperSlide
            key={id}
            className="!w-[85vw] cursor-pointer px-2 sm:!w-auto sm:px-5"
          >
            <RevealText>
              <div className="h-auto w-full bg-white sm:h-[300px] sm:w-[300px]">
                <div className="flex h-full w-full flex-col items-start rounded-2xl p-4 shadow-xl">
                  <div className="flex w-full items-center">
                    <div className="mr-4 flex-shrink-0">
                      <Image
                        src={image}
                        alt={name}
                        width={50}
                        height={50}
                        className="h-[50px] w-[50px] rounded-full sm:h-[60px] sm:w-[60px]"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-cp-primary font-poppins text-[18px] font-bold leading-[24px] sm:text-[20px] sm:leading-[28px]">
                        {name}
                      </h4>
                      <p
                        className={`${roboto.className} text-[11px] font-normal leading-[14px] sm:text-[12px] sm:leading-[16.8px]`}
                      >
                        {work}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`${roboto.className} mt-3 w-full overflow-hidden overflow-ellipsis font-poppins text-xs leading-relaxed text-black sm:mt-4 sm:text-sm`}
                  >
                    {testimonial}
                  </p>
                  <p
                    className={`ml-auto mt-2 font-poppins text-xs text-gray-500 sm:text-sm ${roboto.className}`}
                  >
                    November 2024
                  </p>
                </div>
              </div>
            </RevealText>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
