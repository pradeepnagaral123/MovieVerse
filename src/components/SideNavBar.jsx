import { Link, useLocation } from 'react-router-dom';

const sidebarLinks = [
  { icon: 'dynamic_feed', label: 'Feed', href: '/' },
  { icon: 'group', label: 'Friends', href: '/friends' },
  { icon: 'history', label: 'Activity', href: '/activity' },
  { icon: 'format_list_bulleted', label: 'Lists', href: '/lists' },
  { icon: 'ballot', label: 'Polls', href: '/community/polls' },
  { icon: 'settings', label: 'Settings', href: '/settings' },
];

export default function SideNavBar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-80px)] w-64 bg-surface-container-low/50 backdrop-blur-md border-r border-white/10 flex flex-col p-6 gap-4 z-40 hidden xl:flex">
      <div className="mb-4">
        <div className="text-[24px] font-bold text-primary-container">Community</div>
        <div className="text-on-surface-variant text-[12px] tracking-[0.05em] font-medium">
          Connect with critics
        </div>
      </div>
      <nav className="space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.label}
              to={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg active:scale-95 transition-transform ${
                isActive
                  ? 'text-primary-container font-bold bg-primary-container/10 border-r-4 border-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {link.icon}
              </span>
              <span className="text-[12px] tracking-[0.05em] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-4">
        <div className="glass-card p-4 rounded-xl !hover:transform-none">
          <div className="text-primary-container font-bold text-[24px] leading-[1.3]">1.2k</div>
          <div className="text-on-surface-variant text-[12px]">Reviews this week</div>
        </div>
        <button className="w-full bg-primary-container text-on-primary-container font-bold py-4 rounded-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer">
          Write a Review
        </button>
      </div>
    </aside>
  );
}
