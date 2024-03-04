import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/reset.css';
import '@/styles/default.css';

const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
