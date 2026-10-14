
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "../lib/products";


export default function Products() {
  return (
    <section className="section products-section" id="coffee">
      <div className="container">
        <div className="products-heading">
          <div>
            <p className="eyebrow">Ничего лишнего</p>
            <h2 className="section-heading">
              Кофе на каждый день.
              <br />
              И под ваше настроение.
            </h2>
          </div>

          <p className="section-copy">
            Выбираем зерно, обжариваем небольшими партиями
            и даём каждому сорту раскрыться по-своему.
            Все пачки — по 250 граммов.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="products-bottom">
          <span>Свежая обжарка каждую неделю</span>
          <a className="text-link" href="#order">
            Не знаете, что выбрать?
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
