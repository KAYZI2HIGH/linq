import Loading from "@/app/loading";
import SettingsContent from "@/components/SettingsContent";
import { Suspense } from "react";

const SettingsPage = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SettingsContent />
      </Suspense>
    </>
  );
};

export default SettingsPage;
