"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ChatInterface from "./ChatInterface";
import { useMessageContext } from "@/contexts/MessagesContext";
import ChatsHeader from "./ChatsHeader";
import ChatMessageBoxContainer from "./ChatMessageBoxContainer";
import ChatInput from "./ChatInput";
import EmptyState from "../custom-ui/EmptyStates";
import { cn } from "@/lib/utils";
import BackButton from "../BackButton";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getChat, getFriendInfo } from "@/lib/actions";
import HeaderSkeleton from "../skeleton/chatSkeletons/HeaderSkeleton";
import ProfileAvatar from "../Avatar";
import { Button } from "../ui/button";
import { ChevronLeft, EllipsisVertical, Phone, Video } from "lucide-react";

export function ChatSheet({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const messageContext = useMessageContext();
  const chatId =
    messageContext && "chatId" in messageContext
      ? messageContext.chatId
      : undefined;

  // Fetch chat data
  const {
    data: chat,
    error: chatError,
    isLoading: chatLoading,
  } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChat(chatId!),
    enabled: !!chatId,
  });

  // Fetch friend info
  const friendEmail =
    chat && session?.user?.email
      ? chat.user1 === session.user.email
        ? chat.user2
        : chat.user1
      : null;

  const {
    data: friendInfo,
    error: friendInfoError,
    isLoading: friendInfoLoading,
  } = useQuery({
    queryKey: ["friendInfo", friendEmail],
    queryFn: () => getFriendInfo(friendEmail!),
    enabled: !!friendEmail,
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="w-full h-full">{children}</button>
      </SheetTrigger>
      <SheetContent className="!w-full !p-0">
        {chatId ? (
          <section className="bg-white h-full flex flex-col max-h-dvh">
            {chatLoading || friendInfoLoading ? (
              <HeaderSkeleton />
            ) : chatError || friendInfoError ? (
              <section className="p-4 flex justify-between items-center border-b">
                <div className="flex gap-3 justify-center items-center">
                  <SheetClose>
                    <ChevronLeft />
                  </SheetClose>
                  <div className="text-red-500 text-sm">
                    Error loading chat information
                  </div>
                </div>
              </section>
            ) : !chat || !friendInfo ? (
              <section className="p-4 flex justify-between items-center border-b">
                <div className="flex gap-3 justify-center items-center">
                  <BackButton />
                  <div className="text-gray-500 text-sm">Chat not found</div>
                </div>
              </section>
            ) : (
              <section className="p-4 flex justify-between items-center border-b">
                <div className="flex gap-3 justify-center items-center">
                  <SheetClose>
                    <ChevronLeft />
                  </SheetClose>
                  <ProfileAvatar
                    image={friendInfo?.image || ""}
                    name={friendInfo?.display_name || ""}
                  />
                  <div className="space-y-[2px]">
                    <h1 className="text-[#111827] font-medium tracking-wide text-xs capitalize">
                      {friendInfo?.display_name}
                    </h1>
                    <p className="text-[#6B7280] text-[10px] capitalize">
                      online
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <Button
                    variant={"ghost"}
                    className="group"
                  >
                    <Phone
                      size={20}
                      className="text-[#9CA3AF] group-hover:text-black transition-all duration-200"
                    />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="group"
                  >
                    <Video
                      size={20}
                      className="text-[#9CA3AF] group-hover:text-black transition-all duration-200"
                    />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="group"
                  >
                    <EllipsisVertical
                      size={20}
                      className="text-[#9CA3AF] group-hover:text-black transition-all duration-200"
                    />
                  </Button>
                </div>
              </section>
            )}
            <ChatMessageBoxContainer chatId={chatId} />
            <ChatInput chatId={chatId} />
          </section>
        ) : (
          <div className={cn("w-full h-screen md:block")}>
            <EmptyState />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
