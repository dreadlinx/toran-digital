const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';
const templatePath = path.join(dir, 'about', 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

const pages = [
  {
    folder: 'privacy-policy',
    title: 'Privacy Policy | Toran Digital',
    canonical: 'https://torandigital.co.za/privacy-policy/',
    h1: 'Privacy Policy',
    content: `
      <h2>1. Introduction</h2>
      <p>Toran Digital respects your privacy and is committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data in compliance with South Africa's Protection of Personal Information Act (POPIA).</p>

      <h2>2. What Personal Information We Collect</h2>
      <p>When you contact us or request a quote, we may collect the following information:</p>
      <ul>
        <li>Your name and surname</li>
        <li>Your email address</li>
        <li>Your phone number</li>
        <li>Business details related to your enquiry</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>Your personal information is used exclusively to respond to your enquiries, provide you with accurate quotes, and deliver our services. We do not sell, rent, or share your data with third parties for marketing purposes.</p>

      <h2>4. WhatsApp Communication Consent</h2>
      <p>By initiating a chat with Toran Digital via our WhatsApp links, you consent to us communicating with you regarding your service enquiry through the WhatsApp platform.</p>

      <h2>5. Cookies and Google Analytics</h2>
      <p>Our website uses cookies and Google Analytics to monitor site traffic and improve user experience. This data is aggregated and does not personally identify you. You can adjust your browser settings to refuse cookies if you prefer.</p>

      <h2>6. Requesting Data Deletion</h2>
      <p>You have the right to request access to, or deletion of, your personal data at any time. To make a request, please email us at <a href="mailto:sales@torandigital.co.za">sales@torandigital.co.za</a>.</p>

      <h2>7. Updates to This Policy</h2>
      <p>We may update this privacy policy periodically. The latest version will always be available on this page.</p>
      <p><em>Last updated: June 2026</em></p>
    `
  },
  {
    folder: 'terms',
    title: 'Terms & Conditions | Toran Digital',
    canonical: 'https://torandigital.co.za/terms/',
    h1: 'Terms & Conditions',
    content: `
      <h2>1. Scope of Services</h2>
      <p>These terms and conditions apply to all digital, design, and physical installation services provided by Toran Digital. A detailed scope of work will be outlined in your specific project proposal or quotation.</p>

      <h2>2. Payment Terms</h2>
      <p>A non-refundable deposit (typically 50%, unless stated otherwise) is required before any work commences. The final balance is due before the handover of the final product (e.g., website go-live, final file delivery, or completed physical installation).</p>

      <h2>3. Revision Policy</h2>
      <p>Our design packages typically include up to 2 rounds of revisions during the initial design phase. Additional revisions outside the agreed scope will be billed at our standard hourly rate.</p>

      <h2>4. Client Responsibilities</h2>
      <p>The client is responsible for providing all necessary content, copy, and images in a timely manner. Delays in providing content will result in project timeline extensions. The client must ensure they hold the copyright for any materials provided to Toran Digital.</p>

      <h2>5. Intellectual Property</h2>
      <p>Toran Digital retains ownership of all working files and concepts. Upon full and final payment, the final deliverable (e.g., the finished website, logo files) becomes the intellectual property of the client.</p>

      <h2>6. Limitation of Liability</h2>
      <p>Toran Digital shall not be held liable for any indirect, incidental, or consequential damages, including loss of profits or data, arising from the use of our services, websites, or installations.</p>

      <h2>7. Governing Law</h2>
      <p>These terms and conditions are governed by and construed in accordance with the laws of the Republic of South Africa.</p>
      <p><em>Last updated: June 2026</em></p>
    `
  }
];

pages.forEach(p => {
    let content = templateHtml;
    
    // Replace Meta
    content = content.replace(/<title>.*?<\/title>/, `<title>${p.title}</title>`);
    content = content.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="${p.canonical}">`);
    
    // Create new main content
    const mainContent = `
    <article style="padding: 160px 0 100px;">
      <div class="container" style="max-width: 800px;">
        <h1 style="text-align: center; margin-bottom: 3rem; color: var(--navy-900); font-size: 2.5rem;">${p.h1}</h1>
        <div class="legal-content" style="font-size: 1.1rem; line-height: 1.8; color: var(--navy-700);">
          ${p.content}
        </div>
      </div>
    </article>
    <style>
      .legal-content h2 { margin-top: 2rem; margin-bottom: 1rem; color: var(--navy-900); font-size: 1.5rem; }
      .legal-content p { margin-bottom: 1.5rem; }
      .legal-content ul { margin-bottom: 1.5rem; padding-left: 20px; }
      .legal-content li { margin-bottom: 0.5rem; }
      .legal-content a { color: var(--teal-600); text-decoration: none; font-weight: bold; }
    </style>
    `;
    
    content = content.replace(/<main>[\s\S]*?<\/main>/, `<main>\n${mainContent}\n</main>`);
    
    const pageDir = path.join(dir, p.folder);
    if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir);
    fs.writeFileSync(path.join(pageDir, 'index.html'), content);
});

console.log('Legal pages created successfully.');
