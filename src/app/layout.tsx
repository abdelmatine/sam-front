import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from "@/components/ui/toaster";
import { LanguageHandler } from '@/components/layout/LanguageHandler';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/shared/PageTransition';

export const metadata: Metadata = {
  title: 'SAM Médicale | Solutions Respiratoires Avancées',
  description: 'Équipements médicaux premium : CPAP, BPAP, Concentrateurs d\'oxygène et accessoires cliniques.',
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
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <LanguageHandler />
          <PageTransition>
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </PageTransition>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}