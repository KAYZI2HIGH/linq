import Loading from "@/app/loading";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import SettingsContent from "@/components/SettingsContent";
import { Suspense } from "react";

const SettingsPage = () => {
  return (
    <>
        <Suspense
          fallback={<Loading />}
          children={<SettingsContent />}
        />
    </>
  );
};

export default SettingsPage;
