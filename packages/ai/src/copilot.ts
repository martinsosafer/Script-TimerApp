import type { Message as VercelChatMessage } from "ai";
import { AgentExecutor } from "langchain/agents";
import { OpenAIFunctionsAgentOutputParser } from "langchain/agents/openai/output_parser";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { AIMessage, FunctionMessage } from "langchain/schema";
import type { AgentStep, BaseMessage } from "langchain/schema";
import { RunnableSequence } from "langchain/schema/runnable";
import { formatToOpenAIFunction } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";

export const copilot = async (messages = []) => {
  const messagesFormatted = messages.filter(
    (message: VercelChatMessage) =>
      message.role === "user" || message.role === "assistant",
  );

  const currentMessageContent =
    // @ts-expect-error will refactor how we do messages later
    messagesFormatted[messagesFormatted.length - 1].content as string;

  const tools = [new Calculator()];
  /**
   * Define your chat model to use.
   * In this example we'll use gpt-4 as it is much better
   * at following directions in an agent than other models.
   */
  const model = new ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0,
    streaming: true,
  });
  /**
   * Define your prompt for the agent to follow
   * Here we're using `MessagesPlaceholder` to contain our agent scratchpad
   * This is important as later we'll use a util function which formats the agent
   * steps into a list of `BaseMessages` which can be passed into `MessagesPlaceholder`
   */
  const prompt = ChatPromptTemplate.fromMessages([
    ["ai", "You are a helpful assistant"],
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad"),
  ]);
  /**
   * Bind the tools to the LLM.
   * Here we're using the `formatToOpenAIFunction` util function
   * to format our tools into the proper schema for OpenAI functions.
   */
  const modelWithTools = model.bind({
    functions: [...tools.map((tool) => formatToOpenAIFunction(tool))],
  });
  /**
   * Define a new agent steps parser.
   */
  const formatAgentSteps = (steps: AgentStep[]): BaseMessage[] =>
    steps.flatMap(({ action, observation }) => {
      if ("messageLog" in action && action.messageLog !== undefined) {
        const log = action.messageLog as BaseMessage[];
        return log.concat(new FunctionMessage(observation, action.tool));
      } else {
        return [new AIMessage(action.log)];
      }
    });
  /**
   * Construct the runnable agent.
   *
   * We're using a `RunnableSequence` which takes two inputs:
   * - input --> the users input
   * - agent_scratchpad --> the previous agent steps
   *
   * We're using the `formatForOpenAIFunctions` util function to format the agent
   * steps into a list of `BaseMessages` which can be passed into `MessagesPlaceholder`
   */

  const runnableAgent = RunnableSequence.from([
    {
      input: (i: { input: string; steps: AgentStep[] }) => i.input,
      agent_scratchpad: (i: { input: string; steps: AgentStep[] }) =>
        formatAgentSteps(i.steps),
    },
    prompt,
    modelWithTools,
    new OpenAIFunctionsAgentOutputParser(),
  ]);
  /** Pass the runnable along with the tools to create the Agent Executor */
  const executor = AgentExecutor.fromAgentAndTools({
    agent: runnableAgent,
    tools,
  });

  console.log("Loaded agent executor");

  const query = currentMessageContent;
  console.log(`Calling agent executor with query: ${query}`);
  const test = await executor.call(
    {
      input: query,
    },
    // [handlers],
  );

  return test;
};
