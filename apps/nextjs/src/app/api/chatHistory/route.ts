import { getChats } from "~/app/actions/chatactions";

async function loadChats(userId?: string) {
  const chats = await getChats(userId);
  return chats;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { userId } = await req.json();
    const chats = await loadChats(userId);

    console.log("HISTORY CHATS: ", chats);

    return new Response(JSON.stringify(chats));
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message as BodyInit | null | undefined, {
      status: 500,
    });
  }
}
