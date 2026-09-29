/* ============================================================
   فهرس المقالات — المصدر الوحيد للقوائم والبحث (M5) والمقالات ذات الصلة (M2)
   لإضافة مقال جديد (3 خطوات):
     1) أنشئ /{lang}/blog/<slug>/index.html من قالب المقال
     2) أضف كائنًا هنا بالشكل الموثق أدناه
     3) أضف <url> إلى sitemap.xml
   المقالة الناقصة البيانات تُتجاهل مع تحذير في الكونسول — لا نشر مكسور.
   ============================================================ */
window.AA_BLOG.articles = [
  /* الشكل المطلوب (موثّق فقط — محذوف فعليًا ولا يظهر في أي قائمة):
  {
    slug: 'article-url-name',     // = اسم المجلد، [a-z0-9-] فقط
    lang: 'ar',                   // 'ar' | 'en'
    title: 'عنوان المقال',
    description: 'وصف SEO من 20 إلى 200 حرف.',
    category: 'seo',              // slug من categories في config.js
    tags: ['وسم1', 'وسم2'],
    date: '2025-06-01',           // YYYY-MM-DD
    updated: null,                // أو 'YYYY-MM-DD'
    image: '/images/articles/article-url-name.webp',
    readingTime: 6,               // دقائق
    featured: false,
    demo: false,                  // ⚠️ المحتوى التجريبي يُعلَّم هنا ويُحذف بملفه
    draft: false,                 // true = مخفي عن كل القوائم
  },
  */

  /* ⚠️ DEMO — احذف القيدين مع مجلديهما قبل النشر الفعلي */
  {
    slug: 'demo-core-web-vitals', lang: 'ar',
    title: 'أساسيات Core Web Vitals: ما تحتاج قياسه فعلًا',
    description: 'شرح مبسط لمؤشرات Core Web Vitals الثلاثة، حدودها الجيدة، وكيف تقيسها وتحسّنها دون أدوات معقدة.',
    category: 'seo', tags: ['Core Web Vitals', 'سرعة الموقع', 'أداء'],
    date: '2025-06-01', updated: null,
    image: '/images/articles/demo-core-web-vitals.svg',
    readingTime: 4, featured: true, demo: true, draft: false,
  },
  {
    slug: 'demo-core-web-vitals', lang: 'en',
    title: 'Core Web Vitals basics: what to actually measure',
    description: 'A plain-language walkthrough of the three Core Web Vitals, their good thresholds, and how to measure and improve them without complex tooling.',
    category: 'seo', tags: ['Core Web Vitals', 'Performance'],
    date: '2025-06-01', updated: null,
    image: '/images/articles/demo-core-web-vitals.svg',
    readingTime: 3, featured: true, demo: true, draft: false,
  },
];
