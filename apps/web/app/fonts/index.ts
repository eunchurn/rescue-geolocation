import localFont from "next/font/local";
import { Inter, Dongle } from "next/font/google";

export const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const dongle = Dongle({ style: "normal", weight: "400", preload: false, variable: "--font-dongle" });
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });