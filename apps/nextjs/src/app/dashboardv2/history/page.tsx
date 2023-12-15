import type { Metadata } from "next";
import Image from "next/image";

// import { PlusCircledIcon } from "@voiceai/ui/rea"

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@voiceai/ui/@/components/ui/hover-card";
import { Label } from "@voiceai/ui/@/components/ui/label";
import { ScrollArea, ScrollBar } from "@voiceai/ui/@/components/ui/scroll-area";
import { Separator } from "@voiceai/ui/@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@voiceai/ui/@/components/ui/tabs";
import { Textarea } from "@voiceai/ui/@/components/ui/textarea";

import { History } from "../../_components/history";
import { AlbumArtwork } from "../components/album-artwork";
// import { CodeViewer } from "./components/code-viewer"
// import { MaxLengthSelector } from "./components/maxlength-selector"
import { PodcastEmptyPlaceholder } from "../components/podcast-empty-placeholder";
import { listenNowAlbums, madeForYouAlbums } from "../data/albums";
// import { PresetActions } from "./components/preset-actions"
// import { PresetSave } from "./components/preset-save"
// import { PresetSelector } from "./components/preset-selector"
// import { PresetShare } from "./components/preset-share"
// import { TemperatureSelector } from "./components/temperature-selector"
// import { TopPSelector } from "./components/top-p-selector"
import { models, types } from "../data/models";
import { presets } from "../data/presets";

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
};

export default function HistoryPage() {
  return (
    <>
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <History />
        </div>
      </div>
    </>
  );
}
