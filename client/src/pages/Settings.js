import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, MoonStar, Shield, SunMedium, UserCog } from 'lucide-react';
import { Button } from '../components/ui';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('lf_theme') === 'dark');
  const [notifications, setNotifications] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('lf_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="surface-panel p-6 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          <UserCog className="h-3.5 w-3.5" /> Account preferences
        </div>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">Settings</h2>
        <p className="mt-2 text-sm text-slate-500">Customize theme, notifications, and account security in one place.</p>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="surface-panel p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><MoonStar className="h-5 w-5" /></div>
            <div>
              <div className="text-lg font-bold text-slate-900">Theme</div>
              <div className="text-sm text-slate-500">Toggle the visual style for your workspace.</div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <div className="font-semibold text-slate-900">Dark mode</div>
              <div className="text-sm text-slate-500">Use the darker UI for low-light environments.</div>
            </div>
            <button onClick={() => setDarkMode((value) => !value)} className={`relative h-8 w-14 rounded-full transition ${darkMode ? 'bg-brand-500' : 'bg-slate-300'}`}>
              <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${darkMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <SunMedium className="h-4 w-4 text-amber-500" /> Light mode remains the default until a persistent preference API is added.
          </div>
        </div>

        <div className="surface-panel p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><Bell className="h-5 w-5" /></div>
            <div>
              <div className="text-lg font-bold text-slate-900">Notifications</div>
              <div className="text-sm text-slate-500">Choose what you want to hear about.</div>
            </div>
          </div>
          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <div className="font-semibold text-slate-900">Email updates</div>
              <div className="text-sm text-slate-500">Receive product and learning reminders.</div>
            </div>
            <input type="checkbox" checked={notifications} onChange={(event) => setNotifications(event.target.checked)} className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
          </label>
          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <div className="font-semibold text-slate-900">Security alerts</div>
              <div className="text-sm text-slate-500">Get notified about logins and sensitive changes.</div>
            </div>
            <input type="checkbox" checked={securityAlerts} onChange={(event) => setSecurityAlerts(event.target.checked)} className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
          </label>
        </div>

        <div className="surface-panel p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><Shield className="h-5 w-5" /></div>
            <div>
              <div className="text-lg font-bold text-slate-900">Security</div>
              <div className="text-sm text-slate-500">Keep your account protected.</div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Password, session, and device security controls can be connected to backend endpoints later without changing the layout.
          </div>
          <Button className="mt-4">Update security settings</Button>
        </div>

        <div className="surface-panel p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><Lock className="h-5 w-5" /></div>
            <div>
              <div className="text-lg font-bold text-slate-900">Account management</div>
              <div className="text-sm text-slate-500">Future-proof your product preferences.</div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline">Change password</Button>
            <Button variant="ghost">Delete account</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
