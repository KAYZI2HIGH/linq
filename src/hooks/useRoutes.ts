import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { useMemo } from "react";
import { LogOut, MessageSquareText, Settings, Users } from "lucide-react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chats",
        href: "/dashboard/chats",
        icon: MessageSquareText,
        active: pathname === "/dashboard/chats" || !!conversationId,
      },
      {
        label: "friends",
        href: "/dashboard/friends",
        icon: Users,
        active: pathname === "/dashboard/friends",
      },
      {
        label: "settings",
        href: "/dashboard/settings",
        icon: Settings,
        active: pathname === "/dashboard/settings",
      },
      {
        label: "Logout",
        href: "#",
        icon: LogOut,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
