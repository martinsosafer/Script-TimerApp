"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@voiceai/ui/@/components/ui/button";
import {
  IconArrowShare,
  IconCheck,
  IconHistory,
} from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@voiceai/ui/@/components/ui/popover";
import { useCopyToClipboard } from "@voiceai/ui/@/hooks/use-copy-to-clipboard";

import { api } from "~/utils/api";

export function HistoryButton() {
  const { scriptId } = useParams();
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(window.location.href);
  };

  const { data: scriptDetails } = api.script.get.useQuery(
    { id: scriptId?.[0] ?? "" },
    { enabled: Boolean(scriptId?.[0]) },
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Link href="/history" target="_blank">
          <Button
            variant="secondary"
            className=" bg-secondarybutton px-3 hover:bg-blue-500  hover:text-primary-foreground"
          >
            <IconHistory className="mr-2 h-4 w-4" />
            History
          </Button>
        </Link>
      </PopoverTrigger>
    </Popover>
  );
}
