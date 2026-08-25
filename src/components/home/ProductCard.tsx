import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiPackage, FiArrowRight } from 'react-icons/fi';
import { Product } from '../../types/index.js';

interface ProductCardProps {
  product: Product;
  onRequestQuote?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onRequestQuote,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const {
    id,
    name,
    category,
    grade,
    price,
    moq,
    badge,
    badgeColor = 'bg-[#174A8B]',
    image,
    stock = 'in-stock',
    slug,
  } = product || {};

  const productUrl = `/products/${slug || id}`;
  const displayPrice = price && price.includes('$') ? price.replace('$', '₹ ') : price || '₹ -- / unit';

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md hover:border-[#174A8B]/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden h-full">
      {/* Top Image Container */}
      <Link to={productUrl} className="relative h-60 w-full bg-[#F7F8FA] overflow-hidden block border-b border-[#E4E7EC]">
        {!imgLoaded && <div className="absolute inset-0 bg-gray-200/60 animate-pulse" />}

        <img
          src={image}
          alt={name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {badge && (
          <span
            className={`absolute top-3.5 left-3.5 ${badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wider z-10`}
          >
            {badge}
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist?.(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-[#E4E7EC] shadow-sm flex items-center justify-center text-gray-400 hover:text-rose-500 hover:scale-105 transition-all duration-200 z-10 ${
            isWishlisted ? 'text-rose-500 fill-rose-500' : ''
          }`}
        >
          <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>
      </Link>

      {/* Card Content Area */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#174A8B] block mb-1">
            {category}
          </span>

          <Link to={productUrl}>
            <h3 className="font-bold text-[#101828] text-base leading-snug group-hover:text-[#174A8B] transition-colors line-clamp-2 mb-1 min-h-[2.5em]">
              {name}
            </h3>
          </Link>

          <p className="text-xs text-[#667085] font-normal mb-4">{grade || 'Virgin PP / ABS'}</p>

          <div className="flex items-center justify-between text-xs text-[#667085] font-medium mb-4 pt-3 border-t border-[#E4E7EC]">
            <div className="flex items-center gap-1.5 font-semibold text-[#101828]">
              <FiPackage className="w-4 h-4 text-[#667085]" />
              <span>{moq || 'MOQ 100 pcs'}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[#16A36A] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#16A36A] inline-block" />
              <span>{stock === 'in-stock' ? 'In Stock' : 'In Stock'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E4E7EC]">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-[#101828]">{displayPrice}</span>
          </div>

          <button
            type="button"
            onClick={() => onRequestQuote?.(product)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#174A8B] text-white text-xs font-semibold hover:bg-[#2563B5] transition-all shadow-sm group/btn"
          >
            <span>Get Quote</span>
            <FiArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
