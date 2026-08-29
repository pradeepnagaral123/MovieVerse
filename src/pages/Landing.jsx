import { useState, useEffect } from 'react';
import AuthModal from '../components/AuthModal';
import { getTrendingMovies, getPopularMovies, getUpcomingMovies, getNowPlayingMovies, getMovieDetails, posterUrl, backdropUrl } from '../services/tmdb';

const features = [
  {
    icon: 'local_fire_department',
    title: 'Live Movie Feed',
    tagline: 'A living marquee — trends, hits and opening nights, updating in real time.',
    lead: 'CineVerse polls TMDB live for trending, popular, now-playing and upcoming titles. The moment a film blows up, it surfaces on your front page.',
    bullets: ['Live TMDB sync', 'Ratings & years', 'Hover previews', 'One click to deep-dive'],
    snapshot: 'live-feed',
  },
  {
    icon: 'explore',
    title: 'Vibe-Based Discovery',
    tagline: 'Search by mood, genre or a director\u2019s era — and never hit a dead end.',
    lead: 'Steer discovery by the vibe you are in. Pick a mood, shuffle the deck, and the engine hands you something you did not know you wanted.',
    bullets: ['Mood chips', 'Genre lanes', 'Fresh shuffle every time', 'Straight to details'],
    snapshot: 'discovery',
  },
  {
    icon: 'movie_filter',
    title: 'Movies & TV, Deep Dives',
    tagline: 'Trailers, cast, budget, release dates — every rabbit hole, on one screen.',
    lead: 'Every film and series gets the full encyclopaedia treatment: hero banners, ratings, cast grids, streaming options and related titles.',
    bullets: ['Immersive hero', 'Full cast & crew', 'Trailers & budget', 'Related titles'],
    snapshot: 'deep-dives',
  },
  {
    icon: 'bookmark',
    title: 'Smart Watchlist',
    tagline: 'Curate your queue, track what you\u2019ve seen, and remember it all.',
    lead: 'One tap bookmarks any film or show. Queues are saved on your device, favorites feed your profile, and your taste shapes recommendations.',
    bullets: ['One-tap save', 'Separate movie & show queues', 'Persists across visits', 'Favorites feed your profile'],
    snapshot: 'watchlist',
  },
  {
    icon: 'groups',
    title: 'Film Community',
    tagline: 'Track, review and debate the films you love with people who breathe cinema.',
    lead: 'A social layer for cinephiles: logs, reviews and hot takes stream in, and every deep-dive collects the discussion right below the film.',
    bullets: ['Shared community feed', 'Star-rating system', 'Review walls', 'Profiles driven by taste'],
    snapshot: 'community',
  },
  {
    icon: 'ballot',
    title: 'Community Polls & Debates',
    tagline: 'Vote on best endings, most rewatchable scenes, and the debates that matter.',
    lead: 'Cast your vote, watch tallies move in real time, and see exactly where your taste lines up against the rest of the community.',
    bullets: ['Live voting', 'Instant tallies', 'Taste comparisons', 'Cross-linked to the community'],
    snapshot: 'polls',
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

const POSTER_SIZES = ['aspect-[2/3]', 'aspect-[2/3]', 'aspect-[5/8]', 'aspect-[2/3]', 'aspect-[9/14]', 'aspect-[2/3]'];

export default function Landing() {
  const [authOpen, setAuthOpen] = useState(false);
  const [heroMovies, setHeroMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [trendingData, popularData, upcomingData, nowPlayingData] = await Promise.all([
          getTrendingMovies('week'),
          getPopularMovies(),
          getUpcomingMovies(),
          getNowPlayingMovies(),
        ]);
        setHeroMovies(trendingData.results.filter((m) => m.poster_path));
        setPopular(popularData.results);
        setUpcoming(upcomingData.results);
        setNowPlaying(nowPlayingData.results);
      } catch (err) {
        console.error('Failed to fetch landing data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const heroFilms = [...new Map(
    [...popular, ...nowPlaying, ...heroMovies, ...upcoming]
      .filter((m) => m && m.poster_path)
      .map((m) => [m.id, m])
  ).values()].slice(0, 30);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background: masonry wall of posters, slowly drifting horizontally */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="horizontal-marquee-track">
            <div className="w-[100vw] shrink-0 columns-3 sm:columns-4 lg:columns-5 xl:columns-6 gap-2">
              {heroFilms.map((movie, i) => (
                <PosterTile key={`${movie.id}-a`} movie={movie} aspectClass={POSTER_SIZES[i % POSTER_SIZES.length]} />
              ))}
            </div>
            <div className="w-[100vw] shrink-0 columns-3 sm:columns-4 lg:columns-5 xl:columns-6 gap-2">
              {heroFilms.map((movie, i) => (
                <PosterTile key={`${movie.id}-b`} movie={movie} aspectClass={POSTER_SIZES[i % POSTER_SIZES.length]} />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-background/15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/10 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-background/5 to-transparent" />
        </div>

        {/* Nav */}
        <header className="fixed top-0 w-full z-50 bg-transparent">
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
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 pt-32 pb-16 md:pt-40 md:pb-20 text-center">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-white/10 text-on-surface-variant text-[12px] tracking-[0.1em] uppercase font-medium mb-8">
              <span className="material-symbols-outlined text-secondary text-[16px]">local_fire_department</span>
              Built for those who breathe cinema
            </span>
            <h1 className="text-[44px] md:text-[64px] leading-[1.05] font-black tracking-tight mb-6">
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

      {/* Features — one full viewport per feature */}
      <section id="features" className="px-4 md:px-12 pt-20 pb-16 relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[28px] md:text-[44px] font-black tracking-tight text-center mb-2">
            What <span className="text-primary-container">CineVerse</span> does
          </h2>
          <p className="text-on-surface-variant text-center text-[18px] mb-10 max-w-2xl mx-auto">
            Six pillars, one platform — scroll through, every feature fits on its own screen.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {features.map((f, i) => (
              <a
                key={f.title}
                href={`#feature-section-${i}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-high border border-white/10 text-[12px] font-bold hover:border-primary-container hover:text-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">{f.icon}</span>
                {f.title}
              </a>
            ))}
          </div>
          <div className="space-y-[7vh]">
            {features.map((f, i) => (
              <FeatureSection key={f.title} feature={f} index={i} onOpenAuth={() => setAuthOpen(true)} />
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

function PosterTile({ movie, className, aspectClass = 'aspect-[2/3]' }) {
  const [imgError, setImgError] = useState(false);
  const poster = posterUrl(movie.poster_path, 'w342');

  return (
    <div className={`break-inside-avoid mb-2 rounded-lg overflow-hidden shadow-lg border border-white/10 w-full ${aspectClass} ${className}`}>
      {!imgError && poster ? (
        <img
          className="w-full h-full object-cover"
          src={poster}
          alt={movie.title || ''}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">movie</span>
        </div>
      )}
    </div>
  );
}

function FeatureSection({ feature, index, onOpenAuth }) {
  return (
    <section
      id={`feature-section-${index}`}
      className="min-h-screen lg:h-screen flex items-center scroll-mt-16"
    >
      <div className="glass-panel border-primary-container/20 rounded-3xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-7 md:p-12 lg:max-h-[calc(100vh-9rem)] lg:overflow-hidden">
        {/* Info */}
        <div className="lg:max-h-[calc(100vh-13rem)] lg:overflow-y-auto custom-scrollbar pr-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[13px] font-black text-primary-container tracking-[0.2em]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="w-10 h-10 rounded-xl bg-primary-container/15 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary-container text-[22px]">{feature.icon}</span>
            </span>
          </div>
          <h3 className="text-[30px] md:text-[44px] font-black tracking-tight leading-[1.05] mb-3">
            {feature.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-primary-container">{feature.title.split(' ').slice(-1)}</span>
          </h3>
          <p className="text-secondary text-[16px] md:text-[18px] font-bold mb-4">{feature.tagline}</p>
          <p className="text-on-surface-variant text-[15px] md:text-[16px] leading-relaxed mb-6 max-w-xl">{feature.lead}</p>
          <div className="flex flex-wrap gap-2 mb-7">
            {feature.bullets.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high border border-white/10 text-[12px] font-bold"
              >
                <span className="material-symbols-outlined text-secondary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                {b}
              </span>
            ))}
          </div>
          <button
            onClick={onOpenAuth}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container rounded-full font-black text-[14px] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,128,0,0.3)] cursor-pointer"
          >
            Sign up to try it
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Snapshot */}
        <div className="lg:max-h-[calc(100vh-13rem)] lg:overflow-y-auto custom-scrollbar">
          <FeatureSnapshot type={feature.snapshot} />
        </div>
      </div>
    </section>
  );
}

function FeatureSnapshot({ type }) {
  switch (type) {
    case 'live-feed':
      return <LiveFeedSnapshot />;
    case 'discovery':
      return <DiscoverySnapshot />;
    case 'deep-dives':
      return <DeepDiveSnapshot />;
    case 'watchlist':
      return <WatchlistSnapshot />;
    case 'community':
      return <CommunitySnapshot />;
    case 'polls':
      return <PollsSnapshot />;
    default:
      return null;
  }
}

const moods = ['Mind-bending', 'Cozy night', 'Edge of seat', 'Feel-good'];

const moodPool = [
  { title: 'Paprika', year: '2006', vibe: 'Mind-bending' },
  { title: 'Amélie', year: '2001', vibe: 'Cozy night' },
  { title: 'Prisoners', year: '2013', vibe: 'Edge of seat' },
  { title: 'The Secret Life of Walter Mitty', year: '2013', vibe: 'Feel-good' },
  { title: 'Everything Everywhere All at Once', year: '2022', vibe: 'Mind-bending' },
  { title: 'Midnight in Paris', year: '2011', vibe: 'Cozy night' },
  { title: 'Se7en', year: '1995', vibe: 'Edge of seat' },
  { title: 'The Grand Budapest Hotel', year: '2014', vibe: 'Feel-good' },
];

function LiveFeedSnapshot() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies('week')
      .then((d) => setMovies(d.results.filter((m) => m && m.poster_path).slice(0, 6)))
      .catch(() => {});
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error/15 border border-error/30 text-error text-[11px] font-black tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
          Live · TMDB
        </span>
        <span className="text-on-surface-variant text-[12px] font-bold uppercase tracking-wider">Trending this week</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {movies.map((m) => (
          <div key={m.id} className="group relative rounded-xl overflow-hidden aspect-[2/3] border border-white/10">
            <img src={posterUrl(m.poster_path, 'w342')} alt={m.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-1.5 right-1.5 bg-black/70 rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-primary-container text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-[10px] font-bold">{m.vote_average?.toFixed(1)}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2">
              <p className="text-[11px] font-bold line-clamp-1">{m.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscoverySnapshot() {
  const [vibe, setVibe] = useState(moods[0]);
  const [pick, setPick] = useState(null);

  useEffect(() => {
    const matches = moodPool.filter((m) => m.vibe === vibe);
    setPick(matches[Math.floor(Math.random() * matches.length)]);
  }, [vibe]);

  const shuffle = () => {
    const matches = moodPool.filter((m) => m.vibe === vibe);
    const next = matches[Math.floor(Math.random() * matches.length)];
    setPick(next);
  };

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="flex items-center gap-1.5 mb-4 text-on-surface-variant text-[12px] font-bold uppercase tracking-wider">
        <span className="material-symbols-outlined text-secondary text-[16px]">explore</span>
        Pick a vibe, get a pick
      </div>
      <div className="flex flex-wrap gap-2 mb-5">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setVibe(m)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-colors cursor-pointer border ${
              vibe === m
                ? 'bg-primary-container text-on-primary-container border-primary-container'
                : 'bg-surface-container-high text-on-surface-variant border-white/10 hover:border-primary-container'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      {pick && (
        <div className="flex items-center gap-4">
          <div className="w-16 h-24 shrink-0 rounded-lg overflow-hidden border border-white/10 shadow-lg bg-gradient-to-br from-primary-container/25 to-transparent flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-container text-[26px]">movie</span>
          </div>
          <div className="flex-1">
            <div className="text-on-surface-variant text-[11px] uppercase tracking-widest font-medium mb-0.5">{pick.vibe}</div>
            <h4 className="text-[18px] font-black mb-0.5">{pick.title}</h4>
            <p className="text-on-surface-variant text-[12px] mb-2">{pick.year} · matched your current mood</p>
            <button
              onClick={shuffle}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-container-high hover:bg-primary-container/20 border border-white/10 rounded-full text-[12px] font-bold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">cached</span>
              Shuffle again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DeepDiveSnapshot() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(27205)
      .then(setMovie)
      .catch(() => {});
  }, []);

  if (!movie) {
    return <div className="glass-panel rounded-2xl p-6 aspect-[16/9] bg-surface-container-low animate-pulse" />;
  }

  return (
    <div className="glass-panel rounded-2xl overflow-hidden relative border border-white/10">
      {movie.backdrop_path && (
        <img src={backdropUrl(movie.backdrop_path, 'w1280')} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      <div className="relative p-5 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
        <div className="w-20 md:w-28 shrink-0 rounded-xl overflow-hidden aspect-[2/3] border border-white/15 shadow-2xl">
          <img src={posterUrl(movie.poster_path, 'w342')} alt={movie.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            {movie.genres?.slice(0, 3).map((g) => (
              <span key={g.id} className="px-2 py-0.5 rounded-full bg-surface-container-high border border-white/10 text-[10px] font-bold">{g.name}</span>
            ))}
          </div>
          <h4 className="text-[20px] md:text-[26px] font-black leading-tight mb-1.5">{movie.title}</h4>
          <p className="text-[12px] text-on-surface-variant mb-3 line-clamp-2">{movie.overview}</p>
          <div className="flex flex-wrap items-center gap-4 text-[12px] font-bold">
            <span className="flex items-center gap-1 text-primary-container">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              {movie.vote_average?.toFixed(1)} / 10
            </span>
            <span className="text-on-surface-variant">{movie.runtime} min</span>
            <span className="text-on-surface-variant">{movie.release_date?.split('-')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WatchlistSnapshot() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    try {
      setMovies(JSON.parse(localStorage.getItem('cineVerse_watchlist') || '[]'));
      setShows(JSON.parse(localStorage.getItem('cineVerse_show_watchlist') || '[]'));
    } catch {
      setMovies([]);
      setShows([]);
    }
  }, []);

  const items = [];
  movies.slice(0, 3).forEach((m) => items.push({ title: m.title, year: m.release_date, poster: m.poster_path, kind: 'Movie' }));
  shows.slice(0, 3).forEach((s) => items.push({ title: s.name, year: s.first_air_date, poster: s.poster_path, kind: 'Series' }));

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
          <span className="material-symbols-outlined text-primary-container text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
          Your saved queue
        </span>
        <span className="text-[12px] font-bold text-on-surface-variant">
          {items.length ? `${items.length} saved on this device` : 'Nothing saved yet'}
        </span>
      </div>
      {items.length ? (
        <div className="space-y-2.5">
          {items.map((it) => (
            <div key={it.title} className="flex items-center gap-3 bg-surface-container-low rounded-xl p-2.5 pr-4">
              <div className="w-10 h-14 shrink-0 rounded-md overflow-hidden border border-white/10">
                {it.poster ? (
                  <img src={posterUrl(it.poster, 'w185')} alt={it.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">movie</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[14px] line-clamp-1">{it.title}</div>
                <div className="text-on-surface-variant text-[12px]">{it.kind} · {it.year ? new Date(it.year).getFullYear() : '—'}</div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">more_horiz</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <span className="material-symbols-outlined text-on-surface-variant text-[38px] mb-3">bookmark_add</span>
          <p className="text-[14px] text-on-surface-variant mb-4">Bookmark a movie or show and it will appear here instantly.</p>
          <span className="px-5 py-2.5 bg-surface-container-high border border-white/10 text-on-surface-variant rounded-full text-[13px] font-black">
            Sign in to start saving
          </span>
        </div>
      )}
    </div>
  );
}

const communityPosts = [
  { name: 'Noor_Films', stars: 5, text: 'The hallway fight in Inception lives rent-free in my head.', when: '2h ago' },
  { name: 'CineBrief', stars: 4, text: 'Rewatched Interstellar — still destroys me at the docking scene.', when: '5h ago' },
  { name: 'OldSchoolProjector', stars: 5, text: 'Paprika is the wildest animated fever dream you will ever see.', when: '1d ago' },
];

function CommunitySnapshot() {
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
          <span className="material-symbols-outlined text-secondary text-[16px]">groups</span>
          Community feed
        </span>
        <span className="text-on-surface-variant text-[12px] font-bold">1.2k members active</span>
      </div>
      <div className="space-y-3">
        {communityPosts.map((p) => (
          <div key={p.name} className="bg-surface-container-low rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-primary-container/20 flex items-center justify-center font-black text-primary-container text-[14px]">
                {p.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-bold text-[13px]">{p.name}</div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`material-symbols-outlined text-[13px] ${i < p.stars ? 'text-secondary' : 'text-on-surface-variant/40'}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-on-surface-variant text-[11px]">{p.when}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-on-surface-variant">{p.text}</p>
            <div className="flex items-center gap-4 mt-3 text-[12px] text-on-surface-variant font-bold">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">thumb_up</span> 128</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">forum</span> 34</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const pollOptions = [
  { label: 'Inception — the dining room drop', votes: 812 },
  { label: 'Interstellar — the docking sequence', votes: 694 },
];

function PollsSnapshot() {
  const [voted, setVoted] = useState(null);
  const total = pollOptions.reduce((s, o) => s + o.votes, 0);

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
          <span className="material-symbols-outlined text-primary-container text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>ballot</span>
          Community poll
        </span>
        <span className="text-on-surface-variant text-[12px] font-bold">{total.toLocaleString()} votes</span>
      </div>
      <h4 className="text-[16px] md:text-[18px] font-black mb-4">Which dream-scene sequence is the greatest set-piece ever filmed?</h4>
      <div className="space-y-3">
        {pollOptions.map((o, i) => {
          const pct = Math.round((o.votes / total) * 100);
          const isVoted = voted === i;
          return (
            <button
              key={o.label}
              onClick={() => setVoted(i)}
              className={`relative w-full text-left rounded-xl border p-3.5 transition-all cursor-pointer overflow-hidden ${
                isVoted ? 'border-primary-container bg-primary-container/15' : 'border-white/10 bg-surface-container-low hover:border-white/25'
              }`}
            >
              <div className="absolute inset-y-0 left-0 bg-primary-container/20 transition-all duration-500" style={{ width: `${voted != null ? pct : 0}%` }} />
              <div className="relative flex items-center justify-between gap-3">
                <span className={`font-bold text-[13px] ${isVoted ? 'text-primary-container' : 'text-on-surface'}`}>
                  {voted != null && isVoted && <span className="material-symbols-outlined text-[15px] mr-1 align-middle">how_to_vote</span>}
                  {o.label}
                </span>
                <span className="text-[13px] font-black text-on-surface-variant shrink-0">
                  {voted != null ? `${pct}%` : `${o.votes.toLocaleString()} votes`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-on-surface-variant text-[12px]">
          {voted != null ? `Thanks for voting! You chose: ${pollOptions[voted].label}` : 'Tap an option to cast your vote.'}
        </p>
      </div>
    </div>
  );
}
