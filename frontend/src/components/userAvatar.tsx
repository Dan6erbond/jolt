import { Avatar, AvatarProps } from "@mantine/core";
import React, { forwardRef } from "react";

interface UserAvatarProps extends AvatarProps {
  user: { __typename?: "User"; name?: string; jellyfinId?: string };
}

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ user, ...props }, ref) => {
    return (
      <Avatar
        ref={ref}
        {...props}
        src={
          user.jellyfinId &&
          `https://jellyfin.ravianand.me/Users/${user.jellyfinId}/Images/Primary`
        }
      >
        {user.name &&
          user.name
            .split(" ")
            .map((name) => name[0].toUpperCase())
            .join("")}
      </Avatar>
    );
  },
);

export default UserAvatar;
