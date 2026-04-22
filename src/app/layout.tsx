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

export const metadata: Metadata = {
  title: "Camila Magalhães - Psicóloga Clínica | TCC e Acolhimento Emocional",
  description:
    "Psicóloga Camila Magalhães oferece Terapia Cognitivo-Comportamental, escuta ativa e acolhimento emocional. Agende sua consulta presencial ou online.",
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
