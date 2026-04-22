import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = "https://psicamilamagalhaes.com.br";

export const metadata: Metadata = {
  title: "Camila Magalhães — Psicóloga Online | TCC e Saúde Mental",
  description:
    "Psicóloga clínica online. Camila Magalhães oferece Terapia Cognitivo-Comportamental (TCC) para ansiedade, autoestima, relacionamentos e luto. Agende sua consulta.",
  keywords: [
    "psicóloga online",
    "psicoterapia online",
    "TCC online",
    "terapia cognitivo comportamental",
    "psicóloga ansiedade",
    "psicóloga autoestima",
    "Camila Magalhães psicóloga",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Camila Magalhães — Psicóloga Online | TCC e Saúde Mental",
    description:
      "Psicóloga clínica online. Atendimento via TCC para ansiedade, autoestima, relacionamentos e luto. Um espaço seguro para se entender melhor.",
    siteName: "Camila Magalhães | Psicóloga",
    locale: "pt_BR",
    images: [
      {
        url: `${SITE_URL}/camila-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Camila Magalhães, Psicóloga Clínica Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Camila Magalhães — Psicóloga Online",
    description:
      "Atendimento psicológico online via TCC. Ansiedade, autoestima, relacionamentos e luto.",
    images: [`${SITE_URL}/camila-hero.jpg`],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${workSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
