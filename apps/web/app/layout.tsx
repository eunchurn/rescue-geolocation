import "./globals.css";
import type { Metadata, Viewport } from "next";
import styles from "./layout.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "긴급구조 위치 공유",
  description: "조난자에게 링크를 보내 위치를 수집하세요.",
  metadataBase: new URL("https://rescue.clev.app"),
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <main className={styles.main_container}>{children}</main>
      </body>
    </html>
  );
}
