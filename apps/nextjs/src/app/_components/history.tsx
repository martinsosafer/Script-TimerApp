"use client";

import ArrowDownOnSquareIcon from "@heroicons/react/24/outline/ArrowDownOnSquareIcon";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@voiceai/ui/@/components/ui/table";

import { api } from "~/utils/api";

export const History = ({ ...rest }) => {
  const { data, isLoading } = api.history.list.useQuery();

  return (
    <Table>
      <TableCaption>A list of your history.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Type</TableHead>
          <TableHead>Prompt</TableHead>
          <TableHead>Credits Used</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Download</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data?.map((history) => (
            <TableRow key={history.credit_id}>
              <TableCell className="font-medium">{history.type}</TableCell>
              <TableCell>{history.prompt}</TableCell>
              <TableCell>{history.credits}</TableCell>
              <TableCell>{history.created_at!.toDateString()}</TableCell>
              <TableCell>
                <button
                  type="button"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = `data:audio/mpeg;base64,${history.file}` ?? "";
                    a.download = "voice.mp3";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                >
                  <ArrowDownOnSquareIcon width={30} className="stroke-black" />
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
