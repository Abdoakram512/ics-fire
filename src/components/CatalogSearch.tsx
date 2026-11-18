"use client";

import { Search } from "lucide-react";
import type { FormEvent } from "react";
import type { Language } from "@/lib/catalog";

export default function CatalogSearch({ lang, value, onChange, onSubmit }: {
  lang: Language;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const label = lang === "ar" ? "ابحث باسم المنتج أو الكود" : "Search by product name or code";
  return (
    <form className="ics-search" role="search" onSubmit={onSubmit}>
      <Search size={21} aria-hidden="true" />
      <input type="search" aria-label={label} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} />
      <button className="ics-button" type="submit">{lang === "ar" ? "بحث" : "Search"}</button>
    </form>
  );
}
