import ChatInput from "@/components/chats/ChatInput";
import ChatMessageBoxContainer from "@/components/chats/ChatMessageBoxContainer";
import ChatsHeader from "@/components/chats/ChatsHeader";
import HeaderSkeleton from "@/components/skeleton/chatSkeletons/HeaderSkeleton";
import MessageSkeleton from "@/components/skeleton/chatSkeletons/MessageSkeleton";
import { Suspense } from "react";

const FriendChat = async ({ params }: { params: { chatId: string } }) => {
  const { chatId } = await params;
  return (
    <section className="bg-white h-full flex flex-col max-h-dvh">
      <Suspense fallback={<HeaderSkeleton />}>
        <ChatsHeader chatId={chatId} />
      </Suspense>
      <Suspense fallback={<MessageSkeleton />}>
        <ChatMessageBoxContainer chatId={chatId} />
      </Suspense>
      <ChatInput chatId={chatId} />
    </section>
  );
};

export default FriendChat;
