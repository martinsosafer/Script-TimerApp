"use client";

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
  console.log("HEREHERE", data);
  return (
    <Table>
      <TableCaption>A list of your history.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Type</TableHead>
          <TableHead>Prompt</TableHead>
          <TableHead>Credits Used</TableHead>
          <TableHead>Time</TableHead>
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
