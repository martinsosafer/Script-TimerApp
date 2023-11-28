import { auth } from "@voiceai/auth";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@voiceai/ui/@/components/ui/tabs";

import { ChatWindow } from "../_components/ai/chat/chat-window";
import SpeechEditor from "../_components/speech-editor";

export const runtime = "edge";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="flex flex-shrink flex-col justify-start">
      <Tabs defaultValue="voice" className="flex flex-col space-y-2 p-4">
        <TabsList className="self-center md:self-end">
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="voice" className="space-y-4">
          <SpeechEditor />
        </TabsContent>
        <TabsContent value="chat" className="space-y-4 rounded-lg bg-white">
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
