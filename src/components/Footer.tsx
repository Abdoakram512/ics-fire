"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { brand } from "@/lib/catalog";
import IcsLogo from "./IcsLogo";

export default function Footer() {
  const { lang } = useApp();
  const ar = lang === "ar";

  return (
    <footer className="ics-footer">
      <div className="ics-shell ics-footer-grid">
        {/* Column 1: Brand & Authority */}
        <div className="ics-footer-col ics-footer-brand-col">
          <Link className="ics-footer-brand" href="/" aria-label={ar ? "ICS لأنظمة مكافحة الحريق" : "ICS Fire Systems"}>
            <IcsLogo className="ics-logo-mark" size={80} />
            <div>
              <strong>{ar ? "ICS لأنظمة مكافحة الحريق" : brand.name}</strong>
              <small>{ar ? "معدات السلامة والحماية المعتمدة" : "Certified Fire Protection Systems"}</small>
            </div>
          </Link>
          <p className="ics-footer-desc">
            {ar
              ? "الشركة الهندسية المتخصصة في توريد واعتماد معدات مكافحة الحريق والسلامة الصناعية للمشروعات والمنشآت، طبقا لاشتراطات الدفاع المدني المصري وكود EN3 و NFPA."
              : "Engineering supply and submittal compliance for certified fire suppression and life safety equipment, certified to EN3, EN54, and NFPA standards."}
          </p>
          <div className="ics-footer-badges">
            <span className="ics-footer-badge">
              <ShieldCheck size={14} />
              <span>{ar ? "معتمد دفاع مدني" : "Civil Defence Approved"}</span>
            </span>
            <span className="ics-footer-badge">
              <ShieldCheck size={14} />
              <span>{ar ? "كود NFPA & EN" : "NFPA & EN Compliant"}</span>
            </span>
          </div>
        </div>

        {/* Column 2: Equipment Catalog */}
        <div className="ics-footer-col">
          <h3 className="ics-footer-heading">{ar ? "كتالوج المعدات" : "Equipment Catalog"}</h3>
          <ul className="ics-footer-links">
            <li>
              <Link href="/products?category=fire-extinguishers">
                {ar ? "أجهزة الإطفاء اليدوية والآلية" : "Fire Extinguishers"}
              </Link>
            </li>
            <li>
              <Link href="/products?category=detection-alarm">
                {ar ? "أنظمة الكشف والإنذار المبكر" : "Detection & Alarm Systems"}
              </Link>
            </li>
            <li>
              <Link href="/products?category=hose-reels-cabinets">
                {ar ? "كبائن وخراطيم ومحابس الحريق" : "Hose Reels & Cabinets"}
              </Link>
            </li>
            <li>
              <Link href="/products" className="ics-footer-highlight-link">
                <span>{ar ? "استعراض كامل الكتالوج (6)" : "View All Equipment (6)"}</span>
                <ArrowUpRight size={14} className="rtl-flip" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Technical Services & Submittals */}
        <div className="ics-footer-col">
          <h3 className="ics-footer-heading">{ar ? "المكتب الفني والخدمات" : "Technical & Submittals"}</h3>
          <ul className="ics-footer-links">
            <li>
              <Link href="/contact">
                {ar ? "تسعير جداول الكميات (BOQ)" : "Submit Project BOQ"}
              </Link>
            </li>
            <li>
              <Link href="/products#quote">
                {ar ? "إعداد وتنزيل عرض سعر PDF" : "Download PDF Quotation"}
              </Link>
            </li>
            <li>
              <Link href="/about">
                {ar ? "عن الشركة والاعتمادات" : "About ICS & Standards"}
              </Link>
            </li>
            <li>
              <Link href="/contact">
                {ar ? "طلب مطابقة فنية للاستشاري" : "Consultant Code Matching"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Direct Channels */}
        <div className="ics-footer-col">
          <h3 className="ics-footer-heading">{ar ? "المقر والتواصل المباشر" : "Direct Channels"}</h3>
          <ul className="ics-footer-contact">
            <li>
              <Phone size={16} />
              <div>
                <small>{ar ? "مبيعات المشروعات" : "Project Sales"}</small>
                <a href={"tel:" + brand.phone.replace(/[^0-9+]/g, "")} dir="ltr">{brand.phone}</a>
              </div>
            </li>
            <li>
              <Mail size={16} />
              <div>
                <small>{ar ? "المكتب الفني" : "Technical Desk"}</small>
                <a href={"mailto:" + brand.email}>{brand.email}</a>
              </div>
            </li>
            <li>
              <MapPin size={16} />
              <div>
                <small>{ar ? "الموقع" : "Headquarters"}</small>
                <span>{ar ? "القاهرة الجديدة، مصر" : "New Cairo, Egypt"}</span>
              </div>
            </li>
            <li>
              <Clock size={16} />
              <div>
                <small>{ar ? "أوقات العمل" : "Operating Hours"}</small>
                <span>{ar ? "الأحد - الخميس: 9:00 ص - 5:00 م" : "Sun - Thu: 9:00 AM - 5:00 PM"}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="ics-shell ics-footer-bottom">
        <span>
          © 2026 {brand.name}. {ar ? "كافة الحقوق محفوظة." : "All rights reserved."}
        </span>
        <span>
          {ar
            ? "الأسعار المعروضة استرشادية لتسهيل الحساب المبدئي لحين اعتماد إدارة المبيعات وتأكيد التوريد."
            : "Displayed prices are provisional pending final corporate sales authorization."}
        </span>
      </div>
    </footer>
  );
}
