"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@voiceai/ui/@/components/ui/accordion";

export default function FAQAccordion() {
  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-cp-primary mb-6 text-center text-3xl font-bold">
        FAQ
      </h2>
      <Accordion type="single" collapsible className="mx-auto max-w-2xl">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How secure is my data with Co-Producer?
          </AccordionTrigger>
          <AccordionContent>
            Your data is protected with industry-standard encryption and
            security measures.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Will Co-Producer slow down my website or video player?
          </AccordionTrigger>
          <AccordionContent>
            Co-Producer is optimized for performance and should not affect your
            website or video player speed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Is there additional support available?
          </AccordionTrigger>
          <AccordionContent>
            Our core competency is launching brands with videos, pitches, and
            stories, so we are here to support you with consultations or
            training as you need, and our schedule allows.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Who is using Co-Producer?</AccordionTrigger>
          <AccordionContent>
            Many leading brands and content creators use Co-Producer to enhance
            their media presence.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
