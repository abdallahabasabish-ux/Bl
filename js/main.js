/* js/main.js — boot: لغة من المسار، هيكل، بحث، حركات */
"use strict";
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

(() => {
  const esc = window.BlogMD.esc, icon = window.AB.icon;
  const isEN = /^\/en(\/|$)/.test(location.pathname);
  window.AB.lang = isEN ? "en" : "ar";
  const T = k => AB.T(k), P = p => (isEN ? "/en" : "") + p;

  document.documentElement.lang = AB.lang;
  document.documentElement.dir  = AB.lang === "ar" ? "rtl" : "ltr";

  const NAV = [["/","nav.home"],["/articles/","nav.articles"],["/articles/","nav.categories","#categories"],
               ["/services/","nav.services"],["/works/","nav.works"],["/about/","nav.about"],["/contact/","nav.contact"]];
  const brand = `<a class="brand" href="${P("/")}">
    <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="6" fill="#FF6600"/>
    <path d="M9.5 23 16 8.5 22.5 23h-3.6L16 16.4 13.1 23z" fill="#0a0a0b"/></svg>
    <span class="brand-word">ABDALLAH&nbsp;ABAS</span><span class="brand-dot"></span></a>`;
  const langSwap = (() => {                       // تبديل بين النسختين الفعليتين
    if (isEN) return () => location.pathname.replace(/^\/en/, "") + location.search;
    const slug = new URLSearchParams(location.search).get("u");
    if (location.pathname.startsWith("/article/") && slug){
      const pr = AB.art.pair(slug); if (pr) return () => AB.art.artURL(pr).replace(BLOG_CONFIG.siteBlogUrl,"");
    }
    return () => "/en" + location.pathname + location.search;
  })();

  function chrome(){
    document.body.insertAdjacentHTML("afterbegin", `
    <header class="site-header" id="siteHeader"><div class="container header-in">
      ${brand}
      <nav class="main-nav" aria-label="${T("nav.home")}"><ul class="nav-list">
        ${NAV.map(([href,key,hash])=>`<li><a href="${P(href)}${hash||""}" ${hash?'data-nofocus="1"':""}>${T(key)}</a></li>`).join("")}
      </ul></nav>
      <div class="header-actions">
        <button type="button" class="icon-btn" id="searchBtn" aria-label="${T("search.ph")}">${icon("search")}</button>
        <a class="lang-btn" href="#" id="langSwap" hreflang="${isEN?"ar":"en"}">${isEN?"AR":"EN"}</a>
        <a class="btn btn-solid btn-s header-cta" href="${P("/contact/")}">${T("cta.request")}</a>
        <button type="button" class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mobilePanel">${icon("menu","i-menu")}${icon("close","i-close")}</button>
      </div></div></header>
    <div class="nav-backdrop" id="navBackdrop"></div>
    <nav class="mobile-panel" id="mobilePanel" aria-label="${T("nav.home")}">
      <ul class="mobile-list">${NAV.map(([href,key,hash])=>`<li><a href="${P(href)}${hash||""}">${T(key)}</a></li>`).join("")}</ul>
      <div class="mobile-foot"><a class="btn btn-solid btn-block" href="${P("/contact/")}">${T("cta.request")}</a></div>
    </nav>
    <div class="overlay" id="dialogRoot"></div>
    <div class="toast" id="toast" role="status"></div>
    <button type="button" class="to-top" id="toTop" aria-label="${T("art.top")}">${icon("top")}</button>`);

    const panel = $("#mobilePanel"), bd = $("#navBackdrop"), tg = $("#navToggle");
    const setOpen = o => { panel.classList.toggle("open",o); bd.classList.toggle("open",o);
      tg.classList.toggle("open",o); tg.setAttribute("aria-expanded",o); document.body.classList.toggle("no-scroll",o); };
    tg.onclick = () => setOpen(!panel.classList.contains("open"));
    bd.onclick = () => setOpen(false);
    panel.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape"){ setOpen(false); AB.closeDialog(); } });
    $("#langSwap").onclick = e => { e.preventDefault(); location.href = langSwap(); };
    addEventListener("scroll", () => {
      $("#siteHeader").classList.toggle("scrolled", scrollY > 8);
      $("#toTop").classList.toggle("show", scrollY > 700);
    }, { passive: true });
    $("#toTop").onclick = () => scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
    $("#searchBtn").onclick = searchOverlay;
  }

  function footer(){
    const c = BLOG_CONFIG.contact, cfg = BLOG_CONFIG;
    document.body.insertAdjacentHTML("beforeend", `
    <footer class="site-footer"><div class="container footer-grid">
      <div class="footer-brand">${brand}
        <p>${T("misc.tagline")}</p>
        <div class="social-row">${["facebook","linkedin","telegram","github"].filter(k=>c.social[k])
          .map(k=>`<a class="social-btn" href="${c.social[k]}" target="_blank" rel="noopener noreferrer" aria-label="${k}">${icon(k)}</a>`).join("")}</div></div>
      <nav aria-label="${T("nav.home")}"><h3>${T("nav.home")}</h3>
        <ul class="footer-list">${NAV.map(([h,k,hash])=>`<li><a href="${P(h)}${hash||""}">${T(k)}</a></li>`).join("")}</ul></nav>
      <div><h3>${T("nav.services")}</h3><ul class="footer-list">
        ${cfg.services.slice(0,5).map(s=>`<li><a href="${P("/services/")}#s-${s.id}">${esc(AB.L(s.name))}</a></li>`).join("")}</ul></div>
      <div><h3>${T("nav.contact")}</h3><ul class="footer-list">
        ${c.email?`<li><a href="mailto:${c.email}">${c.email}</a></li>`:""}
        ${c.whatsapp?`<li><a href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener noreferrer">+${c.whatsapp}</a></li>`:""}
        <li><a href="${cfg.mainSiteUrl}" target="_blank" rel="noopener noreferrer">${T("cta.mainSite")}</a></li></ul></div>
    </div>
    <div class="container footer-bar">
      <p>© <span id="year"></span> ${cfg.brandName}. ${T("misc.rights")}</p>
      <ul class="footer-legal"><li><a href="#" aria-disabled="true">${T("misc.legalTitle")}</a></li></ul>
    </div></footer>`);
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---- البحث: فوري من manifest + full-text في الخلفية ---------- */
  let fullIndex = null;
  async function buildFull(){
    if (fullIndex) return fullIndex;
    const list = AB.art.byLang();
    const docs = await Promise.all(list.map(async a => {
      try { const r = await fetch(`/content/${a.lang}/${a.slug}.md`);
            return { a, text: window.BlogMD.strip(await r.text()).toLowerCase() }; }
      catch (e) { return { a, text: "" }; }
    }));
    fullIndex = docs; return docs;
  }
  function searchOverlay(){
    const S2 = UI_STR[AB.lang].search;
    const node = document.createElement("div");
    node.className = "dialog dialog-search"; node.setAttribute("role","dialog"); node.setAttribute("aria-modal","true");
    node.innerHTML = `<button type="button" class="dialog-close" data-close aria-label="close">${icon("close")}</button>
      <div class="dialog-body"><input id="sInput" type="search" placeholder="${S2.ph}" autocomplete="off">
      <p class="form-reqd">${S2.hint}</p><div id="sResults" class="s-results" role="listbox"></div></div>`;
    AB.openDialog(node);
    const input = $("#sInput", node), out = $("#sResults", node);
    const render = hits => {
      out.innerHTML = hits.length ? hits.slice(0,10).map(a => `
        <a class="s-hit" role="option" href="${AB.art.artURL(a)}">
          <strong>${esc(a.title)}</strong><span>${esc(a.description)}</span></a>`).join("")
        : (input.value ? `<p class="c-empty">${S2.none}</p>` : "");
    };
    let timer;
    input.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const q = input.value.trim().toLowerCase(); if (q.length < 2) return render([]);
        AB.track?.("search_performed");
        let hits = AB.art.byLang().filter(a =>
          [a.title, a.description, (a.tags||[]).join(" "), (a.keywords||[]).join(" ")]
          .join(" ").toLowerCase().includes(q));
        render(hits);
        const docs = await buildFull();
        const ft = docs.filter(d => d.text.includes(q) && !hits.includes(d.a)).map(d => d.a);
        render([...hits, ...ft]);
      }, 160);
    });
    input.focus();
  }

  /* ---- boot ------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    chrome(); footer();
    const page = document.body.dataset.page;
    if (page === "article") AB.articlePage();
    else if (AB.pages[page]) AB.pages[page]();
    AB.comments();
    if (!REDUCED && "IntersectionObserver" in window){
      const io = new IntersectionObserver(es => es.forEach(en => {
        if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
      }), { threshold: .1 });
      $$(".reveal").forEach(el => io.observe(el));
    } else $$(".reveal").forEach(el => el.classList.add("in"));
  });
})();
