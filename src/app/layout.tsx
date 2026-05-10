
import type { Metadata } from 'next';
import { Alegreya, Belleza } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const fontBody = Alegreya({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Belleza({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Global Wellness Guide',
  description:
    'Generate personalized, educational recovery plans using natural therapies. Your guide to holistic wellness.',
  openGraph: {
    title: 'Global Wellness Guide',
    description:
      'Generate personalized, educational recovery plans using natural therapies. Your guide to holistic wellness.',
    type: 'website',
    url: 'https://global-wellness-guide.web.app',
    images: [
      {
        url: 'https://global-wellness-guide.web.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Global Wellness Guide hero image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Wellness Guide',
    description:
      'Generate personalized, educational recovery plans using natural therapies. Your guide to holistic wellness.',
    images: ['https://global-wellness-guide.web.app/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
