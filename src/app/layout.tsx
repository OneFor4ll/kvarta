
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://kvarta-zeta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Кварта — свежая обжарка кофе в Минске",
  description:
    "Свежий кофе маленькими партиями. Обжариваем по четвергам, доставляем по Минску. Выберите зерно или оформите подписку.",

  openGraph: {
    title: "Кварта — кофе свежей обжарки",
    description:
      "Кофе маленькими партиями, честные вкусы и доставка по Минску.",
    siteName: "Обжарка «Кварта»",
    locale: "ru_BY",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Обжарка «Кварта» — свежий кофе в Минске",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Кварта — кофе свежей обжарки",
    description:
      "Кофе маленькими партиями и доставка по Минску.",
    images: ["/opengraph-image"],
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
