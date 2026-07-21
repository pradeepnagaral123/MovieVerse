import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMoviesByGenre, isTmdbKeySet, imageUrl } from '../services/tmdb';
import TopNavBar from '../components/TopNavBar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';

const GENRES = [
  { id: 28, name: 'Action', icon: 'sports_martial_arts', color: 'from-red-600/30 to-red-900/10' },
  { id: 12, name: 'Adventure', icon: 'explore', color: 'from-emerald-600/30 to-emerald-900/10' },
  { id: 16, name: 'Animation', icon: 'animation', color: 'from-pink-500/30 to-pink-900/10' },
  { id: 35, name: 'Comedy', icon: 'sentiment_very_satisfied', color: 'from-yellow-500/30 to-yellow-900/10' },
  { id: 80, name: 'Crime', icon: 'gavel', color: 'from-slate-400/30 to-slate-900/10' },
  { id: 99, name: 'Documentary', icon: 'videocam', color: 'from-teal-500/30 to-teal-900/10' },
  { id: 18, name: 'Drama', icon: 'masks', color: 'from-purple-500/30 to-purple-900/10' },
  { id: 10751, name: 'Family', icon: 'family_restroom', color: 'from-sky-400/30 to-sky-900/10' },
  { id: 14, name: 'Fantasy', icon: 'auto_awesome', color: 'from-violet-500/30 to-violet-900/10' },
  { id: 27, name: 'Horror', icon: 'skull', color: 'from-rose-700/30 to-rose-950/10' },
  { id: 9648, name: 'Mystery', icon: 'search', color: 'from-indigo-500/30 to-indigo-900/10' },
  { id: 10749, name: 'Romance', icon: 'favorite', color: 'from-pink-400/30 to-pink-900/10' },
  { id: 878, name: 'Sci-Fi', icon: 'rocket_launch', color: 'from-cyan-500/30 to-cyan-900/10' },
  { id: 53, name: 'Thriller', icon: 'psychology', color: 'from-amber-600/30 to-amber-900/10' },
  { id: 10752, name: 'War', icon: 'shield', color: 'from-stone-400/30 to-stone-900/10' },
  { id: 37, name: 'Western', icon: 'wb_sunny', color: 'from-orange-600/30 to-orange-900/10' },
];

export default function Recommendations() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchMovies = (genreId) => {
    setLoading(true);
    setError(null);
    getMoviesByGenre(genreId)
      .then((data) => setMovies(data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!selectedGenre) return;
    fetchMovies(selectedGenre.id);
  }, [selectedGenre, refreshKey]);

  const handleBack = () => {
    setSelectedGenre(null);
    setMovies([]);
    setError(null);
  };

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Recommendations" />

      <main className="mt-20 max-w-[1280px] mx-auto px-4 md:px-12 py-12">
        {/* Demo Mode Banner */}
        {!isTmdbKeySet() && (
          <div className="mb-8">
            <div className="p-4 bg-primary-container/10 border border-primary-container/30 rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container">info</span>
              <p className="text-on-surface text-[14px]">
                <span className="font-bold text-primary-container">Demo Mode</span> — Showing sample data. Add your TMDB API key to <code className="bg-white/10 px-2 py-0.5 rounded text-[12px]">.env</code> for real data.
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-10">
          {selectedGenre ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-on-surface">arrow_back</span>
              </button>
              <div>
                <h1 className="text-[28px] md:text-[40px] font-black text-on-surface tracking-tight">
                  {selectedGenre.name}
                </h1>
                <p className="text-on-surface-variant text-[14px]">
                  Discovering {selectedGenre.name.toLowerCase()} movies
                </p>
              </div>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title="Shuffle"
              >
                <span className={`material-symbols-outlined text-on-surface ${loading ? 'animate-spin' : ''}`}>
                  shuffle
                </span>
              </button>
            </div>
          ) : (
            <div>
              <h1 className="text-[28px] md:text-[40px] font-black text-on-surface tracking-tight mb-2">
                Recommendations
              </h1>
              <p className="text-on-surface-variant text-[16px]">
                Pick a genre to discover movies
              </p>
            </div>
          )}
        </div>

        {/* Genre Cards Grid */}
        {!selectedGenre && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre)}
                className="glass-panel rounded-xl p-6 text-left hover:scale-[1.03] transition-transform duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative">
                  <span className="material-symbols-outlined text-primary-container text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                    {genre.icon}
                  </span>
                  <p className="text-on-surface font-bold text-[16px]">{genre.name}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {selectedGenre && loading && (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined text-primary-container text-5xl animate-spin">
              progress_activity
            </span>
          </div>
        )}

        {/* Error */}
        {selectedGenre && error && (
          <div className="glass-panel p-12 rounded-xl text-center">
            <span className="material-symbols-outlined text-error text-5xl mb-4">error</span>
            <p className="text-on-surface-variant text-[16px]">{error}</p>
            <button
              onClick={() => setSelectedGenre(null)}
              className="mt-4 px-6 py-2.5 bg-primary-container text-on-primary-container font-bold rounded-lg hover:scale-105 transition-transform cursor-pointer"
            >
              Back to Genres
            </button>
          </div>
        )}

        {/* Movies Grid */}
        {selectedGenre && !loading && !error && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group"
              >
                <div className="glass-panel rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="aspect-[2/3] bg-surface-container-high relative overflow-hidden">
                    {movie.poster_path ? (
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={imageUrl(movie.poster_path, 'w342')}
                        alt={movie.title}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-surface-variant text-4xl">
                          movie
                        </span>
                      </div>
                    )}
                    {movie.vote_average > 0 && (
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-secondary text-xs"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="text-white text-[11px] font-bold">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-on-surface font-bold text-[13px] leading-tight line-clamp-2 group-hover:text-primary-container transition-colors">
                      {movie.title}
                    </p>
                    <p className="text-on-surface-variant text-[11px] tracking-[0.05em] font-medium mt-1">
                      {movie.release_date?.split('-')[0] || 'TBA'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {selectedGenre && !loading && !error && movies.length === 0 && (
          <div className="glass-panel p-12 rounded-xl text-center">
            <span className="material-symbols-outlined text-on-surface-variant text-5xl mb-4">movie</span>
            <p className="text-on-surface-variant text-[16px]">No movies found for this genre.</p>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
