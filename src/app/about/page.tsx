"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, CheckCircle2, ShieldCheck, Truck, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

export default function AboutPage() {
  const { lang } = useApp();
  const ar = lang === "ar";

  const principles = [
    {
      icon: ShieldCheck,
      title: ar ? "المطابقة الصارمة لكود الدفاع المدني" : "Regulatory Compliance",
      desc: ar
        ? "كافة المعدات مطابقة لمعايير EN3 و EN54 و NFPA، ومدعومة بتقارير الفحص المعملي واختبارات الضغط الهيدروستاتيكي لاجتياز لجان التفتيش الرسمية."
        : "All equipment is certified to EN3, EN54, and NFPA standards, backed by third-party testing documentation and factory pressure test certificates.",
    },
    {
      icon: CheckCircle2,
      title: ar ? "الشفافية الهندسية ودعم الاستشاريين" : "Engineering Transparency",
      desc: ar
        ? "نوفر صحائف بيانات فنية دقيقة، نماذج BIM Revit، وحسابات هيدروليكية معتمدة لتسريع دورة اعتماد الاستشاري والمقاول العام للمشروع."
        : "We provide comprehensive technical submittals, BIM coordination data, and hydraulic sizing support to accelerate consultant and contractor approvals.",
    },
    {
      icon: Truck,
      title: ar ? "اللوجستيات وجدولة التوريد للمواقع" : "Reliable Project Logistics",
      desc: ar
        ? "نحتفظ بمخزون استراتيجي من الطرازات القياسية للتسليم الفوري بالمواقع الإنشائية، مع جدولة شحن الدفعات الكبرى لتتوافق مع مراحل التسليم."
        : "We maintain substantial inventory for immediate site delivery and stage bulk deliveries to match phased construction schedules.",
    },
  ];

  return (
    <div className="ics-site">
      <Navbar activePage="about" />

      <main>
        {/* Page Header */}
        <section className="ics-page-header">
          <div className="ics-shell">
            <p className="ics-eyebrow">{ar ? "عن شركة ICS" : "Corporate Profile"}</p>
            <h1>
              {ar ? "أنظمة مكافحة الحريق المعتمدة" : "Certified fire protection systems,"}
              <br />
              <em>{ar ? "المبنية على الدقة الهندسية." : "engineered for compliance."}</em>
            </h1>
            <p>
              {ar
                ? "نوفر لشركات المقاولات والمكاتب الاستشارية والمطورين أنظمة إطفاء وإنذار معتمدة رسميًا، مدعومة بالتوثيق الفني وسرعة تجهيز عروض الأسعار."
                : "ICS equips contractors, engineering consultants, and facility developers with certified fire protection hardware, clear documentation, and rapid commercial quotations."}
            </p>
          </div>
        </section>

        {/* Workshop Photograph Banner */}
        <section className="ics-shell">
          <div className="ics-about-image">
            <Image
              src="/assets/about-workshop.png"
              alt="ICS technical workshop and safety equipment inspection"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Corporate Background & Credentials */}
        <section className="ics-shell" style={{ paddingBlock: "20px 40px" }}>
          <div className="ics-section-heading">
            <div>
              <p className="ics-eyebrow">{ar ? "معايير التشغيل" : "Operating Standards"}</p>
              <h2>{ar ? "حلول سلامة عملية بدون مساومة على الجودة" : "Practical safety solutions built on compliance"}</h2>
            </div>
          </div>

          <div className="ics-about-copy-grid">
            <p>
              {ar
                ? "تتطلب سلامة الأرواح والمنشآت أنظمة إطفاء موثوقة تعمل بكفاءة مطلقة عند أول لحظة خطر. في شركة ICS، نلتزم بتوريد معدات مجربة ومختبرة في كبرى المعامل الدولية المعتمدة، لضمان استجابة سريعة وحماية متكاملة للبنى التحتية والمباني الحيوية."
                : "Safeguarding lives and commercial assets demands reliable fire systems that perform flawlessly in emergency conditions. At ICS, we deliver certified hardware validated in accredited testing laboratories to protect critical infrastructure."}
            </p>
            <p>
              {ar
                ? "ندرك أهمية الوقت في المشروعات الإنشائية، لذلك طورنا دورة عمل رقمية سريعة تتيح لمهندسي المشتريات والمقاولين استعراض الأسعار الاسترشادية، وتجهيز عروض الأسعار فورياً، مع توفير الدعم الهندسي المباشر لمراجعة جداول الكميات (BOQ)."
                : "Recognizing that project schedules are critical, we designed a streamlined digital procurement experience allowing contractors to review prices, generate official PDF quotations, and receive rapid engineering submittals."}
            </p>
          </div>
        </section>

        {/* 3 Core Operating Principles */}
        <section className="ics-shell" style={{ paddingBottom: 60 }}>
          <div className="ics-about-grid">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="ics-about-card">
                  <div className="ics-trust-icon" style={{ marginBottom: 16 }}>
                    <Icon size={22} />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Facility Engineering Banner */}
        <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", paddingBlock: "55px" }}>
          <div className="ics-shell ics-about-hazard-grid">
            <div>
              <p className="ics-eyebrow">{ar ? "تغطية كافة المخاطر" : "Risk-Engineered Hardware"}</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 750, lineHeight: 1.3 }}>
                {ar ? "معدات ملائمة لطبيعة المنشأة والحمل الحراري" : "Equipment sized to actual hazard profiles"}
              </h2>
              <p style={{ color: "var(--muted)", marginBlock: "16px 24px", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {ar
                  ? "سواء كنت تجهز برجاً إدارياً، مجمعاً تجارياً، مستودعاً لوجستياً، أو محطة طاقة، نوفر التشكيلة المتكاملة من طفايات البودرة وCO2، كواشف الدخان المعنونة، شبكات الرشاشات، وكبائن الإطفاء الفولاذية."
                  : "Whether outfitting corporate high-rises, commercial retail complexes, heavy logistics warehouses, or power substations, we supply comprehensive suppression and detection portfolios matching NFPA occupancy standards."}
              </p>
              <Link href="/products" className="ics-button">
                <span>{ar ? "استعراض كتالوج المعدات المعتمدة" : "Review certified equipment"}</span>
                <ArrowUpRight size={17} className="rtl-flip" />
              </Link>
            </div>

            <div className="ics-about-hazard-photo">
              <Image
                src="/assets/about-architecture.png"
                alt="Modern commercial infrastructure protected by ICS fire systems"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Direct Quote consultation callout */}
        <section className="ics-boq-banner">
          <div className="ics-shell ics-boq-grid">
            <div className="ics-boq-copy">
              <p className="ics-eyebrow">
                {ar ? "المكتب الهندسي وعروض المشروعات" : "Commercial Submittals"}
              </p>
              <h2>{ar ? "هل تود مناقشة مواصفات مشروعك مع مهندسينا؟" : "Discuss your project specifications with our engineers"}</h2>
              <p>
                {ar
                  ? "تواصل مباشرة مع مهندسي المبيعات لمراجعة جداول الكميات، مطابقة الكود، وتحديد مواعيد التوريد لموقعك."
                  : "Contact our sales engineering team for bill of quantities review, code matching, and staged delivery scheduling."}
              </p>
            </div>
            <div className="ics-boq-actions">
              <Link href="/contact" className="ics-button">
                <span>{ar ? "تواصل معنا لطلب دراسة" : "Request engineering submittal"}</span>
                <ArrowUpRight size={17} className="rtl-flip" />
              </Link>
              <Link href="/products" className="ics-button-secondary">
                <span>{ar ? "الكتالوج وتنزيل عرض السعر" : "Build quotation PDF"}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
