import type { UseChatHelpers } from "ai/react";

import { Button } from "@voiceai/ui/@/components/ui/button";
// import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from "@voiceai/ui/@/components/ui/icons";

const exampleMessages = [
  {
    heading: "Write an action script",
    message: `Write me an action script`,
  },
  {
    heading: "Summarize a script",
    message: "Summarize this script: \n",
  },
  {
    heading: "Revise a script",
    message: `Revise this script: \n`,
  },
];

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, "setInput">) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">Welcome to Script Coach</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an AI powered chat to help you come up with scripts{" "}
          {/* <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
          <ExternalLink href="https://vercel.com/storage/kv">
            Vercel KV
          </ExternalLink> */}
          .
        </p>
        <p className="leading-normal text-muted-foreground">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
