import React from 'react';

export function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-4 mb-8 ${className}`}>
      <div className="w-6 h-[1px] bg-[var(--color-accent)]"></div>
      <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--color-accent)]">
        {children}
      </span>
    </div>
  );
}
