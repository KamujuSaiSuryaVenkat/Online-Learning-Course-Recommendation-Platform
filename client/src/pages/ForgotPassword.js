import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import { AuthLayout } from '../components/layout';
import { Button, Input } from '../components/ui';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Forgot your password?"
      description="We do not have a password reset API in this backend, so this page gives you a polished recovery experience and can later be wired to email reset flows."
      sideTitle="Recovery flow"
      sideBullets={[
        { title: 'Fast reset', description: 'A clean form makes account recovery feel effortless.' },
        { title: 'Security-aware', description: 'Use it as the front end for a future email reset API.' },
        { title: 'Consistent UX', description: 'Matches the same premium authentication system.' }
      ]}
    >
      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="input-group">
            <label>Email address</label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <Button type="submit" className="w-full">Send reset instructions</Button>
          <div className="text-center text-sm text-slate-500">
            Back to <Link to="/login" className="font-semibold text-brand-600">sign in</Link>
          </div>
        </form>
      ) : (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <MailCheck className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-slate-900">Check your inbox</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">A reset link would be sent to <strong>{email}</strong> once the backend reset endpoint is connected.</p>
          <div className="mt-6">
            <Link to="/login" className="btn-primary">Return to sign in</Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
