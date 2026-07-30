import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = "링크를 폴더별로 정리하고 관리하는 한입 링크 서비스입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | 한입 링크",
    default: "한입 링크",
  },
  description,
  openGraph: {
    title: "한입 링크",
    description,
    siteName: "한입 링크",
    images: [
      {
        url: "/thumbnail.png",
        width: 2400,
        height: 1260,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "한입 링크",
    description,
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
