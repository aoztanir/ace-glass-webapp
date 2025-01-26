'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, GoogleLogo } from '@phosphor-icons/react';
import { BackgroundImage, Box, Button, Card, Container, Flex, Text, Title } from '@mantine/core';
import { createClient } from '../../utils/supabase/client';

export default function LoginPage() {
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/play',
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const router = useRouter();
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          flex: 0.5,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BackgroundImage
          src="https://www.oakvillehomeleisure.ca/wp-content/uploads/2023/12/Stack-of-colourful-poker-chips.png"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <Container
        size="xs"
        style={{ flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box>
          <Button
            leftSection={<ArrowLeft weight="bold" size={15} />}
            variant="outline"
            radius="md"
            size="xs"
            onClick={() => router.push('/')}
          >
            Back
          </Button>
          <Card mt="xl" withBorder shadow="md" p={30} radius="md" style={{ width: '100%' }}>
            <Title order={2} ta="left" mb="lg" className="artsy-text" fz="50px">
              Welcome to Ace Poker Bot
            </Title>
            <Text mb="xl" c="dimmed">
              Sign in to continue
            </Text>

            <Button
              fullWidth
              leftSection={<GoogleLogo weight="bold" size={24} />}
              variant="contrast"
              mt="lg"
              radius="md"
              size="md"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
          </Card>
        </Box>
      </Container>
    </div>
  );
}
