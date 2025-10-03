// app/api/messages/get/[chatId]/route.ts
import { NextResponse } from "next/server";
import supabase from "@/lib/supabaseClient";
import { auth } from "@/auth";
import { GetUserSettings } from "@/lib/actions";
import { translateText } from "@/lib/translate";

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  const { chatId } = await params;

  if (!chatId) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }

  try {
    // Get messages from Supabase
    const { data: messages, error } = await supabase
      .from("messages")
      .select()
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json(
        { error: "Error fetching messages" },
        { status: 500 }
      );
    }

    // Get user settings for translation
    const session = await auth();
    const settings = await GetUserSettings(session?.user?.id || null);

    let processedMessages = messages || [];

    // Handle translation if auto-translate is enabled
    if (
      settings?.auto_translate &&
      settings.default_language &&
      messages &&
      messages.length > 0
    ) {
      const foreignMessages = messages.filter(
        (msg: any) => msg.isTranslated !== true
      );
      const messagesToTranslate = foreignMessages.slice(-10);

      const translatedMessages = await Promise.all(
        messagesToTranslate.map(async (msg: any) => {
          try {
            return {
              ...msg,
              content: await translateText(
                msg.content,
                settings.default_language
              ),
              isTranslated: true,
            };
          } catch (error) {
            console.error(`Translation failed for message ${msg.id}`);
            return msg;
          }
        })
      );

      processedMessages = messages.map((msg: any) => {
        const translatedMsg = translatedMessages.find((m) => m.id === msg.id);
        return translatedMsg || msg;
      });
    }

    return NextResponse.json(
      { messages: processedMessages },
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
