
"use client";

import { Provider } from 'react-redux';
import { store } from '@/store';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
}
