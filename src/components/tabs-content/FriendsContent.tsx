import DashboardCustomLayout from "@/components/custom-ui/DashboardCustomLayout";
import AddFriendForm from "@/components/AddFriendForm";
import FriendRequestList from "@/components/FriendRequestList";
import FriendRequestSkeleton from "@/components/skeleton/FriendRequestSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import EmptyState from "@/components/custom-ui/EmptyStates";
import { cn } from "@/lib/utils";

const FriendsContent = () => {
  return (
    <DashboardCustomLayout
      aside={
        <div className="flex flex-col space-y-4 w-full h-full">
          <div className="text-2xl font-bold flex items-center text-primary h-16 px-4 border-b">
            Management
          </div>
          <div className="grid gap-2 px-4 h-[calc(100vh-160px)] md:h-[calc(100vh-80px)] pb-5">
            <AddFriendForm />
            <ScrollArea className="h-[calc(100vh-2000px)] md:h-[calc(100vh-140px)] pb-5">
              <Suspense fallback={<FriendRequestSkeleton />}>
                <FriendRequestList />
              </Suspense>
            </ScrollArea>
          </div>
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

export default FriendsContent;
