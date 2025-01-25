import { useState } from 'react';
import Link from 'next/link';
import { IconChevronDown, IconLogout, IconUser } from '@tabler/icons-react';
import { Avatar, Box, Button, Flex, Menu, Text } from '@mantine/core';
import { useUser } from '../AuthProvider';
import classes from './UserButton.module.css';

export function UserButton({ compressed, ...props }: { compressed?: boolean }) {
  const { user, logout } = useUser();
  const [menuOpened, setMenuOpened] = useState(false);

  if (!user && user !== 'loading')
    return (
      <>
        <Button ml="auto" mr="0" variant="contrast" component={Link} href="/login">
          Sign In
        </Button>
      </>
    );

  return (
    <Menu
      shadow="md"
      width={200}
      opened={menuOpened}
      style={{ cursor: 'pointer' }}
      onOpen={() => setMenuOpened(true)}
      onClose={() => setMenuOpened(false)}
    >
      <Menu.Target>
        <Flex align="center" gap="xs" {...props}>
          <Avatar mx="auto" src={user?.user_metadata?.avatar_url} radius="xl" />
          <Box style={{ flex: 1 }} ml="auto" mr="0" w="fit-content" hidden={compressed}>
            <Text size="md" fw={900} ta="left" className="artsy-text">
              {user?.user_metadata?.full_name}
            </Text>
            <Text c="dimmed" size="xs" ta="left">
              {user?.user_metadata?.email}
            </Text>
          </Box>
          <IconChevronDown size={16} />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Options</Menu.Label>
        <Menu.Item leftSection={<IconUser size={14} />}>Play</Menu.Item>
        <Menu.Item leftSection={<IconLogout size={14} />} onClick={logout} c="red">
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
