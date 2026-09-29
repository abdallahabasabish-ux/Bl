#!/usr/bin/env node
/* ============================================================
   Blog — content generator (zero dependencies · Node 18+)
   Reads content/{ar,en}/*.md → validates front matter → writes:
     content/manifest.js · sitemap.xml · feed.xml · feed-en.xml
   Source of truth: the .md front matter.
   Site URL & categories are read from js/config.js — no duplication.
   Exit 1 on ANY invalid article → CI fails loudly before deploy.
   Run: node scripts/generate.mjs   (أو اترك الـ workflow يفعلها)
   ============================================================ */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* --- إعدادات تُقرأ من js/config.js (مصدر واحد) ---------------- */
const cfg = readFileSync(join(ROOT, "js", "config.js"), "utf8");
const SITE  = /siteBlogUrl\s*:\s*"([^"]+)"/.exec(cfg)?.[1];
const BRAND = /brandName\s*:\s*"([^"]+)"/.exec(cfg)?.[1] || "Abdallah Abas";
if (!SITE) { console.error("[gen] siteBlogUrl missing in js/config.js"); process.exit(1); }

const CATEGORIES = [];
let inCats = false;
for (const line of cfg.split("\n")) {
  if (/categories\s*:\s*\[/.test(line)) { inCats = true; continue; }
  if (inCats) {
    if (/^\s*\]\s*,?\s*$/.test(line)) break;
    const m = /id:\s*"([^"]+)"/.exec(line);
    if (m) CATEGORIES.push(m[1]);
  }
}
const AUTHORS = { ar: "عبدالله عباس", en: "Abdallah Abas" }; // يُتجاوزان بحقل author

/* --- محلل front matter (نفس subset محلل المتصفح حرفيًا) ------ */
function parseFront(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const km = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (!km) continue;
    let v = km[2].trim();
    if (/^["'].*["']$/.test(v)) v = v.slice(1, -1);
    else if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(",").map(s => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    else if (v === "true") v = true;
    else if (v === "false") v = false;
    meta[km[1]] = v;
  }
  return { meta, body: text.slice(m[0].length) };
}

/* --- جمع المقالات والتحقق ------------------------------------- */
const LANGS = ["ar", "en"];
const DATE_RX = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const articles = [], errors = [], warnings = [];

for (const lang of LANGS) {
  let files = [];
  try { files = readdirSync(join(ROOT, "content", lang)).filter(f => f.endsWith(".md")); }
  catch { warnings.push(`content/${lang}/ folder missing — skipped`); continue; }

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const where = `${lang}/${file}`;
    if (!SLUG_RX.test(slug)) { errors.push(`${where}: slug "${slug}" must be lowercase-kebab`); continue; }
    const { meta, body } = parseFront(readFileSync(join(ROOT, "content", lang, file), "utf8"));

    for (const f of ["title", "description", "date", "category"])
      if (!meta[f]) errors.push(`${where}: missing front-matter field "${f}"`);
    if (meta.date && !DATE_RX.test(String(meta.date))) errors.push(`${where}: "date" must be YYYY-MM-DD`);
    if (meta.updatedAt && !DATE_RX.test(String(meta.updatedAt))) errors.push(`${where}: "updatedAt" must be YYYY-MM-DD`);
    if (meta.category && !CATEGORIES.includes(meta.category))
      errors.push(`${where}: unknown category "${meta.category}" (allowed: ${CATEGORIES.join(", ")})`);
    if (meta.language && meta.language !== lang) warnings.push(`${where}: front-matter language "${meta.language}" != folder "${lang}" (folder wins)`);
    if (errors.some(e => e.startsWith(where))) continue;

    articles.push({
      slug, lang,
      category: String(meta.category),
      featured: meta.featured === true,
      demo: meta.demo === true || /DEMO CONTENT/.test(body),
      title: String(meta.title),
      description: String(meta.description),
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      date: String(meta.date),
      updated: String(meta.updatedAt || meta.date),
      author: String(meta.author || AUTHORS[lang]),
      image: String(meta.featuredImage || ""),
      imageAlt: String(meta.imageAlt || meta.title),
      keywords: Array.isArray(meta.keywords) ? meta.keywords : []
    });
  }
}

/* ازدواجية + أزواج الترجمة */
const seen = new Set();
for (const a of articles) {
  const k = `${a.lang}:${a.slug}`;
  if (seen.has(k)) errors.push(`duplicate article: ${k}`);
  seen.add(k);
}
for (const a of articles)
  if (!articles.some(b => b.slug === a.slug && b.lang !== a.lang))
    warnings.push(`"${a.slug}" (${a.lang}) has no ${a.lang === "ar" ? "en" : "ar"} pair — hreflang one-way only`);

/* --- التوليد --------------------------------------------------- */
const x = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const today = new Date().toISOString().slice(0, 10);
const artLoc = a => a.lang === "en" ? `${SITE}/en/article/?u=${a.slug}` : `${SITE}/article/?u=${a.slug}`;

/* manifest.js */
articles.sort((a, b) => a.lang.localeCompare(b.lang) || b.date.localeCompare(a.date));
writeFileSync(join(ROOT, "content", "manifest.js"),
  `/* AUTO-GENERATED by scripts/generate.mjs — لا تعدّله يدويًا.\n` +
  `   مصدر الحقيقة: content/{ar,en}/*.md front matter. */\n` +
  `"use strict";\nwindow.BLOG_MANIFEST = ` + JSON.stringify(articles, null, 2) + `;\n`);

/* sitemap.xml — مع hreflang عبر xhtml:link لأزواج المقالات */
const STATIC = ["", "/articles/", "/services/", "/works/", "/about/", "/contact/"];
let urls = "";
for (const p of STATIC) {
  urls += `  <url><loc>${x(p === "" ? SITE + "/" : SITE + p)}</loc><lastmod>${today}</lastmod></url>\n`;
  urls += `  <url><loc>${x(SITE + "/en" + p)}</loc><lastmod>${today}</lastmod></url>\n`;
}
for (const a of articles) {
  const pair = articles.find(b => b.slug === a.slug && b.lang !== a.lang);
  const alt = pair ? `<xhtml:link rel="alternate" hreflang="${pair.lang}" href="${x(artLoc(pair))}"/>` : "";
  urls += `  <url><loc>${x(artLoc(a))}</loc><lastmod>${a.updated}</lastmod>${alt}</url>\n`;
}
writeFileSync(join(ROOT, "sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
 ${urls}</urlset>\n`);

/* feed.xml (عربي) + feed-en.xml */
const rfc = d => new Date(d + "T09:00:00Z").toUTCString();
function rss(lang) {
  const items = articles.filter(a => a.lang === lang).map(a => `    <item>
      <title>${x(a.title)}</title>
      <link>${x(artLoc(a))}</link>
      <guid isPermaLink="true">${x(artLoc(a))}</guid>
      <pubDate>${rfc(a.date)}</pubDate>
      <description>${x(a.description)}</description>
    </item>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${x(BRAND)} — ${lang === "ar" ? "المدونة" : "Blog"}</title>
    <link>${lang === "ar" ? SITE + "/" : SITE + "/en/"}</link>
    <atom:link href="${SITE}/feed${lang === "en" ? "-en" : ""}.xml" rel="self" type="application/rss+xml"/>
    <description>${lang === "ar" ? "شروحات وتجارب من داخل العمل" : "Guides and experiments from inside the work"}</description>
    <language>${lang}</language>
 ${items}
  </channel>
</rss>\n`;
}
writeFileSync(join(ROOT, "feed.xml"), rss("ar"));
writeFileSync(join(ROOT, "feed-en.xml"), rss("en"));

/* --- التقرير ---------------------------------------------------- */
const ar = articles.filter(a => a.lang === "ar").length;
console.log(`[gen] ${articles.length} مقالات (${ar} ar / ${articles.length - ar} en)`);
warnings.forEach(w => console.warn("[gen][warn] ", w));
if (errors.length) {
  errors.forEach(e => console.error("[gen][ERROR]", e));
  console.error(`[gen] ${errors.length} خطأ — أصلحه ثم أعد المحاولة. لم يُرفع شيء.`);
  process.exit(1);
}
console.log("[gen] ✓ content/manifest.js · sitemap.xml · feed.xml · feed-en.xml");
