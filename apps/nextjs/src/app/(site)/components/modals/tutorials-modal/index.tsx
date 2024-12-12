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
      <section className="from-cp-primary relative h-[220px] w-[360px] rounded-md bg-gradient-to-br to-black px-4 py-2 lg:flex lg:h-[545px] lg:w-[943px] lg:rounded-xl lg:px-8 lg:py-6">
        <button className="absolute right-2 top-2" onClick={onClose}>
          <IconClose className="h-5 w-5 text-white" strokeWidth="4" />
        </button>
        <div className="h-full w-full overflow-hidden rounded-2xl">
          <iframe
            src={`https://player.vimeo.com/video/${videoCode}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
            className="h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Script-Timer Ai Onboarding video"
          />
        </div>
      </section>
    </div>
  );
}
