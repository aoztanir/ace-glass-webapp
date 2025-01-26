import '@mantine/core/styles.css';
import '@/globals.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { AuthProvider } from '@/components/User/AuthProvider';
import { theme } from '../theme';

import '@mantine/notifications/styles.css';

export const metadata = {
  title: 'Ace Glass',
  description: 'Building the future of poker glasses.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link href="https://fonts.cdnfonts.com/css/ransom-note" rel="stylesheet" />

        <link href="https://fonts.cdnfonts.com/css/ransom-note" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <AuthProvider>
          <MantineProvider theme={theme}>
            <Notifications />
            {children}
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
