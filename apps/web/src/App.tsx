// eslint-disable-next-line no-restricted-syntax
import '@web/i18n';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, trpc } from '@web/api';
import { Toaster } from '@web/components/ui/Toaster';
import { UserContextProvider } from '@web/contexts/User';
import { AppRouter } from '@web/router/AppRouter';
import { getJWT } from '@web/utility/localStorage';
import { useState } from 'react';

const App = () => {
  const [queryClient, setQueryClient] = useState(() => new QueryClient());
  const [trpcClient, setTRPCClient] = useState(createTRPCClient(getJWT()));

  async function refreshTRPCClient() {
    setQueryClient(new QueryClient());
    setTRPCClient(createTRPCClient(getJWT()));
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider refreshTRPCClient={refreshTRPCClient}>
          <AppRouter />
          <Toaster />
        </UserContextProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
