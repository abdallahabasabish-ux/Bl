/* ============================================================
   مصدر وحيد لإعدادات المدونة — مرآة لفلسفة js/config.js في الموقع الرئيسي
   ============================================================ */
window.AA_BLOG = window.AA_BLOG || {};

window.AA_BLOG.site = {
  url: 'https://blog.abdallahabas.com',   // ⚠️ النطاق — مكان واحد فقط
  mainSite: 'https://abdallahabas.com',
  defaultLocale: 'ar',
  locales: ['ar', 'en'],
};

window.AA_BLOG.categories = [
  { slug: 'seo',          ar: 'تحسين محركات البحث', en: 'SEO' },
  { slug: 'google',       ar: 'جوجل',               en: 'Google' },
  { slug: 'adsense',      ar: 'AdSense',            en: 'AdSense' },
  { slug: 'web-dev',      ar: 'إنشاء المواقع',      en: 'Web Development' },
  { slug: 'freelancing',  ar: 'العمل الحر',         en: 'Freelancing' },
  { slug: 'ai-tools',     ar: 'الذكاء الاصطناعي',   en: 'AI & Tools' },
  { slug: 'content',      ar: 'كتابة المحتوى',      en: 'Content Writing' },
  { slug: 'case-studies', ar: 'دراسات وتجارب',      en: 'Case Studies' },
];

window.AA_BLOG.services = [
  { slug: 'web-dev', ar: 'إنشاء المواقع', en: 'Website Development',
    desc: { ar: 'مواقع سريعة بمعايير SEO من الأساس.', en: 'Fast websites built with SEO standards from day one.' } },
  { slug: 'seo', ar: 'تحسين محركات البحث', en: 'SEO',
    desc: { ar: 'تحليل وتحسين شامل للظهور في نتائج البحث.', en: 'Full analysis and optimization for search visibility.' } },
  { slug: 'optimization', ar: 'تحسين المواقع', en: 'Website Optimization',
    desc: { ar: 'تحسين سرعة وأداء المواقع القائمة وCore Web Vitals.', en: 'Speed and Core Web Vitals improvements for existing sites.' } },
  { slug: 'adsense', ar: 'خدمات AdSense', en: 'AdSense Services',
    desc: { ar: 'تهيئة المواقع لمعايير AdSense ومعالجة مشاكل القبول.', en: 'AdSense readiness and approval troubleshooting.' } },
  { slug: 'seo-content', ar: 'كتابة محتوى SEO', en: 'SEO Content Writing',
    desc: { ar: 'محتوى مكتوب لخدمة البحث والقارئ معًا.', en: 'Content written for both search engines and readers.' } },
  { slug: 'consulting', ar: 'استشارات رقمية', en: 'Digital Consulting',
    desc: { ar: 'جلسات استشارية لتخطيط المشاريع الرقمية.', en: 'Consulting sessions for digital project planning.' } },
];

/* مفاتيح تفعيل تدريجية — الروابط لا تُعرض لصفحات غير موجودة بعد (صفر روابط مكسورة) */
window.AA_BLOG.features = {
  innerPages: false,  // M3: about/services/portfolio/categories/contact
  comments:   false,  // M4
  search:     false,  // M5
  legalPages: false,  // M3
  ads:        false,  // AdSense — بنية جاهزة، بلا كود وهمي
};

/* Firebase — نفس المشروع الحالي (الخيار أ). تحقق من senderId/storageBucket مرة واحدة */
window.AA_BLOG.firebase = {
  apiKey: 'AIzaSyDg-oSbA_UdlzMS8HZGE0pHtr_zWg5rrXY',
  authDomain: 'abdallahsst.firebaseapp.com',
  projectId: 'abdallahsst',
  storageBucket: 'abdallahsst.firebasestorage.app',
  messagingSenderId: '1011946194938',
  appId: '1:1011946194938:web:6c71030a6da4074b68c643',
  measurementId: 'G-P8VBBK21WK',
  collections: {
    serviceRequests: 'service_requests', // مطابق للقواعد المنشورة — دون تعديل (M3)
    comments: 'blog_comments',           // M4
  },
};

/* ⚠️ فارغ = لا يُحمَّل أي تتبع. معلق عليك: ملكية G-P8VBBK21WK مقابل G-0XEPCGX0EL */
window.AA_BLOG.analytics = { ga4: '' };

window.AA_BLOG.i18n = {
  ar: {
    demo: 'محتوى تجريبي',
    nav: { blog: 'المقالات', portfolio: 'الأعمال', about: 'من أنا', contact: 'تواصل معي' },
    footer: { links: 'روابط', categories: 'الأقسام', services: 'الخدمات' },
  },
  en: {
    demo: 'Demo content',
    nav: { blog: 'Articles', portfolio: 'Work', about: 'About', contact: 'Contact' },
    footer: { links: 'Links', categories: 'Categories', services: 'Services' },
  },
};
