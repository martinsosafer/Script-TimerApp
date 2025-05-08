import React, { useState } from "react";

import { SimilaritySelector } from "../../similarity-selector";
import { SpeedSelector } from "../../speed-selector";
import { StabilitySelector } from "../../stability-selector";
import VoiceWidget from "../voicewidget/voicewidget";

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
}) => {
  const [selectedVoiceType, setSelectedVoiceType] = useState(null);

  return (
    <div className="flex flex-col space-y-4 md:order-1">
      <div className="h-[718px] rounded-lg bg-gray-100 p-6 shadow-md dark:bg-slate-400">
        <VoiceWidget
          onModelSelect={(voice) => {
            setSelectedModel(voice);
            setSelectedVoiceType(voice.type); // Update the selected voice type
          }}
          favoriteVoices={favoriteVoices}
          refreshSubscriptionData={refreshSubscriptionData}
          subData={subData}
        />

        <StabilitySelector
          value={stability}
          onValueChange={setStability}
          disabled={selectedVoiceType === "GOOGLE"} // Disable if Google voice is selected
        />
        <SimilaritySelector
          value={similarity}
          onValueChange={setSimilarity}
          disabled={selectedVoiceType === "GOOGLE"} // Disable if Google voice is selected
        />
        <SpeedSelector
          value={speed}
          onValueChange={setSpeed}
          disabled={selectedVoiceType === "GOOGLE"}
        />
      </div>
    </div>
  );
};

export default TabOne;
