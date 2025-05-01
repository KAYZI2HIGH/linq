"use client";
import { pusherClient } from "@/lib/pusher";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DashboardContextType {
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardContextProvider = ({
  children,
}: {
  children: React.ReactNode;
  }) => {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <DashboardContext.Provider
      value={{
        showSideBar,
        setShowSideBar,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error(
      "useDashboardContext must be in wrapped in a MessageContextProvider!"
    );
  return context;
};
