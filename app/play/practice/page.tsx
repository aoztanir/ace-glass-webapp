'use client';

import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Input,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';

const getSuitIcon = (suit: string) => {
  switch (suit) {
    case 'hearts':
      return '♥';
    case 'spades':
      return '♠';
    case 'clubs':
      return '♣';
    case 'diamonds':
      return '♦';
    default:
      return '';
  }
};

const getSuitColor = (suit: string, theme: any) => {
  switch (suit) {
    case 'hearts':
    case 'diamonds':
      return theme.colors.red[6];
    case 'spades':
    case 'clubs':
      return theme.colors.dark[9];
    default:
      return theme.colors.dark[9];
  }
};

interface CardProps {
  card: {
    suit: string;
    rank: string;
    owner?: string;
    revealed?: boolean;
    id: string;
  };
  onClick?: () => void;
  hidden?: boolean;
}

const CardComponent = ({ card, onClick, hidden }: CardProps) => {
  const theme = useMantineTheme();
  return (
    <Paper
      shadow="xl"
      radius="lg"
      onClick={onClick}
      style={{
        width: '100px',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: hidden ? theme.colors.dark[6] : theme.white,
        border: `2px solid ${theme.colors.dark[3]}`,
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows.lg,
        },
        position: 'relative', // Added for absolute positioning of content
      }}
    >
      {!hidden && (
        <Stack align="center" gap={0} style={{ position: 'absolute', zIndex: 1 }}>
          <Text
            size="xl"
            fw={700}
            style={{
              color: getSuitColor(card.suit, theme),
              textShadow: '0 0 10px rgba(255,255,255,0.3)',
              fontSize: '24px', // Increased font size
              lineHeight: 1,
            }}
          >
            {card.rank}
          </Text>
          <Text
            size="xl"
            style={{
              color: getSuitColor(card.suit, theme),
              textShadow: '0 0 10px rgba(255,255,255,0.3)',
              fontSize: '36px', // Increased font size for suit
              lineHeight: 1,
            }}
          >
            {getSuitIcon(card.suit)}
          </Text>
        </Stack>
      )}
    </Paper>
  );
};

const generateRandomCard = () => {
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const rank = ranks[Math.floor(Math.random() * ranks.length)];
  const id = `${rank}-${suit}-${Math.random()}`;
  return { suit, rank, revealed: false, id };
};

export default function PokerSimulation() {
  const theme = useMantineTheme();
  const [myCards, setMyCards] = useState<CardProps['card'][]>([]);
  const [tableCards, setTableCards] = useState<CardProps['card'][]>([]);
  const [bet, setBet] = useState(0);
  const [currentBet, setCurrentBet] = useState(50);
  const [pot, setPot] = useState(0);
  const [opened, setOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardProps['card'] | null>(null);
  const [myBalance, setMyBalance] = useState(500);
  const [players, setPlayers] = useState<
    {
      id: number;
      cards: CardProps['card'][];
      bet: number;
      hasBet: boolean;
      balance: number;
      totalEarnings: number;
    }[]
  >([]);
  const [round, setRound] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const drawCards = () => {
      const newTableCards = Array.from({ length: 5 }, generateRandomCard);
      const newMyCards = Array.from({ length: 2 }, generateRandomCard).map((card) => ({
        ...card,
        revealed: true,
      }));

      setTableCards(newTableCards);
      setMyCards(newMyCards);

      const newPlayers = Array.from({ length: 3 }, (_, index) => ({
        id: index + 1,
        cards: Array.from({ length: 2 }, generateRandomCard),
        bet: 0,
        hasBet: false,
        balance: 500,
        totalEarnings: 0,
      }));
      setPlayers(newPlayers);
      setRound(0);
      setGameStarted(true);
    };

    drawCards();
  }, []);

  const handleBet = () => {
    if (bet < currentBet) {
      notifications.show({
        title: 'Invalid Bet',
        message: `You must match or raise the current bet of $${currentBet}`,
        color: 'red',
      });
      return;
    }

    if (bet > myBalance) {
      notifications.show({
        title: 'Insufficient Funds',
        message: "You don't have enough money for this bet!",
        color: 'red',
      });
      return;
    }

    setPot(pot + bet);
    setBet(0);
    setMyBalance(myBalance - bet);

    const newPlayers = players.map((player) => ({
      ...player,
      bet: currentBet,
      hasBet: true,
      balance: player.balance - currentBet,
    }));
    setPlayers(newPlayers);

    const totalPlayerBets = newPlayers.length * currentBet;
    setPot((prev) => prev + totalPlayerBets);

    advanceRound(newPlayers);
  };

  const handleCheck = () => {
    if (currentBet > 0) {
      notifications.show({
        title: 'Invalid Move',
        message: 'You cannot check when there is a bet to match',
        color: 'red',
      });
      return;
    }

    const newPlayers = players.map((player) => ({
      ...player,
      hasBet: true,
    }));
    setPlayers(newPlayers);

    advanceRound(newPlayers);
  };

  const advanceRound = (newPlayers: typeof players) => {
    const allPlayersBet = newPlayers.every((player) => player.hasBet);

    if (allPlayersBet) {
      if (round === 3) {
        const winner =
          Math.random() > 0.5
            ? 'player'
            : newPlayers[Math.floor(Math.random() * newPlayers.length)];

        if (winner === 'player') {
          setMyBalance(myBalance + pot);
          notifications.show({
            title: 'Congratulations!',
            message: `You won $${pot}!`,
            color: 'green',
          });
        } else {
          const winningPlayer = players.find((p) => p.id === winner.id);
          if (winningPlayer) {
            setPlayers(
              players.map((player) =>
                player.id === winner.id
                  ? {
                      ...player,
                      balance: player.balance + pot,
                      totalEarnings: player.totalEarnings + pot,
                    }
                  : player
              )
            );
            notifications.show({
              title: 'Game Over',
              message: `Player ${winner.id} won $${pot}!`,
              color: 'blue',
            });
          }
        }
        setPot(0);
      }

      setPlayers(newPlayers.map((player) => ({ ...player, hasBet: false, bet: 0 })));
      setCurrentBet(0);

      if (round < 3) {
        setRound((prev) => prev + 1);

        setTableCards((prev) =>
          prev.map((card, index) => {
            if (round === 0 && index < 3) {
              return { ...card, revealed: true };
            } else if (round === 1 && index === 3) {
              return { ...card, revealed: true };
            } else if (round === 2 && index === 4) {
              return { ...card, revealed: true };
            }
            return card;
          })
        );
      }
    }
  };

  const handleCardClick = (card: CardProps['card']) => {
    setSelectedCard(card);
    setOpened(true);
  };

  const handleOpponentMove = (playerId: number) => {
    const player = players.find((p) => p.id === playerId);
    if (!player || player.balance < currentBet) {
      notifications.show({
        title: 'Invalid Move',
        message: `Player ${playerId} doesn't have enough money to bet!`,
        color: 'red',
      });
      return;
    }

    const newPlayers = players.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          cards: player.cards.map((card) => ({ ...card, revealed: round === 3 })),
          bet: currentBet,
          hasBet: true,
          balance: player.balance - currentBet,
        };
      }
      return player;
    });
    setPlayers(newPlayers);
    setPot(pot + currentBet);
  };

  return (
    <Container fluid style={{ minHeight: '100vh', padding: theme.spacing.xl }}>
      <Title ta="center" mb="xl" order={1} className="artsy-text">
        Poker Simulation -{' '}
        <Text span c="blue" inherit>
          {round === 0 ? 'Pre-flop' : round === 1 ? 'Flop' : round === 2 ? 'Turn' : 'River'}
        </Text>
      </Title>

      <Paper
        p="md"
        radius="md"
        mb="xl"
        style={{
          background: theme.colors.dark[6],
        }}
      >
        <Group justify="space-between" align="center">
          <Group>
            <Text fw={700}>Balance: ${myBalance}</Text>
            <Text fw={700}>Current Bet: ${currentBet}</Text>
          </Group>
          <Group>
            <Input
              type="number"
              value={bet}
              onChange={(e) => setBet(Number(e.target.value))}
              placeholder={currentBet > 0 ? `Match bet of $${currentBet}` : 'Place your bet'}
              styles={{
                input: {
                  width: '150px',
                },
              }}
            />
            <Button variant="contrast" gradient={{ from: 'blue', to: 'cyan' }} onClick={handleBet}>
              Place Bet
            </Button>
            <Button variant="default" onClick={handleCheck} disabled={currentBet > 0}>
              Check
            </Button>
          </Group>
        </Group>
      </Paper>

      <Text ta="center" size="xl" fw={700} mb="xl">
        Pot: ${pot}
      </Text>

      <Grid>
        <Grid.Col span={6}>
          <Paper
            p="md"
            radius="md"
            style={{
              background: theme.colors.dark[6],
            }}
          >
            <Title order={2} mb="md">
              Table Cards
            </Title>
            <Group justify="center" gap="md">
              {tableCards?.map((card) => (
                <CardComponent
                  card={card}
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  hidden={!card.revealed}
                />
              ))}
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper
            p="md"
            radius="md"
            style={{
              background: theme.colors.dark[6],
            }}
          >
            <Title order={2} mb="md">
              My Cards
            </Title>
            <Group justify="center" gap="md">
              {myCards.map((card) => (
                <CardComponent card={card} key={card.id} onClick={() => handleCardClick(card)} />
              ))}
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      <Title order={2} ta="center" mt="xl" mb="xl">
        Other Players
      </Title>

      <Group justify="center" grow>
        {players.map((player) => (
          <Paper
            key={player.id}
            p="md"
            radius="md"
            style={{
              background: theme.colors.dark[6],
            }}
          >
            <Stack align="center" gap="sm">
              <Avatar
                size="xl"
                radius="xl"
                color="blue"
                style={{
                  border: `2px solid ${theme.colors.blue[5]}`,
                }}
              >
                P{player.id}
              </Avatar>
              <Text size="lg" fw={700}>
                Player {player.id}
              </Text>
              <Group gap="xs">
                <Text c="dimmed">Balance: ${player.balance}</Text>
                <Text c="dimmed">|</Text>
                <Text c="dimmed">Earnings: ${player.totalEarnings}</Text>
              </Group>
              <Text c="blue" fw={500}>
                Current Bet: ${player.bet}
              </Text>
              <Group justify="center" gap="sm" style={{ flexWrap: 'wrap' }}>
                {player.cards.map((card) => (
                  <CardComponent
                    card={card}
                    key={card.id}
                    onClick={() => handleCardClick(card)}
                    hidden={!card.revealed}
                  />
                ))}
              </Group>
              <Button
                variant={player.hasBet ? 'light' : 'gradient'}
                gradient={{ from: 'blue', to: 'cyan' }}
                onClick={() => handleOpponentMove(player.id)}
                disabled={player.hasBet}
                fullWidth
              >
                {player.hasBet ? 'Already Bet' : 'Make Move'}
              </Button>
            </Stack>
          </Paper>
        ))}
      </Group>
    </Container>
  );
}
