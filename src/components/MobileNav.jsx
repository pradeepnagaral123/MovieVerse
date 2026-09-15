import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Movies', href: '/home', icon: 'movie' },
  { label: 'TV', href: '/tv', icon: 'tv' },
  { label: 'Discover', href: '/recommendations', icon: 'explore' },
  { label: 'Watchlist', href: '/watchlist', icon: 'bookmark' },
  { label: 'Community', href: '/community', icon: 'groups' },
];

function isItemActive(href, pathname) {
  switch (href) {
    case '/home':
      return (
        pathname === '/home' ||
        pathname.startsWith('/movie') ||
        pathname.startsWith('/film') ||
        pathname.startsWith('/search') ||
        pathname.startsWith('/actor')
      );
    case '/tv':
      return pathname.startsWith('/tv');
    case '/recommendations':
      return pathname.startsWith('/recommendations');
    case '/watchlist':
      return pathname.startsWith('/watchlist');
    case '/community':
      return (
        pathname.startsWith('/community') ||
        pathname.startsWith('/polls') ||
        pathname.startsWith('/lists')
      );
    default:
      return false;
  }
}

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/95 backdrop-blur-xl border-t border-white/10 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.45)] safe-area-bottom safe-area-x"
    >
      <div className="flex items-stretch justify-around h-16 px-1">
        {navItems.map((item) => {
          const active = isItemActive(item.href, location.pathname);
          return (
            <Link
              key={item.label}
              to={item.href}
              aria-current={active ? 'page' : undefined}
              className={`relative flex flex-1 min-w-0 flex-col items-center justify-center gap-1 py-1.5 transition-colors ${
                active ? 'text-primary-container' : 'text-on-surface-variant active:text-on-surface'
              }`}
            >
              <span
                className={`flex items-center justify-center w-12 h-7 rounded-full transition-all duration-300 ${
                  active ? 'bg-primary-container/15' : 'bg-transparent'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[23px] leading-none"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
              </span>
              <span
                className={`text-[10px] leading-none truncate max-w-full px-0.5 ${
                  active ? 'font-bold' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary-container" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
