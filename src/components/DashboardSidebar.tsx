import { Bell, LucideProps, MessageSquare, PlusIcon, Settings2, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import ProfileAvatar from "./Avatar";
import LogoutBtn from "./LogoutBtn";
import { useNotify } from "@/contexts/FriendRequestContext";
import FriendRequestNumber from "./FriendRequestNumber";
import ListFriends from "./ListFriends";
import { ForwardRefExoticComponent, RefAttributes, Suspense } from "react";

interface Item {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}
  
const items: Item[] = [
  {
    title: "Chats",
    url: "/dashboard/chats",
    icon: MessageSquare,
  },
  {
    title: "Friends",
    url: "/dashboard/friends",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
  },
];

export async function DashboardSidebar() {
  const session = await auth();

  if (!session) {
    notFound();
  }
  return (
    <Sidebar className="shadow-sm border-0">
      <SidebarHeader className="bg-white border-b border-black/10">
        <div className=" px-2 w-full pt-[16px] flex justify-between items-center">
          <div className="flex gap-[12px]">
            <ProfileAvatar
              image={session.user?.image || ""}
              name={session.user?.name || ""}
            />

            <div>
              <h1 className="text-[#111827] text-sm font-semibold capitalize truncate max-w-[140px] tracking-wider">
                {session.user?.name}
              </h1>
              <p className="text-[10px] text-[#111827] font-medium tracking-wider">Online</p>
            </div>
          </div>
          <div className="relative">
            <Bell className="size-[22px]" />
            <span className="absolute -top-[2px] -right-[2px] size-[14px] rounded-full bg-red-600 text-xs text-white flex justify-center items-center">
              3
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup className="flex flex-col gap-3 px-3">
          <SidebarGroupLabel className="text-[#111827c9] text-[17px] tracking-wider font-semibold">
            Messages
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.title === "Friends") {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className="py-2 pl-3 flex gap-3"
                        asChild
                      >
                        <Link href={item.url}>
                          <item.icon className="text-black/70  size-5" />
                          <div className="w-full flex justify-between">
                            <span className="text-[14px] font-medium text-[#4B5563]">
                              {item.title}
                            </span>
                              <span className="size-[18px] rounded-full flex items-center justify-center bg-orange-800 text-white text-xs font-bold">
                                <FriendRequestNumber/>
                              </span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="py-2 pl-3 flex gap-3"
                      asChild
                    >
                      <Link href={item.url}>
                        <item.icon className="text-black/70  size-5" />
                        <span className="text-[14px] font-medium text-[#4B5563]">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="flex flex-col gap-3">
          <SidebarGroupLabel className="text-[#111827] text-base font-medium flex justify-between">
            <p>Recent chats</p>
            <PlusIcon />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Suspense fallback={<p>Loading...</p>}>
              <ListFriends/>
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutBtn />
      </SidebarFooter>
    </Sidebar>
  );
}
