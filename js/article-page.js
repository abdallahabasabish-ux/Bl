"use strict";
(() => {
  const { esc } = window.BlogMD, { art, icon } = window.AB;

  const timeAgo = d => {
    const s = (Date.now() - d) / 1000, L = UI_STR[AB.lang].comments;
    const u = [[31536000,"سنة","year"],[2592000,"شهر","month"],[604800,"أسبوع","week"],
               [86400,"يوم","day"],[3600,"ساعة","hour"],[60,"دقيقة","minute"]];
    for (const [sec, ar, en] of u){ if (s >= sec){ const n = Math.floor(s/sec);
      return AB.lang === "ar" ? `قبل ${n} ${ar}${n>2?(ar==="شهر"?"أشهر":ar==="سنة"?"سنوات":ar==="يوم"?"أيام":ar==="ساعة"?"ساعات":ar==="دقيقة"?"دقائق":""):""}`
                              : `${n} ${en}${n>1?"s":""} ago`; } }
    return AB.lang === "ar" ? "الآن" : "just now";
  };

  function readingTime(text){
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / (AB.lang === "ar" ? 180 : 220)));
  }

  function adSlot(pos){
    const a = BLOG_CONFIG.adsense;
    if (!a.enabled || !a.client || !a.slots[pos]) return "";
    return `<div class="ad-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="${esc(a.client)}" data-ad-slot="${esc(a.slots[pos])}" data-ad-format="auto" data-full-width-responsive="true"></ins></div>`;
  }

  function render404(box){
    box.innerHTML = `<div class="empty"><h2>${AB.T("art.notFound")}</h2>
      <p>${AB.T("art.notFoundSub")}</p>
      <div class="hero-cta"><a class="btn btn-solid" href="${AB.lang==="en"?"/en":""}/articles/">${AB.T("cta.articles")}</a>
      <a class="btn btn-ghost" href="${AB.lang==="en"?"/en":""}/">${AB.T("cta.back")}</a></div></div>`;
  }

  async function boot(){
    const box = $("#articleBox"); if (!box) return;
    const slug = new URLSearchParams(location.search).get("u") || "";
    const a = art.find(slug);
    if (!a){ render404(box); return; }

    let md = "";
    try {
      const r = await fetch(`/content/${a.lang}/${a.slug}.md`, { cache: "no-cache" });
      if (!r.ok) throw 0;
      md = await r.text();
    } catch (e) { render404(box); return; }

    const { meta, body } = window.BlogMD.parseFront(md);
    const html = window.BlogMD.render(body);
    const mins = readingTime(window.BlogMD.strip(body));
    const c = art.catOf(a), dt = new Date(a.date)
      .toLocaleDateString(AB.lang==="ar"?"ar":"en",{year:"numeric",month:"long",day:"numeric"});
    const upd = a.updated && a.updated !== a.date
      ? new Date(a.updated).toLocaleDateString(AB.lang==="ar"?"ar":"en",{year:"numeric",month:"long",day:"numeric"}) : null;
    const enPair = art.pair(a.slug);

    /* canonical + hreflang + meta ديناميكيًا (Google يصيّر JS) */
    const setLink = (rel, attrs) => { const l = document.createElement("link");
      l.rel = rel; Object.entries(attrs).forEach(([k,v])=>l.setAttribute(k,v)); document.head.appendChild(l); };
    setLink("canonical", { href: art.artURL(a) });
    setLink("alternate", { hreflang: a.lang, href: art.artURL(a) });
    if (enPair) setLink("alternate", { hreflang: enPair.lang, href: art.artURL(enPair) });
    const other = AB.lang === "ar" ? "en" : "ar";
    setLink("alternate", { hreflang: other, href: `${BLOG_CONFIG.siteBlogUrl}${other==="en"?"/en":""}/article/?u=${encodeURIComponent(a.slug)}` });
    document.title = `${a.title} — ${BLOG_CONFIG.brandName}`;
    const md1 = document.querySelector('meta[name="description"]'); if (md1) md1.setAttribute("content", a.description);

    const schema = { "@context":"https://schema.org", "@type":"BlogPosting",
      headline: a.title, description: a.description,
      datePublished: a.date, dateModified: a.updated || a.date,
      inLanguage: a.lang, keywords: (a.keywords||[]).join(", "),
      mainEntityOfPage: { "@type":"WebPage", "@id": art.artURL(a) },
      author: { "@type":"Person", name: BLOG_CONFIG.author.name[AB.lang],
        url: BLOG_CONFIG.mainSiteUrl },
      publisher: { "@type":"Person", name: BLOG_CONFIG.brandName } };
    const sc = document.createElement("script"); sc.type = "application/ld+json";
    sc.textContent = JSON.stringify(schema); document.head.appendChild(sc);

    box.innerHTML = `
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="${AB.lang==="en"?"/en":""}/">${AB.T("nav.home")}</a>${icon("chevron","crumb-sep")}
      <a href="${AB.lang==="en"?"/en":""}/articles/">${AB.T("nav.articles")}</a>${icon("chevron","crumb-sep")}
      <span aria-current="page">${esc(a.title)}</span></nav>

    <header class="art-head">
      <div class="post-meta"><a class="cat" href="${AB.lang==="en"?"/en":""}/articles/?cat=${c.id}">${esc(AB.L(c))}</a>
        ${a.demo ? `<span class="badge-demo">${AB.T("art.demo")}</span>` : ""}</div>
      <h1>${esc(a.title)}</h1>
      <p class="art-desc">${esc(a.description)}</p>
      <div class="art-info mono">
        <span>${icon("user")} ${esc(a.author || BLOG_CONFIG.author.name[AB.lang])}</span>
        <span>${icon("calendar")} <time datetime="${a.date}">${dt}</time></span>
        ${upd ? `<span>${icon("clock")} ${AB.T("art.updated")}: <time datetime="${a.updated}">${upd}</time></span>` : ""}
        <span>${icon("clock")} ${mins} ${AB.T("art.min")}</span>
      </div>
      <div class="art-actions">
        <button type="button" class="btn-text" id="shareBtn">${icon("share")}<span>${AB.T("art.share")}</span></button>
        <button type="button" class="btn-text" id="copyBtn">${icon("link")}<span>${AB.T("art.copy")}</span></button>
      </div>
    </header>

    ${a.image ? `<figure class="art-hero"><img src="${esc(a.image)}" alt="${esc(a.imageAlt||a.title)}">
      </figure>` : ""}
    ${adSlot("inArticle1")}

    <div class="art-layout">
      <article class="prose" id="prose">${html}</article>
      <aside class="toc-side" aria-label="${AB.T("art.toc")}">
        <div class="toc-box"><h2>${AB.T("art.toc")}</h2><nav id="tocNav"></nav></div>
      </aside>
    </div>

    ${adSlot("inArticle2")}

    <section class="art-cta">
      <h2>${AB.T("cta.request")}</h2>
      <p>${AB.T("misc.tagline")}</p>
      <a class="btn btn-solid" href="${AB.lang==="en"?"/en":""}/contact/">${AB.T("cta.request")}</a>
    </section>

    <section class="related"><h2>${AB.T("art.related")}</h2>
      <div class="cards-grid cols-3">${art.byLang().filter(x=>x.category===a.category && x.slug!==a.slug)
        .slice(0,3).map((x,i)=>art.card(x,i)).join("")}</div></section>

    <section class="comments" id="comments" data-key="${esc(a.lang+":"+a.slug)}"></section>`;

    /* TOC من h2/h3 */
    const hs = $$("#prose h2, #prose h3"), nav = $("#tocNav");
    if (hs.length && nav){
      nav.innerHTML = hs.map(h =>
        `<a href="#${h.id}" class="${h.tagName === "H3" ? "sub" : ""}">${h.textContent}</a>`).join("");
    } else if (nav) nav.closest(".toc-box").hidden = true;

    /* مشاركة / نسخ */
    $("#copyBtn").addEventListener("click", () => {
      navigator.clipboard?.writeText(location.href).then(() => AB.toast(AB.T("art.copied")));
    });
    $("#shareBtn").addEventListener("click", () => {
      if (navigator.share) navigator.share({ title: a.title, url: location.href }).catch(()=>{});
      else navigator.clipboard?.writeText(location.href).then(() => AB.toast(AB.T("art.copied")));
    });

    /* شريط التقدم */
    const bar = document.createElement("div"); bar.className = "read-progress"; bar.setAttribute("aria-hidden","true");
    document.body.appendChild(bar);
    addEventListener("scroll", () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      bar.style.transform = `scaleX(${p})`;
    }, { passive: true });

    window.AB.track?.("article_read", { slug: a.slug, lang: a.lang });
  }

  window.AB.articlePage = boot;
})();
