import React, { useEffect, useState } from "react";

import { Card } from "@voiceai/ui/@/components/ui/card";
import { ClapperboardIcon } from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";
import { roboto } from "~/app/fonts";

export default function ScriptAiMock() {
  const [selectedStyle, setSelectedStyle] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const baseText =
    "Can you help me deliver a better speech? This is my opening:<br />Thank you for having me today. It's an honor to be here with you. My name is Sofia and I want to start today with a story about a girl that grew up in Kansas…";

  const storyStyles = {
    "Ted Talk":
      "I had just stepped off the yellow school bus when I was 8 years old. That's when I saw it—a tractor, charging towards me at full speed. The driver had lost control, waving frantically. It's in those split-second moments that we realize something crucial: life can change in an instant. I remember the...",
    Novel:
      "The sun hung low in the Kansas sky, casting long shadows as I stepped off the yellow school bus. I was only eight. That's when I saw the tractor. It barreled toward me, dust swirling around its tires. The driver's face was pale, his arms flailing in desperate signals. I stood frozen in place, my heart pounding in my chest. I still remember the way time seemed to slow down...",
    "Blog Post":
      "So, there I was, 8 years old, just getting off the school bus like any other day in Kansas. But this day was different. As I stepped down, I saw a tractor coming at me, and I mean full speed. The driver had totally lost control, waving his arms like crazy. For a split second, I froze. It was one of those moments you never forget...",
  };

  useEffect(() => {
    if (selectedStyle && !isTyping) {
      setIsTyping(true);
      setDisplayText(""); // Clear the display text initially

      // Use the full text for the selected style
      const fullText = storyStyles[selectedStyle];

      // Use a different approach to typing
      let currentText = "";
      let index = 0;

      const typeCharacter = () => {
        if (index < fullText.length) {
          currentText += fullText[index];
          setDisplayText(currentText);
          index++;

          // Use setTimeout instead of setInterval for more precise control
          setTimeout(typeCharacter, 20);
        } else {
          setIsTyping(false);
        }
      };

      // Start typing
      typeCharacter();

      // Cleanup function
      return () => {
        setIsTyping(false);
      };
    }
  }, [selectedStyle]);

  return (
    <div style={{ minHeight: "250px" }}>
      <h3 className="text-[14px] font-normal leading-[19.6px]">
        In the app, enter your text here. This is our sample:
      </h3>
      <Card className=" mb-4 mt-2 h-[94px] w-[860px] rounded-lg border border-slate-300 bg-white">
        <p
          className="px-[24px] py-[14px]"
          dangerouslySetInnerHTML={{ __html: baseText }}
        ></p>
      </Card>
      <h4 className="text-[14px] font-normal leading-[20px]">
        Choose a style for this rewrite:
      </h4>
      <div className="mb-4 mt-2 flex space-x-4">
        {Object.keys(storyStyles).map((style) => (
          <Button
            key={style}
            onClick={() => setSelectedStyle(style)}
            label={`${style} Style`}
            className={`border-cp-primary rounded-full border px-4 py-4 ${roboto.className} text-sm font-normal ${
              selectedStyle === style
                ? "bg-cp-primary text-white"
                : "bg-white text-black"
            }`}
            disabled={isTyping}
            type="custom"
            icon={ClapperboardIcon}
            iconPosition="left"
            iconColor={`${selectedStyle === style ? "#FFCB7F" : "#0066FF"}`}
          />
        ))}
      </div>
      <Card className="mt-3 h-[120px] w-[860px] rounded-lg border border-slate-300 bg-white">
        <p className="px-[24px] py-[14px]">{displayText}</p>
        {isTyping && <span className="animate-pulse">|</span>}
      </Card>
    </div>
  );
}
