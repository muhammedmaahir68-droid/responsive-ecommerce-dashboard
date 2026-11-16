/**
 * ==========================================================================
 * AURA COMMERCE - API SERVICE (js/api.js)
 * --------------------------------------------------------------------------
 * Talks to the Spring Boot REST backend at http://localhost:8080
 * Falls back to static/hardcoded mode when backend is offline.
 * ==========================================================================
 */

const API_BASE = 'http://localhost:8080/api';

async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

/* ---- Dashboard ---- */
export async function fetchDashboardStats() {
  return apiFetch('/dashboard/stats');
}
export async function fetchChartData(range = '7D') {
  return apiFetch(`/dashboard/chart?range=${range}`);
}

/* ---- Products ---- */
export async function fetchProducts(params = {}) {
  const q = new URLSearchParams(params).toString();
  return apiFetch(`/products${q ? '?' + q : ''}`);
}
export async function createProduct(data) {
  return apiFetch('/products', { method: 'POST', body: JSON.stringify(data) });
}
export async function updateProduct(id, data) {
  return apiFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}
export async function deleteProduct(id) {
  const url = `${API_BASE}/products/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  return res.ok;
}

/* ---- Orders ---- */
export async function fetchOrders(params = {}) {
  const q = new URLSearchParams(params).toString();
  return apiFetch(`/orders${q ? '?' + q : ''}`);
}
export async function createOrder(data) {
  return apiFetch('/orders', { method: 'POST', body: JSON.stringify(data) });
}
export async function updateOrderStatus(id, status) {
  return apiFetch(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
}

/* ---- Customers ---- */
export async function fetchCustomers(params = {}) {
  const q = new URLSearchParams(params).toString();
  return apiFetch(`/customers${q ? '?' + q : ''}`);
}
export async function createCustomer(data) {
  return apiFetch('/customers', { method: 'POST', body: JSON.stringify(data) });
}
export async function updateCustomer(id, data) {
  return apiFetch(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}
