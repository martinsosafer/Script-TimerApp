import React, { useState } from "react";

import { SimilaritySelector } from "../../similarity-selector";
import { SpeedSelector } from "../../speed-selector";
import { StabilitySelector } from "../../stability-selector";
import VoiceWidget from "../voicewidget/voicewidget";
import { StyleSelector } from "../../style-selector";

const TabOne = ({
  setSelectedModel,
  favoriteVoices,
  refreshSubscriptionData,
  subData,
  stability,
  setStability,
  similarity,
  setSimilarity,
  speed,
  setSpeed,
  style,
  setStyle,
}) => {
  const [selectedVoiceType, setSelectedVoiceType] = useState(null);

  return (
    <div className="flex flex-col space-y-4 md:order-1">
      <div className="h-[740px] rounded-lg bg-gray-100 p-6 shadow-md dark:bg-slate-400">
        <VoiceWidget
          onModelSelect={(voice) => {
            setSelectedModel(voice);
            setSelectedVoiceType(voice.type); // Update the selected voice type
          }}
          favoriteVoices={favoriteVoices}
          refreshSubscriptionData={refreshSubscriptionData}
          subData={subData}
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* First row */}
          <div className="col-span-1">
            <StabilitySelector
              value={stability}
              onValueChange={setStability}
              disabled={selectedVoiceType === "GOOGLE"}
              showDisabledText={false}
            />
          </div>
          <div className="col-span-1">
            <SimilaritySelector
              value={similarity}
              onValueChange={setSimilarity}
              disabled={selectedVoiceType === "GOOGLE"}
            />
          </div>

          {/* Second row */}
          <div className="col-span-1">
            <SpeedSelector
              value={speed}
              onValueChange={setSpeed}
              disabled={selectedVoiceType === "GOOGLE"}
            />
          </div>
          <div className="col-span-1">
            <StyleSelector
              value={style}
              onValueChange={setStyle}
              disabled={selectedVoiceType === "GOOGLE"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabOne;
