import "./globals.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/experience/footer";
import { Header } from "@/components/experience";
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});
export const metadata: Metadata = {
  title: "구조 · 안전으로 이어지는 위치공유",
  description: "링크 하나로 위치를 공유하고, 도움이 필요한 사람을 찾아주세요.",
  metadataBase: new URL("https://www.gujo.app"),
};
export const viewport: Viewport = { themeColor: "#f7f8f4" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <a href="#main" className="skip-link">
          본문으로 이동
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
