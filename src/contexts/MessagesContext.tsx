"use client";
import { GetUserSettings } from "@/lib/actions";
import { pusherClient } from "@/lib/pusher";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

interface MessageContextType {
  chatId: string;
  messages: Message[];
  setChatId: React.Dispatch<React.SetStateAction<string>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
   

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState("");

  const translateMessage = async (message: Message): Promise<Message> => {
    const settings = await GetUserSettings(session?.user?.id || null)
    if (!settings?.auto_translate || !settings.default_language) return message;
    console.log('function ran')

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: JSON.stringify({
          text: message.content,
          targetLang: settings.default_language,
        }),
      });

      const { translated } = await res.json();
      return { ...message, content: translated, isTranslated: true };
    } catch (error) {
      console.error("Translation failed:", error);
      return message;
    }
  };

  useEffect(() => {
     const handleIncomingMessage = async (data: Message) => {
       const processedMessage = await translateMessage(data);

       setMessages((prev) => {
         const exists = prev.some((msg) => msg.id === processedMessage.id);
         return exists
           ? prev.map((msg) =>
               msg.id === processedMessage.id ? processedMessage : msg
             )
           : [...prev, processedMessage];
       });
     };

    pusherClient.subscribe(chatId);
    pusherClient.bind("incoming-messages", handleIncomingMessage);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("incoming-messages", handleIncomingMessage);
    };
  }, [chatId, messages]);

  return (
    <MessageContext.Provider
      value={{
        chatId,
        messages,
        setChatId,
        setMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context)
    throw new Error(
      "useMessageContext must be in wrapped in a MessageContextProvider!"
    );
  return context;
};
