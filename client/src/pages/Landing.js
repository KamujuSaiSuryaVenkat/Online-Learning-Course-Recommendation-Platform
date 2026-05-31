import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BellRing, CheckCircle2, Database, ShieldCheck, Sparkles, Star, Users, Zap } from 'lucide-react';

const stats = [
  { value: '1.2k+', label: 'active learners' },
  { value: '94%', label: 'completion rate' },
  { value: '4.9/5', label: 'avg. rating' },
  { value: '250+', label: 'team dashboards' }
];

const features = [
  { icon: BarChart3, title: 'Executive dashboard', description: 'Track performance, progress, and activity with a sharp SaaS-style overview.' },
  { icon: Zap, title: 'Fast workflows', description: 'Find the next course in seconds with search, filters, and smart recommendations.' },
  { icon: ShieldCheck, title: 'Professional polish', description: 'Glassmorphism, soft shadows, and premium typography create investor-ready visuals.' },
  { icon: BellRing, title: 'Real-time insights', description: 'Charts, streaks, and ranking widgets keep the interface lively and informative.' },
  { icon: Database, title: 'Structured data', description: 'A clean, component-first design system keeps the frontend consistent and scalable.' },
  { icon: Sparkles, title: 'Delightful motion', description: 'Smooth page transitions and micro-interactions make the product feel premium.' }
];

const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Product Designer',
    quote: 'The interface feels like a polished startup dashboard instead of a student project.'
  },
  {
    name: 'Nina Sharma',
    role: 'Frontend Engineer',
    quote: 'Clean hierarchy, excellent spacing, and the dashboard reads well on every screen size.'
  },
  {
    name: 'Rohit Kapoor',
    role: 'Recruiter',
    quote: 'This is the kind of presentation-ready product that stands out in a portfolio review.'
  }
];

export default function Landing() {
  return (
    <div className="page-shell overflow-hidden bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_22%)]" />
        <div className="page relative z-10">
          <div className="glass-panel flex flex-col gap-6 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                <Sparkles className="h-3.5 w-3.5" /> Premium learning dashboard
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-balance text-slate-900 md:text-6xl">
                A modern SaaS learning experience built for portfolio impact.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                CareerFlow combines elegant motion, recruiter-friendly analytics, and a refined UI system that feels closer to Linear, Vercel, and Stripe than a typical student dashboard.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="btn-primary text-sm md:text-base">
                  Get started free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/login" className="btn-outline text-sm md:text-base">
                  Sign in
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
              {stats.map((item) => (
                <div key={item.label} className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-3xl font-extrabold tracking-tight text-slate-900">{item.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div whileHover={{ y: -4 }} className="surface-panel overflow-hidden p-6 md:p-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-brand-600">Analytics preview</p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Insight-rich dashboard cards</h2>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Live</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-brand-50 p-5">
                  <div className="flex items-center justify-between text-brand-700">
                    <Users className="h-5 w-5" />
                    <span className="text-xs font-semibold">+18%</span>
                  </div>
                  <div className="mt-6 text-3xl font-black text-slate-900">2,409</div>
                  <div className="mt-1 text-sm text-slate-500">active sessions</div>
                </div>
                <div className="rounded-3xl bg-slate-900 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <Star className="h-5 w-5 text-amber-400" />
                    <span className="text-xs font-semibold text-slate-300">Top 1%</span>
                  </div>
                  <div className="mt-6 text-3xl font-black">94%</div>
                  <div className="mt-1 text-sm text-slate-300">success rate</div>
                </div>
              </div>
              <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                  <span>Completion trend</span>
                  <span className="text-emerald-600">+12.4%</span>
                </div>
                <div className="mt-4 h-32 rounded-2xl bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(6,182,212,0.18))]" />
              </div>
            </motion.div>

            <div className="grid gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={feature.title} whileHover={{ y: -3 }} className="surface-panel p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="page py-8 md:py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="surface-panel p-6">
              <div className="mb-3 flex items-center gap-2 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm leading-7 text-slate-600">“{item.quote}”</p>
              <div className="mt-5 border-t border-slate-200 pt-4">
                <div className="font-semibold text-slate-900">{item.name}</div>
                <div className="text-sm text-slate-500">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page pb-12">
        <div className="glass-panel flex flex-col gap-5 rounded-[30px] p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Ready to impress</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">Launch a recruiter-grade product in minutes.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/register" className="btn-primary">
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login" className="btn-outline">
              View dashboard
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="page flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-extrabold tracking-tight text-slate-900">CareerFlow</div>
            <p className="mt-1 text-sm text-slate-500">A premium SaaS learning interface for modern portfolios.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <span>Features</span>
            <span>Testimonials</span>
            <span>Pricing</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
