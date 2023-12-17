import * as React from "react";
import type { Metadata } from "next";

import { ScriptAI } from "./script-ai";

export const metadata: Metadata = {
  title: "Script Timer",
  description: "AI helping you find your voice.",
};

export default function ScriptPage() {
  return (
    <>
      <ScriptAI />
    </>
  );
}
