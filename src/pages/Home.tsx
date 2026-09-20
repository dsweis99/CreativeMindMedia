import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { ArrowRight, ExternalLink, Play, Target, PenTool, MonitorSmartphone } from 'lucide-react';
import { FeaturedOfferModal } from '../components/FeaturedOfferModal';
import { useFeaturedOffer } from '../hooks/useFeaturedOffer';

export function Home() {
  const [freeVideoOpen, setFreeVideoOpen] = useState(false);
  const { offer } = useFeaturedOffer();

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-28 md:pt-28 md:pb-32 overflow-hidden">
        {/* Background Glow */}
        <div className="fixed top-[30%] right-[30%] w-[600px] h-[600px] bg-[var(--color-accent)] rounded-full blur-[150px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2 z-0"></div>
        
        {/* Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px] w-full relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2">
            <Reveal delay={0.1}>
              <span className="inline-block text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--color-accent)] mb-8">
                Portland Branding & Digital Marketing Agency
              </span>
            </Reveal>
            
            <Reveal delay={0.2}>
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8">
                Branding.<br />
                Content.<br />
                <span className="text-[var(--color-accent)]">Design.</span><br />
                Strategy.
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="font-body font-normal text-lg md:text-xl max-w-2xl text-[var(--color-text-primary)] opacity-90 mb-12">
                We build what works — for brands ready to be remembered. No fluff. No filler. Just clarity, creativity, and results.
              </p>
            </Reveal>

            <Reveal delay={0.4} className="flex flex-col sm:flex-row gap-4 mb-16 md:mb-20">
              <Button href="/work" variant="primary">Explore Our Work <ArrowRight className="ml-2 w-4 h-4" /></Button>
              <Button href="/services" variant="outline">Our Services</Button>
            </Reveal>
          </div>
          
          <div className="w-full lg:w-1/2 hidden lg:flex justify-end relative">
            <Reveal delay={0.5} className="relative w-full max-w-[500px] aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-transparent opacity-20 rounded-2xl blur-2xl"></div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] shadow-2xl flex flex-col">
                <div className="h-10 border-b border-[var(--color-border-subtle)] flex items-center px-4 gap-2 bg-[var(--color-bg-primary)]">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex-grow relative overflow-hidden">
                  <img 
                    src="https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Screenshot-2025-12-22-at-4.23.29-PM-1024x725.png" 
                    alt="Creative Minds Media Work Example" 
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-[var(--color-bg-primary)]/90 backdrop-blur-sm border border-[var(--color-border-subtle)] p-4 rounded-xl shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent-fg)] font-bold text-xs">
                          CMM
                        </div>
                        <div>
                          <p className="text-sm font-bold">Shawarma Hazard</p>
                          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Social Media Growth</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
                        <div>
                          <p className="text-2xl font-display text-[var(--color-accent)]">↑ 240%</p>
                          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Engagement Rate</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[var(--color-text-muted)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Vertical Scroll Text */}
        <div className="absolute right-8 bottom-12 hidden lg:flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] rotate-90 origin-right translate-x-1/2">Scroll</span>
          <div className="w-[1px] h-16 bg-[var(--color-border-subtle)] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-accent)] animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER STRIP */}
      <section className="bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-subtle)] py-4 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-8">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="font-display text-2xl tracking-wider">Brand Strategy</span>
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
              <span className="font-display text-2xl tracking-wider">Content Creation</span>
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
              <span className="font-display text-2xl tracking-wider">Social Media Management</span>
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
              <span className="font-display text-2xl tracking-wider">Web Design</span>
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
              <span className="font-display text-2xl tracking-wider">Digital Marketing</span>
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
              <span className="font-display text-2xl tracking-wider">Visual Identity</span>
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
              <span className="font-display text-2xl tracking-wider">Portland, OR</span>
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-[100px] bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <Reveal delay={0.1}>
            <SectionLabel>What We Deliver</SectionLabel>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Reveal delay={0.2}>
              <h2 className="font-display text-5xl md:text-7xl tracking-tight">Branding, Content &<br />Digital Marketing</h2>
            </Reveal>
            <Reveal delay={0.3} className="flex flex-col justify-end items-start lg:items-end">
              <p className="text-[var(--color-text-muted)] max-w-md lg:text-right mb-8">
                Every service we offer connects back to one goal: making your brand impossible to ignore.
              </p>
              <Button href="/services" variant="outline">View All Services</Button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[var(--color-border-subtle)] border border-[var(--color-border-subtle)]">
            {[
              { num: '01', title: 'Brand Strategy', desc: 'Aligning your message with your mission — and your market.', icon: Target },
              { num: '02', title: 'Content & Creative', desc: 'Storytelling that\'s built to connect and crafted to convert.', icon: PenTool },
              { num: '03', title: 'Design & Digital', desc: 'Visual systems and web experiences built with intention.', icon: MonitorSmartphone }
            ].map((service, i) => {
              const Icon = service.icon;
              return (
              <Reveal key={service.num} delay={0.1 * (i + 1)} className="h-full">
                <div className="group relative bg-[var(--color-card-bg)] p-10 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-accent)] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-10"></div>
                  <div className="absolute -right-10 -top-10 text-[var(--color-border-subtle)] opacity-20 group-hover:opacity-100 group-hover:text-[var(--color-accent)] transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12 z-0">
                    <Icon size={160} strokeWidth={1} />
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-accent-fg)] transition-all duration-300">
                        <Icon size={20} />
                      </div>
                      <span className="font-display text-4xl text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors">{service.num}</span>
                    </div>
                    <h3 className="font-display text-3xl tracking-wide mb-4">{service.title}</h3>
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed flex-grow">{service.desc}</p>
                    <div className="mt-8 self-end opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-110">
                      <ArrowRight className="text-[var(--color-accent)]" />
                    </div>
                  </div>
                </div>
              </Reveal>
            )})}
          </div>
        </div>
      </section>

      {/* CASE STUDIES SECTION */}
      <section className="py-[100px] bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <Reveal delay={0.1}>
            <SectionLabel>The Receipts</SectionLabel>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-6">Case Studies &<br />Client Results</h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mb-16">
              Real-world branding, content, and digital marketing projects for Portland-based businesses.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Dot Sugar PDX', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/05/4.png', prob: 'No visual consistency or brand presence online', sol: 'Social Media, Design', link: 'dotsugar', result: '12.5K', resultLabel: 'Followers Gained' },
              { name: 'Sheesh Shawarma', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/05/5.png', prob: 'No engagement despite regular posting', sol: 'Social Media, Design, Web', link: 'sheesh', result: '240%', resultLabel: 'Engagement Increase' },
              { name: 'Classic Shawarma', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/05/6.png', prob: 'No digital presence at launch', sol: 'Social Media, Design, Web', link: 'classicshawarma', result: '1.2M', resultLabel: 'Impressions' },
              { name: 'Hello Philly Cheese', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/05/7.png', prob: 'Website abandoned by previous agency', sol: 'Design, Web', link: 'hellophilly', result: '300%', resultLabel: 'Traffic Growth' },
              { name: 'Mac-A-Deli', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/05/8.png', prob: 'No digital presence at launch', sol: 'Branding, Social Media, Web', link: 'macadeli', result: 'Sold Out', resultLabel: 'Opening Week' },
              { name: 'Mr Potato', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/06/Mr-Potato-Logo-01-1024x1024.png', prob: 'No digital presence at launch', sol: 'Branding, Social Media, Web', link: 'mrpotato', result: '50K+', resultLabel: 'Local Reach' },
            ].map((client, i) => (
              <Reveal key={client.name} delay={0.1 * (i % 3 + 1)}>
                <a href={`#/work/${client.link}`} className="block h-full">
                  <Card className="h-full flex flex-col group overflow-hidden p-0">
                    <div className="h-48 flex items-center justify-center p-8 bg-white border-b border-[var(--color-border-subtle)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-bg-primary)] to-transparent opacity-50"></div>
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="max-h-full max-w-full object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-500" 
                        referrerPolicy="no-referrer" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-display text-3xl tracking-wide mb-4">{client.name}</h3>
                      <div className="mb-6">
                        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Problem:</p>
                        <p className="text-sm font-medium">{client.prob}</p>
                      </div>
                      <div className="mb-8">
                        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Solutions:</p>
                        <div className="flex flex-wrap gap-2">
                          {client.sol.split(', ').map(s => (
                            <span key={s} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] rounded-sm text-[var(--color-text-muted)]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto pt-6 border-t border-[var(--color-border-subtle)] flex items-end justify-between">
                        <div>
                          <p className="text-3xl font-display text-[var(--color-accent)]">{client.result}</p>
                          <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">{client.resultLabel}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all duration-300">
                          <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-fg)] transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[var(--color-accent)] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { num: '20+', label: 'Brands Transformed' },
              { num: '2.4M', label: 'Views Generated' },
              { num: '100+', label: 'Projects Delivered' },
              { num: '12K+', label: 'Followers Gained' }
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 * i} direction="up">
                <div className="flex flex-col items-center">
                  <span className="font-display text-6xl md:text-7xl text-[var(--color-accent-fg)] leading-none mb-2">{stat.num}</span>
                  <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-fg)] opacity-80">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-[100px] bg-[var(--color-bg-primary)] border-t border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <Reveal delay={0.1}>
            <SectionLabel>Client Feedback</SectionLabel>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-16">Don't Just Take<br />Our Word For It.</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* TODO: Replace these placeholder quotes with actual client testimonials before publishing */}
            {[
              {
                quote: "Creative Minds Media completely transformed our online presence. We went from struggling to get engagement to seeing a 240% increase in just a few months. Their team truly understands how to connect with an audience.",
                author: "Dot Sugar PDX",
                role: "Local Business Owner",
                logo: "https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Dot-Sugar-Logo-1.png"
              },
              {
                quote: "Working with CMM was the best decision we made for our launch. They handled our branding, social media, and web design, and we sold out our opening week. The ROI has been incredible.",
                author: "Mac-A-Deli",
                role: "Restaurant Founder",
                logo: "https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Wing-A-Deli-Logo-03-300x57.png"
              },
              {
                quote: "We had zero digital presence before CMM. They built our brand from the ground up and helped us reach over 1 million impressions. They don't just make things look good; they drive real business results.",
                author: "Mr Potato",
                role: "Franchise Owner",
                logo: "https://www.creatvemindsmedia.com/wp-content/uploads/2025/06/Mr-Potato-Logo-04-300x300.png"
              }
            ].map((testimonial, i) => (
              <Reveal key={testimonial.author} delay={0.1 * (i + 1)} className="h-full">
                <Card className="h-full flex flex-col p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] relative">
                  <div className="text-[var(--color-accent)] opacity-20 mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.017 21L16.41 14.596C16.638 13.982 16.752 13.338 16.752 12.684V3H24V12.684C24 14.938 23.364 17.134 22.162 19.044C20.96 20.954 19.238 22.496 17.18 23.492L14.017 21ZM0 21L2.393 14.596C2.621 13.982 2.735 13.338 2.735 12.684V3H9.983V12.684C9.983 14.938 9.347 17.134 8.145 19.044C6.943 20.954 5.221 22.496 3.163 23.492L0 21Z" />
                    </svg>
                  </div>
                  <p className="text-[var(--color-text-primary)] text-lg leading-relaxed mb-8 flex-grow font-light">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[var(--color-border-subtle)]">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-border-subtle)] overflow-hidden flex items-center justify-center p-2">
                      <img src={testimonial.logo} alt={testimonial.author} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="font-display text-lg tracking-wide">{testimonial.author}</p>
                      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">{testimonial.role}</p>
                    </div>
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
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">Accepting New Clients</span>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h2 className="font-display text-6xl md:text-8xl tracking-tight mb-6">Stop Blending In.<br />Start Standing Out.</h2>
          </Reveal>
          
          <Reveal delay={0.3}>
            <p className="text-lg md:text-xl text-[var(--color-text-primary)] opacity-90 font-light mb-12 max-w-2xl mx-auto">
              Your brand deserves more than just a pretty logo. It needs a strategy that converts and content that connects. Let's build a digital presence that actually works.
            </p>
          </Reveal>
          
          <Reveal delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" className="text-lg px-8 py-4">Start Your Project <ArrowRight className="ml-2 w-5 h-5" /></Button>
            <Button href="tel:19719986878" variant="outline" className="text-lg px-8 py-4">Call: (971) 998-6878</Button>
          </Reveal>
        </div>
      </section>

      {offer.enabled && <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal delay={0.1}><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">{offer.eyebrow}</p></Reveal>
          <Reveal delay={0.2}><h2 className="mt-5 font-display text-5xl leading-[0.95] tracking-wide sm:text-7xl">{offer.title}</h2></Reveal>
          <Reveal delay={0.3}><p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)]">{offer.description}</p></Reveal>
          <Reveal delay={0.4}><button type="button" onClick={() => setFreeVideoOpen(true)} className="mt-10 bg-[var(--color-accent)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-fg)] transition-transform hover:-translate-y-0.5">{offer.buttonLabel}</button></Reveal>
          {offer.examplesEnabled && offer.examples.length > 0 && <div className="mt-16 border-t border-[var(--color-border-subtle)] pt-12 text-left">
            <div className="mx-auto max-w-2xl text-center"><h3 className="font-display text-4xl tracking-wide sm:text-5xl">{offer.examplesHeading}</h3>{offer.examplesDescription && <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{offer.examplesDescription}</p>}</div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {offer.examples.map((example) => <article key={example.id} className="overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]">
                <div className="relative aspect-[4/5] bg-[var(--color-bg-secondary)]">
                  {example.type === 'video' ? <video controls preload="metadata" className="h-full w-full object-cover"><source src={example.mediaUrl} /></video> : example.mediaUrl ? <img src={example.mediaUrl} alt={example.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[var(--color-text-muted)]">Add media in CRM</div>}
                  {example.type === 'video' && !example.mediaUrl && <Play className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--color-accent)]" />}
                </div>
                <div className="p-5"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">{example.type === 'audit' ? 'Audit example' : example.type === 'video' ? 'Video example' : 'Work example'}</p><h4 className="mt-2 text-lg font-semibold">{example.title}</h4>{example.description && <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{example.description}</p>}{example.actionUrl && <a href={example.actionUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">View example <ExternalLink size={15} /></a>}</div>
              </article>)}
            </div>
          </div>}
        </div>
      </section>}

      <FeaturedOfferModal isOpen={freeVideoOpen} offer={offer} onClose={() => setFreeVideoOpen(false)} />
    </div>
  );
}
