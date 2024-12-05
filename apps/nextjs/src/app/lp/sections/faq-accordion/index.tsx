"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@voiceai/ui/@/components/ui/accordion";

import { poppins } from "~/app/fonts";

export default function FAQAccordion() {
  return (
    <div className="bg-slate-200 px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h2
          className={`text-cp-primary mb-8 text-center text-[34px] ${poppins.className} font-bold leading-[41px]`}
        >
          FAQ
        </h2>
        <Accordion type="multiple" className="space-y-3">
          <AccordionItem value="item-1">
            <AccordionTrigger className="mr-3 rounded-lg border-none  bg-white px-6 shadow-sm">
              <span className=" text-left font-bold text-black">
                How secure is my data with Co-Producer?
              </span>
            </AccordionTrigger>
            <AccordionContent className=" bg-slate-200 px-6 py-2 ">
              Your data is protected with industry-standard encryption and
              security measures.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="mr-3 rounded-lg border-none  bg-white px-6 shadow-sm">
              <span className="text-left font-bold text-black">
                Will Co-Producer slow down my website or video player?
              </span>
            </AccordionTrigger>
            <AccordionContent className="bg-slate-200 px-6 py-2">
              Co-Producer is optimized for performance and should not affect
              your website or video player speed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="shadow-s mr-3 rounded-lg  border-none bg-white px-6">
              <span className="text-left font-bold text-black">
                Is there additional support available?
              </span>
            </AccordionTrigger>
            <AccordionContent className="bg-slate-200 px-6 py-2">
              Our core competency is launching brands with videos, pitches, and
              stories, so we are here to support you with consultations or
              training as you need, and our schedule allows.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="shadow-s mr-3 rounded-lg  border-none bg-white px-6">
              <span className="text-left font-bold text-black">
                Who is using Co-Producer?
              </span>
            </AccordionTrigger>
            <AccordionContent className="bg-slate-200 px-6 py-2">
              Many leading brands and content creators use Co-Producer to
              enhance their media presence.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
