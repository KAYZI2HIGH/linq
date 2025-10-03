"use client";
import { SidebarMenu, SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";
import ProfileAvatar from "./Avatar";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import ListSkeleton from "./custom-ui/ListSkeleton";
import { GetFriendList } from "@/lib/actions";
import { useMessageContext } from "@/contexts/MessagesContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChatSheet } from "./chats/ChatSheet";

const FriendListContainer = ({ className }: { className?: string }) => {
  const { data: session } = useSession();
  const { setChatId } = useMessageContext();
  const isMobile = useIsMobile();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: () => GetFriendList(),
  });

  const friends = data?.friends ?? [];
  const chats = data?.chats ?? [];

  const handleFriendClick = (friendEmail: string) => {
    const chat = chats.find(
      (chat) =>
        (chat.user1 === session?.user?.email && chat.user2 === friendEmail) ||
        (chat.user1 === friendEmail && chat.user2 === session?.user?.email)
    );

    console.log(chat);

    if (chat?.id && typeof chat.id === "number") {
      setChatId(chat.id);
    } else {
      console.warn("No chat found for this friend");
    }
  };

  if (isLoading || !session?.user) {
    return <ListSkeleton />;
  }

  if (friends.length === 0) {
    return (
      <SidebarMenu className={`px-3 ${className}`}>
        No chats to display...
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu className={className}>
      {friends.map((friend, index) => (
        <div
          key={index}
          className="py-1"
        >
          {isMobile ? (
            <ChatSheet>
              <div
                className="flex gap-3 items-center cursor-pointer w-full pb-3 border-b"
                onClick={() => {
                  handleFriendClick(friend.email);
                }}
              >
                <ProfileAvatar
                  image={friend.image}
                  name={friend.display_name}
                />
                <div className="flex flex-col items-start">
                  <h1 className="text-[#111827] text-sm font-medium truncate max-w-[160px]">
                    {friend.display_name}
                  </h1>
                  <p className="text-xs truncate text-[#6B7280] max-w-[160px]">
                    {friend.email}
                  </p>
                </div>
              </div>
            </ChatSheet>
          ) : (
            <SidebarMenuButton
              className="flex gap-3 h-fit py-2"
              asChild
            >
              <div
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => {
                  handleFriendClick(friend.email);
                }}
              >
                <ProfileAvatar
                  image={friend.image}
                  name={friend.display_name}
                />
                <div>
                  <h1 className="text-[#111827] text-sm font-medium truncate max-w-[160px]">
                    {friend.display_name}
                  </h1>
                  <p className="text-xs truncate text-[#6B7280] max-w-[160px]">
                    {friend.email}
                  </p>
                </div>
              </div>
            </SidebarMenuButton>
          )}
        </div>
      ))}
    </SidebarMenu>
  );
};

export default FriendListContainer;
