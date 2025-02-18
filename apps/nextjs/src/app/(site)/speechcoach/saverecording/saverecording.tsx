"use client";

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@voiceai/ui/@/components/ui/dialog";
import { Icons } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";

interface SaveRecordingProps {
  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (open: boolean) => void;
  recordingBlob: Blob | null;
  uploadToVercelBlob: (
    blob: Blob,
    customName: string,
  ) => Promise<string | null>;
  setUploadedVideoUrl: (url: string) => void;
  revalidateRecordingPage: () => Promise<void>;
  isLoading: boolean;
  speechName: string;
  setSpeechName: (name: string) => void;
}

export function SaveRecording({
  isRenameModalOpen,
  setIsRenameModalOpen,
  recordingBlob,
  uploadToVercelBlob,
  setUploadedVideoUrl,
  revalidateRecordingPage,
  isLoading,
  speechName,
  setSpeechName,
}: SaveRecordingProps) {
  return (
    <Dialog open={isRenameModalOpen} onOpenChange={setIsRenameModalOpen}>
      <DialogContent className="border-2 border-primary sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-primary">
            <span className="text-2xl font-bold">Name Your Recording</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="speechName"
              className="text-lg font-medium text-black"
            >
              Recording Name
            </Label>
            <Input
              id="speechName"
              autoFocus
              value={speechName}
              maxLength={50}
              onChange={(e) => setSpeechName(e.target.value)}
              className="border border-black"
              placeholder="My Awesome Speech"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-center">
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary font-semibold text-primary"
              onClick={() => setIsRenameModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="border-2 border-primary font-semibold text-primary-foreground"
              size="lg"
              disabled={!speechName || isLoading}
              onClick={async () => {
                if (recordingBlob && speechName) {
                  try {
                    const uploadedUrl = await uploadToVercelBlob(
                      recordingBlob,
                      speechName, // Custom name from input
                    );

                    if (uploadedUrl) {
                      setUploadedVideoUrl(uploadedUrl);
                      await revalidateRecordingPage();
                      setIsRenameModalOpen(false);
                      setSpeechName(""); // Reset input
                      alert("Recording saved successfully!");
                    }
                  } catch (error) {
                    alert("Failed to save recording. Please try again.");
                  }
                }
              }}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save Recording"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
