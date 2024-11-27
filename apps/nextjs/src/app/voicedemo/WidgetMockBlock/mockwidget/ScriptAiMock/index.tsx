import React, { useEffect, useState } from "react";

import { Button } from "@voiceai/ui";
import { Card } from "@voiceai/ui/@/components/ui/card";

export default function ScriptAiMock() {
  const [selectedStyle, setSelectedStyle] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const baseText =
    "Thank you for having me today. It's an honor to be here with you. My name is Sofia, and, I want to start today with a story about a girl that grew up in Kansas…";

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
      setDisplayText("");
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayText((prev) => prev + storyStyles[selectedStyle][i]);
        i++;
        if (i === storyStyles[selectedStyle].length) {
          clearInterval(intervalId);
          setIsTyping(false);
        }
      }, 20);
      return () => clearInterval(intervalId);
    }
  }, [selectedStyle]);

  return (
    <Card className="mx-auto max-w-2xl p-6">
      <h2 className="mb-4 text-2xl font-bold">Story Rewrite Widget</h2>
      <p className="mb-4">{baseText}</p>
      <div className="mb-4 flex space-x-4">
        <Button
          onClick={() => setSelectedStyle("Ted Talk")}
          disabled={isTyping}
        >
          Ted Talk Style
        </Button>
        <Button onClick={() => setSelectedStyle("Novel")} disabled={isTyping}>
          Novel Style
        </Button>
        <Button
          onClick={() => setSelectedStyle("Blog Post")}
          disabled={isTyping}
        >
          Blog Post Style
        </Button>
      </div>
      <Card className="h-48 overflow-y-auto p-4">
        <p>{displayText}</p>
        {isTyping && <span className="animate-pulse">|</span>}
      </Card>
    </Card>
  );
}
