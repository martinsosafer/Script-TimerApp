import type { Message as VercelChatMessage } from "ai";
import { LangChainStream, StreamingTextResponse } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";

export const copilot = async (
  systemMessage = "",
  messages: VercelChatMessage[] = [],
) => {
  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
    modelName: "gpt-4-1106-preview",
  });

  llm
    .call(
      [
        new SystemMessage(systemMessage),
        ...messages.map((m) =>
          m.role == "user"
            ? new HumanMessage(m.content)
            : new AIMessage(m.content),
        ),
      ],
      {},
      [handlers],
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
};
