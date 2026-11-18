import { randomBytes } from "node:crypto";
import { maxQuantity, products, quoteLines } from "@/lib/catalog";
import { createQuotePdf } from "@/lib/quote-pdf";

export async function POST(request: Request) {
  const input: unknown = await request.json().catch(() => null);
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return Response.json({ error: "Invalid quantities" }, { status: 400 });
  }
  const entries = Object.entries(input);
  if (entries.some(([id, quantity]) => !products.some((product) => product.id === id) ||
    !Number.isInteger(quantity) || quantity < 0 || quantity > maxQuantity)) {
    return Response.json({ error: "Invalid quantities" }, { status: 400 });
  }
  const lines = quoteLines(input);
  if (!lines.length) return Response.json({ error: "Select equipment first" }, { status: 400 });

  const reference = "ICS-" + randomBytes(4).toString("hex").toUpperCase();
  const pdf = await createQuotePdf(lines, new Date(), reference);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="ICS-Quotation-AR.pdf"',
      "Cache-Control": "no-store",
    },
  });
}

