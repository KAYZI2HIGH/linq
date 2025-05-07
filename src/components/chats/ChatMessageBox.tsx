"use client";
import { formatTimestamp } from "@/utils/FormatTimeStamps";
import AutoScroll from "./AutoScroll";
import { useSession } from "next-auth/react";
import { useMessageContext } from "@/contexts/MessagesContext";
import { useEffect } from "react";
import Image from "next/image";

const ChatMessageBox = ({
  initialMessages,
  chatId,
}: {
  initialMessages: Message[];
  chatId: string;
}) => {
  const { data: session } = useSession();
  const { messages, setMessages, setChatId } = useMessageContext();
  useEffect(() => {
    setChatId(chatId);
    setMessages([])
  }, [chatId, setChatId]);
  useEffect(() => {
    if (messages.length === 0) setMessages(initialMessages);
  });

  if (messages.length === 0) {
    return (
      <section className="flex flex-col h-dvh">
        <div className="w-full bg-white flex flex-col items-center justify-center p-5 py-10 lg:py-4 flex-1 grow overflow-y-scroll">
          <div className="max-w-2xl w-full text-center space-y-10">
            <Image
              src="/logo.png"
              alt="Logo"
              height={70}
              width={70}
              className="h-12 mx-auto mb-6"
            />
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide">
                No Messages Found
              </h1>
              <p className="text-base text-gray-600 max-w-md mx-auto leading-relaxed">
                You can start a conversation with your friends by sending them a
                message.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
