import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Bizora: your business, simplified",
  description:
    "Bizora is billing and business management for small businesses. It runs on your own computer, works offline, and has no monthly hosting cost.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
