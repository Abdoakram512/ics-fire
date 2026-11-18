"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FileText, Menu, Moon, Sun, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useQuote } from "@/context/QuoteContext";
import { quoteLines } from "@/lib/catalog";
import IcsLogo from "./IcsLogo";
import QuoteSummary from "./QuoteSummary";

export default function Navbar({ activePage = "home" }: { activePage?: "home" | "products" | "about" | "contact" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const quoteDialog = useRef<HTMLDialogElement>(null);
  const { theme, toggleTheme, lang, setLang } = useApp();
  const { quantities, drawerOpen, openQuote, closeQuote } = useQuote();
  const count = quoteLines(quantities).length;
  const ar = lang === "ar";
  const links = [
    { id: "home", href: "/", label: ar ? "الرئيسية" : "Home" },
    { id: "products", href: "/products", label: ar ? "المنتجات" : "Products" },
    { id: "about", href: "/about", label: ar ? "عن الشركة" : "About ICS" },
    { id: "contact", href: "/contact", label: ar ? "تواصل معنا" : "Contact" },
  ];

  useEffect(() => {
    const dialog = quoteDialog.current;
    if (!dialog) return;
    if (drawerOpen && !dialog.open) dialog.showModal();
    if (!drawerOpen && dialog.open) dialog.close();
  }, [drawerOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header className="ics-header">
      <div className="ics-shell ics-header-inner">
        <Link
          className="ics-brand"
          href="/"
          aria-label={ar ? "ICS لأنظمة مكافحة الحريق - الرئيسية" : "ICS Fire Systems - Home"}
        >
          <IcsLogo className="ics-logo-mark" size={88} />
          <span className="ics-brand-lockup">
            <strong className="ics-brand-title">
              <span dir="ltr" className="ics-brand-code">ICS</span>
              <span className="ics-brand-sep" aria-hidden="true" />
              <span className="ics-brand-label">
                {ar ? "أنظمة مكافحة الحريق" : "Fire Systems"}
              </span>
            </strong>
            <small className="ics-brand-sub">
              {ar ? "معدات السلامة والحماية المعتمدة" : "Certified Fire Protection Equipment"}
            </small>
          </span>
        </Link>

        <nav className="ics-desktop-nav" aria-label={ar ? "القائمة الرئيسية" : "Main navigation"}>
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={activePage === link.id ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ics-nav-actions">
          <button
            className="ics-lang"
            type="button"
            onClick={() => setLang(ar ? "en" : "ar")}
            aria-label={ar ? "Switch language to English" : "تبديل اللغة إلى العربية"}
          >
            {ar ? "EN" : "العربية"}
          </button>
          <button
            className="ics-theme"
            type="button"
            onClick={toggleTheme}
            aria-label={ar ? "تبديل المظهر" : "Toggle theme"}
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button className="ics-button ics-nav-quote" type="button" aria-haspopup="dialog" onClick={openQuote}>
            <FileText size={17} />
            <span>{ar ? "عرض السعر" : "Your quote"}</span>
            {count > 0 && <b>{count}</b>}
          </button>
          <button
            className="ics-menu-toggle"
            type="button"
            aria-label={ar ? "القائمة" : "Menu"}
            aria-expanded={menuOpen}
            aria-controls="ics-mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="ics-mobile-nav ics-shell" id="ics-mobile-nav" aria-label={ar ? "القائمة الرئيسية" : "Main navigation"}>
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.id}
              onClick={() => setMenuOpen(false)}
              aria-current={activePage === link.id ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="ics-mobile-theme-btn"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            <span>
              {theme === "light"
                ? (ar ? "تفعيل الوضع الداكن" : "Enable dark mode")
                : (ar ? "تفعيل الوضع الفاتح" : "Enable light mode")}
            </span>
          </button>
        </nav>
      )}

      <dialog
        className="ics-quote-dialog"
        ref={quoteDialog}
        aria-label={ar ? "عرض السعر" : "Your quote"}
        onClose={closeQuote}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeQuote();
        }}
      >
        <div className="ics-dialog-inner">
          <button className="ics-dialog-close ics-icon" type="button" autoFocus aria-label={ar ? "إغلاق عرض السعر" : "Close quote"} onClick={closeQuote}>
            <X size={21} />
          </button>
          <QuoteSummary onBrowse={closeQuote} />
        </div>
      </dialog>
    </header>
  );
}
