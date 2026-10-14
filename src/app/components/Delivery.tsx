
import { MapPin, Truck, Clock, ArrowUpRight } from "lucide-react";

export default function Delivery() {
  return (
    <section className="section delivery-section" id="delivery">
      <div className="container">
        <p className="eyebrow">Без сложной логистики</p>
        <h2 className="section-heading">
          Кофе рядом.
          <br />
          Забрать или привезти?
        </h2>

        <div className="delivery-grid">
          <article className="delivery-card">
            <Truck size={27} strokeWidth={1.5} />
            <h3>Доставка по Минску</h3>
            <p>
              По пятницам, после свежей обжарки.
              От 50 BYN доставка бесплатная.
            </p>
            <a className="text-link" href="#order">
              Заказать доставку <ArrowUpRight size={15} />
            </a>
          </article>

          <article className="delivery-card">
            <MapPin size={27} strokeWidth={1.5} />
            <h3>Самовывоз</h3>
            <p>
              Минск, ул. Короля, 9.
              Заберите свой заказ в мастерской.
            </p>
            <a
              className="text-link"
              href="https://www.google.com/maps/search/?api=1&query=Минск%2C+улица+Короля%2C+9"
              target="_blank"
              rel="noreferrer"
            >
              Как нас найти <ArrowUpRight size={15} />
            </a>
          </article>

          <article className="delivery-card">
            <Clock size={27} strokeWidth={1.5} />
            <h3>Когда мы работаем</h3>
            <p>
              Пн–пт: 8:00–20:00
              <br />
              Сб–вс: 10:00–18:00
            </p>
            <a className="text-link" href="#order">
              Уточнить детали <ArrowUpRight size={15} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
