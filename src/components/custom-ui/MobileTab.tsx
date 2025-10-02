"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileTab = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) return null;

  return (
    <div className="flex justify-between items-center fixed bottom-0 z-[9999] w-full h-20 border-t bg-white md:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          active={route.active}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  );
};

export default MobileTab;
