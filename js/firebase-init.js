/* js/firebase-init.js — Analytics مؤجل بالكامل (نفس نمط الموقع الرئيسي؛
   regex النطاقات يغطي blog.abdallahabas.com تلقائيًا) */
"use strict";
const ALLOWED = /(^|\.)abdallahabas\.com$|\.github\.io$/;
async function init(){
  try {
    const cfg = (window.BLOG_CONFIG || {}).firebase;
    if (!cfg || !ALLOWED.test(location.hostname) || navigator.doNotTrack === "1") return;
    const [{ initializeApp }, { getAnalytics, isSupported, logEvent }] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js")
    ]);
    const app = initializeApp(cfg);
    if (!(await isSupported())) return;
    const an = getAnalytics(app);
    window.AB.track = (n,p={}) => { try { logEvent(an,n,p); } catch(e){} };
    window.AB.track("blog_page_ready", { page: document.body.dataset.page || "unknown", lang: AB.lang });
  } catch (e) { /* التحليلات لا تكسر التجربة */ }
}
if ("requestIdleCallback" in window) requestIdleCallback(() => init(), { timeout: 2500 });
else addEventListener("load", () => setTimeout(init, 600));
