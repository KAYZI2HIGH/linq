'use client'
import DashboardFloatingDock from "@/components/DashboardFloatingDock";
import DashboardNavbar from "@/components/DashboardNavbar";
import { usePathname } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  return (
    <section className="flex flex-col h-dvh">
      <DashboardNavbar text={pathName.includes('settings') ? 'Settings' : 'Friends Management'} />
      <section className="p-4 md:pr-8 flex flex-col gap-7 flex-1 grow overflow-y-scroll">{children}</section>
      <DashboardFloatingDock/>
    </section>
  );
};

export default Layout;
