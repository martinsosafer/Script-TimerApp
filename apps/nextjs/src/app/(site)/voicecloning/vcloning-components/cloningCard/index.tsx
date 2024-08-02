"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@voiceai/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@voiceai/ui/@/components/ui/dialog";
import { IconClone, IconUserRound } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import LoadingDots from "~/app/(site)/components/loadingdots";
import { api } from "~/utils/api";

interface CloningCardProps {
  id: string;
  name: string;
  description: string;
  externalId: string;
  onGenerateDemo: (
    externalId: string,
    audioRef: React.RefObject<HTMLAudioElement>,
  ) => void;
  refetch: () => void;
}

const CloningCard: React.FC<CloningCardProps> = ({
  id,
  name,
  description,
  externalId,
  onGenerateDemo,
  refetch,
}) => {
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  const { mutateAsync: deleteCustomVoice } =
    api.voiceCustom.deleteCustomVoice.useMutation({
      onSuccess() {
        toast({
          title: "Voice deleted",
          description: "Your custom voice has been deleted",
        });
        refetch();
        router.push("/voicecloning");
      },
      onError(error) {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      },
    });

  const handleGenerateDemo = async () => {
    setLoading(true);
    try {
      await onGenerateDemo(externalId, audioRef);
    } catch (error) {
      console.error("Failed to generate demo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCustomVoice({ voiceId: externalId });
      setLoading(false);
      setOpenDelete(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to delete custom voice:", error);
    }
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:bg-gray-800 dark:text-white">
      <div className="flex items-start space-x-4">
        <IconUserRound className="h-12 w-12 text-primary" />
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-black">{name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <Button
          onClick={handleGenerateDemo}
          className={`flex items-center justify-center ${loading ? "bg-blue-400" : "bg-blue-600"} h-9 w-40 rounded-md text-white`}
        >
          {loading ? (
            <LoadingDots color="white" style="small" />
          ) : (
            "Generate Demo"
          )}
        </Button>
        <Button
          onClick={() => setOpenDelete(true)}
          className="rounded-md bg-red-600 px-4 py-2 text-white"
        >
          Delete
        </Button>
      </div>
      <audio ref={audioRef} controls style={{ display: "none" }} />
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Delete Custom Voice
            </DialogTitle>
            <DialogDescription>
              This will delete your custom voice.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" autoFocus value={name} readOnly />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleDelete} className="gap-1 bg-red-600">
              {loading ? (
                <LoadingDots color="white" style="small" />
              ) : (
                <>Delete</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const CustomVoiceCards: React.FC = () => {
  const { data: customvoices = [], refetch } =
    api.voiceCustom.listAllCustomVoices.useQuery("", {
      refetchOnWindowFocus: true,
    });

  const handleGenerateDemo = async (
    externalId: string,
    audioRef: React.RefObject<HTMLAudioElement>,
  ) => {
    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "This is a cloned voice created by Script Timer",
          voice_id: externalId,
          voice_actor: "your-demo-voice-actor",
          stability: 0.5,
          similarity: 0.5,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from API:", errorText);
        throw new Error("Failed to fetch the text-to-speech stream.");
      }

      const responseBody = response.body;
      if (!responseBody) {
        throw new Error("Response body is null.");
      }

      const mediaSource = new MediaSource();
      const objectUrl = URL.createObjectURL(mediaSource);
      if (audioRef.current) {
        audioRef.current.src = objectUrl;
      }

      mediaSource.addEventListener("sourceopen", async () => {
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
        const reader = responseBody.getReader();

        const readStream = async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              if (!sourceBuffer.updating) {
                mediaSource.endOfStream();
                if (audioRef.current) {
                  audioRef.current.play().catch((error) => {
                    console.error("Failed to play audio:", error);
                  });
                }
              } else {
                sourceBuffer.addEventListener(
                  "updateend",
                  () => {
                    mediaSource.endOfStream();
                    if (audioRef.current) {
                      audioRef.current.play().catch((error) => {
                        console.error("Failed to play audio:", error);
                      });
                    }
                  },
                  { once: true },
                );
              }
              break;
            }
            sourceBuffer.appendBuffer(value);
          }
        };

        readStream().catch((error) => {
          console.error("Error reading stream:", error);
          if (!sourceBuffer.updating) {
            mediaSource.endOfStream("decode");
          } else {
            sourceBuffer.addEventListener(
              "updateend",
              () => {
                mediaSource.endOfStream("decode");
              },
              { once: true },
            );
          }
        });
      });

      console.log("Demo generated successfully!");
    } catch (error) {
      console.error("Failed to generate demo:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {customvoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 p-4 text-center text-slate-500">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#1877F290] bg-blue-300">
            <IconClone className="text-black" />
          </div>
          <span className="whitespace-pre-line text-sm">
            No voices created yet. Give it a try!
            {"\n"}
            Use a clean sample recording. Samples should contain:
            {"\n"}1 speaker, be over 1 minute long, and no background noise.
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 p-4 text-center text-slate-500">
          <span className="whitespace-pre-line text-sm">
            Great! Looks like you created a custom voice. Use it on the
            text-to-voice page now!
          </span>
          {customvoices.map((voice) => (
            <CloningCard
              key={voice.id}
              id={voice.id}
              name={voice.name}
              description={voice.description || "No description available"}
              externalId={voice.external_id}
              onGenerateDemo={handleGenerateDemo}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomVoiceCards;
