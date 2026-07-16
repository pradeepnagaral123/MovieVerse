import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import MobileNav from '../components/MobileNav';
import FloatingActionButton from '../components/FloatingActionButton';
import Footer from '../components/Footer';
import { getTrendingTV, getPopularTV, getTopRatedTV, tvPosterUrl, tvBackdropUrl } from '../services/tmdb';

function TVCard({ show, variant = 'poster' }) {
  const [imgError, setImgError] = useState(false);

  if (variant === 'hero') {
    return (
      <Link
        to={`/tv/${show.id}`}
        className="relative min-w-[280px] md:min-w-[480px] h-[220px] md:h-[280px] rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0 border border-white/10"
      >
        {!imgError && tvBackdropUrl(show.backdrop_path) ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={tvBackdropUrl(show.backdrop_path)}
            alt={show.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant">tv</span>
          </div>
        )}
        <div className="absolute inset-0 cinema-gradient" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary-container text-on-primary-container text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              Trending
            </span>
            <span className="text-on-surface-variant text-[11px] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              {show.vote_average?.toFixed(1)}
            </span>
          </div>
          <h3 className="text-on-surface font-bold text-[20px] md:text-[24px] leading-tight group-hover:text-primary-container transition-colors">
            {show.name}
          </h3>
          <p className="text-on-surface-variant text-[12px] mt-1 line-clamp-2 max-w-md">
            {show.overview}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/tv/${show.id}`}
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0 w-[160px] md:w-[200px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imgError && tvPosterUrl(show.poster_path) ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={tvPosterUrl(show.poster_path)}
            alt={show.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant">tv</span>
          </div>
        )}
        <div className="absolute inset-0 poster-gradient opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-primary-container text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-on-surface text-[11px] font-bold">{show.vote_average?.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-3">
        <h4 className="text-on-surface font-bold text-[13px] line-clamp-1 group-hover:text-primary-container transition-colors">
          {show.name}
        </h4>
        <p className="text-on-surface-variant text-[11px] mt-1">
          {show.first_air_date ? new Date(show.first_air_date).getFullYear() : ''}
          {show.genres?.length > 0 && (
            <span className="ml-1">• {show.genres[0].name}</span>
          )}
        </p>
      </div>
    </Link>
  );
}

function TVCardSkeleton({ variant = 'poster' }) {
  if (variant === 'hero') {
    return (
      <div className="relative min-w-[280px] md:min-w-[480px] h-[220px] md:h-[280px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 bg-surface-container-high animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          <div className="h-4 bg-surface-container-highest rounded w-24" />
          <div className="h-6 bg-surface-container-highest rounded w-48" />
          <div className="h-3 bg-surface-container-highest rounded w-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden flex-shrink-0 w-[160px] md:w-[200px] bg-surface-container-high animate-pulse">
      <div className="aspect-[2/3] bg-surface-container-highest" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-surface-container-highest rounded w-3/4" />
        <div className="h-2 bg-surface-container-highest rounded w-1/2" />
      </div>
    </div>
  );
}

function ScrollRow({ children, title, icon }) {
  const scrollRef = useState(null);

  const scroll = (direction) => {
    if (scrollRef[0]) {
      const amount = direction === 'left' ? -400 : 400;
      scrollRef[0].scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container">{icon}</span>
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_left</span>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef[0]}
        className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 scroll-smooth"
      >
        {children}
      </div>
    </section>
  );
}

export default function TVShows() {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [trendingData, popularData, topRatedData] = await Promise.all([
          getTrendingTV('day'),
          getPopularTV(),
          getTopRatedTV(),
        ]);
        setTrending(trendingData.results);
        setPopular(popularData.results);
        setTopRated(topRatedData.results);
      } catch (err) {
        console.error('Failed to fetch TV shows:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="TV Shows" />
      <SideNavBar />

      <main className="xl:ml-64 pt-28 px-4 md:px-12 pb-24 md:pb-20 max-w-[1400px]">
        <section className="mb-12">
          <div className="max-w-3xl">
            <h1 className="text-[32px] md:text-[48px] mb-4 leading-tight font-black tracking-tight">
              Discover <span className="text-primary-container">TV Shows</span>
            </h1>
            <p className="text-on-surface-variant text-[16px] leading-relaxed mb-6">
              Explore trending series and popular shows. Find your next binge-worthy watch.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchInput.trim()) {
                  navigate(`/tv/search?q=${encodeURIComponent(searchInput.trim())}`);
                }
              }}
              className="relative search-glow transition-all duration-300 rounded-2xl max-w-2xl"
            >
              <input
                className="w-full bg-surface-container-high border-white/10 border p-4 pl-14 pr-12 rounded-2xl text-[16px] focus:ring-0 focus:outline-none placeholder:text-on-surface-variant/50"
                placeholder="Search TV shows by title, genre, or actor..."
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary-container text-3xl">
                search
              </span>
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              )}
            </form>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">local_fire_department</span>
              Trending Now
            </h2>
          </div>
          {loading ? (
            <div className="flex gap-4 overflow-hidden pb-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <TVCardSkeleton key={i} variant="hero" />
              ))}
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 scroll-smooth">
              {trending.slice(0, 10).map((show) => (
                <TVCard key={show.id} show={show} variant="hero" />
              ))}
            </div>
          )}
        </section>

        <ScrollRow title="Popular TV Shows" icon="trending_up">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <TVCardSkeleton key={i} />)
            : popular.slice(0, 12).map((show) => (
                <TVCard key={show.id} show={show} />
              ))}
        </ScrollRow>

        <ScrollRow title="Top Rated" icon="emoji_events">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <TVCardSkeleton key={i} />)
            : topRated.slice(0, 10).map((show) => (
                <TVCard key={`top-${show.id}`} show={show} />
              ))}
        </ScrollRow>

      </main>

      <FloatingActionButton />
      <Footer />
      <MobileNav />
    </div>
  );
}
