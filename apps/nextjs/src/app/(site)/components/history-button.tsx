import Link from "next/link";

import { Button } from "@voiceai/ui/@/components/ui/button";
import { IconHistory } from "@voiceai/ui/@/components/ui/icons";
import { Popover, PopoverTrigger } from "@voiceai/ui/@/components/ui/popover";

interface Props {
  subData: string | undefined;
  setOpenFreeModal: () => void;
}

export function HistoryButton({ subData, setOpenFreeModal }: Props) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          {subData ? (
            <Link href={"/history"} target="_blank">
              <Button
                variant="secondary"
                size="sm"
                className=" rounded-xl bg-sky-600 px-3 font-bold text-primary-foreground hover:bg-blue-600 hover:text-secondary-foreground"
              >
                <IconHistory className="mr-2 h-3 w-3" />
                History
              </Button>
            </Link>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              className=" rounded-xl bg-sky-600 px-3 font-bold text-primary-foreground hover:bg-blue-600 hover:text-secondary-foreground"
              onClick={setOpenFreeModal}
            >
              <IconHistory className="mr-2 h-3 w-3" />
              History
            </Button>
          )}
        </PopoverTrigger>
      </Popover>
    </div>
  );
}
