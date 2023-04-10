import { Group, Text } from "@mantine/core";
import { forwardRef } from "react";
import UserAvatar from "./userAvatar";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  __typename?: "User";
  jellyfinId: string;
  id: string;
  name: string;
  value: string;
  label: string;
}

export const UserSelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ __typename, id, jellyfinId, name, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <UserAvatar user={{ __typename, id, jellyfinId, name }} />
        <div>
          <Text size="sm" color="white">
            {name}
          </Text>
        </div>
      </Group>
    </div>
  ),
);
