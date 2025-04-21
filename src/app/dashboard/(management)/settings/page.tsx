import LanguagePreference from "@/components/LanguagePreference";
import NotificationSettings from "@/components/NotificationsSettings";
import ProfileSettings from "@/components/ProfileSettings";


  const SettingsPage = () => {
  return (
    <>
      <LanguagePreference />
      <NotificationSettings />
      <ProfileSettings/>
    </>
  );
}

export default SettingsPage