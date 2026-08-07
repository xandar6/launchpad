import assert from "node:assert/strict";
import test from "node:test";
import { saveEnquiry } from "../lib/enquiries.ts";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

function render(path = "/") {
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html", host: "localhost" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    DB: { prepare() { throw new Error("DB should not be used while rendering pages"); } },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders every public page", async () => {
  const pages = ["/", "/services", "/industries", "/packages", "/process", "/portfolio", "/about", "/quote"];
  for (const path of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, /Launchpad Web Solutions/i, path);
    assert.match(html, /href="\/quote"/, path);
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape|href="#"/, path);
  }
});

test("home includes essential production metadata and navigation", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /<title>Launchpad Web Solutions<\/title>/i);
  assert.match(html, /property="og:image"/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
  assert.match(html, /href="\/services"/i);
  assert.match(html, /href="\/portfolio"/i);
  assert.match(html, /href="\/about"/i);
});

test("quote page ships an accessible, labelled enquiry form", async () => {
  const response = await render("/quote");
  const html = await response.text();
  assert.match(html, /<form/i);
  assert.match(html, /name="email"/i);
  assert.match(html, /type="email"/i);
  assert.match(html, /name="message"/i);
  assert.match(html, /Send my enquiry/i);
  assert.doesNotMatch(html, /opens a pre-filled message|mailto:hello@launchpadweb\.com\.au\?subject/i);
  assert.match(html, /aria-live="polite"/i);
});

test("enquiry endpoint validates and stores a complete submission", async () => {
  let inserted;
  const DB = {
    prepare(sql) {
      assert.match(sql, /INSERT INTO enquiries/i);
      return {
        bind(...values) {
          inserted = values;
          return { run: async () => ({ success: true }) };
        },
      };
    },
  };
  const form = new FormData();
  form.set("name", "Ada Lovelace");
  form.set("business", "Analytical Engines");
  form.set("email", "ADA@example.com");
  form.set("phone", "0400 000 000");
  form.set("project", "Custom web solution");
  form.set("budget", "$20,000+");
  form.set("message", "We need a clear project dashboard.");

  const response = await saveEnquiry(new Request("http://localhost/api/enquiries", { method: "POST", body: form }), DB);

  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(inserted, [
    "Ada Lovelace",
    "Analytical Engines",
    "ada@example.com",
    "0400 000 000",
    "Custom web solution",
    "$20,000+",
    "We need a clear project dashboard.",
  ]);
});
