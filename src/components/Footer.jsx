import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface py-8 md:py-12 px-4 md:px-12 mt-12 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto xl:ml-64 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <div className="text-[32px] md:text-[48px] font-black text-primary-container tracking-tighter mb-4">
            CineVerse
          </div>
          <p className="text-on-surface-variant text-[16px] leading-relaxed">
            Designed for those who breathe cinema. Tracking, reviewing, and discussing the art of
            filmmaking.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-4">
            <h5 className="text-on-surface font-bold uppercase text-[12px] tracking-widest">
              Navigate
            </h5>
            <ul className="space-y-2 text-on-surface-variant text-[16px]">
              <li>
                <Link className="hover:text-primary-container transition-colors" to="/" onClick={scrollToTop}>Movies</Link>
              </li>
              <li>
                <Link className="hover:text-primary-container transition-colors" to="/tv" onClick={scrollToTop}>TV Shows</Link>
              </li>
              <li>
                <Link className="hover:text-primary-container transition-colors" to="/watchlist" onClick={scrollToTop}>Watchlist</Link>
              </li>
              <li>
                <Link className="hover:text-primary-container transition-colors" to="/community" onClick={scrollToTop}>Community</Link>
              </li>
              <li>
                <Link className="hover:text-primary-container transition-colors" to="/profile" onClick={scrollToTop}>Profile</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-on-surface font-bold uppercase text-[12px] tracking-widest">Legal</h5>
            <ul className="space-y-2 text-on-surface-variant text-[16px]">
              <li>
                <a className="hover:text-primary-container transition-colors" href="#">Privacy Policy</a>
              </li>
              <li>
                <a className="hover:text-primary-container transition-colors" href="#">Terms of Service</a>
              </li>
              <li>
                <a className="hover:text-primary-container transition-colors" href="#">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto xl:ml-64 mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-[12px] tracking-[0.05em] font-medium text-white/20">
        <span>&copy; 2024 CINEVERSE MEDIA GROUP</span>
        <span>BUILT WITH PASSION FOR FILM</span>
      </div>
    </footer>
  );
}
