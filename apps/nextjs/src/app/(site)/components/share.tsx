"use client";

import { useParams } from "next/navigation";
import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@voiceai/ui/@/components/ui/button";
import { IconArrowShare, IconCheck } from "@voiceai/ui/@/components/ui/icons";
import { Input } from "@voiceai/ui/@/components/ui/input";
import { Label } from "@voiceai/ui/@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@voiceai/ui/@/components/ui/popover";
import { useCopyToClipboard } from "@voiceai/ui/@/hooks/use-copy-to-clipboard";

import { api } from "~/utils/api";

export function Share() {
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
        <Button
          variant="secondary"
          className=" rounded-full bg-blue-300 px-4   py-2  hover:bg-blue-500  hover:text-primary-foreground"
        >
          <IconArrowShare />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[520px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share script</h3>
          <p className="text-sm text-muted-foreground">
            {scriptDetails?.id ? (
              <>
                Anyone who has this link and a Script Timer account will be able
                to view this.
              </>
            ) : (
              <>Select a script to share from the dropdown</>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          {scriptDetails?.id && (
            <>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue={window.location.href}
                  readOnly
                  className="h-9"
                />
              </div>
              <Button type="button" size="sm" className="px-3" onClick={onCopy}>
                {isCopied ? <IconCheck /> : <CopyIcon />}
                <span className="sr-only">Copy message</span>
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
