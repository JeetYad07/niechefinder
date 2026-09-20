import React, { useState } from 'react';
import { X, Mail, Phone, MessageSquare, Copy, Check, Sparkles } from 'lucide-react';
import { generateOutreachPitch } from '../utils/outreachGenerator';

interface OutreachGeneratorModalProps {
  problemTitle: string;
  targetBuyer: string;
  theBleedingNeck: string;
  priceStr: string;
  onClose: () => void;
}

export const OutreachGeneratorModal: React.FC<OutreachGeneratorModalProps> = ({
  problemTitle,
  targetBuyer,
  theBleedingNeck,
  priceStr,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'email' | 'call' | 'dm'>('email');
  const [copied, setCopied] = useState(false);

  const script = generateOutreachPitch(problemTitle, targetBuyer, theBleedingNeck, priceStr);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-card border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto p-5 sm:p-6 space-y-6 text-xs text-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Cold Outreach Pitch Generator</h3>
              <p className="text-[11px] text-neutral-400">Pre-built high-converting scripts for prospect outreach</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
          <button
            onClick={() => setActiveTab('email')}
            className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'email' ? 'bg-amber-500 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>3-Sentence Email</span>
          </button>
          <button
            onClick={() => setActiveTab('call')}
            className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'call' ? 'bg-amber-500 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>30-Sec Call Script</span>
          </button>
          <button
            onClick={() => setActiveTab('dm')}
            className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'dm' ? 'bg-amber-500 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>LinkedIn / DM</span>
          </button>
        </div>

        {/* Output Box */}
        {activeTab === 'email' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-neutral-800/60 border border-neutral-700 space-y-1">
              <span className="text-[10px] text-neutral-400 font-bold uppercase block">Subject Line</span>
              <div className="text-white font-semibold text-xs">{script.coldEmail.subject}</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">
              {script.coldEmail.body}
            </div>
            <button
              onClick={() => handleCopy(`Subject: ${script.coldEmail.subject}\n\n${script.coldEmail.body}`)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Cold Email Script' : 'Copy Cold Email Script'}</span>
            </button>
          </div>
        )}

        {activeTab === 'call' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 leading-relaxed">
              <div>
                <strong className="text-amber-400 block font-bold text-xs mb-0.5">1. The Hook (0-10 sec):</strong>
                <span className="text-neutral-300">{script.coldCall.hook}</span>
              </div>
              <div className="pt-2 border-t border-neutral-800">
                <strong className="text-emerald-400 block font-bold text-xs mb-0.5">2. The Solution (10-20 sec):</strong>
                <span className="text-neutral-300">{script.coldCall.body}</span>
              </div>
              <div className="pt-2 border-t border-neutral-800">
                <strong className="text-blue-400 block font-bold text-xs mb-0.5">3. Low-Pressure CTA (20-30 sec):</strong>
                <span className="text-neutral-300">{script.coldCall.cta}</span>
              </div>
            </div>
            <button
              onClick={() => handleCopy(`${script.coldCall.hook}\n\n${script.coldCall.body}\n\n${script.coldCall.cta}`)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Call Script' : 'Copy 30-Sec Call Script'}</span>
            </button>
          </div>
        )}

        {activeTab === 'dm' && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-xs leading-relaxed">
              {script.linkedinDm}
            </div>
            <button
              onClick={() => handleCopy(script.linkedinDm)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied LinkedIn DM' : 'Copy LinkedIn Direct Message'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
