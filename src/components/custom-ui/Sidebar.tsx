import { ReactNode } from "react";
import DesktopSideBar from "./DesktopSidebar";
import MobileTab from "./MobileTab";
import { auth } from "@/auth";
import { Tabs } from "../ui/tabs";

const SideBar = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <Tabs
      defaultValue="chats"
      className=  "grid grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-[auto_1fr] h-full w-full"
    >
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <DesktopSideBar currentUser={session?.user!} />
      </div>

      {/* Mobile Bottom Tab */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileTab />
      </div>

      {/* Main Content */}
      <main className="md:pl-20 w-full h-full overflow-auto">{children}</main>
    </Tabs>
  );
};

export default SideBar;
