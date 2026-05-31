import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/layout';
import { Button, Input, Select } from '../components/ui';

const INTERESTS = ['AI', 'Web Development', 'Data Science', 'Cybersecurity', 'Cloud', 'Mobile'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', interests: [], level: 'beginner' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const toggleInterest = (interest) => {
    setForm(f => ({ ...f, interests: f.interests.includes(interest) ? f.interests.filter(i => i !== interest) : [...f.interests, interest] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    if (form.interests.length === 0) { setError('Please select at least one interest'); setLoading(false); return; }
    try { await register(form); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <AuthLayout
      eyebrow="Create account"
      title="Set up your workspace"
      description="Tell us a bit about yourself so the dashboard can adapt to your goals, interests, and level."
      sideTitle="Built for personalized learning"
      sideBullets={[
        { title: 'Smart onboarding', description: 'Collect only the details that meaningfully improve the experience.' },
        { title: 'Interest matching', description: 'Use compact selection chips to tailor recommendations.' },
        { title: 'Modern form UX', description: 'Clear labels, validation, and premium spacing throughout.' }
      ]}
    >
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {error && <div className="alert alert-error">{error}</div>}

        <div className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-700">
          <Sparkles className="h-4 w-4" /> Build a premium profile to unlock sharper recommendations.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <label>Full name</label>
            <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <Input type="password" placeholder="Min. 6 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
          </div>
          <div className="input-group">
            <label>Experience level</label>
            <Select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
              {LEVELS.map((level) => <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>)}
            </Select>
          </div>
          <div className="input-group">
            <label>Learning interests</label>
            <div className="chips">
              {INTERESTS.map((interest) => (
                <button type="button" key={interest} className={`chip ${form.interests.includes(interest) ? 'selected' : ''}`} onClick={() => toggleInterest(interest)}>
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Start learning free'} <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
            <p>Already have an account? <Link to="/login" className="font-semibold text-brand-600">Sign in</Link> instead.</p>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
