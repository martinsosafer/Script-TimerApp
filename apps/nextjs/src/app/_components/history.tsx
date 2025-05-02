"use client";

import * as React from "react";
import Link from "next/link";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";
import { Document, Paragraph as DocxParagraph, Packer, TextRun } from "docx";
import jsPDF from "jspdf";

import { Button } from "@voiceai/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@voiceai/ui/@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { IconCopy, Icons } from "@voiceai/ui/@/components/ui/icons";
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

export const History = ({ ...rest }) => {
  const [loadingDownload, setLoadingDownload] = React.useState({});
  const { data, isLoading, refetch } = api.history.list.useQuery();
  const { data: subscriptionData } = api.subscription.mySubscription.useQuery();

  console.log("Subscription Data HISTORY: ", subscriptionData);
  const isSubscriptionActive =
    subscriptionData &&
    (subscriptionData.status === "CREATORCLMO" ||
      subscriptionData.status === "STUDENTCLMO" ||
      subscriptionData.status === "BUSINESSCLMO" ||
      subscriptionData.status === "STUDENTCLYR" ||
      subscriptionData.status === "CREATORCLYR" ||
      subscriptionData.status === "BUSINESSCLYR" ||
      subscriptionData.status === "CREATOR" ||
      subscriptionData.status === "STUDENT" ||
      subscriptionData.status === "BUSINESS" ||
      subscriptionData.status == "1" ||
      subscriptionData.status == "2");

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
    if (!text) {
      toast({
        title: "Error",
        description: "No text available to copy",
      });
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Text copied",
          description: "Your text has been successfully copied",
          duration: 2000,
        });
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        toast({
          title: "Error",
          description: "Failed to copy text to clipboard",
        });
      });
  };
  const saveAsPDF = (content) => {
    const pdf = new jsPDF("p", "pt", "letter");
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    pdf.text(content, margin.left, margin.top, {
      align: "left",
      maxWidth: 500,
    });
    pdf.save("document.pdf");
  };

  const saveAsDOCX = async (content) => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new DocxParagraph({
              children: [new TextRun(content)],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.docx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveAsSRT = (content) => {
    const convertToSRT = (text) => {
      const lines = text.split("\n");
      return lines
        .map((line, index) => {
          const start = new Date(index * 1000).toISOString().substr(11, 8);
          const end = new Date((index + 1) * 1000).toISOString().substr(11, 8);
          return `${index + 1}\n${start},000 --> ${end},000\n${line}\n`;
        })
        .join("\n");
    };

    const srtContent = convertToSRT(content);
    const blob = new Blob([srtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.srt";
    a.click();
    URL.revokeObjectURL(url);
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
          <TableHead>Copy Script</TableHead>
          <TableHead>Download Document</TableHead>
          <TableHead>Download Audio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data?.map((history, index) => (
            <TableRow key={history.history_id}>
              <TableCell>{history.prompt}</TableCell>
              <TableCell>-{history.prompt.length}</TableCell>
              <TableCell>{history.created_at.toDateString()}</TableCell>

              <TableCell>{history.voice_name ?? "" ?? ""}</TableCell>
              <TableCell>
                <button
                  type="button"
                  onClick={() => copyTextToClipboard(history.prompt)}
                >
                  <IconCopy width={30} className="stroke-black" />
                </button>
              </TableCell>

              <TableCell>
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ArrowDownOnSquareIcon
                          width={30}
                          className="stroke-black"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-20">
                      <DropdownMenuLabel>Dowload</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="focus:bg-slate-200">
                          <button
                            onClick={() => saveAsPDF(history.prompt)}
                            className="ml-10"
                          >
                            as .PDF
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-slate-200">
                          <button
                            onClick={() => saveAsDOCX(history.prompt)}
                            className="ml-10"
                          >
                            as .DOCX
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-slate-200">
                          <button
                            onClick={() => saveAsSRT(history.prompt)}
                            className="ml-10"
                          >
                            {" "}
                            as .SRT
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>

              <TableCell>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={
                          !isSubscriptionActive || loadingDownload[index]
                        }
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
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    Free users can't download their scripts
                  </HoverCardContent>
                </HoverCard>
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
