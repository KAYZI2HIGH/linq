'use client'
import DashboardNavbar from "@/components/DashboardNavbar";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  return (
    <section>
      <DashboardNavbar text={pathName.includes('settings') ? 'Settings' : 'Friends Management'} />
      <section className="p-4 md:pr-8 flex flex-col gap-7">{children}</section>
    </section>
  );
};

export default layout;
