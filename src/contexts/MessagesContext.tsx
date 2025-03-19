"use client";
import { pusherClient } from "@/lib/pusher";
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

  useEffect(() => {
    pusherClient.subscribe(chatId);
    pusherClient.bind("incoming-messages", (data: Message) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === data.id);
        if (exists) {
          return prev.map((msg) => (msg.id === data.id ? data : msg));
        } else {
          return [...prev, data];
        }
      });
    });
    return () => {
      pusherClient.unsubscribe(chatId);
    };
  }, [chatId]);

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
