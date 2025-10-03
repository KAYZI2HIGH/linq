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
        value: "chats",
        icon: MessageSquareText,
        active: pathname === "/dashboard/chats" || !!conversationId,
      },
      {
        label: "Friends",
        value: "friends",
        icon: Users,
        active: pathname === "/dashboard/friends",
      },
      {
        label: "Settings",
        value: "settings",
        icon: Settings,
        active: pathname === "/dashboard/settings",
      },
      {
        label: "Logout",
        value: "logout",
        icon: LogOut,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
