import './globals.css';
import '@/styles/prose.css';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Container from '@/components/container';
import { Analytics } from '@vercel/analytics/react';
import { defaultMetadata, personJsonLd } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetBrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = defaultMetadata;

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetBrains.variable} min-h-screen bg-background text-foreground`}
      >
        <Providers>
          <Header />
          <Container>
            <main id="main" className="pb-24 pt-12">
              {children}
            </main>
          </Container>
          <Footer />
          <Analytics />
        </Providers>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
