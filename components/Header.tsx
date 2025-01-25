'use client';

import Link from 'next/link';
import { Button, Container, Flex, Group, Title } from '@mantine/core';
import { UserButton } from './User/UserButton/UserButton';

const HeaderComponent = () => {
  return (
    <div
      style={{
        height: 60,
      }}
    >
      <Container size="lg" py="xl">
        <Flex w="100%" align="center">
          <Title
            order={3}
            component={Link}
            href="/play"
            tt="none"
            c="var(--mantine-color-text)"
            td={'none'}
            fw="900"
          >
            Ace Logo
          </Title>

          <UserButton ml="auto" mr="0" w="fit-content" />
        </Flex>
      </Container>
    </div>
  );
};

export default HeaderComponent;
