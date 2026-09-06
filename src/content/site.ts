/**
 * HAYYA — editable site content.
 *
 * Everything a non-developer may need to change lives in this file:
 * contact details, product categories, partnerships and all EN/AR copy.
 * Edit values here; components read from this file only.
 */

import mangoes from "@/assets/prod-mangoes.jpg.asset.json";
import tomatoes from "@/assets/prod-tomatoes.jpg.asset.json";
import bellPeppers from "@/assets/prod-bell-peppers.jpg.asset.json";
import greenGrapes from "@/assets/prod-grapes-green.jpg.asset.json";
import pomegranates from "@/assets/prod-pomegranates.jpg.asset.json";
import mixedGrapes from "@/assets/prod-grapes-mixed.jpg.asset.json";

export type Lang = "en" | "ar";

/* ------------------------------------------------------------------ */
/* COMPANY CONTACT DETAILS — edit here                                */
/* ------------------------------------------------------------------ */
export const company = {
  name: "HAYYA",
  email: "INFO@hayya-eg.com",
  emailIsValid: true,
  phone: "+20 10 60010040",
  phoneHref: "+201060010040",
  location: { en: "El Shorouk City, Egypt", ar: "مدينة الشروق، مصر" },
  /**
   * Inquiry form destination. No email/backend service is connected yet,
   * so the form validates and reports that submission is not yet enabled.
   * Set `endpoint` to a URL (or wire a server function) to activate it.
   */
  formEndpoint: null as string | null,
};

/* ------------------------------------------------------------------ */
/* PRODUCT CATEGORIES — add, edit or remove freely                     */
/* ------------------------------------------------------------------ */
export const products = [
  {
    id: "mangoes",
    image: mangoes.url,
    en: {
      name: "Fresh Mangoes",
      desc: "Egyptian mangoes selected and packed for export, with attention to ripeness, size, and condition.",
    },
    ar: {
      name: "مانجو طازج",
      desc: "مانجو مصري يتم اختياره وتعبئته للتصدير مع الاهتمام بنضجه وحجمه وحالته.",
    },
  },
  {
    id: "tomatoes",
    image: tomatoes.url,
    en: {
      name: "Tomatoes",
      desc: "Fresh Egyptian tomatoes sourced for commercial buyers and prepared to agreed specifications.",
    },
    ar: {
      name: "طماطم",
      desc: "طماطم مصرية طازجة يتم توريدها للمشترين التجاريين وتجهيزها وفق المواصفات المتفق عليها.",
    },
  },
  {
    id: "bell-peppers",
    image: bellPeppers.url,
    en: {
      name: "Bell Peppers",
      desc: "Colorful bell peppers packed for export, graded for size, color, and freshness.",
    },
    ar: {
      name: "فلفل حلو",
      desc: "فلفل حلو ملون يتم تعبئته للتصدير وفرزه حسب الحجم واللون والطزاجة.",
    },
  },
  {
    id: "green-grapes",
    image: greenGrapes.url,
    en: {
      name: "Green Grapes",
      desc: "Egyptian green table grapes handled with care for bunches, berry size, and export quality.",
    },
    ar: {
      name: "عنب أخضر",
      desc: "عنب مصري أخضر للأكل يتم تداوله بعناية للحفاظ على العناقيد وحجم الحبة وجودة التصدير.",
    },
  },
  {
    id: "pomegranates",
    image: pomegranates.url,
    en: {
      name: "Pomegranates",
      desc: "Premium Egyptian pomegranates selected for skin quality, size, and shelf-ready presentation.",
    },
    ar: {
      name: "رمان",
      desc: "رمان مصري ممتاز يتم اختياره حسب جودة القشرة والحجم ومظهره الجاهز للعرض.",
    },
  },
  {
    id: "table-grapes",
    image: mixedGrapes.url,
    en: {
      name: "Table Grapes",
      desc: "A range of Egyptian table grape varieties prepared for international markets and buyer programs.",
    },
    ar: {
      name: "عنب للأكل",
      desc: "مجموعة من أصناف العنب المصري للأكل يتم تجهيزها للأسواق الدولية وبرامج المشترين.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* PARTNERSHIPS — business / contractual relationships                 */
/* ------------------------------------------------------------------ */
export const partners = [
  {
    id: "tahya-misr",
    name: "Tahya Misr",
    nameAr: "تحيا مصر",
    en: "A business and contractual relationship supporting HAYYA's agricultural sourcing and supply operations.",
    ar: "علاقة عمل وتعاقدية تدعم عمليات التوريد الزراعي والإمداد لدى هيا.",
  },
  {
    id: "el-watanya",
    name: "El Watanya",
    nameAr: "الوطنية",
    en: "A business and contractual relationship supporting reliable sourcing and supply continuity.",
    ar: "علاقة عمل وتعاقدية تدعم موثوقية التوريد واستمرارية الإمداد.",
  },
];

/* ------------------------------------------------------------------ */
/* COPY (EN / AR)                                                      */
/* ------------------------------------------------------------------ */
export const copy = {
  en: {
    dir: "ltr" as const,
    nav: {
      home: "Home",
      about: "About Us",
      products: "Products",
      why: "Why HAYYA",
      partnerships: "Partnerships",
      contact: "Contact",
      quote: "Request a Quote",
      menu: "Open menu",
      close: "Close menu",
    },
    hero: {
      eyebrow: "Egyptian Agricultural Export",
      title: "Fresh From Egypt. Trusted Around the World.",
      sub: "HAYYA connects premium Egyptian agricultural products with international markets through reliable sourcing, quality-focused operations, and professional export solutions.",
      primary: "Request a Quote",
      secondary: "Explore Our Products",
      trust: "Egyptian Agricultural Products | B2B Export | Reliable Supply",
    },
    trust: [
      { title: "Egyptian Origin", desc: "Premium agricultural products sourced from Egypt." },
      { title: "Quality Focus", desc: "Careful product selection and quality-focused handling." },
      { title: "Reliable Supply", desc: "Built around consistent sourcing and professional operations." },
      { title: "B2B Export", desc: "Serving international buyers and commercial partners." },
    ],
    about: {
      label: "About HAYYA",
      title: "Connecting Egyptian Agriculture With Global Markets",
      body: "HAYYA is an Egyptian agricultural export company focused on connecting high-quality Egyptian produce with international buyers. We work to build reliable supply relationships, maintain consistent product standards, and provide professional export solutions for our partners.",
      cta: "Learn More About HAYYA",
      points: [
        "Sourcing relationships across Egyptian agricultural regions",
        "Consistent product standards agreed with each buyer",
        "Professional, responsive communication throughout the process",
      ],
    },
    products: {
      label: "Our Products",
      title: "Egyptian Produce, Prepared for Global Markets",
      sub: "Product categories below are indicative. Availability depends on season and buyer specification — contact us to confirm current lines.",
      cta: "Request Information",
    },
    process: {
      label: "Quality & Sourcing",
      title: "From Source to Shipment",
      sub: "A straightforward, professional approach built around the requirements of commercial buyers.",
      steps: [
        { n: "01", title: "Sourcing", desc: "Selecting agricultural products through reliable sourcing relationships." },
        { n: "02", title: "Quality Selection", desc: "Focusing on product quality, freshness, and consistency." },
        { n: "03", title: "Preparation", desc: "Professional preparation and handling according to buyer requirements." },
        { n: "04", title: "Export", desc: "Supporting the process of delivering products to international buyers." },
      ],
    },
    why: {
      label: "Why HAYYA",
      title: "Why Partner With HAYYA",
      items: [
        { title: "Reliable Sourcing", desc: "Strong agricultural sourcing relationships." },
        { title: "Quality Focus", desc: "Attention to freshness, product condition, and consistency." },
        { title: "Professional Communication", desc: "Clear communication with international buyers and partners." },
        { title: "Flexible B2B Supply", desc: "Solutions designed around commercial buyer requirements." },
        { title: "Egyptian Agricultural Origin", desc: "Access to products sourced from Egypt." },
        { title: "Long-Term Partnerships", desc: "Focused on building sustainable business relationships." },
      ],
    },
    partnerships: {
      label: "Partnerships",
      title: "Built on Strong Business Relationships",
      body: "HAYYA works through established business and contractual relationships with trusted Egyptian entities, supporting reliable agricultural sourcing and supply operations.",
      note: "Relationship type: business and contractual",
    },
    global: {
      label: "Global Markets",
      title: "From Egypt to Global Markets",
      body: "We are focused on connecting Egyptian agricultural products with international buyers and building dependable long-term export relationships.",
      cta: "Start a Business Inquiry",
    },
    cta: {
      title: "Looking for a Reliable Egyptian Produce Supplier?",
      body: "Tell us what you are looking for, and our team will get back to you regarding availability and supply requirements.",
      primary: "Request a Quote",
      secondary: "Contact HAYYA",
    },
    contact: {
      label: "Contact",
      title: "Let's Talk Business",
      sub: "Share your requirements and our team will respond regarding availability and supply.",
      emailLabel: "Email",
      emailNote: "Address as supplied — pending confirmation.",
      phoneLabel: "Phone",
      locationLabel: "Location",
      form: {
        name: "Full Name",
        companyName: "Company Name",
        email: "Business Email",
        country: "Country",
        phone: "Phone Number",
        product: "Product of Interest",
        quantity: "Estimated Quantity",
        message: "Message",
        submit: "Send Inquiry",
        optional: "Optional",
        notice:
          "Form delivery is not connected yet. Until it is, please reach us by phone.",
        success:
          "Your inquiry was validated, but no email service is connected yet — please contact us by phone so nothing is missed.",
        errors: {
          name: "Please enter your full name.",
          company: "Please enter your company name.",
          email: "Please enter a valid business email.",
          country: "Please enter your country.",
          message: "Please tell us briefly what you need.",
        },
      },
    },
    footer: {
      desc: "Egyptian agricultural export company connecting quality-focused Egyptian produce with international B2B buyers.",
      nav: "Navigation",
      products: "Products",
      contact: "Contact",
      language: "Language",
      rights: "© 2026 HAYYA. All rights reserved.",
    },
  },

  ar: {
    dir: "rtl" as const,
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      products: "المنتجات",
      why: "لماذا هيا",
      partnerships: "الشراكات",
      contact: "اتصل بنا",
      quote: "اطلب عرض سعر",
      menu: "فتح القائمة",
      close: "إغلاق القائمة",
    },
    hero: {
      eyebrow: "التصدير الزراعي المصري",
      title: "طازج من مصر، وموثوق حول العالم",
      sub: "تربط هيا المنتجات الزراعية المصرية المتميزة بالأسواق الدولية من خلال توريد موثوق، وعمليات تركز على الجودة، وحلول تصدير احترافية.",
      primary: "اطلب عرض سعر",
      secondary: "استعرض منتجاتنا",
      trust: "منتجات زراعية مصرية | تصدير للشركات | إمداد موثوق",
    },
    trust: [
      { title: "منشأ مصري", desc: "منتجات زراعية متميزة يتم توريدها من مصر." },
      { title: "تركيز على الجودة", desc: "اختيار دقيق للمنتجات وتداول يركز على الجودة." },
      { title: "إمداد موثوق", desc: "قائم على توريد منتظم وعمليات احترافية." },
      { title: "تصدير للشركات", desc: "نخدم المشترين الدوليين والشركاء التجاريين." },
    ],
    about: {
      label: "عن هيا",
      title: "نربط الزراعة المصرية بالأسواق العالمية",
      body: "هيا شركة مصرية للتصدير الزراعي تركز على ربط المنتجات المصرية عالية الجودة بالمشترين الدوليين. نعمل على بناء علاقات إمداد موثوقة، والحفاظ على معايير ثابتة للمنتجات، وتقديم حلول تصدير احترافية لشركائنا.",
      cta: "اعرف المزيد عن هيا",
      points: [
        "علاقات توريد تمتد إلى المناطق الزراعية المصرية",
        "معايير ثابتة للمنتجات يتم الاتفاق عليها مع كل مشترٍ",
        "تواصل احترافي وسريع خلال جميع المراحل",
      ],
    },
    products: {
      label: "منتجاتنا",
      title: "محاصيل مصرية مُجهّزة للأسواق العالمية",
      sub: "فئات المنتجات التالية إرشادية، ويعتمد التوافر على الموسم ومواصفات المشتري — تواصل معنا لتأكيد الخطوط المتاحة حاليًا.",
      cta: "اطلب معلومات",
    },
    process: {
      label: "الجودة والتوريد",
      title: "من المصدر إلى الشحن",
      sub: "منهج واضح واحترافي مبني على متطلبات المشترين التجاريين.",
      steps: [
        { n: "٠١", title: "التوريد", desc: "اختيار المنتجات الزراعية من خلال علاقات توريد موثوقة." },
        { n: "٠٢", title: "انتقاء الجودة", desc: "التركيز على جودة المنتج وطزاجته واتساقه." },
        { n: "٠٣", title: "التجهيز", desc: "تجهيز وتداول احترافي وفق متطلبات المشتري." },
        { n: "٠٤", title: "التصدير", desc: "دعم عملية إيصال المنتجات إلى المشترين الدوليين." },
      ],
    },
    why: {
      label: "لماذا هيا",
      title: "لماذا الشراكة مع هيا",
      items: [
        { title: "توريد موثوق", desc: "علاقات توريد زراعي قوية." },
        { title: "تركيز على الجودة", desc: "اهتمام بالطزاجة وحالة المنتج والاتساق." },
        { title: "تواصل احترافي", desc: "تواصل واضح مع المشترين والشركاء الدوليين." },
        { title: "إمداد مرن للشركات", desc: "حلول مصممة حول متطلبات المشترين التجاريين." },
        { title: "منشأ زراعي مصري", desc: "وصول إلى منتجات يتم توريدها من مصر." },
        { title: "شراكات طويلة المدى", desc: "نركز على بناء علاقات عمل مستدامة." },
      ],
    },
    partnerships: {
      label: "الشراكات",
      title: "مبنية على علاقات عمل قوية",
      body: "تعمل هيا من خلال علاقات عمل وتعاقدية قائمة مع جهات مصرية موثوقة، بما يدعم موثوقية التوريد الزراعي وعمليات الإمداد.",
      note: "نوع العلاقة: عمل وتعاقد",
    },
    global: {
      label: "الأسواق العالمية",
      title: "من مصر إلى الأسواق العالمية",
      body: "نركز على ربط المنتجات الزراعية المصرية بالمشترين الدوليين وبناء علاقات تصدير موثوقة وطويلة المدى.",
      cta: "ابدأ استفسارًا تجاريًا",
    },
    cta: {
      title: "تبحث عن مورّد مصري موثوق للمحاصيل الزراعية؟",
      body: "أخبرنا بما تبحث عنه وسيتواصل معك فريقنا بشأن التوافر ومتطلبات الإمداد.",
      primary: "اطلب عرض سعر",
      secondary: "تواصل مع هيا",
    },
    contact: {
      label: "اتصل بنا",
      title: "لنتحدث في العمل",
      sub: "شاركنا متطلباتك وسيرد فريقنا بشأن التوافر والإمداد.",
      emailLabel: "البريد الإلكتروني",
      emailNote: "العنوان كما ورد — في انتظار التأكيد.",
      phoneLabel: "الهاتف",
      locationLabel: "الموقع",
      form: {
        name: "الاسم الكامل",
        companyName: "اسم الشركة",
        email: "البريد الإلكتروني للعمل",
        country: "الدولة",
        phone: "رقم الهاتف",
        product: "المنتج المطلوب",
        quantity: "الكمية التقديرية",
        message: "الرسالة",
        submit: "إرسال الاستفسار",
        optional: "اختياري",
        notice: "لم يتم ربط إرسال النموذج بخدمة بريد بعد. حتى ذلك الحين، يُرجى التواصل هاتفيًا.",
        success:
          "تم التحقق من استفسارك، لكن لم يتم ربط خدمة بريد بعد — يُرجى التواصل معنا هاتفيًا حتى لا يفوتنا طلبك.",
        errors: {
          name: "يُرجى إدخال الاسم الكامل.",
          company: "يُرجى إدخال اسم الشركة.",
          email: "يُرجى إدخال بريد إلكتروني صحيح.",
          country: "يُرجى إدخال الدولة.",
          message: "يُرجى توضيح ما تحتاجه بإيجاز.",
        },
      },
    },
    footer: {
      desc: "شركة مصرية للتصدير الزراعي تربط المنتجات المصرية عالية الجودة بالمشترين الدوليين.",
      nav: "التنقل",
      products: "المنتجات",
      contact: "اتصل بنا",
      language: "اللغة",
      rights: "© ٢٠٢٦ هيا. جميع الحقوق محفوظة.",
    },
  },
};

export type Copy = typeof copy.en;
