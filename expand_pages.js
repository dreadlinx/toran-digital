const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\TIN\\Desktop\\Toran Digital';

const mobileAppsHtml = `
    </section>

    <section class="content-block" style="background: var(--surface-50); padding: 5rem 0;">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-title reveal">Why South African Businesses Are Investing in <span class="gradient-text">Custom Apps</span></h2>
          <p class="section-subtitle reveal">Overcoming connectivity challenges and reaching your audience.</p>
        </div>
        <div class="reveal" style="max-width: 800px; margin: 0 auto; text-align: left; font-size: 1.1rem; line-height: 1.8; color: var(--navy-700);">
          <p style="margin-bottom: 1.5rem;">The mobile usage in South Africa is growing exponentially, presenting a massive opportunity for businesses to connect directly with their customers. A custom mobile app puts your brand right in your customer's pocket.</p>
          <p style="margin-bottom: 1.5rem;">Unlike traditional web apps, we build <strong>load-shedding-aware apps</strong> with offline-first capabilities. Whether it's caching data during power outages or optimizing for areas with poor connectivity, our apps ensure uninterrupted service.</p>
          <p>We also understand the local landscape—from transitioning away from clunky USSD menus to delivering rich, native app experiences that your users will actually enjoy using.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-title reveal">Our Mobile App Development <span class="gradient-text">Process</span></h2>
          <p class="section-subtitle reveal">A structured approach to ensure your app is delivered on time and on budget.</p>
        </div>
        <div class="process-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 3rem;">
          <div class="process-card reveal" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">1. Discovery</h3>
            <p>We start by understanding your business goals, target audience, and the core problems your app needs to solve.</p>
          </div>
          <div class="process-card reveal reveal-delay-1" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">2. Wireframe</h3>
            <p>Creating the blueprint. We map out user journeys and wireframe every screen to ensure a logical flow.</p>
          </div>
          <div class="process-card reveal reveal-delay-2" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">3. Design</h3>
            <p>Crafting a beautiful, intuitive UI that aligns with your brand and provides an exceptional user experience.</p>
          </div>
          <div class="process-card reveal" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">4. Build</h3>
            <p>Our developers write clean, scalable code, bringing the designs to life with robust functionality.</p>
          </div>
          <div class="process-card reveal reveal-delay-1" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">5. Test</h3>
            <p>Rigorous QA testing across multiple devices to squash bugs and ensure optimal performance.</p>
          </div>
          <div class="process-card reveal reveal-delay-2" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">6. Launch</h3>
            <p>We handle the complex submission process to both the Google Play Store and Apple App Store.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--navy-900); color: white;">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-title reveal" style="color: white;">Mobile App Development <span class="gradient-text">Packages</span></h2>
          <p class="section-subtitle reveal" style="color: var(--surface-300);">Transparent pricing for every stage of your business growth.</p>
        </div>
        <div class="pricing-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
          
          <div class="pricing-card reveal" style="background: var(--navy-800); border: 1px solid var(--navy-700); padding: 3rem 2rem; border-radius: 16px; text-align: center;">
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: white;">MVP App</h3>
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--teal-400); margin-bottom: 1.5rem;">from R15,000</div>
            <p style="color: var(--surface-300); margin-bottom: 2rem; font-size: 0.95rem;">Perfect for startups testing a new concept.</p>
            <ul style="list-style: none; padding: 0; margin: 0 0 2rem 0; text-align: left; color: var(--surface-200);">
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Basic Single-Platform (Android or iOS)</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Core Features Implementation</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Up to 3 Key Screens</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Basic UI/UX Design</li>
            </ul>
            <a href="../contact/" class="btn btn-outline" style="width: 100%; border-color: var(--teal-500); color: var(--teal-400);">Get Started</a>
          </div>

          <div class="pricing-card reveal reveal-delay-1" style="background: linear-gradient(145deg, var(--navy-800), var(--navy-700)); border: 2px solid var(--teal-500); padding: 3rem 2rem; border-radius: 16px; text-align: center; position: relative; transform: scale(1.05); z-index: 2;">
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--teal-500); color: var(--navy-900); padding: 5px 15px; border-radius: 20px; font-weight: 700; font-size: 0.85rem;">MOST POPULAR</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: white;">Business App</h3>
            <div style="font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 1.5rem;">from R35,000</div>
            <p style="color: var(--surface-300); margin-bottom: 2rem; font-size: 0.95rem;">For growing businesses needing robust solutions.</p>
            <ul style="list-style: none; padding: 0; margin: 0 0 2rem 0; text-align: left; color: var(--surface-100);">
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Cross-Platform (iOS & Android)</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Custom API Integrations</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Web Admin Dashboard</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> User Authentication</li>
            </ul>
            <a href="../contact/" class="btn btn-primary" style="width: 100%;">Get Started</a>
          </div>

          <div class="pricing-card reveal reveal-delay-2" style="background: var(--navy-800); border: 1px solid var(--navy-700); padding: 3rem 2rem; border-radius: 16px; text-align: center;">
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: white;">Enterprise App</h3>
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--teal-400); margin-bottom: 1.5rem;">Custom Quote</div>
            <p style="color: var(--surface-300); margin-bottom: 2rem; font-size: 0.95rem;">Full-scale platforms for established organizations.</p>
            <ul style="list-style: none; padding: 0; margin: 0 0 2rem 0; text-align: left; color: var(--surface-200);">
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> PayFast/Yoco Integration</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Real-Time Database</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Play Store & App Store Submission</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Complex Third-Party Systems</li>
            </ul>
            <a href="../contact/" class="btn btn-outline" style="width: 100%; border-color: var(--teal-500); color: var(--teal-400);">Request Quote</a>
          </div>

        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-title reveal">Frequently Asked <span class="gradient-text">Questions</span></h2>
        </div>
        <div class="faq-container reveal" style="max-width: 800px; margin: 0 auto;">
          
          <div class="faq-item" style="border-bottom: 1px solid var(--surface-200); padding: 1.5rem 0;">
            <h3 style="font-size: 1.2rem; color: var(--navy-800); margin-bottom: 0.5rem;">How long does it take to build an app?</h3>
            <p style="color: var(--navy-600); line-height: 1.6;">Depending on complexity, a custom mobile app typically takes between 6 to 16 weeks from initial discovery to final app store submission.</p>
          </div>
          
          <div class="faq-item" style="border-bottom: 1px solid var(--surface-200); padding: 1.5rem 0;">
            <h3 style="font-size: 1.2rem; color: var(--navy-800); margin-bottom: 0.5rem;">Do you handle Play Store and App Store submission?</h3>
            <p style="color: var(--navy-600); line-height: 1.6;">Yes, we manage the full submission process for both the Google Play Store and Apple App Store, ensuring your app meets all guidelines for approval.</p>
          </div>

          <div class="faq-item" style="border-bottom: 1px solid var(--surface-200); padding: 1.5rem 0;">
            <h3 style="font-size: 1.2rem; color: var(--navy-800); margin-bottom: 0.5rem;">Can the app work offline or handle poor connectivity?</h3>
            <p style="color: var(--navy-600); line-height: 1.6;">Absolutely. We design for South Africa's unique connectivity realities by implementing offline-first architecture and local data caching to ensure smooth operation during load-shedding or in low-signal areas.</p>
          </div>

          <div class="faq-item" style="padding: 1.5rem 0;">
            <h3 style="font-size: 1.2rem; color: var(--navy-800); margin-bottom: 0.5rem;">What is the difference between native and cross-platform?</h3>
            <p style="color: var(--navy-600); line-height: 1.6;">Native apps are built specifically for one platform (like iOS or Android) providing maximum performance. Cross-platform apps are built from a single codebase (using React Native or Flutter) to run on both systems, offering a highly cost-effective and faster solution without sacrificing quality.</p>
          </div>
          
        </div>
      </div>
    </section>

    <section class="cta-banner">`;

const seoHtml = `
    </section>

    <section class="content-block" style="background: var(--surface-50); padding: 5rem 0;">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-title reveal">Why Local SEO Matters for <span class="gradient-text">Gauteng Businesses</span></h2>
          <p class="section-subtitle reveal">Capture high-intent searches in your service area.</p>
        </div>
        <div class="reveal" style="max-width: 800px; margin: 0 auto; text-align: left; font-size: 1.1rem; line-height: 1.8; color: var(--navy-700);">
          <p style="margin-bottom: 1.5rem;">When potential clients in Johannesburg or Pretoria search for your services, they are looking for immediate solutions. With the rise of "near me" searches, your business needs to appear at the top of local search results.</p>
          <p style="margin-bottom: 1.5rem;">The Google Maps Pack is prime real estate. A fully optimized Google Business Profile (GBP) ensures that when customers search for a local provider, your business stands out with reviews, location details, and clear contact information.</p>
          <p>We focus on localized keyword strategies that convert traffic into tangible leads rather than just empty vanity metrics.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-title reveal">What's Included in Our <span class="gradient-text">SEO Service</span></h2>
          <p class="section-subtitle reveal">A comprehensive approach to dominating search results.</p>
        </div>
        <div class="process-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-top: 3rem;">
          <div class="process-card reveal" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">Keyword Research</h3>
            <p>In-depth competitor analysis to identify high-converting local keywords relevant to your industry.</p>
          </div>
          <div class="process-card reveal reveal-delay-1" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">On-Page Optimization</h3>
            <p>Fine-tuning titles, meta descriptions, headings, and schema markup to align with Google's best practices.</p>
          </div>
          <div class="process-card reveal reveal-delay-2" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">Google Business Profile</h3>
            <p>Setup and ongoing optimization of your GBP to secure your spot in the local Maps Pack.</p>
          </div>
          <div class="process-card reveal" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">Local Citation Building</h3>
            <p>Establishing consistency across Brabys, Yellow Pages SA, Hotfrog SA, and Cylex SA to build domain authority.</p>
          </div>
          <div class="process-card reveal reveal-delay-1" style="background: var(--surface-100); padding: 2rem; border-radius: 12px; text-align: left;">
            <h3 style="color: var(--teal-600); margin-bottom: 1rem;">Monthly Reporting</h3>
            <p>Transparent tracking of your keyword rankings, organic traffic, and lead generation progress.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--navy-800); color: white;">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-title reveal" style="color: white;">Google Ads <span class="gradient-text">Management</span></h2>
          <p class="section-subtitle reveal" style="color: var(--surface-300);">Instant visibility for high-value services.</p>
        </div>
        <div class="reveal" style="max-width: 800px; margin: 0 auto; text-align: left; font-size: 1.1rem; line-height: 1.8; color: var(--surface-100);">
          <p style="margin-bottom: 1.5rem;">While SEO builds long-term authority, Google Ads drives immediate, targeted traffic. We design Search campaigns structured precisely around location targeting in Gauteng.</p>
          <p>Our management includes continuous A/B ad testing, bid adjustments, and rigorous budget management to maximize your return on ad spend and reduce wasted clicks.</p>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--navy-900); color: white;">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-title reveal" style="color: white;">SEO & Google Ads <span class="gradient-text">Packages</span></h2>
          <p class="section-subtitle reveal" style="color: var(--surface-300);">Scalable marketing solutions for local businesses.</p>
        </div>
        <div class="pricing-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem;">
          
          <div class="pricing-card reveal" style="background: var(--navy-800); border: 1px solid var(--navy-700); padding: 3rem 2rem; border-radius: 16px; text-align: center;">
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: white;">Local SEO Starter</h3>
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--teal-400); margin-bottom: 1.5rem;">R2,500<span style="font-size: 1rem; color: var(--surface-300);">/mo</span></div>
            <p style="color: var(--surface-300); margin-bottom: 2rem; font-size: 0.95rem;">Essential local visibility for small businesses.</p>
            <ul style="list-style: none; padding: 0; margin: 0 0 2rem 0; text-align: left; color: var(--surface-200);">
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> GBP Optimization</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> On-Page SEO Tweaks</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Monthly Ranking Report</li>
            </ul>
            <a href="../contact/" class="btn btn-outline" style="width: 100%; border-color: var(--teal-500); color: var(--teal-400);">Get Started</a>
          </div>

          <div class="pricing-card reveal reveal-delay-1" style="background: linear-gradient(145deg, var(--navy-800), var(--navy-700)); border: 2px solid var(--teal-500); padding: 3rem 2rem; border-radius: 16px; text-align: center; position: relative; transform: scale(1.05); z-index: 2;">
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--teal-500); color: var(--navy-900); padding: 5px 15px; border-radius: 20px; font-weight: 700; font-size: 0.85rem;">MOST POPULAR</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: white;">Growth SEO</h3>
            <div style="font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 1.5rem;">R4,500<span style="font-size: 1rem; color: var(--surface-300);">/mo</span></div>
            <p style="color: var(--surface-300); margin-bottom: 2rem; font-size: 0.95rem;">Aggressive growth and content strategy.</p>
            <ul style="list-style: none; padding: 0; margin: 0 0 2rem 0; text-align: left; color: var(--surface-100);">
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Full On-Page SEO</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Citation Building</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> 2 Blog Posts/Month</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Advanced Reporting</li>
            </ul>
            <a href="../contact/" class="btn btn-primary" style="width: 100%;">Get Started</a>
          </div>

          <div class="pricing-card reveal reveal-delay-2" style="background: var(--navy-800); border: 1px solid var(--navy-700); padding: 3rem 2rem; border-radius: 16px; text-align: center;">
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: white;">Google Ads Management</h3>
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--teal-400); margin-bottom: 1.5rem;">from R1,500<span style="font-size: 1rem; color: var(--surface-300);">/mo</span></div>
            <p style="color: var(--surface-300); margin-bottom: 2rem; font-size: 0.95rem;">Management fee (+ ad spend budget separately).</p>
            <ul style="list-style: none; padding: 0; margin: 0 0 2rem 0; text-align: left; color: var(--surface-200);">
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Search Campaign Setup</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Budget Management</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> A/B Ad Testing</li>
              <li style="margin-bottom: 1rem; display: flex; align-items: center;"><svg style="margin-right: 10px; color: var(--teal-400); flex-shrink: 0;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Conversion Tracking</li>
            </ul>
            <a href="../contact/" class="btn btn-outline" style="width: 100%; border-color: var(--teal-500); color: var(--teal-400);">Request Quote</a>
          </div>

        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header center">
          <h2 class="section-title reveal">Frequently Asked <span class="gradient-text">Questions</span></h2>
        </div>
        <div class="faq-container reveal" style="max-width: 800px; margin: 0 auto;">
          
          <div class="faq-item" style="border-bottom: 1px solid var(--surface-200); padding: 1.5rem 0;">
            <h3 style="font-size: 1.2rem; color: var(--navy-800); margin-bottom: 0.5rem;">How long before I see SEO results?</h3>
            <p style="color: var(--navy-600); line-height: 1.6;">It typically takes 3 to 6 months to see significant results for competitive local keywords in Gauteng, though long-tail niches may rank faster.</p>
          </div>
          
          <div class="faq-item" style="border-bottom: 1px solid var(--surface-200); padding: 1.5rem 0;">
            <h3 style="font-size: 1.2rem; color: var(--navy-800); margin-bottom: 0.5rem;">Do you manage Google Business Profile?</h3>
            <p style="color: var(--navy-600); line-height: 1.6;">Yes, Google Business Profile optimization is included in all our local SEO plans.</p>
          </div>

          <div class="faq-item" style="padding: 1.5rem 0;">
            <h3 style="font-size: 1.2rem; color: var(--navy-800); margin-bottom: 0.5rem;">What areas do you target?</h3>
            <p style="color: var(--navy-600); line-height: 1.6;">Our local SEO campaigns primarily target Johannesburg, Gauteng, and specific high-value suburbs as required by your business goals.</p>
          </div>
          
        </div>
      </div>
    </section>

    <section class="cta-banner">`;

const mobilePath = path.join(dir, 'mobile-apps', 'index.html');
let mobileContent = fs.readFileSync(mobilePath, 'utf8');
mobileContent = mobileContent.replace('    </section>\n\n    <section class="cta-banner">', mobileAppsHtml);
fs.writeFileSync(mobilePath, mobileContent);

const seoPath = path.join(dir, 'seo-marketing', 'index.html');
let seoContent = fs.readFileSync(seoPath, 'utf8');
seoContent = seoContent.replace('    </section>\n\n    <section class="cta-banner">', seoHtml);
fs.writeFileSync(seoPath, seoContent);

console.log('Expanded mobile apps and seo pages.');
