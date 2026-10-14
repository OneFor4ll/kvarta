
"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function LeadForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    if (!name || !phone) {
      setError("Заполните имя и номер телефона.");
      setStatus("error");
      return;
    }

    // The API endpoint will be connected in the backend step.
    setError(
      "Форма пока в режиме разработки. Подключите API, чтобы отправлять заявки.",
    );
    setStatus("error");
  }

  return (
    <section className="section lead-section" id="order">
      <div className="container lead-grid">
        <div className="lead-copy">
          <p className="eyebrow">Давайте знакомиться</p>
          <h2 className="section-heading">
            Расскажите,
            <br />
            какой кофе любите.
          </h2>
          <p className="section-copy">
            Оставьте заявку, и мы перезвоним, поможем выбрать
            зерно или расскажем, как работает подписка.
            Никакой оплаты на сайте.
          </p>

          <div className="lead-contact">
            <span>Наша мастерская</span>
            <strong>Минск, ул. Короля, 9</strong>
            <span>Пн–пт 8:00–20:00 · Сб–вс 10:00–18:00</span>
          </div>
        </div>

        <form className="lead-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="lead-name">Как к вам обращаться?</label>
            <input
              id="lead-name"
              name="name"
              type="text"
              placeholder="Ваше имя"
              autoComplete="name"
              maxLength={100}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="lead-phone">Номер телефона</label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              placeholder="+375 (__) ___-__-__"
              autoComplete="tel"
              inputMode="tel"
              required
            />
            <small>Пока принимаем белорусские номера.</small>
          </div>

          <div className="field">
            <label htmlFor="lead-interest">Что вас интересует?</label>
            <select
              id="lead-interest"
              name="interest"
              defaultValue="subscription"
            >
              <option value="subscription">Подписка на кофе</option>
              <option value="order">Разовый заказ</option>
              <option value="question">Есть вопрос</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="lead-comment">
              Комментарий <span>(необязательно)</span>
            </label>
            <textarea
              id="lead-comment"
              name="comment"
              placeholder="Например, люблю кофе для фильтра..."
              rows={3}
              maxLength={1000}
            />
          </div>

          {status === "error" && (
            <p className="form-message form-error" role="alert">
              <AlertCircle size={17} />
              {error}
            </p>
          )}

          {status === "success" && (
            <p className="form-message form-success" role="status">
              <CheckCircle2 size={17} />
              Заявка отправлена. Скоро свяжемся с вами.
            </p>
          )}

          <button
            className="button form-submit"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Отправляем..." : "Оставить заявку"}
            <ArrowRight size={17} />
          </button>

          <p className="form-privacy">
            Нажимая кнопку, вы соглашаетесь на обработку
            указанных данных для связи по вашей заявке.
          </p>
        </form>
      </div>
    </section>
  );
}
