import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMoviesByGenre, isTmdbKeySet, imageUrl, backdropUrl } from '../services/tmdb';
import TopNavBar from '../components/TopNavBar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';

const GENRES = [
  { id: 28, name: 'Action', icon: 'sports_martial_arts', color: 'from-red-600/30 to-red-900/10', tagline: 'High-octane chases, explosive set-pieces and heroes who never back down.', detail: 'From bone-crunching martial arts to globe-trotting espionage, action runs on pure momentum — relentless pacing, practical stunts and set-pieces engineered to leave you breathless.' },
  { id: 12, name: 'Adventure', icon: 'explore', color: 'from-emerald-600/30 to-emerald-900/10', tagline: 'Grand journeys into the unknown, where every horizon hides a new discovery.', detail: 'Adventure films chase the horizon: lost temples, uncharted islands and quests that test the people who dare take them. Sweeping in scope and built for wonder, they turn the map itself into a story.' },
  { id: 16, name: 'Animation', icon: 'animation', color: 'from-pink-500/30 to-pink-900/10', tagline: 'Hand-drawn and computer-crafted worlds where imagination has no limits.', detail: 'Animation is less a genre than a limitless canvas. Whether hand-drawn, stop-motion or CGI, it bends reality to tell stories no live-action camera could — and speaks to every age at once.' },
  { id: 35, name: 'Comedy', icon: 'sentiment_very_satisfied', color: 'from-yellow-500/30 to-yellow-900/10', tagline: 'Laughs, mishaps and perfect timing — stories built to leave you grinning.', detail: 'Comedy lives in timing, character and the glorious mess of being human. From razor-sharp satire to warm-hearted farce, it is the genre engineered to make you laugh out loud.' },
  { id: 80, name: 'Crime', icon: 'gavel', color: 'from-slate-400/30 to-slate-900/10', tagline: 'Heists, mobsters and detectives walking the line between law and disorder.', detail: 'Crime cinema walks the shadowy line between order and chaos — heists, mob dynasties, corrupt cops and brilliant detectives. It is a genre obsessed with motive, consequence and the price of power.' },
  { id: 99, name: 'Documentary', icon: 'videocam', color: 'from-teal-500/30 to-teal-900/10', tagline: 'Real stories, real people — cinema that turns the camera on the truth.', detail: 'Documentaries turn the camera on the world as it is: real people, real stakes, real consequences. At their best they inform, provoke and reframe how you see the truth.' },
  { id: 18, name: 'Drama', icon: 'masks', color: 'from-purple-500/30 to-purple-900/10', tagline: 'Character-driven stories of love, loss and everything that makes us human.', detail: 'Drama holds the human condition under a lens — love and loss, ambition and regret, families pulling apart and coming back together. Character is king and emotion is the payoff.' },
  { id: 10751, name: 'Family', icon: 'family_restroom', color: 'from-sky-400/30 to-sky-900/10', tagline: 'Warm-hearted adventures made for every generation to enjoy together.', detail: 'Family films are built to be shared, with warmth, humour and adventure that plays to every generation in the room. Big-hearted stories that leave everyone smiling.' },
  { id: 14, name: 'Fantasy', icon: 'auto_awesome', color: 'from-violet-500/30 to-violet-900/10', tagline: 'Magic, myth and impossible worlds waiting just beyond our own.', detail: 'Fantasy conjures worlds where magic is real and myth walks the earth — enchanted kingdoms, ancient prophecies and heroes who rise against impossible odds. A genre of pure imagination.' },
  { id: 27, name: 'Horror', icon: 'skull', color: 'from-rose-700/30 to-rose-950/10', tagline: 'Fear, dread and the things that go bump in the night.', detail: 'Horror is the art of controlled fear, turning dread, suspense and the unknown into an experience you cannot look away from. It probes our deepest anxieties and dares us to keep watching.' },
  { id: 9648, name: 'Mystery', icon: 'search', color: 'from-indigo-500/30 to-indigo-900/10', tagline: 'Clues, twists and puzzles daring you to solve them before the reveal.', detail: 'Mystery is a puzzle you are invited to solve, built on clues, red herrings and reveals that snap the whole picture into place. The pleasure is in the chase.' },
  { id: 10749, name: 'Romance', icon: 'favorite', color: 'from-pink-400/30 to-pink-900/10', tagline: 'Love in all its forms — the butterflies, the heartbreak and the happily ever after.', detail: 'Romance charts the countless shapes of love — first sparks, slow burns, second chances and the ache of what might have been. It is the genre of the heart, in all its joy and heartbreak.' },
  { id: 878, name: 'Sci-Fi', icon: 'rocket_launch', color: 'from-cyan-500/30 to-cyan-900/10', tagline: 'Distant galaxies, future tech and bold questions about what comes next.', detail: 'Sci-fi takes a single "what if" and follows it to the end: alien contact, artificial minds, dystopias and distant stars. It is the genre that asks the biggest questions about who we are.' },
  { id: 53, name: 'Thriller', icon: 'psychology', color: 'from-amber-600/30 to-amber-900/10', tagline: 'Tension that tightens with every scene, right up to the final turn.', detail: 'Thrillers run on tension, tightening the screws scene by scene with twists, double-crosses and races against time. Sharp, gripping and impossible to put down.' },
  { id: 10752, name: 'War', icon: 'shield', color: 'from-stone-400/30 to-stone-900/10', tagline: 'Stories of courage, sacrifice and the human cost of conflict.', detail: 'War cinema confronts conflict at its most human — courage and cowardice, camaraderie and catastrophe. It holds a mirror to history and to the cost of what we fight for.' },
  { id: 37, name: 'Western', icon: 'wb_sunny', color: 'from-orange-600/30 to-orange-900/10', tagline: 'Dusty frontiers, lone gunslingers and justice at the edge of civilization.', detail: 'Westerns roam the frontier where law is thin and survival is earned — lone gunslingers, dusty towns and moral reckonings under an open sky. A mythic, distinctly American canvas.' },
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

  const bannerMovie = movies.find((m) => m && m.backdrop_path);
  const posterMovie = movies.find((m) => m && m.poster_path);
  const bannerImage = bannerMovie ? backdropUrl(bannerMovie.backdrop_path, 'w1280') : null;
  const posterImage = posterMovie ? imageUrl(posterMovie.poster_path, 'w342') : null;
  const rated = movies.filter((m) => m && m.vote_average > 0);
  const avgRating = rated.length ? rated.reduce((s, m) => s + m.vote_average, 0) / rated.length : 0;

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Recommendations" />

      {selectedGenre ? (
        <>
          {/* Genre Banner */}
          <section className="mt-20">
            <div className="max-w-[1280px] mx-auto px-4 md:px-12 pt-8">
              <div className="glass-panel relative rounded-3xl overflow-hidden border-white/10">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedGenre.color} opacity-70 pointer-events-none`} />
                <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-4 md:gap-6 p-5 md:p-8">
                  {/* Genre detail (left) */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/30 border border-white/10 hover:bg-black/50 transition-colors cursor-pointer text-[13px] font-bold"
                        title="Back to genres"
                      >
                        <span className="material-symbols-outlined text-[18px] text-on-surface">arrow_back</span>
                        All genres
                      </button>
                      <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="p-2 rounded-full bg-black/30 border border-white/10 hover:bg-black/50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Shuffle picks"
                      >
                        <span className={`material-symbols-outlined text-[20px] text-on-surface ${loading ? 'animate-spin' : ''}`}>
                          shuffle
                        </span>
                      </button>
                    </div>

                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 border border-primary-container/30 text-primary-container text-[11px] tracking-[0.15em] uppercase font-black mb-3 self-start">
                      <span className="material-symbols-outlined text-[15px]">{selectedGenre.icon}</span>
                      Genre
                    </span>

                    <h1 className="text-[34px] min-[400px]:text-[40px] md:text-[52px] leading-[0.98] font-black tracking-tight text-on-surface mb-2">
                      {selectedGenre.name}
                    </h1>
                    <p className="text-secondary font-bold text-[15px] md:text-[17px] leading-snug mb-3">
                      {selectedGenre.tagline}
                    </p>
                    <p className="text-on-surface-variant text-[13px] md:text-[14px] leading-relaxed mb-5 max-w-2xl">
                      {selectedGenre.detail}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto">
                      {movies.length > 0 && (
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-on-surface">
                          <span className="material-symbols-outlined text-[17px] text-primary-container">movie</span>
                          {movies.length} titles
                        </span>
                      )}
                      {avgRating > 0 && (
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-on-surface">
                          <span className="material-symbols-outlined text-[17px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          {avgRating.toFixed(1)} avg rating
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-on-surface-variant">
                        <span className="material-symbols-outlined text-[17px] text-on-surface-variant">history</span>
                        Fresh picks every shuffle
                      </span>
                    </div>
                  </div>

                  {/* Framed subject (right) */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-surface-container-high min-h-[180px] md:min-h-[260px] aspect-[16/9] md:aspect-auto">
                    {bannerImage ? (
                      <img
                        src={bannerImage}
                        alt={bannerMovie?.title || selectedGenre.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${selectedGenre.color}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    {bannerMovie?.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.15em] font-bold">Featured</p>
                          <p className="text-on-surface font-bold text-[13px] md:text-[15px] line-clamp-1">{bannerMovie.title}</p>
                        </div>
                        {posterImage && (
                          <div className="w-9 md:w-11 shrink-0 aspect-[2/3] rounded-md overflow-hidden border border-white/20 shadow-lg">
                            <img src={posterImage} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <main className="max-w-[1280px] mx-auto px-4 md:px-12 pt-10 pb-16">
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

            {/* Section heading */}
            {!loading && !error && movies.length > 0 && (
              <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="text-[22px] md:text-[30px] font-black tracking-tight">
                  Top <span className="text-primary-container">{selectedGenre.name}</span> picks
                </h2>
                <span className="hidden sm:inline text-on-surface-variant text-[13px] font-medium shrink-0">
                  Hand-picked from TMDB discover
                </span>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined text-primary-container text-5xl animate-spin">
                  progress_activity
                </span>
              </div>
            )}

            {/* Error */}
            {error && (
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
            {!loading && !error && movies.length > 0 && (
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
            {!loading && !error && movies.length === 0 && (
              <div className="glass-panel p-12 rounded-xl text-center">
                <span className="material-symbols-outlined text-on-surface-variant text-5xl mb-4">movie</span>
                <p className="text-on-surface-variant text-[16px]">No movies found for this genre.</p>
              </div>
            )}
          </main>
        </>
      ) : (
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
            <h1 className="text-[28px] md:text-[40px] font-black text-on-surface tracking-tight mb-2">
              Recommendations
            </h1>
            <p className="text-on-surface-variant text-[16px]">
              Pick a genre to discover movies
            </p>
          </div>

          {/* Genre Cards Grid */}
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
        </main>
      )}

      <Footer />
      <MobileNav />
    </div>
  );
}
