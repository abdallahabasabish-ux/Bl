/* js/pages.js — مصيّرات الصفحات الثابتة (من config/manifest فقط) */
"use strict";
(() => {
  const { art, icon } = window.AB, T = k => AB.T(k), esc = window.BlogMD.esc;
  const P = p => (AB.lang === "en" ? "/en" : "") + p;   // مسار واعٍ باللغة

  const workCard = (w, i) => `
    <article class="post-card work-card">
      <a class="post-thumb" href="${esc(w.link)}" target="_blank" rel="noopener noreferrer"
         aria-label="${esc(AB.L(w.title))}">${art.thumb(i, AB.L(w.title))}</a>
      <div class="post-body">
        <div class="post-meta"><span class="cat">${esc(AB.L(w.cat))}</span></div>
        <h3><a href="${esc(w.link)}" target="_blank" rel="noopener noreferrer">${esc(AB.L(w.title))}</a></h3>
        <p>${esc(AB.L(w.desc))}</p>
        <a class="btn-text" href="${esc(w.link)}" target="_blank" rel="noopener noreferrer">
          <span>${AB.L({ar:"زيارة المشروع",en:"Visit project"})}</span>${icon("external")}</a>
      </div></article>`;

  const R = {
    home(){
      const feat = art.featured().slice(0, 2), latest = art.latest(6), cfg = BLOG_CONFIG;
      $("#app").innerHTML = `
      <section class="hero"><div class="container hero-grid">
        <div class="hero-copy reveal">
          <p class="kicker">${T("home.kicker")}</p>
          <h1>${T("home.h1")}</h1>
          <p class="lead">${T("home.lead")}</p>
          <div class="hero-cta"><a class="btn btn-solid" href="${P("/articles/")}">${T("cta.articles")}</a>
            <a class="btn btn-ghost" href="${P("/contact/")}">${T("cta.request")}</a></div>
        </div>
        <div class="hero-index reveal" aria-label="${T("home.feat")}">
          <span class="hero-index-t mono">${T("home.feat")}</span>
          ${art.featured().slice(0,3).map((a,i)=>`
            <a class="hero-item" href="${art.artURL(a)}">
              <span class="mono hi-num">0${i+1}</span>
              <span class="hi-body"><strong>${esc(a.title)}</strong>
              <em>${esc(art.catOf(a)[AB.lang] || AB.L(art.catOf(a)))}</em></span></a>`).join("")}
        </div></div></section>
      <section class="section"><div class="container">
        <h2 class="sec-title reveal">${T("home.feat")}</h2>
        <div class="cards-grid cols-2 reveal">${feat.map((a,i)=>art.card(a,i,"featured")).join("")}</div>
      </div></section>
      <section class="section alt"><div class="container">
        <div class="sec-row"><h2 class="sec-title">${T("home.latest")}</h2>
          <a class="btn-text" href="${P("/articles/")}"><span>${T("cta.all")}</span>${icon("arrow","icon-flip")}</a></div>
        <div class="cards-grid cols-3 reveal">${latest.slice(0,6).map((a,i)=>art.card(a,i)).join("")}</div>
        <div class="cat-band reveal" id="categories">
          <h2 class="sec-title">${T("home.cats")}</h2>
          <div class="chip-row">${cfg.categories.map(c=>`
            <a class="chip" href="${P("/articles/")}?cat=${c.id}">${icon(c.icon)} ${esc(AB.L(c))}
              <span class="mono c-count">${art.count(c.id)}</span></a>`).join("")}</div>
        </div>
      </div></section>
      <section class="section"><div class="container">
        <div class="sec-row"><h2 class="sec-title">${T("home.services")}</h2>
          <a class="btn-text" href="${P("/services/")}"><span>${T("cta.allServices")}</span>${icon("arrow","icon-flip")}</a></div>
        <div class="hairline services-grid cols-3 reveal">${cfg.services.slice(0,6).map(s=>`
          <div class="service-cell"><span class="service-ico">${icon(s.icon)}</span>
            <h3>${esc(AB.L(s.name))}</h3><p class="service-desc">${esc(AB.L(s.desc))}</p>
            <a class="btn-text" href="${P("/services/")}#s-${s.id}"><span>${T("cta.request")}</span>${icon("arrow","icon-flip")}</a>
          </div>`).join("")}</div>
      </div></section>
      <section class="section alt"><div class="container">
        <div class="sec-row"><h2 class="sec-title">${T("home.works")}</h2>
          <a class="btn-text" href="${P("/works/")}"><span>${T("cta.allWorks")}</span>${icon("arrow","icon-flip")}</a></div>
        <div class="cards-grid cols-3 reveal">${cfg.works.slice(0,3).map(workCard).join("")}</div>
      </div></section>
      <section class="section"><div class="container about-strip reveal">
        <span class="brand-mark big" aria-hidden="true"></span>
        <div><h2>${T("home.about")} — ${esc(AB.L(cfg.author.name))}</h2>
          <p>${esc(cfg.author.bio[AB.lang][0])}</p>
          <a class="btn-text" href="${P("/about/")}"><span>${T("nav.about")}</span>${icon("arrow","icon-flip")}</a></div>
      </div></section>`;
    },

    articles(){
      const grid = $("#app");
      const cats = BLOG_CONFIG.categories, active = new URLSearchParams(location.search).get("cat") || "all";
      const list = art.byLang()
        .filter(a => active === "all" || a.category === active)
        .sort((a,b)=>b.date.localeCompare(a.date));
      grid.innerHTML = `
      <header class="page-head container"><p class="kicker">${T("nav.articles")}</p>
        <h1>${T("cta.all")}</h1>
        <div class="chip-row filter-bar" role="group" aria-label="${T("nav.categories")}">
          <a class="filter-chip ${active==="all"?"active":""}" href="${P("/articles/")}">${AB.L({ar:"الكل",en:"All"})}</a>
          ${cats.map(c=>`<a class="filter-chip ${active===c.id?"active":""}" href="${P("/articles/")}?cat=${c.id}">
            ${icon(c.icon)} ${esc(AB.L(c))}</a>`).join("")}</div></header>
      <section class="section flush-top"><div class="container">
        ${list.length ? `<div class="cards-grid cols-3 reveal">${list.map((a,i)=>art.card(a,i)).join("")}</div>`
          : `<div class="empty"><p>${AB.L({ar:"لا مقالات في هذا القسم بعد.",en:"No articles in this category yet."})}</p></div>`}
      </div></section>`;
    },

    services(){
      $("#app").innerHTML = `
      <header class="page-head container"><p class="kicker">${T("nav.services")}</p>
        <h1>${AB.L({ar:"خدمات مباشرة من صاحب الخبرة",en:"Services straight from the practitioner"})}</h1>
        <p class="lead">${AB.L({ar:"لا باقات جاهزة ولا أسعار معلّقة — كل خدمة تبدأ بفهم هدفك وتنتهي بعرض مكتوب: نطاق وجدول زمني وسعر.",
          en:"No packaged deals or posted prices — every service starts with your goal and ends with a written scope, timeline and price."})}</p></header>
      <section class="section flush-top"><div class="container">
        ${BLOG_CONFIG.services.map(s=>`
        <article class="service-row reveal" id="s-${s.id}">
          <span class="service-ico">${icon(s.icon)}</span>
          <div><h2>${esc(AB.L(s.name))}</h2><p>${esc(AB.L(s.desc))}</p></div>
          <a class="btn btn-ghost" href="${P("/contact/")}?s=${s.id}">${T("cta.request")}</a>
        </article>`).join("")}
      </div></section>
      <section class="section cta-band"><div class="container narrow center reveal">
        <h2>${AB.L({ar:"جاهز تبدأ؟",en:"Ready to start?"})}</h2>
        <a class="btn btn-solid btn-lg" href="${P("/contact/")}">${T("cta.request")}</a></div></section>`;
    },

    works(){
      $("#app").innerHTML = `
      <header class="page-head container"><p class="kicker">${T("nav.works")}</p>
        <h1>${AB.L({ar:"مشاريع حقيقية، بروابط تعمل",en:"Real projects, working links"})}</h1>
        <p class="lead">${AB.L({ar:"مختارات من مدونات ومنصات بنيتها وهيّأتها. القائمة الكاملة على الموقع الرئيسي.",
          en:"Selected blogs and platforms I built and prepared. The full list lives on the main website."})}</p></header>
      <section class="section flush-top"><div class="container">
        <div class="cards-grid cols-3 reveal">${BLOG_CONFIG.works.map(workCard).join("")}</div>
        <p class="sec-foot"><a class="btn-text" href="${BLOG_CONFIG.mainSiteUrl}/portfolio.html" target="_blank" rel="noopener noreferrer">
          <span>${T("cta.mainSite")}</span>${icon("external")}</a></p>
      </div></section>`;
    },

    about(){
      const a = BLOG_CONFIG.author;
      $("#app").innerHTML = `
      <header class="page-head container"><p class="kicker">${T("nav.about")}</p>
        <h1>${esc(AB.L(a.name))}</h1><p class="lead">${esc(AB.L(a.role))}</p></header>
      <section class="section flush-top"><div class="container about-grid">
        <div class="about-body reveal">
          ${a.bio[AB.lang].map(p=>`<p>${esc(p)}</p>`).join("")}
          <h2 class="sub-title">${AB.L({ar:"ما تجده في هذه المدونة",en:"What you'll find here"})}</h2>
          <ul class="benefits">
            ${["ex1","ex2","ex3"].map((_,i)=>["",
              AB.L({ar:"قوائم فحص مبنية على متطلبات منشورة، لا على تخمين",en:"Checklists built on published requirements, not guesswork"}),
              AB.L({ar:"تجارب موثقة من مواقع حقيقية — بالنجاح والفشل",en:"Documented experiments from real sites — wins and misses"}),
              AB.L({ar:"شروحات تقنية قابلة للتطبيق فورًا",en:"Immediately applicable technical guides"})][i])
              .filter(Boolean).map(x=>`<li>${icon("check","b-check")}<span>${esc(x)}</span></li>`).join("")}
          </ul>
        </div>
        <aside class="about-side reveal">
          <div class="side-block"><h2 class="sub-title">${AB.L({ar:"نبذة",en:"Profile"})}</h2>
            <dl class="facts">${a.facts[AB.lang].map(([k,v])=>
              `<div class="fact"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl></div>
          <div class="side-block"><h2 class="sub-title">${AB.L({ar:"تواصل",en:"Contact"})}</h2>
            <a class="btn btn-solid btn-block" href="${P("/contact/")}">${T("cta.request")}</a></div>
        </aside></div></section>`;
    },

    contact(){
      const c = BLOG_CONFIG.contact, T2 = AB.T, t = k => AB.L({ar:k[0],en:k[1]});
      const methods = [];
      if (c.whatsapp) methods.push(["whatsapp","WhatsApp",`https://wa.me/${c.whatsapp}`,"+"+c.whatsapp]);
      if (c.email) methods.push(["mail",t(["البريد الإلكتروني","Email"]),`mailto:${c.email}`,c.email]);
      [["telegram",c.social.telegram],["linkedin",c.social.linkedin],["github",c.social.github],["facebook",c.social.facebook]]
        .forEach(([ic,url])=>{ if (url) methods.push([ic, ic[0].toUpperCase()+ic.slice(1), url, ic]); });

      $("#app").innerHTML = `
      <header class="page-head container"><p class="kicker">${T("nav.contact")}</p>
        <h1>${t(["لنتحدث عن مشروعك","Let's talk about your project"])}</h1>
        <p class="lead">${t(["اختر القناة التي تريدها — أو أرسل طلبًا منظّمًا واستلم عرضًا مكتوبًا.",
          "Pick your channel — or send a structured request and get a written proposal."])}</p></header>
      <section class="section flush-top"><div class="container contact-grid">
        <div class="reveal">
          <h2 class="sub-title">${t(["قنوات مباشرة","Direct channels"])}</h2>
          <div class="hairline methods-grid">${methods.map(([ic,name,href,val])=>`
            <a class="method" href="${esc(href)}" ${href.startsWith("http")?'target="_blank" rel="noopener noreferrer"':""}>
              ${icon(ic)}<span class="method-body"><span class="method-name">${esc(name)}</span>
              <span class="method-val num">${esc(val)}</span></span></a>`).join("")}</div>
          <div class="response-block"><h3>${icon("clock")}<span>${t(["زمن الرد","Response time"])}</span></h3>
            <p>${T("misc.response")}</p></div>
        </div>
        <aside class="request-card reveal">
          <h2>${t(["اطلب خدمة","Request a service"])}</h2>
          <form id="blogForm" novalidate>
            <p class="form-reqd">${T("misc.reqd")}</p>
            <div class="field"><label for="bfName">${t(["الاسم *","Name *"])}</label>
              <input id="bfName" required autocomplete="name"></div>
            <div class="field"><label for="bfEmail">${t(["البريد الإلكتروني *","Email *"])}</label>
              <input id="bfEmail" type="email" required autocomplete="email"></div>
            <div class="field"><label for="bfService">${t(["الخدمة *","Service *"])}</label>
              <select id="bfService" required>${BLOG_CONFIG.services.map(s=>
                `<option value="${s.id}">${esc(AB.L(s.name))}</option>`).join("")}</select></div>
            <div class="field"><label for="bfUrl">${t(["رابط موقعك","Website URL"])}</label>
              <input id="bfUrl" type="url" placeholder="https://…"></div>
            <div class="field"><label for="bfMsg">${t(["تفاصيل المشروع *","Project details *"])}</label>
              <textarea id="bfMsg" rows="4" required></textarea></div>
            <div class="field field-full consent-row"><input id="bfConsent" type="checkbox" required>
              <label for="bfConsent">${T("misc.consent")}</label></div>
            <div class="field field-full" hidden aria-hidden="true">
              <label for="bfHoney">Company</label><input id="bfHoney" tabindex="-1" autocomplete="off"></div>
            <p class="field-err" id="bfErr" hidden></p>
            <button type="submit" class="btn btn-solid btn-block">${icon("send")}<span>${t(["إرسال الطلب","Send request"])}</span></button>
          </form>
        </aside>
      </div></section>`;
      window.AB.forms.bindContact();
    }
  };

  window.AB.pages = R;
})();
