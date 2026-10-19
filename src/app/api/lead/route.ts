import { createLead } from "@/app/lib/db";
import { leadSchema } from "@/app/lib/lead-schema";
import { notifyTelegram } from "@/app/lib/telegram";
import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_BYTES = 10 * 1024;

function json(
  body: Record<string, unknown>,
  status = 200,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: NextRequest) {
  // Принимаем только JSON
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(
      { ok: false, code: "INVALID_CONTENT_TYPE", message: "Отправьте данные формы в формате JSON." },
      415,
    );
  }

  try {
    // Читаем тело как текст, чтобы ограничить размер до JSON.parse
    const rawBody = await request.text();

    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return json(
        { ok: false, code: "BODY_TOO_LARGE", message: "Форма слишком большая." },
        413,
      );
    }

    let body: unknown;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return json(
        { ok: false, code: "INVALID_JSON", message: "Не удалось прочитать данные формы." },
        400,
      );
    }

    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return json(
        {
          ok: false,
          code: "VALIDATION_ERROR",
          message: "Проверьте правильность заполнения формы.",
          errors: parsed.error.flatten().fieldErrors,
        },
        400,
      );
    }

    const lead = parsed.data;

    // Honeypot: не сохраняем заявки, которые заполнили скрытое поле.
    // Возвращаем нейтральный ответ, чтобы не помогать спам-боту.
    if (lead.website) {
      return json({
        ok: true,
        message: "Заявка принята.",
      }, 201);
    }


    const result = await createLead({
      name: lead.name,
      phone: lead.phone,
      interest: lead.interest,
      comment: lead.comment,
      source: lead.source,
      campaign: lead.campaign,
      ad: lead.ad,
      page: lead.page,
      website: lead.website,
    });

    if (result.duplicate) {
      return json(
        {
          ok: false,
          code: "DUPLICATE",
          message: "Заявка с этим номером уже отправлена. Попробуйте ещё раз через 10 минут.",
        },
        409,
      );
    }

    try {
      await notifyTelegram(lead);
    } catch {
      // Заявка уже сохранена в Neon.
      // Ошибка Telegram не должна мешать отправке формы.
      console.error("Telegram notification failed");
    }

    return json(
      {
        ok: true,
        message: "Спасибо! Мы скоро свяжемся с вами.",
      },
      201,
    );
  } catch (error) {
    // Не пишем телефон, имя или комментарий в логи.
    console.error("Lead API failed:", error);

    return json(
      {
        ok: false,
        code: "INTERNAL_ERROR",
        message: "Не удалось отправить заявку. Попробуйте немного позже.",
      },
      500,
    );
  }
}
