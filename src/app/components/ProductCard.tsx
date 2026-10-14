
import { ArrowUpRight } from "lucide-react";
import { Product } from "../lib/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <article className="product-card">
      <a
        className="product-image-wrap"
        href={`#order?product=${product.id}`}
        aria-label={`Оставить заявку на ${product.name}`}
      >
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {product.label && (
          <span className="product-label">{product.label}</span>
        )}
        <span className="product-arrow">
          <ArrowUpRight size={18} />
        </span>
      </a>

      <div className="product-info">
        <p className="product-notes">{product.tastingNotes}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-price-row">
          <strong>{product.price} BYN</strong>
          <span>250 г</span>
        </div>
      </div>
    </article>
  );
}
