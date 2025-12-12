import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/providers/currency-provider";

export const metadata: Metadata = {
  title: {
    default: "CodeSekho - Learn to Code with Industry Experts",
    template: "%s | CodeSekho",
  },
  description:
    "Master programming skills with CodeSekho. Get industry-relevant courses, comprehensive interview preparation, and hands-on projects to launch your tech career.",
  keywords: [
    "coding",
    "programming",
    "learn to code",
    "web development",
    "interview preparation",
    "software engineering",
    "online courses",
    "Pakistan",
    "tech education",
  ],
  authors: [{ name: "CodeSekho Team" }],
  creator: "CodeSekho",
  publisher: "CodeSekho",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://codesekho.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CodeSekho - Learn to Code with Industry Experts",
    description:
      "Master programming skills with CodeSekho. Get industry-relevant courses, comprehensive interview preparation, and hands-on projects.",
    url: "https://codesekho.com",
    siteName: "CodeSekho",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeSekho - Learn to Code",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeSekho - Learn to Code with Industry Experts",
    description:
      "Master programming skills with CodeSekho. Industry-relevant courses and interview preparation.",
    images: ["/og-image.png"],
    creator: "@codesekho",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A2E" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-surface antialiased">
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}

