import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { NextUIProvider } from '@nextui-org/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';
import NotificationService from '@/components/NotificationService/NotificationService';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NotificationService />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default App;
