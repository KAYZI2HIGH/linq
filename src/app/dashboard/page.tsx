import ChatsContent from "@/components/tabs-content/ChatsContent";
import FriendsContent from "@/components/tabs-content/FriendsContent";
import SettingsTabContent from "@/components/tabs-content/SettingsContent.";
import { TabsContent } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <>
      <TabsContent
        value="chats"
        className="h-full m-0"
      >
        <ChatsContent />
      </TabsContent>

      <TabsContent
        value="friends"
        className="h-full m-0"
      >
        <FriendsContent />
      </TabsContent>

      <TabsContent
        value="settings"
        className="h-full m-0"
      >
        <SettingsTabContent />
      </TabsContent>
    </>
  );
}
