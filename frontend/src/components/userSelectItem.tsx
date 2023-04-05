import { Avatar, Group, Text } from "@mantine/core";
import { forwardRef } from "react";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  label: string;
}

export const UserSelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar>
          {label
            .split(" ")
            .map((name) => name[0].toUpperCase())
            .join("")}
        </Avatar>
        <div>
          <Text size="sm" color="white">
            {label}
          </Text>
        </div>
      </Group>
    </div>
  ),
);
