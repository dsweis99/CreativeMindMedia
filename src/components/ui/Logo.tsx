import React from 'react';

interface LogoProps {
  className?: string;
  labelClassName?: string;
  variant?: 'default' | 'stacked';
}

export function Logo({ className = "h-8", labelClassName = "", variant = 'default' }: LogoProps) {
  if (variant === 'stacked') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto text-[var(--color-accent)]">
          <path d="M 15 45 A 35 35 0 0 1 85 45 L 68 45 A 18 18 0 0 0 32 45 Z" fill="currentColor" />
          <rect x="26" y="56" width="48" height="14" rx="1" fill="currentColor" />
          <rect x="36" y="74" width="28" height="12" rx="1" fill="currentColor" />
        </svg>
        <div className="flex flex-col text-[var(--color-accent)]" style={{ lineHeight: 0.85 }}>
          <span className="font-display tracking-widest uppercase font-bold" style={{ fontSize: '30px' }}>Creative</span>
          <span className="font-display tracking-widest uppercase font-bold" style={{ fontSize: '30px' }}>Minds</span>
          <span className="font-display tracking-widest uppercase font-bold" style={{ fontSize: '30px' }}>Media</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto text-[var(--color-accent)]">
        <path d="M 15 45 A 35 35 0 0 1 85 45 L 68 45 A 18 18 0 0 0 32 45 Z" fill="currentColor" />
        <rect x="26" y="56" width="48" height="14" rx="1" fill="currentColor" />
        <rect x="36" y="74" width="28" height="12" rx="1" fill="currentColor" />
      </svg>
      <span className={`font-display text-lg md:text-xl tracking-widest text-[var(--color-text-primary)] uppercase hidden sm:inline-block mt-1 whitespace-nowrap ${labelClassName}`}>
        Creative Minds Media
      </span>
    </div>
  );
}
