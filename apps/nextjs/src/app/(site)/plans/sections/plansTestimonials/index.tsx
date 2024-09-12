import Image from "next/image";

import {
  FacebookIcon,
  MapPinIcon,
  StarIcon,
} from "@voiceai/ui/@/components/ui/icons";

import David from "../../../components/herosection/Testimonials/Testimonialspic/DavidJoo.jpg";
import Jill from "../../../components/herosection/Testimonials/Testimonialspic/Jill.png";
import Susan from "../../../components/herosection/Testimonials/Testimonialspic/Susan.png";

const ratings = [
  { icon: "G", score: "4.8", reviews: "200+ Reviews" },
  {
    icon: <FacebookIcon className="h-6 w-6" />,
    score: "4.6",
    reviews: "400+ Reviews",
  },
  {
    icon: <MapPinIcon className="h-6 w-6" />,
    score: "4.8",
    reviews: "100+ Reviews",
  },
  {
    icon: <StarIcon className="h-6 w-6" />,
    score: "4.7",
    reviews: "200+ Reviews",
  },
];

const testimonials = [
  {
    quote: "We are so happy we work with you, our efficiency has exploded.",
    author: "David J",
    position: "CEO ",
    image: David,
  },
  {
    quote:
      "We were searching for a solution, and this platform is exactly what we needed.",
    author: "Susan C",
    position: "Senior Marketing Lead",
    image: Susan,
  },
  {
    quote:
      "Our productivity is now over 4 times higher than just last quarter. Our ability to create is amazingly fast, accurate and has the highest efficacy.",
    author: "Jill B",
    position: "CEO",
    image: Jill,
  },
];

export default function PricingTestimonials() {
  return (
    <div className="mb-5 mb-8 rounded-md bg-blue-600 p-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid grid-cols-2 gap-4 rounded-lg bg-white p-6 text-black md:grid-cols-4">
          {ratings.map((rating, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 p-2 text-white">
                {typeof rating.icon === "string" ? rating.icon : rating.icon}
              </div>
              <div>
                <div className="text-2xl font-bold">{rating.score}</div>
                <div className="text-sm">{rating.reviews}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="space-y-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 fill-current text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-lg">"{testimonial.quote}"</p>
              <div className="flex items-center space-x-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm opacity-75">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
