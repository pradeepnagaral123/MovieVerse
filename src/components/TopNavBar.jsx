import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Movies', href: '/', icon: 'movie' },
  { label: 'TV Shows', href: '/tv', icon: 'tv' },
  { label: 'Recommendations', href: '/recommendations', icon: 'explore' },
  { label: 'Watchlist', href: '/watchlist', icon: 'bookmark' },
  { label: 'Community', href: '/community', icon: 'groups' },
];

export default function TopNavBar({ activeLink = 'Movies' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isProfile = location.pathname === '/profile';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 border-b border-white/10 shadow-sm transition-all duration-300 ease-in-out ${
          scrolled
            ? 'h-16 bg-surface/95 backdrop-blur-xl'
            : 'h-20 bg-surface/80 backdrop-blur-xl'
        }`}
      >
        <div className="flex justify-between items-center px-4 md:px-12 h-full max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-on-surface-variant hover:bg-white/5 rounded-full transition-all"
            >
              <span className="material-symbols-outlined text-[28px]">menu</span>
            </button>
            <Link to="/" className="text-[28px] md:text-[48px] font-black text-primary-container tracking-tighter leading-none">
              CineVerse
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-[16px] font-normal transition-colors ${
                  activeLink === link.label
                    ? 'text-primary-container border-b-2 border-primary-container pb-1'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:bg-white/5 rounded-full transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <Link to="/profile" className={`w-10 h-10 rounded-full overflow-hidden transition-all ${isProfile ? 'border-2 border-primary-container shadow-[0_0_12px_rgba(255,128,0,0.5)]' : 'border border-primary-container/30'}`}>
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW_WsP_rWwVu3IkEsdfGbq8slZ3yNuUBsk2Hkr4mkDMte4KMx03t1raztNxSpb3xdhcoFO9ol7ch_KH33YlBWR8HZQiHFvccNpFW3ouKVVBNj-phrqhJowl6oHlAbu9Bw-pcTYJdCkAqdVj9faNk1GJAnrYucnnTASc7_DyxHAPkdA_3ja1tRzFNYGCT4_dG40YGs5ukdRmMpTqS0jlL3E3FJESSoUXgD26gV2CTsSj9F9bMZSxWgh"
                alt="Profile"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-surface border-r border-white/10 shadow-2xl flex flex-col animate-slide-in">
            <div className="flex items-center justify-between px-5 h-20 border-b border-white/10">
              <span className="text-[24px] font-black text-primary-container tracking-tighter">
                CineVerse
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 -mr-2 text-on-surface-variant hover:bg-white/5 rounded-full transition-all"
              >
                <span className="material-symbols-outlined text-[28px]">close</span>
              </button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = activeLink === link.label;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-[16px] font-medium transition-all ${
                      isActive
                        ? 'bg-primary-container/15 text-primary-container'
                        : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface active:bg-white/10'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[22px]"
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-5 py-5 border-t border-white/10">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-container/30">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW_WsP_rWwVu3IkEsdfGbq8slZ3yNuUBsk2Hkr4mkDMte4KMx03t1raztNxSpb3xdhcoFO9ol7ch_KH33YlBWR8HZQiHFvccNpFW3ouKVVBNj-phrqhJowl6oHlAbu9Bw-pcTYJdCkAqdVj9faNk1GJAnrYucnnTASc7_DyxHAPkdA_3ja1tRzFNYGCT4_dG40YGs5ukdRmMpTqS0jlL3E3FJESSoUXgD26gV2CTsSj9F9bMZSxWgh"
                    alt="Profile"
                  />
                </div>
                <div>
                  <p className="text-on-surface font-bold text-[14px]">Sarah Chen</p>
                  <p className="text-on-surface-variant text-[12px]">@sarahcineVerse</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
