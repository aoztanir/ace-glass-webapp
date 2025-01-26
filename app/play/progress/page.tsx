'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Club, Diamond, Heart, PokerChip, Spade } from '@phosphor-icons/react';
import {
  Avatar,
  Card,
  Container,
  Flex,
  Grid,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useUser } from '@/components/User/AuthProvider';
import { createClient } from '@/utils/supabase/client';

dayjs.extend(relativeTime);

interface Round {
  id: string;
  created_at: string;
  user_id: string;
  hand: string[];
}

const getSuitIcon = (suit: string) => {
  switch (suit.toLowerCase()) {
    case 'hearts':
      return <Heart weight="fill" size={20} style={{ display: 'block', margin: '0 auto' }} />;
    case 'spades':
      return <Spade weight="fill" size={20} style={{ display: 'block', margin: '0 auto' }} />;
    case 'clubs':
      return <Club weight="fill" size={20} style={{ display: 'block', margin: '0 auto' }} />;
    case 'diamonds':
      return <Diamond weight="fill" size={20} style={{ display: 'block', margin: '0 auto' }} />;
    default:
      return null;
  }
};

const getSuitColor = (suit: string) => {
  switch (suit.toLowerCase()) {
    case 'hearts':
    case 'diamonds':
      return 'red.7';
    case 'spades':
    case 'clubs':
      return 'var(--mantine-color-text)';
    default:
      return 'var(--mantine-color-text)';
  }
};

export default function ProgressPage() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const supabase = createClient();
  const { user } = useUser();

  useEffect(() => {
    async function fetchRounds() {
      if (!user) return;

      const { data, error } = await supabase
        .from('round')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching rounds:', error);
        return;
      }

      setRounds(data || []);
    }

    fetchRounds();
  }, [user]);

  const router = useRouter();

  return (
    <>
      <Title order={1} mb="xl" className="artsy-text">
        Your Past Poker Rounds
      </Title>

      <SimpleGrid cols={4}>
        {rounds?.map((round) => (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="scale-on-hover"
            key={round.id}
            onClick={() => router.push(`/play/progress/${round.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <Flex align="center" justify="space-between" mb="md">
              <Text size="xs" c="dimmed">
                Played {dayjs(round.created_at).fromNow()}
              </Text>
              <Avatar ml="auto" src={user?.user_metadata?.avatar_url} size="sm" radius="xl" />
            </Flex>

            <Flex gap="sm" wrap="wrap">
              {round?.my_cards?.map((card, index) => (
                <Card
                  key={index}
                  shadow="xl"
                  radius="md"
                  withBorder
                  className="scale-on-hover"
                  style={{ width: '80px' }}
                  padding="xs"
                  bg={getSuitColor(card.suit)}
                >
                  <Flex align="baseline">
                    <Stack justify="left" align="center" w="fit-content" gap={0}>
                      <Title
                        order={4}
                        className="artsy-text"
                        c={
                          getSuitColor(card.suit) === 'var(--mantine-color-text)'
                            ? 'var(--custom-contrast-color-text)'
                            : 'white'
                        }
                      >
                        {card.rank}
                      </Title>
                      <ThemeIcon
                        variant="transparent"
                        size="sm"
                        c={
                          getSuitColor(card.suit) === 'var(--mantine-color-text)'
                            ? 'var(--custom-contrast-color-text)'
                            : 'white'
                        }
                      >
                        {getSuitIcon(card.suit)}
                      </ThemeIcon>
                    </Stack>
                  </Flex>

                  <Stack justify="left" align="center" w="fit-content" gap={0} mr={0} ml="auto">
                    <Title
                      order={4}
                      className="artsy-text"
                      c={
                        getSuitColor(card.suit) === 'var(--mantine-color-text)'
                          ? 'var(--custom-contrast-color-text)'
                          : 'white'
                      }
                    >
                      {card.rank}
                    </Title>
                    <ThemeIcon
                      variant="transparent"
                      size="sm"
                      c={
                        getSuitColor(card.suit) === 'var(--mantine-color-text)'
                          ? 'var(--custom-contrast-color-text)'
                          : 'white'
                      }
                    >
                      {getSuitIcon(card.suit)}
                    </ThemeIcon>
                  </Stack>
                </Card>
              ))}
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
