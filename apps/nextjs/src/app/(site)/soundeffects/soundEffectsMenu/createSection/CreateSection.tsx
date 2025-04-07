import type { SessionProps } from "../../types";
import { PromptingGuideAccordion } from "./promptingGuideAccordion/PromptingGuideAccordion";
import { SoundEffectsGenerator } from "./soundeffectsGenerator/SoundEffectsGenerator";

const CreateSection = ({ subData }: SessionProps) => {
  return (
    <>
      <PromptingGuideAccordion />
      <SoundEffectsGenerator subData={subData} />
    </>
  );
};

export default CreateSection;

// Move audio player to box with robot (outside box)
