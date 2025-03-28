import { PromptingGuideAccordion } from "../promptingGuideAccordion/PromptingGuideAccordion";
import { SoundEffectsGenerator } from "../soundeffectComponent";
import type { SubData } from "../types";
import { getTotalCredits } from "../utils";

interface CreateProps {
  subData: SubData | null | undefined;
  credits: number;
}

const Create = ({ subData, credits }: CreateProps) => {
  const totalCredits = getTotalCredits(subData?.status);

  return (
    <>
      <PromptingGuideAccordion />
      <SoundEffectsGenerator subData={subData} credits={credits} />
    </>
  );
};

export default Create;
