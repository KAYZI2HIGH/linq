"use client";
import { SidebarMenu, SidebarMenuButton } from "./ui/sidebar";
import ProfileAvatar from "./Avatar";
import Link from "next/link";
import { useNotify } from "@/contexts/FriendRequestContext";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const ListFriends = ({
  initialFriends,
  initialChats,
  className,
}: {
  initialFriends: UserSettings[];
  initialChats: Chat[];
  className?: string;
  }) => {
  const {data: session} = useSession()
  const { friendList,friendChat, setFriendList, setFriendChat } = useNotify();

  useEffect(() => {
    if (friendList.length === 0) {
      setFriendList(initialFriends);
    }
    if(friendChat.length === 0)
    setFriendChat(initialChats);
  });

  if (friendList && friendList.length === 0) {
    return (
      <SidebarMenu className={`px-3 ${className}`}>
        No chats to display...
      </SidebarMenu>
    );
  }
  return (
    <>
      <SidebarMenu className={className}>
        {friendList.map((friend, index) => {
         const chat = friendChat.find(
           (chat) =>
             (chat.user1 === session?.user?.email &&
               chat.user2 === friend.email) ||
             (chat.user1 === friend.email &&
               chat.user2 === session?.user?.email)
          );
          
          return (
            <SidebarMenuButton
              key={index}
              className="py-8"
            >
              <SidebarMenuButton
                className="flex gap-3 h-fit py-2"
                asChild
              >
                <Link
                  href={`/dashboard/chats/${chat?.id}`}
                  className="flex gap-3 items-center"
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
                </Link>
              </SidebarMenuButton>
            </SidebarMenuButton>
          );
        })}
      </SidebarMenu>
    </>
  );
};

export default ListFriends;
