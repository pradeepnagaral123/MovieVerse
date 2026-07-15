import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Movies', href: '/' },
  { label: 'TV Shows', href: '/tv' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Watchlist', href: '/watchlist' },
  { label: 'Community', href: '/community' },
];

export default function TopNavBar({ activeLink = 'Movies' }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isProfile = location.pathname === '/profile';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b border-white/10 shadow-sm transition-all duration-300 ease-in-out ${
        scrolled
          ? 'h-16 bg-surface/95 backdrop-blur-xl'
          : 'h-20 bg-surface/80 backdrop-blur-xl'
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-12 h-full max-w-[1280px] mx-auto">
        <Link to="/" className="text-[28px] md:text-[48px] font-black text-primary-container tracking-tighter leading-none">
          CineVerse
        </Link>
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
  );
}
