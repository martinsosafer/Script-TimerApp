"use client";

import * as React from "react";

import { Button } from "@voiceai/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@voiceai/ui/@/components/ui/accordion";
import { IconChevronDown } from "@voiceai/ui/@/components/ui/icons";

const PromptingGuideContent = React.lazy(() => import("./PromptContent"));

export function PromptingGuideAccordion() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <section className="bg-cp-background flex w-full flex-col rounded-lg px-5 py-6">
      <h3 className="text-left font-bold">Prompting guide</h3>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-[#898F98]">
          <AccordionTrigger className="px-0 text-sm text-[#212121] lg:text-base lg:px-3">
            Simple effects
          </AccordionTrigger>
          <AccordionContent className="text-xs text-[#212121] px-1 lg:text-sm lg:px-6">
            <>
              <p>For basic sound effects, use clear, concise descriptions:</p>
              <p>{`• "Glass shattering on concrete"`}</p>
              <p>{`• "Heavy wooden door creaking open"`}</p>
              <p>{`• "Thunder rumbling in the distance"`}</p>
            </>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-[#898F98]">
          <AccordionTrigger className="px-0 text-sm text-[#212121] lg:text-base lg:px-3">
            Complex sequences
          </AccordionTrigger>
          <AccordionContent className="text-xs text-[#212121] px-1 lg:text-sm lg:px-6">
            <>
              <p>
                For multi-part sound effects, describe the sequence of events:
              </p>
              <p>{`• "Footsteps on gravel, then a metallic door opens"`}</p>
              <p>{`• "Wind whistling through trees, followed by leaves
              rustling"`}</p>
              <p>{`• "Sword being drawn, then clashing with another blade"`}</p>
            </>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-[#898F98]">
          <AccordionTrigger className="px-0 text-sm text-[#212121] lg:text-base lg:px-3">
            Musical elements
          </AccordionTrigger>
          <AccordionContent className="text-xs text-[#212121] px-1 lg:text-sm lg:px-6">
            <>
              <p>The API also supports generation of musical components:</p>
              <p>{`• "90s hip-hop drum loop, 90 BPM"`}</p>
              <p>{`• "Vintage brass stabs in F minor"`}</p>
              <p>{`• "Atmospheric synth pad with subtle modulation"`}</p>
            </>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border-[#898F98]">
          <AccordionTrigger className="px-0 text-sm text-[#212121] lg:text-base lg:px-3">
            Audio terminology
          </AccordionTrigger>
          <AccordionContent className="text-xs text-[#212121] px-1 lg:text-sm lg:px-6">
            <>
              <p>Common terms that can enhance your prompts:</p>
              <p>
                • <strong>Impact:</strong> Collision or contact sounds between
                objects, from subtle taps to dramatic crashes
              </p>
              <p>
                • <strong>Whoosh:</strong> Movement through air effects, ranging
                from fast and ghostly to slow-spinning or rhythmic
              </p>
              <p>
                • <strong>Ambience:</strong> Background environmental sounds
                that establish atmosphere and space
              </p>
              <p>
                • <strong>One-shot:</strong> Single, non-repeating sound
              </p>
              <p>
                • <strong>Loop:</strong> Repeating audio segment
              </p>
              <p>
                • <strong>Stem:</strong> Isolated audio component
              </p>
              <p>
                • <strong>Braam:</strong> Big, brassy cinematic hit that signals
                epic or dramatic moments, common in trailers
              </p>
              <p>
                • <strong>Glitch:</strong> Sounds of malfunction, jittering, or
                erratic movement, useful for transitions and sci-fi
              </p>
              <p>
                • <strong>Drone:</strong> Continuous, textured sound that
                creates atmosphere and suspense
              </p>
            </>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* <Accordion type="single" collapsible className="w-full max-w-xl">
        <AccordionItem value="prompting-guide">
          <AccordionTrigger className="flex justify-center">
            <div className="flex items-center">
              Prompting Guide
              {!isLoaded && (
                <Button
                  variant="default"
                  size="sm"
                  className="ml-2"
                  onClick={handleLoad}
                >
                  Load
                  <IconChevronDown className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {isLoaded ? (
              <React.Suspense
                fallback={<div className="py-4 text-center">Loading...</div>}
              >
                <PromptingGuideContent />
              </React.Suspense>
            ) : (
              <div className="py-4 text-center">
                Click "Load" to view the Prompting Guide
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
    </section>
  );
}
