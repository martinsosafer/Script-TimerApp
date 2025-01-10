import {
  IconCopy,
  IconDownload,
  IconSave,
} from "@voiceai/ui/@/components/ui/icons";

import Button from "~/app/(site)/components/button";

interface AudioControlsProps {
  audioUrl: string | null;
  onDownload: () => void;
  onCopyTranscript: () => void;
  onSave: () => void;
  isLoading: boolean;
  disableAudio?: boolean; // New optional prop
}

export function AudioControls({
  audioUrl,
  onDownload,
  onCopyTranscript,
  onSave,
  isLoading,
  disableAudio = false, // Default value
}: AudioControlsProps) {
  if (!audioUrl) return null;

  return (
    <div className="mt-6 text-center">
      <audio
        controls
        src={audioUrl}
        className="w-full"
        disabled={disableAudio} // Conditionally disable audio
      />
      <div className="mt-4 flex justify-center space-x-4">
        <Button
          label="Download"
          type="primary"
          onClick={onDownload}
          icon={IconDownload}
          iconColor="#FFFFFF"
        />
        <Button
          label="Copy transcript"
          type="primary"
          onClick={onCopyTranscript}
          icon={IconCopy}
          iconColor="#FFFFFF"
        />
        <Button
          label="Save Recording"
          type="primary"
          onClick={onSave}
          icon={IconSave}
          iconColor="#FFFFFF"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
