"use client";

import * as React from "react";
import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";

import { Icons } from "@voiceai/ui/@/components/ui/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@voiceai/ui/@/components/ui/table";
import { toast } from "@voiceai/ui/@/components/ui/toast";

import { api } from "~/utils/api";

export const History = ({ ...rest }) => {
  const [loading, setLoading] = React.useState(false);
  const { data, isLoading } = api.history.list.useQuery();

  const { mutateAsync: downloadGeneration, error } =
    api.history.download.useMutation({
      onSuccess(data) {
        setLoading(false);

        console.log("in data here", data);
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
  return (
    <Table>
      <TableCaption>A list of your history.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Script</TableHead>
          <TableHead>Characters used</TableHead>
          <TableHead>Date</TableHead>
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
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      setLoading(true);

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
