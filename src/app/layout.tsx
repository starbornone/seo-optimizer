import { Footer, NavBar } from '@/components';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  weight: ['300', '400', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SEO Optimizer',
  description: "Enhance your content's SEO with AI-generated suggestions.",
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
