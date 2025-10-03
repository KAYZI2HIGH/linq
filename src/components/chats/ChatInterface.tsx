"use client";
import { useMessageContext } from "@/contexts/MessagesContext";
import { cn } from "@/lib/utils";
import EmptyState from "../custom-ui/EmptyStates";
import ChatInput from "./ChatInput";
import ChatMessageBoxContainer from "./ChatMessageBoxContainer";
import ChatsHeader from "./ChatsHeader";

const ChatInterface = () => {
  const messageContext = useMessageContext();
  const chatId =
    messageContext && "chatId" in messageContext
      ? messageContext.chatId
      : undefined;

  if (chatId) {
    return (
      <section className="bg-white h-full flex flex-col max-h-dvh">
        <ChatsHeader chatId={chatId} />
        <ChatMessageBoxContainer chatId={chatId} />
        <ChatInput chatId={chatId} />
      </section>
    );
  }

  return (
    <div className={cn("w-full h-screen md:block")}>
      <EmptyState />
    </div>
  );
};

export default ChatInterface;
