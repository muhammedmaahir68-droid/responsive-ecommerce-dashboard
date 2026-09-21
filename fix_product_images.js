const fs = require('fs');
const indexPath = 'index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// Product image replacements using Unsplash free CDN (no API key needed)
// Each image is a direct, stable, free-to-use photo URL

// 1. Headphones
html = html.replace(
  `<div class="product-header-banner">
              <span class="product-icon-large"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></span>
              <span class="product-stock-badge stock-in">In Stock (45)</span>
            </div>`,
  `<div class="product-header-banner" style="background:none;padding:0;">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop&auto=format" alt="Wireless Noise-Canceling Headphones" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
              <span class="product-stock-badge stock-in">In Stock (45)</span>
            </div>`
);

// 2. Smartwatch
html = html.replace(
  `<div class="product-header-banner">
              <span class="product-icon-large"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg></span>
              <span class="product-stock-badge stock-low">Low Stock (8)</span>
            </div>`,
  `<div class="product-header-banner" style="background:none;padding:0;">
              <img src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=200&fit=crop&auto=format" alt="Smartwatch Series 8 Titanium" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
              <span class="product-stock-badge stock-low">Low Stock (8)</span>
            </div>`
);

// 3. Keyboard
html = html.replace(
  `<div class="product-header-banner">
              <span class="product-icon-large"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="6" y1="8" x2="6" y2="8"></line><line x1="10" y1="8" x2="10" y2="8"></line><line x1="14" y1="8" x2="14" y2="8"></line><line x1="18" y1="8" x2="18" y2="8"></line><line x1="6" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="18" y2="12"></line><line x1="10" y1="16" x2="14" y2="16"></line></svg></span>
              <span class="product-stock-badge stock-in">In Stock (120)</span>
            </div>`,
  `<div class="product-header-banner" style="background:none;padding:0;">
              <img src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=200&fit=crop&auto=format" alt="Mechanical RGB Gaming Keyboard" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
              <span class="product-stock-badge stock-in">In Stock (120)</span>
            </div>`
);

// 4. Office Chair
html = html.replace(
  `<div class="product-header-banner">
              <span class="product-icon-large"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path><path d="M12 18v3"></path><path d="M8 21h8"></path></svg></span>
              <span class="product-stock-badge stock-out">Out of Stock</span>
            </div>`,
  `<div class="product-header-banner" style="background:none;padding:0;">
              <img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=200&fit=crop&auto=format" alt="Ergonomic Office Chair" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
              <span class="product-stock-badge stock-out">Out of Stock</span>
            </div>`
);

// 5. Helmet / Cycling
html = html.replace(
  `<div class="product-header-banner">
              <span class="product-icon-large"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"></circle><circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="15" cy="5" r="1"></circle><path d="M12 17.5V14l-3-3 4-3 2 3h2"></path></svg></span>
              <span class="product-stock-badge stock-in">In Stock (32)</span>
            </div>`,
  `<div class="product-header-banner" style="background:none;padding:0;">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&auto=format" alt="Road Bike Helmet" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
              <span class="product-stock-badge stock-in">In Stock (32)</span>
            </div>`
);

// 6. Monitor
html = html.replace(
  `<div class="product-header-banner">
              <span class="product-icon-large"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></span>
              <span class="product-stock-badge stock-low">Low Stock (5)</span>
            </div>`,
  `<div class="product-header-banner" style="background:none;padding:0;">
              <img src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=200&fit=crop&auto=format" alt="4K UltraWide Curved Monitor" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
              <span class="product-stock-badge stock-low">Low Stock (5)</span>
            </div>`
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Product images updated with Unsplash photos.');
