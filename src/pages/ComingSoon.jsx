import { Link } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';

export default function ComingSoon({ title = 'This page', icon = 'construction', description }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Movies" />
      <SideNavBar />

      <main className="xl:ml-64 px-4 md:px-12 pt-28 pb-24 md:pb-20">
        <div className="max-w-[1280px] mx-auto flex items-center justify-center min-h-[70vh]">
          <div className="glass-panel rounded-3xl border-white/10 px-6 py-14 md:px-16 md:py-20 text-center max-w-xl w-full">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-container/15 border border-primary-container/30 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary-container text-[40px]">{icon}</span>
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/15 border border-primary-container/30 text-primary-container text-[11px] tracking-[0.2em] uppercase font-black mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
              Coming soon
            </span>
            <h1 className="text-[28px] md:text-[40px] font-black tracking-tight mb-3">{title}</h1>
            <p className="text-on-surface-variant text-[15px] md:text-[16px] leading-relaxed mb-8">
              {description || `We're still building this page. Check back soon — ${title} is on the way.`}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/home"
                className="px-6 py-3 bg-primary-container text-on-primary-container rounded-full font-black text-[14px] hover:brightness-110 active:scale-95 transition-all"
              >
                Back to Feed
              </Link>
              <Link
                to="/community"
                className="px-6 py-3 border border-white/15 rounded-full font-bold text-[14px] hover:bg-white/5 transition-colors"
              >
                Explore Community
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
