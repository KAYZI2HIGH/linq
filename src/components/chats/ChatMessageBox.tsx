'use client'
import { formatTimestamp } from "@/utils/FormatTimeStamps";
import AutoScroll from "./AutoScroll";
import {  useSession } from "next-auth/react";
import { useMessageContext } from "@/contexts/MessagesContext";
import { useEffect } from "react";

const ChatMessageBox = ({initialMessages, chatId }: {initialMessages:Message[], chatId: string }) => {
  const { data: session } = useSession();
  const { messages, setMessages, setChatId } = useMessageContext()
  setChatId(chatId)
  useEffect(() => {
    if(messages.length === 0) setMessages(initialMessages);

  })
  
  return (
    <section className="flex-1 flex flex-col overflow-y-scroll p-4 gap-4 w-full hide_scrollbar">
      {messages &&
        messages.map((msg: Message, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col gap-1 px-4 py-2 rounded-xl w-fit max-w-[70%] min-w-[150px] ${
                session?.user?.email === msg.sender_email
                  ? "bg-[#111827] ml-auto text-white"
                  : "bg-[#F3F4F6] text-black"
              }`}
            >
              <h1 className="text-xs">{msg.content}</h1>
              <p
                className={`ml-auto text-[10px] tracking-wide ${
                  session?.user?.email === msg.sender_email
                    ? "text-[#D1D5DB]"
                    : "text-[#6B7280]"
                }`}
              >
                {formatTimestamp(msg.created_at)}
              </p>
            </div>
          );
        })}
      <AutoScroll />
    </section>
  );
};

export default ChatMessageBox;
