import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import supabase from "@/lib/supabaseClient";


export async function GET(
  request,
  { params }
) {
  if (!params?.chatId) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }

  const { chatId } = params;

  try {
    // 1. Check Redis cache
    const cachedMessages = await redis.lrange(`messages:${chatId}`, 0, -1);
    const parsedMessages = cachedMessages.map(
      (msg) => JSON.parse(msg)
    );

    if (parsedMessages.length > 0) {
      return NextResponse.json(
        {
          messages: parsedMessages,
          source: "redis",
        },
        { status: 200 }
      );
    }

    // 2. Fallback to Supabase
    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    // 3. Cache results if found
    if (messages && messages.length > 0) {
      await redis.rpush(
        `messages:${chatId}`,
        ...messages.map((msg) => JSON.stringify(msg))
      );
    }

    return NextResponse.json(
      {
        messages: messages || [],
        source: "supabase",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
