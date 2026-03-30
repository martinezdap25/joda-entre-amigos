import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "El Coliseo del Trago — Bebe o Muere",
  description:
    "Juego de cartas para fiestas y juntadas. Retos, confesiones, y momentos incómodos entre amigos. 250+ cartas.",
  keywords: ["juego de cartas", "fiesta", "amigos", "do or drink", "yo nunca nunca"],
  authors: [{ name: "El Coliseo del Trago" }],
  openGraph: {
    title: "El Coliseo del Trago 🏛️",
    description: "Bebe o Muere. 250+ cartas.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a12",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scrollbar-thin">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Galindo&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-body"
        style={{
          fontFamily: "'Nunito', sans-serif",
          // CSS custom props for Tailwind font families
          // @ts-ignore
          "--font-display": "'Galindo'",
          "--font-body": "'Nunito'",
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
