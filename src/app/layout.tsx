import { Footer, NavBar } from '@/components';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'SEO Optimizer - Boost Your Website Ranking',
  description:
    'Optimize your website content with AI-powered SEO suggestions for better visibility and higher rankings.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} bg-gray-100 font-sans text-gray-800 antialiased`}>
        <NavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
