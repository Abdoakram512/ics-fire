"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileDown,
  FileSpreadsheet,
  PhoneCall,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCarousel from "@/components/ProductCarousel";
import CatalogSearch from "@/components/CatalogSearch";
import { useApp } from "@/context/AppContext";
import { useQuote } from "@/context/QuoteContext";
import { brand, categories, money, products, quoteLines, quoteTotal, samplePricing } from "@/lib/catalog";
import { downloadQuotePdf } from "@/lib/download-quote";

const HERO_FEATURED_IDS = ["ics-p06", "ics-c05", "ics-h30"] as const;
const BEST_SELLER_IDS = ["ics-p06", "ics-h30", "ics-d01", "ics-b01"] as const;

export default function HomePage() {
  const { lang, t } = useApp();
  const ar = lang === "ar";
  const router = useRouter();
  const { quantities, changeQuantity, openQuote } = useQuote();
  const [query, setQuery] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [pdfPending, setPdfPending] = useState(false);
  const [pdfDone, setPdfDone] = useState(false);

  const heroItems = HERO_FEATURED_IDS.map((id) => products.find((p) => p.id === id)!);
  const heroProduct = heroItems[heroIndex] ?? products[0];
  const heroQty = quantities[heroProduct.id] ?? 0;

  useEffect(() => {
    if (heroPaused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroItems.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [heroPaused, heroItems.length]);

  const catalogItems =
    activeCategory === "all"
      ? products
      : products.filter((p) => categories[p.category].id === activeCategory);

  const bestSellerItems = BEST_SELLER_IDS.map((id) => products.find((p) => p.id === id)!);

  const activeLines = quoteLines(quantities);
  const hasSelection = activeLines.length > 0;
  const previewLines = hasSelection
    ? activeLines.slice(0, 4)
    : [
        { product: products[0], quantity: 1 },
        { product: products[3], quantity: 1 },
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
        {/* 1. INDUSTRIAL PRECISION HERO SECTION */}
        <section className="ics-hero">
          <div className="ics-shell ics-hero-grid">
            <div className="ics-hero-copy">
              <p className="ics-hero-eyebrow">
                <span className="ics-hero-eyebrow-bar" aria-hidden="true" />
                <span>{ar ? "أنظمة مكافحة الحريق المعتمدة · EN3 / EN54 / NFPA" : "Certified Fire Protection · EN3 / EN54 / NFPA"}</span>
              </p>

              <h1>
                {ar ? "معدات الحريق المعتمدة" : "Certified fire safety"}
                <br />
                <em>{ar ? "لمشروعك الإنشائي." : "built for your project."}</em>
              </h1>

              <p className="ics-hero-lead">
                {ar
                  ? "استعرض المواصفات الفنية والأسعار الاسترشادية، وجهّز عرض سعر PDF رسمياً لمعدات الإطفاء والإنذار المعتمدة خلال ثوانٍ."
                  : "Explore certified suppression and alarm hardware, review technical specifications and provisional pricing, and download an itemized PDF quotation directly."}
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
                <Link className="ics-hero-secondary-btn" href="/contact">
                  <FileSpreadsheet size={16} />
                  <span>{ar ? "طلب تسعير مشروع (BOQ)" : "Submit project BOQ"}</span>
                </Link>
              </div>

              <div className="ics-hero-meta-bar" aria-label={ar ? "اعتمادات التوريد" : "Supply highlights"}>
                <span>{ar ? "اعتماد الدفاع المدني" : "Civil Defence compliant"}</span>
                <i aria-hidden="true" />
                <span>{ar ? "تسعير BOQ خلال ٢٤ ساعة" : "24h BOQ estimation"}</span>
                <i aria-hidden="true" />
                <span>{ar ? "إصدار PDF عربي فوري" : "Instant Arabic PDF"}</span>
              </div>
            </div>

            <div
              className="ics-hero-stage"
              tabIndex={0}
              onMouseEnter={() => setHeroPaused(true)}
              onMouseLeave={() => setHeroPaused(false)}
              onFocus={() => setHeroPaused(true)}
              onBlur={() => setHeroPaused(false)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  setHeroIndex((prev) => (ar ? (prev + 1) % heroItems.length : (prev - 1 + heroItems.length) % heroItems.length));
                } else if (event.key === "ArrowRight") {
                  event.preventDefault();
                  setHeroIndex((prev) => (ar ? (prev - 1 + heroItems.length) % heroItems.length : (prev + 1) % heroItems.length));
                }
              }}
            >
              <div className="ics-hero-plinth">
                <div className="ics-hero-reticle" aria-hidden="true" />
                <div className="ics-hero-spotlight" aria-hidden="true" />

                <button
                  type="button"
                  className="ics-hero-arrow is-prev"
                  onClick={() => setHeroIndex((prev) => (prev - 1 + heroItems.length) % heroItems.length)}
                  aria-label={ar ? "المعدة السابقة" : "Previous unit"}
                >
                  {ar ? <ChevronRight size={19} /> : <ChevronLeft size={19} />}
                </button>

                <Link
                  href={"/products/" + heroProduct.id}
                  className="ics-hero-equipment"
                  aria-label={heroProduct[lang]}
                >
                  <Image
                    key={heroProduct.id}
                    src={"/assets/" + (heroProduct.id === "ics-p06" ? "studio-hd/hero-extinguisher.png" : heroProduct.image)}
                    alt={heroProduct[lang]}
                    fill
                    sizes="(max-width: 767px) 88vw, 44vw"
                    priority
                  />
                </Link>

                <button
                  type="button"
                  className="ics-hero-arrow is-next"
                  onClick={() => setHeroIndex((prev) => (prev + 1) % heroItems.length)}
                  aria-label={ar ? "المعدة التالية" : "Next unit"}
                >
                  {ar ? <ChevronLeft size={19} /> : <ChevronRight size={19} />}
                </button>

                <div className="ics-hero-floor-shadow" aria-hidden="true" />
              </div>

              {/* Technical Spec Readout & Equipment Selector */}
              <div className="ics-hero-readout">
                <div className="ics-hero-readout-info">
                  <div className="ics-hero-readout-top">
                    <span className="ics-hero-sku"><bdi>{heroProduct.id.toUpperCase()}</bdi></span>
                    <span className="ics-hero-spec-inline">{t("prod." + heroProduct.id + ".specs")}</span>
                  </div>
                  <div className="ics-hero-readout-bottom">
                    <Link href={"/products/" + heroProduct.id} className="ics-hero-unit-name">
                      {heroProduct[lang]}
                    </Link>
                    <strong className="ics-hero-unit-price">
                      <bdi>{money(heroProduct.price, lang)}</bdi>
                    </strong>
                  </div>
                </div>

                <div className="ics-hero-readout-actions">
                  <div className="ics-hero-switcher" role="tablist" aria-label={ar ? "معدات مميزة" : "Featured equipment"}>
                    {heroItems.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={idx === heroIndex}
                        className={"ics-hero-switch-tab" + (idx === heroIndex ? " is-active" : "")}
                        onClick={() => setHeroIndex(idx)}
                      >
                        <bdi>{item.id.toUpperCase()}</bdi>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="ics-hero-quick-add"
                    onClick={() => {
                      if (heroQty === 0) changeQuantity(heroProduct.id, 1);
                      else openQuote();
                    }}
                  >
                    {heroQty === 0 ? (
                      <>
                        <Plus size={14} />
                        <span>{ar ? "أضف للعرض" : "Add"}</span>
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        <span>{ar ? `في العرض (${heroQty})` : `In quote (${heroQty})`}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CRIMSON STANDARDS & APPROVALS BAR */}
        <section className="ics-trust-bar" aria-label={ar ? "معايير الجودة والاعتمادات" : "Quality & Compliance Standards"}>
          <div className="ics-shell">
            <div className="ics-trust-grid">
              {trustPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="ics-trust-item">
                    <div className="ics-trust-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.85} />
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

        {/* 3. INTERACTIVE EQUIPMENT CATALOG CAROUSEL */}
        <section className="ics-catalog-showcase" aria-labelledby="catalog-showcase-title">
          <div className="ics-shell">
            <div className="ics-section-heading">
              <div>
                <p className="ics-eyebrow">{ar ? "الكتالوج والأنظمة القياسية" : "Equipment Disciplines & Hardware"}</p>
                <h2 id="catalog-showcase-title">
                  {ar ? "تصفح المعدات وأضفها لعرض السعر" : "Explore equipment for your quotation"}
                </h2>
              </div>
              <Link className="ics-text-link" href="/products">
                <span>{ar ? "عرض كامل الكتالوج (6)" : "View full catalog (6)"}</span>
                <ArrowUpRight size={17} className="rtl-flip" />
              </Link>
            </div>

            <div className="ics-showcase-toolbar">
              <div className="ics-filter" role="group" aria-label={ar ? "تصفية حسب الفئة" : "Filter by category"}>
                <button
                  type="button"
                  aria-pressed={activeCategory === "all"}
                  onClick={() => setActiveCategory("all")}
                >
                  {ar ? `كل المعدات (${products.length})` : `All equipment (${products.length})`}
                </button>
                {categories.map((cat, idx) => (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat[lang]} ({products.filter((p) => p.category === idx).length})
                  </button>
                ))}
              </div>

              {samplePricing && (
                <p className="ics-price-notice">
                  {ar
                    ? "الأسعار المعروضة استرشادية بالجنيه المصري لحين اعتماد إدارة المبيعات."
                    : "Displayed prices are provisional in EGP pending final sales approval."}
                </p>
              )}
            </div>

            <ProductCarousel
              key={activeCategory}
              products={catalogItems}
              variant="catalog"
              ariaLabel={ar ? "كتالوج معدات الحريق التفاعلي" : "Interactive fire equipment catalog carousel"}
            />
          </div>
        </section>

        {/* 4. BEST-SELLING / TOP REQUESTED SAFETY HARDWARE */}
        <section className="ics-bestsellers-band" aria-labelledby="bestsellers-title">
          <div className="ics-shell">
            <div className="ics-bestsellers-header">
              <div className="ics-bestsellers-title-group">
                <h2 id="bestsellers-title">{ar ? "الأكثر طلباً ومبيعاً" : "Most Requested Equipment"}</h2>
                <div className="ics-heading-rule" aria-hidden="true" />
                <p>
                  {ar
                    ? "التجهيزات الأساسية الأكثر طلباً لاعتماد لجان الدفاع المدني وتجهيز المشروعات التجارية والصناعية."
                    : "Core certified safety units most commonly requested for Civil Defence inspections and MEP submittals."}
                </p>
              </div>

              <Link className="ics-pill-action" href="/products">
                <span>{ar ? "عرض كل المنتجات" : "View all products"}</span>
                <span className="ics-pill-arrow" aria-hidden="true">
                  {ar ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </span>
              </Link>
            </div>

            <ProductCarousel
              products={bestSellerItems}
              variant="spotlight"
              showUsageBadge
              ariaLabel={ar ? "الأكثر طلباً ومبيعاً" : "Most requested equipment carousel"}
            />
          </div>
        </section>

        {/* 5. DIRECT INSTANT PDF QUOTATION */}
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
                      ? `لديك ${activeLines.length} ${activeLines.length === 1 ? "بند" : "بنود"} بإجمالي ${money(quoteTotal(activeLines), "ar")}. نزّل ملف الـ PDF الرسمي فوراً أو افتح النافذة لتعديل الكميات.`
                      : `You have ${activeLines.length} selected line item(s) totaling ${money(quoteTotal(activeLines), "en")}. Download your official Arabic PDF now or open the editor.`)
                  : (ar
                      ? "بمجرد إضافة المعدات وتحديد الكميات من الكتالوج، يصبح ملف عرض السعر العربي الرسمي جاهزاً للتحميل الفوري بالكميات والإجمالي الصحيح بدون نماذج تسجيل معقدة."
                      : "Once you select equipment from the catalog, your official Arabic PDF quotation is generated instantly on your device with verified quantities and totals.")}
              </p>

              <ul className="ics-quote-checklist">
                <li>
                  <span className="ics-check-badge" aria-hidden="true"><Check size={14} /></span>
                  <span>{ar ? "شعار ICS الرسمي، رقم مرجعي، وتاريخ الإصدار" : "Official ICS branding, unique reference code & date"}</span>
                </li>
                <li>
                  <span className="ics-check-badge" aria-hidden="true"><Check size={14} /></span>
                  <span>{ar ? "جدول الكميات وأسعار الوحدات والإجمالي بالحساب الصحيح" : "Verified quantities, unit pricing & calculated totals"}</span>
                </li>
                <li>
                  <span className="ics-check-badge" aria-hidden="true"><Check size={14} /></span>
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

        {/* 6. ENGINEERING DESK & PROJECT BOQ */}
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
