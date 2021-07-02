import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { global, darkTheme, DesignSystemProvider, Box } from '@modulz/design-system';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { PrimitivesPage } from '@components/PrimitivesPage';
import { DesignSystemPage } from '@components/DesignSystemPage';
import { ColorsPage } from '@components/ColorsPage';
import { useAnalytics } from '@lib/analytics';
import { scrollToUrlHash } from '@lib/scrollToUrlHash';

const globalStyles = global({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  body: {
    margin: 0,
    backgroundColor: '$loContrast',
    fontFamily: '$untitled',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',

    '.dark-theme &': {
      backgroundColor: '$mauve1',
    },
  },

  svg: {
    display: 'block',
    verticalAlign: 'middle',
  },

  'pre, code': { margin: 0, fontFamily: '$mono' },

  '::selection': {
    backgroundColor: '$violet5',
  },

  '#__next': {
    position: 'relative',
    zIndex: 0,
  },

  'h1, h2, h3, h4, h5': { fontWeight: 500 },
});

function App({ Component, pageProps }: AppProps) {
  globalStyles();
  useAnalytics();
  const router = useRouter();

  React.useEffect(() => {
    scrollToUrlHash(router.asPath);
  }, []);

  const isPrimitivesDocs = router.pathname.includes('/docs/primitives');
  const isDesignSystemDocs = router.pathname.includes('/docs/design-system');
  const isColorsDocs = router.pathname.includes('/docs/colors');
  const IsNotADocPage = !isPrimitivesDocs && !isDesignSystemDocs && !isColorsDocs;

  return (
    <DesignSystemProvider>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: 'light-theme', dark: darkTheme.toString() }}
        defaultTheme="system"
      >
        <Box
          css={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            boxShadow: IsNotADocPage ? 'none' : '0 0 0 1px $colors$mauve5',
            zIndex: 2,
            backgroundColor: '$loContrast',

            '.dark-theme &': {
              backgroundColor: '$mauve1',
            },
          }}
        >
          <Header />
        </Box>
        <Box css={{ pt: '$7', position: 'relative', zIndex: 1 }}>
          {isPrimitivesDocs ? (
            <PrimitivesPage>
              <Component {...pageProps} />
            </PrimitivesPage>
          ) : isDesignSystemDocs ? (
            <DesignSystemPage>
              <Component {...pageProps} />
            </DesignSystemPage>
          ) : isColorsDocs ? (
            <ColorsPage>
              <Component {...pageProps} />
            </ColorsPage>
          ) : (
            <Component {...pageProps} />
          )}
        </Box>
        {IsNotADocPage && <Footer />}
      </ThemeProvider>
    </DesignSystemProvider>
  );
}

export default App;
