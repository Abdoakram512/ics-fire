"use client";

import { useState, useRef } from "react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Paperclip,
  FileCheck,
  X,
  AlertCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

export default function ContactPage() {
  const { lang } = useApp();
  const ar = lang === "ar";
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    helpType: ar ? "تسعير مشروع وتوريد كميات (BOQ)" : "Project Quotation & Volume Supply",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage(
        ar
          ? "يرجى تعبئة الحقول الأساسية: الاسم الكريم، البريد الإلكتروني، وتفاصيل نطاق المشروع."
          : "Please complete all mandatory fields: Full Name, Email, and Project Scope."
      );
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="ics-site">
      <Navbar activePage="contact" />

      <main>
        {/* Page Header */}
        <section className="ics-page-header">
          <div className="ics-shell">
            <p className="ics-eyebrow">{ar ? "المكتب الفني والمبيعات الهندسية" : "Engineering Sales Desk"}</p>
            <h1>
              {ar ? "تواصل مباشر لدعم المشروعات" : "Direct project support"}
              <br />
              <em>{ar ? "وعروض الأسعار المعتمدة." : "& commercial proposals."}</em>
            </h1>
            <p>
              {ar
                ? "أرسل جدول كميات المشروع (BOQ) أو مخططات السلامة لمراجعتها هندسياً وتقديم عرض أسعار فني ومالي معتمد خلال 24 ساعة."
                : "Submit your project bill of quantities or MEP drawings for technical code matching and an itemized quotation within 24 hours."}
            </p>
          </div>
        </section>

        {/* Contact Layout */}
        <section className="ics-shell ics-contact-layout">
          {/* Left: Contact Desk & Turnaround Commitments */}
          <div className="ics-contact-desk">
            <p className="ics-eyebrow">{ar ? "بيانات التواصل المباشر" : "Direct Channels"}</p>
            <h2>{ar ? "المكتب الفني للمشروعات" : "Project Engineering Desk"}</h2>
            <p>
              {ar
                ? "فريقنا الهندسي متاح للرد على استفسارات المقاولين، فحص جداول الكميات، وتقديم شهادات الفحص وتقارير الضغط."
                : "Our technical team is ready to assist contractors with specification submittals, factory test data, and staged delivery schedules."}
            </p>

            <div className="ics-contact-list">
              <div className="ics-contact-item">
                <div className="ics-trust-icon" style={{ width: 36, height: 36 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <strong>{ar ? "البريد الإلكتروني التجاري" : "Commercial Email"}</strong>
                  <a href="mailto:contact@icsfiresystems.com">contact@icsfiresystems.com</a>
                </div>
              </div>

              <div className="ics-contact-item">
                <div className="ics-trust-icon" style={{ width: 36, height: 36 }}>
                  <Phone size={18} />
                </div>
                <div>
                  <strong>{ar ? "الهاتف والمكتب الفني" : "Direct Phone & Sales"}</strong>
                  <span dir="ltr">+20 (2) 2736-4890</span>
                </div>
              </div>

              <div className="ics-contact-item">
                <div className="ics-trust-icon" style={{ width: 36, height: 36 }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <strong>{ar ? "المقر والمستودعات" : "Headquarters & Facilities"}</strong>
                  <span>{ar ? "مصر — التجمع الخامس، القاهرة الجديدة" : "5th Settlement, New Cairo, Egypt"}</span>
                </div>
              </div>
            </div>

            {/* Turnaround Guarantee Box */}
            <div style={{ marginTop: 28, padding: 18, background: "var(--tint)", borderRadius: 8, border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Clock size={18} style={{ color: "var(--accent)" }} />
                <strong style={{ fontSize: "0.9rem" }}>
                  {ar ? "التزام سرعة الرد خلال 24 ساعة" : "24-Hour Response Commitment"}
                </strong>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.8rem", marginTop: 6, lineHeight: 1.6 }}>
                {ar
                  ? "تتم مراجعة المخططات الهندسية وجداول الكميات خلال 24 إلى 48 ساعة كحد أقصى لتجهيز دراسة الاعتماد وعرض الأسعار."
                  : "All submitted project BOQs and MEP drawings are reviewed within 24 to 48 hours to provide compliant proposals."}
              </p>
            </div>

            <div style={{ marginTop: 18, padding: 14, background: "var(--paper)", borderRadius: 8, border: "1px solid var(--border)", fontSize: "0.78rem", color: "var(--muted)" }}>
              {ar
                ? "ملاحظة: هذا المكتب مخصص للمبيعات والاستشارات الهندسية للمشروعات. لحالات الطوارئ الميدانية الحية، اتصل بالدفاع المدني (180)."
                : "Note: This portal handles commercial sales and engineering bids. For active emergencies, contact Civil Defence immediately."}
            </div>
          </div>

          {/* Right: Submission Form */}
          <div className="ics-contact-form">
            {submitted ? (
              <div style={{ padding: "30px 15px", textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#EDF4EF", color: "#1F5B3D", display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
                  <CheckCircle2 size={28} />
                </div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 750 }}>
                  {ar ? "تم إرسال طلبك بنجاح" : "Inquiry Submitted Successfully"}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.8, marginBlock: "12px 24px", maxWidth: "42ch", marginInline: "auto" }}>
                  {ar
                    ? "شكراً لتواصلك مع ICS. استلم فريق المبيعات الهندسية نطاق مشروعك، وسنقوم بالتواصل معك وتقديم العرض المعتمد خلال 24 ساعة."
                    : "Thank you for reaching out to ICS. Our sales engineering team has received your scope and will contact you with itemized submittals within 24 hours."}
                </p>
                <button
                  type="button"
                  className="ics-button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ fullName: "", email: "", company: "", phone: "", helpType: ar ? "تسعير مشروع وتوريد كميات (BOQ)" : "Project Quotation & Volume Supply", message: "" });
                    setAttachedFile(null);
                  }}
                >
                  {ar ? "إرسال طلب مشروع آخر" : "Submit another inquiry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="ics-eyebrow">{ar ? "طلب تسعير ومراجعة BOQ" : "Quotation & Submittal Request"}</p>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 750, marginBottom: 18 }}>
                  {ar ? "بيانات المشروع ومراجعة المواصفة" : "Project Details & Scope"}
                </h2>

                {errorMessage && (
                  <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 14px", background: "#F6EAE9", color: "#7E1515", border: "1px solid #E5C8C6", borderRadius: 6, fontSize: "0.84rem", marginBottom: 18 }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="ics-form-group">
                  <label htmlFor="contact-name">
                    {ar ? "الاسم الكريم *" : "Full Name *"}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={ar ? "مهندس / مسؤول المشتريات" : "Your name or title"}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="ics-form-group">
                    <label htmlFor="contact-email">
                      {ar ? "البريد الإلكتروني المؤسسي *" : "Corporate Email *"}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                    />
                  </div>

                  <div className="ics-form-group">
                    <label htmlFor="contact-phone">
                      {ar ? "الهاتف / واتساب" : "Phone / WhatsApp"}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+20 ..."
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="ics-form-group">
                    <label htmlFor="contact-company">
                      {ar ? "اسم الشركة / المقاول العام" : "Company / Contractor Name"}
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={ar ? "شركة المقاولات أو التطوير" : "Organization name"}
                    />
                  </div>

                  <div className="ics-form-group">
                    <label htmlFor="contact-type">
                      {ar ? "نوع الطلب" : "Inquiry Type"}
                    </label>
                    <select
                      id="contact-type"
                      value={formData.helpType}
                      onChange={(e) => setFormData({ ...formData, helpType: e.target.value })}
                    >
                      <option value={ar ? "تسعير مشروع وتوريد كميات (BOQ)" : "Project Quotation & Volume Supply"}>
                        {ar ? "تسعير مشروع وتوريد كميات (BOQ)" : "Project Quotation & Volume Supply"}
                      </option>
                      <option value={ar ? "مراجعة مخططات واعتماد استشاري" : "MEP Drawings & Consultant Submittal"}>
                        {ar ? "مراجعة مخططات واعتماد استشاري" : "MEP Drawings & Consultant Submittal"}
                      </option>
                      <option value={ar ? "طلب فحص واختبار أسطوانات وكبائن" : "Testing & Maintenance Inspection"}>
                        {ar ? "طلب فحص واختبار أسطوانات وكبائن" : "Testing & Maintenance Inspection"}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="ics-form-group">
                  <label htmlFor="contact-message">
                    {ar ? "نطاق المشروع أو مواصفات الكميات (BOQ) *" : "Project Scope / Specifications (BOQ) *"}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      ar
                        ? "اكتب تفاصيل الطرازات المطلوبة، السعات، كود المشروع، أو أي اشتراطات استشارية خاصة..."
                        : "Describe required quantities, models, project occupancy codes, or consultant specifications..."
                    }
                  />
                </div>

                {/* File Attachment */}
                <div className="ics-form-group">
                  <label>
                    {ar ? "إرفاق جدول كميات أو مخططات (اختياري)" : "Attach BOQ or Drawing File (Optional)"}
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept=".pdf,.dwg,.xlsx,.xls,.docx,.doc,.png,.jpg"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setAttachedFile(e.target.files[0]);
                    }}
                  />

                  {attachedFile ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "var(--tint)", borderRadius: 6, border: "1px solid var(--border)", fontSize: "0.85rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <FileCheck size={16} style={{ color: "var(--accent)" }} />
                        <span style={{ fontWeight: 650 }}>{attachedFile.name}</span>
                        <small style={{ color: "var(--muted)" }}>({(attachedFile.size / 1024 / 1024).toFixed(2)} MB)</small>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAttachedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="ics-button-secondary"
                      style={{ color: "var(--ink)", borderColor: "var(--border)", width: "100%", justifyContent: "center" }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip size={16} />
                      <span>{ar ? "اختيار ملف (PDF, DWG, Excel حتى 10 ميجا)" : "Choose file (PDF, DWG, Excel up to 10 MB)"}</span>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="ics-button"
                  style={{ width: "100%", marginTop: 8 }}
                >
                  <span>{ar ? "إرسال طلب التسعير والدراسة الفنية" : "Submit Quotation Request"}</span>
                  <ArrowUpRight size={17} className="rtl-flip" />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
