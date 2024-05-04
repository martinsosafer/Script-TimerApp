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
    name: "DAVID JOO",
    work: "CEO at KnowRe",
    testimonial:
      "“We had an incredible time working with you. We are overwhelmed with our results…Thank you!”",
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
    name: "David Alons",
    work: "Marketing Consultant",
    testimonial:
      "Script Timer was incredibly useful in managing my project deadlines.",
    image: RandomPerson4,
  },
  {
    id: 5,
    name: "Lisa Johnson",
    work: "MD",
    testimonial:
      "I work in medical communications and I’m truly impressed with your technology’s ability to correctly pronounce  the technical terms",
    image: RandomPerson5,
  },
  {
    id: 6,
    name: "Lorena Rijurfd",
    work: "Exectuve Producer",
    testimonial: "Script Timer helps me tremendously in my job presentation",
    image: RandomPerson6,
  },
];

export default function Slide() {
  return (
    <Swiper
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 15 },
        678: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="h-[350px] w-full md:max-w-5xl"
    >
      {testimonialsData.map(({ id, name, work, testimonial, image }) => (
        <SwiperSlide key={id} className="my-5 cursor-pointer md:px-10">
          <RevealText>
            <div className=" max-w-md">
              <Image
                src={TestimonialsIcon}
                alt="Testimonials"
                width={50}
                height={50}
                className="mb-4 "
              />
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0">
                  <Image
                    src={image}
                    alt={name}
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <div className="mb-2">
                    <h4>{name}</h4>
                    <p className="text-primary">{work}</p>
                  </div>
                  <p className="max-w-xs overflow-hidden overflow-ellipsis">
                    {testimonial}
                  </p>
                </div>
              </div>
            </div>
          </RevealText>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
