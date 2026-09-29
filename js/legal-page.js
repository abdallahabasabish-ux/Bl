/* Renders a legal page from BLOG_LEGAL (body[data-legal]) — self-booting,
   independent of main.js boot order. */
"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const key = document.body.dataset.legal;
  const doc = (window.BLOG_LEGAL || {})[key];
  const box = document.getElementById("pageBox");
  if (!doc || !box) return;
  const esc = window.BlogMD.esc, L = o => window.AB.L(o);
  const lang = window.AB.lang;

  box.innerHTML = `
    <header class="page-head">
      <p class="kicker">${esc(L({ ar: "قانوني", en: "Legal" }))}</p>
      <h1>${esc(L(doc.title))}</h1>
      <p class="lead mono">${esc(L({ ar: "آخر تحديث", en: "Last updated" }))}:
        <time class="num" datetime="${doc.updated}">${doc.updated}</time></p>
    </header>
    <section class="section flush-top">
      <div class="legal-body">
        ${doc.sections.map(s => `
          <section>
            <h2>${esc(L(s.h))}</h2>
            ${(s.p[lang] || s.p.en).map(p => `<p>${esc(p)}</p>`).join("")}
          </section>`).join("")}
      </div>
    </section>`;
});
