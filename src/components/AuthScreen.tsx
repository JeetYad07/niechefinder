import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Compass, Flame, Sparkles, CheckCircle2, Shield, Lock, ArrowRight, UserCheck, Mail, Key } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsDemo } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Google sign-in failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await signInAsDemo();
    } catch (err: any) {
      console.error(err);
      setError('Demo sign-in failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 antialiased selection:bg-amber-500 selection:text-neutral-950">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center glass-card border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
        {/* Glowing Background Orbs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Column: Product Value Proposition & Social Proof */}
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Compass className="w-4 h-4" />
            <span>Exclusive Founder Access</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Stop searching for consumer apps. <br />
            <span className="text-amber-400">Unlock Unsexy B2B Software Ideas.</span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Access 50+ pre-validated unsexy B2B opportunities, 14-day MVP tech stacks, cold outreach email generators, and crowdsourced pain point feeds.
          </p>

          {/* Key Metrics */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">High B2B Willingness to Pay</h4>
                <p className="text-[11px] text-neutral-400">Average ACV ranges from $600 to $2,400/yr per business client.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Cold Outreach Generator Included</h4>
                <p className="text-[11px] text-neutral-400">Instantly generate 3-sentence cold emails and phone scripts per problem.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">100% Free Founder Account</h4>
                <p className="text-[11px] text-neutral-400">Save your favorite shortlist, upvote community pains, and test ideas with AI.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Auth Form Card */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-5 relative z-10 shadow-xl">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">
                {mode === 'signup' ? 'Create Founder Account' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                {mode === 'signup' ? 'Join 2,400+ solo builders' : 'Sign in to access your saved shortlist'}
              </p>
            </div>
            <button
              onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
              className="text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
            >
              {mode === 'signup' ? 'Log In' : 'Sign Up'}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/50 border border-red-900/60 text-red-300 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Google 1-Click Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-bold transition-all border border-neutral-700 flex items-center justify-center gap-3 cursor-pointer select-none shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-neutral-800 w-full" />
            <span className="bg-neutral-900 px-3 text-[11px] text-neutral-500 uppercase font-bold shrink-0">
              Or email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Your Name</label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivers"
                    className="w-full bg-neutral-800 border border-neutral-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@yourcompany.com"
                  required
                  className="w-full bg-neutral-800 border border-neutral-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-400 mb-1">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-neutral-800 border border-neutral-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>{mode === 'signup' ? 'Create Free Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Demo Login */}
          <div className="pt-2 border-t border-neutral-800/80 text-center">
            <button
              onClick={handleDemoSignIn}
              disabled={isSubmitting}
              className="w-full py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant 1-Click Demo Founder Login</span>
            </button>
            <p className="text-[10px] text-neutral-500 mt-1.5">No email verification required for instant preview.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
