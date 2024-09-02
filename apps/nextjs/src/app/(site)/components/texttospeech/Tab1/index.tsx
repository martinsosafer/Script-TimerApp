import React from "react";

import { StabilitySelector } from "../../stability-selector";
import VoiceWidget from "../voicewidget/voicewidget";

const TabOne = ({
  setSelectedModel,
  favoriteVoices,
  refreshSubscriptionData,
  subData,
  stability,
  setStability,
}) => {
  return (
    <div className="flex flex-col space-y-4 md:order-1">
      <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-slate-400">
        <VoiceWidget
          onModelSelect={setSelectedModel}
          favoriteVoices={favoriteVoices}
          refreshSubscriptionData={refreshSubscriptionData}
          subData={subData}
        />

        <StabilitySelector value={stability} onValueChange={setStability} />
      </div>
    </div>
  );
};

export default TabOne;
