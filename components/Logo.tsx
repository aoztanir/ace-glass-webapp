import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Image } from '@mantine/core';

export default function Logo({ size = 100, href = '/', ...props }: { size: number; href: string }) {
  const router = useRouter();
  return (
    <>
      <Image
        src="/ace-glass-logo.png"
        alt="Ace Glass Logo"
        mah={size}
        maw={size}
        // component={Link}
        onClick={() => router.push(href)}
        style={{ cursor: 'pointer' }}
        {...props}
        // href="/"
      />
    </>
  );
}
