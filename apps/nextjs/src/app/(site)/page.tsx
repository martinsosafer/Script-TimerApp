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
    <>
      <Tabs defaultValue="voice" className="space-y-4 bg-white p-8">
        <TabsList>
          <TabsTrigger value="voice">Voice</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          {/* <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="voice" className="space-y-4">
          <SpeechEditor />
        </TabsContent>
        <TabsContent value="chat" className="space-y-4">
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
      {/* <div className="flex w-full flex-col items-center rounded-md bg-white"> */}
      {/* <SpeechEditor /> */}
      {/* </div> */}

      {/* <div className="w-full ">
              <ChatWindow
                endpoint="api/chat"
                emptyStateComponent={<>empty</>}
                placeholder="Hello, how can I help you today?"
                titleText="VoiceAI"
                emoji="🔊"
                // showIntermediateStepsToggle={true}
              ></ChatWindow>
            </div>
            <Suspense
              fallback={
                <div className="flex w-full flex-col gap-4">LOADING</div>
              }
            >
              <VoiceList />
            </Suspense> */}
    </>
  );
}
