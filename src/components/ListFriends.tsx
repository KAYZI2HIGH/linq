'use client'
import { SidebarMenu, SidebarMenuButton } from "./ui/sidebar";
import ProfileAvatar from "./Avatar";
import Link from "next/link";
import { useNotify } from "@/contexts/FriendRequestContext";

const ListFriends = () => {
  const { friendList } = useNotify()
  
  if (friendList && friendList.length === 0) {
    return <SidebarMenu className="px-3">No chats to display...</SidebarMenu>
  }
  return (
    <>
      <SidebarMenu className="space-y-1">
        {friendList.map((friend) => (
          <SidebarMenuButton
            key={friend.id}
            className="py-8"
          >
            <SidebarMenuButton
              className="flex gap-3 h-fit py-2"
              asChild
            >
              <Link
                href={`/dashboard/chats/${friend.id}`}
                className="flex gap-3"
              >
                <ProfileAvatar
                  image={friend.image}
                  name={friend.name}
                />
                <div>
                  <h1 className="text-[#111827] text-sm font-medium truncate max-w-[160px]">
                    {friend.name}
                  </h1>
                  <p className="text-xs truncate text-[#6B7280] max-w-[160px]">
                    Hey, how are you?
                  </p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </>
  );
};

export default ListFriends;
