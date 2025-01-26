'use client';

import { useEffect, useState } from 'react';
import { transform } from 'next/dist/build/swc/generated-native';
import {
  Club,
  Diamond,
  Eyeglasses,
  Heart,
  Info,
  PokerChip,
  Spade,
  Sunglasses,
  Table,
} from '@phosphor-icons/react';
import { prop } from 'cheerio/dist/commonjs/api/attributes';
import {
  Avatar,
  Box,
  Card,
  Center,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import CardComponent from '@/components/CardComponent';
import { useUser } from '@/components/User/AuthProvider';
import { createClient } from '../../utils/supabase/client';

export default function PlayPage() {
  const [myCards, setMyCards] = useState([]);
  const [tableCards, setTableCards] = useState([]);
  const supabase = createClient();
  const { user } = useUser();

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase.from('round').select('*').limit(1).maybeSingle();
      // .order('created_at', { ascending: true })
      // .maybeSingle();

      if (error) {
        console.error('Error fetching cards:', error.message);
      } else {
        setTableCards(data?.table_cards);
        setMyCards(data?.my_cards);
      }
    };

    fetchCards();

    const channel = supabase
      .channel('round')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'round' }, (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          setTableCards(payload.new.table_cards);
          setMyCards(payload.new.my_cards);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <>
      <Flex align="center" gap={10}>
        <Sunglasses size={40} />
        <Title order={1} className="artsy-text" mb="0">
          Play Live Poker
        </Title>
      </Flex>

      <Flex gap={0} align="center">
        <ThemeIcon variant="transparent" size="lg">
          <Info size={20} />
        </ThemeIcon>
        <Text size="md" c="dimmed">
          This is a rendition of what you're seeing live through the Ace Glass. Watch as the AI
          dealer reveals cards on the table and in your hand. Start a game with Ace Glass to play.
        </Text>
      </Flex>

      <Card withBorder shadow="xl" radius="md" p="xl" bg="teal.9" mt="md">
        <SimpleGrid cols={5} spacing="xl">
          {tableCards?.map((card) => <CardComponent card={card} key={card.rank + card.suit} />)}
        </SimpleGrid>
      </Card>

      <Group justify="center" mx="auto" miw="900px" mt="100px">
        {myCards?.map((card, index) => (
          <CardComponent
            card={card}
            key={card.rank + card.suit}
            miw="250px"
            style={{
              transform:
                index % 2 === 0
                  ? 'rotate(-10deg) translateX(80px)'
                  : 'rotate(10deg) translateX(-80px)',
            }}
          />
        ))}
      </Group>
    </>
  );
}
