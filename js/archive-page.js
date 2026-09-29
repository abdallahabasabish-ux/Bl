/* Renders the date archive (body[data-page="archive"]) — current language,
   grouped by year, newest first. Self-booting. */
"use strict";
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page !== "archive") return;
  const box = document.getElementById("archiveBox");
  if (!box || !window.AB || !window.BLOG_MANIFEST) return;
  const { art, icon } = window.AB, esc = window.BlogMD.esc, L = o => AB.L(o);
  const list = art.byLang().sort((a, b) => b.date.localeCompare(a.date));
  const P = p => (AB.lang === "en" ? "/en" : "") + p;
  const fmt = d => new Date(d).toLocaleDateString(AB.lang === "ar" ? "ar" : "en", { month: "long", day: "numeric" });

  const byYear = new Map();
  list.forEach(a => {
    const y = a.date.slice(0, 4);
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y).push(a);
  });

  box.innerHTML = `
    <header class="page-head">
      <p class="kicker">${esc(L({ ar: "أرشيف", en: "Archive" }))}</p>
      <h1>${esc(L({ ar: "الأرشيف الزمني", en: "Archive by date" }))}</h1>
      <p class="lead">${esc(L({
        ar: "كل مقالات المدونة العربية مرتبة من الأحدث إلى الأقدم، مجمّعة بالسنة.",
        en: "All English articles, newest first, grouped by year." }))}</p>
    </header>
    <section class="section flush-top">
      ${list.length === 0 ? `
        <div class="empty"><p>${esc(L({
          ar: "سيُبنى الأرشيف مع نشر المقالات — لا يُعرض شيء قبل أن يكون حقيقيًا.",
          en: "The archive will build as articles are published — nothing is shown before it is real." }))}</p></div>`
      : [...byYear.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([year, items]) => `
        <section class="arch-year">
          <h2><span class="num">${esc(year)}</span>
            <span class="arch-count num">${items.length}</span></h2>
          <ul class="arch-list">
            ${items.map(a => `
              <li class="arch-item">
                <time class="mono num" datetime="${a.date}">${esc(fmt(a.date))}</time>
                <a class="t" href="${art.artURL(a)}">${esc(a.title)}</a>
                ${a.demo ? `<span class="badge-demo">${esc(AB.T("art.demo"))}</span>` : ""}
                <a class="arch-cat" href="${P("/articles/")}?cat=${a.category}">${esc(L(art.catOf(a)))}</a>
              </li>`).join("")}
          </ul>
        </section>`).join("")}
      <p class="sec-foot"><a class="btn-text" href="${P("/articles/")}">
        <span>${esc(L({ ar: "تصفّح حسب القسم", en: "Browse by category" }))}</span>
        ${icon("arrow", "icon-flip")}</a></p>
    </section>`;
});
