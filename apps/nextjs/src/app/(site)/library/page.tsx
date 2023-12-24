import type { Metadata } from "next";

import { Separator } from "@voiceai/ui/@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@voiceai/ui/@/components/ui/tabs";

import { CustomVoiceEmptyPlaceholder } from "../components/custom-voice-empty-placeholder";
import { Library } from "./library";

export const metadata: Metadata = {
  title: "Library",
  description: "Example music app using the components.",
};

export default function LibraryPage() {
  return (
    <>
      {/* <Library /> */}
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <Tabs defaultValue="voices" className="h-full space-y-6">
            <div className="space-between flex items-center">
              <TabsList>
                <TabsTrigger value="voices" className="relative">
                  Voices
                </TabsTrigger>
                <TabsTrigger value="generate">Generate</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="voices"
              className="mb-10 border-none p-0 outline-none"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Listen Now
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Top voices for you. Updated regularly. Click to preview!
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <Library />
            </TabsContent>
            <TabsContent
              value="generate"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Generate Voice
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your custom voice, unique to you.
                  </p>
                </div>
              </div>
              <Separator className="my-4" />
              <CustomVoiceEmptyPlaceholder />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
