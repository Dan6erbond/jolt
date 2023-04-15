import { Select, SelectProps, useMantineTheme } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { UserSelectItem } from "./userSelectItem";

interface UserSelectProps extends Omit<SelectProps, "data"> {
  users: {
    __typename?: "User";
    id: string;
    name: string;
    profileImageUrl?: string;
  }[];
}

const UserSelect = ({ users, ...props }: UserSelectProps) => {
  const theme = useMantineTheme();

  return (
    <Select
      {...props}
      data={
        users.map((user) => ({
          ...user,
          value: user.id,
          label: user.name,
        })) || []
      }
      searchable
      styles={{
        input: {
          border: `1px solid ${theme.colors.dark[1]}`,
          color: "white",
          "::placeholder": { color: theme.colors.gray[4] },
        },
        dropdown: {
          color: theme.colors.gray[4],
        },
      }}
      itemComponent={UserSelectItem}
      rightSection={<IconChevronDown size={14} />}
      rightSectionWidth={30}
    />
  );
};

export default UserSelect;
