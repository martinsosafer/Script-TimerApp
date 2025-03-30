import type { SessionProps } from "../../types";
import { PromptingGuideAccordion } from "./promptingGuideAccordion/PromptingGuideAccordion";
import { SoundEffectsGenerator } from "./soundeffectsGenerator/SoundEffectsGenerator";

const Create = ({ subData }: SessionProps) => {
  return (
    <>
      <PromptingGuideAccordion />
      <SoundEffectsGenerator subData={subData} />
    </>
  );
};

export default Create;

// Move audio player to box with robot (outside box)
