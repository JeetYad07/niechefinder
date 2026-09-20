import React, { useState, useEffect } from 'react';
import { ThumbsUp, Plus, ShieldAlert, CheckCircle2, MessageSquare, Flame } from 'lucide-react';

interface CommunityPost {
  id: string;
  title: string;
  category: string;
  targetCustomer: string;
  thePain: string;
  estimatedPrice: string;
  upvotes: number;
  submittedBy: string;
}

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'HVAC Contractor Refrigerant Recovery Log Compliance',
    category: 'Trades & Operations',
    targetCustomer: 'HVAC Shop Owners & Service Managers',
    thePain: 'EPA Section 608 fines for unrecorded R-410A refrigerant recovery exceed $44,000/day. Technicians keep paper logbooks that get wet or lost in service vans.',
    estimatedPrice: '$99/mo per shop',
    upvotes: 42,
    submittedBy: 'Mike T. (HVAC Technician)',
  },
  {
    id: 'post-2',
    title: 'Veterinary Clinic Controlled Substance Scrap & Audit Tracker',
    category: 'Healthcare & Vet',
    targetCustomer: 'Vet Clinic Practice Managers',
    thePain: 'DEA audit inspections require 100% accurate bottle-level liquid wastage tracking. Missing 5ml of ketamine results in license suspension.',
    estimatedPrice: '$149/mo',
    upvotes: 35,
    submittedBy: 'Dr. Sarah K.',
  },
];

export const CommunityPainFeed: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Trades & Operations');
  const [newTarget, setNewTarget] = useState('');
  const [newPain, setNewPain] = useState('');
  const [newPrice, setNewPrice] = useState('$79/mo');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nicheradar_community_posts');
      if (stored) {
        setPosts(JSON.parse(stored));
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const handleUpvote = (id: string) => {
    if (upvotedIds.includes(id)) return;
    setUpvotedIds((prev) => [...prev, id]);
    setPosts((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
      try {
        localStorage.setItem('nicheradar_community_posts', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPain.trim()) return;

    const post: CommunityPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      targetCustomer: newTarget || 'Small Business Operators',
      thePain: newPain,
      estimatedPrice: newPrice,
      upvotes: 1,
      submittedBy: 'Indie Founder',
    };

    const next = [post, ...posts];
    setPosts(next);
    try {
      localStorage.setItem('nicheradar_community_posts', JSON.stringify(next));
    } catch (e) {
      console.warn(e);
    }

    setNewTitle('');
    setNewPain('');
    setNewTarget('');
    setShowSubmitModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card border border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold mb-1">
            <Flame className="w-3.5 h-3.5" />
            <span>Crowdsourced Niche Feed</span>
          </div>
          <h2 className="text-xl font-black text-white">Real Business Pain Submissions</h2>
          <p className="text-xs text-neutral-400">Pains submitted by real business operators and indie founders.</p>
        </div>
        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post Pain Point</span>
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {posts.map((post) => {
          const isUpvoted = upvotedIds.includes(post.id);
          return (
            <div key={post.id} className="glass-card border border-neutral-800 rounded-2xl p-5 flex items-start gap-4">
              <button
                onClick={() => handleUpvote(post.id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer min-w-[50px] ${
                  isUpvoted
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 font-bold'
                    : 'bg-neutral-800/60 border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-600'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${isUpvoted ? 'fill-amber-400' : ''}`} />
                <span className="text-xs font-black mt-1">{post.upvotes}</span>
              </button>

              <div className="flex-1 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px] font-semibold border border-neutral-700">
                    {post.category}
                  </span>
                  <span className="text-neutral-500 text-[10px]">Posted by {post.submittedBy}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{post.title}</h3>
                <p className="text-neutral-300 leading-relaxed bg-red-950/20 border border-red-900/30 p-3 rounded-xl text-red-200">
                  <strong className="text-red-400 block font-semibold mb-0.5">The Acute Pain:</strong>
                  {post.thePain}
                </p>

                <div className="flex items-center justify-between text-neutral-400 pt-1 text-[11px]">
                  <div><strong className="text-neutral-300">Target Buyer:</strong> {post.targetCustomer}</div>
                  <div><strong className="text-emerald-400">{post.estimatedPrice}</strong></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md glass-card border border-neutral-800 rounded-2xl p-6 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white">Post a Real Operational Pain Point</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Problem Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Commercial Roofing Warranty Inspection Logging"
                  className="w-full p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Target Buyer</label>
                <input
                  type="text"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="e.g. Roofing Contractors & Shop Managers"
                  className="w-full p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">The Acute Financial/Time Pain *</label>
                <textarea
                  rows={3}
                  value={newPain}
                  onChange={(e) => setNewPain(e.target.value)}
                  placeholder="e.g. Roofers lose $5k per unfiled warranty claim because paper logs get ruined in rainstorms..."
                  className="w-full p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 font-extrabold cursor-pointer"
                >
                  Submit Pain Point
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
