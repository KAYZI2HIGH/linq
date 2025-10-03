"use client";

import useRoutes from "@/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import ProfilePicture from "./ProfilePicture";
import { User } from "next-auth";
import { Tabs, TabsList } from "@/components/ui/tabs";

interface DesktopSideBarProps {
  currentUser: User;
}

const DesktopSideBar = ({ currentUser }: DesktopSideBarProps) => {
  const routes = useRoutes();

  return (
    <div className="hidden md:flex md:flex-col md:justify-between md:fixed md:inset-y-0 md:left-0 md:z-40 md:w-20 md:px-4 md:py-4 md:overflow-y-auto md:border-r-[1px] md:border-border">
      <div
        className="w-full"
      >
        <TabsList className="flex flex-col items-center space-y-4 bg-transparent h-auto p-0">
          <nav className="flex flex-col justify-between">
            <ul
              role="list"
              className="flex flex-col items-center space-y-4"
            >
              {routes.map((route) => (
                <DesktopItem
                  key={route.label}
                  active={route.active}
                  value={route.label.toLowerCase()}
                  icon={route.icon}
                  label={route.label}
                />
              ))}
            </ul>
          </nav>
        </TabsList>
      </div>

      <ProfilePicture user={currentUser} />
    </div>
  );
};

export default DesktopSideBar;
