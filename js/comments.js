/* Firebase Auth (email/password) + Firestore comments.
   SDK يُجلب ديناميكيًا فقط عندما يظهر قسم التعليقات (lazy).
   الكل عبر window-namespace واحد؛ فشل Firebase لا يكسر المقال. */
"use strict";
(() => {
  const SDK = "https://www.gstatic.com/firebasejs/10.12.2";
  let fb = null;   // { auth, db, api }

  const S = () => UI_STR[AB.lang].comments;
  const esc = window.BlogMD.esc, icon = window.AB.icon;

  function errText(e){ return S().errs[e?.code] || S().errGeneric; }

  async function ensureFB(){
    if (fb) return fb;
    const [{ initializeApp }, auth, store] = await Promise.all([
      import(`${SDK}/firebase-app.js`),
      import(`${SDK}/firebase-auth.js`),
      import(`${SDK}/firebase-firestore.js`)
    ]);
    const cfg = BLOG_CONFIG.firebase;
    const app = initializeApp({ apiKey:cfg.apiKey, authDomain:cfg.authDomain,
      projectId:cfg.projectId, appId:cfg.appId });
    fb = { app, auth: auth.getAuth(app), db: store.getFirestore(app), A: auth, F: store };
    return fb;
  }

  /* ---- UI ------------------------------------------------------ */
  let user = null;

  function authModal(){
    const s = S();
    const node = document.createElement("div");
    node.className = "dialog dialog-auth"; node.setAttribute("role","dialog");
    node.setAttribute("aria-modal","true");
    node.innerHTML = `
      <button type="button" class="dialog-close" data-close aria-label="close">${icon("close")}</button>
      <div class="dialog-body">
        <h3 id="authTitle">${s.login}</h3>
        <div class="auth-tabs" role="tablist">
          <button type="button" role="tab" id="tabIn" aria-selected="true">${s.login}</button>
          <button type="button" role="tab" id="tabUp" aria-selected="false">${s.signup}</button>
        </div>
        <form id="authForm" novalidate>
          <div class="field" id="nameField" hidden>
            <label for="auName">${s.name}</label>
            <input id="auName" type="text" autocomplete="nickname" maxlength="60">
          </div>
          <div class="field"><label for="auEmail">${s.email}</label>
            <input id="auEmail" type="email" autocomplete="email" required></div>
          <div class="field"><label for="auPass">${s.pass}</label>
            <input id="auPass" type="password" autocomplete="current-password" required minlength="6"></div>
          <p class="field-err" id="authErr" hidden></p>
          <button type="submit" class="btn btn-solid btn-block" id="authGo">${s.submit}</button>
          <button type="button" class="btn-text" id="forgotBtn">${s.forgot}</button>
        </form>
      </div>`;
    let mode = "in";
    const title = node.querySelector("#authTitle"), err = node.querySelector("#authErr"),
          go = node.querySelector("#authGo"), nameF = node.querySelector("#nameField"),
          pass = node.querySelector("#auPass");
    node.querySelector("#tabIn").onclick = e => { mode = "in"; title.textContent = s.login;
      go.textContent = s.submit; nameF.hidden = true; pass.autocomplete = "current-password";
      e.target.setAttribute("aria-selected","true"); node.querySelector("#tabUp").setAttribute("aria-selected","false"); };
    node.querySelector("#tabUp").onclick = e => { mode = "up"; title.textContent = s.signup;
      go.textContent = s.create; nameF.hidden = false; pass.autocomplete = "new-password";
      e.target.setAttribute("aria-selected","true"); node.querySelector("#tabIn").setAttribute("aria-selected","false"); };
    node.querySelector("#forgotBtn").onclick = async () => {
      const em = node.querySelector("#auEmail").value.trim();
      try { await fb.A.sendPasswordResetEmail(fb.auth, em); AB.toast(s.resetSent); }
      catch (e2) { err.textContent = errText(e2); err.hidden = false; }
    };
    node.querySelector("#authForm").onsubmit = async e => {
      e.preventDefault(); err.hidden = true;
      const em = node.querySelector("#auEmail").value.trim(),
            pw = pass.value, nm = node.querySelector("#auName").value.trim();
      try {
        if (mode === "in") await fb.A.signInWithEmailAndPassword(fb.auth, em, pw);
        else {
          const cred = await fb.A.createUserWithEmailAndPassword(fb.auth, em, pw);
          if (nm) await fb.A.updateProfile(cred.user, { displayName: nm });
        }
        window.AB.closeDialog();
      } catch (e2) { err.textContent = errText(e2); err.hidden = false; }
    };
    window.AB.openDialog(node);
  }

  function commentHTML(c, id){
    const own = user && c.uid === user.uid;
    const ini = esc((c.name || "?").charAt(0).toUpperCase());
    return `<article class="comment" data-id="${esc(id)}">
      <span class="c-avatar" aria-hidden="true">${ini}</span>
      <div class="c-main">
        <div class="c-head"><strong>${esc(c.name)}</strong>
          <time>${timeAgo(c.createdAt?.toMillis?.() || 0)}</time>
          ${c.editedAt ? `<span class="c-edited">${S().edited}</span>` : ""}</div>
        <p class="c-text">${esc(c.text)}</p>
        <div class="c-actions">
          <button type="button" class="linklike c-like" data-likes="${c.likes || 0}">${icon("heart")} ${c.likes || 0}</button>
          ${own ? `<button type="button" class="linklike c-edit">${S().edit}</button>
                   <button type="button" class="linklike c-del">${S().del}</button>`
                : `<button type="button" class="linklike c-report">${S().report}</button>`}
        </div>
      </div></article>`;
  }

  async function refresh(box){
    const { F } = fb, key = box.dataset.key;
    const q = F.query(F.collection(fb.db, "blog_comments", key, "items"),
                      F.orderBy("createdAt","desc"), F.limit(50));
    const snap = await F.getDocs(q);
    const list = $("#cList", box);
    list.innerHTML = snap.empty ? `<p class="c-empty">${S().empty}</p>`
      : snap.docs.map(d => commentHTML(d.data(), d.id)).join("");
  }

  function bindList(box){
    const { F } = fb, key = box.dataset.key;
    box.addEventListener("click", async e => {
      const el = e.target.closest("button"); if (!el) return;
      const item = el.closest(".comment"), id = item?.dataset.id;
      const base = ["blog_comments", key, "items"];
      try {
        if (el.classList.contains("c-like")){
          if (!user) return AB.toast(S().needLogin);
          const ref = F.doc(fb.db, ...base, id, "likes", user.uid);
          const snap = await F.getDoc(ref);
          snap.exists() ? await F.deleteDoc(ref) : await F.setDoc(ref, { at: F.serverTimestamp() });
          const n = +el.dataset.likes + (snap.exists() ? -1 : 1);
          el.dataset.likes = n; el.innerHTML = `${icon("heart")} ${n}`;
        }
        else if (el.classList.contains("c-report")){
          if (!user) return AB.toast(S().needLogin);
          if (!confirm(S().confirmReport)) return;
          await F.setDoc(F.doc(fb.db, ...base, id, "reports", user.uid), { at: F.serverTimestamp() });
          el.textContent = S().reported; el.disabled = true;
        }
        else if (el.classList.contains("c-del")){
          if (!confirm(S().confirmDel)) return;
          await F.deleteDoc(F.doc(fb.db, ...base, id));
          item.remove(); AB.toast(S().deleted);
        }
        else if (el.classList.contains("c-edit")){
          const p = item.querySelector(".c-text"), old = p.textContent;
          p.outerHTML = `<div class="c-editing"><textarea rows="3" maxlength="1000">${esc(old)}</textarea>
            <button type="button" class="btn btn-s btn-solid c-save">${S().save}</button>
            <button type="button" class="btn btn-s btn-ghost c-cancel">${S().cancel}</button></div>`;
          item.querySelector(".c-cancel").onclick = () => refresh(box);
          item.querySelector(".c-save").onclick = async ev => {
            const txt = ev.target.previousElementSibling.value.trim();
            if (txt.length < 2) return;
            await F.updateDoc(F.doc(fb.db, ...base, id), { text: txt, editedAt: F.serverTimestamp() });
            refresh(box);
          };
        }
      } catch (err) { AB.toast(errText(err)); }
    });
  }

  async function init(box){
    if (box.dataset.ready) return; box.dataset.ready = "1";
    const s = S();
    box.innerHTML = `<h2>${s.title}</h2><div id="authBox"></div><div id="formBox"></div>
      <div id="cList" class="c-list"><p class="c-empty">…</p></div>`;
    try { await ensureFB(); } catch (e) { box.innerHTML = `<h2>${s.title}</h2><p class="c-empty">${s.errGeneric}</p>`; return; }

    fb.A.onAuthStateChanged(fb.auth, u => {
      user = u;
      const ab = $("#authBox", box), fo = $("#formBox", box);
      if (u){
        ab.innerHTML = `<div class="c-user"><span>${icon("user")} ${esc(u.displayName || u.email)}</span>
          <button type="button" class="linklike" id="logoutBtn">${s.logout}</button></div>`;
        $("#logoutBtn", ab).onclick = () => fb.A.signOut(fb.auth);
        fo.innerHTML = `<form id="cForm" novalidate>
          <div class="field"><label for="cText">${s.phComment}</label>
            <textarea id="cText" rows="3" maxlength="1000" required></textarea></div>
          <button type="submit" class="btn btn-solid btn-s">${s.post}</button></form>`;
        $("#cForm", fo).onsubmit = async ev => {
          ev.preventDefault();
          const text = $("#cText", fo).value.trim();
          if (text.length < 2) return;
          const btn = ev.target.querySelector("button"); btn.disabled = true; btn.textContent = s.posting;
          try {
            const name = u.displayName || u.email.split("@")[0];
            await fb.F.addDoc(fb.F.collection(fb.db, "blog_comments", box.dataset.key, "items"),
              { uid: u.uid, name: String(name).slice(0,60), text, lang: AB.lang,
                createdAt: fb.F.serverTimestamp() });
            $("#cText", fo).value = "";
            window.AB.track?.("comment_posted");
            refresh(box);
          } catch (e2) { AB.toast(errText(e2)); }
          btn.disabled = false; btn.textContent = s.post;
        };
      } else {
        ab.innerHTML = `<div class="c-user"><button type="button" class="btn btn-s btn-ghost" id="openAuth">${s.login}</button></div>
          <p class="c-empty">${s.loginToComment}</p>`;
        $("#openAuth", ab).onclick = authModal;
        fo.innerHTML = "";
      }
      refresh(box).catch(()=>{});
    });
    bindList(box);
  }

  window.AB.comments = () => {
    const box = $("#comments"); if (!box) return;
    const io = new IntersectionObserver(es => es.forEach(x => {
      if (x.isIntersecting){ io.disconnect(); init(box); }
    }), { rootMargin: "200px" });
    io.observe(box);
  };
})();
