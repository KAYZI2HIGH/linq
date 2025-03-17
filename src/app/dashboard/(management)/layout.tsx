import DashboardNavbar from "@/components/DashboardNavbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <DashboardNavbar text="Friend Mangament" />
      <section className="p-4 md:pr-8 flex flex-col gap-7">{children}</section>
    </section>
  );
};

export default layout;
