
"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

type Interest = "subscription" | "order" | "question";

type FormValues = {
  name: string;
  phone: string;
  interest: Interest;
  comment: string;
  website: string;
};

const initialValues: FormValues = {
  name: "",
  phone: "",
  interest: "subscription",
  comment: "",
  website: "",
};

export default function LeadForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: "" }));
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");
    setFieldErrors({});

    try {
      const params = new URLSearchParams(window.location.search);

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          interest: values.interest,
          comment: values.comment,
          website: values.website,

          // Рекламные метки
          source: params.get("utm_source") ?? "",
          campaign: params.get("utm_campaign") ?? "",
          ad:
            params.get("utm_content") ??
            params.get("utm_ad") ??
            "",
          page: window.location.pathname,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        if (result?.errors) {
          const nextErrors: Record<string, string> = {};

          for (const [field, messages] of Object.entries(
            result.errors as Record<string, unknown>,
          )) {
            if (Array.isArray(messages) && typeof messages[0] === "string") {
              nextErrors[field] = messages[0];
            }
          }

          setFieldErrors(nextErrors);
        }

        throw new Error(
          result?.message ??
            "Не удалось отправить заявку. Попробуйте ещё раз.",
        );
      }

      setSuccess(
        result.message ?? "Спасибо! Мы скоро свяжемся с вами.",
      );
      setValues(initialValues);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Проверьте соединение и попробуйте ещё раз.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section lead-section" id="order">
      <div className="container lead-grid">
        <div>
          <p className="eyebrow">Будем на связи</p>

          <h2 className="section-heading">
            Давайте найдём ваш кофе
          </h2>

          <p className="section-copy">
            Оставьте контакты — поможем выбрать зерно,
            расскажем о подписке и согласуем доставку.
          </p>

          <div className="lead-contact">
            <span>Наша обжарочная</span>
            <strong>Минск, ул. Короля, 9</strong>
            <span>Пн–Пт: 08:00–20:00</span>
            <span>Сб–Вс: 10:00–18:00</span>
          </div>
        </div>

        <form className="lead-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="lead-name">Ваше имя</label>
            <input
              id="lead-name"
              name="name"
              autoComplete="name"
              placeholder="Как к вам обращаться?"
              value={values.name}
              onChange={(e) => updateField("name", e.target.value)}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "lead-name-error" : undefined}
              required
              maxLength={100}
            />
            {fieldErrors.name && (
              <small id="lead-name-error" role="alert">
                {fieldErrors.name}
              </small>
            )}
          </div>

          <div className="field">
            <label htmlFor="lead-phone">Номер телефона</label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+375 29 123-45-67"
              value={values.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={
                fieldErrors.phone ? "lead-phone-error" : "lead-phone-hint"
              }
              required
              maxLength={30}
            />
            {fieldErrors.phone ? (
              <small id="lead-phone-error" role="alert">
                {fieldErrors.phone}
              </small>
            ) : (
              <small id="lead-phone-hint">
                Белорусский номер, например +375 29 123-45-67
              </small>
            )}
          </div>

          <div className="field">
            <label htmlFor="lead-interest">Что вас интересует?</label>
            <select
              id="lead-interest"
              name="interest"
              value={values.interest}
              onChange={(e) =>
                updateField("interest", e.target.value as Interest)
              }
            >
              <option value="subscription">Подписка на кофе</option>
              <option value="order">Разовый заказ</option>
              <option value="question">Задать вопрос</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="lead-comment">
              Комментарий <span>— необязательно</span>
            </label>
            <textarea
              id="lead-comment"
              name="comment"
              placeholder="Любимые вкусы, способ заваривания или вопрос..."
              value={values.comment}
              onChange={(e) => updateField("comment", e.target.value)}
              maxLength={2000}
              rows={4}
            />
          </div>

          {/* Honeypot: обычный посетитель не должен заполнять поле */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            <label htmlFor="lead-website">Не заполняйте это поле</label>
            <input
              id="lead-website"
              name="website"
              type="text"
              value={values.website}
              onChange={(e) => updateField("website", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {error && (
            <p className="form-message form-error" role="alert">
              <AlertCircle size={17} />
              <span>{error}</span>
            </p>
          )}

          {success && (
            <p className="form-message form-success" role="status">
              <CheckCircle2 size={17} />
              <span>{success}</span>
            </p>
          )}

          <button
            className="button form-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Отправляем..." : "Оставить заявку"}
            {!loading && <ArrowRight size={16} />}
          </button>

          <p className="form-privacy">
            Нажимая кнопку, вы соглашаетесь на обработку указанных
            контактных данных для ответа на ваш запрос.
          </p>
        </form>
      </div>
    </section>
  );
}
