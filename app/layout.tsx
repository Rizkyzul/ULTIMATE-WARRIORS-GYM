import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ultimate Warriors Gym — Cirebon",
  description:
    "Gym paling hardcore di Cirebon. Free weights, mesin isolasi, nutrition support. Buka setiap hari hingga 21.00 WIB. Ruko Citraland, Mundu.",
  keywords: ["gym cirebon", "fitness cirebon", "ultimate warriors gym", "gym hardcore cirebon"],
  openGraph: {
    title: "Ultimate Warriors Gym — Cirebon",
    description: "Gym paling hardcore di Cirebon. Fasilitas premium, tanpa kompromi.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
