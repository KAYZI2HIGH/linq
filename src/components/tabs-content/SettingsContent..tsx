import Loading from "@/app/loading";
import DashboardCustomLayout from "@/components/custom-ui/DashboardCustomLayout";
import SettingsContent from "@/components/SettingsContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import ChatInterface from "../chats/ChatInterface";

const SettingsTabContent = () => {
  return (
    <DashboardCustomLayout
      aside={
        <div className="flex flex-col space-y-4 w-full h-full">
          <div className="text-2xl font-bold flex items-center text-primary h-16 px-4 border-b">
            Management
          </div>
          <ScrollArea className="grid gap-2 px-4 h-dvh pb-5">
            <Suspense fallback={<Loading />}>
              <SettingsContent />
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

export default SettingsTabContent;
