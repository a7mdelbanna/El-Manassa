import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useThemeStore } from '../../store/themeStore';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create LTR cache
const cacheLtr = createCache({
  key: 'muiltr',
  stylisPlugins: [prefixer],
});

interface RTLProviderProps {
  children: React.ReactNode;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children }) => {
  const { direction } = useThemeStore();

  // Update document direction
  useEffect(() => {
    document.dir = direction;
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', direction === 'rtl' ? 'ar' : 'en');
    
    // Update body class for additional styling
    document.body.classList.toggle('rtl', direction === 'rtl');
    document.body.classList.toggle('ltr', direction === 'ltr');
    
    // Add font class for better rendering
    document.body.classList.toggle('arabic-font', direction === 'rtl');
    document.body.classList.toggle('english-font', direction === 'ltr');
  }, [direction]);

  const cache = direction === 'rtl' ? cacheRtl : cacheLtr;

  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  );
};