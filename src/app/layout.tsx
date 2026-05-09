import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from "@/components/ui/toaster";
import { LanguageHandler } from '@/components/layout/LanguageHandler';

export const metadata: Metadata = {
  title: 'RespiraMed Solutions | Advanced Respiratory Care',
  description: 'Premium CPAP, BPAP, Oxygen Concentrators, and Medical Accessories for Home & Clinical Use.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen">
        <Providers>
          <LanguageHandler />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}