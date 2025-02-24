"use client";

import Image from "next/image";

import { Card, CardContent } from "@voiceai/ui/@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@voiceai/ui/@/components/ui/carousel";

import { RevealText } from "~/app/animations/RevealText";
import { roboto } from "~/app/fonts";
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
    <div className="mx-auto w-full max-w-5xl px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonialsData.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start gap-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-blue-600">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.work}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mb-4 text-gray-700">
                    &ldquo;{testimonial.testimonial}&rdquo;
                  </blockquote>
                  <time className="text-sm text-gray-500">November 2024</time>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
