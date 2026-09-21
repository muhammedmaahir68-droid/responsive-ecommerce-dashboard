/**
 * ==========================================================================
 * AURA COMMERCE - CLIENT APP SCRIPT (js/app.js)
 * --------------------------------------------------------------------------
 * Handles responsive drawer navigation, interactive SVG analytics chart,
 * dark mode toggling, table search/filters, and the Live Staff Inspector HUD.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize all sub-modules
  initResponsiveDrawer();
  initThemeToggle();
  initBreakpointHUD();
  initExplainMode();
  initSalesChart();
  initOrdersFilter();
  initModal();
  initViewRouter();
});

/* ==========================================================================
   MODULE 1: RESPONSIVE MOBILE DRAWER
   Handles opening, closing, overlay click, and ESC key dismissal.
   ========================================================================== */
function initResponsiveDrawer() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!hamburgerBtn || !sidebar || !overlay) return;

  function openDrawer() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling on mobile
  }

  function closeDrawer() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', closeDrawer);

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close drawer automatically if user resizes back to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && sidebar.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   MODULE 2: DARK / LIGHT MODE SWITCHER
   Stores preference in localStorage for returning users.
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('aura_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('aura_theme', nextTheme);
    updateThemeIcon(nextTheme);
  });

  function updateThemeIcon(theme) {
    themeBtn.innerHTML = theme === 'dark'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

/* ==========================================================================
   MODULE 3: LIVE BREAKPOINT HUD (For Teaching Staff)
   Shows exact window dimensions & device classification in real-time.
   ========================================================================== */
function initBreakpointHUD() {
  const hudElement = document.getElementById('breakpointHUD');
  if (!hudElement) return;

  function updateHUD() {
    const width = window.innerWidth;
    let label = '';
    let color = '';

    if (width < 480) {
      label = `Mobile (<480px): ${width}px`;
    } else if (width <= 768) {
      label = `Mobile/Phablet (≤768px): ${width}px`;
    } else if (width <= 1024) {
      label = `Tablet (≤1024px): ${width}px`;
    } else if (width <= 1280) {
      label = `Laptop (≤1280px): ${width}px`;
    } else {
      label = `Desktop (>1280px): ${width}px`;
    }

    hudElement.textContent = label;
  }

  window.addEventListener('resize', updateHUD);
  updateHUD(); // Initial call
}

/* ==========================================================================
   MODULE 4: "EXPLAIN MODE" TOGGLE
   Highlights CSS Grid & Flexbox containers with neon outlines so staff
   can visualize how the responsive boxes collapse and expand.
   ========================================================================== */
function initExplainMode() {
  const explainBtn = document.getElementById('explainModeBtn');
  if (!explainBtn) return;

  explainBtn.addEventListener('click', () => {
    document.body.classList.toggle('explain-mode-active');
    const isActive = document.body.classList.contains('explain-mode-active');
    explainBtn.style.backgroundColor = isActive ? '#f59e0b' : '';
    explainBtn.style.color = isActive ? '#ffffff' : '';
  });
}

/* ==========================================================================
   MODULE 5: RESPONSIVE INTERACTIVE SALES CHART (Pure SVG)
   Draws vector line and area chart without bulky third-party libraries.
   ========================================================================== */
function initSalesChart() {
  const chartPath = document.getElementById('chartLinePath');
  const chartArea = document.getElementById('chartAreaPath');
  const dotsContainer = document.getElementById('chartDotsContainer');
  const tooltip = document.getElementById('chartTooltip');
  const timeBtns = document.querySelectorAll('.time-btn');

  if (!chartPath || !chartArea) return;

  // Datasets for 7 Days, 30 Days, 1 Year
  const dataMap = {
    '7D': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [12400, 15800, 14200, 19800, 24500, 28900, 22400]
    },
    '30D': {
      labels: ['W1', 'W2', 'W3', 'W4'],
      values: [74000, 92000, 88500, 114200]
    },
    '1Y': {
      labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
      values: [280000, 340000, 390000, 480000, 560000, 640000]
    }
  };

  let currentRange = '7D';

  function renderChart(rangeKey) {
    const { labels, values } = dataMap[rangeKey];
    const width = 700;
    const height = 220;
    const paddingX = 40;
    const paddingY = 30;

    const minVal = Math.min(...values) * 0.85;
    const maxVal = Math.max(...values) * 1.1;

    // Calculate coordinates
    const points = values.map((val, idx) => {
      const x = paddingX + (idx / (values.length - 1)) * (width - paddingX * 2);
      const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
      return { x, y, val, label: labels[idx] };
    });

    // Build SVG Path (curved line with Bezier or straight lines)
    let dLine = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x + (curr.x - prev.x) / 2;
      const cp2x = cp1x;
      dLine += ` C ${cp1x},${prev.y} ${cp2x},${curr.y} ${curr.x},${curr.y}`;
    }

    const dArea = `${dLine} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

    chartPath.setAttribute('d', dLine);
    chartArea.setAttribute('d', dArea);

    // Render interactive data dots
    dotsContainer.innerHTML = '';
    points.forEach((pt) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pt.x);
      circle.setAttribute('cy', pt.y);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', 'var(--primary)');
      circle.setAttribute('stroke', 'var(--bg-surface)');
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('class', 'chart-dot');

      circle.addEventListener('mouseenter', (e) => {
        circle.setAttribute('r', '7');
        tooltip.innerHTML = `<strong>${pt.label}</strong>: ₹${pt.val.toLocaleString('en-IN')}`;
        tooltip.style.left = `${(pt.x / width) * 100}%`;
        tooltip.style.top = `${pt.y}px`;
        tooltip.style.opacity = '1';
      });

      circle.addEventListener('mouseleave', () => {
        circle.setAttribute('r', '5');
        tooltip.style.opacity = '0';
      });

      dotsContainer.appendChild(circle);
    });
  }

  // Handle Range Filter Clicks
  timeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      timeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentRange = btn.getAttribute('data-range');
      renderChart(currentRange);
    });
  });

  renderChart(currentRange);
}

/* ==========================================================================
   MODULE 6: ORDERS TABLE SEARCH & FILTERING
   Real-time search across table records and category tab switching.
   ========================================================================== */
function initOrdersFilter() {
  const searchInput = document.getElementById('tableSearchInput');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tableRows = document.querySelectorAll('#ordersTableBody tr');

  let activeTab = 'all';
  let searchTerm = '';

  function filterRows() {
    tableRows.forEach((row) => {
      const status = row.getAttribute('data-status') || '';
      const text = row.textContent.toLowerCase();

      const matchesTab = activeTab === 'all' || status.toLowerCase() === activeTab.toLowerCase();
      const matchesSearch = text.includes(searchTerm.toLowerCase());

      if (matchesTab && matchesSearch) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim();
      filterRows();
    });
  }

  tabBtns.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabBtns.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.getAttribute('data-tab');
      filterRows();
    });
  });
}

/* ==========================================================================
   MODULE 7: ACCESSIBLE PRODUCT MODAL DIALOG
   ========================================================================== */
function initModal() {
  const openBtn = document.getElementById('openModalBtn');
  const modal = document.getElementById('productModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelModalBtn');
  const modalForm = document.getElementById('productForm');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Product created and added to inventory.');
      modalForm.reset();
      closeModal();
    });
  }
}

/* ==========================================================================
   MODULE 8: SPA VIEW ROUTER (SIDEBAR NAVIGATION)
   Switches between Dashboard, Orders, Products, Customers, Analytics, Settings
   ========================================================================== */
function initViewRouter() {
  const navItems = document.querySelectorAll('.nav-item[data-view]');
  const views = document.querySelectorAll('.view-section');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  function switchView(viewId) {
    // 1. Update navigation active state
    navItems.forEach((item) => {
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 2. Switch visible view section
    views.forEach((view) => {
      if (view.id === `view-${viewId}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // 3. Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 4. Close mobile drawer if open
    if (sidebar && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // 5. Update URL hash
    window.location.hash = viewId;
  }

  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = item.getAttribute('data-view');
      if (viewId) {
        switchView(viewId);
      }
    });
  });

  // Handle direct hash navigation on page load
  if (window.location.hash) {
    const hashView = window.location.hash.replace('#', '');
    const validView = document.getElementById(`view-${hashView}`);
    if (validView) {
      switchView(hashView);
    }
  }
}

/* ==========================================================================
   GLOBAL TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
window.showToast = showToast;

