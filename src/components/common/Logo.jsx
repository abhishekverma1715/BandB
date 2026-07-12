import React from 'react';

const Logo = ({ variant = 'horizontal', dark = false, className = '' }) => {
  const redColor = '#B2151E';
  const blueColor = dark ? '#60A5FA' : '#023061';
  const textColor = dark ? '#FFFFFF' : '#023061';
  const subtextColor = dark ? '#E2E8F0' : '#1E293B';

  const logoImgClass = `${className || 'h-10 w-auto'} object-contain flex-shrink-0 transition-transform duration-300 ${
    dark ? 'brightness-125 drop-shadow-[0_1px_4px_rgba(255,255,255,0.2)]' : ''
  }`;

  if (variant === 'icon') {
    return (
      <img
        src="/logo-exact.png"
        alt="B&B Plastics Monogram"
        className={logoImgClass}
      />
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center gap-3 select-none ${className}`}>
        <img
          src="/logo-exact.png"
          alt="B&B Plastics Monogram"
          className="h-20 sm:h-24 w-auto object-contain"
        />
        <div className="flex flex-col items-center leading-none text-center">
          <div className="flex items-baseline text-4xl sm:text-5xl font-black tracking-tight">
            <span style={{ color: redColor }}>B</span>
            <span style={{ color: textColor }}>&amp;B</span>
          </div>
          <div
            className="text-sm font-extrabold tracking-[0.32em] uppercase mt-1.5"
            style={{ color: subtextColor }}
          >
            PLASTICS
          </div>
          <div className="flex items-center gap-3 mt-3">
            <span className="h-0.5 w-8" style={{ backgroundColor: textColor }}></span>
            <span
              className="text-[11px] font-bold tracking-[0.18em] uppercase"
              style={{ color: textColor }}
            >
              STRONGER BY QUALITY. TRUSTED FOR LIFE.
            </span>
            <span className="h-0.5 w-8" style={{ backgroundColor: textColor }}></span>
          </div>
        </div>
      </div>
    );
  }

  // Horizontal Navbar Variant (Monogram Icon + Crisp Brand Typography)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img
        src="/logo-exact.png"
        alt="B&B Plastics Monogram"
        className={logoImgClass}
      />

      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline text-2xl font-black tracking-tight">
          <span style={{ color: redColor }}>B</span>
          <span style={{ color: textColor }}>&amp;B</span>
        </div>
        <div
          className="text-[10px] font-extrabold tracking-[0.28em] uppercase mt-0.5"
          style={{ color: subtextColor }}
        >
          PLASTICS
        </div>
      </div>
    </div>
  );
};

export default Logo;
