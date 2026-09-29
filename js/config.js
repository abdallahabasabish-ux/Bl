/* ============================================================
   Blog — Abdallah Abas · central configuration
   ⚠ كل قيمة نصية بين "..." وكل سطر ينتهي بفاصلة.
   ============================================================ */
"use strict";

const BLOG_CONFIG = {

  /* --- Domains (لا تفترض النطاق — عدّله هنا + find&replace في الرؤوس) */
  siteBlogUrl: "https://blog.example.com",        // ⚠ النطاق الفعلي للمدونة
  mainSiteUrl: "https://abdallahabas.com",        // الموقع الرئيسي

  brandName: "Abdallah Abas",
  tagline: { ar: "مدونة عبدالله عباس", en: "Abdallah Abas — Blog" },

  /* --- Contact (حقيقية) ------------------------------------- */
  contact: {
    email: "abdallahabasabish@gmail.com",
    whatsapp: "201001378339",                      // أرقام فقط
    social: {
      facebook: "https://www.facebook.com/Abdallah.G.designer",
      linkedin: "https://www.linkedin.com/in/abdallah-abas-16601a258",
      telegram: "https://t.me/abdallahabasmo",
      github: "https://github.com/abdallahabasabish-ux",
      instagram: ""                                // فارغ = مخفي تلقائيًا
    }
  },

  /* --- Firebase (نفس المشروع) -------------------------------- */
  firebase: {
    apiKey: "AIzaSyDg-oSbA_UdlzMS8HZGE0pHtr_zWg5rrXY",
    authDomain: "abdallahsst.firebaseapp.com",
    projectId: "abdallahsst",
    appId: "1:1011946194938:web:6c71030a6da4074b68c643",
    measurementId: "G-P8VBBK21WK"
  },

  /* --- AdSense: لا تُفعِّل قبل القبول الفعلي ------------------ */
  adsense: { enabled: false, client: "", slots: { inArticle1: "", inArticle2: "" } },

  /* --- الأقسام: 5 فقط — كل قسم له هدف ------------------------ */
  categories: [
    { id: "seo",        icon: "search",  ar: "SEO ومحركات البحث",  en: "SEO & Search" },
    { id: "building",   icon: "layout",  ar: "بناء المواقع والمدونات", en: "Building Blogs & Sites" },
    { id: "monetize",   icon: "coins",   ar: "AdSense والتحصيل",   en: "AdSense & Monetization" },
    { id: "tools",      icon: "terminal",ar: "أدوات وشروحات",      en: "Tools & Guides" },
    { id: "experiments",icon: "gauge",   ar: "تجارب ودراسات",      en: "Experiments & Studies" }
  ],

  /* --- الخدمات (مراسٍ قابلة للربط #id — بلا أسعار ثابتة) ------ */
  services: [
    { id: "blog-setup", icon: "layout",
      name: { ar: "إنشاء وتأسيس المدونات", en: "Blog Setup" },
      desc: { ar: "تأسيس مدونة على بلوجر أو ووردبريس: بنية أقسام، تصفح، صفحات قانونية، وأساسيات SEO.",
              en: "Blogger/WordPress foundations: structure, navigation, legal pages and SEO basics." } },
    { id: "seo", icon: "search",
      name: { ar: "تحسين محركات البحث", en: "SEO" },
      desc: { ar: "SEO تقني ومضموني: فحص، بنية، بيانات وصفية، وSearch Console.",
              en: "Technical & on-page SEO: audits, structure, metadata and Search Console." } },
    { id: "adsense-prep", icon: "coins",
      name: { ar: "تهيئة AdSense", en: "AdSense Readiness" },
      desc: { ar: "تحضير الموقع وفق متطلبات Google المنشورة — دون أي ضمان قبول.",
              en: "Preparation per Google's published requirements — never a guarantee." } },
    { id: "optimization", icon: "gauge",
      name: { ar: "تحسين المواقع", en: "Website Optimization" },
      desc: { ar: "أداء وسهولة استخدام وCore Web Vitals.",
              en: "Performance, usability and Core Web Vitals." } },
    { id: "content", icon: "pen",
      name: { ar: "كتابة المحتوى", en: "Content Writing" },
      desc: { ar: "محتوى منظم للقارئ أولًا ثم لمحركات البحث.",
              en: "Structured content — humans first, search engines second." } },
    { id: "consulting", icon: "compass",
      name: { ar: "استشارات رقمية", en: "Digital Consulting" },
      desc: { ar: "تقييم صريح وخطة عمل واضحة حسب هدفك.",
              en: "An honest assessment and a clear plan for your goal." } }
  ],

  /* --- أعمال مختارة (القائمة الكاملة على الموقع الرئيسي) ------ */
  works: [
    { id: "freelancearab", title: { ar: "عرب فريلانسر", en: "Arab Freelancer" },
      cat: { ar: "مدونة", en: "Blog" },
      desc: { ar: "مدونة عربية متخصصة في العمل الحر — تصميم وهيكلة وSEO.",
              en: "An Arabic freelancing blog — design, structure and SEO." },
      link: "https://www.freelancearab.com/" },
    { id: "airbah", title: { ar: "أرباح جلوبال", en: "Arbah Global" },
      cat: { ar: "مدونة", en: "Blog" },
      desc: { ar: "مدونة محتوى في مجال الربح من الإنترنت، مهيأة وفق أفضل الممارسات.",
              en: "An online-earnings blog prepared per published best practices." },
      link: "https://www.airbah.com/" },
    { id: "media3rabia", title: { ar: "ميديا عربية", en: "Arab Media" },
      cat: { ar: "منصة", en: "Platform" },
      desc: { ar: "منصة محتوى إعلامي — بناء وتنظيم أقسام وتحسين فهرسة.",
              en: "A media-content platform — build, categories and indexing." },
      link: "https://www.media3rabia.com/" },
    { id: "amigurumiworld", title: { ar: "Amigurumi World", en: "Amigurumi World" },
      cat: { ar: "مدونة إنجليزية", en: "English blog" },
      desc: { ar: "مدونة إنجليزية متخصصة في الأميغورومي لجمهور عالمي.",
              en: "An English amigurumi craft blog for a global audience." },
      link: "https://www.amigurumiworld.org/" },
    { id: "businessbits", title: { ar: "بيزنس بيتس", en: "Business Bits" },
      cat: { ar: "مدونة", en: "Blog" },
      desc: { ar: "مدونة أعمال وإدارة — تصميم وتهيئة محركات بحث.",
              en: "A business & management blog — design and search prep." },
      link: "https://www.businessbits33.com/" },
    { id: "albedaei", title: { ar: "البيدعي", en: "Albedaei" },
      cat: { ar: "مدونة شخصية", en: "Personal blog" },
      desc: { ar: "مدونة شخصية بهوية بصرية مستقلة وتنسيق متجاوب.",
              en: "A personal blog with an independent identity." },
      link: "https://www.albedaei.com/" }
  ],

  /* --- نبذة الكاتب (صفحة من أنا + Schema) — بلا مبالغة ------- */
  author: {
    name: { ar: "عبدالله عباس", en: "Abdallah Abas" },
    role: { ar: "مطوّر ويب ومتخصص SEO", en: "Web developer & SEO specialist" },
    bio: {
      ar: ["أنا عبدالله عباس، أعمل في بناء المواقع والمدونات وتحسين محركات البحث منذ أكثر من عقد. هذه المدونة هي سجل عملي لما أتعلمه وأطبّقه: شروحات، تجارب، وقوائم فحص مجرّبة — بلا وعود مبالغ فيها.",
           "أكتب بالعربية والإنجليزية عن SEO، وبلوجر وووردبريس، وتهيئة AdSense، وأدوات العمل. كل مقال هنا مبني على عمل فعلي على مواقع حقيقية."],
      en: ["I'm Abdallah Abas — I've been building websites and working on SEO for over a decade. This blog is a practical log of what I learn and apply: guides, experiments and tested checklists, without inflated promises.",
           "I write in Arabic and English about SEO, Blogger and WordPress, AdSense readiness, and work tools. Every article is grounded in real work on real websites."]
    },
    facts: {
      ar: [["التخصص","تطوير مواقع · SEO · تحسين أداء"],["المنصات","Blogger · WordPress"],["اللغات","العربية · الإنجليزية"]],
      en: [["Focus","Web dev · SEO · Performance"],["Platforms","Blogger · WordPress"],["Languages","Arabic · English"]]
    }
  }
};
