const fs = require('fs');
const path = require('path');

const dir = __dirname;
const blogDir = path.join(dir, 'blog');

if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir);
}

// Read an existing file to use as a template for header/footer (e.g., about/index.html)
const templateHtml = fs.readFileSync(path.join(dir, 'about', 'index.html'), 'utf8');

const posts = [
  {
    slug: 'website-cost-johannesburg',
    title: 'How Much Does a Website Cost in Johannesburg? (2026 Guide) | Toran Digital',
    meta: 'A complete breakdown of web design costs in Johannesburg for 2026. From R3,500 starter sites to full e-commerce platforms — find the right package for your business.',
    h1: 'How Much Does a Website Cost in Johannesburg? (2026 Guide)',
    category: 'Web Design',
    excerpt: 'A complete breakdown of web design costs in Johannesburg for 2026. From R3,500 starter sites to full e-commerce platforms.',
    content: `
      <h2>What Affects the Price of a Website in South Africa?</h2>
      <p>The cost of web design in Johannesburg varies significantly based on functionality, custom design work, and the level of SEO required. A basic brochure site will naturally cost less than a fully integrated e-commerce platform.</p>
      
      <h2>Typical Web Design Price Ranges in Johannesburg</h2>
      <p>Here is a general breakdown of what you can expect to pay for web design services in 2026:</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem; margin-top: 1rem;">
        <tr style="background: var(--navy-800); color: white;">
          <th style="padding: 1rem; text-align: left; border: 1px solid var(--border-light);">Package Type</th>
          <th style="padding: 1rem; text-align: left; border: 1px solid var(--border-light);">Estimated Cost</th>
          <th style="padding: 1rem; text-align: left; border: 1px solid var(--border-light);">Best For</th>
        </tr>
        <tr>
          <td style="padding: 1rem; border: 1px solid var(--border-light);">Starter / Brochure Site</td>
          <td style="padding: 1rem; border: 1px solid var(--border-light); font-weight: bold;">R3,500 - R5,000</td>
          <td style="padding: 1rem; border: 1px solid var(--border-light);">Small service businesses needing online visibility.</td>
        </tr>
        <tr style="background: var(--bg-secondary);">
          <td style="padding: 1rem; border: 1px solid var(--border-light);">Corporate Website (CMS)</td>
          <td style="padding: 1rem; border: 1px solid var(--border-light); font-weight: bold;">R6,500 - R12,000</td>
          <td style="padding: 1rem; border: 1px solid var(--border-light);">Growing companies needing custom design and lead generation.</td>
        </tr>
        <tr>
          <td style="padding: 1rem; border: 1px solid var(--border-light);">E-Commerce Platform</td>
          <td style="padding: 1rem; border: 1px solid var(--border-light); font-weight: bold;">R9,500 - R25,000+</td>
          <td style="padding: 1rem; border: 1px solid var(--border-light);">Retailers selling products online with payment gateways.</td>
        </tr>
        <tr style="background: var(--bg-secondary);">
          <td style="padding: 1rem; border: 1px solid var(--border-light);">Custom Web App</td>
          <td style="padding: 1rem; border: 1px solid var(--border-light); font-weight: bold;">Custom Quote</td>
          <td style="padding: 1rem; border: 1px solid var(--border-light);">Complex functionality, directories, or SaaS products.</td>
        </tr>
      </table>
      
      <h2>What Should Be Included in Every Website Package?</h2>
      <p>When getting quotes, ensure that mobile responsiveness, basic on-page SEO, security (SSL), and contact forms are included as standard. Never pay extra for a site to be mobile-friendly.</p>
      
      <h2>Red Flags When Hiring a Web Designer in Gauteng</h2>
      <p>Be wary of quotes that are suspiciously low (e.g., under R1,500). Often, these use pirated themes, lack essential security updates, or the developer may abandon the project halfway through.</p>
      
      <h2>Ready to Get a Quote?</h2>
      <p>If you need a reliable, professional web design team, <a href="../../web-design/">Toran Digital</a> is ready to help. <a href="../../contact/">Contact us</a> for a detailed proposal.</p>
    `,
    related: ['seo-guide-johannesburg-businesses', 'vehicle-branding-roi']
  },
  {
    slug: 'vehicle-branding-roi',
    title: 'Is Vehicle Branding Worth It? The ROI for Johannesburg Businesses (2026) | Toran Digital',
    meta: 'Discover the return on investment for vehicle wraps in Johannesburg. Real figures, local examples, and how fleet branding compares to digital advertising spend.',
    h1: 'Is Vehicle Branding Worth It? ROI for Johannesburg Businesses',
    category: 'Vehicle Branding',
    excerpt: 'Discover the return on investment for vehicle wraps in Johannesburg. Real figures, local examples, and how fleet branding compares to digital advertising.',
    content: `
      <h2>What Does Vehicle Branding Actually Cost in South Africa?</h2>
      <p>A full vehicle wrap typically costs between R8,000 and R15,000 depending on the vehicle size, while half-wraps or basic decal branding can start from R3,500. It's a one-time capital outlay.</p>
      
      <h2>How Many Impressions Does a Wrapped Vehicle Get Daily in Gauteng?</h2>
      <p>In a bustling area like Johannesburg, a branded vehicle can generate between 30,000 to 70,000 impressions per day, depending on the routes driven. That's a massive local audience.</p>
      
      <h2>Vehicle Wrap vs. Google Ads: A Cost Comparison</h2>
      <p>While Google Ads might cost you R5,000 every single month for clicks, a R10,000 vehicle wrap continues advertising your business for years without any recurring fees. Both have their place, but vehicle branding offers exceptional long-term ROI.</p>
      
      <h2>How Long Do Vehicle Wraps Last in South Africa's Climate?</h2>
      <p>With high-quality cast vinyl and UV lamination, a professional wrap will last between 5 and 7 years before showing significant signs of wear under the harsh South African sun.</p>
      
      <h2>Who Benefits Most from Vehicle Branding?</h2>
      <p>Plumbers, electricians, logistics fleets, and any service business that regularly travels to clients will see the highest return on investment.</p>
      
      <h2>Get a Free Vehicle Wrap Quote</h2>
      <p>Ready to brand your fleet? Check out our <a href="../../vehicle-branding/">Vehicle Branding</a> services or <a href="../../contact/">contact us today</a>.</p>
    `,
    related: ['website-cost-johannesburg', 'seo-guide-johannesburg-businesses']
  },
  {
    slug: 'dstv-signal-problems',
    title: 'Fixing Common DSTV Signal Problems in Johannesburg | Toran Digital',
    meta: 'DSTV showing E48-32 or no signal? Read our Johannesburg technician\'s guide to diagnosing and fixing the most common DSTV signal issues before calling for help.',
    h1: 'How to Fix Common DSTV Signal Problems in Johannesburg',
    category: 'DSTV',
    excerpt: 'DSTV showing E48-32 or no signal? Read our technician\'s guide to diagnosing and fixing the most common DSTV signal issues.',
    content: `
      <h2>What Does Error Code E48-32 Mean?</h2>
      <p>The dreaded E48-32 error simply means your decoder is receiving no signal from the satellite dish. This is often caused by bad weather, loose cables, or dish misalignment.</p>
      
      <h2>Check These 5 Things Before Calling a Technician</h2>
      <ul>
        <li><strong>Weather:</strong> Heavy rain or thunderstorms in Gauteng will temporarily block the signal. Wait for it to pass.</li>
        <li><strong>Cables:</strong> Check that the coaxial cable is securely screwed into the LNB IN port at the back of the decoder.</li>
        <li><strong>Power Cycle:</strong> Unplug the decoder from the wall, wait 2 minutes, and plug it back in.</li>
        <li><strong>Dish Obstructions:</strong> Ensure no new tree branches have grown in front of your dish.</li>
        <li><strong>LNB Condition:</strong> Check if the plastic cap on the LNB (the eye on the dish) is cracked or weather-damaged.</li>
      </ul>
      
      <h2>When You Actually Need a Professional DSTV Installer</h2>
      <p>If the weather is clear and all cables are secure, your dish might have been knocked out of alignment by strong winds, or your LNB may have failed. This requires a professional with a signal meter to fix.</p>
      
      <h2>Toran Digital DSTV Services in Gauteng</h2>
      <p>If you're stuck, our accredited technicians can help. View our <a href="../../dstv-installations/">DSTV Installation services</a> or <a href="../../contact/">contact us for a call-out</a>.</p>
    `,
    related: ['website-cost-johannesburg', 'vehicle-branding-roi']
  },
  {
    slug: 'seo-guide-johannesburg-businesses',
    title: 'Local SEO Guide for Johannesburg Businesses (2026) | Toran Digital',
    meta: 'A beginner-friendly guide to local SEO for Johannesburg business owners. Learn how to rank on Google Maps, optimize your GBP, and get found by local customers.',
    h1: 'Local SEO Guide for Johannesburg Businesses (2026)',
    category: 'SEO',
    excerpt: 'A beginner-friendly guide to local SEO for Johannesburg business owners. Learn how to rank on Google Maps and get found by local customers.',
    content: `
      <h2>What is Local SEO and Why Does It Matter in South Africa?</h2>
      <p>Local SEO is the practice of optimizing your online presence to attract more business from relevant local searches. For a plumber in Sandton, it's the difference between being on page 1 of Google or being invisible.</p>
      
      <h2>How to Optimize Your Google Business Profile</h2>
      <p>Your Google Business Profile (GBP) is critical. Ensure your business name, address, and phone number (NAP) are accurate. Regularly post updates, respond to all reviews, and add high-quality photos of your team and work.</p>
      
      <h2>On-Page SEO Basics Every Johannesburg Business Needs</h2>
      <p>Make sure your website explicitly mentions the areas you serve. Include keywords like "Web Design Johannesburg" in your title tags, meta descriptions, and header tags (H1, H2).</p>
      
      <h2>How Long Does SEO Take to Work in South Africa?</h2>
      <p>SEO is a marathon, not a sprint. Typically, you'll start seeing noticeable improvements in organic traffic and rankings within 3 to 6 months.</p>
      
      <h2>DIY vs Hiring an SEO Agency in Gauteng</h2>
      <p>While basic optimization can be done yourself, competitive industries require technical SEO, backlink building, and content strategy that is best handled by professionals.</p>
      
      <h2>Free SEO Audit for Your Business</h2>
      <p>Want to see how your site is currently performing? Check out our <a href="../../seo-marketing/">SEO services</a> or <a href="../../contact/">request a free SEO audit</a> from our team.</p>
    `,
    related: ['website-cost-johannesburg', 'vehicle-branding-roi']
  }
];

// Helper to inject content into the template
function generatePage(contentBlock, pageTitle, metaDesc, canonical, schemaUrl, isPost) {
    let content = templateHtml;
    content = content.replace(/<title>.*?<\/title>/, `<title>${pageTitle}</title>`);
    content = content.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${metaDesc}">`);
    content = content.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="${canonical}">`);
    
    // Fix relative paths depending on depth
    // the template is from /about/ (1 level deep: ../)
    // Blog index is /blog/ (1 level deep) -> paths stay ../
    // Blog post is /blog/slug/ (2 levels deep) -> paths become ../../
    if (isPost) {
        content = content.replace(/(href|src)="(\.\.\/)+/g, '$1="../../');
    }

    // Replace the main block
    content = content.replace(/<main>[\s\S]*?<\/main>/, `<main>${contentBlock}</main>`);
    
    // Add Schema
    const schema = isPost ? `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${pageTitle.split(' | ')[0]}",
      "author": {"@type": "Organization", "name": "Toran Digital"},
      "publisher": {
        "@type": "Organization",
        "name": "Toran Digital",
        "logo": {"@type": "ImageObject", "url": "https://torandigital.co.za/logo/Gemini_Generated_Image_.png"}
      },
      "datePublished": "${new Date().toISOString().split('T')[0]}",
      "dateModified": "${new Date().toISOString().split('T')[0]}",
      "url": "${schemaUrl}"
    }
    </script>` : '';
    
    if (schema) {
        content = content.replace('</head>', schema + '\n</head>');
    }

    return content;
}

// 1. Generate Blog Listing Page
const blogListingMain = `
    <section class="service-hero" style="padding: 160px 0 100px; text-align: center; background: linear-gradient(to bottom, var(--navy-900), var(--navy-800)); color: white;">
      <div class="container">
        <h1 class="reveal">The Toran Digital <span class="gradient-text">Blog</span></h1>
        <p class="section-subtitle reveal reveal-delay-1" style="margin: 1.5rem auto; max-width: 700px; color: var(--text-on-dark-muted);">
          Read expert guides on web design, SEO, vehicle branding, DSTV installation, and mobile app development from Toran Digital's team in Gauteng.
        </p>
      </div>
    </section>
    
    <section class="content-block" style="padding: 5rem 0;">
      <div class="container">
        <div style="display: flex; gap: 10px; margin-bottom: 3rem; flex-wrap: wrap; justify-content: center;">
          <span style="padding: 8px 16px; background: var(--teal-600); color: white; border-radius: 20px; font-weight: 600; cursor: pointer;">All</span>
          <span style="padding: 8px 16px; background: var(--surface-100); color: var(--navy-800); border-radius: 20px; font-weight: 600; cursor: pointer;">Web Design</span>
          <span style="padding: 8px 16px; background: var(--surface-100); color: var(--navy-800); border-radius: 20px; font-weight: 600; cursor: pointer;">SEO</span>
          <span style="padding: 8px 16px; background: var(--surface-100); color: var(--navy-800); border-radius: 20px; font-weight: 600; cursor: pointer;">Vehicle Branding</span>
          <span style="padding: 8px 16px; background: var(--surface-100); color: var(--navy-800); border-radius: 20px; font-weight: 600; cursor: pointer;">DSTV</span>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          ${posts.map(p => `
            <div style="border: 1px solid var(--border-light); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;">
              <div style="padding: 2rem; flex-grow: 1; display: flex; flex-direction: column;">
                <span style="color: var(--teal-600); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">${p.category}</span>
                <h3 style="margin-bottom: 1rem; font-size: 1.25rem;"><a href="${p.slug}/" style="color: var(--navy-800); text-decoration: none;">${p.title.split(' | ')[0]}</a></h3>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem; flex-grow: 1;">${p.excerpt}</p>
                <a href="${p.slug}/" style="color: var(--teal-600); font-weight: 600; text-decoration: none; display: flex; align-items: center;">Read More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="margin-left: 5px;"><polyline points="9 18 15 12 9 6"/></svg></a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
`;

const listingHtml = generatePage(
    blogListingMain, 
    'Digital Insights & Local Business Tips | Toran Digital Blog', 
    'Read expert guides on web design, SEO, vehicle branding, DSTV installation, and mobile app development from Toran Digital\'s team in Gauteng.', 
    'https://torandigital.co.za/blog/',
    '',
    false
);
fs.writeFileSync(path.join(blogDir, 'index.html'), listingHtml);

// 2. Generate Blog Posts
posts.forEach(p => {
    const postDir = path.join(blogDir, p.slug);
    if (!fs.existsSync(postDir)) fs.mkdirSync(postDir);
    
    const postMain = `
        <article style="padding: 120px 0 50px;">
          <div class="container" style="max-width: 800px;">
            <div style="text-align: center; margin-bottom: 3rem;">
              <span style="color: var(--teal-600); font-size: 0.9rem; font-weight: 700; text-transform: uppercase;">${p.category}</span>
              <h1 style="margin: 1rem 0; font-size: 2.5rem; color: var(--navy-900);">${p.h1}</h1>
              <p style="color: var(--text-muted);">By Toran Digital Team | ${new Date().toLocaleDateString('en-ZA')}</p>
            </div>
            
            <div class="blog-content" style="font-size: 1.1rem; line-height: 1.8; color: var(--navy-700);">
              ${p.content}
            </div>
            
            <hr style="margin: 4rem 0; border: none; border-top: 1px solid var(--border-light);">
            
            <div style="text-align: center; margin-bottom: 4rem;">
              <h3 style="margin-bottom: 1rem; color: var(--navy-900);">Need help with ${p.category}?</h3>
              <p style="margin-bottom: 2rem; color: var(--text-muted);">Get a free quote from Toran Digital.</p>
              <a href="../../contact/" class="btn btn-primary">Contact Us Today</a>
            </div>
          </div>
        </article>
        
        <section style="background: var(--surface-50); padding: 4rem 0;">
          <div class="container">
            <h3 style="text-align: center; margin-bottom: 2rem; color: var(--navy-900);">You might also like</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
              ${p.related.map(rSlug => {
                  const relatedPost = posts.find(post => post.slug === rSlug);
                  return `
                    <div style="background: white; border: 1px solid var(--border-light); border-radius: 12px; padding: 2rem;">
                      <h4 style="margin-bottom: 1rem;"><a href="../${relatedPost.slug}/" style="color: var(--navy-800); text-decoration: none;">${relatedPost.h1}</a></h4>
                      <p style="color: var(--text-muted); font-size: 0.95rem;">${relatedPost.excerpt}</p>
                    </div>
                  `;
              }).join('')}
            </div>
          </div>
        </section>
    `;
    
    // Add some basic styling for the blog content
    let finalPostHtml = generatePage(
        postMain, 
        p.title, 
        p.meta, 
        `https://torandigital.co.za/blog/${p.slug}/`,
        `https://torandigital.co.za/blog/${p.slug}/`,
        true
    );
    finalPostHtml = finalPostHtml.replace('</head>', `
    <style>
      .blog-content h2 { color: var(--navy-900); margin: 2rem 0 1rem; font-size: 1.75rem; }
      .blog-content p { margin-bottom: 1.5rem; }
      .blog-content ul { padding-left: 20px; margin-bottom: 1.5rem; }
      .blog-content li { margin-bottom: 0.5rem; }
      .blog-content a { color: var(--teal-600); text-decoration: none; font-weight: 600; }
      .blog-content a:hover { text-decoration: underline; }
    </style>
    </head>`);
    
    fs.writeFileSync(path.join(postDir, 'index.html'), finalPostHtml);
});

console.log('Blog section created successfully.');
