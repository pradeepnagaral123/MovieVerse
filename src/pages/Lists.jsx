import { Link } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import MobileNav from '../components/MobileNav';
import FloatingActionButton from '../components/FloatingActionButton';
import Footer from '../components/Footer';
import { curatedLists } from '../data/curatedLists';
import { imageUrl } from '../services/tmdb';

function ListCard({ list, index }) {
  const previews = list.movies.slice(0, 4);

  return (
    <Link
      to={`/lists/${list.slug}`}
      className="group glass-card rounded-2xl overflow-hidden flex flex-col border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 active:scale-[0.99]"
    >
      <div className={`relative p-5 md:p-6 bg-gradient-to-br ${list.accent} to-transparent`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-surface-container-low border ${list.accentBorder} flex items-center justify-center text-[24px] shadow-lg`}>
              {list.emoji}
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-on-surface-variant">
                List #{index + 1}
              </div>
              <h2 className="text-[18px] md:text-[20px] font-extrabold text-on-surface group-hover:text-primary-container transition-colors leading-tight">
                {list.title}
              </h2>
            </div>
          </div>
          <span className={`material-symbols-outlined ${list.accentText} text-[28px] transition-transform group-hover:translate-x-1`}>
            arrow_forward
          </span>
        </div>
        <p className="text-on-surface-variant text-[13px] mt-3 leading-relaxed line-clamp-2">{list.tagline}</p>
      </div>

      <div className="flex items-center gap-2 px-5 md:px-6 pb-5 pt-1">
        {previews.map((movie) => (
          <div key={movie.id} className="w-[52px] h-[78px] rounded-lg overflow-hidden border border-white/10 shrink-0 group-hover:border-white/25 transition-colors">
            {movie.poster ? (
              <img
                className="w-full h-full object-cover"
                src={imageUrl(movie.poster, 'w92')}
                alt={movie.title}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">movie</span>
              </div>
            )}
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1.5 text-on-surface-variant text-[12px] font-bold">
          <span className="material-symbols-outlined text-[16px]">movie_filter</span>
          {list.movies.length}
        </div>
      </div>
    </Link>
  );
}

export default function Lists() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Movies" />
      <SideNavBar />

      <main className="xl:ml-64 pt-28 px-4 md:px-12 pb-24 md:pb-20 max-w-[1280px]">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-primary-container text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              format_list_bulleted
            </span>
            <h1 className="text-[32px] md:text-[44px] font-black leading-tight tracking-tight">
              Curated <span className="text-primary-container">Lists</span>
            </h1>
          </div>
          <p className="text-on-surface-variant text-[15px] max-w-2xl">
            Hand-picked collections built from the TMDB catalog — ranked, reviewed, and ready to
            dive into. Pick a mood, press play, and discover something unforgettable.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {curatedLists.map((list, i) => (
            <ListCard key={list.slug} list={list} index={i} />
          ))}
        </div>
      </main>

      <FloatingActionButton />
      <Footer />
      <MobileNav />
    </div>
  );
}