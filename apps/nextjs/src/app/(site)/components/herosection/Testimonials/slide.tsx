"use client";

import React from "react";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { RevealText } from "~/app/animations/RevealText";
import TestimonialsIcon from "../../../../../../public/testimonialIcon.png";
import RandomPerson1 from "../../../components/herosection/Testimonials/Testimonialspic/randomperson1.png";
import RandomPerson2 from "../../../components/herosection/Testimonials/Testimonialspic/randomperson2.png";
import RandomPerson3 from "../../../components/herosection/Testimonials/Testimonialspic/randomperson3.png";
import RandomPerson4 from "../../../components/herosection/Testimonials/Testimonialspic/randomperson4.png";
import RandomPerson5 from "../../../components/herosection/Testimonials/Testimonialspic/randomperson5.png";
import RandomPerson6 from "../../../components/herosection/Testimonials/Testimonialspic/randomperson6.png";

const testimonialsData = [
  {
    id: 1,
    name: "Lorena Rijurfd",
    work: "Exectuve Producer",
    testimonial: "Script Timer help me tremendously for my job presentation",

    image: RandomPerson1,
  },
  {
    id: 2,
    name: "Lorena Rijurfd",
    work: "Exectuve Producer",
    testimonial: "Script Timer help me tremendously for my job presentation",
    image: RandomPerson2,
  },
  {
    id: 3,
    name: "Lorena Rijurfd",
    work: "Exectuve Producer",
    testimonial: "Script Timer help me tremendously for my job presentation",
    image: RandomPerson3,
  },
  {
    id: 4,
    name: "Lorena Rijurfd",
    work: "Exectuve Producer",
    testimonial: "Script Timer help me tremendously for my job presentation",
    image: RandomPerson4,
  },
  {
    id: 5,
    name: "Lorena Rijurfd",
    work: "Exectuve Producer",
    testimonial: "Script Timer help me tremendously for my job presentation",
    image: RandomPerson5,
  },
  {
    id: 6,
    name: "Lorena Rijurfd",
    work: "Exectuve Producer",
    testimonial: "Script Timer help me tremendously for my job presentation",
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
      className="h-[250px] w-full md:max-w-5xl"
    >
      {testimonialsData.map(({ id, name, work, testimonial, image }) => (
        <SwiperSlide key={id} className="my-5 cursor-pointer md:px-10">
          <RevealText>
            <Image
              src={TestimonialsIcon}
              alt="Testimonials"
              width={50}
              height={50}
              className="h-auto w-auto"
            />
            <div className="my-5">{testimonial}</div>
            <div className="flex">
              <Image
                src={image}
                alt={name}
                width={50}
                height={50}
                className="mr-5"
              />
              <div>
                <h4 className="text-center">{name}</h4>
                <p className="text-primary">{work}</p>
              </div>
            </div>
          </RevealText>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
