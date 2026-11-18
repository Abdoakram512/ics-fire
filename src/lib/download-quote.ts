import type { Quantities } from "./catalog";

export async function downloadQuotePdf(quantities: Quantities): Promise<void> {
  const response = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quantities),
  });
  if (!response.ok || !response.headers.get("content-type")?.startsWith("application/pdf")) {
    throw new Error("PDF unavailable");
  }
  const url = URL.createObjectURL(await response.blob());
  const link = document.createElement("a");
  link.href = url;
  link.download = "ICS-Quotation-AR.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
