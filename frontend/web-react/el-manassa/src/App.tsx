import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { createAppTheme, colorPalettes } from './theme/theme';
import { AnimatedBackground } from './components/common/AnimatedBackground';
import { AppRouter } from './router';
import { useThemeStore } from './store/themeStore';
import { motion, AnimatePresence } from 'framer-motion';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { currentPalette, mode, direction } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const theme = useMemo(
    () => createAppTheme(colorPalettes[currentPalette], mode, direction),
    [currentPalette, mode, direction]
  );
  
  if (!mounted) {
    return null; // Prevent SSR flash
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPalette}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedBackground variant="gradient" intensity={0.3} />
                <AppRouter />
              </motion.div>
            </AnimatePresence>
          </BrowserRouter>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[4],
              },
              success: {
                iconTheme: {
                  primary: theme.palette.success.main,
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: theme.palette.error.main,
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App
