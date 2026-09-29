/* js/forms.js — نموذج تواصل المدونة → نفس مجموعة service_requests */
"use strict";
(() => {
  const S = () => UI_STR[AB.lang].misc;
  window.AB.forms = {
    bindContact(){
      const f = $("#blogForm"); if (!f) return;
      f.onsubmit = async e => {
        e.preventDefault();
        const err = $("#bfErr"), v = id => $(id).value.trim();
        err.hidden = true;
        if ($("#bfHoney").value) { window.AB.closeDialog?.(); return; }   // bot
        const bad = m => { err.textContent = m; err.hidden = false; };
        if (v("#bfName").length < 2) return bad(AB.lang==="ar"?"أدخل اسمك.":"Enter your name.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("#bfEmail"))) return bad(AB.lang==="ar"?"بريد غير صالح.":"Invalid email.");
        if (v("#bfMsg").length < 20) return bad(AB.lang==="ar"?"صف مشروعك (20 حرفًا على الأقل).":"Describe your project (20+ characters).");
        if (!$("#bfConsent").checked) return bad(AB.lang==="ar"?"أكّد الموافقة.":"Confirm consent.");
        const fields = {
          name:{stringValue:v("#bfName").slice(0,80)}, email:{stringValue:v("#bfEmail").slice(0,120)},
          service:{stringValue:v("#bfService")},
          serviceLabel:{stringValue:$("#bfService option:checked").textContent.slice(0,60)},
          description:{stringValue:v("#bfMsg").slice(0,3000)}, contactMethod:{stringValue:"m1"},
          language:{stringValue:AB.lang}, sourcePage:{stringValue:("blog:"+location.pathname).slice(0,100)}
        };
        const url = v("#bfUrl");
        if (url && /^https?:\/\/[^\s]+\.[^\s]+/i.test(url)) fields.website = { stringValue: url.slice(0,200) };
        try {
          const cfg = BLOG_CONFIG.firebase;
          const r = await fetch(`https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/(default)/documents/service_requests?key=${cfg.apiKey}`,
            { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ fields }) });
          if (!r.ok) throw 0;
          f.reset(); AB.toast(S().sent);
        } catch (e2) { AB.toast(S().errSent); }
      };
    }
  };
})();
