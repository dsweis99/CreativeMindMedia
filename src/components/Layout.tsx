import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Logo } from './ui/Logo';
import { Instagram, Facebook, Linkedin, Sun, Moon, Menu, X, ArrowUp, ArrowDown } from 'lucide-react';
import { socialLinks } from '../data/socials';

export function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    // CMM starts in dark mode unless this visitor deliberately chose light mode.
    if (savedTheme !== 'light') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[var(--color-bg-primary)] border-b border-[var(--color-border-subtle)] flex items-center h-24 ${scrolled ? 'shadow-lg' : ''}`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px] flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo className="h-10 md:h-12" labelClassName="text-xl md:text-2xl" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium tracking-wide transition-colors py-2 group ${
                  location.pathname === link.path ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)] hover:text-[var(--color-accent)]'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-accent)] transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 mr-2 pr-4 border-r border-[var(--color-border-subtle)]">
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                <Instagram size={18} />
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                <Facebook size={18} />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)] transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Button href="/contact" variant="primary">Start Project</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-[var(--color-text-primary)] hover:bg-[var(--color-border-subtle)] transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="text-[var(--color-text-primary)] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg-primary)] pt-24 px-6 flex flex-col md:hidden"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-3xl font-display tracking-wide ${
                    location.pathname === link.path ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-12 pt-8 border-t border-[var(--color-border-subtle)] flex flex-col gap-6">
              <Button href="/contact" variant="primary" className="w-full justify-center">Start Project</Button>
              <div className="flex gap-4">
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                  <Instagram size={24} />
                </a>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                  <Facebook size={24} />
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-subtle)] pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <Logo className="h-12 gap-5 mb-7" labelClassName="text-2xl md:text-3xl" />
              <p className="text-[var(--color-text-muted)] text-sm mb-6">
                Serving Portland businesses and growing brands nationwide.
              </p>
              <div className="flex gap-4">
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                  <Instagram size={20} />
                </a>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                  <Facebook size={20} />
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-display text-xl tracking-wider mb-6 lg:mt-3">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm">Home</Link></li>
                <li><Link to="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm">About Us</Link></li>
                <li><Link to="/work" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm">Our Work</Link></li>
                <li><Link to="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xl tracking-wider mb-6 lg:mt-3">Services</h4>
              <ul className="space-y-4">
                <li><Link to="/services" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm">Brand Strategy</Link></li>
                <li><Link to="/services" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm">Content & Creative</Link></li>
                <li><Link to="/services" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm">Design & Digital</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xl tracking-wider mb-6 lg:mt-3">Contact</h4>
              <ul className="space-y-4">
                <li className="text-[var(--color-text-muted)] text-sm">Portland, OR 97220</li>
                <li><a href="tel:19719986878" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm">1 (971) 998-6878</a></li>
                <li><a href="mailto:hello@creativemindsmedia.com" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-sm">hello@creativemindsmedia.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--color-border-subtle)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--color-text-muted)] text-xs">
              Creative Minds Media ® All Rights Reserved 2025
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-xs">Privacy Policy</Link>
              <Link to="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors text-xs">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll Button */}
      <div className="fixed bottom-8 right-6 md:right-8 z-50">
        <button
          onClick={() => {
            if (scrollProgress > 10) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
            }
          }}
          className="relative flex items-center justify-center w-14 h-14 bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] rounded-full shadow-lg hover:text-[var(--color-accent)] transition-all duration-300 group"
          aria-label={scrollProgress > 10 ? "Scroll to top" : "Scroll to bottom"}
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="var(--color-border-subtle)"
              strokeWidth="2"
            />
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeDasharray="163.36"
              strokeDashoffset={163.36 - (scrollProgress / 100) * 163.36}
              className="transition-all duration-150 ease-out"
            />
          </svg>
          {scrollProgress > 10 ? (
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
          ) : (
            <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
          )}
        </button>
      </div>
    </div>
  );
}
