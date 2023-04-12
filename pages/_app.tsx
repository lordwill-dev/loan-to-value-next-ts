import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Poppins } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const poppins = Poppins(
  {
    subsets: ['latin'],
    weight: ['300', '400', '500'],
  },
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          fontFamily: poppins.style.fontFamily,
          globalStyles: (theme) => ({
            body: {
              backgroundColor: theme.fn.rgba(theme.colors.violet[0], 0.4),
            },
          }),
        }}
      >
        <Notifications position="top-right" />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
