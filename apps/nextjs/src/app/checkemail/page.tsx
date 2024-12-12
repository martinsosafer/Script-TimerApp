import React from "react";

import { Card, CardContent } from "@voiceai/ui/@/components/ui/card";
import { IconCheck } from "@voiceai/ui/@/components/ui/icons";

import { poppins } from "../fonts";

export default function CheckEmail() {
  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-200 ${poppins.className}`}
    >
      <Card className="w-full max-w-md bg-[#0066FF] text-white shadow-lg">
        <CardContent className="flex flex-col items-center p-8">
          <IconCheck className="mb-6 h-16 w-16" />
          <h1 className="mb-4 text-center text-3xl font-bold">
            Thank You ! Welcome to Co-Producer!
          </h1>
          <p className="mb-6 text-center text-xl">Please check your email</p>
          <div className="h-1 w-16 rounded-full bg-white"></div>
        </CardContent>
      </Card>
    </div>
  );
}
