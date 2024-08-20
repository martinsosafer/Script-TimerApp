import Link from "next/link";
import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@voiceai/ui/@/components/ui/button";
import { IconCheck } from "@voiceai/ui/@/components/ui/icons";
import { Textarea } from "@voiceai/ui/@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@voiceai/ui/@/components/ui/tooltip";

import SelectedModelCard from "../../voicewidget/selectedcard/selectedcard";

const CheckGrammarBlock = ({
  script,
  setScript,
  revisedScript,
  setRevisedScript,
  selectedModel,
  loading,
  setLoading,
  checkAndPublish,
  onCopy,
  isCopied,
}) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-rows-2 gap-6 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-1">
        <div>
          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Your script here..."
            className="min-h-[50vh] md:min-h-[55vh] lg:min-h-[70vh] xl:min-h-[70vh]"
          />
          <div className="flex items-center justify-end">
            {selectedModel && (
              <SelectedModelCard selectedModel={selectedModel} />
            )}
          </div>
        </div>
        {revisedScript.length > 0 ? (
          <div className="relative">
            <Textarea
              value={revisedScript}
              onChange={(e) => setRevisedScript(e.target.value)}
              className="min-h-[50vh] md:min-h-[55vh] lg:min-h-[70vh] xl:min-h-[70vh]"
            />
            <div className="flex items-center justify-end">
              <h3 className="text-lg font-medium">
                If you want more writing support, go to:{" "}
                <Link
                  href="https://script-timer.com/chat"
                  target="_blank"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  https://script-timer.com/chat
                </Link>{" "}
                or, our other tools at{" "}
                <Link
                  href="https://script-timer.com/more-tools/"
                  target="_blank"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  https://script-timer.com/more-tools/
                </Link>{" "}
                or ask an expert writer for help at{" "}
                <span className="text-blue-500 underline hover:text-blue-700">
                  info@Ripmediagroup.com
                </span>
              </h3>
            </div>
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="absolute -right-10 top-8 mr-2 mt-2 px-3"
                    disabled={
                      loading ||
                      script.trim() === "" ||
                      script === revisedScript
                    }
                    onClick={() => {
                      setLoading(true);
                      checkAndPublish(script);
                    }}
                  >
                    <IconRefresh className="text-blue-500" />
                    <span className="sr-only">Revise</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Revise script</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute -right-10 top-0 mr-2 mt-2 px-3"
                    onClick={onCopy}
                  >
                    {isCopied ? (
                      <IconCheck className="text-blue-500" />
                    ) : (
                      <CopyIcon className="text-blue-500" />
                    )}
                    <span className="sr-only">Copy message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Click to copy.</TooltipContent>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className="flex cursor-pointer flex-col items-center justify-evenly rounded-md border bg-muted p-1 text-center">
            <span>Grammar and spell check your script</span>
            <Button
              className="border-2 border-dashed"
              disabled={script.trim() === "" || script === revisedScript}
              onClick={() => {
                setLoading(true);
                checkAndPublish(script);
              }}
            >
              Grammar and Spelling
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckGrammarBlock;
