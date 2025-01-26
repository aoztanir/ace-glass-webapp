'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AlignLeft, ArrowDown, Barbell, GearSix, VideoCamera } from '@phosphor-icons/react';
import { IconBulb, IconCheckbox, IconLogout, IconSearch, IconUser } from '@tabler/icons-react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Code,
  Divider,
  Flex,
  Group,
  rem,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { navbarLinks } from '@/Constants';
import { useActiveLinkStore } from '@/stores/activeLinkStore';
import { useNavbarCompressedStore } from '@/stores/navbarCompressedStore';
import { useUser } from '../../User/AuthProvider';
import { UserButton } from '../../User/UserButton/UserButton';
// import Logo from '../Logo/Logo';
import classes from './NavbarSearch.module.css';

const links = [
  { icon: IconBulb, label: 'Activity', notifications: 3 },
  { icon: IconCheckbox, label: 'Tasks', notifications: 4 },
  { icon: IconUser, label: 'Contacts' },
];
const resourceLinks = [
  {
    emoji: '🗣️',
    label: 'English Interview Phrases',
    href: 'https://www.fluentu.com/blog/english/english-interview-phrases/',
  },
  {
    emoji: '🎯',
    label: 'Cultural Interview Tips',
    href: 'https://www.indeed.com/career-advice/interviewing/cultural-differences-in-job-interviews',
  },
  {
    emoji: '📝',
    label: 'Resume Writing for ESL',
    href: 'https://www.internationalstudent.com/resume-writing/',
  },
  {
    emoji: '🌎',
    label: 'Work Visa Guide',
    href: 'https://www.immi-usa.com/work-visa/',
  },
  {
    emoji: '💼',
    label: 'International Job Search',
    href: 'https://www.goabroad.com/articles/jobs-abroad/international-job-search',
  },
  {
    emoji: '🤝',
    label: 'Business English Resources',
    href: 'https://www.businessenglishresources.com/',
  },
  {
    emoji: '🎭',
    label: 'Mock Interviews for ESL',
    href: 'https://www.preply.com/en/learn/english/interview-preparation',
  },
  {
    emoji: '📚',
    label: 'Professional English Course',
    href: 'https://www.coursera.org/learn/business-english',
  },
  {
    emoji: '⭐',
    label: 'Accent Reduction Tips',
    href: 'https://www.verbling.com/articles/post/accent-reduction-tips/',
  },
  {
    emoji: '💡',
    label: 'Cross-Cultural Communication',
    href: 'https://www.mindtools.com/CommSkll/Cross-Cultural-communication.htm',
  },
  {
    emoji: '🌟',
    label: 'Immigration Resources',
    href: 'https://www.uscis.gov/working-in-the-united-states',
  },
  {
    emoji: '🤔',
    label: 'Common Interview Questions',
    href: 'https://www.thebalancemoney.com/top-interview-questions-for-esl-learners-4173756',
  },
];

const collections = [
  { emoji: '👍', label: 'Sales' },
  { emoji: '🚚', label: 'Deliveries' },
  { emoji: '💸', label: 'Discounts' },
  { emoji: '💰', label: 'Profits' },
  { emoji: '✨', label: 'Reports' },
  { emoji: '🛒', label: 'Orders' },
  { emoji: '📅', label: 'Events' },
  { emoji: '🙈', label: 'Debts' },
  { emoji: '💁‍♀️', label: 'Customers' },
];

export default function NavbarSearch() {
  const { logout } = useUser();
  const pathname = usePathname();
  const { hovered, ref } = useHover();
  const compressed = useNavbarCompressedStore((state) => state.compressed);
  const setCompressed = useNavbarCompressedStore((state) => state.setCompressed);

  useEffect(() => {
    setCompressed(!hovered);
  }, [hovered]);

  const setActiveLink = useActiveLinkStore((state) => state.setActiveLink);

  useEffect(() => {
    setActiveLink(navbarLinks.find((link) => link.href === pathname));
  }, [pathname]);
  const collectionLinks = resourceLinks.map((collection) => (
    <Link
      // style={{ zIndex: 10000000000000 }}
      target="_blank"
      href={collection.href}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: rem(9), fontSize: rem(16) }}>{collection.emoji}</span>{' '}
      {collection.label}
    </Link>
  ));

  return (
    <Box
      ref={ref}
      style={{ height: '100%', position: 'relative' }}
      p={compressed ? '0' : 'sm'}
      // py="md"
    >
      <Box className={classes.section} px="md" pt={compressed ? 'md' : '0'}>
        <Box w="100%" h="100%">
          {/* <Logo nameIncluded={!compressed} /> */}
        </Box>
      </Box>
      <Divider my="sm" />
      <div className={classes.section}>
        <Box className={classes.mainLinks} px="md">
          <Stack gap="sm" mb={'xs'}>
            {navbarLinks?.map((link) => (
              <NavbarLink compressed={compressed} key={link.label} {...link} />
            ))}
          </Stack>
        </Box>
      </div>

      <Flex
        justify="center"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
        p="md"
      >
        {compressed ? (
          <ActionIcon size="50" radius="15px" mb="0" mt="auto" variant="default" onClick={logout}>
            <IconLogout
              color="var(--mantine-color-red-6)"
              style={{ transform: 'rotate(180deg)' }}
              size={25}
            />
          </ActionIcon>
        ) : (
          <Button
            fullWidth
            onClick={logout}
            mb="0"
            mt="auto"
            variant="default"
            c="var(--mantine-color-red-6)"
            rightSection={
              <IconLogout
                color="var(--mantine-color-red-6)"
                style={{ transform: 'rotate(180deg)' }}
                size={20}
              />
            }
            justify="space-between"
            radius="md"
          >
            Logout
          </Button>
        )}
      </Flex>
    </Box>
  );
}

const NavbarLink = ({
  label,
  icon,
  color,
  href,
  compressed = true,
  active = false,
}: {
  label: string;
  icon: React.ReactNode;
  color: string;
  href: string;
  compressed?: boolean;
}) => {
  const Icon = icon;
  const activeLink = useActiveLinkStore((state) => state.activeLink);

  if (compressed) {
    return (
      <ActionIcon
        mx="auto"
        variant={activeLink?.href === href ? 'default' : 'light'}
        color={activeLink?.href === href ? 'var(--mantine-color-indigo-6)' : null}
        size="50"
        radius="15px"
        style={{ zIndex: 1000 }}
      >
        {<Icon size={25} weight="fill" color={color} />}
      </ActionIcon>
    );
  }
  return (
    <Button
      variant={activeLink?.href === href ? 'default' : 'light'}
      color={activeLink?.href === href ? 'var(--mantine-color-indigo-9)' : null}
      c="var(--mantine-color-text)"
      fullWidth
      radius="md"
      size="md"
      fz="sm"
      component={Link}
      href={href}
      style={{ zIndex: 1000 }}
      rightSection={<Icon size={20} weight="fill" color={color} />}
      justify="space-between"
    >
      {label}
    </Button>
  );
};
