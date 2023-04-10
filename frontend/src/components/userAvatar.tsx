import { Avatar, AvatarProps } from "@mantine/core";
import { forwardRef } from "react";

interface UserAvatarProps extends AvatarProps {
  user: {
    __typename?: "User";
    id?: string;
    name?: string;
    profileImageUrl?: string;
  };
}

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ user, ...props }, ref) => {
    return (
      <Avatar ref={ref} {...props} src={user.profileImageUrl}>
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
