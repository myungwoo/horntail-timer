import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "혼테일 타이머 | Mapleland",
  description: "메이플랜드 혼테일 공략 보조 타이머 (좌/중/우 43초, 버프해제 50%·30%)",
  icons: {
    icon: [
      { url: "favicon.ico" },
      { url: "icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
