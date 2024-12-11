import { IconClose } from "@voiceai/ui/@/components/ui/icons";

interface TutorialsModalProps {
  onClose: () => void;
  videoCode: string;
}

export default function TutorialsModal({
  onClose,
  videoCode,
}: TutorialsModalProps) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur">
      <button className="absolute right-4 top-4" onClick={onClose}>
        <IconClose className="h-5 w-5 text-white" strokeWidth="4" />
      </button>
      <iframe
        src={`https://player.vimeo.com/video/${videoCode}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
        className="h-full w-full rounded-lg"
        allow="autoplay; fullscreen; picture-in-picture"
        title="Script-Timer Ai Onboarding video"
      />
    </div>
  );
}
