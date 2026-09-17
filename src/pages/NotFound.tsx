import React from 'react';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';

export function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <Reveal delay={0.1}>
          <h1 className="font-display text-8xl md:text-9xl tracking-tight text-[var(--color-accent)] mb-4">404</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-6">Page Not Found</h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-[var(--color-text-muted)] mb-12">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <Button href="/" variant="primary">Return Home</Button>
        </Reveal>
      </div>
    </div>
  );
}
