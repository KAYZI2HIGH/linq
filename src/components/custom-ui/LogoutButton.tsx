import { logout } from "@/lib/logout";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface LogoutButtonProps {
  children: ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const LogoutButton = ({ children, className, variant }: LogoutButtonProps) => {
  return (
    <Button
      onClick={() => {
        const promise = logout("/signin");
        toast.promise(promise, {
          loading: "Logging out...",
          success: () => {
            return "Logged out successfully!";
          },
          error: "Couldn't logout, try again!",
        });
      }}
      type="submit"
      className={className}
      size="icon"
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default LogoutButton;
