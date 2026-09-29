/* ============================================================
   صفحة المقال: TOC تلقائي + شريط تقدم + تتبع القسم الحالي
   + نسخ الرابط + مشاركة + عودة للأعلى + مقالات ذات صلة
   يتطلب: config.js ثم articles.js ثم main.js قبله
   ============================================================ */
(function () {
  'use strict';
  var cfg = window.AA_BLOG;
  if (!cfg || !cfg.render) { console.warn('[AA_BLOG] article.js يتطلب main.js قبله'); return; }

  var prose = document.querySelector('.prose');
  if (!prose) return;

  /* ---------- 1) جدول المحتويات (من h2/h3) ---------- */
  var headings = prose.querySelectorAll('h2, h3');
  var tocNav = document.querySelector('[data-toc-nav]');
  var tocDetails = document.querySelector('.toc-details');
  var tocLinks = [];

  if (tocNav && headings.length >= 3) {
    var html = '', h2n = 0, h3n = 0;
    Array.prototype.forEach.call(headings, function (h) {
      if (!h.id) {
        if (h.tagName === 'H2') { h2n++; h3n = 0; h.id = 's' + h2n; }
        else { h3n++; h.id = 's' + h2n + '-' + h3n; }
      }
      html += '<li><a class="toc-link' + (h.tagName === 'H3' ? ' toc-sub' : '')
           +  '" href="#' + h.id + '">' + cfg.render.esc(h.textContent) + '</a></li>';
    });
    tocNav.innerHTML = '<ul>' + html + '</ul>';
    tocLinks = tocNav.querySelectorAll('a');

    /* على الشاشات الكبيرة يُفتح تلقائيًا */
    var mq = window.matchMedia('(min-width: 64rem)');
    var syncOpen = function () { if (mq.matches && tocDetails) tocDetails.open = true; };
    syncOpen();
    if (mq.addEventListener) mq.addEventListener('change', syncOpen);
    else if (mq.addListener) mq.addListener(syncOpen);

    /* على الجوال: يُغلق بعد اختيار قسم */
    tocNav.addEventListener('click', function () {
      if (!mq.matches && tocDetails) tocDetails.open = false;
    });
  } else if (tocDetails) {
    tocDetails.hidden = true;
  }

  /* ---------- 2) شريط التقدم + تتبع القسم + زر العودة ---------- */
  var bar = document.querySelector('[data-progress] span');
  var backTop = document.querySelector('[data-back-top]');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar) bar.style.transform = 'scaleX(' + pct + ')';
      if (backTop) backTop.classList.toggle('is-visible', window.scrollY > 600);

      var cur = -1;
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top <= 96) cur = i; else break;
      }
      for (var j = 0; j < tocLinks.length; j++) {
        if (j === cur) tocLinks[j].setAttribute('aria-current', 'location');
        else tocLinks[j].removeAttribute('aria-current');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) backTop.addEventListener('click', function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ---------- 3) نسخ الرابط + مشاركة أصلية ---------- */
  var copyBtn = document.querySelector('[data-copy-link]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var url = location.origin + location.pathname;
      var doneLabel = copyBtn.getAttribute('data-label-done') || 'OK';
      var origLabel = copyBtn.getAttribute('data-label-copy') || copyBtn.textContent;
      function done(ok) {
        if (ok) { copyBtn.textContent = doneLabel; copyBtn.classList.add('is-done'); }
        setTimeout(function () {
          copyBtn.textContent = origLabel;
          copyBtn.classList.remove('is-done');
        }, 2000);
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = url; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        done(ok);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { done(true); }, fallback);
      } else { fallback(); }
    });
  }

  var shareBtn = document.querySelector('[data-share]');
  if (shareBtn && navigator.share) {
    shareBtn.hidden = false; /* تحسين تدريجي: يظهر فقط حيث مدعوم */
    shareBtn.addEventListener('click', function () {
      navigator.share({ title: document.title, url: location.href }).catch(function () {});
    });
  }

  /* ---------- 4) مقالات ذات صلة (نفس اللغة، الأقسام المطابقة أولًا) ---------- */
  var relBox = document.querySelector('[data-related]');
  if (relBox) {
    var slug = document.body.getAttribute('data-article-slug') || '';
    var cat = document.body.getAttribute('data-article-category') || '';
    var pool = cfg.render.listArticles('latest', 100).filter(function (a) { return a.slug !== slug; });
    var primary = cat ? pool.filter(function (a) { return a.category === cat; }) : [];
    var rest = pool.filter(function (a) { return primary.indexOf(a) === -1; });
    var picked = primary.slice(0, 3).concat(rest.slice(0, 3 - Math.min(3, primary.length)));
    if (picked.length) {
      relBox.innerHTML = picked.map(cfg.render.cardHTML).join('');
      var sec = relBox.closest('section');
      if (sec) sec.hidden = false;
    }
  }
})();
