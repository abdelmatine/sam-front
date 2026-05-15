"use client";

import { Provider } from 'react-redux';
import { store } from '@/store';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { StatePersistence } from '@/components/shared/StatePersistence';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <StatePersistence />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
