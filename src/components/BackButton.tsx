"use client";
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useMessageContext } from "@/contexts/MessagesContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { SheetClose } from "./ui/sheet";

const BackButton = () => {
  const { setChatId } = useMessageContext();
  return (
    <Button
      onClick={() => setChatId("")}
      variant={"ghost"}
      className="px-1 py-1 rounded-full hover:bg-[#F3F4F6] transition-all duration-200"
    >
      <ChevronLeft size={"28px"} />
    </Button>
  );
};

export default BackButton;
