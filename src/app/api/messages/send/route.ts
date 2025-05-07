import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  try {
    const { chatId, messageContent } = await req.json();

    if (!chatId || !messageContent) {
      return NextResponse.json(
        { error: "Missing chatId or message" },
        { status: 400 }
      );
    }
    pusherServer.trigger(chatId, "incoming-messages", messageContent);
    await redis.rpush(`messages:${chatId}`, JSON.stringify(messageContent));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { error: "Error adding message" },
      { status: 500 }
    );
  }
}
