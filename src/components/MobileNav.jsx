import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Movies', href: '/', icon: 'movie' },
  { label: 'TV', href: '/tv', icon: 'tv' },
  { label: 'Discover', href: '/recommendations', icon: 'explore' },
  { label: 'Watchlist', href: '/watchlist', icon: 'bookmark' },
  { label: 'Community', href: '/community', icon: 'groups' },
];

export default function MobileNav() {
  const location = useLocation();

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/95 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 w-14 py-1.5 rounded-xl transition-all ${
                active
                  ? 'text-primary-container'
                  : 'text-on-surface-variant active:text-on-surface'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px] leading-none"
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
