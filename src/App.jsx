import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import Contact from './pages/public/Contact.jsx';
import Help from './pages/public/Help.jsx';
import Products from './pages/public/Products.jsx';
import ProductDetail from './pages/public/ProductDetail.jsx';
import FloatingContactWidget from './components/common/FloatingContactWidget.jsx';

// Admin Imports
import Login from './pages/admin/Login.jsx';
import DashboardLayout from './pages/admin/DashboardLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<div className="text-2xl font-bold">Products Management</div>} />
          <Route path="categories" element={<div className="text-2xl font-bold">Categories Management</div>} />
          <Route path="messages" element={<div className="text-2xl font-bold">Inquiries Management</div>} />
          <Route path="settings" element={<div className="text-2xl font-bold">System Settings</div>} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen bg-background text-secondary overflow-x-hidden">
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
              </Routes>
            </main>
            <FloatingContactWidget />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
