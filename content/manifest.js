/* نقطة التسجيل الوحيدة للمقالات — إضافة مقال = إضافة سطر هنا
   + ملف md في content/{ar|en}/ (أو شغّل scripts/generate.mjs فيتولد تلقائيًا).
   حقول demo:true تُظهر شارة "محتوى تجريبي" وتُحذف بسهولة. */
"use strict";
window.BLOG_MANIFEST = [
  { slug: "adsense-checklist", lang: "ar", featured: true, demo: true, category: "monetize",
    title: "قائمة فحص قبل التقديم على AdSense",
    description: "ما يفحصه Google فعلًا قبل قبول المدونة: قائمة عملية مرتبة بالأولوية مبنية على المتطلبات المنشورة.",
    tags: ["AdSense", "تهيئة", "مدونات"], date: "2025-06-20", updated: "2025-06-20",
    author: "عبدالله عباس", image: "", imageAlt: "قائمة فحص AdSense", keywords: ["adsense", "قبول adsense", "تهيئة المدونة"] },

  { slug: "adsense-checklist", lang: "en", featured: true, demo: true, category: "monetize",
    title: "An AdSense Pre-Application Checklist",
    description: "What Google actually reviews before approving a blog: a practical, prioritized checklist based on published requirements.",
    tags: ["AdSense", "Readiness", "Blogs"], date: "2025-06-20", updated: "2025-06-20",
    author: "Abdallah Abas", image: "", imageAlt: "AdSense checklist", keywords: ["adsense", "approval", "blog readiness"] },

  { slug: "search-console-first-steps", lang: "ar", featured: false, demo: true, category: "seo",
    title: "Search Console للمدونات الجديدة: أول 7 خطوات",
    description: "من التحقق إلى قراءة تقرير الأداء: الترتيب الصحيح لتأسيس حضور مدونتك في نتائج البحث.",
    tags: ["Search Console", "SEO", "مبتدئين"], date: "2025-06-12", updated: "2025-06-12",
    author: "عبدالله عباس", image: "", imageAlt: "خطوات Search Console الأولى", keywords: ["search console", "seo", "فهرسة"] },

  { slug: "search-console-first-steps", lang: "en", featured: false, demo: true, category: "seo",
    title: "Search Console for New Blogs: Your First 7 Steps",
    description: "From verification to reading the Performance report: the right order to establish your blog in search.",
    tags: ["Search Console", "SEO", "Beginners"], date: "2025-06-12", updated: "2025-06-12",
    author: "Abdallah Abas", image: "", imageAlt: "First Search Console steps", keywords: ["search console", "seo", "indexing"] }
];
