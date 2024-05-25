import { clearChats, getChats } from "~/app/actions/chatactions";

async function loadChats(userId?: string) {
  console.log("LOAD CHATS", userId);
  const chats = await getChats(userId);
  return chats;
}

export async function POST(req: Request): Promise<Response> {
  console.log("REQUEST", req);
  try {
    const { userId } = await req.json();
    const chats = await loadChats(userId);

    console.log("CHATS", chats);

    return new Response(JSON.stringify(chats));
  } catch (err) {
    console.error(err);
    return new Response(err.message, {
      status: 500,
    });
  }
}
