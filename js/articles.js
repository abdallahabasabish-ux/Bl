"use strict";
window.AB = { lang: "ar", T(k){ const v = k.split(".").reduce((o,x)=>o&&o[x], UI_STR[AB.lang]);
  return typeof v === "string" ? v : k; }, L:o=>!o?"":(typeof o==="string"?o:(o[AB.lang]??o.en??o.ar??"")) };

(() => {
  const M = () => window.BLOG_MANIFEST || [];
  const byLang = () => M().filter(a => a.lang === AB.lang);
  const find = (slug, lang = AB.lang) => M().find(a => a.slug === slug && a.lang === lang) || null;
  const pair = slug => M().find(a => a.slug === slug && a.lang !== AB.lang) || null;
  const count = cat => byLang().filter(a => a.category === cat).length;
  const latest = (n = 6) => [...byLang()].sort((a,b)=>b.date.localeCompare(a.date)).slice(0, n);
  const featured = () => byLang().filter(a => a.featured).sort((a,b)=>b.date.localeCompare(a.date));

  const catOf = a => BLOG_CONFIG.categories.find(c => c.id === a.category) || { ar:"—", en:"—" };
  const artURL = (a, lang = a.lang) =>
    `${BLOG_CONFIG.siteBlogUrl}${lang === "en" ? "/en" : ""}/article/?u=${encodeURIComponent(a.slug)}`;

  const icon = (n,c="") => `<svg class="icon ${c}" aria-hidden="true" focusable="false"><use href="#i-${n}"></use></svg>`;
  const SPRITE = ["search","layout","coins","terminal","gauge","pen","compass","clock","calendar",
    "chevron","arrow","external","menu","close","mail","whatsapp","telegram","linkedin","github",
    "facebook","heart","report","edit","trash","check","user","link","share","top"].map(n =>
    `<symbol id="i-${n}" viewBox="0 0 24 24"></symbol>`).join("");

  function thumb(seed, label){
    return `<svg viewBox="0 0 640 400" role="img" aria-label="${window.BlogMD.esc(label)}" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="400" fill="#121216"/>
      ${Array.from({length:9},(_,i)=>`<line x1="${(i+1)*64}" y1="0" x2="${(i+1)*64}" y2="400" stroke="rgba(255,255,255,.05)"/>`).join("")}
      <path d="M0 ${250+(seed%3)*18} Q160 ${175-(seed%4)*15} 320 ${230+(seed%2)*18} T640 ${185+(seed%5)*14}" fill="none" stroke="#FF6600" stroke-width="2.5"/>
      <text x="36" y="352" font-family="monospace" font-size="28" fill="rgba(255,255,255,.2)">${String(seed+1).padStart(2,"0")}</text></svg>`;
  }

  function card(a, i = 0, variant = ""){
    const c = catOf(a), d = new Date(a.date),
      dt = d.toLocaleDateString(AB.lang === "ar" ? "ar" : "en", { year:"numeric", month:"short", day:"numeric" });
    return `
    <article class="post-card ${variant}">
      <a class="post-thumb" href="${artURL(a)}" aria-label="${window.BlogMD.esc(a.title)}">
        ${a.image ? `<img src="${window.BlogMD.esc(a.image)}" alt="${window.BlogMD.esc(a.imageAlt||a.title)}" loading="lazy">`
                  : thumb(i, a.title)}
      </a>
      <div class="post-body">
        <div class="post-meta"><span class="cat">${window.BlogMD.esc(AB.L(c))}</span>
          <time datetime="${a.date}">${dt}</time></div>
        <h3><a href="${artURL(a)}">${window.BlogMD.esc(a.title)}</a></h3>
        <p>${window.BlogMD.esc(a.description)}</p>
        <a class="btn-text" href="${artURL(a)}"><span>${AB.T("cta.read")}</span>${icon("arrow","icon-flip")}</a>
      </div>
    </article>`;
  }

  window.AB.art = { byLang, find, pair, count, latest, featured, catOf, artURL, card, icon, thumb, M };
  /* FIX: المستهلكون (pages/article-page/comments/archive/main) يستقبلون icon من
     window.AB مباشرة عند تحميلهم — يجب أن تكون موجودة هنا وقبلهم في ترتيب السكربتات */
  window.AB.icon = icon;
})();
