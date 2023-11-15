import { auth } from "@voiceai/auth";

import { AuthShowcase } from "../_components/auth-showcase";
import SpeechEditor from "../_components/speech-editor";

export const runtime = "edge";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 py-8">
        <AuthShowcase />
        <SpeechEditor />

        {session && (
          <>
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
        )}
      </div>
    </main>
  );
}
