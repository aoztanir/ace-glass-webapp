'use client';

import { useEffect, useState } from 'react';
import { Club, Diamond, Heart, PokerChip, Spade } from '@phosphor-icons/react';
import { Avatar, Card, Flex, SimpleGrid, Stack, ThemeIcon, Title } from '@mantine/core';
import { useUser } from '@/components/User/AuthProvider';
import { createClient } from '@/utils/supabase/client';

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
const CardComponent = ({ card, owner, ...props }) => {
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
        {owner === 'player' ? (
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

export default CardComponent;
