
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Кварта — свежая обжарка кофе в Минске",
  description:
    "Обжариваем кофе небольшими партиями по четвергам. Эфиопия, Колумбия, Бразилия и подписка на свежий кофе с доставкой по Минску.",
  openGraph: {
    title: "Кварта — кофе, который приезжает свежим",
    description:
      "Небольшая обжарка в Минске. Свежий кофе домой и в офис.",
    locale: "ru_BY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
