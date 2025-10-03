import DashboardCustomLayout from "@/components/custom-ui/DashboardCustomLayout";
import EmptyState from "@/components/custom-ui/EmptyStates";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import React from "react";

const ChatsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardCustomLayout
      aside={
        <div className="flex flex-col space-y-4 w-full h-full">
          <div className="text-2xl font-bold flex items-center text-primary h-16 px-4 border-b">
            Management
          </div>
          <ScrollArea className="grid gap-2 px-4 h-dvh pb-5">{children}</ScrollArea>
        </div>
      }
      content={
        <div className={cn("w-full h-screen md:block")}>
          <EmptyState />
        </div>
      }
    />
  );
};

export default ChatsLayout;
