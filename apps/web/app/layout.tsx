import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { FooterButton } from "@/components";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "긴급구조 위치 공유",
  description: "조난자에게 링크를 보내 위치를 수집하세요.",
  metadataBase: new URL("https://rescue.clev.app"),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-sans antialiased overflow-x-hidden max-w-full">
        <SpeedInsights />
        <ThemeProvider>
          <main className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">
            <div className="flex-1 flex justify-center items-start overflow-x-hidden max-w-full">
              {children}
            </div>
            <footer className="h-12 flex justify-center items-center border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <FooterButton />
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}