"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FileDown, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogSearch from "@/components/CatalogSearch";
import ProductCard from "@/components/ProductCard";
import QuoteSummary from "@/components/QuoteSummary";
import { useQuote } from "@/context/QuoteContext";
import { useApp } from "@/context/AppContext";
import { categories, money, products, quoteLines, quoteTotal, samplePricing } from "@/lib/catalog";

function Catalog() {
  const router = useRouter();
  const params = useSearchParams();
  const { lang, t } = useApp();
  const ar = lang === "ar";
  const { quantities } = useQuote();
  const search = params.get("search") ?? "";
  const category = params.get("category") ?? "";
  const application = params.get("application") ?? "";
  const lines = quoteLines(quantities);

  function setFilter(key: string, value: string) {
    const updated = new URLSearchParams(params.toString());
    if (value) updated.set(key, value);
    else updated.delete(key);
    router.replace("/products?" + updated.toString(), { scroll: false });
  }

  const normalized = search.trim().toLowerCase().normalize("NFKC").replace(/[\u064b-\u065f]/g, "");
  const visible = products.filter((product) => {
    const group = categories[product.category];
    const searchable = [product.en, product.ar, product.id, group.en, group.ar, t("prod." + product.id + ".specs")]
      .join(" ").toLowerCase().normalize("NFKC").replace(/[\u064b-\u065f]/g, "");
    return (!category || group.id === category) &&
      (!application || product.applications.some((value) => value === application)) &&
      normalized.split(/\s+/).every((word) => searchable.includes(word));
  });

  return (
    <main>
      <section className="ics-catalog-intro">
        <div className="ics-shell">
          <div className="ics-catalog-heading">
            <div>
              <p className="ics-eyebrow">{ar ? "معدات الحريق والسلامة القياسية" : "Certified Fire & Safety Equipment"}</p>
              <h1>{ar ? "كتالوج المنتجات" : "Equipment catalog"}</h1>
            </div>
            <p className="ics-catalog-subtitle">
              {ar
                ? "اختر المعدات والكميات المطلوبة لمشروعك، ونزّل عرض السعر بصيغة PDF بالعربي مباشرة."
                : "Select equipment and adjust quantities to download an official Arabic PDF quotation directly."}
            </p>
          </div>
        </div>
      </section>
      <div className="ics-shell ics-catalog-layout">
        <section aria-label={ar ? "نتائج البحث" : "Equipment results"}>
          <SearchFilter key={search} search={search} onSearch={(value) => setFilter("search", value)} />
          <div className="ics-filter" aria-label={ar ? "الفئات" : "Categories"}>
            {[{ id: "", en: "All equipment", ar: "كل المنتجات" }, ...categories].map((group) => (
              <button type="button" key={group.id} aria-pressed={category === group.id} onClick={() => setFilter("category", group.id)}>{group[lang]}</button>
            ))}
            {application && <button type="button" onClick={() => setFilter("application", "")}>{ar ? "إزالة فلتر الاستخدام" : "Clear application filter"} <X size={15} /></button>}
          </div>
          <div className="ics-results">
            <p role="status">{ar ? "المنتجات" : "Products"} · {visible.length}</p>
            {samplePricing && <p>{ar ? "أسعار استرشادية بالجنيه المصري" : "Provisional prices in EGP"}</p>}
          </div>
          {visible.length === 0 && (
            <div className="ics-panel ics-empty">
              <p>{ar ? "لا توجد نتائج مطابقة. جرّب اسماً أو كوداً مختلفاً." : "No matching equipment. Try a different name or code."}</p>
              <button className="ics-text-link" type="button" onClick={() => router.replace("/products", { scroll: false })}>
                {ar ? "عرض كل المنتجات" : "Show all equipment"}
              </button>
            </div>
          )}
          <div className="ics-products">{visible.map((product) => <ProductCard product={product} key={product.id} />)}</div>
        </section>
        <aside className="ics-panel ics-quote" id="quote"><QuoteSummary /></aside>
        {lines.length > 0 && (
          <a href="#quote" className="ics-button ics-quote-jump">
            <FileDown size={18} />
            {ar ? "عرض السعر PDF" : "Download PDF"} · <bdi>{money(quoteTotal(lines), lang)}</bdi>
          </a>
        )}
      </div>
    </main>
  );
}

function SearchFilter({ search, onSearch }: { search: string; onSearch: (search: string) => void }) {
  const { lang } = useApp();
  const [draft, setDraft] = useState(search);
  return <CatalogSearch lang={lang} value={draft} onChange={(value) => {
    setDraft(value);
    if (!value && search) onSearch("");
  }} onSubmit={(event) => { event.preventDefault(); onSearch(draft.trim()); }} />;
}

export default function ProductsPage() {
  return <div className="ics-site"><Navbar activePage="products" /><Suspense fallback={<main className="ics-shell ics-empty" aria-busy="true" />}><Catalog /></Suspense><Footer /></div>;
}
