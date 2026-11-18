"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus, Minus, FileDown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useQuote } from "@/context/QuoteContext";
import { categories, maxQuantity, money, type Product } from "@/lib/catalog";

export default function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useApp();
  const { quantities, changeQuantity, openQuote } = useQuote();
  const ar = lang === "ar";
  const quantity = quantities[product.id] ?? 0;

  return (
    <article className={"ics-panel ics-product" + (quantity > 0 ? " is-selected" : "")}>
      <Link href={"/products/" + product.id} className="ics-product-photo" aria-label={product[lang]}>
        <Image
          src={"/assets/" + product.image}
          alt={product[lang]}
          fill
          sizes="(max-width: 550px) 90vw, (max-width: 1100px) 45vw, 28vw"
        />
      </Link>
      <div className="ics-product-body">
        <div className="ics-product-code">
          <span className="ics-product-cat-label">
            {categories[product.category][lang]} · <bdi>{product.id.toUpperCase()}</bdi>
          </span>
          {quantity > 0 && (
            <span className="ics-selected-inline">
              <Check size={13} />
              <span>{ar ? "في العرض" : "Added"}</span>
            </span>
          )}
        </div>

        <h2>
          <Link href={"/products/" + product.id}>{product[lang]}</Link>
        </h2>

        <p className="ics-product-specs">
          {t("prod." + product.id + ".specs")}
        </p>

        <div className="ics-product-price">
          <strong className="ics-price"><bdi>{money(product.price, lang)}</bdi></strong>
          <span>{ar ? "سعر استرشادي" : "Sample price"}</span>
        </div>

        {quantity === 0 ? (
          <button
            type="button"
            className="ics-card-add-btn"
            onClick={() => changeQuantity(product.id, 1)}
            aria-label={(ar ? "أضف إلى عرض السعر " : "Add to quote ") + product[lang]}
          >
            <Plus size={16} aria-hidden="true" />
            <span>{ar ? "أضف إلى عرض السعر" : "Add to quote"}</span>
          </button>
        ) : (
          <div className="ics-card-selected-actions">
            <div className="ics-card-stepper" role="group" aria-label={ar ? "الكمية في عرض السعر" : "Quantity in quote"}>
              <button
                type="button"
                className="ics-card-stepper-btn"
                onClick={() => changeQuantity(product.id, -1)}
                aria-label={(ar ? "إنقاص كمية " : "Decrease quantity ") + product[lang]}
              >
                <Minus size={14} />
              </button>
              <span className="ics-card-stepper-qty" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                className="ics-card-stepper-btn"
                onClick={() => changeQuantity(product.id, 1)}
                disabled={quantity === maxQuantity}
                aria-label={(ar ? "زيادة كمية " : "Increase quantity ") + product[lang]}
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              type="button"
              className="ics-card-quote-btn"
              onClick={openQuote}
              title={ar ? "فتح عرض السعر وتنزيل PDF" : "Open quote and download PDF"}
            >
              <FileDown size={15} />
              <span>{ar ? "PDF" : "Quote"}</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
