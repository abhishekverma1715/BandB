import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('specs');
  
  // Mock Data
  const product = {
    name: 'Premium Bucket 20L',
    code: 'BKT-20L-PRM',
    description: 'High-quality heavy-duty plastic bucket suitable for industrial and household use. Made with 100% virgin polymer for ultimate durability.',
    category: 'Buckets',
    stockStatus: 'In Stock',
    images: ['/hero-products/Gemini_Generated_Image_c6lfquc6lfquc6lf.png'],
    specifications: {
      capacity: '20 Liters',
      material: 'Virgin HDPE',
      dimensions: '35cm x 35cm x 40cm',
      weight: '800g',
      colors: ['Blue', 'Red', 'Green'],
      moq: 500,
      packaging: '50 units per nested bundle'
    }
  };

  const handleWhatsApp = () => {
    const message = `Hello B&B Plastics, I'm interested in the product: ${product.name} (${product.code}). Please share pricing and details.`;
    window.open(`https://wa.me/918808880012?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | B&B Plastics</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-white">
        {/* Editorial Product Header Banner */}
        <div className="relative py-14 sm:py-18 mb-12 border-b border-gray-800 overflow-hidden">
          <img
            src="/catalog-header-bg.jpg"
            alt="B&B Plastics Factory Production"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-900/75" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-sm sm:text-base text-gray-300 mb-3 flex items-center gap-2 font-medium">
              <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-blue-400 transition-colors">Wholesale Catalog</Link>
              <span>/</span>
              <span className="text-white font-bold">{product.name}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Factory-Direct Technical Specification
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
              <img src={product.images[0]} alt={product.name} className="max-w-full h-auto rounded-xl shadow-lg" />
            </div>

            {/* Details Section */}
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold mb-2 text-secondary">{product.name}</h1>
              <p className="text-gray-500 font-mono mb-6">Code: {product.code}</p>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10 border-b border-gray-200 pb-8">
                <button 
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 bg-[#25D366] text-white rounded-xl font-bold shadow-lg shadow-[#25D366]/30 hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <span>💬 WhatsApp Inquiry</span>
                </button>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto text-center justify-center px-6 sm:px-8 py-3.5 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-colors"
                >
                  Request Quote
                </Link>
              </div>

              {/* Tabs */}
              <div>
                <div className="flex gap-8 border-b border-gray-200 mb-6">
                  <button 
                    onClick={() => setActiveTab('specs')}
                    className={`pb-4 font-semibold text-lg transition-colors ${activeTab === 'specs' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                  >
                    Specifications
                  </button>
                  <button 
                    onClick={() => setActiveTab('packaging')}
                    className={`pb-4 font-semibold text-lg transition-colors ${activeTab === 'packaging' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                  >
                    Packaging Details
                  </button>
                </div>

                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <div><span className="text-gray-500 block text-sm">Capacity</span><span className="font-semibold">{product.specifications.capacity}</span></div>
                    <div><span className="text-gray-500 block text-sm">Material</span><span className="font-semibold">{product.specifications.material}</span></div>
                    <div><span className="text-gray-500 block text-sm">Dimensions</span><span className="font-semibold">{product.specifications.dimensions}</span></div>
                    <div><span className="text-gray-500 block text-sm">Weight</span><span className="font-semibold">{product.specifications.weight}</span></div>
                    <div><span className="text-gray-500 block text-sm">Colors</span><span className="font-semibold">{product.specifications.colors.join(', ')}</span></div>
                    <div><span className="text-gray-500 block text-sm">MOQ</span><span className="font-semibold">{product.specifications.moq} Units</span></div>
                  </div>
                )}
                
                {activeTab === 'packaging' && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-800">{product.specifications.packaging}</p>
                    <p className="text-sm text-gray-500 mt-2">Suitable for long-distance transport. Wrapped in protective layers.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
