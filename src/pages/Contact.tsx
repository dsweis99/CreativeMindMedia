import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { ChevronDown, CheckCircle2, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialLinks } from '../data/socials';

const faqs = [
  { q: 'How long does a typical project take?', a: 'Depends on scope. Social media setup: 1–2 weeks. Website: 3–6 weeks. Branding: 2–4 weeks.' },
  { q: 'Do you work with businesses outside Portland?', a: 'Yes. We\'re Portland-based but serve growing brands nationwide.' },
  { q: 'What\'s your minimum engagement?', a: 'We work project-to-project and monthly retainers. No minimum contract required to start.' },
  { q: 'Will I own everything you create?', a: 'Yes. All files, assets, and accounts belong to you on completion.' },
  { q: 'How do you measure success?', a: 'With real numbers. Engagement rates, follower growth, website traffic, and conversion metrics.' },
  { q: 'Do you offer à la carte services?', a: 'Yes. You can start with one service and scale up as you grow.' }
];

const categories = [
  {
    title: "Brand Foundations",
    items: ["Brand Strategy", "Brand Alignment", "Brand Positioning", "Concepting", "Consulting", "Brand Identity"]
  },
  {
    title: "Visual Systems",
    items: ["Brand Guidelines", "Art Direction", "Messaging", "Web Design", "Web Development", "UI / UX"]
  },
  {
    title: "Content - Campaigns",
    items: ["Print Design", "Product Packaging", "Copywriting", "Marketing Campaigns", "Digital Marketing", "Social Media Management"]
  }
];

export function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      // Reset form after 3 seconds
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="w-full">
      {/* PAGE HERO */}
      <section className="relative min-h-[40vh] flex items-center pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden bg-[var(--color-bg-primary)]">
        <div className="absolute top-[30%] right-[30%] w-[600px] h-[600px] bg-[var(--color-accent)] rounded-full blur-[150px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px] w-full relative z-20 text-center">
          <Reveal delay={0.1}>
            <SectionLabel className="mx-auto">Let's Talk</SectionLabel>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
              Start Your <span className="text-[var(--color-accent)]">Project.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="font-body font-light text-lg md:text-xl max-w-2xl mx-auto text-[var(--color-text-muted)]">
              We typically respond within 24 hours. No sales pressure — just a real conversation about your brand.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT INFO ROW */}
      <section className="py-12 bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] flex items-center justify-center mb-4 text-[var(--color-accent)]">
                  <Phone size={20} />
                </div>
                <h3 className="font-display text-xl mb-2">Call Us</h3>
                <a href="tel:19719986878" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">1 (971) 998-6878</a>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] flex items-center justify-center mb-4 text-[var(--color-accent)]">
                  <MapPin size={20} />
                </div>
                <h3 className="font-display text-xl mb-2">Location</h3>
                <p className="text-[var(--color-text-muted)]">Portland, OR 97220</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] flex items-center justify-center mb-4 text-[var(--color-accent)]">
                  <Instagram size={20} />
                </div>
                <h3 className="font-display text-xl mb-2">Social</h3>
                <div className="flex gap-4">
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Instagram</a>
                  <span className="text-[var(--color-border-subtle)]">|</span>
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Facebook</a>
                  <span className="text-[var(--color-border-subtle)]">|</span>
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">LinkedIn</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REQUEST A QUOTE FORM */}
      <section className="py-[100px] bg-[var(--color-bg-primary)]">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <Reveal delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-6xl tracking-tight">Request Information & Quote</h2>
            </div>
            
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input type="text" placeholder="First Name" required disabled={formState !== 'idle'} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all duration-300 disabled:opacity-50 placeholder:text-[var(--color-text-muted)]" />
                </div>
                <div>
                  <input type="text" placeholder="Last Name" required disabled={formState !== 'idle'} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all duration-300 disabled:opacity-50 placeholder:text-[var(--color-text-muted)]" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input type="email" placeholder="Email" required disabled={formState !== 'idle'} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all duration-300 disabled:opacity-50 placeholder:text-[var(--color-text-muted)]" />
                </div>
                <div>
                  <input type="tel" placeholder="Contact Number" disabled={formState !== 'idle'} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all duration-300 disabled:opacity-50 placeholder:text-[var(--color-text-muted)]" />
                </div>
              </div>

              <div>
                <textarea rows={6} placeholder="Textarea" disabled={formState !== 'idle'} className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] px-4 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all duration-300 resize-none disabled:opacity-50 placeholder:text-[var(--color-text-muted)]"></textarea>
              </div>

              {/* Checkbox Categories */}
              <div className="pt-12 mt-12 border-t border-[var(--color-border-subtle)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                  {categories.map((category, idx) => (
                    <div key={category.title}>
                      <h3 className="font-display text-2xl md:text-3xl tracking-wide mb-8 text-center md:text-left">{category.title}</h3>
                      <div className="space-y-4">
                        {category.items.map(item => (
                          <label key={item} className="flex items-center gap-4 cursor-pointer group w-fit mx-auto md:mx-0">
                            <div className="relative flex items-center justify-center w-5 h-5 border border-[var(--color-border-subtle)] rounded-sm bg-transparent group-hover:border-[var(--color-accent)] transition-colors flex-shrink-0">
                              <input type="checkbox" className="peer sr-only" disabled={formState !== 'idle'} />
                              <div className="absolute inset-0 bg-[var(--color-accent)] scale-0 peer-checked:scale-100 transition-transform duration-200 rounded-sm flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-[var(--color-accent-fg)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                            <span className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-16 flex flex-col items-center">
                {formState === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-sm w-full max-w-md text-center">
                    There was an error sending your request. Please try again.
                  </div>
                )}
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={formState !== 'idle'}
                  className={`w-full md:w-auto min-w-[240px] ${formState === 'success' ? 'bg-green-600 hover:bg-green-700 border-green-600 text-white' : ''}`}
                >
                  {formState === 'submitting' ? 'Sending...' : formState === 'success' ? 'Request Sent!' : 'Request A Quote'}
                </Button>
                <p className="text-xs text-[var(--color-text-muted)] mt-6 text-center">We don't share your info. Ever.</p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-[120px] bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-subtle)]">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <Reveal delay={0.1}>
            <div className="text-center mb-16">
              <SectionLabel className="mx-auto">Common Questions</SectionLabel>
              <h2 className="font-display text-5xl md:text-7xl tracking-tight mt-6">Before You Reach Out.</h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={0.1 * (i + 1)}>
                <div 
                  className="border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] rounded-sm overflow-hidden"
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-display text-2xl tracking-wide pr-8">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex-shrink-0 ${openFaq === i ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}
                    >
                      <ChevronDown />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        key={`faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-[var(--color-text-muted)] text-sm leading-relaxed border-t border-[var(--color-border-subtle)] pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION CALLOUT */}
      <section className="py-[100px] bg-[var(--color-bg-primary)]">
        <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <Reveal delay={0.1}>
            <Card className="text-center p-12 md:p-20 border-[var(--color-accent-dim)]">
              <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-8 text-[var(--color-accent)]">Proudly Portland.</h2>
              <p className="text-lg md:text-xl text-[var(--color-text-muted)] font-light leading-relaxed max-w-3xl mx-auto mb-8">
                We're local. When you work with CMM, you're working with people who know your city, your market, and your community.
              </p>
              <div className="inline-block border border-[var(--color-border-subtle)] px-6 py-3 rounded-sm text-sm tracking-widest uppercase text-[var(--color-text-muted)]">
                Portland, OR 97220
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
