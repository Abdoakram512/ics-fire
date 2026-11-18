"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FileDown, FileText, Minus, Plus, Trash2, ArrowUpRight, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useQuote } from "@/context/QuoteContext";
import { maxQuantity, money, quoteLines, quoteTotal, samplePricing } from "@/lib/catalog";
import { downloadQuotePdf } from "@/lib/download-quote";

export default function QuoteSummary({ onBrowse }: { onBrowse?: () => void }) {
  const { lang } = useApp();
  const { quantities, changeQuantity } = useQuote();
  const [pending, setPending] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const ar = lang === "ar";
  const lines = quoteLines(quantities);

  async function handleDownload() {
    setPending(true);
    setFailed(false);
    setDownloadSuccess(false);
    try {
      await downloadQuotePdf(quantities);
      setDownloadSuccess(true);
      window.setTimeout(() => setDownloadSuccess(false), 5000);
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="ics-quote-content">
      <div className="ics-quote-heading">
        <FileText size={20} aria-hidden="true" />
        <h2>{ar ? "عرض السعر" : "Your quote"}</h2>
        <span aria-label={(ar ? "عدد البنود: " : "Items: ") + lines.length}>
          {lines.length}
        </span>
      </div>

      {lines.length === 0 && (
        <div className="ics-quote-empty">
          <strong>{ar ? "لا توجد منتجات محددة" : "No equipment selected"}</strong>
          <p>
            {ar
              ? "أضف المعدات المطلوبة من الكتالوج ثم نزّل عرض السعر بصيغة PDF مباشرة."
              : "Add equipment from the catalog to generate and download your PDF quotation."}
          </p>
          <Link
            className="ics-button ics-button-start"
            href="/products"
            onClick={onBrowse}
          >
            <span>{ar ? "اختيار المنتجات" : "Browse equipment"}</span>
            <ArrowUpRight size={16} className="rtl-flip" />
          </Link>
        </div>
      )}

      {lines.length > 0 && (
        <>
          <ul className="ics-quote-items">
            {lines.map(({ product, quantity }) => (
              <li key={product.id}>
                <div className="ics-quote-item-row">
                  <div className="ics-quote-thumb">
                    <Image
                      src={"/assets/" + product.image}
                      alt=""
                      width={44}
                      height={44}
                    />
                  </div>

                  <div className="ics-quote-item-info">
                    <div className="ics-line">
                      <div>
                        <strong className="ics-quote-item-title">{product[lang]}</strong>
                        <span className="ics-quote-item-code">{product.id.toUpperCase()}</span>
                      </div>
                      <button
                        type="button"
                        className="ics-icon"
                        aria-label={(ar ? "احذف " : "Remove ") + product[lang]}
                        onClick={() => changeQuantity(product.id, -quantity)}
                        title={ar ? "حذف البند" : "Remove item"}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="ics-line ics-quote-item-math">
                      <div
                        className="ics-stepper"
                        role="group"
                        aria-label={(ar ? "كمية " : "Quantity for ") + product[lang]}
                      >
                        <button
                          type="button"
                          aria-label={(ar ? "إنقاص كمية " : "Decrease ") + product[lang]}
                          onClick={() => changeQuantity(product.id, -1)}
                        >
                          <Minus size={13} />
                        </button>
                        <output aria-live="polite">{quantity}</output>
                        <button
                          type="button"
                          aria-label={(ar ? "زيادة كمية " : "Increase ") + product[lang]}
                          onClick={() => changeQuantity(product.id, 1)}
                          disabled={quantity === maxQuantity}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="ics-quote-price-col">
                        <span className="ics-quote-unit-price">
                          <bdi>{money(product.price, lang)}</bdi> × {quantity}
                        </span>
                        <strong className="ics-quote-line-total">
                          <bdi>{money(product.price * quantity, lang)}</bdi>
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="ics-quote-summary-box">
            <div className="ics-line ics-total" aria-live="polite">
              <span>{ar ? "الإجمالي التقديري" : "Estimated total"}</span>
              <strong><bdi>{money(quoteTotal(lines), lang)}</bdi></strong>
            </div>

            {samplePricing && (
              <p className="ics-quote-pricing-notice">
                {ar
                  ? "* الأسعار استرشادية لحين الاعتماد النهائي من المبيعات."
                  : "* Provisional pricing pending final sales confirmation."}
              </p>
            )}
          </div>

          <button
            className="ics-button ics-download"
            type="button"
            disabled={!lines.length || pending}
            onClick={handleDownload}
          >
            <FileDown size={18} />
            <span>
              {pending
                ? (ar ? "جاري إنشاء الملف…" : "Preparing PDF…")
                : (ar ? "تنزيل عرض السعر PDF" : "Download PDF quote")}
            </span>
          </button>

          {downloadSuccess && (
            <p className="ics-quote-success-pill" role="status">
              <Check size={15} />
              <span>{ar ? "تم تنزيل عرض السعر." : "Quotation downloaded."}</span>
            </p>
          )}

          {failed && (
            <p className="ics-quote-error" role="alert">
              {ar ? "تعذّر تنزيل الملف، يُرجى المحاولة مرة أخرى." : "Download failed. Please try again."}
            </p>
          )}
        </>
      )}
    </div>
  );
}
