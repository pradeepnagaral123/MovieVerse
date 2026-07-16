import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import MobileNav from '../components/MobileNav';
import FloatingActionButton from '../components/FloatingActionButton';
import Footer from '../components/Footer';
import { getTrendingMovies, getUpcomingMovies, getNowPlayingMovies, posterUrl, backdropUrl } from '../services/tmdb';

const hashtags = ['#noir-cyberpunk', '#wes-anderson-symmetry', '#90s-heartbreak'];

function MovieCard({ movie, variant = 'poster', onDetails }) {
  const [imgError, setImgError] = useState(false);

  if (variant === 'hero') {
    return (
      <div className="relative min-w-[280px] md:min-w-[480px] h-[220px] md:h-[280px] rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0 border border-white/10">
        {!imgError && backdropUrl(movie.backdrop_path) ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={backdropUrl(movie.backdrop_path)}
            alt={movie.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant">movie</span>
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
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>
          <h3 className="text-on-surface font-bold text-[20px] md:text-[24px] leading-tight group-hover:text-primary-container transition-colors">
            {movie.title}
          </h3>
          <p className="text-on-surface-variant text-[12px] mt-1 line-clamp-2 max-w-md">
            {movie.overview}
          </p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-background/40">
          <button
            onClick={(e) => { e.stopPropagation(); onDetails?.(movie); }}
            className="border border-white/20 bg-background/60 text-on-surface py-2.5 px-6 rounded-xl text-[12px] font-bold uppercase tracking-wider hover:bg-white/10 active:bg-white/10 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">info</span>
            Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0 w-[160px] md:w-[200px]">
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imgError && posterUrl(movie.poster_path) ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={posterUrl(movie.poster_path)}
            alt={movie.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant">movie</span>
          </div>
        )}
        <div className="absolute inset-0 poster-gradient opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-primary-container text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-on-surface text-[11px] font-bold">{movie.vote_average?.toFixed(1)}</span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-background/60">
          <button
            onClick={(e) => { e.stopPropagation(); onDetails?.(movie); }}
            className="w-full border border-white/20 py-2 rounded-lg text-[11px] md:text-[12px] font-bold uppercase tracking-wider hover:bg-white/10 active:bg-white/10 transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">info</span>
            Details
          </button>
        </div>
      </div>
      <div className="p-3">
        <h4 className="text-on-surface font-bold text-[13px] line-clamp-1 group-hover:text-primary-container transition-colors">
          {movie.title}
        </h4>
        <p className="text-on-surface-variant text-[11px] mt-1">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : ''}
          {movie.genres?.length > 0 && (
            <span className="ml-1">• {movie.genres[0].name}</span>
          )}
        </p>
      </div>
    </div>
  );
}

function MovieCardSkeleton({ variant = 'poster' }) {
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

export default function HomeFeed() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [trendingData, upcomingData, nowPlayingData] = await Promise.all([
          getTrendingMovies('day'),
          getUpcomingMovies(),
          getNowPlayingMovies(),
        ]);
        setTrending(trendingData.results);
        setUpcoming(upcomingData.results);
        setNowPlaying(nowPlayingData.results.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleDetails = (movie) => {
    const id = movie.id || movie.imdbID || movie.title;
    navigate(`/movie/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Movies" />
      <SideNavBar />

      <main className="xl:ml-64 pt-28 px-4 md:px-12 pb-24 md:pb-20 max-w-[1400px]">
        {/* Vibe Search Header */}
        <section className="mb-12">
          <div className="max-w-3xl">
            <h1 className="text-[32px] md:text-[48px] mb-6 leading-tight font-black tracking-tight">
              What's the <span className="text-primary-container">vibe</span> tonight?
            </h1>
            <form onSubmit={handleSearch} className="relative search-glow transition-all duration-300 rounded-2xl">
              <input
                className="w-full bg-surface-container-high border-white/10 border p-4 md:p-6 pl-14 md:pl-16 rounded-2xl text-[16px] md:text-[18px] focus:ring-0 focus:outline-none placeholder:text-on-surface-variant/50"
                placeholder="Search movies by mood, color, or director's era..."
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-primary-container hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined text-3xl">search</span>
              </button>
            </form>
            <div className="flex flex-wrap gap-2 mt-4">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-surface-container-highest rounded-full text-[12px] tracking-[0.05em] font-medium cursor-pointer hover:bg-primary-container/20 transition-colors border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Trending + Upcoming */}
          <div className="lg:col-span-8 space-y-8">
            {/* Trending Movies */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">local_fire_department</span>
                  Trending Now
                </h2>
              </div>
              {loading ? (
                <div className="flex gap-4 overflow-hidden pb-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <MovieCardSkeleton key={i} variant="hero" />
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 scroll-smooth">
                  {trending.slice(0, 10).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} variant="hero" onDetails={handleDetails} />
                  ))}
                </div>
              )}
            </section>

            {/* Upcoming Movies */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container">upcoming</span>
                  Upcoming & Highly Anticipated
                </h2>
              </div>
              {loading ? (
                <div className="flex gap-4 overflow-hidden pb-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 scroll-smooth">
                  {upcoming.slice(0, 12).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onDetails={handleDetails} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Now Playing */}
            <section className="glass-card rounded-2xl p-6 border-primary-container/20">
              <h2 className="text-[24px] font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">
                  confirmation_number
                </span>
                Now Playing
              </h2>
              {loading ? (
                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-4 animate-pulse">
                      <div className="w-20 h-32 rounded-xl bg-surface-container-high shrink-0" />
                      <div className="flex-grow space-y-2">
                        <div className="h-4 bg-surface-container-high rounded w-3/4" />
                        <div className="h-3 bg-surface-container-high rounded w-1/2" />
                        <div className="h-3 bg-surface-container-high rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {nowPlaying.map((movie) => (
                    <NowPlayingCard key={movie.id} movie={movie} />
                  ))}
                </div>
              )}
            </section>

            {/* Community Stats */}
            <section className="space-y-4">
              <h2 className="text-[12px] tracking-[0.2em] uppercase text-on-surface-variant px-2 font-medium">
                Community Pulse
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-2xl border-white/5">
                  <div className="text-[10px] text-on-surface-variant uppercase mb-1">Active Now</div>
                  <div className="text-[24px] font-black text-secondary leading-[1.3]">4,821</div>
                </div>
                <div className="glass-card p-4 rounded-2xl border-white/5">
                  <div className="text-[10px] text-on-surface-variant uppercase mb-1">Film Logs</div>
                  <div className="text-[24px] font-black text-primary-container leading-[1.3]">
                    12k+
                  </div>
                </div>
              </div>
            </section>

            {/* Pro Membership CTA */}
            <div className="relative rounded-2xl p-6 overflow-hidden group">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
              <div className="relative z-10">
                <h3 className="text-[24px] font-black text-white mb-2">Go Pro</h3>
                <p className="text-white/70 text-[12px] tracking-[0.05em] mb-6">
                  Unlock deep analytics, personalized cinema matching, and ad-free browsing.
                </p>
                <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-[12px] tracking-[0.05em] hover:scale-105 transition-transform">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FloatingActionButton />
      <Footer />
      <MobileNav />
    </div>
  );
}

function NowPlayingCard({ movie }) {
  const [imgError, setImgError] = useState(false);
  const poster = posterUrl(movie.poster_path, 'w92');

  return (
    <div className="flex gap-4 group cursor-pointer">
      <div className="w-20 h-32 rounded-xl overflow-hidden shrink-0 shadow-lg border border-white/10">
        {!imgError && poster ? (
          <img
            className="w-full h-full object-cover"
            src={poster}
            alt={movie.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant">movie</span>
          </div>
        )}
      </div>
      <div className="flex-grow">
        <h4 className="font-bold text-on-surface group-hover:text-primary-container transition-colors line-clamp-1">
          {movie.title}
        </h4>
        <div className="flex items-center gap-1 mt-1 mb-2">
          <span className="material-symbols-outlined text-secondary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-secondary text-[12px] font-bold">{movie.vote_average?.toFixed(1)}</span>
        </div>
        <div className="text-[11px] text-on-surface-variant">
          {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBA'}
        </div>
        {movie.overview && (
          <p className="text-[11px] text-on-surface-variant mt-1 line-clamp-2">{movie.overview}</p>
        )}
      </div>
    </div>
  );
}
