const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Helper to convert emojis/keywords to professional SVGs
function getIcon(emoji) {
  const iconStyle = 'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" viewBox="0 0 24 24"';
  
  const icons = {
    '🛒': `<svg ${iconStyle}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    '💳': `<svg ${iconStyle}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
    '📦': `<svg ${iconStyle}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    '📊': `<svg ${iconStyle}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    '📱': `<svg ${iconStyle}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
    '🚀': `<svg ${iconStyle}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
    '⚙️': `<svg ${iconStyle}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    '🔐': `<svg ${iconStyle}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    '🔗': `<svg ${iconStyle}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    '☁️': `<svg ${iconStyle}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
    '🛠️': `<svg ${iconStyle}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
    '🎨': `<svg ${iconStyle}><path d="M12 2a10 10 0 0 0-6.88 2.77C3.55 6.33 2 9 2 12c0 2.45.69 4.3 1.86 5.56C4.94 18.73 6.3 19 7 19h.5a1.5 1.5 0 0 0 1.5-1.5v-1a2 2 0 0 1 2-2h1a5 5 0 0 1 5 5v.5c0 1.1-.9 2-2 2h-1c-.55 0-1 .45-1 1s.45 1 1 1h1a4 4 0 0 0 4-4v-.5a7 7 0 0 0-7-7h-1a2 2 0 0 1-2-2v-1a1.5 1.5 0 0 0-1.5-1.5H7.5a.5.5 0 0 1-.5-.5 3 3 0 0 1 3-3h1a8 8 0 0 1 8 8v1a1 1 0 0 0 1 1h.5a1.5 1.5 0 0 0 1.5-1.5V12a10 10 0 0 0-10-10z"></path></svg>`,
    '🔌': `<svg ${iconStyle}><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>`, // replaced with simple chart
    '⚡': `<svg ${iconStyle}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    '🔒': `<svg ${iconStyle}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    '✏️': `<svg ${iconStyle}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>`,
    '🍎': `<svg ${iconStyle}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`, // file
    '🔔': `<svg ${iconStyle}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    '📍': `<svg ${iconStyle}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    '🤖': `<svg ${iconStyle}><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>`,
    '📐': `<svg ${iconStyle}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    '🌍': `<svg ${iconStyle}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    '🏪': `<svg ${iconStyle}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    '💰': `<svg ${iconStyle}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    '🔄': `<svg ${iconStyle}><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
    '🎯': `<svg ${iconStyle}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
    '📈': `<svg ${iconStyle}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
    '⭐': `<svg ${iconStyle}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    '📝': `<svg ${iconStyle}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    '🔍': `<svg ${iconStyle}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    '🖼️': `<svg ${iconStyle}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
    '📹': `<svg ${iconStyle}><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
    '🧪': `<svg ${iconStyle}><path d="M10 2v7.31"></path><path d="M14 9.3V2"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><line x1="5.52" y1="16" x2="18.48" y2="16"></line></svg>`,
    '✅': `<svg ${iconStyle}><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    '📸': `<svg ${iconStyle}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
    '🔧': `<svg ${iconStyle}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
    '🚗': `<svg ${iconStyle}><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle><path d="M1 10.5V15h2m18 0h2v-4.5L19.5 6H4.5L1 10.5z"></path></svg>`, // car (simplified)
    '🛡️': `<svg ${iconStyle}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    '🌞': `<svg ${iconStyle}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    '🚛': `<svg ${iconStyle}><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`,
    '📅': `<svg ${iconStyle}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
    '📋': `<svg ${iconStyle}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`,
    '🧲': `<svg ${iconStyle}><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`, // replaced with simple icon
    '📡': `<svg ${iconStyle}><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>`,
    '📺': `<svg ${iconStyle}><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>`,
    '🏠': `<svg ${iconStyle}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    '🌙': `<svg ${iconStyle}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    '💾': `<svg ${iconStyle}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`,
    '📏': `<svg ${iconStyle}><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>`,
    '🔊': `<svg ${iconStyle}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`,
    '📘': `<svg ${iconStyle}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    '🃏': `<svg ${iconStyle}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`, // default image
    '📄': `<svg ${iconStyle}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    '📁': `<svg ${iconStyle}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
    '🏷️': `<svg ${iconStyle}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>`,
    '🌗': `<svg ${iconStyle}><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 0 0 20V2z"></path></svg>`,
    '🏢': `<svg ${iconStyle}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
    '💡': `<svg ${iconStyle}><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>`,
  };
  
  // Default fallback if emoji not mapped
  return icons[emoji] || `<svg ${iconStyle}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`;
}

// ============================================================
// SUB-SERVICE PAGE DEFINITIONS
// ============================================================
// Include all pages with emojis in 'icon'. I will use getIcon to map them in the template.
const pages = [
  // ── WEB DESIGN ────────────────────────────────────────────
  {
    folder: 'web-design/ecommerce',
    title: 'Ecommerce Website Design Johannesburg | Online Stores | Toran Digital',
    h1: 'Ecommerce Websites That <span class="highlight-word">Sell While You Sleep</span>',
    desc: 'We build high-converting ecommerce stores in Johannesburg — Shopify, WooCommerce, and custom platforms. Get a store that drives real revenue.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="8" y="16" width="64" height="48" rx="6" fill="url(#eg)" opacity="0.9"/><path d="M8 26h64" stroke="#22D3EE" stroke-width="2"/><circle cx="16" cy="21" r="2" fill="#F59E0B"/><circle cx="23" cy="21" r="2" fill="#22D3EE"/><circle cx="30" cy="21" r="2" fill="#2563EB"/><rect x="18" y="34" width="20" height="14" rx="3" fill="rgba(34,211,238,0.2)" stroke="#22D3EE" stroke-width="1.5"/><rect x="42" y="34" width="20" height="14" rx="3" fill="rgba(34,211,238,0.2)" stroke="#22D3EE" stroke-width="1.5"/><rect x="18" y="52" width="44" height="6" rx="3" fill="url(#eg2)"/><defs><linearGradient id="eg" x1="8" y1="16" x2="72" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#0E7490"/></linearGradient><linearGradient id="eg2" x1="18" y1="52" x2="62" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#F59E0B"/><stop offset="1" stop-color="#22D3EE"/></linearGradient></defs></svg>`,
    badge: 'Online Retail Solutions',
    canonical: 'https://torandigital.co.za/web-design/ecommerce/',
    ogTitle: 'Ecommerce Website Design Johannesburg | Toran Digital',
    ogDesc: 'High-converting online stores built for South African businesses. Shopify, WooCommerce & custom platforms.',
    keywords: 'ecommerce website design Johannesburg, online store design South Africa, Shopify developer Gauteng, WooCommerce design Johannesburg',
    parentService: 'Web Design',
    parentUrl: '../../web-design/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '🛒', title: 'Shopify & WooCommerce', desc: 'We build on the world\'s best ecommerce platforms — or fully custom if needed.' },
      { icon: '💳', title: 'Secure Payments', desc: 'Integrated with PayFast, Yoco, Peach Payments & major SA payment gateways.' },
      { icon: '📦', title: 'Inventory Management', desc: 'Smart stock tracking, product variants, and bulk import tools built in.' },
      { icon: '📊', title: 'Analytics & Reports', desc: 'Know exactly what your customers buy, when, and why — with real data.' },
      { icon: '📱', title: 'Mobile-First Design', desc: 'Over 70% of South African shoppers browse on mobile. We design mobile first.' },
      { icon: '🚀', title: 'SEO-Ready Structure', desc: 'Built to rank on Google with correct schema, sitemaps, and clean URLs.' },
    ],
    process: ['Discovery & Product Audit', 'UX & Design Mockups', 'Store Development', 'Payment & Shipping Setup', 'Testing & QA', 'Launch & Training'],
    faq: [
      { q: 'How long does an ecommerce store take to build?', a: 'A standard ecommerce store takes 4–8 weeks depending on the number of products and complexity. We provide a full timeline after the discovery call.' },
      { q: 'Which ecommerce platform do you recommend?', a: 'For most SA businesses, Shopify or WooCommerce. We recommend based on your product count, budget, and growth goals.' },
      { q: 'Do you integrate with PayFast and Yoco?', a: 'Yes — we integrate all major South African payment gateways including PayFast, Yoco, Peach Payments, and Ozow.' },
      { q: 'Can you migrate my existing store?', a: 'Absolutely. We migrate from any platform to your new store, including product data, orders, and customer records.' },
    ],
    schema: 'Ecommerce Website Design',
    formService: 'Ecommerce Website Design',
    stat1: '300+', stat1Label: 'Stores Built',
    stat2: '98%', stat2Label: 'Client Satisfaction',
    stat3: '2.4×', stat3Label: 'Avg. Revenue Boost',
  },
  {
    folder: 'web-design/custom-web-apps',
    title: 'Custom Web App Development Johannesburg | Toran Digital',
    h1: 'Custom Web Apps <span class="highlight-word">Built for Your Business</span>',
    desc: 'From internal dashboards to customer-facing portals — we engineer custom web applications that automate, scale, and impress.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="8" y="12" width="64" height="52" rx="6" fill="url(#cwg)" opacity="0.9"/><path d="M22 34 L30 40 L22 46" stroke="#22D3EE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 46 L46 46" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/><path d="M58 34 L50 40 L58 46" stroke="#22D3EE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="cwg" x1="8" y1="12" x2="72" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#071A2F"/><stop offset="1" stop-color="#1E4D8C"/></linearGradient></defs></svg>`,
    badge: 'Bespoke Software Solutions',
    canonical: 'https://torandigital.co.za/web-design/custom-web-apps/',
    ogTitle: 'Custom Web Application Development Johannesburg | Toran Digital',
    ogDesc: 'We build powerful custom web applications for South African businesses. Portals, dashboards, automation & more.',
    keywords: 'custom web app development Johannesburg, web application South Africa, business portal development Gauteng, software development Johannesburg',
    parentService: 'Web Design',
    parentUrl: '../../web-design/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '⚙️', title: 'Business Process Automation', desc: 'Replace repetitive manual tasks with intelligent, automated web workflows.' },
      { icon: '🔐', title: 'Secure User Portals', desc: 'Role-based login, customer portals, and team dashboards built with security first.' },
      { icon: '📊', title: 'Real-Time Dashboards', desc: 'Beautiful analytics dashboards connected to your live business data.' },
      { icon: '🔗', title: 'Third-Party API Integrations', desc: 'Connect your app to CRMs, accounting software, WhatsApp, and more.' },
      { icon: '☁️', title: 'Cloud-Hosted & Scalable', desc: 'Deployed on modern cloud infrastructure that grows with your business.' },
      { icon: '🛠️', title: 'Ongoing Support', desc: 'We don\'t disappear after launch. Monthly maintenance and feature updates available.' },
    ],
    process: ['Requirements Gathering', 'System Architecture Design', 'Agile Development Sprints', 'API & Data Integration', 'User Testing', 'Deployment & Handover'],
    faq: [
      { q: 'What kind of web apps do you build?', a: 'We build booking systems, CRMs, inventory systems, staff portals, customer dashboards, and any custom business logic you need.' },
      { q: 'How much does a custom web app cost?', a: 'Starting from R25,000 for basic apps. Complex enterprise systems are quoted after a full requirements session. We\'re transparent about pricing.' },
      { q: 'Do you use specific technologies?', a: 'We use React, Node.js, PHP, and Python depending on the use case. We choose the best tool for your specific requirements.' },
      { q: 'Can you take over an existing app?', a: 'Yes. We\'re experienced in taking over legacy codebases, modernising them, and adding new features.' },
    ],
    schema: 'Custom Web Application Development',
    formService: 'Custom Web App Development',
    stat1: '150+', stat1Label: 'Apps Delivered',
    stat2: '5★', stat2Label: 'Client Rating',
    stat3: '40%', stat3Label: 'Cost vs. Enterprise',
  },
  {
    folder: 'web-design/wordpress',
    title: 'WordPress Website Design Johannesburg | Expert WP Developers | Toran Digital',
    h1: 'WordPress Sites That <span class="highlight-word">Actually Perform</span>',
    desc: 'Professional WordPress design and development in Johannesburg. Custom themes, WooCommerce, page builders — built fast and built to rank.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="40" cy="40" r="32" fill="url(#wpg)" opacity="0.9"/><path d="M24 40 C24 31.2 31.2 24 40 24 C48.8 24 56 31.2 56 40 C56 48.8 48.8 56 40 56 C31.2 56 24 48.8 24 40Z" stroke="#22D3EE" stroke-width="2" fill="none"/><path d="M26 40h4M50 40h4M40 26v4M40 50v4" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/><text x="40" y="45" text-anchor="middle" font-size="14" font-weight="bold" fill="white" font-family="sans-serif">WP</text><defs><linearGradient id="wpg" x1="8" y1="8" x2="72" y2="72" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#0E7490"/></linearGradient></defs></svg>`,
    badge: 'WordPress Specialists',
    canonical: 'https://torandigital.co.za/web-design/wordpress/',
    ogTitle: 'WordPress Website Design Johannesburg | Toran Digital',
    ogDesc: 'Expert WordPress developers in Johannesburg. Custom themes, WooCommerce, speed optimisation, and ongoing support.',
    keywords: 'WordPress website design Johannesburg, WordPress developer Gauteng, WooCommerce developer South Africa, WordPress expert Johannesburg',
    parentService: 'Web Design',
    parentUrl: '../../web-design/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '🎨', title: 'Custom WordPress Themes', desc: 'No cheap templates. We build pixel-perfect custom themes tailored to your brand.' },
      { icon: '🔌', title: 'Plugin Development', desc: 'Need functionality that doesn\'t exist? We build custom WordPress plugins from scratch.' },
      { icon: '🛒', title: 'WooCommerce Stores', desc: 'Full ecommerce on WordPress — products, payments, shipping, and inventory.' },
      { icon: '⚡', title: 'Speed Optimisation', desc: 'Fast-loading WP sites with image optimisation, caching, and CDN setup.' },
      { icon: '🔒', title: 'Security Hardening', desc: 'Malware protection, SSL, daily backups, and 2FA implemented on every site.' },
      { icon: '✏️', title: 'Easy Content Editing', desc: 'You can update your own site. We train you to use the WordPress dashboard confidently.' },
    ],
    process: ['Site Planning & Wireframes', 'Custom Theme Design', 'WordPress Development', 'Plugin Setup & Content', 'Speed & Security Audit', 'Training & Handover'],
    faq: [
      { q: 'Why choose WordPress?', a: 'WordPress powers 43% of all websites globally. It\'s flexible, well-supported, and easy to manage once built professionally.' },
      { q: 'How do you keep WordPress sites secure?', a: 'We harden every site with firewall rules, limit login attempts, install reputable security plugins, and set up daily automated backups.' },
      { q: 'Can you fix or redesign my existing WordPress site?', a: 'Yes — we offer WordPress rescue, redesigns, and ongoing maintenance packages.' },
      { q: 'Do you support page builders like Elementor?', a: 'We work with Elementor, Bricks, and Gutenberg. We recommend the right tool based on your content needs.' },
    ],
    schema: 'WordPress Website Design',
    formService: 'WordPress Website Design',
    stat1: '200+', stat1Label: 'WP Sites Built',
    stat2: '4.9★', stat2Label: 'Google Rating',
    stat3: '72h', stat3Label: 'Avg. First Delivery',
  },
  // ── MOBILE APPS ───────────────────────────────────────────
  {
    folder: 'mobile-apps/ios-development',
    title: 'iOS App Development Johannesburg | Native iPhone Apps | Toran Digital',
    h1: 'Native iOS Apps <span class="highlight-word">Built for the App Store</span>',
    desc: 'Expert iOS application development in Johannesburg. We build fast, beautiful, and App Store-approved native iPhone and iPad apps.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="22" y="8" width="36" height="64" rx="8" fill="url(#iosg)" stroke="#22D3EE" stroke-width="1.5"/><rect x="27" y="16" width="26" height="44" rx="4" fill="rgba(6,182,212,0.15)"/><circle cx="40" cy="65" r="3" fill="#22D3EE" opacity="0.7"/><path d="M35 12h10" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" opacity="0.5"/><path d="M33 32 L40 25 L47 32" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 25 L40 43" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/><defs><linearGradient id="iosg" x1="22" y1="8" x2="58" y2="72" gradientUnits="userSpaceOnUse"><stop stop-color="#071A2F"/><stop offset="1" stop-color="#0E7490"/></linearGradient></defs></svg>`,
    badge: 'Apple Platform Experts',
    canonical: 'https://torandigital.co.za/mobile-apps/ios-development/',
    ogTitle: 'iOS App Development Johannesburg | Toran Digital',
    ogDesc: 'Native iPhone and iPad app development in Johannesburg. App Store submission, UI/UX design, and ongoing support.',
    keywords: 'iOS app development Johannesburg, iPhone app developer South Africa, native iOS development Gauteng, App Store development Johannesburg',
    parentService: 'Mobile Apps',
    parentUrl: '../../mobile-apps/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '🍎', title: 'Swift & SwiftUI', desc: 'Built with Apple\'s latest native languages for maximum performance and longevity.' },
      { icon: '🎨', title: 'Apple HIG Design', desc: 'Interfaces designed to feel native and familiar — following Apple\'s Human Interface Guidelines.' },
      { icon: '🔔', title: 'Push Notifications', desc: 'Re-engage your users with targeted, timely push notifications via APNs.' },
      { icon: '💳', title: 'In-App Purchases', desc: 'Subscriptions, one-time purchases, and freemium models fully set up.' },
      { icon: '📍', title: 'Maps & Location', desc: 'Integrate Apple Maps, CoreLocation, and geofencing into your app experience.' },
      { icon: '🚀', title: 'App Store Submission', desc: 'We handle the full App Store review process and respond to any rejections.' },
    ],
    process: ['Concept & Scoping', 'UI/UX Design', 'Swift Development', 'QA & Device Testing', 'App Store Submission', 'Post-Launch Support'],
    faq: [
      { q: 'How long does iOS app development take?', a: 'A standard iOS app takes 8–16 weeks. Complex apps with backend systems may take longer. We give you a precise timeline after scoping.' },
      { q: 'Do you publish to the App Store?', a: 'Yes — we handle the entire App Store submission including screenshots, metadata, and responding to Apple review feedback.' },
      { q: 'Can you build both iOS and Android?', a: 'Yes. We can build native apps for both, or use cross-platform frameworks like Flutter or React Native to share code efficiently.' },
      { q: 'Do I need an Apple Developer Account?', a: 'Yes. We guide you through creating one (R1,800/year). Alternatively, we can publish under our account for a short period.' },
    ],
    schema: 'iOS App Development',
    formService: 'iOS App Development',
    stat1: '80+', stat1Label: 'Apps Shipped',
    stat2: '4.8★', stat2Label: 'App Store Avg.',
    stat3: '100%', stat3Label: 'Approval Rate',
  },
  {
    folder: 'mobile-apps/android-development',
    title: 'Android App Development Johannesburg | Native Android Apps | Toran Digital',
    h1: 'Android Apps That <span class="highlight-word">Dominate the Play Store</span>',
    desc: 'Native Android app development in Johannesburg. We build smooth, feature-rich apps using Kotlin — designed for South Africa\'s Android-first market.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="22" y="12" width="36" height="58" rx="6" fill="url(#andg)" stroke="#22D3EE" stroke-width="1.5"/><rect x="27" y="20" width="26" height="38" rx="3" fill="rgba(34,197,94,0.15)"/><circle cx="40" cy="64" r="2.5" fill="#4ADE80" opacity="0.7"/><path d="M33 12 L29 7" stroke="#4ADE80" stroke-width="2" stroke-linecap="round"/><path d="M47 12 L51 7" stroke="#4ADE80" stroke-width="2" stroke-linecap="round"/><path d="M32 36 L40 29 L48 36 L40 43Z" stroke="#F59E0B" stroke-width="1.5" fill="none"/><defs><linearGradient id="andg" x1="22" y1="12" x2="58" y2="70" gradientUnits="userSpaceOnUse"><stop stop-color="#071A2F"/><stop offset="1" stop-color="#14532D"/></linearGradient></defs></svg>`,
    badge: 'Google Play Specialists',
    canonical: 'https://torandigital.co.za/mobile-apps/android-development/',
    ogTitle: 'Android App Development Johannesburg | Toran Digital',
    ogDesc: 'Native Kotlin Android app development in Johannesburg. Built for South Africa\'s Android-dominant market.',
    keywords: 'Android app development Johannesburg, Android developer South Africa, Kotlin developer Gauteng, Google Play development Johannesburg',
    parentService: 'Mobile Apps',
    parentUrl: '../../mobile-apps/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '🤖', title: 'Kotlin & Jetpack Compose', desc: 'Modern Android development using Google\'s recommended languages and UI toolkit.' },
      { icon: '📐', title: 'Material Design 3', desc: 'Beautiful, responsive interfaces that follow Google\'s design standards.' },
      { icon: '🌍', title: 'SA Network Optimised', desc: 'Designed to work well on slower mobile networks common across South Africa.' },
      { icon: '🔔', title: 'FCM Push Notifications', desc: 'Keep users engaged with Firebase Cloud Messaging push notifications.' },
      { icon: '📊', title: 'Firebase & Analytics', desc: 'Integrated with Firebase for authentication, real-time DB, and crash reporting.' },
      { icon: '🏪', title: 'Play Store Publishing', desc: 'Full Google Play listing setup, ASO optimisation, and submission handling.' },
    ],
    process: ['Discovery & Scoping', 'Android UI/UX Design', 'Kotlin Development', 'Firebase Integration', 'QA Testing on Devices', 'Play Store Launch'],
    faq: [
      { q: 'Why choose native Android over cross-platform?', a: 'Native Android apps perform better, integrate deeper with device hardware, and generally receive better Play Store rankings.' },
      { q: 'What Android versions do you support?', a: 'We target Android 8.0+ (covering 95%+ of active Android devices), with careful handling of version-specific features.' },
      { q: 'How do you test Android apps?', a: 'We test on physical devices across multiple manufacturers (Samsung, Huawei, Xiaomi) and use automated testing tools.' },
      { q: 'Can you add Android to my existing iOS app?', a: 'Yes — we can build a native Android companion to an existing iOS app, sharing design language and backend APIs.' },
    ],
    schema: 'Android App Development',
    formService: 'Android App Development',
    stat1: '90+', stat1Label: 'Android Apps',
    stat2: '4.7★', stat2Label: 'Play Store Avg.',
    stat3: '85%', stat3Label: 'SA Market Share',
  },
  {
    folder: 'mobile-apps/cross-platform',
    title: 'Cross-Platform App Development Johannesburg | React Native & Flutter | Toran Digital',
    h1: 'One Codebase. <span class="highlight-word">iOS and Android.</span>',
    desc: 'Build once, deploy everywhere. We develop cross-platform mobile apps using React Native and Flutter — half the cost, all the performance.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="10" y="14" width="25" height="52" rx="5" fill="url(#cpa)" stroke="#22D3EE" stroke-width="1.5"/><rect x="45" y="14" width="25" height="52" rx="5" fill="url(#cpb)" stroke="#F59E0B" stroke-width="1.5"/><path d="M35 40 L45 40" stroke="white" stroke-width="2" stroke-dasharray="3 2"/><defs><linearGradient id="cpa" x1="10" y1="14" x2="35" y2="66" gradientUnits="userSpaceOnUse"><stop stop-color="#071A2F"/><stop offset="1" stop-color="#0E7490"/></linearGradient><linearGradient id="cpb" x1="45" y1="14" x2="70" y2="66" gradientUnits="userSpaceOnUse"><stop stop-color="#1C1917"/><stop offset="1" stop-color="#92400E"/></linearGradient></defs></svg>`,
    badge: 'React Native & Flutter',
    canonical: 'https://torandigital.co.za/mobile-apps/cross-platform/',
    ogTitle: 'Cross-Platform App Development Johannesburg | Toran Digital',
    ogDesc: 'React Native and Flutter app development in Johannesburg. Build once, launch on iOS and Android simultaneously.',
    keywords: 'React Native developer Johannesburg, Flutter app development South Africa, cross-platform app development Gauteng, hybrid app developer Johannesburg',
    parentService: 'Mobile Apps',
    parentUrl: '../../mobile-apps/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '⚡', title: 'React Native & Flutter', desc: 'We use the two best cross-platform frameworks for near-native performance on both platforms.' },
      { icon: '💰', title: 'Up to 50% Cost Saving', desc: 'One shared codebase means faster development and lower ongoing maintenance costs.' },
      { icon: '🔄', title: 'Simultaneous Launch', desc: 'Launch your app on the App Store and Google Play at the same time.' },
      { icon: '🎯', title: 'Native Look & Feel', desc: 'Cross-platform doesn\'t mean compromise — our apps feel fully native on every device.' },
      { icon: '🔗', title: 'Full API Integration', desc: 'Connect to any backend, REST API, or third-party service seamlessly.' },
      { icon: '📈', title: 'OTA Updates', desc: 'Push bug fixes and minor updates instantly without going through App Store review.' },
    ],
    process: ['Platform Strategy', 'Shared UI/UX Design', 'Cross-Platform Development', 'Native Module Integration', 'Dual Platform Testing', 'Simultaneous Launch'],
    faq: [
      { q: 'React Native or Flutter — which is better?', a: 'Both are excellent. React Native is great if you have a JavaScript team. Flutter offers better performance for complex animations. We recommend based on your use case.' },
      { q: 'Will my cross-platform app look native?', a: 'Yes. We use platform-specific UI components and follow design guidelines for each OS so users can\'t tell the difference.' },
      { q: 'Is cross-platform right for my app?', a: 'It\'s ideal for most business apps. For apps requiring heavy hardware access (cameras, AR, Bluetooth), native may be better. We advise you honestly.' },
      { q: 'What\'s the cost difference vs. native?', a: 'Cross-platform typically costs 40–60% less than building two separate native apps, with a faster timeline.' },
    ],
    schema: 'Cross-Platform App Development',
    formService: 'Cross-Platform App Development',
    stat1: '60+', stat1Label: 'Apps Launched',
    stat2: '50%', stat2Label: 'Cost Saving',
    stat3: '2 in 1', stat3Label: 'Platforms at Once',
  },
  // ── SEO MARKETING ─────────────────────────────────────────
  {
    folder: 'seo-marketing/local-seo',
    title: 'Local SEO Services Johannesburg | Rank on Google Maps | Toran Digital',
    h1: 'Local SEO That Puts You <span class="highlight-word">Top of Google Maps</span>',
    desc: 'Dominate local search results in Johannesburg. We optimise your Google Business Profile, build local citations, and get your phone ringing.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M40 14 C29.5 14 21 22.5 21 33 C21 46 40 66 40 66 C40 66 59 46 59 33 C59 22.5 50.5 14 40 14Z" fill="url(#lsg)" stroke="#22D3EE" stroke-width="1.5"/><circle cx="40" cy="33" r="7" fill="white" opacity="0.9"/><defs><linearGradient id="lsg" x1="21" y1="14" x2="59" y2="66" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#0E7490"/></linearGradient></defs></svg>`,
    badge: 'Local Search Specialists',
    canonical: 'https://torandigital.co.za/seo-marketing/local-seo/',
    ogTitle: 'Local SEO Services Johannesburg | Toran Digital',
    ogDesc: 'Rank #1 on Google Maps in Johannesburg. We optimise your Google Business Profile, build citations, and drive local leads.',
    keywords: 'local SEO Johannesburg, Google Maps SEO South Africa, local SEO services Gauteng, Google Business Profile optimisation Johannesburg',
    parentService: 'SEO & Marketing',
    parentUrl: '../../seo-marketing/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '📍', title: 'Google Business Profile', desc: 'Full GBP optimisation — posts, photos, Q&A, service areas, and review strategy.' },
      { icon: '🔗', title: 'Local Citation Building', desc: 'Consistent NAP listings across Yellow Pages, Yelp, and SA-specific directories.' },
      { icon: '⭐', title: 'Review Generation', desc: 'Proven strategies to generate authentic 5-star reviews that build trust and rankings.' },
      { icon: '📝', title: 'Local Landing Pages', desc: 'SEO-optimised location pages targeting every suburb and area you serve.' },
      { icon: '🔍', title: 'Keyword Research', desc: 'We find exactly what your local customers search for and build content around it.' },
      { icon: '📊', title: 'Monthly Reporting', desc: 'Transparent reports showing ranking positions, traffic, and lead generation every month.' },
    ],
    process: ['Local SEO Audit', 'GBP Optimisation', 'Citation Cleanup', 'On-Page Local SEO', 'Review Strategy', 'Monthly Monitoring'],
    faq: [
      { q: 'How long does local SEO take?', a: 'Most clients see meaningful ranking improvements within 3–6 months. Google Maps rankings can improve in as little as 4–8 weeks.' },
      { q: 'Do you manage our Google Business Profile?', a: 'Yes — we take full ownership of your GBP, posting regular updates, responding to reviews, and keeping information accurate.' },
      { q: 'Can you help multiple locations?', a: 'Absolutely. We specialise in multi-location local SEO for businesses with branches across Gauteng and beyond.' },
      { q: 'What\'s included in your local SEO package?', a: 'GBP management, citation building, on-page optimisation, local link building, review strategy, and monthly reports — all included.' },
    ],
    schema: 'Local SEO Services',
    formService: 'Local SEO Services',
    stat1: '#1', stat1Label: 'Maps Rankings',
    stat2: '3–6', stat2Label: 'Months to Results',
    stat3: '5★', stat3Label: 'Avg. Review Score',
  },
  {
    folder: 'seo-marketing/google-ads',
    title: 'Google Ads Management Johannesburg | PPC Experts | Toran Digital',
    h1: 'Google Ads That <span class="highlight-word">Actually Make Money</span>',
    desc: 'Stop wasting your ad budget. Our certified Google Ads team in Johannesburg builds, manages, and scales campaigns that deliver a positive ROI.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="12" y="20" width="56" height="40" rx="6" fill="url(#gag)" opacity="0.9"/><path d="M20 50 L30 35 L40 42 L52 28 L60 32" stroke="#22D3EE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="32" r="3" fill="#F59E0B"/><defs><linearGradient id="gag" x1="12" y1="20" x2="68" y2="60" gradientUnits="userSpaceOnUse"><stop stop-color="#071A2F"/><stop offset="1" stop-color="#0F3A6E"/></linearGradient></defs></svg>`,
    badge: 'Certified Google Partners',
    canonical: 'https://torandigital.co.za/seo-marketing/google-ads/',
    ogTitle: 'Google Ads Management Johannesburg | Toran Digital',
    ogDesc: 'Certified Google Ads management in Johannesburg. We build, manage, and scale campaigns with proven ROI for SA businesses.',
    keywords: 'Google Ads Johannesburg, PPC management South Africa, Google Ads agency Gauteng, pay-per-click management Johannesburg',
    parentService: 'SEO & Marketing',
    parentUrl: '../../seo-marketing/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '🎯', title: 'Search Campaigns', desc: 'Show up when customers actively search for your product or service on Google.' },
      { icon: '🖼️', title: 'Display & Remarketing', desc: 'Stay top-of-mind with retargeting ads that follow warm leads across the web.' },
      { icon: '🛒', title: 'Shopping Campaigns', desc: 'Get your products in front of buyers with Google Shopping ads.' },
      { icon: '📹', title: 'YouTube Ads', desc: 'Video ads on YouTube that build brand awareness and drive intent at scale.' },
      { icon: '📊', title: 'Conversion Tracking', desc: 'Know exactly which ads drive phone calls, form fills, and sales.' },
      { icon: '🧪', title: 'A/B Ad Testing', desc: 'Continuous split-testing of ad copy, landing pages, and bidding strategies.' },
    ],
    process: ['Account Audit / Setup', 'Keyword & Competitor Research', 'Campaign Structure & Ad Copy', 'Landing Page Review', 'Launch & Monitor', 'Monthly Optimisation'],
    faq: [
      { q: 'What\'s a good Google Ads budget for a SA business?', a: 'We recommend starting with R5,000–R15,000/month ad spend depending on your industry. We advise based on competitor data and your goals.' },
      { q: 'Do you charge a management fee?', a: 'Yes — we charge a transparent monthly management fee separate from your ad spend. No hidden commissions on budget.' },
      { q: 'How do you measure Google Ads success?', a: 'We track leads, calls, sales, cost per conversion, and ROAS. Monthly reports show exactly where every rand went.' },
      { q: 'Can you take over an existing Google Ads account?', a: 'Absolutely. We audit your existing account, clean up wasted spend, and restructure campaigns for better performance.' },
    ],
    schema: 'Google Ads Management',
    formService: 'Google Ads Management',
    stat1: '4×', stat1Label: 'Avg. ROAS',
    stat2: 'R5K+', stat2Label: 'Min. Ad Budget',
    stat3: '30d', stat3Label: 'To First Results',
  },
  {
    folder: 'seo-marketing/google-business-profile',
    title: 'Google Business Profile Optimisation Johannesburg | Toran Digital',
    h1: 'Google Business Profile <span class="highlight-word">Done Properly</span>',
    desc: 'Your Google Business Profile is your most powerful free marketing tool. We set it up, optimise it, and manage it so customers find and choose you.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="40" cy="36" r="22" fill="url(#gbpg)" opacity="0.9"/><path d="M40 18 L43.5 29.5 L56 29.5 L46 37 L49.5 48.5 L40 41.5 L30.5 48.5 L34 37 L24 29.5 L36.5 29.5Z" fill="#F59E0B" opacity="0.9"/><path d="M28 62 C28 62 40 72 52 62" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" fill="none"/><defs><linearGradient id="gbpg" x1="18" y1="14" x2="62" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#1E4D8C"/></linearGradient></defs></svg>`,
    badge: 'GBP Certified Experts',
    canonical: 'https://torandigital.co.za/seo-marketing/google-business-profile/',
    ogTitle: 'Google Business Profile Management Johannesburg | Toran Digital',
    ogDesc: 'Expert Google Business Profile setup and management in Johannesburg. Rank higher on Maps and get more calls.',
    keywords: 'Google Business Profile Johannesburg, Google My Business management South Africa, GBP optimisation Gauteng, Google Maps listing Johannesburg',
    parentService: 'SEO & Marketing',
    parentUrl: '../../seo-marketing/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '✅', title: 'Full Profile Setup', desc: 'Complete profile creation: categories, service areas, hours, photos, and descriptions.' },
      { icon: '📸', title: 'Professional Photo Strategy', desc: 'Guidance on the right photos and regular uploads to maximise profile engagement.' },
      { icon: '📝', title: 'Weekly GBP Posts', desc: 'Regular Google Posts keep your profile active and signal freshness to Google\'s algorithm.' },
      { icon: '⭐', title: 'Review Management', desc: 'We monitor, respond to reviews, and implement strategies to generate more 5-star ratings.' },
      { icon: '📊', title: 'Insights & Analytics', desc: 'Monthly reports on profile views, calls, direction requests, and website clicks.' },
      { icon: '🔧', title: 'Duplicate Listing Removal', desc: 'We identify and remove duplicate or incorrect listings that hurt your rankings.' },
    ],
    process: ['Profile Audit', 'Category & Description Optimisation', 'Photo Upload Strategy', 'Post Scheduling', 'Review Response System', 'Monthly Reporting'],
    faq: [
      { q: 'Is Google Business Profile really free?', a: 'Yes — the profile itself is free. Our management service ensures it\'s optimised and actively maintained to maximise its impact.' },
      { q: 'How much can GBP improve my business?', a: 'Well-optimised GBP profiles typically see 3–5× more calls and website visits than unmanaged profiles.' },
      { q: 'Do you handle fake negative reviews?', a: 'Yes — we flag and report fake or malicious reviews to Google for removal, and advise on the review dispute process.' },
      { q: 'Can you manage multiple GBP locations?', a: 'Absolutely. We manage multi-location profiles for chains, franchises, and businesses with multiple service areas.' },
    ],
    schema: 'Google Business Profile Management',
    formService: 'Google Business Profile Setup',
    stat1: '3–5×', stat1Label: 'More Profile Views',
    stat2: '100%', stat2Label: 'Profile Completion',
    stat3: 'Free', stat3Label: 'Tool, Expert Managed',
  },
  // ── VEHICLE BRANDING ──────────────────────────────────────
  {
    folder: 'vehicle-branding/full-wraps',
    title: 'Full Vehicle Wraps Johannesburg | Car & Van Wrapping | Toran Digital',
    h1: 'Full Vehicle Wraps That <span class="highlight-word">Turn Heads</span>',
    desc: 'Premium full vehicle wraps in Johannesburg. Transform your car, van, or bakkie into a rolling billboard that generates leads 24/7.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="8" y="36" width="64" height="20" rx="4" fill="url(#fwg)" opacity="0.9"/><path d="M16 36 C16 36 22 20 32 20 L52 20 C58 20 64 30 64 36" fill="url(#fwg2)" opacity="0.9"/><rect x="10" y="54" width="14" height="8" rx="7" fill="#22D3EE"/><rect x="56" y="54" width="14" height="8" rx="7" fill="#22D3EE"/><path d="M8 44 L72 44" stroke="rgba(255,255,255,0.3)" stroke-width="1"/><defs><linearGradient id="fwg" x1="8" y1="36" x2="72" y2="56" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#0E7490"/></linearGradient><linearGradient id="fwg2" x1="16" y1="20" x2="64" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#1E4D8C"/><stop offset="1" stop-color="#0E7490"/></linearGradient></defs></svg>`,
    badge: 'Premium Wrap Specialists',
    canonical: 'https://torandigital.co.za/vehicle-branding/full-wraps/',
    ogTitle: 'Full Vehicle Wraps Johannesburg | Toran Digital',
    ogDesc: 'Premium full vehicle wrapping in Johannesburg. Cars, vans, bakkies, and fleets. Design, print, and install all in one place.',
    keywords: 'full vehicle wrap Johannesburg, car wrapping Gauteng, van wrap South Africa, vehicle wrap company Johannesburg',
    parentService: 'Vehicle Branding',
    parentUrl: '../../vehicle-branding/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '🎨', title: 'Custom Wrap Design', desc: 'Our designers create stunning wrap artwork that fits your vehicle\'s exact dimensions.' },
      { icon: '📄', title: 'Premium Vinyl Printing', desc: 'We use 3M and Avery cast vinyl — resistant to SA heat, UV, and rain.' }, // Using document icon to represent printing vinyl
      { icon: '🔧', title: 'Professional Installation', desc: 'Certified installers who ensure bubble-free, perfectly aligned wraps every time.' },
      { icon: '🚗', title: 'All Vehicle Types', desc: 'Cars, SUVs, bakkies, vans, trucks, motorcycles, and trailers.' },
      { icon: '🛡️', title: 'Removable & Paint-Safe', desc: 'Quality wraps protect your original paintwork and remove cleanly.' },
      { icon: '🌞', title: 'UV & Heat Resistant', desc: 'Wraps designed to withstand the South African sun without fading or peeling.' },
    ],
    process: ['Consultation & Measurement', 'Concept Design', 'Design Approval', 'Vinyl Print Production', 'Professional Installation', 'Final Inspection'],
    faq: [
      { q: 'How long does a full wrap last?', a: 'Quality cast vinyl wraps last 5–7 years with proper care. We use 3M and Avery materials with manufacturer warranties.' },
      { q: 'Does wrapping damage my paint?', a: 'No — quality vinyl actually protects your paint from UV and minor scratches. When removed professionally, paint is left untouched.' },
      { q: 'How much does a full car wrap cost?', a: 'Full car wraps start from R8,000–R18,000 depending on vehicle size and design complexity. Vans and trucks are quoted separately.' },
      { q: 'How long does installation take?', a: 'Most passenger vehicles take 2–3 days. Larger vehicles like vans or trucks may take 3–5 days. We keep you updated throughout.' },
    ],
    schema: 'Full Vehicle Wrap Service',
    formService: 'Full Vehicle Wrap',
    stat1: '500+', stat1Label: 'Vehicles Wrapped',
    stat2: '5–7', stat2Label: 'Year Lifespan',
    stat3: '3M', stat3Label: 'Premium Vinyl Used',
  },
  {
    folder: 'vehicle-branding/fleet-wrapping',
    title: 'Fleet Vehicle Wrapping Johannesburg | Corporate Fleet Branding | Toran Digital',
    h1: 'Fleet Branding That <span class="highlight-word">Builds Your Brand Everywhere</span>',
    desc: 'Consistent, professional fleet wrapping for businesses across Johannesburg. Turn every vehicle in your fleet into a branded marketing machine.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="4" y="42" width="40" height="16" rx="3" fill="url(#fla)" opacity="0.9"/><path d="M10 42 C10 42 14 30 20 30 L34 30 C38 30 44 36 44 42" fill="url(#fla)" opacity="0.8"/><rect x="6" y="56" width="10" height="6" rx="5" fill="#22D3EE"/><rect x="34" y="56" width="10" height="6" rx="5" fill="#22D3EE"/><rect x="36" y="50" width="40" height="16" rx="3" fill="url(#flb)" opacity="0.9"/><path d="M42 50 C42 50 46 38 52 38 L66 38 C70 38 76 44 76 50" fill="url(#flb)" opacity="0.8"/><rect x="38" y="64" width="10" height="6" rx="5" fill="#F59E0B"/><rect x="66" y="64" width="10" height="6" rx="5" fill="#F59E0B"/><defs><linearGradient id="fla" x1="4" y1="30" x2="44" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#0E7490"/></linearGradient><linearGradient id="flb" x1="36" y1="38" x2="76" y2="70" gradientUnits="userSpaceOnUse"><stop stop-color="#1C1917"/><stop offset="1" stop-color="#0F3A6E"/></linearGradient></defs></svg>`,
    badge: 'Corporate Fleet Branding',
    canonical: 'https://torandigital.co.za/vehicle-branding/fleet-wrapping/',
    ogTitle: 'Fleet Vehicle Wrapping Johannesburg | Toran Digital',
    ogDesc: 'Professional fleet branding and wrapping in Johannesburg. Consistent corporate identity across your entire vehicle fleet.',
    keywords: 'fleet vehicle wrapping Johannesburg, corporate fleet branding South Africa, fleet wrap Gauteng, company vehicle branding Johannesburg',
    parentService: 'Vehicle Branding',
    parentUrl: '../../vehicle-branding/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '🚛', title: 'Any Fleet Size', desc: 'From 2-vehicle SME fleets to 100+ vehicle corporate rollouts. We scale with you.' },
      { icon: '🎨', title: 'Brand Consistency', desc: 'Pixel-perfect brand consistency across every vehicle — every colour, every logo, every detail.' },
      { icon: '📅', title: 'Phased Rollouts', desc: 'We work around your operational schedule so vehicles aren\'t all off the road at once.' },
      { icon: '💰', title: 'Fleet Pricing', desc: 'Significant cost savings on volume — the more vehicles, the better the per-unit price.' },
      { icon: '🔄', title: 'Re-branding Service', desc: 'Rebranding your company? We remove old wraps and apply new ones without damaging vehicles.' },
      { icon: '📋', title: 'Fleet Management Documentation', desc: 'We document every vehicle wrap for your records — photos, specifications, and warranties.' },
    ],
    process: ['Fleet Assessment', 'Brand Audit & Design', 'Prototype Wrap Approval', 'Production Run', 'Phased Installation', 'Fleet Documentation'],
    faq: [
      { q: 'What\'s the minimum fleet size for fleet pricing?', a: 'Fleet pricing kicks in from 3+ vehicles. The savings increase significantly at 10+ vehicles.' },
      { q: 'Can you wrap different vehicle types in the same fleet?', a: 'Yes — we produce artwork optimised for each vehicle model, ensuring your brand looks consistent across cars, vans, and trucks.' },
      { q: 'Do you offer a service agreement?', a: 'Yes — we offer annual fleet maintenance agreements covering damage repair, touch-ups, and periodic inspections.' },
      { q: 'How do you ensure brand consistency across vehicles?', a: 'We use brand-matched Pantone colours in our vinyl printing and QC-check every installation before sign-off.' },
    ],
    schema: 'Fleet Vehicle Wrapping',
    formService: 'Fleet Vehicle Wrapping',
    stat1: '50+', stat1Label: 'Fleets Branded',
    stat2: '100+', stat2Label: 'Vehicles/Fleet Max',
    stat3: '20%', stat3Label: 'Avg. Volume Saving',
  },
  {
    folder: 'vehicle-branding/bakkie-branding',
    title: 'Bakkie Branding Johannesburg | Bakkie & Van Signage | Toran Digital',
    h1: 'Bakkie Branding That <span class="highlight-word">Gets You Noticed</span>',
    desc: 'Affordable, high-impact bakkie and van branding in Johannesburg. From magnetic signs to full wraps — make your bakkie your best salesperson.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="6" y="40" width="68" height="20" rx="3" fill="url(#bkg)" opacity="0.9"/><rect x="6" y="28" width="36" height="14" rx="3" fill="url(#bkg2)" opacity="0.9"/><rect x="42" y="34" width="30" height="8" rx="2" fill="url(#bkg)" opacity="0.7"/><rect x="8" y="58" width="16" height="8" rx="7" fill="#22D3EE"/><rect x="56" y="58" width="16" height="8" rx="7" fill="#22D3EE"/><defs><linearGradient id="bkg" x1="6" y1="28" x2="74" y2="66" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#0E7490"/></linearGradient><linearGradient id="bkg2" x1="6" y1="28" x2="42" y2="42" gradientUnits="userSpaceOnUse"><stop stop-color="#1E4D8C"/><stop offset="1" stop-color="#0891B2"/></linearGradient></defs></svg>`,
    badge: 'Bakkie Branding Experts',
    canonical: 'https://torandigital.co.za/vehicle-branding/bakkie-branding/',
    ogTitle: 'Bakkie Branding Johannesburg | Van Signage | Toran Digital',
    ogDesc: 'Professional bakkie and van branding in Johannesburg. Magnetic signs, vinyl wraps, and full bakkie branding at great prices.',
    keywords: 'bakkie branding Johannesburg, van signage South Africa, bakkie wrap Gauteng, vehicle signage Johannesburg, bakkie lettering',
    parentService: 'Vehicle Branding',
    parentUrl: '../../vehicle-branding/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '🔧', title: 'Vinyl Cut Lettering', desc: 'Precision-cut vinyl lettering — the affordable, professional way to brand any bakkie.' },
      { icon: '🧲', title: 'Magnetic Signs', desc: 'Removable magnetic signs for bakkies used for both business and personal use.' },
      { icon: '🎨', title: 'Partial & Full Wraps', desc: 'From bonnet and door graphics to full bakkie wraps — we cover every option.' },
      { icon: '📱', title: 'Contact Details & QR Codes', desc: 'Make it easy for people to call or WhatsApp you directly from your bakkie.' },
      { icon: '🌞', title: 'Weatherproof Materials', desc: 'UV-resistant, waterproof vinyl that handles the SA sun and Highveld storms.' },
      { icon: '⚡', title: 'Quick Turnaround', desc: 'Most bakkie branding jobs completed within 3–5 business days from design approval.' },
    ],
    process: ['Brief & Design', 'Design Approval', 'Vinyl Production', 'Bakkie Preparation', 'Application & Install', 'Collection & QC Check'],
    faq: [
      { q: 'What\'s the cost of bakkie branding?', a: 'Basic vinyl lettering starts from R1,500. Partial wraps from R4,000 and full bakkie wraps from R8,000 depending on size.' },
      { q: 'What\'s the difference between magnetic signs and vinyl?', a: 'Magnetic signs are removable and ideal if you use your bakkie privately too. Vinyl is permanent, more professional-looking, and more durable.' },
      { q: 'How long does bakkie branding last?', a: 'Quality vinyl lettering lasts 3–5 years. Premium cast vinyl wraps last 5–7 years with proper care.' },
      { q: 'Can you brand my bakkie if it\'s already been sprayed?', a: 'Yes — vinyl adheres to any smooth, painted surface. We prep the surface before application for best adhesion.' },
    ],
    schema: 'Bakkie Vehicle Branding',
    formService: 'Bakkie Branding',
    stat1: 'R1.5K', stat1Label: 'Starting Price',
    stat2: '3–5', stat2Label: 'Days Turnaround',
    stat3: '5yr+', stat3Label: 'Vinyl Lifespan',
  },
  // ── DSTV ──────────────────────────────────────────────────
  {
    folder: 'dstv-installations/dstv',
    title: 'DSTV Installation Johannesburg | Expert Installers | Toran Digital',
    h1: 'DSTV Installations <span class="highlight-word">Done Right, First Time</span>',
    desc: 'Professional DSTV installation services in Johannesburg. New installations, signal fixes, extra views, and dish relocations — fast and guaranteed.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="30" cy="52" rx="22" ry="4" fill="url(#dg2)" opacity="0.5"/><path d="M16 46 C16 30 28 18 42 22" stroke="url(#dg)" stroke-width="12" stroke-linecap="round" fill="none"/><circle cx="42" cy="22" r="4" fill="#F59E0B"/><path d="M42 22 L52 36" stroke="#22D3EE" stroke-width="2" stroke-dasharray="3 2"/><rect x="48" y="34" width="18" height="12" rx="2" fill="url(#dg3)"/><defs><linearGradient id="dg" x1="16" y1="46" x2="42" y2="18" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#22D3EE"/></linearGradient><linearGradient id="dg2" x1="8" y1="52" x2="52" y2="52" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57" stop-opacity="0"/><stop offset="0.5" stop-color="#0E7490"/><stop offset="1" stop-color="#0C2D57" stop-opacity="0"/></linearGradient><linearGradient id="dg3" x1="48" y1="34" x2="66" y2="46" gradientUnits="userSpaceOnUse"><stop stop-color="#1E4D8C"/><stop offset="1" stop-color="#0E7490"/></linearGradient></defs></svg>`,
    badge: 'Accredited DSTV Installers',
    canonical: 'https://torandigital.co.za/dstv-installations/dstv/',
    ogTitle: 'DSTV Installation Johannesburg | Toran Digital',
    ogDesc: 'Professional DSTV installation in Johannesburg. New installs, extra views, signal fixes, and dish relocations. Guaranteed work.',
    keywords: 'DSTV installation Johannesburg, DSTV installer Gauteng, DSTV signal problems South Africa, DSTV extra view installation Johannesburg',
    parentService: 'DSTV & Installations',
    parentUrl: '../../dstv-installations/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '📡', title: 'New DSTV Installations', desc: 'Full setup from dish mounting to decoder connection, tested and working before we leave.' },
      { icon: '📺', title: 'Extra View Setup', desc: 'Watch different channels on multiple TVs simultaneously with proper Extra View configuration.' },
      { icon: '🔧', title: 'Signal & Reception Fixes', desc: 'Diagnose and fix weak signal, E48-32 errors, and other DSTV signal issues quickly.' },
      { icon: '🏠', title: 'Dish Relocation', desc: 'Safely relocate and realign your DSTV dish when you move or renovate.' },
      { icon: '📡', title: 'Explora & Smart Installations', desc: 'Expert setup of DSTV Explora, Streama, and Smart Open View decoders.' },
      { icon: '⚡', title: 'Same-Day Service Available', desc: 'We offer same-day DSTV installation in most areas of Johannesburg.' },
    ],
    process: ['Book Appointment', 'Site Assessment', 'Dish Mounting & Alignment', 'Decoder & TV Setup', 'Signal Testing', 'Sign-Off & Warranty'],
    faq: [
      { q: 'How much does DSTV installation cost?', a: 'Basic installation starts from R600–R900. Extra view setups and complex installations are quoted on-site. No hidden costs.' },
      { q: 'Do you fix the E48-32 error?', a: 'Yes — this is one of the most common DSTV issues we fix. We diagnose and resolve signal problems on the same visit.' },
      { q: 'Do you come on weekends?', a: 'Yes — we offer Saturday and Sunday installation appointments across Johannesburg at no extra charge.' },
      { q: 'What areas of Johannesburg do you cover?', a: 'We cover all of Johannesburg, Benoni, Boksburg, Bedfordview, Germiston, Edenvale, Sandton, Randburg, and surrounding areas.' },
    ],
    schema: 'DSTV Installation Service',
    formService: 'DSTV Installation',
    stat1: 'R600', stat1Label: 'Starting Price',
    stat2: 'Same', stat2Label: 'Day Available',
    stat3: '12mo', stat3Label: 'Workmanship Warranty',
  },
  {
    folder: 'dstv-installations/cctv',
    title: 'CCTV Installation Johannesburg | Security Camera Systems | Toran Digital',
    h1: 'CCTV Security Cameras <span class="highlight-word">That Actually Work</span>',
    desc: 'Professional CCTV camera installation in Johannesburg. Protect your home or business with HD surveillance systems, monitored remotely on your phone.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="10" y="28" width="36" height="24" rx="5" fill="url(#ccg)" opacity="0.9"/><path d="M46 34 L66 26 L66 54 L46 46Z" fill="url(#ccg2)" opacity="0.9"/><circle cx="28" cy="40" r="6" stroke="#22D3EE" stroke-width="2" fill="rgba(34,211,238,0.2)"/><circle cx="28" cy="40" r="2" fill="#22D3EE"/><defs><linearGradient id="ccg" x1="10" y1="28" x2="46" y2="52" gradientUnits="userSpaceOnUse"><stop stop-color="#071A2F"/><stop offset="1" stop-color="#0C2D57"/></linearGradient><linearGradient id="ccg2" x1="46" y1="26" x2="66" y2="54" gradientUnits="userSpaceOnUse"><stop stop-color="#0F3A6E"/><stop offset="1" stop-color="#0E7490"/></linearGradient></defs></svg>`,
    badge: 'Security Camera Specialists',
    canonical: 'https://torandigital.co.za/dstv-installations/cctv/',
    ogTitle: 'CCTV Installation Johannesburg | Toran Digital',
    ogDesc: 'Professional CCTV camera installation in Johannesburg. HD systems with remote viewing on your smartphone.',
    keywords: 'CCTV installation Johannesburg, security camera installation Gauteng, surveillance camera South Africa, CCTV camera company Johannesburg',
    parentService: 'DSTV & Installations',
    parentUrl: '../../dstv-installations/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '📹', title: 'HD & 4K Cameras', desc: 'Crystal-clear footage with 2MP, 4MP, and 4K camera options for every budget.' },
      { icon: '📱', title: 'Remote Mobile Viewing', desc: 'Watch live and recorded footage on your phone from anywhere in the world.' },
      { icon: '🌙', title: 'Night Vision', desc: 'Full-colour night vision and IR cameras keep you protected around the clock.' },
      { icon: '💾', title: 'NVR & DVR Recording', desc: 'Professional recording units with days or weeks of footage stored locally.' },
      { icon: '🏠', title: 'Indoor & Outdoor', desc: 'IP66-rated outdoor cameras and discreet indoor cameras for complete coverage.' },
      { icon: '🔔', title: 'Motion Detection Alerts', desc: 'Get instant alerts on your phone when cameras detect motion on your property.' },
    ],
    process: ['Site Assessment', 'Camera Positioning Plan', 'Cable Routing & Installation', 'NVR/DVR Setup', 'Remote App Configuration', 'Training & Handover'],
    faq: [
      { q: 'How many cameras do I need?', a: 'We assess your property and recommend the minimum effective number. Most homes need 4–8 cameras; businesses often need more.' },
      { q: 'Can I see cameras on my phone?', a: 'Yes — all our systems connect to a free app (Hik-Connect, XMEye, or similar) for live viewing and playback on iOS and Android.' },
      { q: 'Do cameras work during load shedding?', a: 'We can install UPS backup units to keep cameras and recorders running during power cuts.' },
      { q: 'What\'s the cost of a CCTV system?', a: 'A basic 4-camera system starts from R5,000 installed. We provide a detailed quote after the site assessment.' },
    ],
    schema: 'CCTV Security Camera Installation',
    formService: 'CCTV Camera Installation',
    stat1: 'R5K', stat1Label: 'Entry System',
    stat2: '4K', stat2Label: 'Max Resolution',
    stat3: '24/7', stat3Label: 'Recording',
  },
  {
    folder: 'dstv-installations/tv-mounting',
    title: 'TV Mounting Service Johannesburg | Wall Mount Installation | Toran Digital',
    h1: 'TV Mounting That Looks <span class="highlight-word">Like a Magazine Cover</span>',
    desc: 'Professional TV wall mounting and home audio installation in Johannesburg. Clean cable management, perfect height, done in 2 hours.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="12" y="18" width="56" height="36" rx="4" fill="url(#tvg)" stroke="#22D3EE" stroke-width="1.5"/><rect x="16" y="22" width="48" height="28" rx="2" fill="rgba(6,182,212,0.12)"/><path d="M40 54 L40 62" stroke="#94A3B8" stroke-width="2"/><rect x="28" y="62" width="24" height="4" rx="2" fill="#334155"/><circle cx="62" cy="22" r="3" fill="#F59E0B"/><defs><linearGradient id="tvg" x1="12" y1="18" x2="68" y2="54" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#1E293B"/></linearGradient></defs></svg>`,
    badge: 'Home Tech Installers',
    canonical: 'https://torandigital.co.za/dstv-installations/tv-mounting/',
    ogTitle: 'TV Mounting Service Johannesburg | Toran Digital',
    ogDesc: 'Professional TV wall mounting and cable management in Johannesburg. All wall types, any TV size, done right.',
    keywords: 'TV mounting Johannesburg, TV wall mount installation Gauteng, TV installation service South Africa, TV bracket installation Johannesburg',
    parentService: 'DSTV & Installations',
    parentUrl: '../../dstv-installations/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '📏', title: 'All Wall Types', desc: 'Brick, drywall, plaster, and concrete. We use the right anchors and fittings for every wall type.' },
      { icon: '📺', title: 'Any TV Size', desc: 'From 32" to 85" TVs — fixed, tilt, full-motion, and ceiling mount brackets available.' },
      { icon: '🔌', title: 'Cable Concealment', desc: 'Cables routed inside walls or through neat conduits — no visible cables hanging down.' },
      { icon: '🔊', title: 'Soundbar & Audio', desc: 'Soundbar mounting, surround sound system setup, and home theatre audio installation.' },
      { icon: '📡', title: 'Combined DSTV & Mount', desc: 'Book TV mounting and DSTV installation together and save on the call-out fee.' },
      { icon: '⚡', title: 'Fast 2-Hour Service', desc: 'Most TV mounting jobs are completed within 2 hours. Minimal disruption to your home.' },
    ],
    process: ['Booking & Confirmation', 'Wall & Stud Assessment', 'Bracket Installation', 'TV Mounting', 'Cable Management', 'Picture Height & Testing'],
    faq: [
      { q: 'What\'s included in TV mounting?', a: 'We mount the TV, install the bracket, manage cables neatly, connect DSTV/sound systems, and test everything before leaving.' },
      { q: 'Do you supply the TV bracket?', a: 'We can supply quality TV brackets (R350–R1,200 depending on type) or use your own bracket. Just let us know when booking.' },
      { q: 'Can you mount on a drywall partition?', a: 'Yes — we use toggle bolts and specialist anchors designed for drywall. We assess load capacity before proceeding.' },
      { q: 'How much does TV mounting cost?', a: 'Standard TV mounting starts from R650. Cable concealment inside walls costs extra and depends on wall length.' },
    ],
    schema: 'TV Wall Mounting Service',
    formService: 'TV Mounting Service',
    stat1: 'R650', stat1Label: 'Starting Price',
    stat2: '2hrs', stat2Label: 'Most Jobs Done In',
    stat3: '85"', stat3Label: 'Max TV Size',
  },
  // ── GRAPHIC DESIGN ────────────────────────────────────────
  {
    folder: 'graphic-design/corporate-identity',
    title: 'Corporate Identity Design Johannesburg | Brand Identity | Toran Digital',
    h1: 'Corporate Identity That <span class="highlight-word">Commands Respect</span>',
    desc: 'Complete corporate identity design in Johannesburg. Logo, brand guidelines, stationery, and everything your business needs to look like a market leader.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="16" y="16" width="20" height="20" rx="4" fill="url(#cig)"/><rect x="44" y="16" width="20" height="20" rx="4" fill="url(#cig2)"/><rect x="16" y="44" width="20" height="20" rx="4" fill="url(#cig2)"/><rect x="44" y="44" width="20" height="20" rx="4" fill="url(#cig3)"/><defs><linearGradient id="cig" x1="16" y1="16" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#1E4D8C"/></linearGradient><linearGradient id="cig2" x1="44" y1="16" x2="64" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#0E7490"/><stop offset="1" stop-color="#22D3EE"/></linearGradient><linearGradient id="cig3" x1="44" y1="44" x2="64" y2="64" gradientUnits="userSpaceOnUse"><stop stop-color="#D97706"/><stop offset="1" stop-color="#F59E0B"/></linearGradient></defs></svg>`,
    badge: 'Brand Identity Specialists',
    canonical: 'https://torandigital.co.za/graphic-design/corporate-identity/',
    ogTitle: 'Corporate Identity Design Johannesburg | Toran Digital',
    ogDesc: 'Complete corporate identity and brand design in Johannesburg. Logo, guidelines, stationery, and brand collateral.',
    keywords: 'corporate identity design Johannesburg, brand identity South Africa, logo and brand design Gauteng, corporate branding Johannesburg',
    parentService: 'Graphic Design',
    parentUrl: '../../graphic-design/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '🎨', title: 'Logo Design', desc: 'Multiple unique logo concepts designed from scratch — not templates. Yours exclusively.' },
      { icon: '📘', title: 'Brand Guidelines', desc: 'A comprehensive brand guide covering colours, typography, logo usage, and tone of voice.' },
      { icon: '🃏', title: 'Business Cards', desc: 'Professionally designed business cards — standard, luxe, folded, or rounded corners.' },
      { icon: '📄', title: 'Letterheads & Email Signatures', desc: 'Consistent, branded stationery that looks professional in every communication.' },
      { icon: '📁', title: 'Presentation Templates', desc: 'PowerPoint and Google Slides templates that match your brand for any pitch.' },
      { icon: '🏷️', title: 'Brand Collateral', desc: 'Brochures, flyers, email templates, and social media kit — all perfectly on-brand.' },
    ],
    process: ['Brand Discovery Session', 'Competitor & Market Research', 'Logo Concept Development', 'Refinement & Approval', 'Brand Guidelines Creation', 'File Delivery'],
    faq: [
      { q: 'What files will I receive?', a: 'You receive all formats: AI, EPS, SVG, PDF, PNG, and JPG — for print, digital, embroidery, and any future use.' },
      { q: 'How many logo concepts do you provide?', a: 'We provide 3 unique logo directions. After selecting one, you get 3 rounds of refinements included.' },
      { q: 'Do you register trademarks?', a: 'We design logos and can advise on trademark registration, but trademark filing itself is handled by attorneys.' },
      { q: 'Can you redesign an existing brand?', a: 'Yes — brand refreshes and full rebrands are a core service. We preserve what works and modernise what doesn\'t.' },
    ],
    schema: 'Corporate Identity Design',
    formService: 'Corporate Identity Design',
    stat1: '3', stat1Label: 'Logo Concepts',
    stat2: '7d', stat2Label: 'First Concepts',
    stat3: '100%', stat3Label: 'Original Design',
  },
  {
    folder: 'graphic-design/logo-design',
    title: 'Logo Design Johannesburg | Professional Logo Designers | Toran Digital',
    h1: 'Logos That <span class="highlight-word">Tell Your Story</span>',
    desc: 'Professional logo design in Johannesburg. We create unique, memorable logos that represent your brand — not generic templates from the internet.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><polygon points="40,10 70,60 10,60" fill="url(#ldg)" opacity="0.85" stroke="#22D3EE" stroke-width="1.5"/><polygon points="40,24 58,52 22,52" fill="url(#ldg2)" opacity="0.7"/><circle cx="40" cy="42" r="5" fill="#F59E0B"/><defs><linearGradient id="ldg" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse"><stop stop-color="#0C2D57"/><stop offset="1" stop-color="#0E7490"/></linearGradient><linearGradient id="ldg2" x1="22" y1="24" x2="58" y2="60" gradientUnits="userSpaceOnUse"><stop stop-color="#1E4D8C" stop-opacity="0"/><stop offset="1" stop-color="#22D3EE" stop-opacity="0.5"/></linearGradient></defs></svg>`,
    badge: 'Professional Logo Designers',
    canonical: 'https://torandigital.co.za/graphic-design/logo-design/',
    ogTitle: 'Logo Design Johannesburg | Professional Designers | Toran Digital',
    ogDesc: 'Professional logo design in Johannesburg. Unique logos that represent your brand. All file formats included.',
    keywords: 'logo design Johannesburg, professional logo designer South Africa, logo designer Gauteng, affordable logo design Johannesburg',
    parentService: 'Graphic Design',
    parentUrl: '../../graphic-design/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '✏️', title: 'Fully Custom Design', desc: 'Every logo is designed from scratch based on your brand values, not resold templates.' },
      { icon: '🖼️', title: 'Multiple Concepts', desc: 'We present 3 distinct logo directions for you to choose from and refine.' },
      { icon: '🎨', title: 'Colour Psychology', desc: 'Colours chosen based on your industry, target audience, and brand personality.' },
      { icon: '📐', title: 'Scalable Vector Files', desc: 'Logos that look perfect on a business card, a billboard, or an embroidered shirt.' },
      { icon: '🌗', title: 'Light & Dark Variations', desc: 'Full and icon logos, horizontal and stacked, on light and dark backgrounds.' },
      { icon: '📦', title: 'Complete File Package', desc: 'AI, EPS, SVG, PDF, PNG, JPG — every format you\'ll ever need.' },
    ],
    process: ['Brand Brief & Discovery', 'Market & Competitor Research', 'Concept Sketches', '3 Digital Logo Concepts', 'Refinement Rounds', 'Final File Delivery'],
    faq: [
      { q: 'How much does a logo cost?', a: 'Logo packages start from R2,500 for a basic logo with 3 concepts. Brand identity packages including guidelines and stationery are quoted separately.' },
      { q: 'How long does logo design take?', a: 'First concepts are delivered within 5–7 business days. Final delivery after approvals typically takes 2–3 weeks total.' },
      { q: 'Can I use my logo on merchandise?', a: 'Yes — you receive full commercial usage rights and vector files suitable for embroidery, screen printing, and signage.' },
      { q: 'What if I don\'t like any of the concepts?', a: 'We offer a free redesign round if none of the initial concepts align with your vision. We don\'t stop until you\'re happy.' },
    ],
    schema: 'Logo Design Service',
    formService: 'Logo Design',
    stat1: 'R2.5K', stat1Label: 'Starting Price',
    stat2: '3', stat2Label: 'Unique Concepts',
    stat3: '100%', stat3Label: 'Yours to Keep',
  },
  {
    folder: 'graphic-design/signage',
    title: 'Signage Design & Printing Johannesburg | Outdoor Signs | Toran Digital',
    h1: 'Business Signage That <span class="highlight-word">Stops People in Their Tracks</span>',
    desc: 'Professional signage design, printing, and installation in Johannesburg. Shop fronts, outdoor banners, billboards, and office signage that gets noticed.',
    heroIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="10" y="18" width="60" height="32" rx="5" fill="url(#sng)" stroke="#22D3EE" stroke-width="1.5"/><path d="M40 50 L40 64" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/><rect x="28" y="62" width="24" height="4" rx="2" fill="#334155"/><path d="M20 30 L36 30" stroke="#22D3EE" stroke-width="2" stroke-linecap="round"/><path d="M20 38 L50 38" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/><circle cx="58" cy="34" r="8" fill="url(#sng2)"/><path d="M55 34 L57 37 L62 31" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="sng" x1="10" y1="18" x2="70" y2="50" gradientUnits="userSpaceOnUse"><stop stop-color="#071A2F"/><stop offset="1" stop-color="#0C2D57"/></linearGradient><linearGradient id="sng2" x1="50" y1="26" x2="66" y2="42" gradientUnits="userSpaceOnUse"><stop stop-color="#059669"/><stop offset="1" stop-color="#10B981"/></linearGradient></defs></svg>`,
    badge: 'Signage Design & Print',
    canonical: 'https://torandigital.co.za/graphic-design/signage/',
    ogTitle: 'Business Signage Design Johannesburg | Toran Digital',
    ogDesc: 'Professional signage design, printing, and installation in Johannesburg. Shop fronts, outdoor signs, and corporate signage.',
    keywords: 'signage design Johannesburg, outdoor sign company South Africa, business signage Gauteng, shop front sign Johannesburg, banner printing Johannesburg',
    parentService: 'Graphic Design',
    parentUrl: '../../graphic-design/',
    cssDepth: '../../index.css',
    jsDepth: '../../index.js',
    logoDepth: '../../logo/Gemini_Generated_Image_.png',
    navPrefix: '../../',
    features: [
      { icon: '🏪', title: 'Shop Front Signs', desc: 'Eye-catching illuminated and non-illuminated shopfront signs that attract foot traffic.' },
      { icon: '🖼️', title: 'Pull-Up Banners', desc: 'High-quality pull-up banners for exhibitions, events, and reception areas.' },
      { icon: '🏢', title: 'Office Signage', desc: 'Reception signs, directional signage, and branded office environments.' },
      { icon: '🌞', title: 'Outdoor Advertising', desc: 'Billboards, roadside banners, and large-format outdoor advertising design.' }, // replaced cityscape with sun as proxy for outdoor
      { icon: '💡', title: 'LED & Illuminated Signs', desc: 'Backlit and LED channel letter signs that look stunning day and night.' },
      { icon: '📄', title: 'Design & Print Together', desc: 'We design and print in-house — no middleman delays or miscommunication.' }, // replaced printer with page
    ],
    process: ['Site Visit & Brief', 'Signage Design Concepts', 'Material & Size Selection', 'Design Approval', 'Print Production', 'Installation & Handover'],
    faq: [
      { q: 'Do you do design and printing?', a: 'Yes — we handle the full process in-house from design to print and installation. No need to coordinate multiple suppliers.' },
      { q: 'How durable are your outdoor signs?', a: 'We use UV-resistant materials and weatherproof substrates designed for South African weather conditions.' },
      { q: 'Do you install the signage?', a: 'Yes — our team handles installation for shopfronts, outdoor signs, and office signage. Pull-up banners are self-install.' },
      { q: 'How much does business signage cost?', a: 'Pull-up banners from R650. Shopfront signs are quoted based on size and material. We provide a free quote after your brief.' },
    ],
    schema: 'Business Signage Design and Printing',
    formService: 'Business Signage Design',
    stat1: 'R650', stat1Label: 'Banner Starting',
    stat2: '5d', stat2Label: 'Avg. Print Turnaround',
    stat3: 'UV', stat3Label: 'Weather Resistant',
  },
];

// ============================================================
// NAV & FOOTER (unchanged, truncated for clarity in this snippet)
// ============================================================
function buildNav(p) {
  const n = p.navPrefix;
  return `
  <header class="site-header" id="header">
    <div class="container">
      <div class="header-inner">
        <a href="${n}" class="logo" aria-label="Toran Digital Home">
          <img src="${p.logoDepth}" alt="Toran Digital Logo" width="44" height="44">
          <span class="logo-text">TORAN <span>DIGITAL</span></span>
        </a>
        <nav class="nav-menu" id="navMenu" aria-label="Main Navigation">
          <a href="${n}">Home</a>
          <div class="nav-dropdown">
            <button class="nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false">
              Our Services
              <svg class="chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="mega-dropdown">
              <div class="mega-dropdown-left">
                <a href="${n}web-design/" class="mega-item" data-target="mega-web">Website Design<svg class="chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></a>
                <a href="${n}mobile-apps/" class="mega-item" data-target="mega-apps">Mobile Apps<svg class="chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></a>
                <a href="${n}seo-marketing/" class="mega-item" data-target="mega-seo">SEO &amp; Google Ads<svg class="chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></a>
                <a href="${n}vehicle-branding/" class="mega-item" data-target="mega-vehicle">Vehicle Branding<svg class="chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></a>
                <a href="${n}dstv-installations/" class="mega-item" data-target="mega-dstv">DSTV &amp; Installations<svg class="chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></a>
                <a href="${n}graphic-design/" class="mega-item" data-target="mega-graphic">Graphic Design<svg class="chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></a>
              </div>
              <div class="mega-dropdown-right">
                <div class="mega-sub-panel active" id="mega-web">
                  <a href="${n}web-design/ecommerce/">Ecommerce Stores</a>
                  <a href="${n}web-design/custom-web-apps/">Custom Web Apps</a>
                  <a href="${n}web-design/wordpress/">WordPress Sites</a>
                  <a href="${n}services/" class="view-all-services">View All Web Services &rarr;</a>
                </div>
                <div class="mega-sub-panel" id="mega-apps">
                  <a href="${n}mobile-apps/ios-development/">Native iOS Development</a>
                  <a href="${n}mobile-apps/android-development/">Native Android Development</a>
                  <a href="${n}mobile-apps/cross-platform/">Cross-Platform (React/Flutter)</a>
                  <a href="${n}services/" class="view-all-services">View All App Services &rarr;</a>
                </div>
                <div class="mega-sub-panel" id="mega-seo">
                  <a href="${n}seo-marketing/local-seo/">On-Page &amp; Local SEO</a>
                  <a href="${n}seo-marketing/google-ads/">Google Ads Management</a>
                  <a href="${n}seo-marketing/google-business-profile/">Google Business Profile</a>
                  <a href="${n}services/" class="view-all-services">View All Marketing &rarr;</a>
                </div>
                <div class="mega-sub-panel" id="mega-vehicle">
                  <a href="${n}vehicle-branding/full-wraps/">Full Vehicle Wraps</a>
                  <a href="${n}vehicle-branding/fleet-wrapping/">Fleet Wrapping</a>
                  <a href="${n}vehicle-branding/bakkie-branding/">Bakkie &amp; Van Branding</a>
                  <a href="${n}services/" class="view-all-services">View All Wraps &rarr;</a>
                </div>
                <div class="mega-sub-panel" id="mega-dstv">
                  <a href="${n}dstv-installations/dstv/">DSTV Installations</a>
                  <a href="${n}dstv-installations/cctv/">CCTV Camera Setups</a>
                  <a href="${n}dstv-installations/tv-mounting/">TV Mounting &amp; Audio</a>
                  <a href="${n}services/" class="view-all-services">View All Installations &rarr;</a>
                </div>
                <div class="mega-sub-panel" id="mega-graphic">
                  <a href="${n}graphic-design/corporate-identity/">Corporate Identity</a>
                  <a href="${n}graphic-design/logo-design/">Logo &amp; Print Design</a>
                  <a href="${n}graphic-design/signage/">Outdoor &amp; Store Signage</a>
                  <a href="${n}services/" class="view-all-services">View All Graphic Services &rarr;</a>
                </div>
              </div>
            </div>
          </div>
          <a href="${n}about/">About</a>
          <a href="${n}portfolio/">Portfolio</a>
          <a href="${n}areas/">Areas</a>
          <a href="${n}blog/">Blog</a>
          <a href="${n}contact/">Contact</a>
        </nav>
        <div class="header-cta">
          <a href="https://wa.me/27696219479?text=Hi%20Toran%20Digital%2C%20I%27d%20like%20a%20free%20quote" class="btn btn-whatsapp" target="_blank" rel="noopener">
            WhatsApp Us
          </a>
          <a href="${n}contact/" class="btn btn-primary">Get a Free Quote</a>
        </div>
        <div class="hamburger" id="hamburger" aria-label="Toggle Navigation Menu"><span></span><span></span><span></span></div>
      </div>
    </div>
  </header>
  <div class="mobile-nav" id="mobileNav">
    <a href="${n}" class="mobile-nav-link">Home</a>
    <button class="mobile-nav-link mobile-services-toggle">Our Services<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="6 9 12 15 18 9"/></svg></button>
    <div class="mobile-services-list">
      <a href="${n}web-design/">Website Design</a>
      <a href="${n}mobile-apps/">Mobile Apps</a>
      <a href="${n}seo-marketing/">SEO &amp; Google Ads</a>
      <a href="${n}vehicle-branding/">Vehicle Branding</a>
      <a href="${n}dstv-installations/">DSTV Installations</a>
      <a href="${n}graphic-design/">Graphic Design</a>
      <a href="${n}services/" style="font-weight: 700; color: var(--navy-800); margin-top: 5px;">All Services &rarr;</a>
    </div>
    <a href="${n}about/" class="mobile-nav-link">About</a>
    <a href="${n}portfolio/" class="mobile-nav-link">Portfolio</a>
    <a href="${n}areas/" class="mobile-nav-link">Areas</a>
    <a href="${n}blog/" class="mobile-nav-link">Blog</a>
    <a href="${n}contact/" class="mobile-nav-link">Contact</a>
  </div>`;
}

function buildFooter(p) {
  const n = p.navPrefix;
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${n}" class="logo"><img src="${p.logoDepth}" alt="Toran Digital Logo" width="40" height="40"><span class="logo-text">TORAN <span>DIGITAL</span></span></a>
          <p>Gauteng's premier digital product studio. Web design, mobile apps, SEO, vehicle branding &amp; installations.</p>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="${n}web-design/">Website Design</a></li>
            <li><a href="${n}mobile-apps/">Mobile App Development</a></li>
            <li><a href="${n}seo-marketing/">SEO &amp; Google Ads</a></li>
            <li><a href="${n}vehicle-branding/">Vehicle Wrapping</a></li>
            <li><a href="${n}dstv-installations/">DSTV Installations</a></li>
            <li><a href="${n}graphic-design/">Graphic Design</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="${n}about/">About Us</a></li>
            <li><a href="${n}portfolio/">Portfolio</a></li>
            <li><a href="${n}services/">All Services</a></li>
            <li><a href="${n}areas/">Service Areas</a></li>
            <li><a href="${n}contact/">Contact Us</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="${n}blog/">Our Blog</a></li>
            <li><a href="${n}blog/website-cost-johannesburg/">Web Design Costs</a></li>
            <li><a href="${n}blog/seo-guide-johannesburg-businesses/">Local SEO Guide</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact Details</h4>
          <ul>
            <li><a href="tel:+27696219479">069 621 9479</a></li>
            <li><a href="mailto:sales@torandigital.co.za">sales@torandigital.co.za</a></li>
            <li><span style="color: var(--text-on-dark-muted);">14 Jordaan Street, Putfontein, Benoni, 1501</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
        <p>&copy; 2026 Toran Digital. All Rights Reserved. | <a href="${n}privacy-policy/" style="color: inherit; text-decoration: none;">Privacy Policy</a> | <a href="${n}terms/" style="color: inherit; text-decoration: none;">Terms &amp; Conditions</a></p>
        <p>Built with precision in South Africa.</p>
      </div>
    </div>
  </footer>`;
}

// ============================================================
// PAGE GENERATOR
// ============================================================
function buildPage(p) {
  const n = p.navPrefix;
  return `<!DOCTYPE html>
<html lang="en-ZA">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>${p.title}</title>
  <meta name="description" content="${p.desc}">
  <meta name="keywords" content="${p.keywords}">
  <meta name="author" content="Toran Digital">
  <link rel="canonical" href="${p.canonical}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${p.canonical}">
  <meta property="og:title" content="${p.ogTitle}">
  <meta property="og:description" content="${p.ogDesc}">
  <meta property="og:image" content="https://torandigital.co.za/logo/Gemini_Generated_Image_.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <!-- Favicons -->
  <link rel="icon" type="image/png" href="${p.logoDepth}">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"></noscript>
  <link rel="stylesheet" href="${p.cssDepth}">

  <!-- Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "${p.schema}",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Toran Digital",
      "url": "https://torandigital.co.za",
      "telephone": "+27696219479",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "14 Jordaan Street",
        "addressLocality": "Benoni",
        "addressRegion": "Gauteng",
        "postalCode": "1501",
        "addressCountry": "ZA"
      }
    },
    "areaServed": {"@type": "City", "name": "Johannesburg"},
    "url": "${p.canonical}"
  }
  </script>

  <style>
    /* ── HERO ── */
    .sub-hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 4rem;
      padding: 140px 0 80px;
      background: var(--bg-darker);
      position: relative;
      overflow: hidden;
    }
    .sub-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 70% 60% at 100% 50%, rgba(6,182,212,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 60% 60% at 0% 80%, rgba(37,99,235,0.10) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 60%);
      pointer-events: none;
    }
    /* animated grid dots */
    .sub-hero::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
    }
    .sub-hero-content { position: relative; z-index: 2; }
    .sub-hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(6,182,212,0.1);
      border: 1px solid rgba(6,182,212,0.3);
      color: var(--teal-400);
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 999px;
      margin-bottom: 1.5rem;
    }
    .sub-hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--teal-400); animation: pulse-dot 2s infinite; }
    @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
    .sub-hero h1 {
      font-family: var(--font-display);
      font-size: clamp(2.2rem, 4vw, 3.6rem);
      font-weight: 800;
      color: #fff;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      text-wrap: balance;
    }
    .highlight-word {
      background: linear-gradient(135deg, var(--teal-400), var(--amber-400));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .sub-hero p {
      font-size: var(--text-lg);
      color: var(--text-on-dark-muted);
      line-height: 1.7;
      margin-bottom: 2rem;
      max-width: 520px;
    }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
    .sub-hero-visual {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hero-icon-wrap {
      width: 320px;
      height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .hero-icon-wrap svg { width: 200px; height: 200px; filter: drop-shadow(0 0 40px rgba(6,182,212,0.3)); }
    .hero-icon-wrap::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%);
      animation: glow-pulse 3s ease-in-out infinite;
    }
    .hero-icon-wrap::after {
      content: '';
      position: absolute;
      inset: 20px;
      border-radius: 50%;
      border: 1px solid rgba(6,182,212,0.15);
      animation: spin-slow 20s linear infinite;
    }
    @keyframes glow-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.08);opacity:0.7} }
    @keyframes spin-slow { to{transform:rotate(360deg)} }
    .hero-orbit {
      position: absolute;
      inset: -10px;
      border-radius: 50%;
      border: 1px dashed rgba(245,158,11,0.2);
      animation: spin-slow 30s linear infinite reverse;
    }
    .orbit-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--amber-400);
      top: 50%;
      left: -4px;
      transform: translateY(-50%);
      box-shadow: 0 0 10px var(--amber-400);
    }

    /* ── STATS STRIP ── */
    .stats-strip {
      background: linear-gradient(135deg, var(--navy-800), var(--navy-900));
      border-top: 1px solid rgba(255,255,255,0.06);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 3rem 0;
    }
    .stats-strip .container { display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap; }
    .stat-item { text-align: center; }
    .stat-number {
      font-family: var(--font-display);
      font-size: clamp(2rem, 3vw, 3rem);
      font-weight: 800;
      background: linear-gradient(135deg, var(--teal-400), var(--amber-400));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 0.4rem;
    }
    .stat-label { font-size: 0.85rem; color: var(--text-on-dark-muted); text-transform: uppercase; letter-spacing: 0.1em; }

    /* ── FEATURES WITH SVG ICONS ── */
    .features-section {
      padding: var(--section-pad) 0;
      background: var(--bg-secondary);
      position: relative;
    }
    .features-section::before {
      content: '';
      position: absolute;
      top: 0; left: 50%; transform: translateX(-50%);
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%);
      pointer-events: none;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 3rem;
    }
    .feature-card {
      background: white;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 2.5rem 2rem;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
    }
    .feature-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-xl);
      border-color: var(--teal-400);
    }
    .feature-card::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(6,182,212,0.03) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.3s var(--ease-out);
    }
    .feature-card:hover::after { opacity: 1; }
    
    .feature-icon-box {
      width: 56px;
      height: 56px;
      background: rgba(6,182,212,0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      color: var(--teal-600);
      transition: background 0.3s ease, color 0.3s ease;
    }
    .feature-card:hover .feature-icon-box {
      background: var(--teal-500);
      color: white;
      box-shadow: 0 8px 24px rgba(6,182,212,0.3);
    }
    .feature-icon-box svg { width: 28px; height: 28px; }

    .feature-card h3 {
      font-family: var(--font-display);
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--text-heading);
      margin-bottom: 0.75rem;
    }
    .feature-card p { color: var(--text-body); font-size: 0.95rem; line-height: 1.6; }

    /* ── SPLIT CONTENT + IMAGE ── */
    .split-image-section {
      padding: var(--section-pad) 0;
      background: var(--bg-primary);
    }
    .split-image-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    .split-content h2 {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 800;
      color: var(--text-heading);
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    .split-content p {
      color: var(--text-body);
      line-height: 1.8;
      font-size: 1.05rem;
      margin-bottom: 1.5rem;
    }
    .split-bullet-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .split-bullet-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }
    .split-bullet-icon {
      color: var(--teal-500);
      flex-shrink: 0;
      margin-top: 2px;
    }
    .split-bullet-text { color: var(--text-heading); font-weight: 600; font-size: 1rem; }
    .split-image-wrapper {
      position: relative;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow-2xl);
    }
    .split-image-wrapper::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: var(--radius-xl);
      pointer-events: none;
    }
    .split-image-wrapper img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
    }
    .split-image-wrapper:hover img { transform: scale(1.03); }
    .image-accent-blob {
      position: absolute;
      width: 250px; height: 250px;
      background: var(--teal-400);
      filter: blur(80px);
      border-radius: 50%;
      opacity: 0.15;
      z-index: -1;
      top: -50px; right: -50px;
    }

    /* ── GALLERY SECTION ── */
    .gallery-section {
      padding: var(--section-pad) 0;
      background: var(--bg-secondary);
    }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 3rem;
    }
    .gallery-item {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      aspect-ratio: 4/3;
      background: var(--navy-800);
      cursor: pointer;
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .gallery-item::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(15,32,53,0.9) 0%, transparent 50%);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }
    .gallery-overlay {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      padding: 1.5rem;
      z-index: 2;
      transform: translateY(20px);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    .gallery-item:hover img { transform: scale(1.08); }
    .gallery-item:hover::before { opacity: 1; }
    .gallery-item:hover .gallery-overlay { transform: translateY(0); opacity: 1; }
    .gallery-overlay h4 { color: white; margin: 0 0 0.25rem 0; font-size: 1.1rem; }
    .gallery-overlay p { color: var(--teal-300); margin: 0; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }

    /* ── TWO COL CONTENT + STICKY FORM (Updated spacing) ── */
    .content-form-section {
      padding: var(--section-pad) 0;
      background: var(--bg-primary);
    }
    .content-form-grid {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 4rem;
      align-items: start;
    }
    .content-col h2 {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 800;
      color: var(--text-heading);
      margin-bottom: 1rem;
    }
    .content-col p { color: var(--text-body); line-height: 1.8; margin-bottom: 1.5rem; }

    .quote-form-sticky { position: sticky; top: 100px; }
    .quote-form-card {
      background: linear-gradient(135deg, var(--navy-900), var(--navy-800));
      border: 1px solid rgba(6,182,212,0.2);
      border-radius: var(--radius-xl);
      padding: 2.5rem;
      box-shadow: 0 24px 64px rgba(0,0,0,0.2);
      position: relative;
      overflow: hidden;
    }
    .quote-form-card::before {
      content: '';
      position: absolute;
      top: -40px; right: -40px;
      width: 200px; height: 200px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .quote-form-card h3 {
      font-family: var(--font-display);
      font-size: var(--text-xl);
      font-weight: 700;
      color: #fff;
      margin-bottom: 0.4rem;
    }
    .quote-form-card > p { color: var(--text-on-dark-muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
    .quote-form .form-group { margin-bottom: 1rem; }
    .quote-form input, .quote-form select, .quote-form textarea {
      width: 100%;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: var(--radius-md);
      color: #fff;
      padding: 0.875rem 1rem;
      font-family: var(--font-body);
      font-size: 0.9rem;
      transition: border-color 0.2s var(--ease-out), background 0.2s var(--ease-out), outline 0.2s var(--ease-out);
    }
    .quote-form input:focus-visible, .quote-form select:focus-visible, .quote-form textarea:focus-visible {
      border-color: var(--teal-400);
      background: rgba(6,182,212,0.08);
      outline: 2px solid var(--teal-500);
      outline-offset: 2px;
    }
    .quote-form input::placeholder, .quote-form textarea::placeholder { color: rgba(255,255,255,0.3); }
    .quote-form select option { background: var(--navy-900); }
    .quote-form textarea { min-height: 90px; resize: vertical; }
    .quote-form .btn-submit {
      width: 100%;
      background: linear-gradient(135deg, var(--teal-600), var(--teal-500));
      color: #fff;
      border: none;
      border-radius: var(--radius-md);
      padding: 1rem;
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
      box-shadow: 0 4px 20px rgba(6,182,212,0.3);
    }
    .quote-form .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(6,182,212,0.4); }
    .quote-form-trust {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: 0.8rem;
      color: var(--text-on-dark-muted);
    }

    /* ── PROCESS ── */
    .process-section {
      padding: var(--section-pad) 0;
      background: var(--navy-900);
      position: relative;
      overflow: hidden;
    }
    .process-section::before {
      content: '';
      position: absolute;
      bottom: 0; left: 50%;
      transform: translateX(-50%);
      width: 800px; height: 400px;
      background: radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%);
      pointer-events: none;
    }
    .process-steps {
      display: flex;
      gap: 0;
      margin-top: 3rem;
      position: relative;
    }
    .process-steps::before {
      content: '';
      position: absolute;
      top: 28px; left: 28px; right: 28px; height: 2px;
      background: linear-gradient(90deg, var(--teal-600), var(--amber-500));
      z-index: 0;
    }
    .process-step {
      flex: 1;
      text-align: center;
      position: relative;
      z-index: 1;
      padding: 0 1rem;
    }
    .step-num {
      width: 56px; height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--teal-700), var(--teal-500));
      color: #fff;
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      border: 3px solid var(--navy-900);
      box-shadow: 0 0 0 2px var(--teal-500), 0 8px 20px rgba(6,182,212,0.3);
      transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
    }
    .process-step:hover .step-num { transform: scale(1.15); box-shadow: 0 0 0 2px var(--teal-400), 0 12px 30px rgba(6,182,212,0.5); }
    .step-label { font-size: 0.82rem; font-weight: 600; color: var(--text-on-dark-muted); line-height: 1.4; }

    /* ── FAQ ── */
    .faq-section {
      padding: var(--section-pad) 0;
      background: var(--bg-secondary);
    }
    .faq-list { margin-top: 2.5rem; max-width: 800px; margin-left: auto; margin-right: auto; }
    .faq-item {
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      margin-bottom: 1rem;
      overflow: hidden;
      transition: border-color 0.2s var(--ease-out);
    }
    .faq-item:hover { border-color: var(--teal-400); }
    .faq-question {
      padding: 1.2rem 1.5rem;
      font-weight: 600;
      font-family: var(--font-display);
      color: var(--text-heading);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      background: white;
      transition: background 0.2s var(--ease-out);
      list-style: none;
    }
    .faq-question::-webkit-details-marker { display: none; }
    details[open] .faq-question { background: var(--slate-50); color: var(--teal-700); }
    .faq-chevron { transition: transform 0.3s var(--ease-out); flex-shrink: 0; color: var(--teal-600); }
    details[open] .faq-chevron { transform: rotate(180deg); }
    .faq-answer { padding: 0 1.5rem 1.2rem; color: var(--text-body); line-height: 1.7; background: white; }

    /* ── CTA BANNER ── */
    .sub-cta {
      padding: 6rem 0;
      background: linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .sub-cta::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.08) 0%, transparent 70%);
      pointer-events: none;
    }
    .sub-cta h2 {
      font-family: var(--font-display);
      font-size: var(--text-4xl);
      font-weight: 800;
      color: #fff;
      margin-bottom: 1rem;
      text-wrap: balance;
    }
    .sub-cta p { color: var(--text-on-dark-muted); margin-bottom: 2rem; font-size: var(--text-lg); }
    .sub-cta .hero-actions { justify-content: center; }

    /* Responsive */
    @media (max-width: 1024px) {
      .sub-hero { grid-template-columns: 1fr; text-align: center; }
      .sub-hero p { margin-left: auto; margin-right: auto; }
      .hero-actions { justify-content: center; }
      .sub-hero-visual { display: none; }
      .content-form-grid { grid-template-columns: 1fr; }
      .split-image-grid { grid-template-columns: 1fr; gap: 2rem; }
      .split-image-wrapper { order: -1; } /* Image on top on mobile */
      .quote-form-sticky { position: static; }
    }
    @media (max-width: 700px) {
      .process-steps { flex-direction: column; gap: 1.5rem; }
      .process-steps::before { display: none; }
      .stats-strip .container { gap: 2rem; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  ${buildNav(p)}

  <main id="main-content">

    <!-- ===== HERO ===== -->
    <section class="sub-hero">
      <div class="container" style="display: contents;">
        <div class="sub-hero-content reveal" style="padding-left: clamp(1.25rem, 4vw, 2.5rem);">
          <div class="sub-hero-badge">${p.badge}</div>
          <h1>${p.h1}</h1>
          <p>${p.desc}</p>
          <div class="hero-actions">
            <a href="${n}contact/" class="btn btn-primary btn-lg">
              Get a Free Quote
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="https://wa.me/27696219479?text=Hi%20I'm%20interested%20in%20${encodeURIComponent(p.formService)}" class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener">
              WhatsApp Us
            </a>
          </div>
        </div>
        <div class="sub-hero-visual reveal reveal-delay-2" style="padding-right: clamp(1.25rem, 4vw, 2.5rem);">
          <div class="hero-icon-wrap">
            <div class="hero-orbit"><div class="orbit-dot"></div></div>
            ${p.heroIcon}
          </div>
        </div>
      </div>
    </section>

    <!-- ===== STATS ===== -->
    <section class="stats-strip">
      <div class="container">
        <div class="stat-item reveal">
          <div class="stat-number">${p.stat1}</div>
          <div class="stat-label">${p.stat1Label}</div>
        </div>
        <div class="stat-item reveal reveal-delay-1">
          <div class="stat-number">${p.stat2}</div>
          <div class="stat-label">${p.stat2Label}</div>
        </div>
        <div class="stat-item reveal reveal-delay-2">
          <div class="stat-number">${p.stat3}</div>
          <div class="stat-label">${p.stat3Label}</div>
        </div>
      </div>
    </section>

    <!-- ===== SPLIT CONTENT & IMAGE ===== -->
    <section class="split-image-section">
      <div class="container">
        <div class="split-image-grid">
          <div class="split-content reveal-left">
            <p class="section-label">A Better Approach</p>
            <h2>Elevating Your <span class="gradient-text">${p.formService}</span></h2>
            <p>We don't just complete projects; we build solutions designed to grow your business. By combining strategic thinking with technical excellence, we ensure every aspect of your project is optimized for success.</p>
            
            <div class="split-bullet-list">
              <div class="split-bullet-item">
                <svg class="split-bullet-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <div>
                  <div class="split-bullet-text">Tailored to Your Goals</div>
                  <div style="color:var(--text-body);font-size:0.9rem;margin-top:0.25rem;">No cookie-cutter templates. Everything is built to solve your specific challenges.</div>
                </div>
              </div>
              <div class="split-bullet-item">
                <svg class="split-bullet-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <div>
                  <div class="split-bullet-text">Future-Proof Quality</div>
                  <div style="color:var(--text-body);font-size:0.9rem;margin-top:0.25rem;">Using the latest industry standards so your investment lasts longer.</div>
                </div>
              </div>
              <div class="split-bullet-item">
                <svg class="split-bullet-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <div>
                  <div class="split-bullet-text">Dedicated Support</div>
                  <div style="color:var(--text-body);font-size:0.9rem;margin-top:0.25rem;">We're here before, during, and long after your project goes live.</div>
                </div>
              </div>
            </div>
            <a href="${n}about/" class="btn btn-outline">Learn About Our Team &rarr;</a>
          </div>
          <div class="split-visual reveal-right" style="position: relative; z-index: 1;">
            <div class="image-accent-blob"></div>
            <div class="split-image-wrapper">
              <!-- PLACEHOLDER FOR CLIENT IMAGE -->
              <img src="https://placehold.co/800x600/0f2035/06b6d4?text=Service+Image" alt="${p.formService} Showcase" width="800" height="600" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FEATURES ===== -->
    <section class="features-section">
      <div class="container">
        <div class="section-header center">
          <p class="section-label reveal">What's Included</p>
          <h2 class="section-title reveal reveal-delay-1">Everything You Need to <span class="gradient-text">Succeed</span></h2>
          <p class="section-subtitle reveal reveal-delay-2">A complete, professional service — no shortcuts, no outsourcing, no excuses.</p>
        </div>
        <div class="features-grid">
          ${p.features.map((f, i) => `
          <div class="feature-card reveal reveal-delay-${(i % 3) + 1}">
            <div class="feature-icon-box">
              ${getIcon(f.icon)}
            </div>
            <h3>${f.title}</h3>
            <p>${f.desc}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- ===== GALLERY / PLACEHOLDER GRID ===== -->
    <section class="gallery-section">
      <div class="container">
        <div class="section-header center">
          <p class="section-label reveal">Our Work</p>
          <h2 class="section-title reveal reveal-delay-1">Recent <span class="gradient-text">Projects</span></h2>
          <p class="section-subtitle reveal reveal-delay-2">Take a look at some of our recently completed work in this category.</p>
        </div>
        <div class="gallery-grid">
          <!-- PLACEHOLDERS FOR CLIENT IMAGES -->
          <div class="gallery-item reveal">
            <img src="https://placehold.co/600x450/1e293b/06b6d4?text=Project+1" alt="Project 1" loading="lazy">
            <div class="gallery-overlay">
              <h4>Project Name</h4>
              <p>${p.parentService}</p>
            </div>
          </div>
          <div class="gallery-item reveal reveal-delay-1">
            <img src="https://placehold.co/600x450/1e293b/06b6d4?text=Project+2" alt="Project 2" loading="lazy">
            <div class="gallery-overlay">
              <h4>Project Name</h4>
              <p>${p.parentService}</p>
            </div>
          </div>
          <div class="gallery-item reveal reveal-delay-2">
            <img src="https://placehold.co/600x450/1e293b/06b6d4?text=Project+3" alt="Project 3" loading="lazy">
            <div class="gallery-overlay">
              <h4>Project Name</h4>
              <p>${p.parentService}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CONTENT + STICKY FORM ===== -->
    <section class="content-form-section">
      <div class="container">
        <div class="content-form-grid">
          <div class="content-col reveal-left">
            <p class="section-label">Why Toran Digital</p>
            <h2>Local Experts, <span class="gradient-text">World-Class Results</span></h2>
            <p>We're not a call centre or an offshore agency. We're a Johannesburg-based team that understands the South African market, speaks your language, and is reachable on WhatsApp when you need us.</p>
            <p>Every project is handled by senior specialists — no juniors, no handoffs to outsourced freelancers. You deal directly with the people doing the work, and we hold ourselves accountable to your results.</p>
            <p>We've served 500+ businesses across Gauteng and beyond, from one-person startups to established corporations. Our growth is built on referrals — which only happens when clients are genuinely happy.</p>
            <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:1.5rem;">
              ${['✅ Johannesburg-based, available on WhatsApp', '✅ Senior specialists on every project', '✅ Transparent pricing, no hidden fees', '✅ 12-month workmanship guarantee', '✅ 500+ satisfied Gauteng businesses'].map(item => `
              <div style="display:flex;align-items:center;gap:0.75rem;font-weight:500;color:var(--text-heading);">${item}</div>`).join('')}
            </div>
          </div>
          <div class="quote-form-sticky reveal-right">
            <div class="quote-form-card">
              <h3>Get a Free Quote</h3>
              <p>No commitment. Response within 2 hours.</p>
              <form class="quote-form" action="mailto:sales@torandigital.co.za" method="POST" enctype="text/plain">
                <div class="form-group">
                  <input type="text" name="name" autocomplete="name" placeholder="Your Full Name" required>
                </div>
                <div class="form-group">
                  <input type="email" name="email" autocomplete="email" placeholder="Email Address" required>
                </div>
                <div class="form-group">
                  <input type="tel" name="phone" autocomplete="tel" placeholder="Phone / WhatsApp Number">
                </div>
                <div class="form-group">
                  <select name="service">
                    <option value="${p.formService}">${p.formService}</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="SEO & Ads">SEO &amp; Google Ads</option>
                    <option value="Vehicle Branding">Vehicle Branding</option>
                    <option value="DSTV Installation">DSTV Installation</option>
                    <option value="Graphic Design">Graphic Design</option>
                  </select>
                </div>
                <div class="form-group">
                  <textarea name="message" placeholder="Tell us about your project…"></textarea>
                </div>
                <button type="submit" class="btn-submit">Send My Request →</button>
              </form>
              <div class="quote-form-trust">
                <svg viewBox="0 0 16 16" fill="var(--teal-400)" width="14" height="14"><path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.1 4.4 12l.7-4L2.2 5.2l4-.6L8 1z"/></svg>
                100% Free. No obligation. No spam.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PROCESS ===== -->
    <section class="process-section">
      <div class="container">
        <div class="section-header center">
          <p class="section-label" style="color:var(--teal-400);">How We Work</p>
          <h2 class="section-title reveal" style="color:#fff;">Our <span style="background:linear-gradient(135deg,var(--teal-400),var(--amber-400));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">6-Step Process</span></h2>
        </div>
        <div class="process-steps">
          ${p.process.map((step, i) => `
          <div class="process-step reveal reveal-delay-${i+1}">
            <div class="step-num">${i+1}</div>
            <div class="step-label">${step}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- ===== FAQ ===== -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header center">
          <p class="section-label reveal">Common Questions</p>
          <h2 class="section-title reveal reveal-delay-1">Frequently Asked <span class="gradient-text">Questions</span></h2>
        </div>
        <div class="faq-list">
          ${p.faq.map((item, i) => `
          <details class="faq-item reveal reveal-delay-${(i % 3) + 1}">
            <summary class="faq-question">
              ${item.q}
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="6 9 12 15 18 9"/></svg>
            </summary>
            <div class="faq-answer">${item.a}</div>
          </details>`).join('')}
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="sub-cta">
      <div class="container">
        <p class="section-label" style="color:var(--teal-400);margin-bottom:1rem;">Ready to Start?</p>
        <h2>Let's Build Something <span style="background:linear-gradient(135deg,var(--teal-400),var(--amber-400));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Great Together</span></h2>
        <p>Talk to a specialist today — no hard sell, just honest advice on what will work best for your business.</p>
        <div class="hero-actions">
          <a href="${n}contact/" class="btn btn-primary btn-lg">
            Get Your Free Quote
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="https://wa.me/27696219479?text=Hi%20I'm%20interested%20in%20${encodeURIComponent(p.formService)}" class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>

  </main>

  <!-- WhatsApp Float -->
  <div class="whatsapp-float">
    <span class="tooltip">Chat with a Specialist</span>
    <a href="https://wa.me/27696219479?text=Hi%20Toran%20Digital%2C%20I%27d%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener" aria-label="Open WhatsApp chat">
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
  </div>

  ${buildFooter(p)}
  <script src="${p.jsDepth}"></script>
</body>
</html>`;
}

// ============================================================
// WRITE FILES
// ============================================================
pages.forEach(p => {
  const folderPath = path.join(dir, p.folder);
  fs.mkdirSync(folderPath, { recursive: true });
  const filePath = path.join(folderPath, 'index.html');
  fs.writeFileSync(filePath, buildPage(p), 'utf8');
  console.log(`✅ Created: ${p.folder}/index.html`);
});

console.log(`\n🚀 All ${pages.length} sub-service pages generated!`);
