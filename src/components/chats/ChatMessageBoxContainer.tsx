import React from "react";
import ChatMessageBox from "./ChatMessageBox";
import { GetUserSettings } from "@/lib/actions";
import { auth } from "@/auth";
import { translateText } from "@/lib/translate";

const ChatMessageBoxContainer = async ({ chatId }: { chatId: string }) => {

  const messagesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/get/${chatId}`,
    { cache: "no-store" }
  );
  const { messages } = await messagesRes.json()

  const session = await auth();
  const settings = await GetUserSettings(session?.user?.id || null);

  let processedMessages = [...messages];

  if (settings?.auto_translate && settings.default_language) {
    const foreignMessages = messages.filter(
      (msg: Message) => msg.isTranslated !== true
    );

    const messagesToTranslate = foreignMessages.slice(-10);

    const translatedMessages = await Promise.all(
      messagesToTranslate.map(async (msg:Message) => {
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

    processedMessages = messages.map((msg: Message) => {
      const translatedMsg = translatedMessages.find((m) => m.id === msg.id);
      return translatedMsg || msg;
    });
  }

  return (
    <ChatMessageBox
      initialMessages={processedMessages}
      chatId={chatId}
    />
  );
};

export default ChatMessageBoxContainer;
