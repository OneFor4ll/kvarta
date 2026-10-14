
import { Check, ArrowRight } from "lucide-react";

const benefits = [
  "2 пачки по 250 г каждый месяц",
  "Кофе свежей обжарки",
  "Бесплатная доставка по Минску",
  "Можно обсудить предпочтения с менеджером",
];

export default function Subscription() {
  return (
    <section className="section subscription-section" id="subscription">
      <div className="container subscription-grid">
        <div className="subscription-copy">
          <p className="eyebrow">Кофе, о котором не нужно думать</p>
          <h2 className="section-heading">
            Хороший кофе
            <br />
            сам приходит домой.
          </h2>

          <p className="section-copy">
            Две пачки свежего зерна каждый месяц.
            Для утреннего ритуала, рабочих созвонов
            и выходных без спешки.
          </p>

          <ul className="benefit-list">
            {benefits.map((benefit) => (
              <li key={benefit}>
                <Check size={17} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <a className="button" href="#order">
            Оформить подписку
            <ArrowRight size={17} />
          </a>

          <p className="subscription-footnote">
            Оставьте заявку — менеджер свяжется с вами
            и уточнит детали.
          </p>
        </div>

        <div className="subscription-visual">
          <img
            src="https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=1100&q=85"
            alt="Кофе и утренний ритуал дома"
            loading="lazy"
          />
          <div className="subscription-price">
            <span>Подписка на месяц</span>
            <strong>54 BYN</strong>
            <small>2 × 250 г · доставка включена</small>
          </div>
        </div>
      </div>
    </section>
  );
}
