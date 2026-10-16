
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Укажите имя (не менее 2 символов)")
    .max(100, "Имя слишком длинное"),

  phone: z
    .string()
    .trim()
    .min(5, "Укажите номер телефона")
    .max(30, "Проверьте номер телефона")
    .transform((value, ctx) => {
      const parsed = parsePhoneNumberFromString(value, "BY");

      if (!parsed || parsed.country !== "BY" || !parsed.isValid()) {
        ctx.addIssue({
          code: "custom",
          message: "Введите корректный белорусский номер телефона",
        });
        return z.NEVER;
      }

      return parsed.number;
    }),

  interest: z.enum(["subscription", "order", "question"]),

  comment: z.string().trim().max(2000, "Комментарий слишком длинный")
    .optional()
    .default(""),

  // Рекламная атрибуция
  source: z.string().trim().max(200).optional().default(""),
  campaign: z.string().trim().max(200).optional().default(""),
  ad: z.string().trim().max(200).optional().default(""),
  page: z.string().trim().max(500).optional().default(""),

  // Скрытое поле-антиспам: нормальный пользователь его не заполняет
  website: z.string().max(200).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;
