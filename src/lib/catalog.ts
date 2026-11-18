export const categories = [
  { id: "fire-extinguishers", en: "Fire extinguishers", ar: "طفايات الحريق" },
  { id: "detection-alarm", en: "Detection & alarm", ar: "الكشف والإنذار" },
  { id: "hose-reels-cabinets", en: "Hose reels & cabinets", ar: "الخراطيم والكبائن" },
] as const;

export type Language = "en" | "ar";
export const samplePricing = true;
export const maxQuantity = 9999;
export const brand = {
  name: "ICS Fire Systems",
  email: "contact@icsfiresystems.com",
  phone: "+20 (2) 2736-4890",
  logo: "/assets/ics-logo-tight.png",
};

export const products = [
  { id: "ics-p06", category: 0, price: 1450, en: "6 kg ABC powder extinguisher", ar: "طفاية بودرة ABC سعة ٦ كجم", image: "studio-hd/powder-extinguisher.png", applications: ["Commercial", "Industrial"] },
  { id: "ics-c05", category: 0, price: 3950, en: "5 kg CO₂ extinguisher", ar: "طفاية ثاني أكسيد الكربون ٥ كجم", image: "studio-hd/product-co2-extinguisher.png", applications: ["Commercial", "Shared buildings"] },
  { id: "ics-d01", category: 1, price: 780, en: "Optical smoke detector", ar: "كاشف دخان بصري", image: "studio-hd/smoke-detector.png", applications: ["Commercial", "Shared buildings"] },
  { id: "ics-h30", category: 2, price: 6250, en: "30 m wall-mounted hose reel", ar: "بكرة خرطوم حريق جدارية ٣٠ متر", image: "studio-hd/product-hr-001.png", applications: ["Industrial", "Shared buildings"] },
  { id: "ics-a02", category: 1, price: 950, en: "Alarm sounder with strobe", ar: "جرس إنذار مع فلاشر ضوئي", image: "studio-hd/product-sounder-strobe.png", applications: ["Commercial", "Industrial"] },
  { id: "ics-b01", category: 2, price: 4650, en: "Steel fire hose cabinet", ar: "كابينة خرطوم حريق صلب", image: "studio-hd/product-hose-cabinet.png", applications: ["Industrial", "Shared buildings"] },
] as const;

export type Product = (typeof products)[number];
export type QuoteLine = { product: Product; quantity: number };
export type Quantities = Partial<Record<Product["id"], number>>;

export function quoteLines(quantities: Quantities): QuoteLine[] {
  return products.flatMap((product) => {
    const quantity = quantities[product.id];
    return quantity && Number.isInteger(quantity) && quantity > 0 && quantity <= maxQuantity
      ? [{ product, quantity }]
      : [];
  });
}

export function quoteTotal(lines: QuoteLine[]) {
  return lines.reduce((total, { product, quantity }) => total + product.price * quantity, 0);
}

export function money(amount: number, lang: Language) {
  return new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
    style: "currency", currency: "EGP", currencyDisplay: lang === "ar" ? "symbol" : "code", maximumFractionDigits: 2,
  }).format(amount);
}
