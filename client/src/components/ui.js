import React from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, MoreHorizontal, Loader2, LayoutGrid, List, Plus } from 'lucide-react';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    outline: 'btn-outline'
  };
  const sizes = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-sm'
  };
  return (
    <button className={`${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input = ({ className = '', ...props }) => <input className={`input-base ${className}`} {...props} />;
export const Select = ({ className = '', ...props }) => <select className={`input-base ${className}`} {...props} />;

export const SearchBar = ({ className = '', ...props }) => (
  <div className={`relative ${className}`}>
    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    <Input className="pl-11" {...props} />
  </div>
);

export const StatusBadge = ({ status }) => {
  const map = {
    Applied: 'status-applied',
    Interview: 'status-interview',
    Offer: 'status-offer',
    Rejected: 'status-rejected'
  };
  return <span className={`metric-chip ${map[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>;
};

export const DashboardCard = ({ title, value, delta, icon: Icon, tone = 'brand' }) => (
  <motion.div whileHover={{ y: -4 }} className="metric-card">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="metric-label">{title}</p>
        <p className="metric-value">{value}</p>
        {delta && <p className="mt-2 text-sm text-slate-500">{delta}</p>}
      </div>
      {Icon && (
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone === 'brand' ? 'bg-brand-50 text-brand-600' : tone === 'success' ? 'bg-emerald-50 text-emerald-600' : tone === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  </motion.div>
);

export const EmptyState = ({ title, description, action }) => (
  <div className="surface-panel flex flex-col items-center justify-center px-6 py-16 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
      <Plus className="h-7 w-7" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export const SkeletonCard = () => <div className="surface-panel animate-pulse p-5"><div className="h-4 w-24 rounded bg-slate-200" /><div className="mt-4 h-8 w-36 rounded bg-slate-200" /><div className="mt-4 h-24 rounded-2xl bg-slate-200" /></div>;

export const Pagination = ({ page, pages, onPrev, onNext }) => (
  <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
    <span>
      Page <span className="font-semibold text-slate-900">{page}</span> of <span className="font-semibold text-slate-900">{pages}</span>
    </span>
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onPrev} disabled={page <= 1}>Prev</Button>
      <Button variant="outline" size="sm" onClick={onNext} disabled={page >= pages}>Next</Button>
    </div>
  </div>
);

export const ViewToggle = ({ value, onChange }) => (
  <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
    <button onClick={() => onChange('grid')} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${value === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}><LayoutGrid className="h-4 w-4" />Grid</button>
    <button onClick={() => onChange('list')} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${value === 'list' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}><List className="h-4 w-4" />List</button>
  </div>
);

export const DropdownButton = ({ label }) => (
  <button className="btn-outline inline-flex items-center gap-2">
    {label}
    <ChevronDown className="h-4 w-4" />
  </button>
);

export const LoadingSpinner = () => <div className="flex min-h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand-600" /></div>;
