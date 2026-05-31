import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LayoutDashboard, BookOpen, Sparkles, UserCircle2, Settings, LogOut, Menu, Search, FolderHeart, PanelLeftClose, MoonStar, SunMedium } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { SearchBar } from './ui';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/recommendations', label: 'Recommendations', icon: Sparkles },
  { to: '/my-learning', label: 'My Learning', icon: FolderHeart },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
  { to: '/settings', label: 'Settings', icon: Settings }
];

const titleMap = {
  '/dashboard': ['Dashboard', 'Track progress, highlight wins, and stay ahead.'],
  '/courses': ['Course Catalog', 'Discover the best next course for your learning path.'],
  '/recommendations': ['Recommendations', 'Personalized picks tuned to your profile.'],
  '/my-learning': ['My Learning', 'Monitor your current enrollments and progress.'],
  '/profile': ['Profile', 'Fine-tune your profile to improve recommendations.'],
  '/settings': ['Settings', 'Control theme, notifications, and account preferences.']
};

export const AppLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('lf_theme') === 'dark');

  const current = useMemo(() => titleMap[location.pathname] || ['Dashboard', ''], [location.pathname]);
  const initials = user?.name?.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2) || 'LF';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('lf_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page-shell dark:bg-slate-950">
      <div className="min-h-screen lg:grid lg:grid-cols-[284px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-white/85 px-4 py-5 shadow-sm backdrop-blur-xl lg:block">
          <div className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white px-4 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <Link to="/dashboard" className="mb-8 flex items-center gap-3 px-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
                <span className="text-sm font-black">LF</span>
              </div>
              <div>
                <div className="text-lg font-extrabold tracking-tight text-slate-900">CareerFlow</div>
                <div className="text-xs text-slate-500">Premium learning OS</div>
              </div>
            </Link>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-auto rounded-[24px] bg-slate-900 p-4 text-white shadow-soft">
              <div className="text-sm font-semibold">Career growth</div>
              <p className="mt-2 text-sm text-slate-300">Keep your learning momentum visible with a polished dashboard.</p>
              <button onClick={() => navigate('/courses')} className="btn-primary mt-4 w-full">Explore Courses</button>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/75 backdrop-blur-xl">
            <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle navigation">
                <Menu className="h-5 w-5" />
              </button>

              <div className="min-w-0 flex-1">
                <h1 className="truncate text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">{current[0]}</h1>
                <p className="truncate text-sm text-slate-500">{current[1]}</p>
              </div>

              <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses, lessons, people..." className="hidden w-[340px] lg:block" />

              <button
                onClick={() => setDarkMode((value) => !value)}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                aria-label="Toggle theme"
              >
                {darkMode ? <SunMedium className="h-4 w-4 text-amber-500" /> : <MoonStar className="h-4 w-4 text-brand-600" />}
                <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
              </button>

              <button className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </button>

              <div className="relative hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm md:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-sm font-bold text-white">{initials}</div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{user?.name || 'User'}</div>
                  <div className="truncate text-xs text-slate-500">{user?.level || 'Learner'}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="h-full w-[300px] bg-white p-4 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <Link to="/dashboard" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
                    <span className="text-sm font-black">LF</span>
                  </div>
                  <div>
                    <div className="text-lg font-extrabold tracking-tight text-slate-900">CareerFlow</div>
                    <div className="text-xs text-slate-500">Premium learning OS</div>
                  </div>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="rounded-xl border border-slate-200 p-2 text-slate-600">
                  <PanelLeftClose className="h-5 w-5" />
                </button>
              </div>

              <div className="py-4">
                <SearchBar value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search..." />
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={() => navigate('/profile')} className="btn-outline">Profile</button>
                <button onClick={handleLogout} className="btn-ghost">Logout</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AuthLayout = ({ eyebrow, title, description, children, sideTitle, sideBullets }) => {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.2),transparent_26%)]" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-2xl shadow-brand-500/10">
              <span className="text-sm font-black">LF</span>
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight">CareerFlow</div>
              <div className="text-sm text-slate-300">Premium learning OS</div>
            </div>
          </div>

          <div className="relative z-10 max-w-xl">
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur">
              {sideTitle}
            </p>
            <h2 className="text-5xl font-black leading-[1.05] tracking-tight text-white text-balance">Build a dashboard recruiters remember.</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">A polished SaaS interface with premium motion, crisp hierarchy, and a modern learning workflow that feels ready for a product demo or portfolio review.</p>
          </div>

          <div className="relative z-10 grid gap-4 sm:grid-cols-3">
            {sideBullets.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-300">{item.description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-[560px]">
            <div className="mb-6 lg:hidden">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white"><span className="text-sm font-black">LF</span></div>
                <div>
                  <div className="font-extrabold text-slate-900">CareerFlow</div>
                  <div className="text-xs text-slate-500">Premium learning OS</div>
                </div>
              </div>
            </div>

            <div className="surface-panel p-6 sm:p-8">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">{description}</p>
              </div>
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
