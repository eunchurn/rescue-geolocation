import "./globals.css";
import type { Metadata, Viewport } from "next";
import styles from "./layout.module.css";
import { Inter } from "next/font/google";
import { FooterButton } from "@/components";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });


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
    <html lang="ko">
      <body className={inter.className}>
        <SpeedInsights />
        <main className={styles.main_container}>{children} </main>
        <footer className={styles.footer_container}>
          <FooterButton />
        </footer>
      </body>
    </html>
  );
}
