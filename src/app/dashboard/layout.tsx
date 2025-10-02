import SideBar from "@/components/custom-ui/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: UserLayoutProps) {
  return (
    <SidebarProvider>
      <SideBar>
        <div className="w-full">{children}</div>
      </SideBar>
    </SidebarProvider>
  );
}
