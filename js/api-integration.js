/**
 * ==========================================================================
 * AURA COMMERCE - SPRING BOOT API INTEGRATION (js/api-integration.js)
 * --------------------------------------------------------------------------
 * Connects the AuraCommerce frontend to the Spring Boot REST backend.
 * - Loads live dashboard stats & chart data from /api/dashboard
 * - Loads live products from /api/products
 * - Loads live orders  from /api/orders
 * - Loads live customers from /api/customers
 * - Submits the "New Product" modal form via POST /api/products
 *
 * Falls back gracefully if the backend is not running.
 * ==========================================================================
 */

import {
  fetchDashboardStats, fetchChartData,
  fetchProducts, createProduct,
  fetchOrders,
  fetchCustomers,
} from './api.js';

const API_BASE = 'http://localhost:8080/api';

/* ============================================================
   UTILITY: Format currency (₹ Indian Rupees)
   ============================================================ */
function formatINR(value) {
  if (value === null || value === undefined) return '₹0';
  return '₹' + Number(value).toLocaleString('en-IN');
}

/* ============================================================
   CHECK: Is the backend reachable?
   ============================================================ */
async function isBackendAvailable() {
  try {
    const res = await fetch(`${API_BASE}/dashboard/stats`, { signal: AbortSignal.timeout(2500) });
    return res.ok;
  } catch {
    return false;
  }
}

/* ============================================================
   DASHBOARD STATS: Update metric cards with live data
   ============================================================ */
async function loadDashboardStats() {
  try {
    const stats = await fetchDashboardStats();

    // Revenue card
    const revenueEl = document.querySelector('#view-dashboard .stats-grid .stat-card:nth-child(1) .stat-card-value');
    if (revenueEl) revenueEl.textContent = formatINR(stats.totalRevenue);

    // Orders card
    const ordersEl = document.querySelector('#view-dashboard .stats-grid .stat-card:nth-child(2) .stat-card-value');
    if (ordersEl) ordersEl.textContent = Number(stats.totalOrders).toLocaleString('en-IN');

    // Customers card
    const customersEl = document.querySelector('#view-dashboard .stats-grid .stat-card:nth-child(4) .stat-card-value');
    if (customersEl) customersEl.textContent = Number(stats.activeCustomers).toLocaleString('en-IN');

    console.log('[AuraCommerce API] Dashboard stats loaded from Spring Boot backend.');
  } catch (err) {
    console.warn('[AuraCommerce API] Dashboard stats fallback to static data.', err.message);
  }
}

/* ============================================================
   CHART: Wire chart time-buttons to live API
   ============================================================ */
async function wireChartToApi() {
  const timeBtns = document.querySelectorAll('.time-btn');
  if (!timeBtns.length) return;

  timeBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const range = btn.getAttribute('data-range');
      try {
        const data = await fetchChartData(range);
        if (data && data.labels && data.values && window.renderChartFromApi) {
          window.renderChartFromApi(data.labels, data.values);
        }
      } catch (err) {
        console.warn('[AuraCommerce API] Chart data fallback.', err.message);
      }
    });
  });
}

/* ============================================================
   PRODUCTS TABLE: Render products from API
   ============================================================ */
async function loadProductsView() {
  try {
    const products = await fetchProducts();
    const grid = document.querySelector('#view-products .products-grid');
    if (!grid || !products.length) return;

    grid.innerHTML = products.map(p => {
      const stockClass = p.status === 'In Stock' ? 'stock-in'
                       : p.status === 'Low Stock' ? 'stock-low'
                       : 'stock-out';
      const stockLabel = p.stock > 10 ? `In Stock (${p.stock})`
                       : p.stock > 0  ? `Low Stock (${p.stock})`
                       : 'Out of Stock';
      return `
        <div class="product-card" data-product-id="${p.id}">
          <div class="product-header-banner" style="background:none;padding:0;">
            ${p.imageUrl
              ? `<img src="${p.imageUrl}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`
              : `<div style="height:160px;display:flex;align-items:center;justify-content:center;font-size:3rem;">📦</div>`}
            <span class="product-stock-badge ${stockClass}">${stockLabel}</span>
          </div>
          <div class="product-card-content">
            <span class="product-category-tag">${p.category}</span>
            <h3 class="product-title">${p.title}</h3>
            <span class="product-sku">SKU: ${p.sku || 'N/A'}</span>
            <div class="product-price-row">
              <span class="product-price">${formatINR(p.price)}</span>
              <button class="btn btn-outline" style="padding:4px 12px;font-size:0.75rem;"
                onclick="window.showToast('Editing ${p.title.replace(/'/g, '')}')">Edit</button>
            </div>
          </div>
        </div>`;
    }).join('');

    console.log(`[AuraCommerce API] Loaded ${products.length} products from Spring Boot backend.`);
  } catch (err) {
    console.warn('[AuraCommerce API] Products fallback to static HTML.', err.message);
  }
}

/* ============================================================
   ORDERS TABLE: Render orders from API
   ============================================================ */
async function loadOrdersView() {
  try {
    const orders = await fetchOrders();
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody || !orders.length) return;

    tbody.innerHTML = orders.map(o => {
      const statusClass = o.status === 'Completed' ? 'badge-success'
                        : o.status === 'Shipped'   ? 'badge-info'
                        : o.status === 'Processing'? 'badge-warning'
                        : 'badge-danger';
      return `
        <tr data-status="${o.status}">
          <td data-label="Order">#${o.orderNumber}</td>
          <td data-label="Customer"><strong>${o.customerName}</strong></td>
          <td data-label="Items">${o.itemsDescription || `${o.itemsCount} item(s)`}</td>
          <td data-label="Amount">${formatINR(o.totalAmount)}</td>
          <td data-label="Payment">${o.paymentMethod || '—'}</td>
          <td data-label="Status"><span class="badge ${statusClass}">${o.status}</span></td>
        </tr>`;
    }).join('');

    console.log(`[AuraCommerce API] Loaded ${orders.length} orders from Spring Boot backend.`);
  } catch (err) {
    console.warn('[AuraCommerce API] Orders fallback to static HTML.', err.message);
  }
}

/* ============================================================
   CUSTOMERS TABLE: Render customers from API
   ============================================================ */
async function loadCustomersView() {
  try {
    const customers = await fetchCustomers();
    const tbody = document.querySelector('#view-customers .table-responsive tbody');
    if (!tbody || !customers.length) return;

    tbody.innerHTML = customers.map(c => {
      const tierClass = c.tier === 'VIP' ? 'badge-warning' : 'badge-info';
      const statusClass = c.status === 'Active' ? 'badge-success' : 'badge-danger';
      return `
        <tr>
          <td data-label="Customer"><strong>${c.name}</strong><br><span style="color:var(--text-secondary);font-size:0.8rem">${c.email}</span></td>
          <td data-label="Phone">${c.phone || '—'}</td>
          <td data-label="Total Spent">${formatINR(c.totalSpent)}</td>
          <td data-label="Orders">${c.totalOrders}</td>
          <td data-label="Tier"><span class="badge ${tierClass}">${c.tier}</span></td>
          <td data-label="Status"><span class="badge ${statusClass}">${c.status}</span></td>
        </tr>`;
    }).join('');

    console.log(`[AuraCommerce API] Loaded ${customers.length} customers from Spring Boot backend.`);
  } catch (err) {
    console.warn('[AuraCommerce API] Customers fallback to static HTML.', err.message);
  }
}

/* ============================================================
   PRODUCT MODAL: Submit form via POST /api/products
   ============================================================ */
function wireProductModal() {
  const form = document.getElementById('productForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation(); // prevent duplicate handling in app.js

    const productData = {
      title: document.getElementById('prodName')?.value?.trim() || '',
      category: document.getElementById('prodCategory')?.value || 'Electronics',
      price: parseFloat(document.getElementById('prodPrice')?.value || 0),
      stock: parseInt(document.getElementById('prodStock')?.value || 0, 10),
      sku: 'SKU-' + Math.floor(1000 + Math.random() * 9000),
    };

    try {
      const created = await createProduct(productData);
      window.showToast(`✅ Product "${created.title}" saved to Spring Boot backend!`);
      form.reset();
      document.getElementById('productModal')?.classList.remove('active');
      document.body.style.overflow = '';
      // Refresh products view if visible
      if (document.getElementById('view-products')?.classList.contains('active')) {
        await loadProductsView();
      }
    } catch (err) {
      console.error('[AuraCommerce API] Failed to create product:', err);
      window.showToast('⚠️ Could not reach backend. Product not saved.');
    }
  }, true); // capture phase so it fires before app.js's bubble-phase listener
}

/* ============================================================
   STATUS BADGE: Show API backend connection status
   ============================================================ */
function showApiStatusBadge(connected) {
  const header = document.querySelector('.header-actions');
  if (!header) return;

  const existing = document.getElementById('apiStatusBadge');
  if (existing) existing.remove();

  const badge = document.createElement('span');
  badge.id = 'apiStatusBadge';
  badge.style.cssText = `
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 999px; font-size: 0.72rem; font-weight: 600;
    background: ${connected ? '#d1fae5' : '#fee2e2'};
    color: ${connected ? '#065f46' : '#991b1b'};
  `;
  badge.innerHTML = `
    <span style="width:7px;height:7px;border-radius:50%;background:${connected ? '#10b981' : '#ef4444'}"></span>
    ${connected ? 'Spring Boot API ✓' : 'API Offline (static)'}
  `;
  header.prepend(badge);
}

/* ============================================================
   MAIN INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', async () => {
  const online = await isBackendAvailable();
  showApiStatusBadge(online);

  if (online) {
    await Promise.all([
      loadDashboardStats(),
      loadOrdersView(),
      loadProductsView(),
      loadCustomersView(),
    ]);
    await wireChartToApi();
    console.log('[AuraCommerce API] All views loaded from Spring Boot backend.');
  } else {
    console.warn('[AuraCommerce API] Backend offline — using static demo data.');
  }

  wireProductModal();
});

/* Reload data when user navigates to a view section */
document.addEventListener('click', async (e) => {
  const navItem = e.target.closest('.nav-item[data-view]');
  if (!navItem) return;

  const view = navItem.getAttribute('data-view');
  const online = await isBackendAvailable();
  if (!online) return;

  if (view === 'products') await loadProductsView();
  else if (view === 'orders') await loadOrdersView();
  else if (view === 'customers') await loadCustomersView();
  else if (view === 'dashboard') await loadDashboardStats();
});
