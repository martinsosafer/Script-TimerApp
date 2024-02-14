import * as React from "react";
import type { UseChatHelpers } from "ai/react";

import { prompts, types } from "../../data/prompts";
import type { Prompt } from "../../data/prompts";
import { ChatPromptAccordion } from "../chat-prompt-accordion";
import { ChatPromptSelector } from "../chat-prompt-selector";

export function EmptyScreen({
  // setInput,
  setPrompt,
}: Pick<UseChatHelpers, "setInput"> & {
  setPrompt: React.Dispatch<React.SetStateAction<Prompt | null>>;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">I help you write scripts</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Videos, presentations, speeches, and so much more!
          {/* <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
          <ExternalLink href="https://vercel.com/storage/kv">
            Vercel KV
          </ExternalLink> */}
        </p>
        {/* <p className="leading-normal text-muted-foreground">
          Want to learn more?{" "} */}
        <p>Here, you can:</p>
        <ul>
          <li>1.Use our 'magic prompts' that are set up for you below</li>
          <li>2.Go to the chat box below, and start with your own</li>
          <li>
            3.
            <a
              target="_blank"
              href="https://script-timer.com/blogs/"
              rel="noreferrer"
              className="cursor-pointer underline"
            >
              Learn about using AI models here
            </a>
          </li>
        </ul>

        {/* </p> */}
        <div className="mt-4 flex flex-col items-start space-y-2">
          <ChatPromptSelector
            onPromptSelect={(prompt) => {
              // setInput(prompt?.prompt_display ?? "");
              // @ts-expect-error dunno why cant type this
              setPrompt(prompt);
            }}
            types={types}
            prompts={prompts}
          />
          {/* {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))} */}
        </div>
      </div>
    </div>
  );
}
