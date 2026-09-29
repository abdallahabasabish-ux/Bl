/* ============================================================
   Blog — articles.js · manifest access + card renderers
   · window.AB namespace (T / L) + icon() — exposed on window.AB
     (consumers destructure it at load time)
   · REAL SVG icon paths + sprite injection into <body>
     (previous version had empty symbols and no injection)
   ============================================================ */
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

  /* ---- icon factory + real sprite ------------------------------ */
  const icon = (n,c="") => `<svg class="icon ${c}" aria-hidden="true" focusable="false"><use href="#i-${n}"></use></svg>`;
  const STROKE = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const FILL   = 'fill="currentColor" stroke="none"';
  const ICONS = {
    search:`<circle cx="11" cy="11" r="6.5" ${STROKE}/><path d="M20.5 20.5l-4.3-4.3" ${STROKE}/>`,
    layout:`<rect x="3" y="4" width="18" height="16" rx="2" ${STROKE}/><path d="M3 9h18M7.5 13.5h9" ${STROKE}/>`,
    coins:`<circle cx="12" cy="12" r="8.5" ${STROKE}/><path d="M12 7.2v9.6M14.6 9.3c-.5-.8-1.5-1.3-2.6-1.3-1.6 0-2.8.9-2.8 2s1.2 1.7 2.8 2 2.8.9 2.8 2-1.2 2-2.8 2c-1.1 0-2.1-.5-2.6-1.3" ${STROKE}/>`,
    terminal:`<rect x="3" y="4" width="18" height="16" rx="2" ${STROKE}/><path d="M7 9l3.2 3L7 15M13 15.5h4" ${STROKE}/>`,
    gauge:`<path d="M4.5 15.5a8 8 0 1115 0" ${STROKE}/><path d="M12 15.5l4-4.5" ${STROKE}/><circle cx="12" cy="15.5" r="1.3" ${STROKE}/>`,
    pen:`<path d="M12 20.5h9" ${STROKE}/><path d="M16.6 3.6a2.05 2.05 0 013 3L7 19l-4 1 1-4z" ${STROKE}/>`,
    compass:`<circle cx="12" cy="12" r="9" ${STROKE}/><path d="M15.2 8.8l-1.7 4.7-4.7 1.7 1.7-4.7z" ${STROKE}/>`,
    clock:`<circle cx="12" cy="12" r="8.5" ${STROKE}/><path d="M12 7.5V12l3 2" ${STROKE}/>`,
    calendar:`<rect x="3.5" y="5" width="17" height="15.5" rx="2" ${STROKE}/><path d="M3.5 9.5h17M8 3v4M16 3v4" ${STROKE}/>`,
    chevron:`<path d="M6 9.5l6 6 6-6" ${STROKE}/>`,
    arrow:`<path d="M4 12h15M13.5 5.5l6.5 6.5-6.5 6.5" ${STROKE}/>`,
    external:`<path d="M14 4h6v6M20 4L10.5 13.5M18 13.5V20H4.5V6.5H11" ${STROKE}/>`,
    menu:`<path d="M4 7h16M4 12h16M4 17h16" ${STROKE}/>`,
    close:`<path d="M6 6l12 12M18 6L6 18" ${STROKE}/>`,
    mail:`<rect x="3" y="5" width="18" height="14" rx="2" ${STROKE}/><path d="M3.5 7.5l8.5 5.5 8.5-5.5" ${STROKE}/>`,
    whatsapp:`<path ${FILL} d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a6.7 6.7 0 01-2-1.2 7.4 7.4 0 01-1.4-1.7c-.1-.3 0-.4.1-.6l.4-.5c.1-.1.2-.3.2-.4a.4.4 0 000-.3c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 00-.7.3A2.9 2.9 0 006.7 10a5 5 0 001 2.7 11.4 11.4 0 004.4 3.9 5 5 0 003.1.7 2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.6-.3z"/>`,
    telegram:`<path ${FILL} d="M21.5 4.2 18.6 19a1 1 0 01-1.6.6l-3.9-2.9-2 1.9a1 1 0 01-1.6-.4l-1.3-4.2-4-1.3a1 1 0 010-1.9L19.9 3a1 1 0 011.6 1.2zM17 7.5l-8 5.4 1 3 .4-2.8z"/>`,
    linkedin:`<rect x="3" y="3" width="18" height="18" rx="2.5" ${STROKE}/><path d="M8 10.5V17M8 7.2v.1M12 17v-3.8a2.2 2.2 0 014.4 0V17" ${STROKE}/>`,
    github:`<path ${FILL} d="M12 .5A11.5 11.5 0 00.5 12a11.5 11.5 0 007.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7a4.5 4.5 0 011.2-3.1 4.2 4.2 0 01.1-3s1-.3 3.3 1.2a11 11 0 015.8 0c2.3-1.5 3.3-1.2 3.3-1.2a4.2 4.2 0 01.1 3 4.5 4.5 0 011.2 3.1c0 4.5-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0023.5 12 11.5 11.5 0 0012 .5z"/>`,
    facebook:`<path ${FILL} d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9a18 18 0 00-2-.1c-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7z"/>`,
    heart:`<path ${FILL} d="M12 20.8C7 16.9 3.5 13.6 3.5 9.9 3.5 7.2 5.6 5 8.2 5c1.5 0 3 .8 3.8 2 .8-1.2 2.3-2 3.8-2 2.6 0 4.7 2.2 4.7 4.9 0 3.7-3.5 7-8.5 10.9z"/>`,
    report:`<path d="M5 21V4m0 0h11l-2.2 3.5L16 11H5" ${STROKE}/>`,
    edit:`<path d="M12 20.5h9" ${STROKE}/><path d="M16.6 3.6a2.05 2.05 0 013 3L7 19l-4 1 1-4z" ${STROKE}/>`,
    trash:`<path d="M4.5 7h15M9.5 7V4.8h5V7M7 7l1 13h8l1-13M10 10.5v6M14 10.5v6" ${STROKE}/>`,
    check:`<path d="M4.5 12.5l5 5 10-11" ${STROKE}/>`,
    user:`<circle cx="12" cy="8.2" r="3.7" ${STROKE}/><path d="M4.8 20c1.4-3 4-4.6 7.2-4.6s5.8 1.6 7.2 4.6" ${STROKE}/>`,
    link:`<path d="M9.5 14.5l5-5M8 12l-2.3 2.3a3.5 3.5 0 105 5L13 17M16 12l2.3-2.3a3.5 3.5 0 10-5-5L11 7" ${STROKE}/>`,
    share:`<circle cx="6" cy="12" r="2.3" ${STROKE}/><circle cx="17.5" cy="5.5" r="2.3" ${STROKE}/><circle cx="17.5" cy="18.5" r="2.3" ${STROKE}/><path d="M8.1 10.9l7.3-4.3M8.1 13.1l7.3 4.3" ${STROKE}/>`,
    top:`<path d="M12 19V5M6 11l6-6 6 6" ${STROKE}/>`,
    sun:`<circle cx="12" cy="12" r="4" ${STROKE}/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4L19 19M19 5l-1.6 1.6M6.6 17.4L5 19" ${STROKE}/>`,
    moon:`<path ${FILL} d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"/>`
  };
  /* حقن السبرايت — defer يضمن وجود body قبل التنفيذ */
  document.body.insertAdjacentHTML("afterbegin",
    `<svg style="display:none" aria-hidden="true">` +
    Object.entries(ICONS).map(([n,b])=>`<symbol id="i-${n}" viewBox="0 0 24 24">${b}</symbol>`).join("") +
    `</svg>`);

  /* ---- generated thumbnail (no broken images, ever) ------------- */
  function thumb(seed, label){
    return `<svg viewBox="0 0 640 400" role="img" aria-label="${window.BlogMD.esc(label)}" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="400" fill="#121216"/>
      ${Array.from({length:9},(_,i)=>`<line x1="${(i+1)*64}" y1="0" x2="${(i+1)*64}" y2="400" stroke="rgba(255,255,255,.05)"/>`).join("")}
      <path d="M0 ${250+(seed%3)*18} Q160 ${175-(seed%4)*15} 320 ${230+(seed%2)*18} T640 ${185+(seed%5)*14}" fill="none" stroke="#FF6600" stroke-width="2.5"/>
      <text x="36" y="352" font-family="monospace" font-size="28" fill="rgba(255,255,255,.2)">${String(seed+1).padStart(2,"0")}</text></svg>`;
  }

  /* ---- article card --------------------------------------------- */
  function card(a, i = 0, variant = ""){
    const c = catOf(a);
    const dt = new Date(a.date).toLocaleDateString(AB.lang === "ar" ? "ar" : "en",
      { year:"numeric", month:"short", day:"numeric" });
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
  /* Consumers (pages/article-page/comments/archive/main) receive icon
     from window.AB at load time — it must exist HERE, before them. */
  window.AB.icon = icon;
})();
