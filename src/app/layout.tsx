import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from "@/components/ui/toaster";
import { LanguageHandler } from '@/components/layout/LanguageHandler';
import Footer from '@/components/layout/Footer';
import PageLoader from '@/components/page-loader';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'SAM Médicale | Solutions Respiratoires Avancées',
  description: 'Équipements médicaux premium : CPAP, BPAP, Concentrateurs d\'oxygène et accessoires cliniques.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Creative Clinical Typography: Manrope for Headlines, Plus Jakarta Sans for Body */}
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-background font-body">
        <Providers>
          <LanguageHandler />
          <Suspense fallback={null}>
            <PageLoader />
          </Suspense>
          <div className="flex-1 w-full flex flex-col">
            {children}
          </div>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
