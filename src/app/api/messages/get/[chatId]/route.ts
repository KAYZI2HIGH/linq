import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import supabase from "@/lib/supabaseClient";


export async function GET(req: Request,
  { params }: { params: { chatId: string } }
) {
  const {chatId} = await params
  if (!params || !chatId) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }
  try {

    const cachedMessages = await redis.lrange(`messages:${chatId}`, 0, -1);

    if (cachedMessages.length > 0) {
      return NextResponse.json(
        { messages: cachedMessages, source: "redis" },
        { status: 200 }
      );
    }

    const { data: messages, error } = await supabase
      .from("messages")
      .select()
      .eq("chat_id", chatId);

    if (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json(
        { error: "Error fetching messages" },
        { status: 500 }
      );
    }

    if (messages.length > 0) {
      await redis.rpush(
        `messages:${chatId}`,
        ...messages.map((msg) => JSON.stringify(msg))
      );
    }

    return NextResponse.json(
      { messages, source: "supabase" },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
