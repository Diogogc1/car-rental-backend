import Providers from "@/components/session-provider.component";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Rental",
  description: "Sistema de aluguel de carros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.variable} antialiased h-screen`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
