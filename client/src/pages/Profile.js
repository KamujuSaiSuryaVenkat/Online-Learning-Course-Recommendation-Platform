import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { motion } from 'framer-motion';
import { BadgeCheck, Camera, Crown, UploadCloud } from 'lucide-react';
import { Button, Input, Select } from '../components/ui';

const INTERESTS = ['AI', 'Web Development', 'Data Science', 'Cybersecurity', 'Cloud', 'Mobile'];
const SKILLS = ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Machine Learning', 'Docker', 'AWS', 'Flutter', 'Java'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '', interests: user?.interests || [], skills: user?.skills || [], level: user?.level || 'beginner' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const toggle = (field, val) => {
    setForm(f => ({ ...f, [field]: f[field].includes(val) ? f[field].filter(i => i !== val) : [...f[field], val] }));
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setMsg('');
    try {
      const res = await authAPI.updateProfile(form);
      updateUser(res.data.user);
      setMsg('Profile updated successfully!');
    } catch (err) { setMsg('Failed to update profile'); }
    finally { setSaving(false); }
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const completion = Math.min(100, 25 + form.name.length + form.bio.length / 4 + form.interests.length * 4 + form.skills.length * 3);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="surface-panel p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-500 text-3xl font-black text-white shadow-lg shadow-brand-500/20">{initials}</div>
            <div>
              <div className="text-3xl font-black tracking-tight text-slate-900">{user?.name}</div>
              <div className="mt-1 text-sm text-slate-500">{user?.email}</div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700"><Crown className="h-3.5 w-3.5" /> {user?.streak} day streak</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-brand-700">⚡ {user?.totalPoints} points</span>
                <span className={`badge badge-${user?.level}`}>{user?.level}</span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-xs rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between text-sm font-medium text-slate-600"><span>Profile completion</span><span>{Math.round(completion)}%</span></div>
            <div className="progress-bar mt-3 h-3"><div className="progress-fill" style={{ width: `${completion}%` }} /></div>
            <p className="mt-3 text-xs leading-5 text-slate-500">Complete your profile to improve recommendation quality and account credibility.</p>
          </div>
        </div>
      </motion.section>

      {msg && <div className={`alert ${msg.includes('success') ? 'alert-success' : 'alert-error'}`}>{msg}</div>}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="surface-panel p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><Camera className="h-5 w-5" /></div>
              <div>
                <div className="text-lg font-bold text-slate-900">Profile image</div>
                <div className="text-sm text-slate-500">Upload a photo to complete the premium look.</div>
              </div>
            </div>
            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition hover:border-brand-300 hover:bg-brand-50/40">
              <UploadCloud className="h-8 w-8 text-brand-600" />
              <span className="mt-3 text-sm font-semibold text-slate-900">Upload resume or avatar</span>
              <span className="mt-1 text-xs text-slate-500">PNG, JPG or PDF up to 10MB</span>
              <input type="file" className="hidden" />
            </label>
          </div>

          <div className="surface-panel p-6 space-y-5">
            <div className="input-group"><label>Full name</label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="input-group"><label>Bio</label><textarea className="input min-h-[110px] resize-y" placeholder="Tell us about yourself..." value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
            <div className="input-group"><label>Experience level</label><Select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>{LEVELS.map((level) => <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>)}</Select></div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface-panel p-6">
            <div className="mb-2 text-lg font-bold text-slate-900">Learning interests</div>
            <div className="text-sm text-slate-500">These power your recommendations.</div>
            <div className="chips mt-4">
              {INTERESTS.map((interest) => <button type="button" key={interest} className={`chip ${form.interests.includes(interest) ? 'selected' : ''}`} onClick={() => toggle('interests', interest)}>{interest}</button>)}
            </div>
          </div>
          <div className="surface-panel p-6">
            <div className="mb-2 text-lg font-bold text-slate-900">Your skills</div>
            <div className="text-sm text-slate-500">Helps us tailor the next best course.</div>
            <div className="chips mt-4">
              {SKILLS.map((skill) => <button type="button" key={skill} className={`chip ${form.skills.includes(skill) ? 'selected' : ''}`} onClick={() => toggle('skills', skill)}>{skill}</button>)}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</Button>
      </form>
    </div>
  );
}
