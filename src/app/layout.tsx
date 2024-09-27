import { NavBar } from "@/components";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SEO Optimizer",
  description: "Enhance your content's SEO with AI-generated suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriweather.variable} bg-gray-100 text-gray-800 font-sans antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}