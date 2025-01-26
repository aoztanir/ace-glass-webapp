'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Brain, Cards } from '@phosphor-icons/react';
import {
  Button,
  Card,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import CardComponent from '@/components/CardComponent';
import { createClient } from '@/utils/supabase/client';
import { useChat } from 'ai/react';

dayjs.extend(relativeTime);

export default function RoundPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [round, setRound] = useState(null);

  useEffect(() => {
    const fetchRound = async () => {
      const { data, error } = await supabase.from('round').select('*').eq('id', id).maybeSingle();
      setRound(data);
    };

    fetchRound();
  }, [id]);

  return (
    <>
      <Group mb="sm">
        <Button
          variant="outline"
          leftSection={<ArrowLeft weight="bold" />}
          onClick={() => router.back()}
        >
          Back to Rounds
        </Button>
      </Group>

      <Stack mb="xl">
        <Title order={1} className="artsy-text">
          Poker Round
        </Title>
        <Text size="sm" c="dimmed">
          Played {dayjs(round?.created_at).fromNow()}
        </Text>
      </Stack>

      <Tabs defaultValue="cards" variant="pills" color="red">
        <Tabs.List grow>
          <Tabs.Tab value="cards" leftSection={<Cards size={16} />}>
            Your Cards
          </Tabs.Tab>
          <Tabs.Tab value="analysis" leftSection={<Brain size={16} />}>
            Hand Analysis
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cards">
          <Card withBorder shadow="xl" radius="md" p="xl" bg="teal.9" mt="md">
            <SimpleGrid cols={5} spacing="xl">
              {round?.table_cards?.map((card) => (
                <CardComponent card={card} key={card.rank + card.suit} />
              ))}
            </SimpleGrid>
          </Card>

          <Group justify="center" mx="auto" miw="900px" mt="100px">
            {round?.my_cards?.map((card, index) => (
              <CardComponent
                card={card}
                owner="player"
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
        </Tabs.Panel>

        <Tabs.Panel value="analysis" pt="xs">
          <ReportPanel round={round} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

const ReportPanel = ({ round }: { round: any }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    initialMessages: [],
  });

  const generateReport = async () => {
    console.log('generating');
    setIsGenerating(true);
    append({
      role: 'user',
      content:
        'Please analyze my poker hand and provide suggestions for improvement. I had a ' +
        round?.my_cards
          ?.map((card: { rank: string; suit: string }) => card.rank + ' of ' + card.suit)
          .join(', ') +
        ' and the table had a ' +
        round?.table_cards
          ?.map((card: { rank: string; suit: string }) => card.rank + ' of ' + card.suit)
          .join(', '),
    });
    console.log('appended');
    setIsGenerating(false);
  };

  return (
    <Card withBorder shadow="sm" radius="md" p="xl" mt="md">
      <Stack>
        <Group justify="space-between" align="center">
          <Title order={3} className="artsy-text">
            Hand Analysis Report
          </Title>
          <Button
            onClick={generateReport}
            loading={isGenerating}
            leftSection={<Brain size={16} />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            disabled={messages.length > 1}
          >
            {isGenerating ? 'Analyzing Hand...' : 'Generate Report'}
          </Button>
        </Group>

        <Stack gap="md">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxHeight: '400px',
              overflowY: 'auto',
              padding: '16px',
            }}
          >
            {messages.length > 1 ? (
              messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                    gap: '8px',
                    width: '100%',
                  }}
                >
                  {m.role !== 'user' && (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--mantine-color-blue-6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Brain size={20} color="white" />
                    </div>
                  )}

                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor:
                        m.role === 'user' ? 'var(--mantine-color-blue-6)' : 'inherit',
                      color: m.role === 'user' ? 'white' : 'inherit',
                    }}
                  >
                    <Text size="sm">{m.content}</Text>
                  </div>

                  {m.role === 'user' && (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--mantine-color-gray-3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Cards size={20} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <Text c="dimmed" ta="center" py="xl">
                Click "Generate Report" to analyze your hand and get suggestions
              </Text>
            )}
          </div>
        </Stack>

        <form onSubmit={handleSubmit} style={{ marginTop: 'auto' }}>
          <TextInput
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a follow-up question..."
            size="md"
            radius="md"
            // style={{
            //   width: '100%',
            //   padding: '12px',
            //   borderRadius: '20px',
            //   border: '1px solid var(--mantine-color-gray-3)',
            //   backgroundColor: 'var(--mantine-color-body)',
            //   marginTop: '16px',
            // }}
          />
        </form>
      </Stack>
    </Card>
  );
};
