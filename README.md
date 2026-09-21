# 🚀 AuraCommerce - Modern Responsive E-Commerce Dashboard

A production-grade, zero-dependency, ultra-responsive frontend web dashboard designed to serve as both a real-world frontend application and an educational reference architecture for training staff on modern responsive web development.

---

## 🌟 Key Features
- **100% Frontend Only**: Zero backend required; works directly out of the box.
- **Adaptive Layout**: Desktop 2-column shell, tablet adaptive view, and mobile off-canvas drawer.
- **Fluid Typography**: Uses CSS `clamp()` for smooth, formula-based text scaling.
- **Auto-Fit CSS Grids**: Metric cards automatically wrap across 4, 3, 2, and 1 columns without media queries.
- **Interactive Pure SVG Chart**: Responsive revenue performance area chart with time range switching (7D, 30D, 1Y) and hover tooltips.
- **Responsive Table-to-Card Pattern**: Orders table flips into card view on mobile screens.
- **Dark / Light Mode**: Instant CSS variable-driven theme switcher with `localStorage` persistence.
- **Staff Explain Mode**: Interactive visual HUD that draws bounding outlines around CSS Grid and Flexbox containers.
- **Real-Time Breakpoint HUD**: Header badge showing current device dimensions and active media query.

---

## 📁 Architecture & File Structure

```
responsive-ecommerce-dashboard/
├── index.html                  # Semantic HTML5 markup with teaching annotations
├── package.json                # Optional dev server scripts
├── STAFF_TRAINING_GUIDE.md     # Complete presentation guide for your team
├── README.md                   # Project overview & instructions
├── assets/                     # Graphics & icons
├── css/
│   ├── reset.css               # Box-sizing border-box baseline
│   ├── variables.css           # Design tokens, color system, spacing scale
│   ├── layout.css              # Macro layout grid, header, sidebar, fluid containers
│   ├── components.css          # Cards, buttons, tables, badges, modal dialog
│   └── responsive.css          # Media queries for tablet, mobile, and small screens
└── js/
    └── app.js                  # Drawer toggle, theme switcher, chart, filters, HUD
```

---

## ⚡ How to Run

### Method 1: Instant Launch (No Tools Required)
Simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Safari, or Firefox!

### Method 2: Local Development Server
If you prefer running with a local server:
```bash
npm run dev
```
Then visit `http://localhost:3000` in your browser.

---

## 🎓 Staff Training
To explain this project to staff, open `STAFF_TRAINING_GUIDE.md` or press the **"💡 Explain Mode"** button inside the app to see live layout outlines.
