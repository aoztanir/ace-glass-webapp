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
            Your ultimate poker glasses powered by Raspberry Pi and built to help you play and learn
            poker.
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
          ta="left"
          className="artsy-text"
          mt={'xl'}
        >
          Features
        </Title>
        <SimpleGrid cols={3} spacing="xl">
          <Card shadow="sm" padding="lg" radius="lg" withBorder className="scale-on-hover">
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

          <Card shadow="sm" padding="lg" radius="lg" withBorder className="scale-on-hover">
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

          <Card shadow="sm" padding="lg" radius="lg" withBorder className="scale-on-hover">
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
        <Title
          order={2}
          style={{ marginBottom: '20px', fontSize: '50px' }}
          className="artsy-text"
          ta={'left'}
          mt="xl"
        >
          About Ace
        </Title>
        <Text size="md" color="dimmed" style={{ marginBottom: '50px' }} ta="left">
          Ace is designed to enhance your poker skills using cutting-edge technology. Whether you're
          a beginner or a seasoned player, Ace adapts to your level and helps you improve.
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 3, md: 3, lg: 4 }} spacing="xl" mt="xl">
          <TeamMember
            name="Bruce Yu Lepeng"
            image="https://media.licdn.com/dms/image/v2/D5603AQHFveHhxFAe3A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1728158111631?e=1743638400&v=beta&t=l3_3qScYr1tAmHjADyxgs_bfsbN6v2qwokUizeRlHH0"
          />
          <TeamMember
            name="Aryah Oztanir"
            image="https://media.licdn.com/dms/image/v2/D5603AQEZKIgVrAd3qA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730755326334?e=1743638400&v=beta&t=JwkyhJ6IUrFBU2NNPVlj4jKr5-VSqMJ96lIPXNX7xA0"
          />
          <TeamMember
            name="Ibrahim Mohsin"
            image="https://media.licdn.com/dms/image/v2/D5603AQHvzIxIP12Lqg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730694064119?e=1743638400&v=beta&t=O8TSA1kucN2T_sh5N80tPEFQnTEaf1QgSJdSjWGPWYY"
          />
          <TeamMember
            name="Alex Yevchenko"
            image="https://media.licdn.com/dms/image/v2/D4E03AQFJ_94ZXJlhQA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710172365750?e=1743638400&v=beta&t=3HlfV73gPTjdhDnLxh5M35xSwuZXIyxnVARYX4XKGNg"
          />
        </SimpleGrid>
      </section>

      {/* Footer Section */}
      <div
        style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid #eaeaea',
          marginTop: '100px',
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

const TeamMember = ({ name, image }) => {
  return (
    <Card radius="lg" withBorder className="scale-on-hover">
      <Avatar src={image} size="100px" mx="auto" mb="md" />
      <Text size="lg" className="artsy-text">
        {name}
      </Text>
    </Card>
  );
};
