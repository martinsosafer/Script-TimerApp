import { PromptingGuideAccordion } from "../promptingGuideAccordion/PromptingGuideAccordion";
import { SoundEffectsGenerator } from "../soundeffectComponent";
import type { SessionProps } from "../types";

const Create = ({ subData }: SessionProps) => {
  return (
    <>
      <PromptingGuideAccordion />
      <SoundEffectsGenerator subData={subData} />
    </>
  );
};

export default Create;
