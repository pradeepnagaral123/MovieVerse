import { useState, useEffect } from 'react';
import AuthModal from '../components/AuthModal';
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, backdropUrl, posterUrl } from '../services/tmdb';

const heroFallback = {
  backdrop_path: null,
  title: 'MovieVerse',
  overview: 'Discover your next cinematic obsession.',
};

const features = [
  {
    icon: 'explore',
    title: 'Vibe-Based Discovery',
    desc: 'Search movies by mood, color palette, or a director\'s era — not just title and genre.',
  },
  {
    icon: 'groups',
    title: 'Film Community',
    desc: 'Track, review, and debate the films you love with critics who breathe cinema.',
  },
  {
    icon: 'bookmark',
    title: 'Smart Watchlist',
    desc: 'Curate watchlists, get personalized recommendations, and never miss an upcoming release.',
  },
  {
    icon: 'ballot',
    title: 'Community Polls',
    desc: 'Vote on the hottest debates — from best endings to most rewatchable scenes.',
  },
];

const stats = [
  { value: '120k+', label: 'Movies & Shows' },
  { value: '12k+', label: 'Film Logs' },
  { value: '4.8k', label: 'Active Now' },
  { value: '1.2k', label: 'Reviews Weekly' },
];

const testimonials = [
  {
    quote: 'MovieVerse completely changed how I find films. The vibe-based discovery is unreal — it reads my mood better than my friends do.',
    name: 'Aisha Rahman',
    role: 'Film Journalist',
  },
  {
    quote: 'The community is sharp. I\'ve debated endings, discovered hidden gems, and my watchlist is finally under control.',
    name: 'Marcus Chen',
    role: 'Cinema Enthusiast',
  },
  {
    quote: 'From moody neon-noir to quiet character studies, MovieVerse always points me somewhere I didn\'t know I\'d love.',
    name: 'Sofia Delgado',
    role: 'Indie Filmmaker',
  },
];

const genrePills = ['Sci-Fi', 'Drama', 'Thriller', 'Animation', 'Romance', 'Crime', 'Horror', 'Comedy'];

export default function Landing() {
  const [authOpen, setAuthOpen] = useState(false);
  const [heroMovies, setHeroMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [trendingData, popularData, topRatedData, upcomingData] = await Promise.all([
          getTrendingMovies('week'),
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
        ]);
        setHeroMovies(trendingData.results.filter((m) => m.backdrop_path).slice(0, 8));
        setPopular(popularData.results);
        setTopRated(topRatedData.results);
        setUpcoming(upcomingData.results);
      } catch (err) {
        console.error('Failed to fetch landing data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (heroMovies.length < 2) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroMovies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroMovies.length]);

  const active = heroMovies[heroIndex] || heroFallback;
  const heroImg = active.backdrop_path ? backdropUrl(active.backdrop_path, 'original') : null;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Hero with animated background */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background image crossfade */}
        <div className="absolute inset-0">
          {heroImg && (
            <img
              key={active.id || 'fallback'}
              className="w-full h-full object-cover opacity-90 animate-slide-up"
              src={heroImg}
              alt={active.title || ''}
            />
          )}
          <div className="absolute inset-0 bg-background/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background" />
        </div>

        {/* Nav */}
        <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-surface/80 backdrop-blur-xl">
          <div className="flex justify-between items-center px-4 md:px-12 h-16 md:h-20 max-w-[1280px] mx-auto">
            <span className="text-[28px] md:text-[48px] font-black text-primary-container tracking-tighter leading-none">
              CineVerse
            </span>
            <button
              onClick={() => setAuthOpen(true)}
              className="px-5 py-2.5 bg-primary-container text-on-primary-container rounded-full font-bold text-[14px] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </header>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 pt-32 pb-20 md:pt-40 md:pb-28 text-center">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-white/10 text-on-surface-variant text-[12px] tracking-[0.1em] uppercase font-medium mb-8">
              <span className="material-symbols-outlined text-secondary text-[16px]">local_fire_department</span>
              Built for those who breathe cinema
            </span>
            <h1 className="text-[40px] md:text-[64px] leading-[1.05] font-black tracking-tight mb-6">
              Find your next{' '}
              <span className="text-primary-container">obsession</span>.
            </h1>
            <p className="text-on-surface-variant text-[18px] md:text-[22px] leading-relaxed max-w-xl mx-auto mb-10">
              CineVerse is a mood-driven movie tracker and community — discover films by vibe,
              track what you watch, and debate with critics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setAuthOpen(true)}
                className="px-10 py-4 bg-primary-container text-on-primary-container rounded-full font-black text-[18px] hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,128,0,0.35)]"
              >
                Get Started
              </button>
              <a
                href="#features"
                className="px-10 py-4 border border-white/20 rounded-full font-bold text-[18px] hover:bg-white/5 transition-colors"
              >
                Explore
              </a>
            </div>

            {/* Hero movie caption */}
            {active.title && heroImg && (
              <div className="mt-12">
                <div className="flex items-center justify-center gap-4 text-[13px] text-on-surface-variant">
                  <span className="font-bold text-primary-container tracking-[0.2em] uppercase">Now Trending</span>
                  <span className="w-8 h-px bg-white/20" />
                  <span className="font-bold text-on-surface">{active.title}</span>
                  {active.vote_average > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-secondary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {active.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  {heroMovies.map((m, i) => (
                    <button
                      key={m.id}
                      onClick={() => setHeroIndex(i)}
                      aria-label={m.title}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        i === heroIndex ? 'w-8 bg-primary-container' : 'w-3 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 md:px-12 py-20 relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
                <div className="text-[28px] md:text-[36px] font-black text-primary-container leading-tight">{s.value}</div>
                <div className="text-[12px] text-on-surface-variant tracking-[0.1em] uppercase font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured: Trending + Top Rated */}
      <section className="px-4 md:px-12 py-10 relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] md:text-[40px] font-black tracking-tight">
              <span className="text-primary-container">Trending</span> This Week
            </h2>
            <span className="hidden sm:flex items-center gap-2 text-on-surface-variant text-[13px]">
              <span className="material-symbols-outlined text-primary-container">local_fire_department</span>
              Live from TMDB
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="aspect-[2/3] rounded-2xl bg-surface-container-high animate-pulse" />
                ))
              : heroMovies.concat(heroMovies).slice(0, 10).map((movie) => (
                  <FeaturedPoster key={movie.id} movie={movie} />
                ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="px-4 md:px-12 py-10 relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[28px] md:text-[40px] font-black tracking-tight mb-8">
            Critics' <span className="text-primary-container">Favorites</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-surface-container-high animate-pulse">
                    <div className="aspect-[2/3] bg-surface-container-highest" />
                  </div>
                ))
              : topRated.slice(0, 5).map((movie, i) => (
                  <div key={movie.id} className="relative rounded-2xl overflow-hidden group cursor-pointer">
                    <FeaturedPoster movie={movie} rank={i + 1} />
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Popular Now strip */}
      {popular.length > 0 && !loading && (
        <section className="py-10 relative z-10 overflow-hidden">
          <div className="px-4 md:px-12 mb-6">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between">
              <h2 className="text-[24px] md:text-[32px] font-black tracking-tight">
                <span className="text-primary-container">Popular</span> Right Now
              </h2>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 md:px-12 scroll-smooth">
            {popular.slice(0, 10).map((movie) => (
              <MiniPoster key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming teaser */}
      {upcoming.length > 0 && !loading && (
        <section className="px-4 md:px-12 py-10 relative z-10">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-[24px] md:text-[32px] font-black tracking-tight mb-8">
              Coming <span className="text-primary-container">Soon</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {upcoming.slice(0, 4).map((movie) => (
                <div key={movie.id} className="glass-card rounded-2xl p-5">
                  <div className="text-[12px] text-on-surface-variant tracking-[0.1em] uppercase font-medium mb-1">
                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Date TBA'}
                  </div>
                  <h3 className="font-bold text-[16px] leading-snug group-hover:text-primary-container transition-colors">
                    {movie.title}
                  </h3>
                  {movie.overview && (
                    <p className="text-on-surface-variant text-[13px] mt-2 line-clamp-2">{movie.overview}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section id="features" className="px-4 md:px-12 py-20 relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[28px] md:text-[44px] font-black tracking-tight text-center mb-4">
            Why <span className="text-primary-container">CineVerse</span>?
          </h2>
          <p className="text-on-surface-variant text-center text-[18px] mb-12 max-w-xl mx-auto">
            Everything you need to track, discover, and debate film — in one place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-container/15 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary-container text-[26px]">{f.icon}</span>
                </div>
                <h3 className="text-[18px] font-bold mb-2">{f.title}</h3>
                <p className="text-on-surface-variant text-[14px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Genre chips */}
      <section className="px-4 md:px-12 py-10 relative z-10">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[24px] md:text-[32px] font-black tracking-tight mb-2">
            Every <span className="text-primary-container">genre</span>. Every mood.
          </h2>
          <p className="text-on-surface-variant mb-8">
            From midnight horror to cozy romantic comedies — dive into any lane you like.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {genrePills.map((g) => (
              <span
                key={g}
                className="px-5 py-2 bg-surface-container-high border border-white/10 rounded-full text-[13px] font-bold tracking-wide cursor-pointer hover:border-primary-container hover:text-primary-container transition-colors"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 md:px-12 py-20 relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[28px] md:text-[44px] font-black tracking-tight text-center mb-12">
            Loved by <span className="text-primary-container">cinephiles</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card rounded-2xl p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="text-on-surface text-[15px] leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center font-black text-primary-container">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[14px]">{t.name}</div>
                    <div className="text-on-surface-variant text-[12px]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-12 pb-24 relative z-10">
        <div className="max-w-[1280px] mx-auto glass-panel rounded-3xl p-10 md:p-16 text-center border-primary-container/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10">
            <h2 className="text-[32px] md:text-[48px] font-black tracking-tight text-white mb-4">
              Ready to find your next obsession?
            </h2>
            <p className="text-white/70 text-[18px] mb-8 max-w-lg mx-auto">
              Join CineVerse free. Track, discover, and debate with a community that loves film as much as you do.
            </p>
            <button
              onClick={() => setAuthOpen(true)}
              className="px-10 py-4 bg-primary-container text-on-primary-container rounded-full font-black text-[18px] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 md:px-12 relative z-10">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] tracking-[0.05em] font-medium text-white/30">
          <span>&copy; 2026 CINEVERSE MEDIA GROUP</span>
          <span className="text-[28px] font-black text-primary-container tracking-tighter">CineVerse</span>
          <span>BUILT WITH PASSION FOR FILM</span>
        </div>
      </footer>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

function FeaturedPoster({ movie, rank }) {
  const [imgError, setImgError] = useState(false);
  const poster = posterUrl(movie.poster_path, 'w500');

  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[2/3]">
      {!imgError && poster ? (
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={poster}
          alt={movie.title || movie.original_title || ''}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant">movie</span>
        </div>
      )}
      <div className="absolute inset-0 poster-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
      {rank != null && (
        <div className="absolute top-2 left-3 text-[40px] md:text-[56px] font-black text-white/30 leading-none select-none">
          {rank}
        </div>
      )}
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
        <span className="material-symbols-outlined text-primary-container text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        <span className="text-on-surface text-[11px] font-bold">{movie.vote_average?.toFixed(1)}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h4 className="text-on-surface font-bold text-[13px] group-hover:text-primary-container transition-colors line-clamp-1">
          {movie.title || movie.original_title || ''}
        </h4>
        <p className="text-on-surface-variant text-[11px] mt-0.5">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : ''}
        </p>
      </div>
    </div>
  );
}

function MiniPoster({ movie }) {
  const [imgError, setImgError] = useState(false);
  const poster = posterUrl(movie.poster_path, 'w342');

  return (
    <div className="relative rounded-xl overflow-hidden shrink-0 w-[120px] md:w-[140px] aspect-[2/3] group cursor-pointer">
      {!imgError && poster ? (
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={poster}
          alt={movie.title || ''}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl text-on-surface-variant">movie</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="text-[12px] font-bold text-on-surface line-clamp-1">{movie.title || ''}</div>
      </div>
    </div>
  );
}
