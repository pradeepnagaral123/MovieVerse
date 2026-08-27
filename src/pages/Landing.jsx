import { useState } from 'react';
import AuthModal from '../components/AuthModal';

const features = [
  {
    icon: 'explore',
    title: 'Vibe-Based Discovery',
    desc: 'Search movies by mood, color palette, or a director\'s era — not just title and genre.',
  },
  {
    icon: 'groups',
    title: 'Film Community',
    desc: 'Track, review, and debate the films you love with critics who breathe cinema.',
  },
  {
    icon: 'bookmark',
    title: 'Smart Watchlist',
    desc: 'Curate watchlists, get personalized recommendations, and never miss an upcoming release.',
  },
  {
    icon: 'ballot',
    title: 'Community Polls',
    desc: 'Vote on the hottest debates — from best endings to most rewatchable scenes.',
  },
];

const stats = [
  { value: '120k+', label: 'Movies & Shows' },
  { value: '12k+', label: 'Film Logs' },
  { value: '4.8k', label: 'Active Now' },
  { value: '1.2k', label: 'Reviews Weekly' },
];

export default function Landing() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="radar-grid min-h-screen flex flex-col">
        {/* Nav */}
        <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-surface/80 backdrop-blur-xl">
          <div className="flex justify-between items-center px-4 md:px-12 h-16 md:h-20 max-w-[1280px] mx-auto">
            <span className="text-[28px] md:text-[48px] font-black text-primary-container tracking-tighter leading-none">
              CineVerse
            </span>
            <button
              onClick={() => setAuthOpen(true)}
              className="px-5 py-2.5 bg-primary-container text-on-primary-container rounded-full font-bold text-[14px] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="flex-1 flex items-center justify-center px-4 pt-32 pb-20 md:pt-40 md:pb-28 text-center">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-white/10 text-on-surface-variant text-[12px] tracking-[0.1em] uppercase font-medium mb-8">
              <span className="material-symbols-outlined text-secondary text-[16px]">local_fire_department</span>
              Built for those who breathe cinema
            </span>
            <h1 className="text-[40px] md:text-[64px] leading-[1.05] font-black tracking-tight mb-6">
              Find your next{' '}
              <span className="text-primary-container">obsession</span>.
            </h1>
            <p className="text-on-surface-variant text-[18px] md:text-[22px] leading-relaxed max-w-xl mx-auto mb-10">
              CineVerse is a mood-driven movie tracker and community — discover films by vibe,
              track what you watch, and debate with critics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setAuthOpen(true)}
                className="px-10 py-4 bg-primary-container text-on-primary-container rounded-full font-black text-[18px] hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,128,0,0.35)]"
              >
                Get Started
              </button>
              <a
                href="#features"
                className="px-10 py-4 border border-white/20 rounded-full font-bold text-[18px] hover:bg-white/5 transition-colors"
              >
                Explore
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 md:px-12 pb-20">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
                  <div className="text-[28px] md:text-[36px] font-black text-primary-container leading-tight">{s.value}</div>
                  <div className="text-[12px] text-on-surface-variant tracking-[0.1em] uppercase font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-4 md:px-12 pb-24">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-[32px] md:text-[44px] font-black tracking-tight text-center mb-4">
              Why <span className="text-primary-container">CineVerse</span>?
            </h2>
            <p className="text-on-surface-variant text-center text-[18px] mb-12 max-w-xl mx-auto">
              Everything you need to track, discover, and debate film — in one place.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div key={f.title} className="glass-card rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/15 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary-container text-[26px]">{f.icon}</span>
                  </div>
                  <h3 className="text-[18px] font-bold mb-2">{f.title}</h3>
                  <p className="text-on-surface-variant text-[14px] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 md:px-12 pb-24">
          <div className="max-w-[1280px] mx-auto glass-panel rounded-3xl p-10 md:p-16 text-center border-primary-container/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[48px] font-black tracking-tight text-white mb-4">
                Ready to find your next obsession?
              </h2>
              <p className="text-white/70 text-[18px] mb-8 max-w-lg mx-auto">
                Join CineVerse free. Track, discover, and debate with a community that loves film as much as you do.
              </p>
              <button
                onClick={() => setAuthOpen(true)}
                className="px-10 py-4 bg-primary-container text-on-primary-container rounded-full font-black text-[18px] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 px-4 md:px-12">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] tracking-[0.05em] font-medium text-white/30">
            <span>&copy; 2026 CINEVERSE MEDIA GROUP</span>
            <span className="text-[28px] font-black text-primary-container tracking-tighter">CineVerse</span>
            <span>BUILT WITH PASSION FOR FILM</span>
          </div>
        </footer>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
