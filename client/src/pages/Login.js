import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/layout';
import { Button, Input } from '../components/ui';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally { setLoading(false); }
  };

  const fillDemo = () => setForm({ email: 'demo@careerflow.com', password: 'demo1234' });

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to your dashboard"
      description="Access your recommendations, progress, and polished learning analytics in one premium workspace."
      sideTitle="Trusted by ambitious learners"
      sideBullets={[
        { title: 'Fast sign-in', description: 'A focused form with crisp hierarchy and strong accessibility.' },
        { title: 'Demo account', description: 'One click to explore the full dashboard without setup friction.' },
        { title: 'Premium motion', description: 'Framer Motion interactions keep the login flow feeling refined.' }
      ]}
    >
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {error && <div className="alert alert-error">{error}</div>}

        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" className="btn-outline">
            <Sparkles className="h-4 w-4" /> Continue with Google
          </button>
          <button type="button" className="btn-outline">
            <ShieldCheck className="h-4 w-4" /> Continue with LinkedIn
          </button>
        </div>

        <div className="relative flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" /> or sign in with email <span className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <label>Email address</label>
            <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <Input type="password" placeholder="Your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div className="flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="font-medium text-brand-600 hover:text-brand-700">Forgot password?</Link>
            <button type="button" onClick={fillDemo} className="font-medium text-slate-500 hover:text-slate-900">Use demo account</button>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'} <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
            <p>New here? <Link to="/register" className="font-semibold text-brand-600">Create an account</Link> in under a minute.</p>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
