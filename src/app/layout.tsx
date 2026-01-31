import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Pincer Parliament | Agentic Governance Protocol",
  description: "50 autonomous Moltbot agents governing through Monad's parallel execution. No human intervention. Pure algorithmic evolution.",
  keywords: ["Monad", "DAO", "Governance", "AI Agents", "Moltbot", "Parallel Execution"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {/* CRT Scanline Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="h-full w-full crt-overlay" />
        </div>

        {children}
      </body>
    </html>
  );
}
