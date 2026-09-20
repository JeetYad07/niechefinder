import React, { useState } from 'react';
import { Mail, Check, X, Sparkles, Flame } from 'lucide-react';

interface NewsletterModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen = true, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubmitted(true);
    try {
      localStorage.setItem('nicheradar_subscribed_email', email);
    } catch (err) {
      console.warn(err);
    }
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      onClose();
    }, 2200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md glass-card border border-neutral-800 rounded-2xl p-6 text-center space-y-4 text-xs text-neutral-200 shadow-2xl"
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer select-none"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-2 shadow-inner">
          <Flame className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-black text-white">Get 1 Unsexy B2B Idea Every Tuesday</h3>
        <p className="text-neutral-400 leading-relaxed max-w-xs mx-auto">
          Join 2,400+ solo builders receiving pre-validated unsexy SaaS blueprints with proven willingness to pay directly to their inbox.
        </p>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-emerald-300 font-bold flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>You're subscribed! See you next Tuesday.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="founder@yourdomain.com"
              className="w-full p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold transition-all cursor-pointer shadow-md"
            >
              Get Free Weekly Blueprints
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
