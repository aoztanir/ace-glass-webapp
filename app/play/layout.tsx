'use client';

import { useRouter } from 'next/navigation';
import { AppShell, Burger, Group, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AppHeader from '@/components/PlayDashboard/AppHeader';
import Sidebar from '@/components/PlayDashboard/Sidebar/Sidebar';
import { useUser } from '@/components/User/AuthProvider';
import { useNavbarCompressedStore } from '@/stores/navbarCompressedStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  if (!user && user !== 'loading') return router.push('/login');
  const [opened, { toggle }] = useDisclosure();
  const compressed = useNavbarCompressedStore((state) => state.compressed);

  return (
    <AppShell
      layout="alt"
      header={{ height: 70 }}
      navbar={{ width: compressed ? 80 : 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      //   aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <AppShell.Header zIndex={100}>
        <AppHeader />
        {/* <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group> */}
      </AppShell.Header>
      <AppShell.Navbar
        // p="xs"
        p="0"
        style={{
          // overflow: 'hidden',
          transition: 'width 100ms ease, min-width 100ms ease',
        }}
      >
        <Sidebar />
        {/* <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>Navbar</Text>
        </Group>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))} */}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      {/* <AppShell.Aside p="md">Aside</AppShell.Aside> */}
    </AppShell>
  );
}
