import React from 'react';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function Services() {
  return (
    <div className="w-full">
      {/* PAGE HERO */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden bg-[var(--color-bg-primary)]">
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
            <SectionLabel>What We Deliver</SectionLabel>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8">
              Services Built<br />
              <span className="text-[var(--color-accent)]">for Impact.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="font-body font-light text-lg md:text-xl max-w-2xl text-[var(--color-text-muted)]">
              Work that actually moves your brand — strategically and measurably. We don't deliver for everyone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES INTRO */}
      <section className="py-[100px] bg-[var(--color-bg-secondary)] border-b border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl md:text-7xl tracking-tight text-[var(--color-accent)]">
                Three pillars.<br />One strategy.<br />Zero fluff.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-[var(--color-text-muted)] font-light leading-relaxed">
                Every service we offer connects back to one goal: making your brand impossible to ignore. We combine strategy, content, and design into a unified system that works.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICE 01 — BRAND STRATEGY */}
      <section className="py-[120px] bg-[var(--color-bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 font-display text-[40vw] leading-none text-[var(--color-accent)] opacity-[0.03] select-none translate-x-1/4 -translate-y-1/4">01</div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal delay={0.1}>
              <div className="inline-block px-4 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] text-xs uppercase tracking-widest font-semibold mb-8">Service 01</div>
              <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-6">Brand Strategy</h2>
              <p className="text-[var(--color-text-muted)] font-light leading-relaxed mb-10 text-lg">
                Before we design anything, we align your message with your mission. We build the brand foundation that everything else grows from — voice, positioning, visual identity direction, and audience clarity.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Brand Voice & Tone', 'Market Positioning', 'Audience Personas', 'Messaging Framework'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[var(--color-text-primary)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2} className="hidden lg:flex justify-end">
              <div className="w-64 h-64 border border-[var(--color-accent)] rounded-full flex items-center justify-center relative">
                <div className="absolute inset-4 border border-[var(--color-accent)] rounded-full opacity-50"></div>
                <div className="absolute inset-8 border border-[var(--color-accent)] rounded-full opacity-25"></div>
                <div className="w-4 h-4 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICE 02 — CONTENT & CREATIVE */}
      <section className="py-[120px] bg-[var(--color-bg-secondary)] relative overflow-hidden">
        <div className="absolute top-0 left-0 font-display text-[40vw] leading-none text-[var(--color-accent)] opacity-[0.03] select-none -translate-x-1/4 -translate-y-1/4">02</div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal delay={0.2} className="hidden lg:flex justify-start order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4 w-64">
                <div className="aspect-square bg-[var(--color-accent-dim)] border border-[var(--color-accent)] rounded-sm"></div>
                <div className="aspect-square border border-[var(--color-border-subtle)] rounded-sm"></div>
                <div className="aspect-square border border-[var(--color-border-subtle)] rounded-sm"></div>
                <div className="aspect-square bg-[var(--color-accent)] rounded-sm"></div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <div className="inline-block px-4 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] text-xs uppercase tracking-widest font-semibold mb-8">Service 02</div>
              <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-6">Content & Creative</h2>
              <p className="text-[var(--color-text-muted)] font-light leading-relaxed mb-10 text-lg">
                We create content that earns attention and drives action. From social media to video, every piece is built with your brand voice and your conversion goals in mind.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {['Social Media Management', 'Graphic Design', 'Copywriting', 'Video Concepts'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[var(--color-text-primary)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[var(--color-card-bg)] border-l-2 border-[var(--color-accent)] text-sm text-[var(--color-text-muted)] italic">
                "We manage your social media so you can focus on running your business."
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICE 03 — DESIGN & DIGITAL */}
      <section className="py-[120px] bg-[var(--color-bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 font-display text-[40vw] leading-none text-[var(--color-accent)] opacity-[0.03] select-none translate-x-1/4 -translate-y-1/4">03</div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal delay={0.1}>
              <div className="inline-block px-4 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] text-xs uppercase tracking-widest font-semibold mb-8">Service 03</div>
              <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-6">Design & Digital</h2>
              <p className="text-[var(--color-text-muted)] font-light leading-relaxed mb-10 text-lg">
                Visual systems and web experiences built with intention. Every pixel has a purpose. We design websites and digital assets that look good AND convert.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Website Design & Development', 'Brand Visual Identity', 'Digital Asset Creation', 'UI/UX Direction'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[var(--color-text-primary)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2} className="hidden lg:flex justify-end">
              <div className="w-64 h-64 border border-[var(--color-border-subtle)] rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-8 bg-[var(--color-card-bg)] border-b border-[var(--color-border-subtle)] flex items-center px-4 gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-border-hover)]"></div>
                  <div className="w-2 h-2 rounded-full bg-[var(--color-border-hover)]"></div>
                  <div className="w-2 h-2 rounded-full bg-[var(--color-border-hover)]"></div>
                </div>
                <div className="absolute top-12 left-4 right-4 h-32 bg-[var(--color-accent-dim)] border border-[var(--color-accent)] rounded-sm"></div>
                <div className="absolute bottom-4 left-4 right-1/2 h-8 bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] rounded-sm"></div>
                <div className="absolute bottom-4 right-4 left-[55%] h-8 bg-[var(--color-accent)] rounded-sm"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="py-[100px] bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <Reveal delay={0.1}>
            <Card className="p-12 md:p-16 border-[var(--color-accent-dim)] transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:border-[var(--color-accent)]">
              <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-12 text-center text-[var(--color-accent)]">We Work With Brands Ready to Grow.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  'Food & Restaurant businesses launching or rebranding',
                  'Local Portland businesses building a digital presence',
                  'Growing brands ready to compete nationally'
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)]">
                      <CheckCircle2 size={24} />
                    </div>
                    <p className="text-[var(--color-text-muted)] text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="text-center border-t border-[var(--color-border-subtle)] pt-8">
                <p className="font-display text-2xl tracking-wide text-[var(--color-text-primary)]">If you want impact over impressions — we're your team.</p>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* PRICING ANCHOR */}
      <section className="py-[120px] bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <div className="text-center mb-16">
            <Reveal delay={0.1}>
              <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-6">Flexible Engagements.</h2>
              <p className="text-lg text-[var(--color-text-muted)] font-light max-w-2xl mx-auto">
                We work project-based and retainer-based. Every engagement starts with a free strategy call.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', desc: 'Social Media & Basic Design', price: '$1,500', recommended: false },
              { name: 'Growth', desc: 'Full Suite Digital Marketing', price: '$3,500', recommended: true },
              { name: 'Custom', desc: 'Enterprise & Large Scale', price: 'Custom', recommended: false }
            ].map((plan, i) => (
              <Reveal key={plan.name} delay={0.1 * (i + 1)}>
                <Card className={`h-full flex flex-col relative transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ${plan.recommended ? 'border-[var(--color-accent)] bg-[var(--color-bg-secondary)]' : ''}`}>
                  {plan.recommended && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-sm">
                      Recommended
                    </div>
                  )}
                  <h3 className="font-display text-3xl tracking-wide mb-2">{plan.name}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm mb-8">{plan.desc}</p>
                  <div className="mb-8">
                    <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] block mb-1">Starting from</span>
                    <span className="font-display text-4xl text-[var(--color-accent)]">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-sm text-[var(--color-text-muted)]">/mo</span>}
                  </div>
                  <div className="mt-auto">
                    <Button href="/contact" variant={plan.recommended ? 'primary' : 'outline'} className="w-full">
                      Let's Talk
                    </Button>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-[120px] bg-[var(--color-bg-secondary)] relative overflow-hidden">
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
