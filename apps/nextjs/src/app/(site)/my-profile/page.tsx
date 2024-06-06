import { auth } from "@voiceai/auth";
import {
  IconPencilLine,
  IconUserRound,
} from "@voiceai/ui/@/components/ui/icons";

import SubscriptionDetails from "./subscription-details";

export default async function MyProfile() {
  const session = await auth();

  return (
    <div className="flex h-full w-full justify-center bg-[#FAFAFA] py-10">
      <div className="flex h-[800px] w-[1024px] flex-col items-center overflow-hidden rounded-3xl bg-white shadow-lg shadow-gray-500">
        <div className="h-[100px] w-full bg-gradient-to-b from-[#0066FF] to-[#13EBCDCC]" />
        <div className="flex w-full flex-col p-8">
          <div className="mt-[-80px] flex flex-col items-start">
            <div className="relative flex h-40 w-40 cursor-pointer items-center justify-center rounded-full border-8 border-white bg-gray-400">
              <IconUserRound className="h-20 w-20 text-white" />
              <div className="absolute bottom-0 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <IconPencilLine className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="p-4">
              <h1 className="text-xl font-semibold text-gray-600">
                {session?.user.name}
              </h1>
              <p className="text-md text-gray-600">{session?.user.email}</p>
            </div>
          </div>
          <SubscriptionDetails />
        </div>
      </div>
    </div>
  );
}
