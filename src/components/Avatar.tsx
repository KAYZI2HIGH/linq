
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ProfileAvatar = ({name, image }: {name: string, image: string }) => {
  return (
    <Avatar>
      <AvatarImage
        src={image || ""}
        className="size-10 rounded-full"
      />
      <AvatarFallback>
        {name &&
          name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
