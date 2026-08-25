import React, { useState } from 'react';
import { FiPhoneCall, FiMessageCircle } from 'react-icons/fi';

const FloatingContactWidget: React.FC = () => {
  const [hovered, setHovered] = useState<'phone' | 'whatsapp' | null>(null);

  const whatsappNumber = '919118913028';
  const phoneNumber = '+919118913028';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello B&B Plastic Factory Desk, I'm interested in bulk wholesale inquiry."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3.5 select-none pointer-events-auto">
      {/* Phone Call Floating Button */}
      <div className="relative flex items-center group">
        <div
          className={`mr-3 px-3.5 py-1.5 rounded-xl bg-secondary/95 text-white text-xs font-bold shadow-lg backdrop-blur-sm whitespace-nowrap transition-all duration-200 pointer-events-none ${
            hovered === 'phone' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          Call Factory Sales: +91 91189 13028
        </div>

        <a
          href={`tel:${phoneNumber}`}
          onMouseEnter={() => setHovered('phone')}
          onMouseLeave={() => setHovered(null)}
          aria-label="Call Factory Sales Direct"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#174A8B] hover:bg-[#2563B5] text-white flex items-center justify-center shadow-xl shadow-[#174A8B]/35 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
        >
          <FiPhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>

      {/* WhatsApp Floating Button */}
      <div className="relative flex items-center group">
        <div
          className={`mr-3 px-3.5 py-1.5 rounded-xl bg-secondary/95 text-white text-xs font-bold shadow-lg backdrop-blur-sm whitespace-nowrap transition-all duration-200 pointer-events-none ${
            hovered === 'whatsapp' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          Direct Trade Desk WhatsApp
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered('whatsapp')}
          onMouseLeave={() => setHovered(null)}
          aria-label="Chat on WhatsApp"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35 pointer-events-none" />
          <FiMessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
        </a>
      </div>
    </div>
  );
};

export default FloatingContactWidget;
