import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Joda Entre Amigos — El juego que arruina amistades",
  description:
    "Juego de cartas para fiestas y juntadas. Retos, confesiones, y momentos incómodos entre amigos. 250+ cartas.",
  keywords: ["juego de cartas", "fiesta", "amigos", "do or drink", "yo nunca nunca"],
  authors: [{ name: "Joda Entre Amigos" }],
  openGraph: {
    title: "Joda Entre Amigos 🔥",
    description: "El juego de fiesta que arruina amistades. 250+ cartas.",
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
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-body"
        style={{
          fontFamily: "'Nunito', sans-serif",
          // CSS custom props for Tailwind font families
          // @ts-ignore
          "--font-display": "'Permanent Marker'",
          "--font-body": "'Nunito'",
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
