import DashboardCustomLayout from "@/components/custom-ui/DashboardCustomLayout";
import ListSkeleton from "@/components/custom-ui/ListSkeleton";
import FriendListContainer from "@/components/FriendListContainer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import ChatInterface from "../chats/ChatInterface";

const ChatsContent = () => {

  return (
    <DashboardCustomLayout
      aside={
        <div className="flex flex-col space-y-4 w-full">
          <div className="text-2xl font-bold flex items-center text-primary h-16 px-4 border-b">
            People
          </div>
          <ScrollArea className="grid gap-2 px-4 h-[calc(100vh-150px)] md:h-[calc(100vh-70px)] pb-5">
            <Suspense fallback={<ListSkeleton />}>
              <FriendListContainer />
            </Suspense>
          </ScrollArea>
        </div>
      }
      content={
       <ChatInterface/>
      }
    />
  );
};

export default ChatsContent;
