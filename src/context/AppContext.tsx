"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Lang = "en" | "ar";

interface AppContextType {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.products": "Equipment Catalog",
    "nav.about": "About ICS",
    "nav.contact": "Contact & Support",
    "nav.cta": "Request a Quote",

    // Hero
    "hero.tag": "CERTIFIED FIRE SUPPRESSION & ALARM SYSTEMS",
    "hero.title1": "Fire Protection Systems",
    "hero.title2": "Engineered for Infrastructure",
    "hero.title3": "& Industrial Safety.",
    "hero.desc":
      "Supplying code-compliant fire suppression and alarm equipment engineered for commercial, industrial, and institutional projects.",
    "hero.explore": "View Equipment Catalog",
    "hero.about": "Engineering Standards",
    "hero.scroll": "Scroll to examine specifications",
    "hero.featured": "STANDARD EQUIPMENT",
    "hero.cardTitle": "6KG ABC Dry Powder Extinguisher",
    "hero.cardSubtitle": "EN3 / CE Certified multi-purpose suppression unit",
    "hero.searchPlaceholder": "Search equipment, model code, or spec (e.g. 6KG powder, hose reel, smoke detector)...",
    "hero.searchBtn": "Search Catalog",
    "hero.quickBoq": "Upload Project BOQ",
    "hero.quickBoqSub": "Get itemized price quote within 24h",
    "hero.quickPill1": "Fire Extinguishers",
    "hero.quickPill2": "Hose Reels & Cabinets",
    "hero.quickPill3": "Alarm & Detection",
    "hero.quickPill4": "Valves & Sprinklers",

    // Ticker
    "ticker.certified": "CIVIL DEFENCE & EN3 / NFPA CERTIFIED EQUIPMENT",
    "ticker.sizing": "Hydraulic Sizing Support",
    "ticker.confidence": "Batch Testing Certifications",
    "ticker.protect": "Commercial & Industrial Warranties",

    // Disciplines / Categories
    "cat.tag": "EQUIPMENT CATEGORIES",
    "cat.title1": "Engineered Protection.",
    "cat.title2": "Every Layer Covered.",
    "cat.desc":
      "Complete fire safety systems, from optical smoke detection to high-capacity water flow networks.",
    "cat.extinguishers": "Portable Fire Extinguishers",
    "cat.extinguishersDesc": "Stored pressure dry powder, CO2, and foam extinguishers certified to EN3.",
    "cat.alarm": "Fire Detection & Alarm Networks",
    "cat.alarmDesc": "Addressable optical smoke sensors and multi-candela sounder strobes to EN54.",
    "cat.hoseReels": "Hose Reels & Equipment Cabinets",
    "cat.hoseReelsDesc": "Continuous-flow swing reels and heavy-gauge electro-galvanized cabinets.",
    "cat.sprinklers": "Sprinkler Networks & Valves",
    "cat.sprinklersDesc": "UL/FM compliant automatic sprinkler heads, test valves, and alarm check valves.",
    "cat.viewAll": "Browse Category",
    "cat.itemsCount": "Approved Models",

    // Featured Products
    "spotlight.tag": "TOP COMMERCIAL & INDUSTRIAL HARDWARE",
    "spotlight.title": "Certified Equipment in Stock for Immediate Dispatch",
    "spotlight.desc": "Standard project equipment certified to EN3, EN54, and NFPA standards with lab hydrostatic test certificates.",
    "spotlight.allProducts": "Full Equipment Catalog (6)",
    "spotlight.quoteBtn": "Request Quote",
    "spotlight.detailsBtn": "Technical Specs",
    "spotlight.disclaimer":
      "All fire ratings (A, B, C, E) and technical metrics certified to EN3, EN54, and NFPA standards.",

    // Trust & Guarantees
    "trust.tag": "CONTRACTOR COMMITMENTS",
    "trust.title": "Certified Equipment. Reliable Project Turnaround.",
    "trust.civilDefence": "Civil Defence Approved",
    "trust.civilDefenceDesc": "Fully certified to meet all civil defence inspection criteria with complete submittal documentation.",
    "trust.boqTurnaround": "24h BOQ Turnaround",
    "trust.boqTurnaroundDesc": "Dedicated MEP engineers review drawings and bills of quantities within 24 hours.",
    "trust.warranty": "5-Year Manufacturer Warranty",
    "trust.warrantyDesc": "Certified warranty backing on cylinders and cabinets with available genuine replacement components.",
    "trust.delivery": "Immediate Site Dispatch",
    "trust.deliveryDesc": "Extensive stock of standard models ready for prompt scheduled site delivery.",

    // Direct BOQ Callout
    "boq.tag": "FAST ESTIMATION DESK",
    "boq.title": "Have an MEP Bill of Quantities (BOQ) or Drawing Schedule?",
    "boq.desc": "Send your project schedule directly to our engineering desk for immediate code verification, specification matching, and an itemized commercial proposal within 24 hours.",
    "boq.ctaPrimary": "Submit Project BOQ Now",
    "boq.ctaSecondary": "Talk with a Sales Engineer",

    // Anatomy
    "anatomy.tag": "TECHNICAL SPECIFICATIONS",
    "anatomy.title": "Component Engineering & Quality Standards",
    "anatomy.desc":
      "Engineered for harsh operating conditions, backed by batch hydrostatic pressure certifications.",
    "anatomy.drawing": "TECHNICAL SCHEMATIC REF: ICS-FE-001",
    "anatomy.interactive": "Component Inspection",
    "anatomy.tab1": "SAFETY LOCK PIN",
    "anatomy.tab2": "PRESSURE GAUGE",
    "anatomy.tab3": "DISCHARGE HOSE",
    "anatomy.point1Title": "Stainless Steel Pull Pin & Tamper Seal",
    "anatomy.point1Desc": "Positive locking pin prevents accidental discharge with fast one-hand pull for emergencies.",
    "anatomy.point2Title": "Bourdon Tube Pressure Indicator",
    "anatomy.point2Desc": "Calibrated Bourdon gauge for instant pressure verification during routine inspections.",
    "anatomy.point3Title": "Reinforced EPDM Flexible Hose & Nozzle",
    "anatomy.point3Desc": "High-burst pressure reinforced rubber hose with directional brass discharge nozzle.",

    // Applications
    "app.tag": "FACILITY APPLICATIONS",
    "app.title1": "Engineered for Specific",
    "app.title2": "Risk Environments.",
    "app.desc":
      "Equipment selected according to specific facility risk profiles, fuel types, and safety codes.",
    "app.commercial": "Commercial & Corporate Facilities",
    "app.commercialDesc": "Offices, retail complexes, educational institutions, and healthcare centers",
    "app.industrial": "Industrial & Heavy Storage",
    "app.industrialDesc": "Manufacturing plants, chemical storage, logistics warehouses, and power substations",

    // 3-Step Process
    "process.tag": "COMPLIANCE & SUPPLY PROCESS",
    "process.title": "From Blueprints to Approved Supply",
    "process.step1": "1. Drawing Review",
    "process.step1Desc": "Reviewing MEP drawings to determine required equipment ratings and placement.",
    "process.step2": "2. Specification Match",
    "process.step2Desc": "Matching equipment with project specifications and local civil defence codes.",
    "process.step3": "3. Delivery & Testing",
    "process.step3Desc": "Dispatching certified batches with test certificates and manufacturer warranty.",

    // Mindset
    "mindset.tag": "ABOUT ICS FIRE SYSTEMS",
    "mindset.title": "Engineering Precision in Fire Protection",
    "mindset.desc":
      "ICS equips contractors and MEP consultants with certified fire protection hardware, clear documentation, and rapid commercial submittals.",
    "mindset.btn": "Corporate Profile & Credentials",

    // FAQ
    "faq.tag": "TECHNICAL & PROCUREMENT FAQS",
    "faq.title": "Frequently Asked Questions",
    "faq.sub": "Direct answers regarding certifications, civil defence approvals, and project delivery.",

    // Red CTA
    "cta.tag": "PROJECT QUOTATION & CONSULTATION",
    "cta.title": "Discuss Equipment Specifications for Your Project",
    "cta.btn": "Request Engineering Quote",
    "cta.sub": "Submit your bill of quantities or project drawings for an itemized commercial proposal.",

    // Footer
    "footer.brandText": "Certified fire protection systems, suppression equipment, and engineering support for building infrastructure.",
    "footer.explore": "EQUIPMENT",
    "footer.equipment": "CATEGORIES",
    "footer.startConvo": "CONTACT",
    "footer.rights": "© 2026 ICS Fire Systems. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Supply",
    "footer.tagline": "Industrial Safety & Fire Systems",

    // Products Page
    "products.tag": "EQUIPMENT CATALOGUE",
    "products.heroTitle1": "Certified Fire Safety",
    "products.heroTitle2": "Equipment.",
    "products.heroDesc":
      "Certified portable extinguishers, addressable detection, and heavy-duty hose reel cabinets.",
    "products.searchPlaceholder": "Search by product name, code, or standard...",
    "products.showing": "Showing",
    "products.sampleProducts": "standard products",
    "products.sort": "Sort: Default",
    "products.filterTitle": "Filter Specifications",
    "products.category": "SYSTEM TYPE",
    "products.allEquipment": "All Categories",
    "products.application": "FACILITY SUITABILITY",
    "products.appCommercial": "Commercial Occupancies",
    "products.appIndustrial": "Industrial Facilities",
    "products.appShared": "Multi-Tenant Buildings",
    "products.helpTitle": "Need a Technical Schedule?",
    "products.helpDesc": "Submit your MEP bill of quantities for instant specification matching and formal quotation.",
    "products.helpLink": "Contact Engineering Sales",
    "products.disclaimer":
      "All equipment is supplied with factory batch test certificates and civil defence compliance documentation.",

    // Product Detail Page
    "detail.breadcrumbs": "Equipment Catalog",
    "detail.enquire": "Request Project Quotation",
    "detail.requestInfo": "Download Technical Datasheet",
    "detail.finePrint":
      "International code compliance certified. Verify site-specific ratings with our technical desk.",
    "detail.overview": "Equipment Overview",
    "detail.technical": "Technical Specifications",
    "detail.preview3d": "3D Component View",
    "detail.related": "Complementary Equipment",
    "detail.knowEquip": "TECHNICAL SPECIFICATION",
    "detail.techTitle": "Engineering & Construction Data",
    "detail.techDesc":
      "Comprehensive performance metrics and dimensional tolerances. Factory inspection reports and compliance documentation available on request.",
    "detail.sampleBadge": "Certified Factory Specification",
    "detail.previewConcept": "3D INTERACTIVE INSPECTION",
    "detail.notConnected": "Interactive 3D Active",
    "detail.conceptControls": "Rotate 360° or zoom to inspect cylinder, valve, and gauge assembly.",
    "detail.anotherPersp": "EQUIPMENT PROFILE",
    "detail.everyAngle": "360° Technical Inspection",
    "detail.angleDesc":
      "Examine high-pressure cylinder body, seamless valve threading, pressure gauge housing, and discharge hose connection.",
    "detail.anglePlanned":
      "Full CAD schematics and BIM Revit models available for consultant and MEP coordination.",
    "detail.partOfBigger": "Related Safety Equipment",
    "detail.browseAll": "View All Equipment",

    // About Page
    "about.tag": "COMPANY BACKGROUND",
    "about.title1": "Certified Fire Systems",
    "about.title2": "Built for Compliance.",
    "about.desc":
      "ICS supplies high-specification fire-safety equipment and engineered systems to contractors, developers, and facility managers across the region.",
    "about.whyTag": "CORPORATE PROFILE",
    "about.whyTitle": "Practical safety solutions built on compliance, not compromises.",
    "about.whyP1":
      "ICS delivers certified fire detection and suppression systems, supported by rigorous third-party testing and dedicated engineering guidance.",
    "about.whyP2":
      "We supply code-compliant hardware to satisfy civil defence inspection standards and safeguard occupants and facilities.",
    "about.guidesTag": "CORE PRINCIPLES",
    "about.guidesTitle": "Our Operating Standards",
    "about.p1Title": "Regulatory Compliance",
    "about.p1Desc":
      "Certified to international standards (EN3, EN54, NFPA) with third-party testing documentation.",
    "about.p2Title": "Technical Transparency",
    "about.p2Desc":
      "Precise datasheets and sizing calculations to accelerate consultant and contractor approvals.",
    "about.p3Title": "Reliable Supply Logistics",
    "about.p3Desc":
      "Reliable inventory and punctual batch logistics to keep project handover on schedule.",
    "about.purposeTag": "PROJECT IMPLEMENTATION",
    "about.purposeTitle": "Equipment Sized to Actual Risk",
    "about.purposeDesc":
      "Optimal protection requires matching fire loads to correct equipment schedules. Consult our engineers to finalize your submittal.",
    "about.exploreBtn": "Review Equipment Catalog",
    "about.ctaTitle": "Discuss Your Next Fire Protection Schedule",
    "about.ctaBtn": "Contact Our Sales Engineers",

    // Contact Page
    "contact.tag": "ENGINEERING INQUIRIES",
    "contact.title1": "Direct Project Support",
    "contact.title2": "& Commercial Inquiries.",
    "contact.desc":
      "Contact our engineering team for equipment specifications, bill of quantities review, and commercial supply proposals.",
    "contact.teamTag": "ENGINEERING SALES DESK",
    "contact.teamTitle": "Request Technical Schedules & Pricing",
    "contact.teamDesc":
      "Submit your project requirements and BOQ. Our engineering sales desk prepares an itemized proposal within 24 hours.",
    "contact.notEmergencyTitle": "Commercial & Technical Channel Only",
    "contact.notEmergencyDesc":
      "Commercial sales and technical desk only. For live emergencies, contact your local civil defence.",
    "contact.formTitle": "Project Information & Request for Quote",
    "contact.required": "* Mandatory fields",
    "contact.fullName": "Full Name *",
    "contact.workEmail": "Corporate Email *",
    "contact.company": "Company / Contractor Name",
    "contact.phone": "Direct Phone / WhatsApp",
    "contact.howHelp": "Inquiry Type *",
    "contact.productInterest": "Primary Product Line of Interest",
    "contact.yourMessage": "Project Scope / Bill of Quantities *",
    "contact.addBrief": "Upload Drawings or Equipment Schedule",
    "contact.fileNotice": "Optional - PDF, DWG, JPG or PNG up to 10 MB",
    "contact.browse": "Choose File",
    "contact.consent":
      "I agree to ICS processing this project data to prepare the technical submittal and quotation.",
    "contact.submit": "Submit Quotation Request",
    "contact.thankTitle": "Request Submitted Successfully",
    "contact.thankDesc":
      "Your project scope has been received. An engineering sales representative will deliver an itemized quotation within 24 hours.",
    "contact.sendAnother": "Submit Another Inquired Item",
    "contact.nextTag": "INQUIRY LIFECYCLE",
    "contact.nextStep1Title": "1. Technical Scope Review",
    "contact.nextStep1Desc": "Our engineering desk verifies model compliance against your project specifications and safety codes.",
    "contact.nextStep2Title": "2. Commercial Proposal & Lead Time",
    "contact.nextStep2Desc":
      "You receive an itemized proposal with factory test certificates, warranty terms, and delivery schedules.",

    // Product Names & Specs
    "prod.ics-p06.name": "6KG ABC Dry Powder Extinguisher",
    "prod.ics-p06.specs": "6 kg capacity / Stored pressure / EN3 certified",
    "prod.ics-p06.tagline":
      "Multi-purpose stored-pressure fire extinguisher engineered for Class A, B, and C fires and electrical risks in commercial and industrial settings.",
    "prod.ics-c05.name": "5KG Carbon Dioxide (CO2) Extinguisher",
    "prod.ics-c05.specs": "5 kg capacity / High-pressure seamless cylinder",
    "prod.ics-c05.tagline":
      "Clean-agent suppression designed specifically for sensitive electrical switchgear, server rooms, and flammable liquids without chemical residue.",
    "prod.ics-d01.name": "Optical Smoke Detector (EN54-7)",
    "prod.ics-d01.specs": "Photoelectric sensor / Low-profile ceiling mount",
    "prod.ics-d01.tagline":
      "Precision light-scattering optical detector with dual-chamber sensing and digital algorithms to prevent false alarms in commercial facilities.",
    "prod.ics-h30.name": "Wall-Mounted Fire Hose Reel (30M)",
    "prod.ics-h30.specs": "30m length / 19mm diameter / 180° swing arm",
    "prod.ics-h30.tagline":
      "Heavy-duty continuous-flow manual swing hose reel engineered for rapid high-volume water intervention in industrial and public occupancies.",
    "prod.ics-a02.name": "Audible Sounder with Xenon Strobe",
    "prod.ics-a02.specs": "100 dB output / High-candela visual beacon",
    "prod.ics-a02.tagline":
      "Combined high-decibel acoustic sounder and visual strobe beacon for dependable emergency notification in noisy industrial environments.",
    "prod.ics-b01.name": "Electro-Galvanized Fire Hose Cabinet",
    "prod.ics-b01.specs": "1.2mm steel construction / Tempered glass door",
    "prod.ics-b01.tagline":
      "Corrosion-resistant steel enclosure with chrome latch and break-glass viewing panel, accommodating standard 30m hose and landing valve.",

    "cat.fireExtinguishers": "Portable Extinguishers",
    "cat.detectionAlarm": "Detection & Alarm",
    "cat.hoseReelsCabinets": "Hose Reels & Cabinets",

    // Spec Labels
    "spec.code": "Product Reference",
    "spec.agent": "Extinguishing Media",
    "spec.charge": "Nominal Capacity",
    "spec.pressure": "Operating System",
    "spec.finish": "Cylinder / Finish",
    "spec.discharge": "Discharge Mechanism",
    "spec.rating": "Fire Ratings & Approvals",
    "spec.dimensions": "Physical Dimensions",
    "spec.principle": "Operating Principle",
    "spec.voltage": "Operating Voltage",
    "spec.sensorProfile": "Architectural Profile",
    "spec.indicator": "Visual Indicator",
    "spec.hoseLength": "Hose Length & Bore",
    "spec.workingPressure": "Rated Working Pressure",
    "spec.swingMechanism": "Mounting & Swing Mechanism",
    "spec.nozzle": "Nozzle Specifications",
    "spec.soundOutput": "Sound Output Level",
    "spec.lightOutput": "Visual Output Level",
    "spec.enclosure": "Ingress Protection Rating",
    "spec.housing": "Housing Material",
    "spec.material": "Enclosure Material",
    "spec.doorType": "Door Configuration",
    "spec.hingeType": "Hinge Mechanism",
    "spec.internalCapacity": "Internal Capacity",
    "spec.standards": "Compliance Standards",
  },
  ar: {
    // Nav
    "nav.home": "الرئيسية",
    "nav.products": "كتالوج المعدات",
    "nav.about": "عن الشركة",
    "nav.contact": "الاتصال والدعم الفني",
    "nav.cta": "طلب عرض أسعار",

    // Hero
    "hero.tag": "أنظمة إطفاء معتمدة للمشاريع",
    "hero.title1": "أنظمة ومعدات مكافحة الحرائق",
    "hero.title2": "المعتمدة للمنشآت الحيوية",
    "hero.title3": "والمشاريع الإنشائية.",
    "hero.desc":
      "توريد وتجهيز أنظمة الإطفاء والإنذار المعتمدة طبقا لاشتراطات الدفاع المدني وكود EN3 و NFPA للمنشآت التجارية والصناعية.",
    "hero.explore": "استعراض كتالوج المعدات",
    "hero.about": "المعايير الهندسية والاعتمادات",
    "hero.scroll": "مرر للأسفل للاطلاع على المواصفات الفنية",
    "hero.featured": "معدة قياسية معتمدة",
    "hero.cardTitle": "طفاية بودرة جافة ABC سعة 6 كجم",
    "hero.cardSubtitle": "وحدة متعددة الأغراض معتمدة طبقا للمعيار الأوروبي EN3",
    "hero.searchPlaceholder": "ابحث باسم المعدة، كود الطراز، أو المواصفة (مثال: طفاية بودرة، بكرة خرطوم، كاشف دخان)...",
    "hero.searchBtn": "بحث فوري",
    "hero.quickBoq": "رفع جدول كميات المشروع (BOQ)",
    "hero.quickBoqSub": "تسعير فني ومالي معتمد خلال 24 ساعة",
    "hero.quickPill1": "طفايات حريق",
    "hero.quickPill2": "كبائن وخراطيم",
    "hero.quickPill3": "شبكات إنذار",
    "hero.quickPill4": "رشاشات ومحابس",

    // Ticker
    "ticker.certified": "اعتمادات الدفاع المدني والمعايير الدولية EN3 / NFPA",
    "ticker.sizing": "دعم الحسابات الهيدروليكية",
    "ticker.confidence": "شهادات اختبار وفحص المصنع",
    "ticker.protect": "ضمانات للمشاريع الكبرى",

    // Disciplines / Categories
    "cat.tag": "قطاعات المعدات الرئيسية",
    "cat.title1": "أنظمة متكاملة.",
    "cat.title2": "تغطية شاملة لكل المخاطر.",
    "cat.desc":
      "حلول متكاملة من كشف الدخان إلى شبكات الإطفاء المائي المعتمدة.",
    "cat.extinguishers": "طفايات الحريق اليدوية والمحمولة",
    "cat.extinguishersDesc": "طفايات بودرة جافة، CO2، ورغوة ميكانيكية معتمدة بمعايير EN3.",
    "cat.alarm": "شبكات الإنذار والكشف المبكر",
    "cat.alarmDesc": "كواشف دخان معنونة وأجهزة إنذار سمعية وبصرية معتمدة EN54.",
    "cat.hoseReels": "بكرات الخراطيم وكبائن الإطفاء",
    "cat.hoseReelsDesc": "بكرات تدفق مستمر وكبائن صلب مجلفن مقاوم للتآكل.",
    "cat.sprinklers": "شبكات الرشاشات والمحابس",
    "cat.sprinklersDesc": "رؤوس رشاشات ومحابس تحكم معتمدة طبقا لكود NFPA 13 والاعتمادات الدولية.",
    "cat.viewAll": "استعراض الطرازات",
    "cat.itemsCount": "طرازات معتمدة",

    // Featured Products
    "spotlight.tag": "المعدات الأكثر طلباً للمشاريع",
    "spotlight.title": "معدات معتمدة متوفرة للتوريد والتسليم الفوري للمواقع",
    "spotlight.desc": "كافة المعدات مطابقة لاشتراطات الدفاع المدني ومرفقة بشهادات الفحص المخبري وضمان المصنع.",
    "spotlight.allProducts": "كامل كتالوج المعدات (6)",
    "spotlight.quoteBtn": "طلب عرض سعر",
    "spotlight.detailsBtn": "تفاصيل المواصفة",
    "spotlight.disclaimer":
      "المواصفات وتصنيفات الحرائق (A, B, C, E) معتمدة بمعايير EN3 و EN54 و NFPA.",

    // Trust & Guarantees
    "trust.tag": "التزاماتنا لشركات المقاولات",
    "trust.title": "اعتمادات موثوقة وجاهزية هندسية لدعم مشاريعك",
    "trust.civilDefence": "معتمد رسمياً من الدفاع المدني",
    "trust.civilDefenceDesc": "مطابق لاشتراطات لجان التفتيش مع تسليم تقارير الضغط وشهادات المنشأ والاختبار.",
    "trust.boqTurnaround": "تسعير BOQ خلال 24 ساعة",
    "trust.boqTurnaroundDesc": "فريق هندسي متخصص لمراجعة مخططات MEP وجداول الكميات وتقديم العروض المعتمدة.",
    "trust.warranty": "ضمان مصنعي معتمد حتى 5 سنوات",
    "trust.warrantyDesc": "ضمان كامل على الأسطوانات والكبائن مع توفير قطع الغيار الأصلية وخدمات ما بعد البيع.",
    "trust.delivery": "توريد فوري وجاهزية للشحن",
    "trust.deliveryDesc": "مخزون استراتيجي لتلبية التوريدات العاجلة وجدولة الشحن بحسب مراحل المشروع.",

    // Direct BOQ Callout
    "boq.tag": "المكتب الفني للتسعير السريع",
    "boq.title": "معاك جدول كميات (BOQ) أو مخططات مشروع؟",
    "boq.desc": "أرسل الملفات مباشرة لفريقنا الهندسي للحصول على دراسة مطابقة فنية وعرض أسعار مفصل خلال 24 ساعة فقط.",
    "boq.ctaPrimary": "إرسال جدول الكميات (BOQ) الآن",
    "boq.ctaSecondary": "تواصل مباشرة مع مهندس المبيعات",

    // Anatomy
    "anatomy.tag": "المواصفات الفنية ومكونات التصنيع",
    "anatomy.title": "جودة التصنيع والاعتمادية التشغيلية",
    "anatomy.desc":
      "مكونات مصنعة لتحمل بيئات التشغيل الشاقة مع توفير شهادات فحص الضغط.",
    "anatomy.drawing": "مخطط المواصفات الفنية: ICS-FE-001",
    "anatomy.interactive": "فحص المكونات الهندسية",
    "anatomy.tab1": "صمام ومسمار الأمان",
    "anatomy.tab2": "مقياس الضغط الدقيق",
    "anatomy.tab3": "خرطوم وفوهة التفريغ",
    "anatomy.point1Title": "مسمار سحب من الصلب المقاوم للصدأ وختم الضمان",
    "anatomy.point1Desc": "يمنع التفريغ العرضي ويوفر تحريراً سريعاً بيد واحدة لحالات الطوارئ.",
    "anatomy.point2Title": "مؤشر ضغط بوردون المعاير",
    "anatomy.point2Desc": "مقياس دقيق للتحقق الفوري من جاهزية ضغط التشغيل أثناء جولات الصيانة.",
    "anatomy.point3Title": "خرطوم مطاطي مقوى بمطاط EPDM وفوهة نحاسية",
    "anatomy.point3Desc": "خرطوم مقوى بضغط انفجار عالٍ وفوهة توجيه دقيقة للتيار.",

    // Applications
    "app.tag": "تطبيقات الأنظمة حسب طبيعة المنشأة",
    "app.title1": "حلول مدروسة لكل بيئة عمل",
    "app.title2": "وحسب المخاطر التشغيلية.",
    "app.desc":
      "تحديد نوع المنظومة وفق الحمل الحراري للمبنى، نوعية الإشغال، واشتراطات الكود المعتمد.",
    "app.commercial": "المباني الإدارية والمنشآت التجارية",
    "app.commercialDesc": "المكاتب، المراكز التجارية، المؤسسات التعليمية، والمستشفيات",
    "app.industrial": "المنشآت الصناعية والمستودعات",
    "app.industrialDesc": "المصانع، مخازن الكيماويات، هناجر التخزين اللوجستي، ومحطات الكهرباء",

    // 3-Step Process
    "process.tag": "مراحل الاعتماد الفني والتوريد",
    "process.title": "من دراسة المخططات إلى التوريد المعتمد",
    "process.step1": "1. مراجعة المخططات الهندسية",
    "process.step1Desc": "مراجعة مخططات MEP وتحديد سعات وتوزيع أجهزة الإطفاء.",
    "process.step2": "2. مطابقة المواصفات والاعتمادات",
    "process.step2Desc": "مطابقة الطرازات مع كود الدفاع المدني واعتمادات استشاري المشروع.",
    "process.step3": "3. التوريد وشهادات الفحص",
    "process.step3Desc": "شحن وتوريد الدفعات مصحوبة بشهادات الفحص والضمان المعتمدة.",

    // Mindset
    "mindset.tag": "عن شركة ICS",
    "mindset.title": "دقة هندسية والتزام صارم بالمطابقة",
    "mindset.desc":
      "نوفر لشركات المقاولات والمكاتب الاستشارية أنظمة إطفاء معتمدة، مدعومة بوثائق فنية دقيقة وسرعة تقديم العروض المعتمدة.",
    "mindset.btn": "الملف التعريفي والاعتمادات الرسمية",

    // FAQ
    "faq.tag": "الأسئلة الشائعة حول المواصفات والاعتمادات والتوريد",
    "faq.title": "الأسئلة الفنية والتعاقدية المتكررة",
    "faq.sub": "إجابات مباشرة ومحددة حول اعتمادات الدفاع المدني والمواصفات وجداول التوريد للمشاريع.",

    // Red CTA
    "cta.tag": "طلب استشارة هندسية أو عرض أسعار",
    "cta.title": "اطلب دراسة فنية أو عرض أسعار لمشروعك",
    "cta.btn": "طلب عرض أسعار فني",
    "cta.sub": "أرسل جداول الكميات (BOQ) أو المخططات لمراجعتها وتقديم عرض فني ومالي مفصل.",

    // Footer
    "footer.brandText": "أنظمة ومعدات الإطفاء والسلامة المعتمدة وحلول الحماية المتكاملة للمباني والمنشآت الكبرى.",
    "footer.explore": "المعدات",
    "footer.equipment": "القطاعات",
    "footer.startConvo": "التواصل الفني",
    "footer.rights": "© 2026 شركة ICS لأنظمة ومعدات الإطفاء. جميع الحقوق محفوظة.",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط التوريد والضمان",
    "footer.tagline": "أنظمة السلامة ومكافحة الحرائق",

    // Products Page
    "products.tag": "كتالوج المعدات المعتمدة",
    "products.heroTitle1": "معدات وأنظمة الإطفاء",
    "products.heroTitle2": "المعتمدة رسمياً.",
    "products.heroDesc":
      "تجهيزات إطفاء وإنذار متكاملة مطابقة لأكواد البناء والسلامة.",
    "products.searchPlaceholder": "ابحث باسم المعدة، الكود الهندسي، أو المعيار...",
    "products.showing": "عرض",
    "products.sampleProducts": "معدة قياسية معتمدة",
    "products.sort": "الترتيب: الافتراضي",
    "products.filterTitle": "تصفية المواصفات الفنية",
    "products.category": "نوع المنظومة",
    "products.allEquipment": "كافة التصنيفات",
    "products.application": "ملاءمة المنشأة",
    "products.appCommercial": "المنشآت التجارية والإدارية",
    "products.appIndustrial": "المنشآت الصناعية والمستودعات",
    "products.appShared": "المباني والمرافق المشتركة",
    "products.helpTitle": "هل تحتاج مراجعة جدول كميات؟",
    "products.helpDesc": "أرسل جدول كميات MEP لمطابقة المواصفات وتحديد عرض السعر فوراً.",
    "products.helpLink": "تواصل مع المبيعات الهندسية",
    "products.disclaimer":
      "تُورّد كافة المعدات بشهادات اختبار المصنع المعتمدة ووثائق الدفاع المدني.",

    // Product Detail Page
    "detail.breadcrumbs": "كتالوج المعدات",
    "detail.enquire": "طلب عرض أسعار فني للمشروع",
    "detail.requestInfo": "تحميل صحيفة البيانات الفنية (Datasheet)",
    "detail.finePrint":
      "تأكيد تصنيفات الحريق واشتراطات الموقع بالتنسيق مع المكتب الفني.",
    "detail.overview": "نظرة عامة على المعدة",
    "detail.technical": "المواصفات الفنية التفصيلية",
    "detail.preview3d": "الفحص ثلاثي الأبعاد 360°",
    "detail.related": "معدات تكميلية للسلامة",
    "detail.knowEquip": "البيانات الهندسية المعتمدة",
    "detail.techTitle": "مواصفات التصنيع ومقاييس الأداء",
    "detail.techDesc":
      "مؤشرات الأداء وأبعاد التثبيت بدقة مع شهادات الفحص المخبري لكل دفعة.",
    "detail.sampleBadge": "مواصفات معتمدة ومطابقة للكود",
    "detail.previewConcept": "الفحص الهندسي التفاعلي ثلاثي الأبعاد",
    "detail.notConnected": "المعاينة التفاعلية مفعلة",
    "detail.conceptControls": "تدوير 360° وتكبير لفحص الصمام ومؤشر الضغط والأسطوانة.",
    "detail.anotherPersp": "الملف الهندسي للمعدة",
    "detail.everyAngle": "فحص المكونات من كافة الزوايا",
    "detail.angleDesc":
      "افحص هيكل الأسطوانة المعالج بدون لحامات، سنون الصمام النحاسي، مؤشر الضغط الميكانيكي، ونقطة اتصال خرطوم التفريغ.",
    "detail.anglePlanned":
      "تتوفر مخططات CAD ونماذج BIM لتنسيق أعمال MEP الاستشارية.",
    "detail.partOfBigger": "معدات سلامة مرتبطة للمشاريع",
    "detail.browseAll": "تصفح كامل المعدات",

    // About Page
    "about.tag": "نبذة عن الشركة والخبرات",
    "about.title1": "أنظمة إطفاء معتمدة",
    "about.title2": "للمطابقة والأمان.",
    "about.desc":
      "توفر شركة ICS أنظمة ومعدات مكافحة الحرائق والسلامة الهندسية عالية المواصفات للمطورين والمقاولين ومديري المنشآت في المنطقة.",
    "about.whyTag": "الملف التعريفي للمؤسسة",
    "about.whyTitle": "حلول حماية عملية قائمة على المطابقة الصارمة للمعايير.",
    "about.whyP1":
      "نختص بتوريد أنظمة الإطفاء والإنذار المعتمدة، مدعومة ببيانات فنية موثقة واستجابة هندسية للمقاولين والاستشاريين.",
    "about.whyP2":
      "نوفر تجهيزات السلامة المتكاملة لاجتياز فحوصات الدفاع المدني وتأمين الأرواح والمباني بأعلى درجات الموثوقية.",
    "about.guidesTag": "معايير التشغيل والجودة",
    "about.guidesTitle": "المبادئ الهندسية التي نعمل بها",
    "about.p1Title": "المطابقة التامة للاشتراطات",
    "about.p1Desc":
      "معدات معتمدة دولياً (EN3, EN54, NFPA) ومرفقة بتقارير فحص مستقلة.",
    "about.p2Title": "الشفافية الفنية الكاملة",
    "about.p2Desc":
      "بيانات فنية دقيقة وحسابات معتمدة لتسهيل موافقات الاستشاري والمقاول.",
    "about.p3Title": "الموثوقية والالتزام بالتوريد",
    "about.p3Desc":
      "مخزون دائم، توريد منتظم، وسرعة في تقديم العروض للالتزام بمواعيد المشروع.",
    "about.purposeTag": "التطبيق الميداني في المشاريع",
    "about.purposeTitle": "تحديد المعدات بدقة وفق مستوى الخطر الميداني",
    "about.purposeDesc":
      "حماية المنشأة تستوجب معرفة الحمل الحراري للمبنى. تواصل مع مهندسينا لاعتماد جدول الكميات.",
    "about.exploreBtn": "استعراض كتالوج المعدات",
    "about.ctaTitle": "ناقش جدول معدات مكافحة الحرائق لمشروعك",
    "about.ctaBtn": "تواصل مع مهندسي المبيعات",

    // Contact Page
    "contact.tag": "الاستشارات الفنية والمبيعات",
    "contact.title1": "دعم فني مباشر للمشاريع",
    "contact.title2": "وعروض أسعار تجارية.",
    "contact.desc":
      "تواصل مع فريقنا الهندسي لمناقشة مواصفات المعدات، مراجعة جداول الكميات، واستلام عروض الأسعار الرسمية المعتمدة.",
    "contact.teamTag": "المكتب الفني للمبيعات الهندسية",
    "contact.teamTitle": "طلب المواصفات الفنية وعروض الأسعار",
    "contact.teamDesc":
      "أرسل متطلبات المشروع وجدول الكميات لتلقي عرض فني وتجاري مفصل.",
    "contact.notEmergencyTitle": "قناة مخصصة للطلبات التجارية والفنية فقط",
    "contact.notEmergencyDesc":
      "قناة مخصصة للمبيعات والمواصفات الهندسية. لحالات الطوارئ الفعلية، اتصل بالدفاع المدني.",
    "contact.formTitle": "بيانات المشروع وطلب عرض الأسعار الفني",
    "contact.required": "* حقول إلزامية",
    "contact.fullName": "الاسم الكامل للمهندس / المسؤول *",
    "contact.workEmail": "البريد الإلكتروني للعمل / المؤسسة *",
    "contact.company": "اسم الشركة / المقاول / المكتب الاستشاري",
    "contact.phone": "رقم الهاتف / الواتساب للتواصل المباشر",
    "contact.howHelp": "نوع الطلب الفني *",
    "contact.productInterest": "قطاع المعدات المطلوب",
    "contact.yourMessage": "نطاق المشروع / تفاصيل جدول الكميات المطلوب *",
    "contact.addBrief": "إرفاق المخططات أو جدول الكميات (BOQ)",
    "contact.fileNotice": "اختياري - صيغ PDF أو DWG أو JPG حتى 10 ميجابايت",
    "contact.browse": "اختيار الملف",
    "contact.consent":
      "أوافق على استخدام البيانات لإصدار الدراسة وعرض السعر.",
    "contact.submit": "إرسال طلب عرض الأسعار",
    "contact.thankTitle": "تم استلام طلبكم بنجاح",
    "contact.thankDesc":
      "تم استلام الطلب وسيقوم مهندس المبيعات بالرد بعرض فني وتجاري خلال 24 ساعة.",
    "contact.sendAnother": "إرسال طلب مشروع آخر",
    "contact.nextTag": "مراحل معالجة الطلب",
    "contact.nextStep1Title": "1. المراجعة الهندسية الفنية",
    "contact.nextStep1Desc": "مراجعة الطرازات المطلوبة ومطابقتها للمواصفات القياسية واشتراطات المشروع.",
    "contact.nextStep2Title": "2. العرض التجاري وجداول التوريد",
    "contact.nextStep2Desc":
      "تقديم عرض أسعار مفصل يتضمن شهادات اختبار المصنع وبوالص الضمان وجدول التوريد.",

    // Product Names & Specs
    "prod.ics-p06.name": "طفاية بودرة جافة ABC سعة 6 كجم",
    "prod.ics-p06.specs": "سعة 6 كجم / نظام ضغط مخزون / معتمدة EN3",
    "prod.ics-p06.tagline":
      "طفاية حريق متعددة الأغراض بنظام الضغط المخزون مخصصة لحرائق الفئات A و B و C والأجهزة الكهربائية في المباني التجارية والصناعية.",
    "prod.ics-c05.name": "طفاية ثاني أكسيد الكربون (CO2) سعة 5 كجم",
    "prod.ics-c05.specs": "سعة 5 كجم / أسطوانة ضغط عالي بدون لحامات",
    "prod.ics-c05.tagline":
      "مادة إخماد غازية نظيفة مصممة خصيصاً لغرف السيرفرات ولوحات التوزيع الكهربائية والسوائل القابلة للاشتعال دون ترك أي رواسب.",
    "prod.ics-d01.name": "كاشف دخان بصري فوتوكهربائي (EN54-7)",
    "prod.ics-d01.specs": "حساس فوتوكهربائي / تثبيت سقفي بتصميم مدمج",
    "prod.ics-d01.tagline":
      "كاشف بصري دقيق يعتمد تقنية تشتت الضوء مع غرفة استشعار مزدوجة وخوارزميات رقمية متطورة لمنع الإنذارات الكاذبة في المنشآت الكبرى.",
    "prod.ics-h30.name": "بكرة خراطيم إطفاء جدارية بطول 30 متراً",
    "prod.ics-h30.specs": "طول 30 م / قطر 19 مم (3/4 بوصة) / ذراع تأرجح 180°",
    "prod.ics-h30.tagline":
      "بكرة خراطيم تدفق مستمر بذراع تأرجح يدوي متين، مخصصة للتدخل السريع بالتدفق المائي الكثيف في المنشآت الصناعية والمرافق العامة.",
    "prod.ics-a02.name": "جرس إنذار صوتي مع فلاشر ضوئي وميضي",
    "prod.ics-a02.specs": "شدة صوت 100 ديسيبل / وميض ضوئي فائق السطوع",
    "prod.ics-a02.tagline":
      "جهاز إنذار مزدوج يجمع بين صفارة إنذار صوتية قوية وميض ضوئي زينون ساطع للتنبيه الفوري في البيئات الصناعية الصاخبة.",
    "prod.ics-b01.name": "كابينة خراطيم حريق صلب مجلفن",
    "prod.ics-b01.specs": "صاج صلب معالج 1.2 مم / باب مزجج بزجاج مقسى",
    "prod.ics-b01.tagline":
      "كابينة مقاومة للتآكل والصدأ مزودة بقفل كروم وباب زجاجي مقسى آمن، تتسع لبكرة خرطوم 30 متراً ومحبس هبوط قياسي.",

    "cat.fireExtinguishers": "طفايات الحريق اليدوية",
    "cat.detectionAlarm": "الإنذار والكشف المبكر",
    "cat.hoseReelsCabinets": "بكرات الخراطيم والكبائن",

    // Spec Labels
    "spec.code": "كود المعدة الهندسي",
    "spec.agent": "مادة الإطفاء",
    "spec.charge": "السعة الاسمية",
    "spec.pressure": "نظام الضغط",
    "spec.finish": "هيكل الأسطوانة والطلاء",
    "spec.discharge": "آلية التفريغ",
    "spec.rating": "تصنيف الحريق والاعتمادات",
    "spec.dimensions": "الأبعاد الهندسية",
    "spec.principle": "مبدأ الكشف",
    "spec.voltage": "جهد التشغيل",
    "spec.sensorProfile": "المظهر المعماري",
    "spec.indicator": "مؤشر الإنذار البصري",
    "spec.hoseLength": "طول وقطر الخرطوم",
    "spec.workingPressure": "ضغط التشغيل المقنن",
    "spec.swingMechanism": "آلية التثبيت والتأرجح",
    "spec.nozzle": "مواصفات الفوهة",
    "spec.soundOutput": "مستوى الصوت (ديسيبل)",
    "spec.lightOutput": "الشدة الضوئية للوميض",
    "spec.enclosure": "درجة الحماية من العوامل الجوية",
    "spec.housing": "مادة الهيكل الخارجي",
    "spec.material": "مادة تصنيع الكابينة",
    "spec.doorType": "نوع الباب",
    "spec.hingeType": "نوع المفصلات",
    "spec.internalCapacity": "السعة والتجهيز الداخلي",
    "spec.standards": "معايير المطابقة والاعتماد",
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read saved theme
    const savedTheme = (localStorage.getItem("ics-theme") as Theme) || "light";
    setThemeState(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Read saved language
    const savedLang = (localStorage.getItem("ics-lang") as Lang) || "en";
    setLangState(savedLang);
    document.documentElement.setAttribute("dir", savedLang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", savedLang);

    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("ics-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("ics-lang", newLang);
    document.documentElement.setAttribute("dir", newLang === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", newLang);
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        lang,
        toggleTheme,
        setTheme,
        toggleLang,
        setLang,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
}
