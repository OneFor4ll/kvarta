
import { ArrowDownRight, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow">Небольшая обжарка в Минске</p>

          <h1>
            Хороший кофе.
            <br />
            <span>Свежий по-настоящему.</span>
          </h1>

          <p className="hero-description">
            Обжариваем небольшими партиями по четвергам.
            Привозим домой и в офис уже через 1–3 дня.
            Без лишних слов — просто вкусный кофе.
          </p>

          <div className="hero-actions">
            <a className="button" href="#subscription">
              Хочу подписку
              <ArrowRight size={17} />
            </a>
            <a className="text-link" href="#coffee">
              Выбрать кофе
              <ArrowDownRight size={17} />
            </a>
          </div>

          <div className="hero-note">
            <span className="hero-note-dot" />
            <span>Следующая обжарка — в четверг</span>
          </div>
        </div>

        <div className="hero-visual">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=85"
            alt="Свежие кофейные зёрна крупным планом"
            fetchPriority="high"
          />

          <div className="hero-stamp">
            <span>МАЛЕНЬКИЕ</span>
            <strong>партии</strong>
            <span>ПО 5 КГ</span>
          </div>

          <div className="hero-caption">
            <span>01 / 03</span>
            <span>Свежая обжарка · Минск</span>
          </div>
        </div>
      </div>

      <div className="hero-bottom container">
        <span>Обжариваем с 2019 года</span>
        <span>Пятничная доставка по Минску</span>
        <span>Самовывоз на Короля, 9</span>
      </div>
    </section>
  );
}
