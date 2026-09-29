/* ============================================================
   العرض العام: بطاقات المقالات، الأقسام، الخدمات، الفوتر، السنة
   ترتيب التحميل المطلوب: config.js ← data/articles.js ← main.js
   (صفحات المقالات تضيف بعده article.js الذي يعتمد على cfg.render)
   ============================================================ */
(function () {
  'use strict';
  var cfg = window.AA_BLOG;
  if (!cfg || !cfg.site) { console.warn('[AA_BLOG] config.js غير محمّل'); return; }

  var lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
  var ui = cfg.i18n[lang];

  /* تشخيص — يظهر في الكونسول لكل صفحة */
  console.info('[AA_BLOG] JS جاهز — lang=' + lang + ' | إجمالي مدخلات المانيفست=' + ((cfg.articles || []).length));

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fmtDate(iso) {
    try {
      return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-u-nu-latn' : 'en-US', { dateStyle: 'long' })
        .format(new Date(iso + 'T00:00:00'));
    } catch (e) { return iso; }
  }

  /* تحقق المانيفست — المقالة الناقصة تُتجاهل مع تحذير ظاهر في الكونسول */
  function validArticle(a) {
    var ok = !!a
      && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug || '')
      && (a.lang === 'ar' || a.lang === 'en')
      && typeof a.title === 'string' && a.title.length >= 3 && a.title.length <= 120
      && typeof a.description === 'string' && a.description.length >= 20 && a.description.length <= 200
      && /^\d{4}-\d{2}-\d{2}$/.test(a.date || '');
    if (!ok) console.warn('[AA_BLOG] مقالة ببيانات ناقصة/خاطئة تم تجاهلها:', a && a.slug);
    return ok;
  }

  function listArticles(mode, limit) {
    return (cfg.articles || [])
      .filter(function (a) {
        return validArticle(a) && !a.draft && a.lang === lang && (mode !== 'featured' || a.featured);
      })
      .sort(function (x, y) { return y.date.localeCompare(x.date); })
      .slice(0, limit);
  }

  function cardHTML(a) {
    var cat = (cfg.categories || []).filter(function (c) { return c.slug === a.category; })[0];
    var href = '/' + a.lang + '/blog/' + a.slug + '/';
    return ''
      + '<article class="card post-card">'
      +   /* الصورة زخرفية مكررة للرابط — alt="" هو الصحيح وفق WCAG */
      +   '<a class="thumb" href="' + href + '" tabindex="-1" aria-hidden="true">'
      +     '<img src="' + esc(a.image) + '" alt="" loading="lazy" decoding="async" width="1200" height="630">'
      +   '</a>'
      +   '<div class="body">'
      +     '<div class="meta">'
      +       (cat ? '<span class="cat">' + esc(cat[lang]) + '</span>' : '')
      +       (a.demo ? '<span class="badge">' + esc(ui.demo) + '</span>' : '')
      +       '<time datetime="' + esc(a.date) + '">' + esc(fmtDate(a.date)) + '</time>'
      +     '</div>'
      +     '<h3><a href="' + href + '">' + esc(a.title) + '</a></h3>'
      +     '<p>' + esc(a.description) + '</p>'
      +   '</div>'
      + '</article>';
  }

  /* قوائم المقالات — الحالة الفارغة الثابتة في HTML تبقى إن لا نتائج */
  Array.prototype.forEach.call(document.querySelectorAll('[data-article-list]'), function (box) {
    var mode = box.getAttribute('data-list') || 'latest';
    var limit = parseInt(box.getAttribute('data-limit') || '6', 10);
    var items = listArticles(mode, limit);
    if (!items.length) {
      if (mode === 'latest') {
        console.info('[AA_BLOG] لا مقالات صالحة للغة "' + lang + '" — تُعرض الحالة الفارغة (تحقق من حقل lang في articles.js)');
      }
      return;
    }
    var empty = box.parentNode.querySelector('[data-empty]');
    if (empty) empty.hidden = true;
    box.innerHTML = items.map(cardHTML).join('');
    if (mode === 'featured') {
      var sec = box.closest('section');
      if (sec) sec.hidden = false; /* قسم المميزة يظهر فقط حين وجود مقالات مميزة */
    }
  });

  /* الأقسام (عرض فقط — روابطها تُفعَّل مع صفحات الأقسام M3) */
  Array.prototype.forEach.call(document.querySelectorAll('[data-render="categories"]'), function (ul) {
    ul.innerHTML = (cfg.categories || []).map(function (c) {
      return '<li class="chip">' + esc(c[lang]) + '</li>';
    }).join('');
  });

  /* الخدمات */
  Array.prototype.forEach.call(document.querySelectorAll('[data-render="services"]'), function (box) {
    box.innerHTML = (cfg.services || []).map(function (s) {
      return '<article class="card svc-card"><h3>' + esc(s[lang]) + '</h3><p>' + esc(s.desc[lang]) + '</p></article>';
    }).join('');
  });

  /* الفوتر — كل عمود يُرسم فقط حين وجود صفحاته (features.pages) */
  var pages = (cfg.features && cfg.features.pages) || {};
  Array.prototype.forEach.call(document.querySelectorAll('[data-footer]'), function (nav) {
    var kind = nav.getAttribute('data-footer');
    var items = [];
    if (kind === 'links') items = [
      pages.blog      ? { label: ui.nav.blog,      path: 'blog/' }      : null,
      pages.portfolio ? { label: ui.nav.portfolio, path: 'portfolio/' } : null,
      pages.about     ? { label: ui.nav.about,     path: 'about/' }     : null,
      pages.contact   ? { label: ui.nav.contact,   path: 'contact/' }   : null
    ].filter(Boolean);
    if (kind === 'categories' && pages.categories) items = (cfg.categories || []).map(function (c) {
      return { label: c[lang], path: 'categories/' + c.slug + '/' };
    });
    if (kind === 'services' && pages.services) items = (cfg.services || []).map(function (s) {
      return { label: s[lang], path: 'services/' + s.slug + '/' };
    });
    if (!items.length) { nav.hidden = true; return; }
    nav.innerHTML = '<h3>' + esc(ui.footer[kind]) + '</h3><ul>'
      + items.map(function (it) {
          return '<li><a href="/' + lang + '/' + it.path + '">' + esc(it.label) + '</a></li>';
        }).join('')
      + '</ul>';
  });

  /* سنة الفوتر الحية */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  /* واجهة داخلية لمشاركة المساعدين مع article.js */
  cfg.render = { esc: esc, fmtDate: fmtDate, cardHTML: cardHTML, listArticles: listArticles };
})();
