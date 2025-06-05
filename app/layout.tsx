import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/_styles/globals.css";
import { Header } from "@/_components/navigation/header/header";
import { Footer } from "@/_components/navigation/footer/footer";

const InterSansSerif = Inter({
  variable: "--font-inter-sans-serif",
  display: "swap",
  subsets: ["latin"],
  weight: ["200", "300", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lookoutcentre.co.za/"),
  title: "The Lookout Centre - Plettenberg Bay",
  description:
    "The Lookout Centre in Plettenberg Bay is a charming historic shopping destination featuring boutique stores, local eateries, fashion, home décor, beauty salons, artwork, and a cozy bookstore. Perfect for locals and visitors seeking unique shopping and dining experiences in the heart of Plettenberg Bay.",
  keywords:
    "Lookout Centre, Plettenberg Bay, shopping, boutiques, eateries, fashion, home décor, beauty salons, artwork, bookstore, local shops, unique experiences, South Africa",
  openGraph: {
    description:
      "The Lookout Centre in Plettenberg Bay is a charming historic shopping destination featuring boutique stores, local eateries, fashion, home décor, beauty salons, artwork, and a cozy bookstore. Perfect for locals and visitors seeking unique shopping and dining experiences in the heart of Plettenberg Bay.",
    type: "website",
    locale: "en_ZA",
    siteName: "The Lookout Centre - Plettenberg Bay",
    images: [
      {
        url: "/open-graph-image.webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${InterSansSerif} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
