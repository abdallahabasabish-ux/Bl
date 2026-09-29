/* Mini Markdown: escape-first (safe by construction) + YAML-lite
   front matter. Supported: h2-h4, p, lists, quotes, fences, tables,
   hr, images, links (external → noopener), bold/italic/inline-code.
   Raw HTML in .md is ALWAYS escaped — never executed. */
"use strict";
window.BlogMD = (() => {
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

  function parseFront(text){
    const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
    if (!m) return { meta: {}, body: text };
    const meta = {};
    m[1].split(/\r?\n/).forEach(line => {
      const km = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
      if (!km) return;
      let v = km[2].trim();
      if (/^["'].*["']$/.test(v)) v = v.slice(1,-1);
      else if (/^\[.*\]$/.test(v)) v = v.slice(1,-1).split(",").map(x=>x.trim().replace(/^["']|["']$/g,"")).filter(Boolean);
      else if (v === "true") v = true;
      else if (v === "false") v = false;
      meta[km[1]] = v;
    });
    return { meta, body: text.slice(m[0].length) };
  }

  const slugify = s => (s.toLowerCase().trim().replace(/[^\w\u0600-\u06FF]+/g,"-").replace(/^-+|-+$/g,"")) || "h";

  function inline(s){
    return s
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (a,alt,src) =>
        /^(https?:|\/|images\/)/.test(src) ? `<img src="${src}" alt="${alt}" loading="lazy">` : a)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (a,txt,href) =>
        /^(https?:\/\/|\/|#|\.\/)/.test(href)
          ? `<a href="${href}"${/^https?:/.test(href)?' target="_blank" rel="noopener noreferrer"':''}>${txt}</a>` : a)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function render(src){
    const lines = esc(src.replace(/\r\n/g,"\n")).split("\n");
    const out = []; const used = {};
    let i = 0;
    const headingId = t => { let b = slugify(t.replace(/<[^>]+>/g,"")), k = b, n = 2;
      while (used[k]) k = `${b}-${n++}`; used[k] = 1; return k; };

    while (i < lines.length){
      const L = lines[i];

      if (/^```/.test(L)){                              // code fence
        let buf = []; i++;
        while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
        i++;
        out.push(`<pre><code>${buf.join("\n")}</code></pre>`); continue;
      }
      const h = /^(#{2,4})\s+(.*)$/.exec(L);            // h2..h4
      if (h){
        const lvl = h[1].length, raw = h[2];
        out.push(`<h${lvl} id="${headingId(raw)}">${inline(raw)}</h${lvl}>`); i++; continue;
      }
      if (/^\s*(-{3,}|\*{3,})\s*$/.test(L)){ out.push("<hr>"); i++; continue; }
      if (/^\s*>\s?/.test(L)){                          // blockquote
        let buf = [];
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/,""));
        out.push(`<blockquote><p>${inline(buf.join(" "))}</p></blockquote>`); continue;
      }
      if (/^\s*\|/.test(L) && i+1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i+1])){
        const cells = r => r.replace(/^\s*\||\|\s*$/g,"").split("|").map(c=>inline(c.trim()));
        const head = cells(L); i += 2;
        let rows = "";
        while (i < lines.length && /^\s*\|/.test(lines[i])){ rows += `<tr>${cells(lines[i]).map(c=>`<td>${c}</td>`).join("")}</tr>`; i++; }
        out.push(`<div class="table-wrap"><table><thead><tr>${head.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`); continue;
      }
      if (/^\s*([-*]|\d+\.)\s+/.test(L)){               // lists
        const ordered = /^\s*\d+\./.test(L), buf = [];
        while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])){
          buf.push(`<li>${inline(lines[i].replace(/^\s*([-*]|\d+\.)\s+/,""))}</li>`); i++;
        }
        out.push(ordered ? `<ol>${buf.join("")}</ol>` : `<ul>${buf.join("")}</ul>`); continue;
      }
      if (/^\s*$/.test(L)){ i++; continue; }            // blank
      let buf = [];                                     // paragraph
      while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{2,4}\s|```|\s*>|\s*\||\s*([-*]|\d+\.)\s)/.test(lines[i]))
        buf.push(lines[i++]);
      out.push(`<p>${inline(buf.join(" "))}</p>`);
    }
    return out.join("\n");
  }

  const strip = md => parseFront(md).body
    .replace(/```[\s\S]*?```/g," ").replace(/[#>*`|\-]/g," ").replace(/\[([^\]]*)\]\([^)]*\)/g,"$1");

  return { parseFront, render, strip, esc, slugify };
})();
