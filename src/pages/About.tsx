import React from 'react';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';

export function About() {
  return (
    <div className="w-full">
      {/* PAGE HERO */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden bg-[var(--color-bg-primary)]">
        <div className="absolute top-[30%] right-[30%] w-[600px] h-[600px] bg-[var(--color-accent)] rounded-full blur-[150px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px] w-full relative z-20">
          <Reveal delay={0.1}>
            <SectionLabel>Our Story</SectionLabel>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8">
              Built in Portland.<br />
              <span className="text-[var(--color-accent)]">Built to Last.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="font-body font-light text-lg md:text-xl max-w-2xl text-[var(--color-text-muted)]">
              We're not a big agency pretending to care about small brands. We're a small agency that actually does.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MISSION STATEMENT BLOCK */}
      <section className="py-[120px] bg-[var(--color-bg-secondary)] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal delay={0.1}>
            <blockquote className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-wide">
              We don't deliver for everyone.<br />
              We deliver for brands who want<br />
              impact over impressions,<br />
              <span className="relative inline-block">
                and clarity over chaos.
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-[var(--color-accent)] opacity-80"></div>
              </span>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-[100px] bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal delay={0.1}>
              <div className="space-y-6 text-[var(--color-text-muted)] font-light leading-relaxed">
                <p>
                  We are a team of passionate creatives, strategists, and digital experts rooted in Portland, Oregon. We believe that a brand's consistency is the foundation of trust, and trust is the ultimate driver of revenue.
                </p>
                <p>
                  Specializing in the food, hospitality, and local business sectors, we partner with brands that are ready to scale. We cut through the corporate jargon and ignore vanity metrics. Our focus is singular: if it doesn't drive tangible business results, we don't build it.
                </p>
                <p>
                  Our agency is intentionally boutique. When you partner with Creative Minds Media, you collaborate directly with the people crafting your brand's future. No middlemen, no account managers playing telephone—just direct access to the creative minds driving your success.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[var(--color-border-subtle)]">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Creative Minds Media Team" 
                  className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="font-display text-2xl text-[var(--color-text-primary)]">The Creative Minds</p>
                  <p className="text-sm text-[var(--color-text-muted)] uppercase tracking-wider">Portland, OR</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-[100px] bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <Reveal delay={0.1}>
            <SectionLabel>Our Values</SectionLabel>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Clarity Over Chaos', desc: 'We simplify the complex. Your brand message should be obvious in 3 seconds.' },
              { title: 'Results Over Aesthetics', desc: 'Pretty means nothing if it doesn\'t convert. We design for outcomes.' },
              { title: 'Relationships Over Transactions', desc: 'We work with you, not for you. Long-term partners, not one-off vendors.' }
            ].map((value, i) => (
              <Reveal key={value.title} delay={0.1 * (i + 1)}>
                <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:border-[var(--color-accent)]">
                  <h3 className="font-display text-3xl tracking-wide mb-4 text-[var(--color-accent)]">{value.title}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{value.desc}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="py-[100px] bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <Reveal delay={0.1}>
            <SectionLabel>How We Work</SectionLabel>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-[var(--color-border-subtle)] z-0"></div>
            
            {[
              { step: '01', title: 'Discovery', desc: 'We learn your brand, your audience, your goals.' },
              { step: '02', title: 'Strategy', desc: 'We build the roadmap before we touch a pixel.' },
              { step: '03', title: 'Create', desc: 'Design, content, and digital assets — built to perform.' },
              { step: '04', title: 'Launch & Grow', desc: 'We don\'t disappear after launch. We track, refine, and grow.' }
            ].map((process, i) => (
              <Reveal key={process.step} delay={0.1 * (i + 1)} className="relative z-10">
                <div className="flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-card-bg)] border border-[var(--color-border-hover)] flex items-center justify-center font-display text-2xl text-[var(--color-accent)] mb-6">
                    {process.step}
                  </div>
                  <h3 className="font-display text-2xl tracking-wide mb-3">{process.title}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{process.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTLAND ROOTS CALLOUT */}
      <section className="py-[100px] bg-[var(--color-bg-secondary)]">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <Reveal delay={0.1}>
            <Card className="text-center p-12 md:p-20 border-[var(--color-accent-dim)] transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:border-[var(--color-accent)]">
              <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-8 text-[var(--color-accent)]">Proudly Portland.</h2>
              <p className="text-lg md:text-xl text-[var(--color-text-muted)] font-light leading-relaxed max-w-3xl mx-auto mb-8">
                We're not a remote team that stamps Portland on their website. We're here. We know the neighborhoods, the culture, and the community. When we work for Portland businesses, we work as neighbors.
              </p>
              <div className="inline-block border border-[var(--color-border-subtle)] px-6 py-3 rounded-sm text-sm tracking-widest uppercase text-[var(--color-text-muted)]">
                Portland, OR 97220
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-[120px] bg-[var(--color-bg-primary)] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] mb-8">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></div>
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">Your Move</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h2 className="font-display text-6xl md:text-8xl tracking-tight mb-6">Let's Build Something<br />That Works.</h2>
          </Reveal>
          
          <Reveal delay={0.3}>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] font-light mb-12 max-w-2xl mx-auto">
              Done with mediocrity and ready to build a digital presence that actually converts?
            </p>
          </Reveal>
          
          <Reveal delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="tel:19719986878" variant="primary">Call Us: (971) 998-6878</Button>
            <Button href="/contact" variant="outline">Send an Email</Button>
            <Button href="https://www.instagram.com/thecreativemindsmedia/" variant="outline">DM on Instagram</Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
