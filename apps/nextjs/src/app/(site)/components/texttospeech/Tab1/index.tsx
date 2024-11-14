import React from "react";

import { SimilaritySelector } from "../../similarity-selector";
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
}) => {
  return (
    <div className="flex flex-col space-y-4 md:order-1">
      <div className="h-[718px] rounded-lg bg-gray-100 p-6 shadow-md  dark:bg-slate-400">
        <VoiceWidget
          onModelSelect={setSelectedModel}
          favoriteVoices={favoriteVoices}
          refreshSubscriptionData={refreshSubscriptionData}
          subData={subData}
        />

        <StabilitySelector value={stability} onValueChange={setStability} />
        <SimilaritySelector value={similarity} onValueChange={setSimilarity} />
      </div>
    </div>
  );
};

export default TabOne;
