import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { ArrowRight, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import { socialLinks } from '../data/socials';

const filters = ['All', 'Social Media', 'Branding', 'Web', 'Design'];

export function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                            <Button onClick={() => setSelectedProject(project)} variant="outline" className="!px-4 !py-2 !text-[11px]">
                              Quick View <ArrowRight className="ml-2 w-3 h-3" />
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

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-[70] flex items-end bg-black/70 p-0 sm:items-center sm:justify-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
            <motion.section role="dialog" aria-modal="true" aria-labelledby="quick-view-title" className="relative max-h-[90vh] w-full overflow-y-auto bg-[var(--color-bg-primary)] sm:max-w-2xl" initial={{ y: 36, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 36, opacity: 0 }} onClick={(event) => event.stopPropagation()}>
              <button onClick={() => setSelectedProject(null)} className="absolute right-5 top-5 z-10 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] p-2 hover:text-[var(--color-accent)]" aria-label="Close quick view"><X size={20} /></button>
              <div className="border-b border-[var(--color-border-subtle)] p-8 sm:p-10">
                <div className="mb-8 flex h-28 items-center justify-center bg-[var(--color-card-bg)] p-6"><img src={selectedProject.logo} alt={selectedProject.name} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" /></div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Quick Project View · {selectedProject.category}</p>
                <h2 id="quick-view-title" className="mt-3 font-display text-5xl tracking-wide sm:text-6xl">{selectedProject.name}</h2>
              </div>
              <div className="grid gap-8 p-8 sm:grid-cols-2 sm:p-10"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">The challenge</p><p className="mt-3 text-lg leading-relaxed">{selectedProject.prob}</p></div><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Result</p><p className="mt-3 font-display text-3xl tracking-wide text-[var(--color-accent)]">{selectedProject.result}</p></div><div className="sm:col-span-2"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Solutions delivered</p><div className="mt-3 flex flex-wrap gap-2">{selectedProject.sol.map((service) => <span key={service} className="border border-[var(--color-border-subtle)] px-3 py-2 text-xs font-semibold uppercase tracking-wider">{service}</span>)}</div></div></div>
              <div className="flex flex-col gap-3 border-t border-[var(--color-border-subtle)] p-6 sm:flex-row sm:justify-end"><Button onClick={() => setSelectedProject(null)} variant="outline">Close</Button><Button href={`/work/${selectedProject.id}`}>View Full Case Study <ArrowRight className="ml-2 h-4 w-4" /></Button></div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

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
            <Button href={socialLinks.instagram} variant="outline">DM on Instagram</Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
