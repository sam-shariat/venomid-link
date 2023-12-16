import type { AppProps } from 'next/app';
import ThemeProvider from 'components/Provider/ThemeProvider';
import Layout from 'components/Layout';
import { useDirectionSetter } from 'core/lib/hooks/use-directionSetter';
import { VenomConfig } from 'venom-react-hooks';
import { initVenomConnect } from 'components/venomConnect/configure';
// import { TonClientContextProvider } from 'components/Provider/TonProvider';
// import { ClientConfig } from "@eversdk/core"
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  useDirectionSetter();
  // const config: ClientConfig = {
  //   network: {
  //     endpoints: ['https://dashboard.evercloud.dev/projects/01f6cad0488345d28df37ee824c9de7f/endpoints'],
  //   },
  // };

  return (
    <ThemeProvider>
      {/* <TonClientContextProvider config={config}> */}
      <VenomConfig initVenomConnect={initVenomConnect as any}>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </VenomConfig>
      {/* </TonClientContextProvider> */}
    </ThemeProvider>
  );
}

export default MyApp;
