"use client";

import React from "react";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { RevealText } from "~/app/animations/RevealText";
import TestimonialsIcon from "../../../../../../public/testimonialIcon.png";
import David from "../../../components/herosection/Testimonials/Testimonialspic/DavidJoo.jpg";
import Jill from "../../../components/herosection/Testimonials/Testimonialspic/Jill.png";
import RandomPerson4 from "../../../components/herosection/Testimonials/Testimonialspic/randomperson4.png";
import RandomPerson5 from "../../../components/herosection/Testimonials/Testimonialspic/randomperson5.png";
import RandomPerson6 from "../../../components/herosection/Testimonials/Testimonialspic/randomperson6.png";
import Susan from "../../../components/herosection/Testimonials/Testimonialspic/Susan.png";

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
      "“We are overwhelmed with thanks...Thank you for your support and tools!”",
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
    <Swiper
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 15 }, // For smaller screens
        768: {
          slidesPerView: 2, // Show 2 testimonials on medium and larger screens
          spaceBetween: 20,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="h-[320px] w-full py-10 md:max-w-5xl "
    >
      {testimonialsData.map(({ id, name, work, testimonial, image }) => (
        <SwiperSlide key={id} className=" cursor-pointer md:px-5">
          <RevealText>
            <div className=" h-[270px] max-w-xl rounded-lg border border-tertiary bg-white p-5 shadow-sm">
              <div className="flex flex-col items-start">
                <div className="mb-2 flex-shrink-0">
                  <Image
                    src={image}
                    alt={name}
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <h4 className="font-poppins text-lg font-semibold">{name}</h4>
                <p className="font-poppins text-sm font-medium text-primary">
                  {work}
                </p>
                <p className="max-w-xs overflow-hidden overflow-ellipsis font-poppins text-sm leading-relaxed text-black">
                  {testimonial}
                </p>
              </div>
            </div>
          </RevealText>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
