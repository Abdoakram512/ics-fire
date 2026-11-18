"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, Check, FileDown, Plus, Minus, ShieldCheck, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useQuote } from "@/context/QuoteContext";
import { useApp } from "@/context/AppContext";
import { categories, money, products, samplePricing, maxQuantity } from "@/lib/catalog";

const specifications = {
  "ics-p06": [
    { labelKey: "spec.code", defaultLabel: "Product code", valueEn: "ICS-P06", valueAr: "ICS-P06" },
    { labelKey: "spec.agent", defaultLabel: "Extinguishing agent", valueEn: "ABC dry powder", valueAr: "بودرة جافة ABC متعددة الأغراض" },
    { labelKey: "spec.charge", defaultLabel: "Nominal charge", valueEn: "6 kg", valueAr: "6 كجم" },
    { labelKey: "spec.pressure", defaultLabel: "Pressure system", valueEn: "Stored pressure", valueAr: "ضغط مخزون مستمر مع مؤشر بوردون" },
    { labelKey: "spec.finish", defaultLabel: "Body / finish", valueEn: "Steel / red electrostatic coating", valueAr: "صلب معالج / طلاء كهروستاتيكي أحمر مقاوم للعوامل الجوية" },
    { labelKey: "spec.discharge", defaultLabel: "Discharge assembly", valueEn: "Flexible EPDM hose and reinforced brass nozzle", valueAr: "خرطوم مطاطي مقوى EPDM وفوهة نحاسية دقيقة" },
    { labelKey: "spec.rating", defaultLabel: "Fire rating & approvals", valueEn: "EN3, CE Marked, Civil Defence Approved", valueAr: "معتمدة طبقاً للمعيار الأوروبي EN3 وعلامة CE واشتراطات الدفاع المدني" },
    { labelKey: "spec.dimensions", defaultLabel: "Dimensions & operating range", valueEn: "H: 520mm / D: 160mm / -30°C to +60°C", valueAr: "ارتفاع: 520 مم / قطر: 160 مم / مدى التشغيل: -30 إلى +60 مئوية" },
  ],
  "ics-c05": [
    { labelKey: "spec.code", defaultLabel: "Product code", valueEn: "ICS-C05", valueAr: "ICS-C05" },
    { labelKey: "spec.agent", defaultLabel: "Extinguishing agent", valueEn: "Carbon dioxide (CO₂)", valueAr: "ثاني أكسيد الكربون النقي (CO₂)" },
    { labelKey: "spec.charge", defaultLabel: "Nominal charge", valueEn: "5 kg", valueAr: "5 كجم" },
    { labelKey: "spec.pressure", defaultLabel: "Pressure system", valueEn: "High-pressure seamless cylinder", valueAr: "أسطوانة ضغط عالي بدون لحام (Seamless Alloy Steel)" },
    { labelKey: "spec.finish", defaultLabel: "Body / finish", valueEn: "Seamless alloy steel / red finish", valueAr: "سبيكة فولاذية غير ملحومة / طلاء أحمر واقٍ" },
    { labelKey: "spec.discharge", defaultLabel: "Discharge assembly", valueEn: "Frost-free horn with diffuser", valueAr: "بوق تفريغ عازل ضد التجمد ومشتت تيار" },
    { labelKey: "spec.rating", defaultLabel: "Fire rating & approvals", valueEn: "EN3, CE Certified, Civil Defence Approved", valueAr: "معتمدة طبقاً لمعيار EN3 وعلامة CE والدفاع المدني" },
    { labelKey: "spec.dimensions", defaultLabel: "Dimensions & operating range", valueEn: "H: 670mm / D: 152mm / -20°C to +60°C", valueAr: "ارتفاع: 670 مم / قطر: 152 مم / مدى التشغيل: -20 إلى +60 مئوية" },
  ],
  "ics-d01": [
    { labelKey: "spec.code", defaultLabel: "Product code", valueEn: "ICS-D01", valueAr: "ICS-D01" },
    { labelKey: "spec.principle", defaultLabel: "Detection principle", valueEn: "Photoelectric light scattering", valueAr: "تشتت الضوء الكهروضوئي ثنائي الحجرة" },
    { labelKey: "spec.voltage", defaultLabel: "Operating voltage", valueEn: "9 – 33 VDC", valueAr: "9 – 33 فولت تيار مستمر" },
    { labelKey: "spec.sensorProfile", defaultLabel: "Sensor profile", valueEn: "Low profile architecturally discrete", valueAr: "تصميم مدمج معماري رفيع مقاوم للغبار" },
    { labelKey: "spec.finish", defaultLabel: "Body / finish", valueEn: "Flame retardant ABS / signal white", valueAr: "بلاستيك ABS مقاوم للحريق / أبيض معماري" },
    { labelKey: "spec.indicator", defaultLabel: "Indicator", valueEn: "360° omnidirectional alarm LED", valueAr: "مؤشر LED محيطي 360 درجة للرؤية الشاملة" },
    { labelKey: "spec.standards", defaultLabel: "Standards & approvals", valueEn: "EN54-7, LPCB Approved", valueAr: "معتمد طبقاً لـ EN54-7 ومعتمد رسمياً من LPCB" },
    { labelKey: "spec.dimensions", defaultLabel: "Dimensions & operating range", valueEn: "Diameter 100mm, height 42mm", valueAr: "قطر 100 مم، ارتفاع 42 مم" },
  ],
  "ics-h30": [
    { labelKey: "spec.code", defaultLabel: "Product code", valueEn: "ICS-H30", valueAr: "ICS-H30" },
    { labelKey: "spec.hoseLength", defaultLabel: "Hose length & diameter", valueEn: "30 meters / 19mm (3/4\")", valueAr: "30 متراً / قطر 19 مم (3/4 بوصة) تدفق مستمر" },
    { labelKey: "spec.workingPressure", defaultLabel: "Working pressure", valueEn: "12 bar (1.2 MPa)", valueAr: "12 بار ضغط تشغيل (اختبار هيدروستاتيكي 18 بار)" },
    { labelKey: "spec.swingMechanism", defaultLabel: "Swing mechanism", valueEn: "180° double swing arm", valueAr: "ذراع تأرجح مزدوج 180 درجة لسهولة السحب" },
    { labelKey: "spec.finish", defaultLabel: "Finish / coating", valueEn: "Electrostatic UV-resistant red powder", valueAr: "طلاء أحمر مقاوم للأشعة فوق البنفسجية والصدأ" },
    { labelKey: "spec.nozzle", defaultLabel: "Nozzle assembly", valueEn: "Rotary jet/spray brass nozzle", valueAr: "فوهة نحاسية دوارة للرذاذ والتدفق المباشر" },
    { labelKey: "spec.standards", defaultLabel: "Standards & approvals", valueEn: "EN671-1, CE Marked", valueAr: "معتمد طبقاً لـ EN671-1 وعلامة CE والدفاع المدني" },
    { labelKey: "spec.dimensions", defaultLabel: "Dimensions & operating range", valueEn: "Diameter 550mm, depth 260mm", valueAr: "قطر 550 مم، عمق 260 مم" },
  ],
  "ics-a02": [
    { labelKey: "spec.code", defaultLabel: "Product code", valueEn: "ICS-A02", valueAr: "ICS-A02" },
    { labelKey: "spec.soundOutput", defaultLabel: "Sound output", valueEn: "100 dB(A) at 1 meter", valueAr: "100 ديسيبل على مسافة 1 متر مع نغمات متعددة" },
    { labelKey: "spec.lightOutput", defaultLabel: "Light output", valueEn: "High-intensity Xenon / LED strobe", valueAr: "وميض زينون / LED فائق السطوع 1 هرتز" },
    { labelKey: "spec.voltage", defaultLabel: "Operating voltage", valueEn: "18 – 30 VDC", valueAr: "18 – 30 فولت تيار مستمر" },
    { labelKey: "spec.enclosure", defaultLabel: "Enclosure rating", valueEn: "IP65 weatherproof", valueAr: "IP65 مقاوم للعوامل الجوية والأتربة والماء" },
    { labelKey: "spec.housing", defaultLabel: "Housing / color", valueEn: "Impact-resistant polycarbonate / Red", valueAr: "بولي كربونات مقاوم للصدمات / أحمر طوارئ" },
    { labelKey: "spec.standards", defaultLabel: "Standards & approvals", valueEn: "EN54-3, EN54-23", valueAr: "مطابق لمواصفات EN54-3 و EN54-23" },
    { labelKey: "spec.dimensions", defaultLabel: "Dimensions", valueEn: "135mm x 115mm x 60mm", valueAr: "135 مم × 115 مم × 60 مم" },
  ],
  "ics-b01": [
    { labelKey: "spec.code", defaultLabel: "Product code", valueEn: "ICS-B01", valueAr: "ICS-B01" },
    { labelKey: "spec.material", defaultLabel: "Material", valueEn: "1.2mm mild steel with zinc primer", valueAr: "صلب معالج بطبقة زنك 1.2 مم لمقاومة التآكل" },
    { labelKey: "spec.doorType", defaultLabel: "Door type", valueEn: "Glazed door with tempered glass", valueAr: "باب مزجج بزجاج مقسى آمن ومقبض كروم" },
    { labelKey: "spec.finish", defaultLabel: "Finish", valueEn: "Electrostatic epoxy polyester red powder", valueAr: "طلاء إيبوكسي بوليستر كهروستاتيكي أحمر مقاوم للمواد الكيماوية" },
    { labelKey: "spec.hingeType", defaultLabel: "Hinge type", valueEn: "Continuous piano hinge 180° opening", valueAr: "مفصلة بيانو متصلة بفتح 180 درجة" },
    { labelKey: "spec.internalCapacity", defaultLabel: "Internal capacity", valueEn: "Accommodates 30m layflat hose & nozzle", valueAr: "يتسع لبكرة أو خرطوم 30 متراً وفوهة ومحبس هبوط" },
    { labelKey: "spec.standards", defaultLabel: "Standards", valueEn: "BS 5041 Part 4, NFPA 14", valueAr: "مطابق لـ BS 5041 و NFPA 14 واشتراطات الكود المصري" },
    { labelKey: "spec.dimensions", defaultLabel: "Dimensions", valueEn: "750mm x 750mm x 250mm", valueAr: "750 مم × 750 مم × 250 مم" },
  ],
};

function ProductDetails() {
  const { t, lang } = useApp();
  const { quantities, changeQuantity, openQuote } = useQuote();
  const ar = lang === "ar";
  const params = useParams<{ id: string }>();
  const product = products.find((item) => item.id === params?.id);
  const back = (
    <Link href="/products" className="ics-text-link">
      {ar ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
      <span>{ar ? "الرجوع لكتالوج المعدات" : "Back to equipment catalog"}</span>
    </Link>
  );

  if (!product) {
    return (
      <main className="ics-shell ics-empty">
        <h1>{ar ? "المنتج غير موجود" : "Equipment not found"}</h1>
        {back}
      </main>
    );
  }

  const quantity = quantities[product.id] ?? 0;
  const category = categories[product.category];

  return (
    <main className="ics-shell ics-detail">
      <div style={{ marginBottom: 20 }}>{back}</div>

      <div className="ics-detail-grid">
        {/* Product Photo Showcase */}
        <div className="ics-hero-image ics-detail-photo">
          <Image
            src={"/assets/" + product.image}
            alt={product[lang]}
            fill
            sizes="(max-width: 690px) 95vw, 45vw"
            preload
          />
        </div>

        {/* Product Details & Actions */}
        <div>
          <div className="ics-product-code" style={{ marginBottom: 12 }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{category[lang]}</span>
            <bdi style={{ fontSize: "0.85rem", fontWeight: 750, color: "var(--accent-text)" }}>
              {product.id.toUpperCase()}
            </bdi>
          </div>

          <h1>{product[lang]}</h1>
          <p>{t("prod." + product.id + ".tagline")}</p>

          <div className="ics-detail-price">
            <strong><bdi>{money(product.price, lang)}</bdi></strong>
            <span>{ar ? "سعر الوحدة الاسترشادي" : "Sample price per unit"}</span>
          </div>

          {/* Quotation Controls */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginTop: 22 }}>
            {quantity === 0 ? (
              <button
                type="button"
                className="ics-button"
                onClick={() => changeQuantity(product.id, 1)}
                style={{ padding: "12px 24px" }}
              >
                <Plus size={18} aria-hidden="true" />
                <span>{ar ? "أضف إلى عرض السعر" : "Add to quote"}</span>
              </button>
            ) : (
              <div
                className="ics-card-stepper"
                style={{ maxWidth: 220 }}
                role="group"
                aria-label={(ar ? "الكمية في عرض السعر" : "Quantity in quote")}
              >
                <button
                  type="button"
                  className="ics-card-stepper-btn"
                  onClick={() => changeQuantity(product.id, -1)}
                  aria-label={(ar ? "إنقاص كمية " : "Decrease quantity ") + product[lang]}
                >
                  <Minus size={16} />
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
                  <Plus size={16} />
                </button>
              </div>
            )}

            <button
              type="button"
              className="ics-button-secondary"
              onClick={openQuote}
            >
              <FileDown size={17} />
              <span>{ar ? "عرض السعر وتنزيل PDF" : "Open quote & PDF"}</span>
            </button>
          </div>

          {quantity > 0 && (
            <p className="ics-selection" style={{ justifyContent: "flex-start", marginTop: 12 }}>
              <Check size={16} />
              <span>{ar ? "المعدة مضافة في عرض السعر الحالي · إجمالي البند: " : "Item in your quote · Subtotal: "}</span>
              <strong style={{ marginInlineStart: 4 }}><bdi>{money(product.price * quantity, lang)}</bdi></strong>
            </p>
          )}

          <p className="ics-quote-note">
            {ar
              ? "يمكنك إضافة منتجات أخرى وتحديد الكميات المطلوبة لمشروعك، ثم تنزيل ملف PDF رسمي يحمل اسم وشعار ICS."
              : "You can add more products and adjust quantities, then download an official ICS-branded PDF quote."}
          </p>
        </div>
      </div>

      {/* Technical Specifications */}
      <section className="ics-panel ics-specs">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <ShieldCheck size={24} style={{ color: "var(--accent)" }} />
          <h2 style={{ margin: 0 }}>{ar ? "المواصفات الفنية وبيانات الاعتماد" : "Technical specifications & compliance"}</h2>
        </div>
        <dl>
          {specifications[product.id].map((spec) => (
            <div key={spec.labelKey}>
              <dt>{t(spec.labelKey)}</dt>
              <dd>{ar ? spec.valueAr : spec.valueEn}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Direct Quote consultation callout */}
      <div style={{ marginTop: 35, padding: "24px 28px", background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div>
          <strong style={{ fontSize: "1.05rem", display: "block" }}>
            {ar ? "هل تحتاج كميات خاصة أو مواصفات استشاري محددة؟" : "Need large project quantities or consultant submittals?"}
          </strong>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: 4 }}>
            {ar
              ? "فريقنا الهندسي يوفر الحسابات الهيدروليكية واعتمادات الدفاع المدني لمشروعات المقاولات الكبرى."
              : "Our engineering desk provides hydraulic calculations and civil defence submittals for commercial projects."}
          </p>
        </div>
        <Link href="/contact" className="ics-button">
          <span>{ar ? "تواصل مع المكتب الفني" : "Contact technical desk"}</span>
          <ArrowUpRight size={16} className="rtl-flip" />
        </Link>
      </div>
    </main>
  );
}

export default function ProductDetailPage() {
  return (
    <div className="ics-site">
      <Navbar activePage="products" />
      <Suspense fallback={<main className="ics-shell ics-empty" aria-busy="true" />}>
        <ProductDetails />
      </Suspense>
      <Footer />
    </div>
  );
}
