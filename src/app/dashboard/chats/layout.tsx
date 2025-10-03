import useConversation from "@/hooks/useConversation";
import EmptyState from "@/components/custom-ui/EmptyStates";
import { cn } from "@/lib/utils";
import DashboardCustomLayout from "@/components/custom-ui/DashboardCustomLayout";
import React, { Suspense } from "react";
import FriendListContainer from "@/components/FriendListContainer";
import ListSkeleton from "@/components/custom-ui/ListSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatsLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <DashboardCustomLayout
      aside={
        <div className="flex flex-col space-y-4 w-full">
          <div className="text-2xl font-bold flex items-center text-primary h-16 px-4 border-b">
            People
          </div>

          <ScrollArea className="grid gap-2 px-4 h-dvh pb-5">
            <Suspense fallback={<ListSkeleton />}>
              <FriendListContainer />
            </Suspense>
          </ScrollArea>
        </div>
      }
      content={
        children
      }
    />
  );
};

export default ChatsLayout;
