import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { Icons } from "@voiceai/ui/@/components/ui/icons";

import CustomButton from "../../../custom-button";

const AudioStreamButtons = ({
  subData,
  setOpenFreeModal,
  setLoading,
  loading,
  script,
  selectedModel,
  stability,
  similarity,
  audioRef,
  handleStreaming,

  refetchCredits,
}) => {
  const handleQuickTest = async () => {
    setLoading(true);
    try {
      const firstTenWords = script
        .replace(/<[^>]+>/g, "")
        .split(/\s+/)
        .slice(0, 10)
        .join(" ");
      await handleStreaming({
        userPlan: subData.status,
        voice_id: selectedModel.external_id,
        voice_actor: selectedModel.name,
        message: firstTenWords,
        stability: stability[0],
        similarity: similarity[0],
        setLoading,
        audioRef,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);

      const characterCount = script.replace(/<[^>]+>/g, "").length;
      refetchCredits((prev) => Math.max(0, prev - characterCount));

      await handleStreaming({
        userPlan: subData.status,
        voice_id: selectedModel.external_id,
        voice_actor: selectedModel.name,
        message: script,
        stability: stability[0],
        similarity: similarity[0],
        setLoading,
        audioRef,
      });

      // 3. Force credit refresh with retries
      let retries = 3;
      while (retries > 0) {
        await refetchCredits();
        await new Promise((resolve) => setTimeout(resolve, 300));
        retries--;
      }
    } catch (e) {
      console.error("Creation error:", e);

      refetchCredits(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div>
            <CustomButton
              type="secondary"
              onClick={
                !subData ? () => setOpenFreeModal(true) : handleQuickTest
              }
            >
              <div className="flex items-center">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  </div>
                )}
              </div>
              <span className="relative z-10">
                {loading ? "" : "Quick Test"}
              </span>
            </CustomButton>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-[320px] text-sm" side="left">
          Test the first 10 words of the script
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div>
            <CustomButton
              type="secondary"
              onClick={!subData ? () => setOpenFreeModal(true) : handleCreate}
            >
              <div className="flex items-center">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  </div>
                )}
              </div>
              <span className="relative z-10">{loading ? "" : "Create"}</span>
            </CustomButton>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-[320px] text-sm" side="left">
          Press create after your script is above and your voice actor is chosen
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default AudioStreamButtons;
