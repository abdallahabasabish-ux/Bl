/* ============================================================
   Blog — legal pages data (ar/en). Rendered by js/legal-page.js.
   ⚠ حدّث حقل updated عند أي تعديل على النصوص.
   المبدأ الصادق: لا وعد، لا ادعاء — بما في ذلك الإفصاح عن أن
   لا روابط عمولة موجودة اليوم.
   ============================================================ */
"use strict";
window.BLOG_LEGAL = {

privacy: {
  updated: "2025-06-25",
  title: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  sections: [
    { h: { ar: "نظرة عامة", en: "Overview" },
      p: { ar: ["هذه المدونة موقع ثابت. لا تضع ملفات تتبّع بنفسها ولا تجمع بيانات إلا ما ترسله أنت مباشرة: تعليقًا في النقاش، أو طلب خدمة. تفاصيل كل حالة موضحة أدناه بصياغة قابلة للتحقق، لا للطمأنة العامة."],
           en: ["This blog is a static site. It sets no tracking cookies of its own and collects nothing beyond what you send directly: a comment in a discussion, or a service request. Each case is detailed below in verifiable terms."] } },
    { h: { ar: "التعليقات وحسابات القرّاء", en: "Comments and reader accounts" },
      p: { ar: ["للمشاركة في النقاش يلزم حساب عبر Firebase Authentication (بريد إلكتروني وكلمة مرور). نخزّن: البريد الإلكتروني، والاسم الظاهر الذي تختاره، ومعرّف الحساب. كلمة المرور لا تمرّ عبر كود المدونة ولا تُخزَّن فيها — تديرها Firebase Authentication بالكامل.",
                "ما يظهر للعامة في التعليق: اسمك الظاهر، ونص تعليقك، وتاريخه. بريدك الإلكتروني لا يُنشر أبدًا. التعليقات محفوظة في Firestore (Google Cloud) ومرتبطة بالمقال الذي كُتب فيه، ويمكنك تعديل تعليقك أو حذفه بنفسك في أي وقت."],
           en: ["Joining a discussion requires an account via Firebase Authentication (email and password). We store: your email, the display name you choose, and your account ID. Your password never passes through, nor is stored in, this blog's code — it is managed entirely by Firebase Authentication.",
                "What appears publicly on a comment: your display name, its text and its date. Your email is never published. Comments are stored in Firestore (Google Cloud), tied to the article they were written on, and you can edit or delete your own comment at any time."] } },
    { h: { ar: "نموذج طلب الخدمة", en: "Service request form" },
      p: { ar: ["النموذج يرسل: الاسم، والبريد، ورابط موقعك إن أُدخل، وتفاصيل مشروعك — إلى قاعدة بيانات خاصة لا يطّلع عليها إلا عبدالله عباس، لغرض واحد: الرد على طلبك. تُسجَّل لغة النموذج والصفحة المصدر لفهم السياق فقط. لا تُستخدم البيانات للتسويق ولا تُشارك مع أي طرف ثالث."],
           en: ["The form sends: your name, email, website URL (if provided) and project details — to a private database only Abdallah Abas can access, for one purpose: responding to your request. The form language and source page are recorded for context only. Data is never used for marketing nor shared with third parties."] } },
    { h: { ar: "التحليلات", en: "Analytics" },
      p: { ar: ["تستخدم المدونة Google Analytics (عبر Firebase) بأقل قدر ممكن: يُحمَّل بعد فراغ الصفحة الرئيسية، ويحترم تفضيل Do Not Track في متصفحك. تُستخدم البيانات لفهم الصفحات الأكثر قراءة فقط."],
           en: ["This blog uses Google Analytics (via Firebase) as lightly as possible: it loads after the page goes idle, and respects your browser's Do Not Track preference. Data is used solely to understand which pages are read most."] } },
    { h: { ar: "التخزين المحلي والإعلانات", en: "Local storage and advertising" },
      p: { ar: ["القيمة الوحيدة المخزّنة في متصفحك هي تفضيل اللغة (عربي/إنجليزي) — بلا أي بيانات شخصية.",
                "حتى تاريخ آخر تحديث لهذه الصفحة، لا تُعرض إعلانات على المدونة. عند تفعيل Google AdSense مستقبلًا، ستستخدم Google وشركاؤها ملفات تعريف ارتباط لعرض الإعلانات وقياسها وفق سياساتهم المنشورة، وسيُحدَّث هذا القسم قبل تفعيل ذلك."],
           en: ["The only value stored in your browser is your language preference (Arabic/English) — no personal data.",
                "As of the last update of this page, no ads are shown on this blog. If Google AdSense is enabled in the future, Google and its partners will use cookies to serve and measure ads per their published policies, and this section will be updated before that happens."] } },
    { h: { ar: "الخدمات الخارجية", en: "Third-party services" },
      p: { ar: ["Firebase (Google Cloud) للتعليقات والنماذج والتحليلات؛ وGoogle Fonts لخدمة الخطوط. لكل خدمة سياسة خصوصية خاصة بها على روابطها الرسمية. الروابط الخارجية داخل المقالات تؤدي إلى مواقع لا نتحكم في سياساتها."],
           en: ["Firebase (Google Cloud) for comments, forms and analytics; Google Fonts for typography. Each service has its own privacy policy at its official links. External links inside articles lead to sites whose policies we do not control."] } },
    { h: { ar: "حقوقك وكيف تمارسها", en: "Your rights and how to exercise them" },
      p: { ar: ["حذف تعليق: زر الحذف أسفل تعليقك مباشرة. حذف حسابك، أو بيانات أرسلتها عبر النموذج: راسلنا من البريد نفسه الذي استخدمته وسيُحذف. لا توجد نسخ احتياطية خارج حسابات Google المشفّرة افتراضيًا، ولا ملفات تعريف إعلانية نديرها بأنفسنا."],
           en: ["Delete a comment: the delete button under your own comment. Delete your account, or data sent via the form: write to us from the same address you used and it will be removed. There are no backups outside Google's encrypted (by default) accounts, and no advertising profiles managed by us."] } }
  ]
},

terms: {
  updated: "2025-06-25",
  title: { ar: "شروط الاستخدام", en: "Terms of Use" },
  sections: [
    { h: { ar: "قبول الشروط", en: "Acceptance" },
      p: { ar: ["استخدامك لهذه المدونة وتصفّحها يعني قبولك لهذه الشروط. تاريخ آخر تحديث يظهر أعلى الصفحة، والاستمرار في الاستخدام بعد أي تحديث يعني قبول النسخة المحدّثة."],
           en: ["Browsing and using this blog means you accept these terms. The last-updated date appears at the top; continued use after any update means you accept the updated version."] } },
    { h: { ar: "المحتوى والملكية الفكرية", en: "Content and intellectual property" },
      p: { ar: ["المقالات والشعارات والتصميم ملك لعبدالله عباس. الاقتباس القصير مع ذكر المصدر ورابط مباشر للمقال مسموح ومُرحّب به. إعادة نشر مقال كاملًا أو نسخ محتوى بكميات كبيرة دون إذن مكتوب غير مسموحة."],
           en: ["Articles, logos and design are owned by Abdallah Abas. Short quotes with attribution and a direct link are allowed and welcome. Republishing full articles or copying content at scale without written permission is not."] } },
    { h: { ar: "التعليقات", en: "Comments" },
      p: { ar: ["التعليق يعبر عن كاتبه وحده ومسؤوليته. ممنوع: السبام، والإساءة، والمحتوى غير القانوني، والروابط الترويجية غير ذات الصلة. يجوز حذف أي تعليق يخالف ذلك دون إشعار مسبق، وزر الإبلاغ متاح لكل تعليق للقرّاء."],
           en: ["A comment expresses its author alone, who bears responsibility for it. Prohibited: spam, abuse, unlawful content, and irrelevant promotional links. Any violating comment may be removed without prior notice; a report button is available to readers on every comment."] } },
    { h: { ar: "طلب الخدمات", en: "Requesting services" },
      p: { ar: ["إرسال طلب عبر النموذج لا ينشئ عقدًا ولا التزامًا على أي طرف. تبدأ أي اتفاقية عمل بعرض مكتوب يحدد النطاق والجدول الزمني والسعر. ما ينشر في المدونة من أسعار أو منهجيات ليس عرضًا رسميًا."],
           en: ["Submitting a request through the form creates no contract and no obligation on either side. Any working agreement starts with a written proposal defining scope, timeline and price. Prices or methodologies published on the blog are not formal offers."] } },
    { h: { ar: "إخلاء الضمان", en: "Disclaimer of warranty" },
      p: { ar: ["المحتوى يُقدَّم \"كما هو\" لأغراض تعليمية عامة. لا ضمان لنتيجة محددة من تطبيقه في SEO أو AdSense أو أي منصة — راجع صفحة إخلاء المسؤولية."],
           en: ["Content is provided \"as is\" for general educational purposes. No warranty of any specific outcome from applying it to SEO, AdSense or any platform — see the Disclaimer page."] } },
    { h: { ar: "حدود المسؤولية", en: "Limitation of liability" },
      p: { ar: ["لا يتحمل عبدالله عباس مسؤولية أي خسارة مباشرة أو غير مباشرة تنتج عن استخدام المحتوى أو الاعتماد عليه. القرارات التقنية التي تتخذها على موقعك قرارك وقرار مسؤوليته التقنية."],
           en: ["Abdallah Abas is not liable for any direct or indirect loss resulting from using or relying on the content. Technical decisions you make on your site are yours and your technical owner's."] } },
    { h: { ar: "تغييرات الشروط", en: "Changes to these terms" },
      p: { ar: ["قد تُحدَّث هذه الشروط عند الحاجة، ويظهر تاريخ التحديث أعلى الصفحة. لا تُطبَّق التعديلات بأثر رجعي على اتفاقات عمل قائمة."],
           en: ["These terms may be updated when needed; the update date appears at the top. Amendments do not apply retroactively to existing work agreements."] } }
  ]
},

disclosure: {
  updated: "2025-06-25",
  title: { ar: "إفصاح الارتباط", en: "Affiliate & Sponsorship Disclosure" },
  sections: [
    { h: { ar: "لماذا هذه الصفحة", en: "Why this page exists" },
      p: { ar: ["الشفافية معيار نلتزم به قبل أن تفرضه الحاجة. هذه الصفحة توضح — بصدق ودون تجميل — أي علاقة تجارية قد تربط هذا المحتوى بأي جهة."],
           en: ["Transparency is a standard we keep before it becomes a requirement. This page states — honestly and without embellishment — any commercial relationship this content may have with any party."] } },
    { h: { ar: "الحالة الحالية", en: "Current status" },
      p: { ar: ["بما أن هذه المدونة جديدة: لا توجد اليوم أي روابط تسويق بالعمولة، ولا محتوى مدعوم، ولا هدايا أو مزايا مقابل مراجعة. هذه الجملة صادقة الآن، وتُحدَّث أول ما يتغير أي جزء منها."],
           en: ["As this blog is new: there are no affiliate links, no sponsored posts, and no gifts or perks in exchange for reviews today. This statement is true now, and will be updated the moment any part of it changes."] } },
    { h: { ar: "إن أُضيفت روابط عمولة لاحقًا", en: "If affiliate links are added later" },
      p: { ar: ["القواعد الملتزمة عندئذ: وسم واضح قرب الرابط نفسه (مثل «رابط عمولة»)؛ لا روابط إلا لمنتجات مجرّبة فعلًا؛ الرأي يبقى مستقلًا؛ لا مراجعات مدفوعة؛ العمولة لا تغيّر التوصية ولا ترتّبها."],
           en: ["The rules that will apply: a clear label next to the link itself (e.g. \"affiliate link\"); links only to products actually tested; opinion stays independent; no paid reviews; commissions never change or rank a recommendation."] } },
    { h: { ar: "المحتوى المدعوم", en: "Sponsored content" },
      p: { ar: ["إن نُشر محتوى مدعوم مستقبلًا، وُسم بوضوح بعبارة «محتوى مدعوم» أعلى المقال كاملًا، مع ذكر الجهة الداعمة — دون أي تدخل منها في الصياغة أو الاستنتاجات."],
           en: ["If sponsored content is published in the future, it will be clearly labeled \"Sponsored\" at the top of the article, naming the sponsor — with no involvement in the writing or conclusions."] } },
    { h: { ar: "الاستقلال التحريري", en: "Editorial independence" },
      p: { ar: ["قرارات المواضيع والتوصيات لا تُشترى. أي علاقة تجارية تُعلن في هذه الصفحة أولًا، وقبل أول ظهور لها داخل المحتوى."],
           en: ["Topic and recommendation decisions are not for sale. Any commercial relationship will be declared on this page first — before its first appearance inside the content."] } }
  ]
},

disclaimer: {
  updated: "2025-06-25",
  title: { ar: "إخلاء المسؤولية", en: "Disclaimer" },
  sections: [
    { h: { ar: "طبيعة المحتوى", en: "Nature of the content" },
      p: { ar: ["ما ينشر هنا محتوى تعليمي عام مبني على خبرة عملية، وليس استشارة ملزمة لحالتك الخاصة. كل موقع له سياقه: جمهوره، منافسته، وتقنيته."],
           en: ["What is published here is general educational content based on hands-on experience — not binding advice for your specific case. Every site has its own context: audience, competition and stack."] } },
    { h: { ar: "نتائج SEO وAdSense", en: "SEO and AdSense outcomes" },
      p: { ar: ["أعمال التحسين ترفع الجودة التقنية والبنية والملاءمة، لكن الترتيب يعتمد على عوامل كثيرة خارج سيطرة أي طرف — منها المنافسة وتغيّر الخوارزميات. وقرار قبول AdSense يعود حصريًا إلى Google وفق معاييرها. لا وعد بترتيب محدد ولا بقبول، ولا يمكن لأي جهة مشروعته أن تعطيه."],
           en: ["Optimization work raises technical quality, structure and relevance — but rankings depend on many factors outside anyone's control, including competition and algorithm changes. AdSense approval is decided exclusively by Google per its own standards. No specific ranking or approval is promised, and no party can legitimately promise either."] } },
    { h: { ar: "التجارب الموثقة", en: "Documented experiments" },
      p: { ar: ["نتائج أي تجربة مرتبطة بسياقها: الموقع الذي نُفّذت عليه، ومنافسته، وتوقيتها. نقل تجربة إلى موقعك دون قياس قد لا يعطي النتيجة نفسها — والقياس جزء من المنهجية لا ترفًا عنها."],
           en: ["Any experiment's results are tied to its context: the site it ran on, its competition, its timing. Transferring an experiment to your site without measurement may not yield the same result — measurement is part of the method, not an optional extra."] } },
    { h: { ar: "الروابط الخارجية", en: "External links" },
      p: { ar: ["الروابط الخارجية تُذكر للتيسير والتوثيق. لا نتحكم في محتوى تلك المواقع ولا نضمن بقاء دقته أو توفره."],
           en: ["External links are provided for convenience and documentation. We do not control those sites nor guarantee their ongoing accuracy or availability."] } },
    { h: { ar: "المحتوى التجريبي", en: "Demo content" },
      p: { ar: ["المقالات الموسومة «محتوى تجريبي» موجودة لاختبار التصميم والبنية، وستُحذف قبل الاعتماد الفعلي للمدونة. لا تعتبرها مرجعًا ولا تقتبس منها."],
           en: ["Articles labeled \"Demo content\" exist to test design and structure, and will be removed before the blog goes fully live. Do not treat them as reference or quote them."] } }
  ]
}
};
