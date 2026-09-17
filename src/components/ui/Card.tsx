import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  key?: React.Key;
}

export function Card({ children, className = '', hoverEffect = true }: CardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, borderColor: 'var(--color-accent)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-sm p-8 transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
}
