import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fast Softun - eCommerce & POS Platform",
  description: "eCommerce & POS Platform Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col font-sans bg-[#070B14] text-white">
        {children}
      </body>
    </html>
  );
}
  