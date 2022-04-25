import 'normalize.css';
import './app.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { AnimatePresence } from 'framer-motion';

import pkg from '../../package.json';

import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('FATHOM_CODE', {
      url: 'CUSTOM_TRACKING_SUBDOMAIN',
      includedDomains: ['THIS_DOMAIN_NAME'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener (cleanup)
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This empty dependency array is needed to only run on mount
  }, []);

  return (
    <>
      <Head>
        <title>{pkg.name}</title>
      </Head>
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
};

export default App;
