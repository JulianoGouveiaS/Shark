import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const descricao =
  "Shark é o sistema para quem vende seminovo no Brasil. Pátio, WhatsApp, troca, financiamento e documento no mesmo fio — para você ver o que está vendendo e o que está parado.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Shark — o lead da garagem, do oi até a chave",
  description: descricao,
  applicationName: "Shark",
  openGraph: {
    title: "Shark — o lead da garagem, do oi até a chave",
    description: descricao,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
