import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header"; // Import Header
import Footer from "./components/Footer"; // Import Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raj Kharel - Real Estate Expert",
  description: "Your trusted real estate professional in the DMV area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a23]`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
