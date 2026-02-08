import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://socia-agency.vercel.app/"), // 🔁 Replace after deploy

  title: "SOCIA — Creative Marketing Intelligence",
  description:
    "A powerful creative marketing command center to manage campaigns, leads, and growth performance in one unified workspace.",

  openGraph: {
    title: "SOCIA — Creative Marketing Intelligence",
    description:
      "A powerful creative marketing command center to manage campaigns, leads, and growth performance in one unified workspace.",
    url: "/",
    siteName: "SOCIA",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "SOCIA Creative Marketing Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SOCIA — Creative Marketing Intelligence",
    description:
      "A powerful creative marketing command center to manage campaigns, leads, and growth performance in one unified workspace.",
    images: ["/og-cover.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#F8FAFC]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
