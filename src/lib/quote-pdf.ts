import PDFDocument from "pdfkit";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { brand, quoteTotal, samplePricing, type QuoteLine } from "./catalog";

const ink = "#18212D";
const muted = "#57606A";
const accent = "#9B1C1C";
const paper = "#F4F3EF";

export async function createQuotePdf(lines: QuoteLine[], date: Date, reference: string): Promise<Buffer> {
  const [regular, bold, logo] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Cairo-Regular.ttf")),
    readFile(join(process.cwd(), "public/fonts/Cairo-Bold.ttf")),
    readFile(join(process.cwd(), "public/assets/ics-quote-logo.jpg")),
  ]);

  const doc = new PDFDocument({
    size: "A4",
    margin: 40,
    font: join(process.cwd(), "public/fonts/Cairo-Regular.ttf"),
    lang: "ar-EG",
    info: { Title: "عرض أسعار معدات مكافحة الحريق", Author: brand.name },
  });
  doc.registerFont("Cairo", regular);
  doc.registerFont("CairoBold", bold);

  const result = new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
  const features: ["rtla"] = ["rtla"];

  function text(value: string, x: number, y: number, width: number, size = 10, strong = false, color = ink, rtl = true) {
    doc.font(strong ? "CairoBold" : "Cairo").fontSize(size).fillColor(color);
    // Keep model codes and numbers left-to-right inside otherwise Arabic text.
    const normalized = value.replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
    const runs = rtl ? normalized.split(/([A-Za-z0-9.,:+\/-]+)/).filter(Boolean) : [normalized];
    let right = x + width;
    for (const run of runs) {
      const runWidth = doc.widthOfString(run, { features });
      right -= runWidth;
      doc.text(run, right, y, { lineBreak: false, features });
    }
  }

  function footer() {
    doc.moveTo(40, 777).lineTo(555, 777).lineWidth(0.6).stroke("#DDD4CB");
    text("ICS Fire Systems", 345, 790, 210, 9, true, muted, false);
    text(brand.email, 40, 790, 250, 9, false, muted, false);
  }

  doc.rect(0, 0, 595.28, 7).fill(accent);
  doc.image(logo, 467, 35, { fit: [88, 55], align: "right" });
  text(brand.name, 225, 37, 220, 17, true, ink, false);
  text("أنظمة مكافحة الحريق والسلامة الصناعية", 185, 64, 260, 10, false, muted);
  doc.moveTo(40, 112).lineTo(555, 112).lineWidth(0.6).stroke("#DDD4CB");

  text("عرض أسعار", 300, 132, 255, 30, true);
  text("معدات مكافحة الحريق", 300, 181, 255, 11, false, muted);
  text("رقم العرض", 40, 140, 200, 9, false, muted);
  text(reference, 40, 159, 200, 11, true, ink, false);
  text("تاريخ الإصدار", 40, 184, 200, 9, false, muted);
  text(new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Cairo",
  }).format(date), 40, 201, 200);

  if (samplePricing) {
    doc.roundedRect(40, 238, 515, 33, 4).fill("#F6EAE9");
    text("الأسعار استرشادية وتخضع لاعتماد الشركة.", 53, 243, 488, 10, true, accent);
  }

  text("الأسعار بالجنيه المصري", 40, 273, 515, 8, false, muted);
  let y = 292;
  function tableHeader() {
    doc.roundedRect(40, y, 515, 35, 3).fill(ink);
    text("المنتج", 312, y + 6, 230, 10, true, "#FFFFFF");
    text("الكمية", 260, y + 6, 42, 10, true, "#FFFFFF");
    text("سعر الوحدة", 154, y + 6, 94, 10, true, "#FFFFFF");
    text("الإجمالي", 52, y + 6, 90, 10, true, "#FFFFFF");
    y += 35;
  }
  tableHeader();

  const number = (value: number) => new Intl.NumberFormat("en-EG", {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(value);

  for (const [index, { product, quantity }] of lines.entries()) {
    if (y + 52 > 705) {
      footer();
      doc.addPage();
      y = 48;
      tableHeader();
    }
    if (index % 2 === 0) doc.rect(40, y, 515, 52).fill(paper);
    text(product.ar, 312, y + 8, 230, 9.8, true);
    text(product.id.toUpperCase(), 312, y + 31, 230, 8, false, muted, false);
    text(String(quantity), 260, y + 18, 42, 10, false, ink, false);
    text(number(product.price), 154, y + 18, 94, 10, false, ink, false);
    text(number(product.price * quantity), 52, y + 18, 90, 10, true, ink, false);
    doc.moveTo(40, y + 52).lineTo(555, y + 52).lineWidth(0.4).stroke("#E8E1DA");
    y += 52;
  }

  if (y + 108 > 760) {
    footer();
    doc.addPage();
    y = 48;
  }
  doc.roundedRect(40, y + 17, 515, 50, 4).fill(ink);
  text("إجمالي المنتجات", 315, y + 26, 228, 14, true, "#FFFFFF");
  text(number(quoteTotal(lines)), 53, y + 24, 205, 18, true, "#FFFFFF", false);
  text("جنيه مصري", 263, y + 32, 70, 9, false, "#E3D8CC");
  text("يرجى التواصل مع الشركة لتأكيد الضرائب والتوصيل وتوافر المنتجات.", 40, y + 81, 515, 9, false, muted);
  footer();
  doc.end();
  return result;
}

