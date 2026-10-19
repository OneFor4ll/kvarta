
import "server-only";

type LeadNotification = {
  name: string;
  phone: string;
  interest: "subscription" | "order" | "question";
  comment?: string;
  source?: string;
  campaign?: string;
  ad?: string;
  page?: string;
};

const interestLabels = {
  subscription: "Подписка",
  order: "Разовый заказ",
  question: "Вопрос",
} as const;

export async function notifyTelegram(lead: LeadNotification) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram notification is not configured");
    return;
  }

  const message = [
    "☕ Новая заявка — Кварта",
    "",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Интерес: ${interestLabels[lead.interest]}`,
    lead.comment ? `Комментарий: ${lead.comment}` : "",
    lead.source ? `Источник: ${lead.source}` : "",
    lead.campaign ? `Кампания: ${lead.campaign}` : "",
    lead.ad ? `Реклама: ${lead.ad}` : "",
    lead.page ? `Страница: ${lead.page}` : "",
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 4000);

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram HTTP ${response.status}`);
  }

  const result = (await response.json()) as { ok?: boolean };

  if (!result.ok) {
    throw new Error("Telegram rejected the message");
  }
}
