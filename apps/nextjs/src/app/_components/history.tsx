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
  const [loadingPlay, setLoadingPlay] = React.useState({});
  const [loadingDownload, setLoadingDownload] = React.useState({});
  const [selectedAudio, setSelectedAudio] = React.useState({});
  const [selectedModel, setSelectedModel] = React.useState({});
  const [openDropdownIndex, setOpenDropdownIndex] = React.useState(-1);

  const { data, isLoading,refetch } = api.history.list.useQuery();
  const { data: voices } = api.voice.list.useQuery({ name: "" });
  //Get subscription info
  const { data: subscriptionData } = api.subscription.mySubscription.useQuery();
  const isSubscriptionActive =
    subscriptionData &&
    (subscriptionData.status === "CREATOR" ||
      subscriptionData.status === "STUDENT");

  const handleSetSelectedModel = (model, index) => {
    setSelectedModel((prevState) => ({ ...prevState, [index]: model }));
  };

  // Generate audio voice
  const [audio, setAudio] = React.useState("");

  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { mutateAsync: generateVoice, error } = api.voice.create.useMutation({
    onSuccess(data) {
      const dataURI = `data:audio/mpeg;base64,${data?.audio}`;
      setAudio(dataURI);
      setLoadingPlay(false);

      if (audioRef.current) {
        audioRef.current.src = dataURI;
        audioRef.current.addEventListener("loadeddata", playAudio);
      }
    },
    onError(error) {
      setLoadingPlay(false);
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

  const { mutateAsync: downloadGeneration } = api.history.download.useMutation({
    onSuccess(data) {
      setLoadingDownload(false);

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
      setLoadingDownload(false);

      toast({
        title: "Something went wrong",
        description: "Please try again later",
      });
    },
  });

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

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  // useEffect to close dropdown when selectedModel changes
  React.useEffect(() => {
    setOpenDropdownIndex(-1);
  }, [selectedModel]);

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
          data?.map((history, index) => (
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
                    setSelectedModel={(model) =>
                      handleSetSelectedModel(model, index)
                    }
                    selectedModel={selectedModel[index]}
                    isOpen={openDropdownIndex === index}
                    toggleDropdown={() => toggleDropdown(index)}
                  />
                </button>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={
                    !selectedModel[index] ||
                    !history.prompt ||
                    loadingPlay[index]
                  }
                  onClick={async () => {
                    setLoadingPlay((prevState) => ({
                      ...prevState,
                      [index]: true,
                    }));
                    toast({
                      description:
                        "Recording script,please keep in mind that longer scripts take longer to generate.",
                    });
                    try {
                      await generateVoice({
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        voice_id: selectedModel[index].id,
                        voice_actor: selectedModel[index]?.name,
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
                  {loadingPlay[index] ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <IconPlay />
                  )}
                  <audio
                    src={audio}
                    className="col-span-2 col-start-2 mx-auto w-full"
                    ref={audioRef}
                    onEnded={() =>
                      setLoadingPlay((prevState) => ({
                        ...prevState,
                        [index]: false,
                      }))
                    } // Handle loading state when audio ends
                  />
                  <span className="sr-only">Play sound</span>
                </Button>

                {audio && !loadingPlay[index] && (
                  <Button variant="ghost" size="icon" onClick={stopAudio}>
                    <IconStop />
                    <span className="sr-only">Stop sound</span>
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!isSubscriptionActive || loadingDownload[index]}
                  onClick={async () => {
                    setLoadingDownload((prevState) => ({
                      ...prevState,
                      [index]: true,
                    }));
                    try {
                      console.log(
                        "Downloading history ID:",
                        history.history_id,
                      );
                      const data = await downloadGeneration({
                        id: history.history_id ?? "",
                      });
                      if (!data) {
                        toast({
                          title: "Something went wrong",
                          description: "Please try again later",
                        });
                      }
                    } catch (error) {
                      toast({
                        title: "Something went wrong",
                        description: "Please try again later",
                      });
                    } finally {
                      setLoadingDownload((prevState) => ({
                        ...prevState,
                        [index]: false,
                      }));
                    }
                  }}
                >
                  {loadingDownload[index] ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowDownOnSquareIcon
                      width={30}
                      className="stroke-black"
                    />
                  )}
                </Button>
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
