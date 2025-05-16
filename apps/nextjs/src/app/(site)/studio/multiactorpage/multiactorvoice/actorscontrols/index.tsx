// components/ActorControls.tsx
"use client";

import { Button } from "@voiceai/ui";
import {
  IconCopy as Copy,
  IconArrowDown,
  IconArrowUp,
  IconTrash as Trash,
} from "@voiceai/ui/@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@voiceai/ui/@/components/ui/tooltip";

interface ActorControlsProps {
  actorId: string;
  index: number;
  totalActors: number;
  onReorder: (actorId: string, direction: "up" | "down") => void;
  onDuplicate: (actorId: string) => void;
  onRemove: (actorId: string) => void;
}

export function ActorControls({
  actorId,
  index,
  totalActors,
  onReorder,
  onDuplicate,
  onRemove,
}: ActorControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onReorder(actorId, "up")}
              disabled={index === 0}
            >
              <IconArrowUp className="h-4 w-4 " />
              <span className="sr-only">Move up</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Move up</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onReorder(actorId, "down")}
              disabled={index === totalActors - 1}
            >
              <IconArrowDown className="h-4 w-4 " />
              <span className="sr-only">Move down</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Move down</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onDuplicate(actorId)}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Duplicate</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Duplicate actor</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {totalActors > 1 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => onRemove(actorId)}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove actor</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove actor</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
