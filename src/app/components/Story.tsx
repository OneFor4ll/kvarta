
import { Coffee, CalendarDays, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: Coffee,
    number: "01",
    title: "Выбираем зерно",
    description:
      "Ищем интересные лоты и подбираем обжарку под характер каждого сорта.",
  },
  {
    icon: CalendarDays,
    number: "02",
    title: "Обжариваем в четверг",
    description:
      "Работаем небольшими партиями по 5 кг, чтобы уделить внимание каждому зерну.",
  },
  {
    icon: PackageCheck,
    number: "03",
    title: "Привозим в пятницу",
    description:
      "Развозим заказы по Минску. Обычно кофе оказывается у вас на 1–3 день после обжарки.",
  },
];

export default function Story() {
  return (
    <section className="section story-section" id="about">
      <div className="container">
        <div className="story-intro">
          <p className="eyebrow">Наша маленькая мастерская</p>
          <h2 className="section-heading">
            Мы Аня и Дима.
            <br />
            И мы любим свежий кофе.
          </h2>
          <p className="section-copy">
            В 2019 году мы были бариста и хотели одного:
            чтобы вкусный кофе дома был таким же понятным
            и приятным, как чашка в хорошей кофейне.
            Так появилась «Кварта».
          </p>
        </div>

        <div className="story-steps">
          {steps.map(({ icon: Icon, number, title, description }) => (
            <article className="story-step" key={number}>
              <div className="story-step-top">
                <Icon size={24} strokeWidth={1.5} />
                <span>{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className="freshness-note">
          <span className="freshness-number">1–3</span>
          <p>
            <strong>Дня от обжарки до вас.</strong>
            <br />
            Не обещаем волшебства. Просто не держим кофе
            неделями на складе.
          </p>
        </div>
      </div>
    </section>
  );
}
