"use client";

import * as React from "react";
import Link from "next/link";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";

import { Button } from "@voiceai/ui";
import {
  IconCopy,
  IconPlay,
  Icons,
  IconStop,
} from "@voiceai/ui/@/components/ui/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@voiceai/ui/@/components/ui/table";
import { toast, ToastAction } from "@voiceai/ui/@/components/ui/toast";

import { api } from "~/utils/api";
import { ActorsDropdown } from "../(site)/components/chat/actorsdropdown";

export const History = ({ ...rest }) => {
  const [loading, setLoading] = React.useState(false);
  const { data, isLoading } = api.history.list.useQuery();
  const [selectedAudio, setSelectedAudio] = React.useState(null);
  const [selectedModel, setSelectedModel] = React.useState(null);
  const { data: voices } = api.voice.list.useQuery({ name: "" });

  const handleSetSelectedModel = (model: any) => {
    setSelectedModel(model);
    // console.log("Selected model:", model);
  };
  // Generate audio voice
  const [audio, setAudio] = React.useState("");

  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { mutateAsync: generateVoice, error } = api.voice.create.useMutation({
    onSuccess(data) {
      const dataURI = `data:audio/mpeg;base64,${data?.audio}`;
      setAudio(dataURI);
      setLoading(false);

      if (audioRef.current) {
        audioRef.current.src = dataURI;
        audioRef.current.addEventListener("loadeddata", playAudio);
      }
    },
    onError(error) {
      setLoading(false);
      if (error?.data?.code === "FORBIDDEN") {
        toast({
          title: "Upgrade your plan",
          description: "The base plan only supports up to 1200 characters",
          action: (
            <ToastAction altText="subscribe">
              <Link href="/settings/billing">Subscribe</Link>
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      }
    },
  });

  // console.log("Data for audio generation:", {
  //   voice_id: selectedModel,
  //   message: message.content,
  // });
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };
  //dowload history script
  const { mutateAsync: downloadGeneration } = api.history.download.useMutation({
    onSuccess(data) {
      setLoading(false);

      if (!data) {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
        return;
      }
      const a = document.createElement("a");
      a.href = `data:audio/mpeg;base64,${data.file}` ?? "";
      a.download = "voice.mp3";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    onError(error) {
      setLoading(false);

      toast({
        title: "Something went wrong",
        description: "Please try again later",
      });
    },
  });
  //copy text from clipboard
  const copyTextToClipboard = (text: string | null) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Text copied",

          duration: 2000,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to copy text to clipboard",
        });
      });
  };
  return (
    <Table>
      <TableCaption>A list of your history.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Scripts</TableHead>
          <TableHead>Characters used</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actor</TableHead>
          <TableHead>Copy</TableHead>
          <TableHead>Change Actor</TableHead>
          <TableHead>Play</TableHead>
          <TableHead>Download</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data?.map((history) => (
            <TableRow key={history.credit_id}>
              <TableCell>{history.prompt}</TableCell>
              <TableCell>{history.credits}</TableCell>
              <TableCell>{history.created_at!.toDateString()}</TableCell>

              <TableCell>
                {/* @ts-ignore */}
                {history.metadata.voice_actor ?? ""}
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  onClick={() => copyTextToClipboard(history.prompt)}
                >
                  <IconCopy width={30} className="stroke-black" />
                </button>
              </TableCell>
              <TableCell>
                <button type="button">
                  <ActorsDropdown
                    voices={voices}
                    setSelectedModel={handleSetSelectedModel}
                    selectedModel={selectedModel}
                  />
                </button>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!selectedModel || !history.prompt || loading}
                  onClick={async () => {
                    setLoading(true);
                    toast({
                      description:
                        "Recording script,please keep in mind that longer scripts take longer to generate.",
                    });
                    try {
                      await generateVoice({
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        voice_id: selectedModel.id,
                        voice_actor: selectedModel?.name,
                        message: history.prompt,
                      });
                    } catch (error) {
                      toast({
                        description:
                          "Error:Keep in mind base plan only allows 1500 words scripts",
                      });
                      console.error("Error generating voice:", error);
                    }
                  }}
                >
                  {loading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <IconPlay />
                  )}
                  <audio
                    src={audio}
                    className="col-span-2 col-start-2 mx-auto w-full"
                    ref={audioRef}
                    onEnded={() => setLoading(false)} // Handle loading state when audio ends
                  />
                  <span className="sr-only">Play sound</span>
                </Button>

                {audio && !loading && (
                  <Button variant="ghost" size="icon" onClick={stopAudio}>
                    <IconStop />
                    <span className="sr-only">Stop sound</span>
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      setLoading(true);
                      console.log(
                        "Downloading history ID:",
                        history.history_id,
                      );
                      await downloadGeneration({
                        id: history.history_id ?? "",
                      });
                    } catch {}
                  }}
                  // onClick={() => {
                  //   const a = document.createElement("a");
                  //   a.href = `data:audio/mpeg;base64,${history.file}` ?? "";
                  //   a.download = "voice.mp3";
                  //   document.body.appendChild(a);
                  //   a.click();
                  //   document.body.removeChild(a);
                  // }}
                >
                  {loading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowDownOnSquareIcon
                      width={30}
                      className="stroke-black"
                    />
                  )}
                </button>
              </TableCell>
            </TableRow>
          ))}
        {isLoading && (
          <TableRow>
            <TableCell colSpan={4}>Loading...</TableCell>
          </TableRow>
        )}
        {!isLoading && !data && (
          <TableRow>
            <TableCell colSpan={4}>No data available.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
