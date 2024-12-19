// eslint-disable-next-line no-restricted-syntax
import '@web/i18n';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, trpc } from '@web/api';
import { Toaster } from '@web/components/ui/Toaster';
import { AppRouter } from '@web/router/AppRouter';
import { getJWT } from '@web/utility/localStorage';
import { useState } from 'react';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(createTRPCClient(getJWT()));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <>
          <AppRouter />
          <Toaster />
        </>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
