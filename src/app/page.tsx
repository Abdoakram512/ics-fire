"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  FileDown,
  ShieldCheck,
  Clock,
  Award,
  Truck,
  PhoneCall,
  FileSpreadsheet,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CatalogSearch from "@/components/CatalogSearch";
import { useApp } from "@/context/AppContext";
import { useQuote } from "@/context/QuoteContext";
import { brand, categories, products, money, quoteLines, quoteTotal, samplePricing } from "@/lib/catalog";
import { downloadQuotePdf } from "@/lib/download-quote";

export default function HomePage() {
  const { lang } = useApp();
  const ar = lang === "ar";
  const router = useRouter();
  const { quantities, openQuote } = useQuote();
  const [query, setQuery] = useState("");
  const [pdfPending, setPdfPending] = useState(false);
  const [pdfDone, setPdfDone] = useState(false);

  const heroProduct = products[0];
  const activeLines = quoteLines(quantities);
  const hasSelection = activeLines.length > 0;
  const previewLines = hasSelection
    ? activeLines.slice(0, 4)
    : [
        { product: products[0], quantity: 1 },
        { product: products[2], quantity: 1 },
      ];
  const previewTotal = quoteTotal(hasSelection ? activeLines : previewLines);

  async function handleDirectPdf() {
    if (!hasSelection || pdfPending) return;
    setPdfPending(true);
    setPdfDone(false);
    try {
      await downloadQuotePdf(quantities);
      setPdfDone(true);
      window.setTimeout(() => setPdfDone(false), 4500);
    } finally {
      setPdfPending(false);
    }
  }

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: ar ? "معتمد من الدفاع المدني" : "Civil Defence Approved",
      desc: ar ? "مطابق لاشتراطات لجان التفتيش وكود NFPA و EN3" : "Certified to EN3, EN54 & NFPA codes",
    },
    {
      icon: Clock,
      title: ar ? "تنزيل عرض سعر فوري" : "Instant PDF Quotation",
      desc: ar ? "حدد كمياتك ونزّل ملف PDF رسمي في ثوانٍ" : "Select quantities and download official PDF in seconds",
    },
    {
      icon: Award,
      title: ar ? "ضمان مصنعي 5 سنوات" : "5-Year Warranty",
      desc: ar ? "ضمان مصنعي شامل مع توفير قطع الغيار والدعم" : "Comprehensive factory warranty & spare parts",
    },
    {
      icon: Truck,
      title: ar ? "توريد فوري للمواقع" : "Direct Site Dispatch",
      desc: ar ? "مخزون استراتيجي يلبي متطلبات التوريد العاجل" : "Strategic stock ready for urgent dispatch",
    },
  ];

  return (
    <div className="ics-site">
      <Navbar activePage="home" />

      <main>
        {/* 1. HERO SECTION */}
        <section className="ics-hero">
          <div className="ics-shell ics-hero-grid">
            <div className="ics-hero-copy">
              <div className="ics-hero-badge">
                <Sparkles size={14} className="ics-badge-icon" aria-hidden="true" />
                <span>{ar ? "أنظمة مكافحة الحريق والسلامة الصناعية" : "Industrial Fire Protection & Safety Systems"}</span>
              </div>

              <h1>
                {ar ? "معدات الحريق المعتمدة" : "Fire protection"}
                <br />
                <em>{ar ? "لمشروعك الإنشائي." : "for your project."}</em>
              </h1>

              <p>
                {ar
                  ? "استعرض المواصفات الفنية والأسعار الاسترشادية، واختر معداتك لتجهيز وتنزيل عرض سعر PDF رسمي مباشرة."
                  : "Explore certified hardware, review technical specs and sample pricing, and download an itemized PDF quotation directly."}
              </p>

              <CatalogSearch
                lang={lang}
                value={query}
                onChange={setQuery}
                onSubmit={(event) => {
                  event.preventDefault();
                  router.push(query.trim() ? "/products?search=" + encodeURIComponent(query.trim()) : "/products");
                }}
              />

              <div className="ics-hero-links">
                <Link className="ics-button" href="/products">
                  <span>{ar ? "تصفح الكتالوج واختيار المعدات" : "Browse equipment catalog"}</span>
                  <ArrowUpRight size={17} className="rtl-flip" />
                </Link>
                <Link className="ics-muted-link" href="/contact">
                  <FileSpreadsheet size={16} />
                  <span>{ar ? "طلب تسعير مشروع (BOQ)" : "Submit project BOQ"}</span>
                </Link>
              </div>
            </div>

            <div className="ics-hero-visual">
              <Link href="/products/ics-p06" className="ics-hero-image" aria-label={heroProduct[lang]}>
                <Image
                  src="/assets/hero-extinguisher.png"
                  alt={heroProduct[lang]}
                  fill
                  sizes="(max-width: 700px) 95vw, 45vw"
                  preload
                />
              </Link>

              <div className="ics-hero-caption">
                <bdi>ICS-P06</bdi>
                <span>{ar ? "طفاية بودرة ABC معتمدة · سعة ٦ كجم" : "EN3 Certified ABC powder extinguisher · 6 kg"}</span>
                <span className="ics-price"><bdi>{money(heroProduct.price, lang)}</bdi></span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ARCHITECTURAL STANDARDS BAR */}
        <section className="ics-trust-bar" aria-label={ar ? "معايير الجودة والاعتمادات" : "Quality & Compliance Standards"}>
          <div className="ics-shell">
            <div className="ics-trust-grid">
              {trustPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="ics-trust-item">
                    <div className="ics-trust-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <div className="ics-trust-text">
                      <h3>{pillar.title}</h3>
                      <p>{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. UNIFIED CATALOG SHOWCASE: DISCIPLINES + INTERACTIVE EQUIPMENT */}
        <section className="ics-catalog-showcase" aria-labelledby="catalog-showcase-title">
          <div className="ics-shell">
            <div className="ics-section-heading">
              <div>
                <p className="ics-eyebrow">{ar ? "الكتالوج والأنظمة القياسية" : "Equipment Disciplines & Hardware"}</p>
                <h2 id="catalog-showcase-title">
                  {ar ? "اختر المعدات وأضفها لعرض السعر" : "Select equipment for your quotation"}
                </h2>
              </div>
              <Link className="ics-text-link" href="/products">
                <span>{ar ? "عرض كامل الكتالوج (6)" : "View full catalog (6)"}</span>
                <ArrowUpRight size={17} className="rtl-flip" />
              </Link>
            </div>

            {samplePricing && (
              <p className="ics-price-notice">
                {ar
                  ? "الأسعار المعروضة استرشادية لتسهيل الحساب المبدئي لحين اعتماد إدارة المبيعات."
                  : "Displayed prices are provisional to assist with estimation pending final sales approval."}
              </p>
            )}

            <div className="ics-featured-grid">
              {[products[0], products[2], products[3]].map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. DIRECT INSTANT PDF QUOTATION */}
        <section className="ics-quote-band" id="instant-quote" aria-labelledby="quote-band-title">
          <div className="ics-shell ics-explainer-grid">
            <div>
              <p className="ics-eyebrow">{ar ? "عرض السعر الفوري PDF" : "Instant PDF Quotation"}</p>
              <h2 id="quote-band-title">
                {ar ? "عرض سعر رسمي،" : "Your official quote."}
                <br />
                {ar ? "جاهز للتنزيل بضغطة واحدة." : "Ready in one click."}
              </h2>
              <p className="ics-quote-band-lead">
                {hasSelection
                  ? (ar
                      ? `لديك ${activeLines.length} بند بإجمالي تقديري ${money(previewTotal, "ar")}. نزّل ملف PDF الرسمي الآن أو عدّل الكميات.`
                      : `You have ${activeLines.length} selected item(s) totaling ${money(previewTotal, "en")}. Download your PDF now or adjust quantities.`)
                  : (ar
                      ? "أضف المعدات التي يحتاجها مشروعك بالكميات المطلوبة، ونزّل ملف PDF عربي منسّقاً باسم وشعار ICS فوراً بدون خطوات معقدة."
                      : "Pick your equipment and quantities, then download an official Arabic PDF document bearing the ICS logo and reference number.")}
              </p>

              <ul className="ics-quote-checklist">
                <li>
                  <Check size={16} aria-hidden="true" />
                  <span>{ar ? "شعار ICS الرسمي، رقم مرجعي، وتاريخ الإصدار" : "Official ICS branding, unique reference code & date"}</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />
                  <span>{ar ? "جدول الكميات وأسعار الوحدات والإجمالي بالحساب الصحيح" : "Verified quantities, unit pricing & calculated totals"}</span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />
                  <span>{ar ? "تنبيه واضح بحالة الأسعار الاسترشادية لحين الاعتماد" : "Clear provisional pricing notice pending final review"}</span>
                </li>
              </ul>

              <div className="ics-quote-band-actions">
                {hasSelection ? (
                  <>
                    <button
                      type="button"
                      className="ics-button"
                      onClick={handleDirectPdf}
                      disabled={pdfPending}
                    >
                      <FileDown size={18} />
                      <span>
                        {pdfPending
                          ? (ar ? "جاري إنشاء الملف…" : "Generating PDF…")
                          : (ar ? "تنزيل عرض السعر PDF الآن" : "Download PDF quote now")}
                      </span>
                    </button>
                    <button type="button" className="ics-band-ghost-btn" onClick={openQuote}>
                      <span>{ar ? "مراجعة وتعديل البنود" : "Edit items & quantities"}</span>
                    </button>
                  </>
                ) : (
                  <Link href="/products" className="ics-button">
                    <span>{ar ? "اختر المعدات لتجهيز العرض" : "Select equipment for quote"}</span>
                    <ArrowUpRight size={17} className="rtl-flip" />
                  </Link>
                )}
              </div>

              {pdfDone && (
                <p className="ics-band-feedback" role="status">
                  <Check size={15} />
                  <span>{ar ? "تم تنزيل ملف عرض السعر بنجاح." : "PDF quotation downloaded."}</span>
                </p>
              )}
            </div>

            {/* Crisp Live Paper Quotation Sheet */}
            <div className="ics-document-preview" dir="rtl">
              <div className="ics-document-header-band">
                <div className="ics-document-brand">
                  <strong dir="ltr">ICS</strong>
                  <span>أنظمة مكافحة الحريق والسلامة</span>
                </div>
                <span className="ics-doc-ref-pill">
                  {hasSelection ? "#LIVE-QT" : "#ICS-2026-QT"}
                </span>
              </div>

              <div className="ics-document-body">
                <h3>عرض أسعار رسمي</h3>
                <p className="ics-document-caption">
                  {hasSelection
                    ? "معاينة فورية لاختياراتك الحالية"
                    : "نموذج استرشادي مطابق للملف الصادر بصيغة PDF"}
                </p>

                <div className="ics-document-table">
                  <div className="ics-document-row ics-document-head">
                    <span>المنتج والمواصفة القياسية</span>
                    <span>الكمية</span>
                    <span>الإجمالي</span>
                  </div>
                  {previewLines.map(({ product, quantity }) => (
                    <div className="ics-document-row" key={product.id}>
                      <div>
                        <span style={{ display: "block", fontWeight: 700 }}>{product.ar}</span>
                        <small style={{ color: "var(--muted)", fontSize: "0.68rem" }}>{product.id.toUpperCase()}</small>
                      </div>
                      <span>{quantity}</span>
                      <bdi>{money(product.price * quantity, "ar")}</bdi>
                    </div>
                  ))}
                </div>

                <div className="ics-document-total">
                  <span>إجمالي المعدات التقديري</span>
                  <bdi>{money(previewTotal, "ar")}</bdi>
                </div>

                <div className="ics-document-footer-meta">
                  <span className="ics-document-stamp">وثيقة PDF بالعربي</span>
                  <p className="ics-document-caption">
                    {samplePricing ? "* الأسعار استرشادية لحين الاعتماد النهائي" : "الأسعار بالجنيه المصري"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ENGINEERING DESK & PROJECT BOQ */}
        <section className="ics-boq-banner" aria-labelledby="boq-banner-title">
          <div className="ics-shell ics-boq-grid">
            <div className="ics-boq-copy">
              <p className="ics-eyebrow">
                {ar ? "المكتب الفني ودراسة المشروعات" : "Engineering Estimation Desk"}
              </p>
              <h2 id="boq-banner-title">
                {ar ? "لديك جدول كميات (BOQ) أو مخططات هندسية؟" : "Have an MEP Bill of Quantities or Drawings?"}
              </h2>
              <p>
                {ar
                  ? "أرسل الملفات لفريقنا الهندسي لمراجعة مطابقة مواصفات الاستشاري والدفاع المدني وتقديم عرض مالي وفني معتمد خلال 24 ساعة."
                  : "Submit your project schedules or MEP drawings to our engineering team for code compliance verification and a commercial proposal within 24 hours."}
              </p>
            </div>

            <div className="ics-boq-actions">
              <Link href="/contact" className="ics-button">
                <FileSpreadsheet size={17} />
                <span>{ar ? "إرسال جدول الكميات (BOQ)" : "Submit project BOQ"}</span>
                <ArrowUpRight size={17} className="rtl-flip" />
              </Link>
              <a
                href={"tel:" + brand.phone.replace(/[^0-9+]/g, "")}
                className="ics-button-secondary"
              >
                <PhoneCall size={16} />
                <span dir="ltr">{brand.phone}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
