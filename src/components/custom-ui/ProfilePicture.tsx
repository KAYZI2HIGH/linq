"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { User } from "next-auth";

interface ProfilePictureProps {
  user: User;
  showStatus?: boolean;
  className?: string;
}

const ProfilePicture = ({
  user,
  showStatus = true,
  className,
}: ProfilePictureProps) => {

  return (
    <div className={cn("relative size-10", className)}>
      <Avatar className={cn("bg-zinc-100", className)}>
        <AvatarImage
          src={
            user.image ||
            `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${
              user.name ?? "User"
            }`
          }
          alt={user.name ?? "User"}
        />
        <AvatarFallback className="bg-secondary-foreground/40 text-white font-bold">
          {user.name ? user.name.charAt(0) : "U"}
        </AvatarFallback>
      </Avatar>
      {showStatus && (
        <span className="absolute bottom-0.5 right-0.5 size-2 bg-green-500 ring-2 ring-white group-hover:ring-zinc-100 rounded-full" />
      )}
    </div>
  );
};

export default ProfilePicture;
