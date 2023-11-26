import { auth } from "@voiceai/auth";

import SpeechEditor from "../_components/speech-editor";

export const runtime = "edge";

export default async function HomePage() {
  const session = await auth();

  return (
    <>
      {/* <div className="flex w-full flex-col items-center rounded-md bg-white"> */}
      <SpeechEditor />
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
