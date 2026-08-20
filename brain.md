# B&B Plastic — Master Project Documentation & Full-Stack Blueprint (`brain.md`)

## 1. Project Overview & Business Context

**B&B Plastic** is an enterprise-grade industrial manufacturing and B2B trade platform specializing in high-grade polymer molding, heavy-duty industrial storage crates, pediatric seating solutions, food-grade virgin containers, and custom mold fabrication.

### Core Architecture
1. **Public B2B Showroom (`/`)**: Product catalog presentation, specifications, FOB tier pricing, and direct RFQ inquiry submission.
2. **Admin Management Portal (`/admin/*`)**: Secure dashboard for real-time inquiry management, catalog CRUD, category organization, and KPI monitoring.
3. **Express + MongoDB Backend (`/backend`)**: Robust REST API with MongoDB Atlas, Mongoose schemas, JWT authentication, bcrypt password hashing, security headers (Helmet), CORS, and rate limiting.

---

## 2. Full-Stack Technology Matrix

| Layer | Technology | Usage Details |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** + **Vite 8** | Modern SPA with fast HMR & production build bundling |
| **Frontend State & Data** | **Redux Toolkit** + **RTK Query** | Persistent state layer (`productsSlice`, `inquiriesSlice`, `categoriesSlice`, `authSlice`) |
| **Styling & Icons** | **TailwindCSS 3.4** + **React Icons** + **Framer Motion** | B&B industrial brand theme, modal animations, and responsive drawers |
| **Backend Framework** | **Node.js** + **Express.js** | Modular REST API service with route handlers and middleware |
| **Database & ORM** | **MongoDB Atlas** + **Mongoose** | Document data store with schema validation and indexing |
| **Authentication & Security**| **JWT** + **bcryptjs** + **Helmet** + **RateLimit** | HTTP-only cookie + Bearer token auth, password hashing (12 rounds) |
| **Routing & SEO** | **React Router v7** + **React Helmet Async** | Protected nested admin layout and dynamic meta tags |

---

## 3. Directory Layout

```
B&B plastic/
├── backend/                    # Express + MongoDB REST API Service
│   ├── config/
│   │   └── db.js               # MongoDB connection handler
│   ├── models/
│   │   ├── Admin.js            # Admin user schema with bcrypt hashing
│   │   ├── Product.js          # Product catalog schema
│   │   ├── Inquiry.js          # Client inquiry & notes schema
│   │   └── Category.js         # Technical category schema
│   ├── routes/
│   │   ├── auth.js             # POST /login, GET /me, POST /logout
│   │   ├── products.js         # Full Product CRUD & stock toggles
│   │   ├── inquiries.js        # Public submission & Admin management
│   │   ├── categories.js       # Category CRUD & dynamic product counts
│   │   └── dashboard.js        # KPI statistics & recent RFQ summaries
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   ├── .env.example            # Environment configuration template
│   ├── seeder.js               # Initial database seeder script
│   └── server.js               # Express application entry point
│
├── BandB/                      # Frontend Single Page Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # ProtectedRoute, Toast, Logo, FloatingWidget
│   │   │   ├── home/           # Hero, FeaturedProducts, Categories, Stats
│   │   │   └── layout/         # Navbar, Footer
│   │   ├── features/           # Redux state slices (products, inquiries, categories, auth)
│   │   ├── pages/
│   │   │   ├── admin/          # Dashboard, ProductsManager, CategoriesManager, Inquiries, Settings, Login
│   │   │   └── public/         # Home, About, Contact, Products, ProductDetail, Help
│   │   ├── store/              # Redux store configuration
│   │   ├── App.jsx             # Main Router & Route Guards
│   │   └── index.css           # Tailwind design tokens
│   ├── package.json
│   └── vite.config.js          # Vite server with /api proxy to backend:5000
│
├── brain.md                    # Master knowledge blueprint
└── README.md
```

---

## 4. API Endpoints Reference

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Authenticate admin & generate JWT token |
| `GET` | `/api/auth/me` | Private | Retrieve active admin profile |
| `POST` | `/api/auth/logout` | Public | Invalidate auth session |
| `GET` | `/api/products` | Public | Retrieve catalog products with filters |
| `POST` | `/api/products` | Private | Create new product |
| `PUT` | `/api/products/:id` | Private | Update product details |
| `PATCH`| `/api/products/:id/stock` | Private | Quick toggle stock status |
| `DELETE`| `/api/products/:id` | Private | Delete product from catalog |
| `GET` | `/api/inquiries` | Private | List inquiries (filter by status/search) |
| `POST` | `/api/inquiries` | Public | Submit quotation request from website |
| `PATCH`| `/api/inquiries/:id/status` | Private | Update inquiry status (new, in-progress, resolved, archived) |
| `POST` | `/api/inquiries/:id/notes` | Private | Append internal team note |
| `DELETE`| `/api/inquiries/:id` | Private | Delete inquiry record |
| `GET` | `/api/categories` | Public | List categories with live product tallies |
| `POST` | `/api/categories` | Private | Create category |
| `PUT` | `/api/categories/:id` | Private | Update category |
| `DELETE`| `/api/categories/:id` | Private | Delete category |
| `GET` | `/api/dashboard/stats` | Private | Retrieve live dashboard KPI counters |

---

## 5. Deployment Guide

### A. Backend on Render.com
1. Connect repository on Render $\rightarrow$ Create **Web Service**.
2. Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Environment Variables:
   - `MONGODB_URI`: MongoDB Atlas connection string.
   - `JWT_SECRET`: Secure encryption key.
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: URL of your deployed frontend.

### B. Frontend on Vercel
1. Connect repository on Vercel $\rightarrow$ Select `BandB` folder.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Environment Variables:
   - `VITE_API_URL`: Your backend service URL (e.g. `https://your-backend.onrender.com/api`).
