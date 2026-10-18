
import type { Metadata } from "next";

const siteUrl = "https://YOUR-REAL-DOMAIN";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Кварта — кофе свежей обжарки",
    description:
      "Кофе маленькими партиями и доставка по Минску.",
  },
};
