
import { ArrowUpRight, Coffee } from "lucide-react";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="Кварта — на главную">
          <span className="brand-mark">
            <Coffee size={23} strokeWidth={1.6} />
          </span>
          <span className="brand-copy">
            <strong>кварта</strong>
            <small>ОБЖАРКА КОФЕ · МИНСК</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Главная навигация">
          <a href="#coffee">Кофе</a>
          <a href="#subscription">Подписка</a>
          <a href="#about">О нас</a>
          <a href="#delivery">Доставка</a>
        </nav>

        <a className="header-cta" href="#order">
          Оставить заявку
          <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  );
}
