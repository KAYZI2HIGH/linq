"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";
import { Tabs, TabsList } from "@/components/ui/tabs";

const MobileTab = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) return null;

  return (
      <TabsList className="flex justify-between items-center fixed bottom-0 z-[9999] w-full h-20 border-t bg-white md:hidden p-0">
        {routes.map((route) => (
          <MobileItem
            key={route.label}
            active={route.active}
            value={route.label.toLowerCase()}
            icon={route.icon}
            label={route.label}
          />
        ))}
      </TabsList>
  );
};

export default MobileTab;
