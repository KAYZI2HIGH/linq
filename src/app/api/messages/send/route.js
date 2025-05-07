// app/api/messages/post/[chatId]/route.ts
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { pusherServer } from "@/lib/pusher";

export async function POST(
  request,
  { params }
) {
  try {
    const { messageContent } = await request.json(); // Destructure only messageContent
    const { chatId } = params; // Get chatId from route params

    if (!chatId || !messageContent) {
      return NextResponse.json(
        { error: "Missing chatId or message" },
        { status: 400 }
      );
    }

    await pusherServer.trigger(chatId, "incoming-messages", messageContent);
    await redis.rpush(`messages:${chatId}`, JSON.stringify(messageContent));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
