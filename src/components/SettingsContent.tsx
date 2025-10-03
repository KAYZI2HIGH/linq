import React from "react";
import LanguagePreference from "./LanguagePreference";
import NotificationSettings from "./NotificationsSettings";
import ProfileSettings from "./ProfileSettings";
import { auth } from "@/auth";
import { toast } from "sonner";
import { GetUserSettings } from "@/lib/actions";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const SettingsContent = async () => {
  const session = await auth();
  const { id: userId } = session?.user || {};
  if (!userId) return toast.error("User not found");
  const data = await GetUserSettings(userId);

  return (
    <div>
      <LanguagePreference
        session={session}
        data={data}
      />
      <Separator className="mt-6" />
      <NotificationSettings
        session={session}
        data={data}
      />
      <Separator className="mt-6" />

      <ProfileSettings
        session={session}
        data={data}
      />
    </div>
  );
};

export default SettingsContent;
