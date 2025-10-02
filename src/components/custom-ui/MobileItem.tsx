"use client";

import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/logout";
import { toast } from "sonner";

interface MobileItemProps {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "forwardRef"> & RefAttributes<SVGSVGElement>
  >;
  active?: boolean;
}

const MobileItem = ({ label, icon: Icon, href, active }: MobileItemProps) => {
  const handleLogout = useCallback(() => {
    const promise = logout("/sign-in");
    toast.promise(promise, {
      loading: "Logging out...",
      success: () => {
        return "Logged out successfully!";
      },
      error: "Couldn't logout, try again!",
    });
  }, []);

  return (
    <>
      {label === "Logout" ? (
        <button
          onClick={handleLogout}
          className="w-full h-full flex flex-col items-center justify-center gap-1 text-muted-foreground/50 hover:text-primary z-[9999]"
        >
          <Icon
            className="flex-shrink-0 w-5 h-5"
            strokeWidth={1.5}
          />
          <span className={cn("text-xs text-center")}>{label}</span>
        </button>
      ) : (
        <Link
          href={href}
          className={cn(
            "w-full h-full flex flex-col items-center justify-center gap-1 text-muted-foreground/50 hover:text-primary z-[9999]",
            { "text-primary font-medium": active }
          )}
        >
          <Icon
            className="flex-shrink-0 w-5 h-5"
            strokeWidth={1.5}
          />
          <span className={cn("text-xs text-center")}>{label}</span>
        </Link>
      )}
    </>
  );
};

export default MobileItem;
