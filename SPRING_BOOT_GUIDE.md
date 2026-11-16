# 🍃 AuraCommerce — Spring Boot Backend Integration

## Project Structure (after integration)

```
responsive-ecommerce-dashboard/
├── index.html                        # Existing responsive frontend
├── js/
│   ├── app.js                        # Existing frontend logic
│   ├── api.js                        # NEW: REST client (fetch wrappers)
│   └── api-integration.js           # NEW: Loads live data into the UI
├── css/ ...                          # Existing CSS modules
│
└── backend/                          # NEW: Spring Boot 3.4.3 project
    ├── pom.xml                       # Maven build: web + JPA + H2 + validation
    ├── mvnw / mvnw.cmd               # Maven wrapper (no install needed)
    ├── .mvn/jvm.config               # Windows TLS fix (WINDOWS-ROOT truststore)
    └── src/main/java/com/auracommerce/backend/
        ├── BackendApplication.java   # @SpringBootApplication entry point
        ├── config/
        │   ├── WebConfig.java        # CORS + static serving config
        │   └── DataSeeder.java       # Seeds 6 products, 8 orders, 8 customers
        ├── model/
        │   ├── Product.java          # JPA entity (id, title, category, sku, price, stock, status)
        │   ├── Order.java            # JPA entity (orderNumber, customerName, status, totalAmount)
        │   ├── Customer.java         # JPA entity (name, email, tier, totalSpent)
        │   └── DashboardStats.java   # DTO (revenue, orders, customers, chart data)
        ├── repository/
        │   ├── ProductRepository.java
        │   ├── OrderRepository.java
        │   └── CustomerRepository.java
        ├── service/
        │   ├── ProductService.java
        │   ├── OrderService.java
        │   ├── CustomerService.java
        │   └── DashboardService.java
        └── controller/
            ├── ProductController.java    # /api/products  (GET/POST/PUT/DELETE)
            ├── OrderController.java      # /api/orders    (GET/POST/PATCH/DELETE)
            ├── CustomerController.java   # /api/customers (GET/POST/PUT/DELETE)
            └── DashboardController.java  # /api/dashboard (GET stats & chart)
```

---

## 🚀 How to Run

### Prerequisites
- Java 17 (already installed at `C:\Program Files\Java\jdk-17`)
- No Maven install needed (Maven Wrapper `mvnw.cmd` is bundled)

### Step 1 — Start the Spring Boot backend

Open a terminal in the project root:

```cmd
cd responsive-ecommerce-dashboard\backend

set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=C:\Program Files\Java\jdk-17\bin;%PATH%

mvnw.cmd spring-boot:run
```

The server starts at **http://localhost:8080**

> **First run only:** Maven downloads dependencies (~3 min). Subsequent starts take ~5 seconds.

### Step 2 — Open the dashboard

Option A — Served by Spring Boot (recommended):
```
http://localhost:8080
```

Option B — Open `index.html` directly in your browser (also works; API calls go to localhost:8080).

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard/stats` | Revenue, orders, customers counts + chart data |
| `GET` | `/api/dashboard/chart?range=7D` | Chart values for `7D`, `30D`, or `1Y` |
| `GET` | `/api/products` | All products (filter: `?category=Electronics&search=keyboard`) |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/{id}` | Update product |
| `DELETE` | `/api/products/{id}` | Delete product |
| `GET` | `/api/orders` | All orders (filter: `?status=Processing&search=ORD`) |
| `POST` | `/api/orders` | Create order |
| `PATCH` | `/api/orders/{id}/status` | Update order status |
| `GET` | `/api/customers` | All customers (filter: `?tier=VIP`) |
| `POST` | `/api/customers` | Create customer |
| `PUT` | `/api/customers/{id}` | Update customer |

---

## 🗄️ Database (H2 In-Memory)

Access the H2 console at **http://localhost:8080/h2-console**

| Field | Value |
|-------|-------|
| JDBC URL | `jdbc:h2:mem:auracommerce` |
| User | `sa` |
| Password | _(blank)_ |

> Data is seeded automatically on startup and resets on restart. To persist data, change `spring.datasource.url` in `application.properties` to a file-based H2 URL or swap in MySQL/PostgreSQL.

---

## 🔌 Frontend Integration

The frontend auto-detects whether the backend is running:

- **Backend online →** Green `Spring Boot API ✓` badge appears in the header. Live data from H2 populates metric cards, the orders table, products grid, and customers table.
- **Backend offline →** Red `API Offline (static)` badge. The dashboard falls back to the original hardcoded HTML — no broken UI.

The **"Save Product"** modal now POSTs to `/api/products` and refreshes the products grid automatically.

---

## 🔧 Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
server.port=8080                    # Change port here
spring.h2.console.enabled=true      # Disable in production
spring.jpa.show-sql=false           # Set true for SQL debugging
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5 + Vanilla CSS (Grid/Flexbox) + Vanilla JS |
| Backend | Java 17 + Spring Boot 3.4.3 |
| ORM | Spring Data JPA + Hibernate |
| Database | H2 (in-memory, dev) |
| Build | Maven 3.10 (wrapper bundled) |
| API Style | REST + JSON |
| CORS | Configured for all origins (dev mode) |
