import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  FiShoppingCart, FiFileText, FiHeart, FiBarChart2,
  FiStar, FiCheckCircle, FiClock
} from 'react-icons/fi';

/**
 * ProductCard
 * Marketplace-grade product card: image, name, bulk price ladder,
 * MOQ, discount badge, stock state, and 4 conversion actions
 * (Add to Cart, Request Quote, Compare, Wishlist).
 */
const ProductCard = ({
  product,
  onAddToCart,
  onRequestQuote,
  onToggleCompare,
  onToggleWishlist,
  isCompared = false,
  isWishlisted = false,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const quickRotateX = useRef(null);
  const quickRotateY = useRef(null);
  const quickGlareX = useRef(null);
  const quickGlareOpacity = useRef(null);

  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const ensureQuickSetters = () => {
    if (!cardRef.current) return;
    if (!quickRotateX.current) {
      gsap.set(cardRef.current, { transformPerspective: 700, transformStyle: 'preserve-3d' });
      quickRotateX.current = gsap.quickTo(cardRef.current, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      quickRotateY.current = gsap.quickTo(cardRef.current, 'rotationY', { duration: 0.5, ease: 'power3.out' });
      quickGlareX.current = gsap.quickTo(glareRef.current, 'xPercent', { duration: 0.5, ease: 'power3.out' });
      quickGlareOpacity.current = gsap.quickTo(glareRef.current, 'opacity', { duration: 0.4 });
    }
  };

  const handleMouseMove = (e) => {
    if (reducedMotion || isTouch || !cardRef.current) return;
    ensureQuickSetters();
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 8;

    quickRotateX.current(rotateX);
    quickRotateY.current(rotateY);
    quickGlareX.current((px - 0.5) * 140);
    quickGlareOpacity.current(0.16);
  };

  const handleMouseLeave = () => {
    if (reducedMotion || isTouch || !cardRef.current) return;
    ensureQuickSetters();
    quickRotateX.current(0);
    quickRotateY.current(0);
    quickGlareOpacity.current(0);
    gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: 'power3.out' });
  };

  const handleMouseEnter = () => {
    if (reducedMotion || isTouch || !cardRef.current) return;
    gsap.to(cardRef.current, { scale: 1.015, duration: 0.3, ease: 'power2.out' });
  };

  const {
    name,
    category,
    grade,
    price,
    moq,
    rating,
    badge,
    badgeColor = 'bg-primary',
    image,
    stock = 'in-stock',
    discountPercent,
  } = product;

  const stockConfig = {
    'in-stock': { label: 'In Stock', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: <FiCheckCircle className="w-3.5 h-3.5" /> },
    'low-stock': { label: 'Low Stock', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: <FiClock className="w-3.5 h-3.5" /> },
    'made-to-order': { label: 'Made to Order', color: 'text-slate-600 bg-slate-100 border-slate-200', icon: <FiClock className="w-3.5 h-3.5" /> },
  };
  const stockInfo = stockConfig[stock] || stockConfig['in-stock'];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-2xl border border-gray-200 hover:border-primary/40 hover:shadow-2xl transition-[border-color,box-shadow] duration-300 flex flex-col overflow-hidden h-full will-change-transform"
    >
      <div
        ref={glareRef}
        className="pointer-events-none absolute top-0 left-0 w-1/2 h-56 bg-gradient-to-r from-white/0 via-white/60 to-white/0 opacity-0 z-10"
        style={{ transform: 'skewX(-20deg)' }}
      />

      <button
        onClick={() => onToggleWishlist?.(product)}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 ${isWishlisted
            ? 'bg-rose-50 border-rose-200 text-rose-500'
            : 'bg-white/90 border-gray-200 text-gray-400 hover:text-rose-500 hover:border-rose-200'
          }`}
      >
        <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
      </button>

      <Link to={`/products/${product.slug}`} className="relative block h-56 bg-gray-50 overflow-hidden">
        {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-gray-100" />}
        <img
          src={image}
          alt={name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {badge && (
            <span className={`${badgeColor} text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm w-fit uppercase tracking-wide`}>
              {badge}
            </span>
          )}
          {discountPercent ? (
            <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm w-fit">
              -{discountPercent}% Bulk
            </span>
          ) : null}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">{category}</span>
          {rating && (
            <span className="flex items-center gap-1 text-xs font-semibold text-gray-700">
              <FiStar className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {rating}
            </span>
          )}
        </div>

        <Link to={`/products/${product.slug}`}>
          <h3 className="font-bold text-secondary text-[15px] leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1 min-h-[2.6em]">
            {name}
          </h3>
        </Link>
        <p className="text-[11px] text-gray-500 font-mono mb-3">{grade}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md border ${stockInfo.color}`}>
            {stockInfo.icon} {stockInfo.label}
          </span>
          <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            {moq}
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-lg font-black text-secondary font-mono">{price}</span>
            <span className="text-[11px] text-gray-400">bulk rate</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => onAddToCart?.(product)}
              disabled={stock === 'made-to-order'}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </button>
            <button
              onClick={() => onRequestQuote?.(product)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gray-100 text-secondary text-xs font-bold hover:bg-gray-200 transition-colors"
            >
              <FiFileText className="w-3.5 h-3.5" />
              Get Quote
            </button>
          </div>

          <button
            onClick={() => onToggleCompare?.(product)}
            className={`w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold transition-colors ${isCompared ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-primary hover:bg-primary/5'
              }`}
          >
            <FiBarChart2 className="w-3.5 h-3.5" />
            {isCompared ? 'Added to Compare' : 'Add to Compare'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
