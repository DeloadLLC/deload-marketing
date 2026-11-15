#!/usr/bin/env node
// Visual check of the built home page (dist/), for the home story work.
//
//   pnpm build && node scripts/shoot-home.mjs <out-dir> [label]
//
// For 390, 820 and 1280 px, light and dark, with reduced motion, it saves the
// first screen and the full page as PNGs in <out-dir> (never in the repo),
// named <label>-<width>-<theme>-{top,full}.png, and checks:
//   - no horizontal scroll;
//   - the H1 doesn't overflow and its last line isn't a single word;
//   - links and buttons in the page are at least 44 px tall (links inside a
//     sentence are reported, not failed);
//   - every [data-reveal] block and every image frame is visible.
// Exits non-zero on a failure. Playwright comes from the project if it's
// installed, or from the global install.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execSync, execFileSync } from "node:child_process";
import os from "node:os";
import crypto from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const out = process.argv[2];
const label = process.argv[3] ?? "home";
if (!out) {
  console.error("usage: node scripts/shoot-home.mjs <out-dir> [label]");
  process.exit(2);
}
if (path.resolve(out).startsWith(root + path.sep)) {
  console.error("shoot-home: write the shots outside the repo");
  process.exit(2);
}
fs.mkdirSync(out, { recursive: true });

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    const g = execSync("npm root -g").toString().trim();
    return await import(pathToFileURL(path.join(g, "playwright", "index.mjs")).href);
  }
}
const { chromium } = await loadPlaywright();

// A static server for dist/.
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain", ".ico": "image/x-icon" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(dist, p);
  if (!file.startsWith(dist)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const fontCache = path.join(os.tmpdir(), "deload-shoot-home-fonts");
fs.mkdirSync(fontCache, { recursive: true });
function font(url) {
  const file = path.join(fontCache, crypto.createHash("sha1").update(url).digest("hex"));
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, execFileSync("curl", ["-sSfL", "-A", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36", url], { maxBuffer: 64 << 20 }));
  }
  return fs.readFileSync(file);
}

const WIDTHS = [390, 820, 1280];
const THEMES = ["light", "dark"];
const failures = [];
const notes = [];

const browser = await chromium.launch({ args: ["--disable-dev-shm-usage", "--disable-gpu"] });
try {
  for (const width of WIDTHS) {
    for (const theme of THEMES) {
      const tag = `${label}-${width}-${theme}`;
      const ctx = await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce" });
      // Google Fonts are fetched once with curl (it honours HTTPS_PROXY, which
      // the browser may not reach) and cached; every other outside request
      // (the testimonials API) is dropped, so the page shows its fallback.
      await ctx.route((u) => !u.href.startsWith(base), async (r) => {
        const u = r.request().url();
        if (!/fonts\.(googleapis|gstatic)\.com/.test(u)) return r.abort();
        try {
          await r.fulfill({ status: 200, body: font(u), contentType: u.includes("googleapis") ? "text/css" : "font/woff2", headers: { "access-control-allow-origin": "*" } });
        } catch {
          await r.abort();
        }
      });
      const page = await ctx.newPage();
      await page.goto(`${base}/`, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      // Lazy images: scroll through once so every frame loads.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        window.scrollTo(0, 0);
      });
      // Every product shot must have loaded and decoded before the shots are
      // taken; one that hasn't within 20 s fails the run.
      const pending = await page.evaluate(async () => {
        const imgs = [...document.querySelectorAll(".shot img")];
        const ok = (img) => img.complete && img.naturalWidth > 0;
        const deadline = Date.now() + 20000;
        for (const img of imgs) {
          img.loading = "eager";
          while (!ok(img) && Date.now() < deadline) await new Promise((r) => setTimeout(r, 100));
          if (ok(img)) await img.decode().catch(() => {});
        }
        window.scrollTo(0, 0);
        return imgs.filter((img) => !ok(img)).map((img) => img.currentSrc || img.src);
      });
      for (const src of pending) failures.push(`${tag}: image not loaded: ${src}`);
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(out, `${tag}-top.png`) });
      await page.screenshot({ path: path.join(out, `${tag}-full.png`), fullPage: true });

      const r = await page.evaluate(() => {
        const doc = document.documentElement;
        const h1 = document.querySelector("h1");
        // The H1's lines, from each word's box.
        const lines = [];
        if (h1) {
          const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
          for (let n; (n = walker.nextNode()); ) {
            const re = /\S+/g;
            for (let m; (m = re.exec(n.nodeValue)); ) {
              const range = document.createRange();
              range.setStart(n, m.index);
              range.setEnd(n, m.index + m[0].length);
              const top = Math.round(range.getBoundingClientRect().top);
              const line = lines.find((l) => Math.abs(l.top - top) < 4);
              if (line) line.words.push(m[0]); else lines.push({ top, words: [m[0]] });
            }
          }
        }
        const h1Box = h1?.getBoundingClientRect();
        const small = [];
        for (const el of document.querySelectorAll("main a, main button, header a, header button")) {
          const b = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (!b.width || style.visibility === "hidden" || el.closest(".sr-only")) continue;
          if (b.height < 44 - 0.5) {
            const inline = style.display === "inline" && el.parentElement && /^(P|LI|SPAN)$/.test(el.parentElement.tagName);
            small.push({ text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40), h: Math.round(b.height), inline });
          }
        }
        const hidden = [];
        for (const el of document.querySelectorAll("[data-reveal], .shot")) {
          const s = getComputedStyle(el);
          const b = el.getBoundingClientRect();
          if (s.opacity === "0" || s.visibility === "hidden" || b.height < 10) hidden.push(el.className || el.tagName);
        }
        return {
          scrollW: doc.scrollWidth,
          innerW: window.innerWidth,
          h1Lines: lines.sort((a, b) => a.top - b.top).map((l) => l.words.join(" ")),
          h1Over: h1Box ? h1Box.right > window.innerWidth + 0.5 || h1.scrollWidth > h1.clientWidth + 1 : false,
          small,
          hidden,
        };
      });

      if (r.scrollW > r.innerW) failures.push(`${tag}: horizontal scroll (${r.scrollW} > ${r.innerW})`);
      if (r.h1Over) failures.push(`${tag}: the H1 overflows`);
      const last = r.h1Lines.at(-1) ?? "";
      if (r.h1Lines.length > 1 && last.split(" ").length < 2) failures.push(`${tag}: the H1 leaves "${last}" alone on its last line`);
      for (const s of r.small) (s.inline ? notes : failures).push(`${tag}: ${s.inline ? "inline link" : "target"} "${s.text}" is ${s.h}px tall`);
      for (const h of r.hidden) failures.push(`${tag}: not visible with motion off: ${h}`);
      console.log(`${tag}: H1 in ${r.h1Lines.length} lines: ${r.h1Lines.map((l) => `[${l}]`).join(" ")}`);
      await ctx.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

for (const n of notes) console.log(`note: ${n}`);
if (failures.length) {
  console.error(`shoot-home (${label}): ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`shoot-home (${label}): ${WIDTHS.length * THEMES.length * 2} shots in ${out}, all checks pass`);
