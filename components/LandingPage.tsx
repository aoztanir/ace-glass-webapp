'use client';

import { BookOpen, ChartLineUp, PokerChip, User } from '@phosphor-icons/react';
import {
  Avatar,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';

const LandingPage = () => {
  return (
    <Container size="lg">
      {/* Hero Section */}
      <section style={{ display: 'flex', alignItems: 'center', padding: '50px 0' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <Title
            order={1}
            ta="left"
            className="artsy-text"
            style={{ marginBottom: '20px', fontSize: '100px' }}
          >
            Ace
          </Title>
          <Text
            size="xl"
            color="dimmed"
            style={{ marginBottom: '30px', fontSize: '1.25rem' }}
            ta="left"
          >
            Your ultimate poker bot powered by Raspberry Pi to help you play and learn poker.
          </Text>
          <Flex>
            <Button variant="contrast" size="lg" ml="0" mr="auto" radius="lg">
              Get Started
            </Button>
          </Flex>
        </div>
        <PokerChip size={128} style={{ flex: 1, maxWidth: '50%' }} />
      </section>

      {/* Features Section */}
      <section style={{ padding: '50px 0' }}>
        <Title
          order={2}
          style={{ textAlign: 'center', marginBottom: '40px' }}
          fz="50px"
          className="artsy-text"
        >
          Features
        </Title>
        <SimpleGrid cols={3} spacing="xl">
          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Card.Section>
              <ChartLineUp size={160} style={{ display: 'block', margin: '0 auto' }} />
            </Card.Section>
            <Group style={{ marginBottom: 5, marginTop: 10, justifyContent: 'center' }}>
              <Title order={3} className="artsy-text">
                Smart Strategies
              </Title>
            </Group>
            <Text size="lg" color="dimmed">
              Utilizes advanced algorithms to suggest optimal plays.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Card.Section>
              <ChartLineUp size={160} style={{ display: 'block', margin: '0 auto' }} />
            </Card.Section>
            <Group style={{ marginBottom: 5, marginTop: 10, justifyContent: 'center' }}>
              <Title order={3} className="artsy-text">
                Real-time Analysis
              </Title>
            </Group>
            <Text size="lg" color="dimmed">
              Analyzes your gameplay in real-time to provide feedback.
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Card.Section>
              <BookOpen size={160} style={{ display: 'block', margin: '0 auto' }} />
            </Card.Section>
            <Group style={{ marginBottom: 5, marginTop: 10, justifyContent: 'center' }}>
              <Title order={3} className="artsy-text">
                Portable Learning
              </Title>
            </Group>
            <Text size="lg" color="dimmed">
              Learn poker on the go with our Raspberry Pi integration.
            </Text>
          </Card>
        </SimpleGrid>
      </section>

      {/* About Section */}
      <section style={{ padding: '50px 0', textAlign: 'center' }}>
        <Title order={2} style={{ marginBottom: '20px' }}>
          About Ace
        </Title>
        <Text size="md" color="dimmed" style={{ marginBottom: '30px' }}>
          Ace is designed to enhance your poker skills using cutting-edge technology. Whether you're
          a beginner or a seasoned player, Ace adapts to your level and helps you improve.
        </Text>
        <Grid>
          <Grid.Col span={3} style={{ textAlign: 'center' }}>
            <User size={64} style={{ display: 'block', margin: '0 auto' }} />
            <Text size="lg" color="dimmed">
              Team Member 1
            </Text>
          </Grid.Col>
          <Grid.Col span={3} style={{ textAlign: 'center' }}>
            <User size={64} style={{ display: 'block', margin: '0 auto' }} />
            <Text size="lg" color="dimmed">
              Team Member 2
            </Text>
          </Grid.Col>
          <Grid.Col span={3} style={{ textAlign: 'center' }}>
            <User size={64} style={{ display: 'block', margin: '0 auto' }} />
            <Text size="lg" color="dimmed">
              Team Member 3
            </Text>
          </Grid.Col>
          <Grid.Col span={3} style={{ textAlign: 'center' }}>
            <User size={64} style={{ display: 'block', margin: '0 auto' }} />
            <Text size="lg" color="dimmed">
              Team Member 4
            </Text>
          </Grid.Col>
        </Grid>
      </section>

      {/* Footer Section */}
      <div
        style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid #eaeaea',
          marginTop: '40px',
        }}
      >
        <Text size="sm" color="dimmed">
          © 2023 Ace Poker Bot. All rights reserved.
        </Text>
      </div>
    </Container>
  );
};

export default LandingPage;
