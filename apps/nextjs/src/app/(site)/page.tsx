import { auth } from "@voiceai/auth";

import { AuthShowcase } from "../_components/auth-showcase";
import SpeechEditor from "../_components/speech-editor";

export const runtime = "edge";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="container flex h-full flex-col items-start justify-start gap-4 py-8">
      {/* <div className="self-end">
        <AuthShowcase />
      </div> */}

      <div className="flex h-5/6 w-full flex-col items-center rounded-lg bg-white">
        <SpeechEditor />
      </div>

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
  );
}
