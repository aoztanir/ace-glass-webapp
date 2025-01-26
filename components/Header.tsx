'use client';

import Link from 'next/link';
import { Button, Container, Flex, Group, Title } from '@mantine/core';
import Logo from './Logo';
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
          <Logo size={50} href="/play" />
          <UserButton ml="auto" mr="0" w="fit-content" />
        </Flex>
      </Container>
    </div>
  );
};

export default HeaderComponent;
