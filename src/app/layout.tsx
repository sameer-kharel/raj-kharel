import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
