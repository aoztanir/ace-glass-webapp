'use client';

import { useEffect, useState } from 'react';
import { transform } from 'next/dist/build/swc/generated-native';
import { Club, Diamond, Heart, PokerChip, Spade, Table } from '@phosphor-icons/react';
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
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useUser } from '@/components/User/AuthProvider';
import { createClient } from '../../utils/supabase/client';

const getSuitIcon = (suit) => {
  switch (suit) {
    case 'hearts':
      return <Heart weight="fill" size={30} style={{ display: 'block', margin: '0 auto' }} />;
    case 'spades':
      return <Spade weight="fill" size={30} style={{ display: 'block', margin: '0 auto' }} />;
    case 'clubs':
      return <Club weight="fill" size={30} style={{ display: 'block', margin: '0 auto' }} />;
    case 'diamonds':
      return <Diamond weight="fill" size={30} style={{ display: 'block', margin: '0 auto' }} />;
    default:
      return null;
  }
};

const getSuitColor = (suit) => {
  switch (suit) {
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
      <Card withBorder shadow="xl" radius="md" p="xl" bg="teal.9">
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

const CardComponent = ({ card, ...props }) => {
  const { user } = useUser();
  return (
    <Card shadow="xl" radius="lg" withBorder key={card.id} className="scale-on-hover" {...props}>
      <Flex align="baseline">
        <Stack justify="left" align="center" w="fit-content" gap="0">
          <Title order={3} className="artsy-text" fz="40px" mt="0" c={getSuitColor(card.suit)}>
            {card.rank}
          </Title>
          <ThemeIcon
            variant="transparent"
            size={64}
            style={{ display: 'block', margin: '0 auto' }}
            c={getSuitColor(card.suit)}
            ml="0"
          >
            {getSuitIcon(card.suit)}
          </ThemeIcon>
        </Stack>
        {card?.owner === 'player' ? (
          <Avatar ml="auto" mr="0" src={user?.user_metadata?.avatar_url} size="sm" radius="xl" />
        ) : (
          <ThemeIcon size="md" variant="transparent" ml="auto" mr="0">
            <PokerChip size="25px" radius="xl" />
          </ThemeIcon>
        )}
      </Flex>

      <Stack justify="left" align="center" w="fit-content" gap="0" mr="auto" ml="auto" my="5px">
        <ThemeIcon
          variant="transparent"
          size={50}
          style={{ display: 'block', margin: '0 auto' }}
          c={getSuitColor(card.suit)}
          ml="0"
        >
          {getSuitIcon(card.suit)}
        </ThemeIcon>
      </Stack>
      <Stack justify="left" align="center" w="fit-content" gap="0" mr="0" ml="auto">
        <Title order={3} className="artsy-text" fz="40px" mt="0" c={getSuitColor(card.suit)}>
          {card.rank}
        </Title>
        <ThemeIcon
          variant="transparent"
          size={50}
          style={{ display: 'block', margin: '0 auto' }}
          c={getSuitColor(card.suit)}
          ml="0"
        >
          {getSuitIcon(card.suit)}
        </ThemeIcon>
      </Stack>
      <SimpleGrid cols={3} spacing="md"></SimpleGrid>
    </Card>
  );
};
