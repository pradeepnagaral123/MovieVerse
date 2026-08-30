import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';
import { curatedLists } from '../data/curatedLists';
import { getMovieDetails, imageUrl } from '../services/tmdb';

function ListMovieRow({ movie, rank, live }) {
  const posterPath = live?.poster_path || movie.poster;
  const year = live?.release_date ? new Date(live.release_date).getFullYear() : movie.year;
  const rating = live?.vote_average || null;
  const runtime = live?.runtime || null;
  const genres = live?.genres || null;
  const overview = live?.overview || '';
  const director = movie.director || live?.credits?.crew?.find((c) => c.job === 'Director')?.name;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group flex gap-4 md:gap-6 p-3 md:p-4 rounded-2xl glass-card border-white/10 hover:border-primary-container/30 transition-all hover:-translate-y-0.5"
    >
      <div className="flex flex-col items-center gap-2 shrink-0 w-10">
        <span
          className={`text-[28px] font-black leading-none ${
            rank <= 3 ? 'text-primary-container' : 'text-on-surface-variant/70'
          }`}
        >
          {rank}
        </span>
      </div>

      <div className="w-16 md:w-24 shrink-0 rounded-xl overflow-hidden border border-white/10 aspect-[2/3] relative">
        {posterPath ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={imageUrl(posterPath, 'w342')}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-on-surface-variant">movie</span>
          </div>
        )}
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[16px] md:text-[20px] font-extrabold text-on-surface group-hover:text-primary-container transition-colors leading-tight line-clamp-1">
              {movie.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[12px] text-on-surface-variant">
              <span>{year}</span>
              {runtime ? <span>{runtime} min</span> : null}
              {director ? <span className="hidden sm:inline">dir. {director}</span> : null}
            </div>
          </div>
          {rating ? (
            <div className="flex items-center gap-1 rounded-lg px-2 py-1 bg-black/40 border border-white/10 shrink-0">
              <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="text-[13px] font-bold text-on-surface">{rating.toFixed(1)}</span>
            </div>
          ) : null}
        </div>

        {genres?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {genres.slice(0, 3).map((g) => (
              <span
                key={g.id}
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant border border-white/5"
              >
                {g.name}
              </span>
            ))}
          </div>
        )}

        {overview && (
          <p className="text-[12px] md:text-[13px] text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
            {overview}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function ListDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const list = curatedLists.find((l) => l.slug === slug);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!list) return;
    let cancelled = false;
    setLoading(true);

    Promise.allSettled(
      list.movies.map((m) => getMovieDetails(m.id).catch(() => null)),
    ).then((results) => {
      if (cancelled) return;
      const map = {};
      results.forEach((res, i) => {
        if (res.status === 'fulfilled' && res.value) {
          map[list.movies[i].id] = res.value;
        }
      });
      setDetails(map);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [list]);

  if (!list) {
    return (
      <div className="min-h-screen bg-background">
        <TopNavBar />
        <main className="pt-40 px-4 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-on-surface-variant text-6xl mb-4">list_alt</span>
          <h1 className="text-[24px] font-bold text-on-surface mb-2">List not found</h1>
          <p className="text-on-surface-variant text-[15px] mb-6">This list does not exist or was removed.</p>
          <button
            onClick={() => navigate('/lists')}
            className="px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            Back to Lists
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Movies" />
      <SideNavBar />

      <main className="xl:ml-64 pt-28 px-4 md:px-12 pb-24 md:pb-20 max-w-[1000px]">
        <Link
          to="/lists"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-on-surface text-[13px] font-bold mb-6 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          All Lists
        </Link>

        <header className={`relative overflow-hidden rounded-3xl border ${list.accentBorder} bg-gradient-to-br ${list.accent} to-background p-6 md:p-10 mb-10`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-container-low border border-white/10 flex items-center justify-center text-[32px] md:text-[38px] shadow-xl">
              {list.emoji}
            </div>
            <div className="text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase text-on-surface-variant">
              {list.movies.length} films · one perfect pick order
            </div>
          </div>
          <h1 className="text-[28px] md:text-[44px] font-black leading-tight tracking-tight text-on-surface">
            {list.title}
          </h1>
          <p className="text-on-surface-variant text-[14px] md:text-[16px] mt-3 max-w-2xl leading-relaxed">
            {list.tagline}
          </p>
        </header>

        <div className="space-y-4">
          {list.movies.map((movie, i) => {
            const live = loading ? null : details[movie.id];
            return (
              <ListMovieRow
                key={movie.id}
                movie={movie}
                rank={i + 1}
                live={live}
              />
            );
          })}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}