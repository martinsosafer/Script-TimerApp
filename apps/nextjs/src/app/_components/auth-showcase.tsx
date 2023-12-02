"use server";

import { signOut } from "@voiceai/auth";

export async function AuthShowcase() {
  // const session = await auth();

  // if (!session) {
  //   return (
  //     <form
  //       action={async () => {
  //         await signIn("facebook");
  //       }}
  //     >
  //       <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
  //         Sign in with Facebook
  //       </button>
  //     </form>
  //   );
  // }

  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
        Sign out
      </button>
    </form>
  );
}
