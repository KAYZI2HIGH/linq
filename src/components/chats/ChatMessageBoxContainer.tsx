"use client";

import React from "react";
import ChatMessageBox from "./ChatMessageBox";
import { useQuery } from "@tanstack/react-query";
import MessageSkeleton from "../skeleton/chatSkeletons/MessageSkeleton";
import { getProcessedMessages } from "@/lib/actions";

const ChatMessageBoxContainer = ({ chatId }: { chatId: string }) => {
  const {
    data: processedMessages,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["processedMessages", chatId],
    queryFn: () => getProcessedMessages(chatId),
    enabled: !!chatId,
  });

  // Loading state
  if (isLoading) {
    return (
      <MessageSkeleton />
    );
  }

  // Error state
  if (error) {
    return (
      <section className="flex flex-col h-dvh">
        <div className="w-full bg-white flex flex-col items-center justify-center p-5 py-10 lg:py-4 flex-1 grow overflow-y-scroll">
          <div className="text-center space-y-2">
            <p className="text-red-500 font-medium">Something went wrong</p>
            <p className="text-gray-500 text-sm">
              Failed to load messages. Please try again.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!processedMessages || processedMessages.length === 0) {
    return (
      <section className="flex flex-col h-dvh">
        <div className="w-full bg-white flex flex-col items-center justify-center p-5 py-10 lg:py-4 flex-1 grow overflow-y-scroll">
          <div className="text-center space-y-2">
            <p className="text-gray-500">No messages yet</p>
            <p className="text-gray-400 text-sm">
              Start a conversation by sending a message
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <ChatMessageBox
      initialMessages={processedMessages}
      chatId={chatId}
    />
  );
};

export default ChatMessageBoxContainer;
