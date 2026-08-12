const fs = require('fs');
const path = require('path');

const dir = __dirname;
const templatePath = path.join(dir, 'web-design-sandton', 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

const pages = [
  {
    folder: 'web-design-benoni',
    title: 'Web Design Benoni | Affordable Business Websites | Toran Digital',
    desc: 'Professional web design in Benoni and the East Rand. Toran Digital builds custom, SEO-optimised websites for Benoni businesses. Get a free quote today!',
    canonical: 'https://torandigital.co.za/web-design-benoni/',
    h1_pre: 'Professional Web Design',
    h1_span: 'in Benoni & the East Rand',
    hero_desc: 'Empowering Benoni SMEs and corporate enterprises with custom, high-converting websites. WordPress, Shopify e-commerce, and bespoke React apps.',
    h2_1: 'Grow Your Benoni Business <span class="gradient-text">With Premium Design</span>',
    p_1: 'From the trade businesses in **Northmead** to retail storefronts near **East Rand Mall**, competition is fierce. At **Toran Digital**, we construct custom online systems tailored specifically for Benoni and the East Rand marketplace.',
    suburbs: ['Rynfield', 'Crystal Park', 'Lakefield', 'Brakpan', 'Boksburg'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114584.73587428795!2d28.24355555465922!3d-26.17135545731776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95143fba11b855%3A0xc619864273da9bb2!2sBenoni!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Benoni',
    faq: [
      {q: "Do you build e-commerce sites for Benoni businesses?", a: "Yes, we specialize in WooCommerce and Shopify development tailored for local e-commerce."},
      {q: "How much does a website cost in Benoni?", a: "Our web design packages start from R3,500 depending on your exact requirements."},
      {q: "Do you offer local SEO for East Rand companies?", a: "Absolutely. Local SEO is included in our corporate web design packages to ensure you rank on the East Rand."}
    ],
    service: 'Web Design'
  },
  {
    folder: 'web-design-randburg',
    title: 'Web Design Randburg | Professional Website Designers | Toran Digital',
    desc: 'Custom web design services in Randburg and Johannesburg North. Toran Digital creates high-converting websites for local businesses. Free quote available.',
    canonical: 'https://torandigital.co.za/web-design-randburg/',
    h1_pre: 'Expert Web Design Services',
    h1_span: 'in Randburg',
    hero_desc: 'Empowering Randburg businesses with custom, high-converting websites. WordPress, Shopify e-commerce, and bespoke React apps.',
    h2_1: 'Grow Your Randburg Business <span class="gradient-text">With Premium Design</span>',
    p_1: 'From the corporate offices in **Ferndale** and **Bordeaux** to retail near **Cresta Shopping Centre**, competition is fierce in Johannesburg North. At **Toran Digital**, we construct custom online systems tailored specifically for the Randburg marketplace.',
    suburbs: ['Ferndale', 'Bordeaux', 'Northcliff', 'Cresta', 'Linden'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114628.78446219803!2d27.917414988775443!3d-26.09176378419736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9575b63004bb2b%3A0x6e0dfad36ce6b701!2sRandburg!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Randburg',
    faq: [
      {q: "Can you redesign an existing website?", a: "Yes, we frequently revamp underperforming websites for businesses in Randburg to improve conversions and aesthetics."},
      {q: "Do you provide hosting?", a: "Yes, we offer secure, fast local hosting on South African servers as part of our packages."},
      {q: "Will my website be mobile-friendly?", a: "100%. All our websites are designed mobile-first, ensuring they look perfect on all devices."}
    ],
    service: 'Web Design'
  },
  {
    folder: 'vehicle-branding-benoni',
    title: 'Vehicle Branding Benoni | Fleet Wrapping East Rand | Toran Digital',
    desc: 'Custom vehicle wrapping and fleet branding in Benoni and the East Rand. Toran Digital delivers premium bakkie branding, full wraps, and commercial fleet graphics.',
    canonical: 'https://torandigital.co.za/vehicle-branding-benoni/',
    h1_pre: 'Vehicle Branding & Fleet Wrapping',
    h1_span: 'in Benoni',
    hero_desc: 'Premium vehicle wraps, bakkie branding, and commercial fleet graphics for industrial and trade clients across the East Rand.',
    h2_1: 'Transform Your Fleet <span class="gradient-text">Into Moving Billboards</span>',
    p_1: 'From logistics companies in **Wadeville** to trade vehicles across **Benoni**, your fleet is your best advertising asset. At **Toran Digital**, we provide high-quality, durable vehicle branding tailored for the East Rand.',
    suburbs: ['Boksburg', 'Brakpan', 'Springs', 'Kempton Park', 'Wadeville'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114584.73587428795!2d28.24355555465922!3d-26.17135545731776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95143fba11b855%3A0xc619864273da9bb2!2sBenoni!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Benoni',
    faq: [
      {q: "How long does a vehicle wrap last?", a: "Our high-quality cast vinyl wraps typically last between 5 to 7 years in South African weather conditions."},
      {q: "Do you design the wrap?", a: "Yes, our graphic design team will create a custom, eye-catching design before any printing begins."},
      {q: "Can I wrap a leased vehicle?", a: "Absolutely. Vehicle wraps actually protect the original paintwork and can be safely removed before returning the lease."}
    ],
    service: 'Vehicle Branding'
  },
  {
    folder: 'dstv-installation-benoni',
    title: 'DSTV Installers Benoni | TV Mounting & CCTV East Rand | Toran Digital',
    desc: 'Accredited DSTV installers in Benoni, Brakpan & East Rand. Toran Digital offers DSTV setup, signal repairs, TV mounting & CCTV. Call 069 621 9479.',
    canonical: 'https://torandigital.co.za/dstv-installation-benoni/',
    h1_pre: 'Accredited DSTV Installers',
    h1_span: 'in Benoni & East Rand',
    hero_desc: 'Professional DSTV setup, signal repairs, TV mounting, and CCTV installations for homes and businesses across Benoni, Brakpan, and Boksburg.',
    h2_1: 'Reliable DSTV & CCTV <span class="gradient-text">Installations</span>',
    p_1: 'Whether you need a new Explora setup in **Rynfield**, signal repair in **Crystal Park**, or a full CCTV system in **Northmead**, **Toran Digital** provides fast, accredited installation services across the East Rand.',
    suburbs: ['Brakpan', 'Boksburg', 'Rynfield', 'Crystal Park', 'Northmead'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114584.73587428795!2d28.24355555465922!3d-26.17135545731776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95143fba11b855%3A0xc619864273da9bb2!2sBenoni!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Benoni',
    faq: [
      {q: "Do you do same-day installations in Benoni?", a: "Yes, we strive to offer same-day service for call-outs made before 12 PM in the Benoni and surrounding areas."},
      {q: "Can you fix the E48-32 'No Signal' error?", a: "Definitely. We diagnose and fix signal issues quickly, often requiring a simple dish realignment or LNB replacement."},
      {q: "Do you install CCTV cameras?", a: "Yes, we install high-definition CCTV systems for both residential homes and commercial properties."}
    ],
    service: 'DSTV Installation'
  },
  {
    folder: 'dstv-installation-boksburg',
    title: 'DSTV Installers Boksburg | TV Mounting & CCTV | Toran Digital',
    desc: 'Professional DSTV installation in Boksburg and surrounding areas. Toran Digital provides fast, reliable DSTV setups, repairs and CCTV. Same-day service available.',
    canonical: 'https://torandigital.co.za/dstv-installation-boksburg/',
    h1_pre: 'DSTV Installation Services',
    h1_span: 'in Boksburg',
    hero_desc: 'Professional DSTV setup, signal repairs, TV mounting, and CCTV installations for homes and businesses across Boksburg and surrounding areas.',
    h2_1: 'Reliable DSTV & CCTV <span class="gradient-text">Installations</span>',
    p_1: 'Whether you need a new Explora setup in **Sunward Park**, signal repair in **Boksburg North**, or a full CCTV system, **Toran Digital** provides fast, accredited installation services across Boksburg.',
    suburbs: ['Sunward Park', 'Boksburg North', 'Parkrand', 'Beyers Park', 'Benoni'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114561.0827284698!2d28.1818290518779!3d-26.21389808933256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9516cbce53abdf%3A0x8670abff55c1e13b!2sBoksburg!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Boksburg',
    faq: [
      {q: "Do you do Extra View installations?", a: "Yes, we can link up to 3 decoders on one subscription using Extra View."},
      {q: "Can you mount my TV on the wall?", a: "Yes, we provide professional TV mounting services, including supplying the correct brackets and hiding cables."},
      {q: "Do you operate on weekends?", a: "Yes, we offer Saturday installations and emergency call-outs in Boksburg."}
    ],
    service: 'DSTV Installation'
  },
  {
    folder: 'web-design-midrand',
    title: 'Web Design Midrand | Business Websites for Midrand Companies | Toran Digital',
    desc: 'Professional web design in Midrand. Toran Digital builds custom websites and SEO solutions for Midrand\'s growing business sector. Request a free quote.',
    canonical: 'https://torandigital.co.za/web-design-midrand/',
    h1_pre: 'Web Design & Digital Solutions',
    h1_span: 'in Midrand',
    hero_desc: 'Empowering Midrand SMEs and corporate enterprises with custom, high-converting websites. WordPress, Shopify e-commerce, and bespoke React apps.',
    h2_1: 'Grow Your Midrand Business <span class="gradient-text">With Premium Design</span>',
    p_1: 'From the tech hubs in **Waterfall City** to the corporate estates near **Grand Central**, Midrand is the bridge between Johannesburg and Pretoria. At **Toran Digital**, we construct custom online systems tailored specifically for Midrand\'s fast-paced marketplace.',
    suburbs: ['Waterfall City', 'Halfway House', 'Kyalami', 'Carlswald', 'Centurion'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114755.70014088019!2d28.060136277647244!3d-25.96347895475143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95711674404099%3A0x6b472e391cb27f7a!2sMidrand!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Midrand',
    faq: [
      {q: "Can you integrate our CRM with the website?", a: "Yes, we can integrate popular CRMs like HubSpot, Salesforce, and Zoho into your custom website."},
      {q: "Do you offer website maintenance?", a: "Yes, we provide ongoing maintenance packages to keep your site secure and updated."},
      {q: "How long does a standard corporate website take?", a: "Typically, a 5-10 page corporate website takes 2-4 weeks from brief to launch."}
    ],
    service: 'Web Design'
  },
  // NEW LOCATIONS
  {
    folder: 'web-design-fourways',
    title: 'Web Design Fourways | Custom Website Development | Toran Digital',
    desc: 'Top web design agency in Fourways, Lonehill & Dainfern. Toran Digital builds custom, high-converting websites and web apps for local SMEs and corporate clients.',
    canonical: 'https://torandigital.co.za/web-design-fourways/',
    h1_pre: 'Web Design & Digital Marketing',
    h1_span: 'in Fourways',
    hero_desc: 'Empowering Fourways, Lonehill, and Dainfern businesses with custom, high-converting websites. WordPress, Shopify e-commerce, and custom web applications.',
    h2_1: 'Grow Your Fourways Brand <span class="gradient-text">With High-Impact Web Design</span>',
    p_1: 'From retail near **Montecasino** and **Fourways Mall** to corporate offices in **Lonehill** and **Dainfern**, businesses in Fourways demand modern, high-converting digital experiences. At **Toran Digital**, we build bespoke websites designed to outrank your competitors and convert local traffic into loyal clients.',
    suburbs: ['Lonehill', 'Dainfern', 'Broadacres', 'Beverley', 'Douglasdale', 'Sunninghill'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57321.36511425126!2d27.979644342261546!3d-26.015797274981773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9574041b3152bd%3A0x500c7a017578500!2sFourways%2C%20Sandton!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Fourways',
    faq: [
      {q: "Do you design websites for estate agents and local services in Fourways?", a: "Yes, we build high-converting, lead-generation websites tailored for real estate, legal, medical, and professional service providers in Fourways."},
      {q: "Can you optimize our existing website for local Fourways SEO?", a: "Absolutely. We specialize in local search optimization to ensure your business ranks prominently when locals search for your services in Fourways and Lonehill."},
      {q: "What platforms do you use for e-commerce websites?", a: "We develop e-commerce stores on Shopify, WooCommerce, and custom React platforms with seamless South African payment gateway integration (PayFast, Yoco, Ozow)."}
    ],
    service: 'Web Design'
  },
  {
    folder: 'web-design-bryanston',
    title: 'Web Design Bryanston | Corporate Websites & E-Commerce | Toran Digital',
    desc: 'Bespoke web design services in Bryanston, Rivonia & Woodmead. Toran Digital delivers custom corporate websites, e-commerce stores, and local SEO.',
    canonical: 'https://torandigital.co.za/web-design-bryanston/',
    h1_pre: 'Corporate Web Design',
    h1_span: 'in Bryanston & Rivonia',
    hero_desc: 'Custom digital solutions for enterprise hubs and growing firms in Bryanston, Rivonia, and Woodmead. Fast, secure, and SEO-optimized.',
    h2_1: 'Elevate Your Bryanston Business <span class="gradient-text">With Premium Design</span>',
    p_1: 'Situated along major commercial corridors like **Ballyclare Drive** and **Sloan Street**, Bryanston is home to premier financial, legal, and tech firms. **Toran Digital** crafts sophisticated corporate websites and web apps that project authority and drive measurable ROI.',
    suburbs: ['Rivonia', 'Woodmead', 'Paulshof', 'Epsom Downs', 'Petervale'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57310.82522782806!2d28.006456041793743!3d-26.046030925916058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9573f08c351f0b%3A0x6b4f73ec074d021c!2sBryanston%2C%20Sandton!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Bryanston',
    faq: [
      {q: "Do you offer custom web application development for Bryanston enterprises?", a: "Yes, we build scalable web applications using React, Node.js, and modern cloud architecture for corporate clients."},
      {q: "How long does a website overhaul take?", a: "A standard corporate project takes 2-4 weeks from initial wireframes to official launch."},
      {q: "Will our website be mobile-first and fast-loading?", a: "100%. We optimize every page for Core Web Vitals, ensuring sub-second load times across mobile and desktop devices."}
    ],
    service: 'Web Design'
  },
  {
    folder: 'web-design-centurion',
    title: 'Web Design Centurion | Business Website Development | Toran Digital',
    desc: 'Expert web design in Centurion, Midstream & Zwartkop. Toran Digital builds custom WordPress, Shopify, and React websites for local businesses.',
    canonical: 'https://torandigital.co.za/web-design-centurion/',
    h1_pre: 'Professional Web Design',
    h1_span: 'in Centurion',
    hero_desc: 'Empowering Centurion SMEs and corporate enterprises with modern, conversion-focused web design and SEO strategies.',
    h2_1: 'Grow Your Centurion Brand <span class="gradient-text">With Tailored Websites</span>',
    p_1: 'Connecting Johannesburg and Pretoria, Centurion is a thriving business hub spanning **Centurion CBD**, **Midstream Estate**, and **Hennopspark**. **Toran Digital** builds high-performing digital systems that elevate local brands and capture market share.',
    suburbs: ['Midstream', 'Eldoraigne', 'Zwartkop', 'Clubview', 'Doringkloof', 'Rooihuiskraal'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114811.23812836262!2d28.118939227181057!3d-25.852445885311892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9564177d4c82c3%3A0x6c6b4122d6402fb!2sCenturion!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Centurion',
    faq: [
      {q: "Why choose Toran Digital for Centurion web design?", a: "We combine high-end Brutalist-editorial design, technical local SEO, and rapid turnarounds tailored to Centurion businesses."},
      {q: "Do you assist with content writing and branding?", a: "Yes, our team provides copy editing, logo design, graphic assets, and full content creation."},
      {q: "Can you help us rank on Google in Pretoria and Centurion?", a: "Yes! On-page SEO and Google Business Profile optimization are included in our corporate web design packages."}
    ],
    service: 'Web Design'
  },
  {
    folder: 'web-design-rosebank',
    title: 'Web Design Rosebank | Premium Website Agency JHB | Toran Digital',
    desc: 'Leading web design agency in Rosebank, Hyde Park & Melrose Arch. High-end web development, e-commerce stores & digital branding by Toran Digital.',
    canonical: 'https://torandigital.co.za/web-design-rosebank/',
    h1_pre: 'High-End Web Design',
    h1_span: 'in Rosebank & Hyde Park',
    hero_desc: 'Bespoke websites and digital branding for Rosebank, Melrose Arch, and Hyde Park businesses seeking world-class aesthetics and conversion.',
    h2_1: 'Dominate Your Market <span class="gradient-text">With Editorial Web Design</span>',
    p_1: 'From the commercial high-rises along **Oxford Road** to luxury retail at **Hyde Park Corner** and **Melrose Arch**, Rosebank demands cutting-edge design. **Toran Digital** builds striking, high-contrast websites that showcase your prestige and drive high-ticket leads.',
    suburbs: ['Hyde Park', 'Melrose Arch', 'Illovo', 'Saxonwold', 'Dunkeld', 'Parktown North'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57297.80838183181!2d28.016335191834243!3d-26.146200224160416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c904fa77ad1%3A0xcbbf1d5d36e2694b!2sRosebank%2C%20Johannesburg!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Rosebank',
    faq: [
      {q: "Do you design websites for luxury brands and corporate consultancies in Rosebank?", a: "Yes, our editorial design aesthetic is specifically crafted for high-ticket brands, asset managers, and luxury retailers."},
      {q: "Can you integrate multi-language or multi-currency features?", a: "Absolutely. We specialize in complex, enterprise-level web platforms with internationalization support."},
      {q: "What ongoing maintenance options do you provide?", a: "We offer monthly maintenance retainers covering security updates, content revisions, speed audits, and continuous SEO adjustments."}
    ],
    service: 'Web Design'
  },
  {
    folder: 'web-design-kempton-park',
    title: 'Web Design Kempton Park | Industrial & SME Websites | Toran Digital',
    desc: 'Affordable web design in Kempton Park, Spartan & Jet Park. Custom websites for freight, logistics, manufacturing, and local businesses.',
    canonical: 'https://torandigital.co.za/web-design-kempton-park/',
    h1_pre: 'Web Design & Digital Marketing',
    h1_span: 'in Kempton Park',
    hero_desc: 'Custom websites tailored for logistics, industrial suppliers, and trade businesses in Kempton Park, Spartan, and Jet Park.',
    h2_1: 'Grow Your Industrial Business <span class="gradient-text">With Heavyweight Web Design</span>',
    p_1: 'As East Rand\'s primary logistics hub surrounding **OR Tambo International Airport**, Kempton Park businesses need clean, informative online portals to win contracts. **Toran Digital** builds fast, reliable websites tailored for B2B suppliers, freight operators, and local service providers.',
    suburbs: ['Spartan', 'Jet Park', 'Isando', 'Bonaero Park', 'Aston Manor', 'Glen Marais'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114631.10978931267!2d28.20177727756149!3d-26.096894084228968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9514e82b7cf5bf%3A0x6e0dfad36ce6b702!2sKempton%20Park!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Kempton Park',
    faq: [
      {q: "Do you build B2B customer portals for logistics companies?", a: "Yes, we develop custom client portals, quote request forms, and ERP-integrated web tools."},
      {q: "How much does a small business website cost in Kempton Park?", a: "Our starter web packages begin at R3,500 with flexible payment structures."},
      {q: "Can you assist with domain registration and business emails?", a: "Yes, we handle end-to-end setup including domain registration, Microsoft 365 / Google Workspace email configuration, and fast local hosting."}
    ],
    service: 'Web Design'
  },
  {
    folder: 'web-design-roodepoort',
    title: 'Web Design Roodepoort | Custom Business Websites | Toran Digital',
    desc: 'Web design services in Roodepoort, Constantia Kloof & West Rand. High-converting websites for trade, retail, and corporate businesses.',
    canonical: 'https://torandigital.co.za/web-design-roodepoort/',
    h1_pre: 'Expert Web Design',
    h1_span: 'in Roodepoort & West Rand',
    hero_desc: 'Empowering Roodepoort and West Rand businesses with custom websites that drive leads, inquiries, and customer trust.',
    h2_1: 'Grow Your West Rand Business <span class="gradient-text">With Strategic Web Design</span>',
    p_1: 'From corporate centers in **Constantia Kloof** to commercial hubs near **Clearwater Mall**, competition across Roodepoort is growing rapidly. At **Toran Digital**, we design custom websites engineered to boost your visibility and convert visitors into customers.',
    suburbs: ['Constantia Kloof', 'Ruimsig', 'Horizon', 'Florida', 'Helderkruin', 'Weltevredenpark'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114646.6841285623!2d27.839848126786445!3d-26.131109984435882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e959efaa2a35ad5%3A0x6e0dfad36ce6b703!2sRoodepoort!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Roodepoort',
    faq: [
      {q: "Can you redesign our existing underperforming website?", a: "Yes! We specialize in modernizing legacy websites, improving user experience, site speed, and conversion rates."},
      {q: "Do you provide website maintenance and backups?", a: "Yes, all our plans include routine maintenance, daily/weekly cloud backups, and security monitoring."},
      {q: "Will our website display correctly on all mobile phones?", a: "Guaranteed. All our builds are fully responsive across smartphones, tablets, and desktop screens."}
    ],
    service: 'Web Design'
  },
  {
    folder: 'vehicle-branding-kempton-park',
    title: 'Vehicle Branding Kempton Park | Fleet Wraps & Signage | Toran Digital',
    desc: 'Commercial vehicle wrapping & fleet graphics in Kempton Park, Isando, Jet Park & Spartan. High-durability vinyl wraps by Toran Digital.',
    canonical: 'https://torandigital.co.za/vehicle-branding-kempton-park/',
    h1_pre: 'Fleet Wrapping & Vehicle Branding',
    h1_span: 'in Kempton Park & Isando',
    hero_desc: 'Heavy-duty vehicle wraps, logistics fleet graphics, and bakkie branding for commercial enterprises near OR Tambo Airport.',
    h2_1: 'Turn Your Logistics Fleet <span class="gradient-text">Into High-Impact Billboards</span>',
    p_1: 'With thousands of freight trucks and delivery bakkies departing **Spartan**, **Jet Park**, and **Isando** daily, clear fleet branding is essential. **Toran Digital** applies high-grade, weather-resistant cast vinyl wraps engineered to withstand harsh daily highway use.',
    suburbs: ['Isando', 'Jet Park', 'Spartan', 'Bonaero Park', 'Boksburg Industrial', 'Edenvale'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114631.10978931267!2d28.20177727756149!3d-26.096894084228968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9514e82b7cf5bf%3A0x6e0dfad36ce6b702!2sKempton%20Park!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Kempton Park',
    faq: [
      {q: "Can you wrap large commercial trucks and delivery fleets in Isando?", a: "Yes, we handle full fleet wraps for everything from small courier bakkies to large interlink commercial trailers."},
      {q: "What vinyl materials do you use for vehicle wrapping?", a: "We strictly use premium 7-year cast vinyls (like 3M and Avery Dennison) with UV laminates to prevent fading and peeling."},
      {q: "Do you assist with custom graphic design for the fleet?", a: "Yes, our in-house design team produces high-impact 3D vehicle mockups prior to printing."}
    ],
    service: 'Vehicle Branding'
  },
  {
    folder: 'vehicle-branding-alrode',
    title: 'Vehicle Branding Alrode | Fleet Wraps & Signage | Toran Digital',
    desc: 'Commercial vehicle wrapping & truck branding in Alrode, Wadeville & Germiston South. Heavy-duty fleet vinyl wrapping by Toran Digital.',
    canonical: 'https://torandigital.co.za/vehicle-branding-alrode/',
    h1_pre: 'Vehicle Wrapping & Fleet Branding',
    h1_span: 'in Alrode & Wadeville',
    hero_desc: 'Industrial fleet wrapping, bakkie graphics, and commercial truck signage across Alrode, Wadeville, and Germiston.',
    h2_1: 'Maximize Fleet Visibility <span class="gradient-text">Across Gauteng Highways</span>',
    p_1: 'Operating in the manufacturing heart of **Alrode** and **Wadeville**, your company vehicles cover hundreds of kilometers daily. **Toran Digital** delivers heavy-duty vehicle branding that protects your paintwork while building strong brand recognition.',
    suburbs: ['Wadeville', 'Germiston South', 'Alberton Industrial', 'Roodekop', 'Katlehong Logistics'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57245.96200215714!2d28.125740441042738!3d-26.311311029272337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9519ce7db5fa8d%3A0x6e0dfad36ce6b704!2sAlrode%2C%20Alberton!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Alrode',
    faq: [
      {q: "How long does a full vehicle wrap take to apply?", a: "Standard bakkie wraps take 1-2 days, while full commercial fleet schedules are managed to minimize downtime."},
      {q: "Will vehicle wrapping damage the original factory paint?", a: "No! Premium cast vinyl actually protects your original factory paintwork from stone chips and minor scratches."},
      {q: "Do you offer partial bakkie branding options?", a: "Yes, we offer partial wraps, door magnets, decal graphics, and contour-cut vinyl lettering to match any budget."}
    ],
    service: 'Vehicle Branding'
  },
  {
    folder: 'vehicle-branding-centurion',
    title: 'Vehicle Branding Centurion | Commercial Fleet Wrapping | Toran Digital',
    desc: 'Vehicle wrapping, bakkie branding & fleet signage in Centurion, Hennopspark & Samrand. Professional vinyl branding by Toran Digital.',
    canonical: 'https://torandigital.co.za/vehicle-branding-centurion/',
    h1_pre: 'Commercial Vehicle Branding',
    h1_span: 'in Centurion',
    hero_desc: 'Custom bakkie branding, corporate fleet wrapping, and vinyl decals for trade and corporate clients across Centurion and Pretoria.',
    h2_1: 'Transform Your Company Fleets <span class="gradient-text">Into Driving Revenue Generators</span>',
    p_1: 'From service bakkies based in **Hennopspark Industrial** to sales fleets driving along the **N1 corridor**, branded vehicles build immediate trust. **Toran Digital** offers expert design, precision printing, and flawless installation in Centurion.',
    suburbs: ['Hennopspark', 'Samrand', 'Highveld', 'Midstream', 'Zwartkop Industrial'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114811.23812836262!2d28.118939227181057!3d-25.852445885311892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9564177d4c82c3%3A0x6c6b4122d6402fb!2sCenturion!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Centurion',
    faq: [
      {q: "Do you handle on-site vehicle branding application in Centurion?", a: "Yes, for corporate fleet orders we can arrange mobile application teams to branded premises in Hennopspark or Samrand."},
      {q: "How do I care for a wrapped vehicle?", a: "We recommend hand washing with mild soap and avoiding harsh chemical high-pressure jets directly on vinyl edges."},
      {q: "What is the warranty on your vehicle wraps?", a: "We provide up to 3 years warranty against peeling, cracking, and excessive fading under normal South African weather conditions."}
    ],
    service: 'Vehicle Branding'
  },
  {
    folder: 'dstv-installation-edenvale',
    title: 'DSTV Installers Edenvale | TV Mounting & CCTV Setup | Toran Digital',
    desc: 'Accredited DSTV installers in Edenvale, Greenstone & Modderfontein. TV wall mounting, signal repair, Extra View & CCTV installation.',
    canonical: 'https://torandigital.co.za/dstv-installation-edenvale/',
    h1_pre: 'Accredited DSTV Installers',
    h1_span: 'in Edenvale & Greenstone',
    hero_desc: 'Professional DSTV setup, signal troubleshooting, TV wall mounting, and residential CCTV camera systems across Edenvale and Modderfontein.',
    h2_1: 'Fast, Reliable DSTV & CCTV <span class="gradient-text">Installations in Edenvale</span>',
    p_1: 'Whether you\'re moving into a townhouse in **Greenstone Hill**, upgrading Extra View in **Modderfontein**, or fixing signal issues in **Dowerglen**, **Toran Digital** provides fast, accredited installation services across Edenvale.',
    suburbs: ['Greenstone Hill', 'Modderfontein', 'Dowerglen', 'Dunveggan', 'Hurlyvale', 'Edenvale Ridge'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57303.45422896503!2d28.140810041490212!3d-26.126442925000574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95130761e3adbd%3A0x6e0dfad36ce6b705!2sEdenvale!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Edenvale',
    faq: [
      {q: "Can you fix the E48-32 'No Signal' error in Edenvale?", a: "Yes! We diagnose dish misalignment, damaged coaxial cables, or faulty LNBs and resolve signal errors quickly."},
      {q: "Do you install DSTV and CCTV in security estates?", a: "Yes, our accredited technicians are experienced working within complex body corporate and security estate access guidelines."},
      {q: "Do you provide concealed TV wall mounting?", a: "Absolutely. We supply heavy-duty wall brackets, mount TVs securely, and hide all cabling neatly within trunking or walls."}
    ],
    service: 'DSTV Installation'
  },
  {
    folder: 'dstv-installation-fourways',
    title: 'DSTV Installers Fourways | TV Wall Mounting & Security CCTV | Toran Digital',
    desc: 'Accredited DSTV installation in Fourways, Sunninghill & Lonehill. Explora setups, Extra View, TV wall mounting & CCTV cameras.',
    canonical: 'https://torandigital.co.za/dstv-installation-fourways/',
    h1_pre: 'Expert DSTV & CCTV Setup',
    h1_span: 'in Fourways & Lonehill',
    hero_desc: 'Professional DSTV Explora setup, Extra View linking, TV mounting, and smart security CCTV cameras for homes across Fourways.',
    h2_1: 'Premium Entertainment & Security <span class="gradient-text">Installations in Fourways</span>',
    p_1: 'From gated estates in **Dainfern** and **Lonehill** to modern apartments in **Sunninghill**, **Toran Digital** delivers clean, accredited field installations with high attention to detail.',
    suburbs: ['Lonehill', 'Dainfern', 'Sunninghill', 'Beverley', 'Broadacres', 'Paulshof'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57321.36511425126!2d27.979644342261546!3d-26.015797274981773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9574041b3152bd%3A0x500c7a017578500!2sFourways%2C%20Sandton!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Fourways',
    faq: [
      {q: "How many decoders can I link using DSTV Extra View?", a: "You can link up to 3 decoders under a single monthly DSTV subscription using modern Smart LNB technology."},
      {q: "Do you offer IP CCTV camera installation with smartphone viewing?", a: "Yes! We install HD IP CCTV systems that allow real-time remote monitoring directly on your iOS or Android phone."},
      {q: "Are your installers accredited and insured?", a: "Yes, all our field technicians are fully accredited, background-checked, and insured."}
    ],
    service: 'DSTV Installation'
  },
  {
    folder: 'dstv-installation-centurion',
    title: 'DSTV Installers Centurion | TV Mounting & CCTV Cameras | Toran Digital',
    desc: 'Accredited DSTV installers in Centurion & Midstream Estate. Fast DSTV repairs, Extra View, TV wall mounting & CCTV camera setups.',
    canonical: 'https://torandigital.co.za/dstv-installation-centurion/',
    h1_pre: 'DSTV & CCTV Installation Services',
    h1_span: 'in Centurion',
    hero_desc: 'Accredited DSTV installations, signal repair callouts, TV wall mounting, and home security CCTV across Centurion and Midstream.',
    h2_1: 'Reliable Field Services <span class="gradient-text">Across Centurion</span>',
    p_1: 'Whether you need an Explora installation in **Midstream Estate**, signal repair in **Eldoraigne**, or full CCTV security in **Wierdapark**, **Toran Digital** responds quickly with fully equipped service vehicles.',
    suburbs: ['Midstream Estate', 'Eldoraigne', 'Wierdapark', 'Rooihuiskraal', 'Clubview', 'Amberfield'],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114811.23812836262!2d28.118939227181057!3d-25.852445885311892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9564177d4c82c3%3A0x6c6b4122d6402fb!2sCenturion!5e0!3m2!1sen!2sza!4f13.1',
    locality: 'Centurion',
    faq: [
      {q: "Do you offer emergency weekend DSTV repairs in Centurion?", a: "Yes, our field teams operate Monday to Saturday with emergency callouts available for urgent signal breakdowns."},
      {q: "Can you assist with soundbar and home theater installation?", a: "Yes, we mount soundbars, calibrate surround sound audio systems, and route all wiring invisibly."},
      {q: "What warranty comes with your CCTV installations?", a: "We provide a 12-month hardware and workmanship warranty on all new CCTV camera installations."}
    ],
    service: 'DSTV Installation'
  }
];

pages.forEach(p => {
  let content = templateHtml;

  // Title & Meta
  content = content.replace(/<title>.*?<\/title>/, `<title>${p.title}</title>`);
  content = content.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${p.desc}">`);
  content = content.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="${p.canonical}">`);

  // Schema (add LocalBusiness before </head>)
  const schema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Toran Digital - ${p.service} ${p.locality}",
    "url": "${p.canonical}",
    "logo": "https://torandigital.co.za/logo/toran_logo_perfect.png",
    "description": "${p.desc.replace(/"/g, "'")}",
    "telephone": "+27696219479",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${p.locality}",
      "addressRegion": "Gauteng",
      "addressCountry": "ZA"
    }
  }
  </script>`;
  content = content.replace('</head>', schema + '\n</head>');

  // Hero H1 and Subtitle
  content = content.replace(/<div class="hero-badge reveal">.*?<\/div>/, `<div class="hero-badge reveal">${p.service} ${p.locality}</div>`);
  content = content.replace(/<h1 class="reveal reveal-delay-1">.*?<br><span class="gradient-text">.*?<\/span><\/h1>/, `<h1 class="reveal reveal-delay-1">${p.h1_pre} <br><span class="gradient-text">${p.h1_span}</span></h1>`);
  content = content.replace(/<p class="section-subtitle reveal reveal-delay-2"[\s\S]*?<\/p>/, `<p class="section-subtitle reveal reveal-delay-2" style="margin: 1.5rem auto; max-width: 700px;">\n          ${p.hero_desc}\n        </p>`);

  // Content Block 1
  content = content.replace(/<h2 class="section-title">Grow Your Sandton Business <span class="gradient-text">With Premium Design<\/span><\/h2>/, `<h2 class="section-title">${p.h2_1}</h2>`);
  content = content.replace(/<p>From the corporate offices on \*\*West Street\*\*[\s\S]*?<\/p>/, `<p>${p.p_1}</p>`);
  content = content.replace(/<strong>Sandton Local Relevance:<\/strong>/g, `<strong>${p.locality} Local Relevance:</strong>`);

  // Adjust Services and Pricing based on if it's Web Design or not
  if (p.service !== 'Web Design') {
      content = content.replace(/Our Web Design & <span class="gradient-text">Development Offerings<\/span>/, `Our <span class="gradient-text">${p.service} Offerings</span>`);
      content = content.replace(/WordPress Web Design/, p.service === 'Vehicle Branding' ? 'Full Vehicle Wraps' : 'Standard Decoder Setup');
      content = content.replace(/E-Commerce Stores/, p.service === 'Vehicle Branding' ? 'Fleet Branding' : 'Extra View Setup');
      content = content.replace(/Bespoke Web Apps/, p.service === 'Vehicle Branding' ? 'Bakkie & Van Branding' : 'CCTV Installations');
      
      // Update pricing cards roughly
      content = content.replace(/Starter Business/, 'Basic Package');
      content = content.replace(/Corporate Pro/, 'Premium Package');
      content = content.replace(/E-Commerce/, 'Custom Solution');
      
      content = content.replace(/Up to 5 Pages/g, 'Standard Setup');
      content = content.replace(/Mobile Responsive Design/g, 'High Quality Finish');
      content = content.replace(/Contact Form Integration/g, 'Professional Service');
      content = content.replace(/Basic On-Page SEO/g, 'Guaranteed Satisfaction');
      
      content = content.replace(/Up to 10 Pages/g, 'Comprehensive Solution');
      content = content.replace(/Premium Custom Design/g, 'Premium Materials');
      content = content.replace(/Social Media Integration/g, 'Dedicated Support');
      content = content.replace(/Advanced SEO Setup/g, 'Priority Service');
      content = content.replace(/Google Analytics Setup/g, 'Extended Warranty');
      
      content = content.replace(/Unlimited Pages \/ Products/g, 'Fully Custom Solution');
      content = content.replace(/Payment Gateway Setup/g, 'Dedicated Account Manager');
      content = content.replace(/Inventory Management/g, 'On-site Consultations');
      content = content.replace(/WordPress \/ WooCommerce/g, 'End-to-End Management');
  }

  // Recent Work Section
  content = content.replace(/Recent Projects in Sandton/g, `Recent Projects in ${p.locality}`);
  content = content.replace(/in Sandton/g, `in ${p.locality}`);
  if (p.service !== 'Web Design') {
      content = content.replace(/Corporate Web Overhaul/g, `${p.service} Project`);
      content = content.replace(/E-Commerce Boutique Store/g, `Commercial ${p.service} Project`);
  }

  // Local Map Section
  content = content.replace(/<iframe src="https:\/\/www.google.com\/maps\/embed\?.*?<\/iframe>/, `<iframe src="${p.mapSrc}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Toran Digital ${p.service} Coverage ${p.locality}"></iframe>`);
  content = content.replace(/Serving Sandton & <span class="gradient-text">Surrounding Districts<\/span>/, `Serving ${p.locality} & <span class="gradient-text">Surrounding Districts</span>`);
  
  // Suburbs
  let suburbsHtml = '<ul style="list-style: disc; padding-left: 20px; margin-bottom: 1.5rem;">';
  p.suburbs.forEach(sub => suburbsHtml += `<li>${sub}</li>`);
  suburbsHtml += '</ul>';
  
  content = content.replace(/<p style="margin-bottom: 1.5rem;">Our design consultants are regularly available for on-site strategy sessions and briefs in Sandton Central, Bryanston, Rivonia, and surrounding North Johannesburg neighborhoods.<\/p>/, 
    `<p style="margin-bottom: 1rem;">We also cover the following surrounding areas:</p>${suburbsHtml}`);

  // Add FAQ before CTA
  const faqHtml = `
    <!-- ==================== FAQ SECTION ==================== -->
    <section class="section" style="background: var(--surface-50);">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-title reveal">Frequently Asked <span class="gradient-text">Questions</span></h2>
        </div>
        <div class="faq-container reveal" style="max-width: 800px; margin: 0 auto;">
          ${p.faq.map(f => `
          <div class="faq-item" style="border-bottom: 1px solid var(--surface-200); padding: 1.5rem 0;">
            <h3 style="font-size: 1.2rem; color: var(--navy-800); margin-bottom: 0.5rem;">${f.q}</h3>
            <p style="color: var(--navy-600); line-height: 1.6;">${f.a}</p>
          </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
  content = content.replace('<!-- ==================== CTA BANNER ==================== -->', faqHtml + '\n    <!-- ==================== CTA BANNER ==================== -->');

  const pageDir = path.join(dir, p.folder);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  fs.writeFileSync(path.join(pageDir, 'index.html'), content);
});

console.log(`Successfully generated ${pages.length} location landing pages.`);
