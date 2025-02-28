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
    <div className="flex w-full justify-center">
      <Accordion type="single" collapsible className="w-full max-w-xl">
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
      </Accordion>
    </div>
  );
}
