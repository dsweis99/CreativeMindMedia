import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { NotFound } from './NotFound';
import { projects } from '../data/projects';

export function CaseStudy() {
  const { projectId } = useParams();
  const project = projects.find((item) => item.id === projectId);

  if (!project) return <NotFound />;

  return (
    <div>
      <section className="bg-[var(--color-bg-primary)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-[60px]">
          <Link to="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"><ArrowLeft size={16} />Back to all work</Link>
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Case Study · {project.category}</p><h1 className="mt-5 font-display text-6xl leading-[0.92] tracking-wide sm:text-8xl">{project.name}</h1><p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)]">A focused CMM engagement built around a clearer brand presence and a more effective digital experience.</p></div>
            <div className="flex min-h-72 items-center justify-center border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] p-12"><img src={project.logo} alt={project.name} className="max-h-44 max-w-full object-contain" referrerPolicy="no-referrer" /></div>
          </div>
        </div>
      </section>
      <section className="border-y border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] py-8"><div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-[0.8fr_1.2fr_1fr] md:px-8 lg:px-[60px]"><div><p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Client</p><p className="mt-2 font-semibold">{project.name}</p></div><div><p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Services</p><p className="mt-2 font-semibold">{project.sol.join(' · ')}</p></div><div><p className="text-xs uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Focus</p><p className="mt-2 font-semibold">{project.category}</p></div></div></section>
      <section className="bg-[var(--color-bg-primary)] py-24 sm:py-32"><div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-[60px]"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">01 · The challenge</p><h2 className="mt-5 font-display text-5xl tracking-wide sm:text-6xl">Make the brand easier to notice and choose.</h2><p className="mt-8 max-w-xl text-xl leading-relaxed text-[var(--color-text-muted)]">{project.prob}</p></div><div className="border-l-2 border-[var(--color-accent)] bg-[var(--color-card-bg)] p-8 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">The outcome</p><p className="mt-5 font-display text-4xl leading-tight tracking-wide sm:text-5xl">{project.result}</p></div></div></section>
      <section className="bg-[var(--color-bg-secondary)] py-24 sm:py-32"><div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-[60px]"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">02 · The work</p><h2 className="mt-5 font-display text-5xl tracking-wide sm:text-6xl">What CMM delivered.</h2><div className="mt-12 grid gap-px border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] md:grid-cols-2">{project.sol.map((service, index) => <div key={service} className="bg-[var(--color-card-bg)] p-8"><p className="font-display text-3xl text-[var(--color-accent)]">0{index + 1}</p><div className="mt-10 flex items-center gap-3"><CheckCircle2 size={18} className="text-[var(--color-accent)]" /><p className="text-lg font-semibold">{service}</p></div></div>)}</div></div></section>
      <section className="bg-[var(--color-bg-primary)] py-24 sm:py-32"><div className="mx-auto max-w-5xl px-6 text-center"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Your next move</p><h2 className="mt-5 font-display text-6xl tracking-wide sm:text-8xl">Ready for work that works?</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)]">Let’s build a clear, distinctive presence that helps the right people choose your brand.</p><div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"><Button href="/contact">Start your project <ArrowRight className="ml-2 h-4 w-4" /></Button><Button href="/work" variant="outline">Explore more work</Button></div></div></section>
    </div>
  );
}
