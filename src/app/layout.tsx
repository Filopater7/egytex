import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EgyTex — Food & Desserts",
    template: "%s | EgyTex",
  },
  description:
    "Authentic Egyptian food and desserts. Fresh kunafa, cakes, shawarma, grilled meals and more.",
  keywords: [
    "Egyptian food",
    "kunafa",
    "desserts",
    "shawarma",
    "Egyptian cuisine",
    "daily essentials",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Daily Essentials Store",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
