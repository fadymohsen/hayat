export type Locale = "ar" | "en";

export type Dictionary = {
  nav: {
    home: string;
    about: string;
    services: string;
    gallery: string;
    faqs: string;
    contact: string;
    logoTitle: string;
    logoSub: string;
  };
  common: {
    callNow: string;
    learnMore: string;
    viewAll: string;
    getInTouch: string;
    exploreGallery: string;
    requestConsultation: string;
    ourServices: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    scrollDown: string;
    statsTitle: string;
    statsSubtitle: string;
    aboutTitle: string;
    aboutText: string;
    aboutCta: string;
    servicesTitle: string;
    servicesSubtitle: string;
    galleryTitle: string;
    gallerySubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
  };
  stats: { years: string; projects: string; manpower: string; equipment: string };
  services: {
    development: { title: string; description: string };
    management: { title: string; description: string };
    marketing: { title: string; description: string };
    consulting: { title: string; description: string };
  };
  about: {
    title: string;
    subtitle: string;
    intro: string;
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    valuesTitle: string;
    valuesSubtitle: string;
    values: {
      safety: { title: string; text: string };
      integrity: { title: string; text: string };
      respect: { title: string; text: string };
      transparency: { title: string; text: string };
    };
    qhseTitle: string;
    qhseText: string;
    qhsePoints: string[];
  };
  servicesPage: { title: string; subtitle: string };
  galleryPage: { title: string; subtitle: string; browse: string };
  faqsPage: {
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    infoTitle: string;
    address: string;
    form: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      submit: string;
      success: string;
      serviceLabel: string;
      services: string[];
    };
  };
  footer: {
    brief: string;
    quickLinks: string;
    contact: string;
    rights: string;
    vision: string;
    iso: string;
  };
};

export const dictionary: Record<Locale, Dictionary> = {
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      gallery: "معرض الأعمال",
      faqs: "الأسئلة الشائعة",
      contact: "اتصل بنا",
      logoTitle: "حياة السعودية",
      logoSub: "استثمار وتطوير عقاري",
    },
    common: {
      callNow: "اتصل الآن",
      learnMore: "اعرف المزيد",
      viewAll: "عرض الكل",
      getInTouch: "تواصل معنا",
      exploreGallery: "تصفح معرض الأعمال",
      requestConsultation: "اطلب استشارة",
      ourServices: "خدماتنا",
    },
    home: {
      heroEyebrow: "حياة السعودية للاستثمار والتطوير العقاري",
      heroTitle: "نبني حياة أجمل",
      heroSubtitle:
        "شركة رائدة في تطوير المشاريع السكنية والتجارية والاستثمارية، تجمع بين خبرة تزيد عن ١١ عامًا وجودة عالمية تواكب رؤية المملكة ٢٠٣٠.",
      scrollDown: "اكتشف المزيد",
      statsTitle: "أرقام تتحدث عن خبرتنا",
      statsSubtitle: "إنجازات ملموسة راكمتها حياة السعودية على مر السنين.",
      aboutTitle: "نصنع بيئات عمرانية ملهمة",
      aboutText: "منذ أكثر من ١١ عامًا ونحن نعمل على إثراء المشهد العمراني في المملكة العربية السعودية بمشاريع ترفع معايير الجودة وتلبّي تطلعات عملائنا، بخبرة متراكمة وشغف لا يتوقف.",
      aboutCta: "تعرّف علينا أكثر",
      servicesTitle: "خدماتنا الأساسية",
      servicesSubtitle:
        "نقدم منظومة متكاملة من الخدمات العقارية التي تغطي دورة حياة المشروع من الفكرة إلى التسليم.",
      galleryTitle: "معرض أعمال حياة",
      gallerySubtitle:
        "مجموعة مختارة من أبرز أعمالنا التي تعكس التزامنا بالجودة والتميّز.",
      ctaTitle: "هل لديك مشروع في الأفق؟",
      ctaSubtitle:
        "فريقنا مستعد لتحويل رؤيتك العقارية إلى واقع ملموس. تواصل معنا اليوم.",
    },
    stats: {
      years: "سنوات الخبرة",
      projects: "أعمال منجزة",
      manpower: "كوادر بشرية",
      equipment: "معدات وآليات",
    },
    services: {
      development: {
        title: "التطوير العقاري",
        description:
          "تطوير مشاريع سكنية وتجارية متكاملة وفق أعلى المعايير الهندسية والمعمارية.",
      },
      management: {
        title: "إدارة الأملاك",
        description:
          "إدارة احترافية للأصول العقارية تضمن أعلى عائد وصيانة مستدامة.",
      },
      marketing: {
        title: "التسويق العقاري",
        description:
          "خطط تسويقية مبتكرة تُبرز قيمة مشاريعك وتصل بها إلى الشريحة المستهدفة.",
      },
      consulting: {
        title: "الاستشارات العقارية",
        description:
          "دراسات جدوى وتوصيات استثمارية مدعومة بخبرة ميدانية وتحليل سوقي دقيق.",
      },
    },
    about: {
      title: "من نحن",
      subtitle: "",
      intro: "",
      visionTitle: "رؤيتنا",
      visionText:
        "أن نكون الشركة الرائدة في قطاع التطوير العقاري على مستوى المملكة العربية السعودية، من خلال تقديم مشاريع نوعية تواكب رؤية المملكة ٢٠٣٠.",
      missionTitle: "رسالتنا",
      missionText:
        "تقديم حلول عقارية مبتكرة ذات جودة عالية، تسهم في التنمية العمرانية المستدامة وتحقق قيمة استثمارية حقيقية لعملائنا وشركائنا.",
      valuesTitle: "قيمنا الجوهرية",
      valuesSubtitle: "المبادئ التي توجّه كل قرار نتخذه وكل مشروع ننفّذه.",
      values: {
        safety: { title: "السلامة", text: "أولوية قصوى في كل مواقع العمل." },
        integrity: { title: "النزاهة", text: "الصدق والشفافية في كل تعاملاتنا." },
        respect: { title: "الاحترام", text: "نحترم عملاءنا وشركاءنا وفريقنا." },
        transparency: {
          title: "الشفافية",
          text: "وضوح كامل في التواصل وتنفيذ الأعمال.",
        },
      },
      qhseTitle: "سياسة الجودة والصحة والسلامة والبيئة (QHSE)",
      qhseText:
        "نلتزم بأعلى معايير الجودة والسلامة المهنية والحفاظ على البيئة، ونعمل وفق شهادة ISO 45001:2018 لضمان بيئة عمل آمنة ومستدامة.",
      qhsePoints: [
        "الالتزام بشهادة ISO 45001:2018 لأنظمة إدارة السلامة والصحة المهنية.",
        "تطبيق منظومة جودة شاملة في جميع مراحل تنفيذ المشاريع.",
        "حماية البيئة ومتابعة الأثر البيئي لكل مشروع.",
        "تدريب مستمر للكوادر البشرية على أحدث ممارسات السلامة.",
      ],
    },
    servicesPage: {
      title: "خدماتنا",
      subtitle:
        "حلول عقارية متكاملة تغطي كل احتياجاتك من التخطيط حتى ما بعد التسليم.",
    },
    galleryPage: {
      title: "معرض الأعمال",
      subtitle:
        "مختارات من أعمال حياة التي أنجزناها بجودة عالية وتنفيذ دقيق.",
      browse: "تصفح كامل المعرض",
    },
    faqsPage: {
      title: "الأسئلة الشائعة",
      subtitle:
        "أبرز التساؤلات حول خدماتنا ومشاريعنا وطرق التعاون معنا.",
      items: [
        {
          q: "ما هي الخدمات التي تقدمها شركة حياة السعودية؟",
          a: "نقدم خدمات التطوير العقاري، إدارة الأملاك، التسويق العقاري، والاستشارات العقارية لكامل أنواع المشاريع السكنية والتجارية والاستثمارية.",
        },
        {
          q: "أين تقع مشاريعكم الرئيسية؟",
          a: "تتمركز أغلب مشاريعنا في مدينة الرياض والمناطق المحيطة بها، مع توسع مستمر في مختلف مدن المملكة العربية السعودية.",
        },
        {
          q: "كيف يمكنني طلب استشارة عقارية؟",
          a: "يمكنك التواصل معنا عبر الهاتف 0114741991 أو واتساب +966 54 001 1644 أو عبر نموذج التواصل في صفحة اتصل بنا.",
        },
        {
          q: "هل تقدمون خدمات إدارة الأملاك لكل أنواع العقارات؟",
          a: "نعم، نتولى إدارة العقارات السكنية والتجارية، ونقدم حلول صيانة وتأجير متكاملة بعقود مرنة.",
        },
      ],
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "نسعد بتواصلك معنا وسنرد عليك في أقرب وقت ممكن.",
      infoTitle: "معلومات التواصل",
      address: "طريق فرع مكة المكرمة، حي الربوة، الرياض، المملكة العربية السعودية 10484",
      form: {
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الجوال",
        subject: "الموضوع",
        message: "رسالتك",
        submit: "إرسال الرسالة",
        success: "شكرًا لتواصلك! سنعود إليك قريبًا.",
        serviceLabel: "الخدمة المطلوبة",
        services: [
          "التطوير العقاري",
          "إدارة الأملاك",
          "التسويق العقاري",
          "استشارات عقارية",
          "أخرى",
        ],
      },
    },
    footer: {
      brief:
        "شركة سعودية متخصصة في التطوير والاستثمار العقاري، نصنع بيئات عمرانية ملهمة تحاكي تطلعات الإنسان وتدعم رؤية المملكة ٢٠٣٠.",
      quickLinks: "روابط سريعة",
      contact: "تواصل معنا",
      rights: "جميع الحقوق محفوظة",
      vision: "داعم لرؤية المملكة ٢٠٣٠",
      iso: "معتمد ISO 45001:2018",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      gallery: "Gallery",
      faqs: "FAQs",
      contact: "Contact",
      logoTitle: "Hayat Saudi",
      logoSub: "Real Estate Development",
    },
    common: {
      callNow: "Call Now",
      learnMore: "Learn More",
      viewAll: "View All",
      getInTouch: "Get in Touch",
      exploreGallery: "Explore Our Gallery",
      requestConsultation: "Request a Consultation",
      ourServices: "Our Services",
    },
    home: {
      heroEyebrow: "Hayat Saudi Investment & Real Estate Development",
      heroTitle: "Building a Beautiful Life",
      heroSubtitle:
        "A leading Saudi developer shaping residential, commercial, and investment projects with over 11 years of expertise and world-class quality aligned with Vision 2030.",
      scrollDown: "Discover More",
      statsTitle: "Numbers That Speak for Our Expertise",
      statsSubtitle:
        "A track record of tangible achievements accumulated over the years.",
      aboutTitle: "Shaping Inspiring Urban Environments",
      aboutText: "For over 11 years, we have been enriching the Kingdom's urban landscape with projects that raise the bar for quality and meet our clients' aspirations — driven by accumulated expertise and relentless passion.",
      aboutCta: "Learn More About Us",
      servicesTitle: "Core Services",
      servicesSubtitle:
        "An integrated suite of real estate services covering the full project lifecycle — from concept to handover.",
      galleryTitle: "Featured HAYAT Gallery",
      gallerySubtitle:
        "A curated selection of our most notable works that reflect our commitment to quality and excellence.",
      ctaTitle: "Have a Project on the Horizon?",
      ctaSubtitle:
        "Our team is ready to turn your real estate vision into reality. Get in touch today.",
    },
    stats: {
      years: "Years of Experience",
      projects: "Works Completed",
      manpower: "Manpower",
      equipment: "Equipment Fleets",
    },
    services: {
      development: {
        title: "Real Estate Development",
        description:
          "Integrated residential and commercial developments built to the highest engineering and architectural standards.",
      },
      management: {
        title: "Property Management",
        description:
          "Professional asset management that maximizes returns and ensures sustainable maintenance.",
      },
      marketing: {
        title: "Real Estate Marketing",
        description:
          "Creative marketing strategies that showcase the value of your projects and reach the right audience.",
      },
      consulting: {
        title: "Real Estate Consulting",
        description:
          "Feasibility studies and investment recommendations backed by field experience and rigorous market analysis.",
      },
    },
    about: {
      title: "Who We Are",
      subtitle: "",
      intro: "",
      visionTitle: "Our Vision",
      visionText:
        "To be the leading company in the real estate development sector across the Kingdom of Saudi Arabia, by delivering distinctive projects aligned with Vision 2030.",
      missionTitle: "Our Mission",
      missionText:
        "To deliver innovative, high-quality real estate solutions that contribute to sustainable urban development and generate real investment value for our clients and partners.",
      valuesTitle: "Our Core Values",
      valuesSubtitle:
        "The principles that guide every decision we make and every project we deliver.",
      values: {
        safety: { title: "Safety", text: "Top priority across every worksite." },
        integrity: {
          title: "Integrity",
          text: "Honesty and transparency in everything we do.",
        },
        respect: {
          title: "Respect",
          text: "For our clients, partners, and our people.",
        },
        transparency: {
          title: "Transparency",
          text: "Complete clarity in communication and execution.",
        },
      },
      qhseTitle: "Quality, Health, Safety & Environment (QHSE)",
      qhseText:
        "We uphold the highest standards of quality, occupational safety, and environmental care — operating under ISO 45001:2018 certification to ensure a safe and sustainable work environment.",
      qhsePoints: [
        "Certified to ISO 45001:2018 for occupational health & safety management.",
        "A comprehensive quality framework across every project phase.",
        "Environmental protection and impact tracking on every project.",
        "Ongoing training of our workforce on the latest safety practices.",
      ],
    },
    servicesPage: {
      title: "Our Services",
      subtitle:
        "Integrated real estate solutions covering all your needs — from planning to post-handover.",
    },
    galleryPage: {
      title: "Our Gallery",
      subtitle:
        "Selected HAYAT works delivered with high quality and rigorous execution.",
      browse: "Browse the Full Gallery",
    },
    faqsPage: {
      title: "Frequently Asked Questions",
      subtitle:
        "Key questions about our services, projects, and ways to work together.",
      items: [
        {
          q: "What services does Hayat Saudi provide?",
          a: "We provide real estate development, property management, real estate marketing, and real estate consulting across residential, commercial, and investment projects.",
        },
        {
          q: "Where are your primary projects located?",
          a: "Most of our projects are in Riyadh and its surrounding areas, with ongoing expansion across various cities in the Kingdom.",
        },
        {
          q: "How can I request a property consultation?",
          a: "Contact us by phone at 0114741991, WhatsApp at +966 54 001 1644, or through the form on our Contact Us page.",
        },
        {
          q: "Do you offer property management for all property types?",
          a: "Yes. We manage residential and commercial properties and offer integrated maintenance and leasing solutions with flexible contracts.",
        },
      ],
    },
    contact: {
      title: "Contact Us",
      subtitle: "We'd love to hear from you — we respond as soon as possible.",
      infoTitle: "Contact Information",
      address:
        "Makkah Al Mukarramah Branch Road, Al Rabwa District, Riyadh, KSA 10484",
      form: {
        name: "Full Name",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        message: "Your Message",
        submit: "Send Message",
        success: "Thank you for reaching out! We will get back to you soon.",
        serviceLabel: "Service of Interest",
        services: [
          "Real Estate Development",
          "Property Management",
          "Real Estate Marketing",
          "Real Estate Consulting",
          "Other",
        ],
      },
    },
    footer: {
      brief:
        "A Saudi company specialized in real estate development and investment — shaping inspiring urban environments that match human aspirations and support Vision 2030.",
      quickLinks: "Quick Links",
      contact: "Get in Touch",
      rights: "All rights reserved",
      vision: "Aligned with Saudi Vision 2030",
      iso: "ISO 45001:2018 Certified",
    },
  },
};
