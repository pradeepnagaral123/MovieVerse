import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Movies', href: '/home', icon: 'movie' },
  { label: 'TV Shows', href: '/tv', icon: 'tv' },
  { label: 'Recommendations', href: '/recommendations', icon: 'explore' },
  { label: 'Watchlist', href: '/watchlist', icon: 'bookmark' },
];

const extraLinks = [
  { label: 'Lists', href: '/lists', icon: 'format_list_bulleted' },
  { label: 'Polls', href: '/polls', icon: 'ballot' },
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
        <div className="flex justify-between items-center gap-2 px-4 md:px-12 h-full max-w-[1280px] mx-auto">
          <div className="flex items-center gap-1 md:gap-3 min-w-0">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 -ml-1 text-on-surface-variant hover:bg-white/5 rounded-full transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-[26px]">menu</span>
            </button>
            <Link
              to="/home"
              className="text-[24px] min-[400px]:text-[26px] sm:text-[28px] md:text-[48px] font-black text-primary-container tracking-tighter leading-none truncate"
            >
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
          <div className="flex items-center gap-1 md:gap-4 shrink-0">
            <button
              aria-label="Notifications"
              className="hidden min-[380px]:flex p-2 text-on-surface-variant hover:bg-white/5 rounded-full transition-all"
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <Link to="/profile" aria-label="Profile" className={`w-10 h-10 rounded-full overflow-hidden transition-all ${isProfile ? 'border-2 border-primary-container shadow-[0_0_12px_rgba(255,128,0,0.5)]' : 'border border-primary-container/30'}`}>
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
          <div className="absolute inset-y-0 left-0 w-[min(82vw,20rem)] bg-surface border-r border-white/10 shadow-2xl flex flex-col animate-slide-in safe-area-bottom">
            <div className="flex items-center justify-between px-5 h-20 border-b border-white/10 shrink-0">
              <span className="text-[24px] font-black text-primary-container tracking-tighter">
                CineVerse
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 -mr-2 text-on-surface-variant hover:bg-white/5 rounded-full transition-all"
              >
                <span className="material-symbols-outlined text-[28px]">close</span>
              </button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto overscroll-contain">
              {[...navLinks, ...extraLinks].map((link) => {
                const isActive =
                  activeLink === link.label ||
                  (link.href === '/lists' && location.pathname.startsWith('/lists')) ||
                  (link.href === '/polls' && location.pathname.startsWith('/polls')) ||
                  (link.href === '/community' && location.pathname.startsWith('/community'));
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
            <div className="px-5 py-5 border-t border-white/10 shrink-0">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors min-h-[52px]"
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
