import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 'dotsugar', name: 'Dot Sugar PDX', category: 'Social Media', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Dot-Sugar-Logo-1.png', prob: 'No visual consistency or brand presence online', sol: ['Social Media', 'Design'], result: '↑ 2.4M Views & 240% Engagement' },
  { id: 'sheesh', name: 'SHEESH Shawarma', category: 'Web', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/SHEESH-LOGO-03-1024x408.png', prob: 'No engagement despite regular posting', sol: ['Social Media', 'Design', 'Web'], result: '0 → 12.5K Followers in 3 Months' },
  { id: 'classicshawarma', name: 'Classic Shawarma', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/ClassicShawarmaLogo-05-1024x1024.png', prob: 'No digital presence at launch', sol: ['Social Media', 'Design', 'Web'], result: '↑ 150% Foot Traffic & 500K Reach' },
  { id: 'mrpotato', name: 'Mr Potato', category: 'Design', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/06/Mr-Potato-Logo-04-300x300.png', prob: 'No digital presence at launch', sol: ['Branding', 'Social Media', 'Web'], result: '↑ 500% Brand Awareness & 1M+ Impressions' },
  { id: 'macadeli', name: 'Mac-A-Deli', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Wing-A-Deli-Logo-03-300x57.png', prob: 'No digital presence at launch', sol: ['Branding', 'Social Media', 'Web'], result: 'Sold Out Opening Week & 10K+ Local Reach' },
  { id: 'chickenshit', name: 'Chicken\'s Hit', category: 'Social Media', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Chickens-Hit-4-300x300.png', prob: 'Needed bold impact online', sol: ['Social Media', 'Content Creation'], result: '↑ 300% Online Orders & 50K Monthly Views' },
  { id: 'shawarmaspot', name: 'Shawarma Spot', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Shawarma-Spot-Logo-300x300.png', prob: 'Needed a strong identity to stand out', sol: ['Branding', 'Design'], result: 'Your Spot, Their Craving' },
  { id: 'bakeontherun', name: 'Bake on the Run', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/BakeontheRunlogocopy2-300x62.png', prob: 'Lacked a cohesive street-savvy look', sol: ['Branding', 'Design'], result: 'Island Flavor. Street Savvy.' },
  { id: 'sealand', name: 'Sealand Fish & Chips', category: 'Design', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/06/Sealand-Fish-Chips-Logo-300x300.png', prob: 'Outdated visual identity', sol: ['Design', 'Branding'], result: 'Hooked on Identity. Anchored in Design.' },
  { id: 'shawarmahazard', name: 'Shawarma Hazard', category: 'Social Media', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Hazard-Logo-Final-01-300x163.png', prob: 'Low digital engagement', sol: ['Social Media', 'Content Creation'], result: 'Dangerously Good. Digitally Delivered.' },
  { id: 'turfandivy', name: 'Turf and Ivy', category: 'Web', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Turf-and-Ivy-Website-Logo-01-1024x519.png', prob: 'Needed an elevated online presence', sol: ['Web', 'Design'], result: 'Earthy Meets Elevated' },
  { id: 'mrgyro', name: 'Mr Gyro', category: 'Design', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Mr-Gyro-Logo-300x300.png', prob: 'Needed fresh design for their flavor', sol: ['Design', 'Branding'], result: 'Flavor with a Side of Fresh Design' },
  { id: 'sophiascafe', name: 'SOPHIA\'S CAFE', category: 'Design', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/SOPHIAS-CAFE-New-Logo-300x77.png', prob: 'Menu and styling needed an upgrade', sol: ['Design', 'Branding'], result: 'Comfort, Styled & Served' },
  { id: 'mikescheesesteak', name: 'Mike\'s Cheesesteak', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/06/Mikes-Cheesesteak-Logo-01-300x300.png', prob: 'Needed a brand built to drip', sol: ['Branding', 'Design'], result: 'Built to Drip' },
  { id: 'namobuddha', name: 'Namo Buddha', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Namo-Buddha-Logo-300x300.png', prob: 'Required a refreshed look', sol: ['Branding', 'Design'], result: 'A Taste of the Himalayas, Refreshed.' },
  { id: 'shawarmagrill', name: 'Shawarma Grill Halal', category: 'Social Media', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Shawarma-Grill-Halal-Logo-10-1-300x300.png', prob: 'Needed digital sizzle to match the grill', sol: ['Social Media', 'Design'], result: 'Grill Heat. Digital Sizzle.' },
  { id: 'fosterfoodcarts', name: 'Foster Food Carts', category: 'Web', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Foster-Food-Carts-Logo-300x300.png', prob: 'Needed a community hub online', sol: ['Web', 'Social Media'], result: 'Serving Flavor. Supporting Community.' },
  { id: 'hawthorne', name: 'Hawthorne Street Food and Bar', category: 'Branding', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Hawthorne-Logo-300x300.png', prob: 'Needed a block-ready identity', sol: ['Branding', 'Design'], result: 'Built for the Block.' },
  { id: 'shawarmacenter', name: 'Shawarma Center', category: 'Design', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Shawarma-Center-Logo-BASIC-01-300x300.png', prob: 'Food truck needed a visual overhaul', sol: ['Design', 'Branding'], result: 'Flavor That Shows Up Daily.' },
  { id: 'futureminds', name: 'The Future Minds', category: 'Social Media', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/TFM-Logo-Final-300x74.png', prob: 'Needed to shape stories for the future', sol: ['Social Media', 'Content Creation'], result: 'Stories That Shape the Future.' },
  { id: 'carolecharbel', name: 'Carole & Charbel', category: 'Web', logo: 'https://www.creatvemindsmedia.com/wp-content/uploads/2025/12/Carole-Charbel-Isolated-300x300.png', prob: 'Needed a platform for life\'s moments', sol: ['Web', 'Design'], result: 'Life, Love, and the Moments Between.' },
];

const filters = ['All', 'Social Media', 'Branding', 'Web', 'Design'];

export function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.sol.includes(activeFilter) || p.category === activeFilter);
    
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

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
            <SectionLabel>The Receipts</SectionLabel>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8">
              Real Brands.<br />
              <span className="text-[var(--color-accent)]">Real Results.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="font-body font-light text-lg md:text-xl max-w-2xl text-[var(--color-text-muted)]">
              We measure success in growth, not just aesthetics. Here's the proof.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="relative z-40 bg-[var(--color-bg-primary)] border-b border-[var(--color-border-subtle)] py-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px] flex gap-8 min-w-max">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative text-sm font-medium tracking-wider uppercase pb-2 transition-colors ${
                activeFilter === filter ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-accent)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CASE STUDY GRID */}
      <section className="py-[100px] bg-[var(--color-bg-secondary)] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => {
                const isLarge = index % 3 === 0;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={project.id}
                    id={project.id}
                    className={isLarge ? "md:col-span-2" : "col-span-1"}
                  >
                    <Card className="h-full flex flex-col group relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:-translate-y-1">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--color-accent)] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                      
                      <div className={`flex flex-col ${isLarge ? 'md:flex-row gap-12' : 'gap-8'} h-full`}>
                        <div className={`flex-shrink-0 flex items-center justify-center p-8 bg-[var(--color-border-subtle)] rounded-sm ${isLarge ? 'md:w-1/3' : 'h-48'}`}>
                          <img 
                            src={project.logo} 
                            alt={project.name} 
                            className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                            referrerPolicy="no-referrer" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        
                        <div className="flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-display text-4xl tracking-wide">{project.name}</h3>
                            <span className="text-[10px] uppercase tracking-wider px-3 py-1 bg-[var(--color-accent-dim)] text-[var(--color-accent)] rounded-sm whitespace-nowrap">
                              Food & Beverage
                            </span>
                          </div>
                          
                          <div className="mb-6">
                            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">The Problem:</p>
                            <p className="text-sm font-medium leading-relaxed">{project.prob}</p>
                          </div>
                          
                          <div className="mb-8">
                            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Solutions Delivered:</p>
                            <div className="flex flex-wrap gap-2">
                              {project.sol.map(s => (
                                <span key={s} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-[var(--color-border-subtle)] rounded-sm text-[var(--color-text-muted)]">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-6">
                            <div>
                              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Result:</p>
                              <p className="font-display text-2xl text-[var(--color-accent)] tracking-wide">{project.result}</p>
                            </div>
                            <Button href={`#${project.id}`} variant="outline" className="!px-4 !py-2 !text-[11px]">
                              View Case Study <ArrowRight className="ml-2 w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          
          {filteredProjects.length > 6 && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-8 py-4 bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] rounded-full font-medium text-sm tracking-wider uppercase hover:bg-[var(--color-border-subtle)] transition-colors"
              >
                {showAll ? 'View Less' : 'View More'}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PROCESS STRIP */}
      <section className="bg-[var(--color-accent)] py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px] flex flex-col md:flex-row items-center justify-between gap-8">
          <span className="font-display text-3xl text-[var(--color-accent-fg)] tracking-wider">How We Work</span>
          <div className="flex items-center gap-4 md:gap-8 text-[var(--color-accent-fg)]">
            <span className="font-display text-2xl opacity-80">01 Discover</span>
            <ArrowRight className="w-4 h-4 opacity-50" />
            <span className="font-display text-2xl opacity-80">02 Strategize</span>
            <ArrowRight className="w-4 h-4 opacity-50" />
            <span className="font-display text-2xl opacity-80">03 Create</span>
            <ArrowRight className="w-4 h-4 opacity-50" />
            <span className="font-display text-2xl opacity-80">04 Launch</span>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="py-16 bg-[var(--color-bg-primary)] border-b border-[var(--color-border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: 'Portland Based', desc: 'Local knowledge, national quality.' },
              { title: 'Real Results', desc: 'We track growth, not just likes.' },
              { title: 'Hands-On Team', desc: 'Direct access to the creatives.' }
            ].map((proof, i) => (
              <Reveal key={proof.title} delay={0.1 * i} direction="up">
                <h4 className="font-display text-2xl tracking-wide text-[var(--color-accent)] mb-2">{proof.title}</h4>
                <p className="text-[var(--color-text-muted)] text-sm">{proof.desc}</p>
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
