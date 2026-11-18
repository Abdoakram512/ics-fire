import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://127.0.0.1:3000";

for (const path of ["/", "/products", "/products/ics-p06", "/assets/ics-logo.png"]) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  const type = path.endsWith(".png") ? "image/png" : "text/html";
  assert.ok(response.headers.get("content-type")?.startsWith(type), path);
  if (path === "/") {
    assert.match(await response.text(), /ICS Fire Systems/);
  }
}

function requestQuote(quantities) {
  return fetch(new URL("/api/quote", base), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quantities),
  });
}

const quote = await requestQuote({ "ics-p06": 2 });
assert.equal(quote.status, 200);
assert.equal(quote.headers.get("content-type"), "application/pdf");
assert.match(quote.headers.get("content-disposition") ?? "", /ICS-Quotation-AR\.pdf/);
const bytes = Buffer.from(await quote.arrayBuffer());
assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
assert.match(bytes.subarray(-32).toString(), /%%EOF\s*$/);
assert.equal((await requestQuote({ "ics-p06": -1 })).status, 400);

console.log("Homepage, catalog, product, logo, PDF download, and input validation passed.");
