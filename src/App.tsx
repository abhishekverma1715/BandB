import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch } from './store/store.js';
import { fetchProducts } from './features/products/productsSlice.js';
import { fetchCategories } from './features/categories/categoriesSlice.js';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import Contact from './pages/public/Contact.jsx';
import Help from './pages/public/Help.jsx';
import Products from './pages/public/Products.jsx';
import ProductDetail from './pages/public/ProductDetail.jsx';
import FloatingContactWidget from './components/common/FloatingContactWidget.jsx';
import ToastProvider from './components/common/Toast.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

// Admin Imports
import Login from './pages/admin/Login.jsx';
import DashboardLayout from './pages/admin/DashboardLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ProductsManager from './pages/admin/ProductsManager.jsx';
import CategoriesManager from './pages/admin/CategoriesManager.jsx';
import Inquiries from './pages/admin/Inquiries.jsx';
import Settings from './pages/admin/Settings.jsx';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Admin Authentication */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductsManager />} />
            <Route path="categories" element={<CategoriesManager />} />
            <Route path="messages" element={<Inquiries />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen bg-background text-secondary overflow-x-hidden font-sans">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/product/:slug" element={<ProductDetail />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <FloatingContactWidget />
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;
