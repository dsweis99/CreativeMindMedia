import React from 'react';

export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto text-[var(--color-accent)]">
        <path d="M 15 45 A 35 35 0 0 1 85 45 L 68 45 A 18 18 0 0 0 32 45 Z" fill="currentColor" />
        <rect x="26" y="56" width="48" height="14" rx="1" fill="currentColor" />
        <rect x="36" y="74" width="28" height="12" rx="1" fill="currentColor" />
      </svg>
      <span className="font-display text-lg md:text-xl tracking-widest text-[var(--color-text-primary)] uppercase hidden sm:inline-block mt-1 whitespace-nowrap">
        Creative Minds Media
      </span>
    </div>
  );
}
