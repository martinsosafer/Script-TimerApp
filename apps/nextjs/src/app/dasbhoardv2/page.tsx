import { auth } from "@voiceai/auth";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@voiceai/ui/@/components/ui/tabs";

import { ChatWindow } from "../_components/ai/chat/chat-window";
import GrammarEditor from "../_components/grammar-editor";
import SpeechEditor from "../_components/speech-editor";

export const runtime = "edge";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="flex flex-shrink flex-col justify-start">
      <Tabs
        defaultValue="voice"
        className="flex flex-col space-y-2 p-4 md:-mt-2 md:space-y-0"
      >
        <TabsList className="mx-2 self-center md:absolute md:end-16 md:mt-3 md:self-end">
          <TabsTrigger className="bg-[#5A9F75]" value="voice">
            Voice
          </TabsTrigger>
          <TabsTrigger className="bg-[#EF5353] text-black" value="grammar">
            Grammar Check
          </TabsTrigger>
          <TabsTrigger className="bg-[#FF9900]" value="chat">
            Script Coach
          </TabsTrigger>
        </TabsList>
        <TabsContent value="voice" className="mt-0 space-y-4">
          <SpeechEditor />
        </TabsContent>
        <TabsContent value="grammar" className="mt-0 space-y-4">
          <GrammarEditor />
        </TabsContent>
        <TabsContent value="chat" className="flex items-start bg-white">
          <ChatWindow
            endpoint="api/chat"
            emptyStateComponent={<>empty</>}
            placeholder="Hello, how can I help you today?"
            titleText="VoiceAI"
            emoji="🔊"
            // showIntermediateStepsToggle={true}
          ></ChatWindow>
        </TabsContent>
      </Tabs>
    </div>
  );
}
