import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTVShowDetails, isTmdbKeySet, tvBackdropUrl, tvPosterUrl, imageUrl } from '../services/tmdb';
import TopNavBar from '../components/TopNavBar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';

const STREAMERS = [
  { name: 'HBO Max', abbr: 'MAX', color: 'bg-black' },
  { name: 'Prime Video', abbr: 'P+', color: 'bg-blue-600' },
  { name: 'Apple TV', abbr: 'TV+', color: 'bg-red-600' },
  { name: 'Netflix', abbr: 'NET', color: 'bg-yellow-500' },
];

function RatingChart({ rating }) {
  const pct = ((rating || 0) / 10) * 100;
  return (
    <div className="glass-panel p-8 rounded-xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[24px] font-bold">Rating Overview</h3>
        <div className="flex items-center gap-4 text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-secondary rounded-full" /> IMDb Score
          </span>
        </div>
      </div>
      <div className="h-8 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-secondary/80 to-secondary rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-4 text-[12px] tracking-[0.05em] font-medium text-on-surface-variant px-1">
        <span>0</span>
        <span>2.5</span>
        <span>5</span>
        <span>7.5</span>
        <span>10</span>
      </div>
    </div>
  );
}

export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const handleRate = useCallback((star) => {
    setUserRating(star);
  }, []);

  const handleSubmitReview = useCallback(() => {
    if (userRating > 0) {
      setReviewSubmitted(true);
    }
  }, [userRating]);

  const toggleWatchlist = useCallback(() => {
    if (!show) return;
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem('cineVerse_show_watchlist') || '[]');
    } catch { /* empty */ }

    const exists = list.some((s) => s.id === show.id);
    let updated;
    if (exists) {
      updated = list.filter((s) => s.id !== show.id);
    } else {
      updated = [
        {
          id: show.id,
          name: show.name,
          poster_path: show.poster_path,
          first_air_date: show.first_air_date,
          added: true,
        },
        ...list,
      ];
    }
    localStorage.setItem('cineVerse_show_watchlist', JSON.stringify(updated));
    setIsInWatchlist(!exists);
  }, [show]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTVShowDetails(id)
      .then((data) => {
        setShow(data);
        try {
          const list = JSON.parse(localStorage.getItem('cineVerse_show_watchlist') || '[]');
          setIsInWatchlist(list.some((s) => s.id === data.id));
        } catch { /* empty */ }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="material-symbols-outlined text-primary-container text-5xl animate-spin">
          progress_activity
        </span>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-error text-6xl mb-4">error</span>
        <h2 className="text-[24px] font-bold text-on-surface mb-2">Show not found</h2>
        <p className="text-on-surface-variant text-[16px] mb-6">{error || 'Something went wrong.'}</p>
        <Link
          to="/tv"
          className="px-6 py-3 bg-primary-container text-on-primary-container font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Back to TV Shows
        </Link>
      </div>
    );
  }

  const backdrop = show.backdrop_path ? tvBackdropUrl(show.backdrop_path) : null;
  const poster = show.poster_path ? tvPosterUrl(show.poster_path) : null;
  const creator = show.created_by?.[0];
  const cast = show.credits?.cast?.slice(0, 6) || [];
  const trailer = show.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  ) || show.videos?.results?.find((v) => v.site === 'YouTube');
  const similar = show.similar?.results?.slice(0, 6) || show.recommendations?.results?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="TV Shows" />

      <main className="mt-20">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
            {backdrop ? (
              <div
                className="w-full h-full bg-cover bg-center scale-105 blur-[2px]"
                style={{ backgroundImage: `url('${backdrop}')` }}
              />
            ) : (
              <div className="w-full h-full bg-surface-container-high" />
            )}
          </div>
          <div className="relative z-20 max-w-[1280px] mx-auto px-4 md:px-12 h-full flex items-end pb-8 md:pb-16">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-end w-full">
              {/* Poster */}
              {poster && (
                <div className="shrink-0 w-40 md:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img className="w-full h-full object-cover" src={poster} alt={show.name} />
                </div>
              )}
              {/* Show Info */}
              <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {show.genres?.slice(0, 3).map((g) => (
                    <span
                      key={g.id}
                      className="px-3 py-1 bg-primary-container/20 text-primary-container text-[12px] tracking-[0.05em] font-medium rounded-full border border-primary-container/30 uppercase"
                    >
                      {g.name}
                    </span>
                  ))}
                  {show.number_of_seasons > 0 && (
                    <span className="px-3 py-1 bg-white/10 text-on-surface text-[12px] tracking-[0.05em] font-medium rounded-full border border-white/10">
                      {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}
                    </span>
                  )}
                  {show.number_of_episodes > 0 && (
                    <span className="px-3 py-1 bg-white/10 text-on-surface text-[12px] tracking-[0.05em] font-medium rounded-full border border-white/10">
                      {show.number_of_episodes} Episodes
                    </span>
                  )}
                </div>
                <h1 className="text-[28px] md:text-[48px] text-on-surface mb-2 tracking-tight font-black">
                  {show.name}
                </h1>
                {show.tagline && (
                  <p className="text-primary-container text-[16px] italic mb-4">"{show.tagline}"</p>
                )}
                <p className="text-[14px] md:text-[18px] text-on-surface-variant max-w-2xl mb-6 md:mb-8 leading-relaxed">
                  {show.overview}
                </p>
                <div className="flex flex-wrap gap-4">
                  {trailer && (
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 md:px-8 py-2.5 md:py-3 bg-primary-container text-on-primary-container text-[16px] md:text-[24px] rounded-lg flex items-center gap-2 hover:scale-105 transition-transform bloom-effect font-bold"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                      Watch Trailer
                    </a>
                  )}
                  <button
                    onClick={toggleWatchlist}
                    className={`px-6 md:px-8 py-2.5 md:py-3 border text-[16px] md:text-[24px] rounded-lg flex items-center gap-2 transition-all font-bold ${
                      isInWatchlist
                        ? 'border-secondary/40 bg-secondary/10 text-secondary'
                        : 'border-white/20 text-on-surface hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isInWatchlist ? 'bookmark' : 'bookmark_border'}
                    </span>
                    {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Mode Banner */}
        {!isTmdbKeySet() && (
          <div className="max-w-[1280px] mx-auto px-4 md:px-12 pb-4">
            <div className="p-4 bg-primary-container/10 border border-primary-container/30 rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container">info</span>
              <p className="text-on-surface text-[14px]">
                <span className="font-bold text-primary-container">Demo Mode</span> — Showing sample data. Add your TMDB API key to <code className="bg-white/10 px-2 py-0.5 rounded text-[12px]">.env</code> for real show data.
              </p>
            </div>
          </div>
        )}

        {/* Stats & Content Grid */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-12 py-16">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-8 space-y-12">
              {/* Bento Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel p-6 rounded-xl">
                  <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant block mb-2">
                    CREATED BY
                  </span>
                  <span className="text-[24px] font-bold text-on-surface">
                    {creator?.name || 'Unknown'}
                  </span>
                </div>
                <div className="glass-panel p-6 rounded-xl">
                  <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant block mb-2">
                    SEASONS
                  </span>
                  <span className="text-[24px] font-bold text-on-surface">
                    {show.number_of_seasons || 'N/A'}
                  </span>
                </div>
                <div className="glass-panel p-6 rounded-xl">
                  <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant block mb-2">
                    EPISODES
                  </span>
                  <span className="text-[24px] font-bold text-on-surface">
                    {show.number_of_episodes || 'N/A'}
                  </span>
                </div>
                <div className="glass-panel p-6 rounded-xl border-primary-container/20">
                  <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant block mb-2">
                    GLOBAL RATING
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[32px] font-black text-secondary leading-none">
                      {show.vote_average?.toFixed(1) || 'N/A'}
                    </span>
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Chart */}
              <RatingChart rating={show.vote_average} />

              {/* Rate This Show */}
              <div className="glass-panel p-8 rounded-xl overflow-hidden relative">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container/10 rounded-full blur-3xl" />
                <div className="relative">
                  <h3 className="text-[24px] font-bold mb-2">Rate this show</h3>
                  <p className="text-on-surface-variant text-[14px] mb-6">
                    Share your thoughts with the community
                  </p>

                  {reviewSubmitted ? (
                    <div className="text-center py-8 space-y-3">
                      <span
                        className="material-symbols-outlined text-secondary text-5xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <p className="text-on-surface font-bold text-lg">Review submitted!</p>
                      <p className="text-on-surface-variant text-sm">
                        You rated this show {userRating} star{userRating !== 1 ? 's' : ''}
                      </p>
                      <button
                        onClick={() => {
                          setReviewSubmitted(false);
                          setUserRating(0);
                          setReviewText('');
                        }}
                        className="text-primary-container text-sm font-bold hover:underline mt-2 cursor-pointer"
                      >
                        Edit review
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Star Selector */}
                      <div className="flex items-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleRate(star)}
                            className="cursor-pointer transition-transform hover:scale-125 active:scale-95"
                          >
                            <span
                              className="material-symbols-outlined text-4xl transition-colors"
                              style={{
                                fontVariationSettings:
                                  (hoverRating || userRating) >= star ? "'FILL' 1" : "'FILL' 0",
                                color:
                                  (hoverRating || userRating) >= star
                                    ? '#ff8000'
                                    : 'rgba(255,255,255,0.2)',
                              }}
                            >
                              star
                            </span>
                          </button>
                        ))}
                        {userRating > 0 && (
                          <span className="ml-3 text-primary-container font-bold text-sm">
                            {userRating}/5
                          </span>
                        )}
                      </div>

                      {/* Review Textarea */}
                      <textarea
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-on-surface placeholder:text-white/20 focus:ring-2 focus:ring-primary-container/50 focus:border-primary-container/50 resize-none outline-none transition-all text-sm"
                        rows={4}
                        placeholder="Write a short review (optional)..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />

                      {/* Submit */}
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-on-surface-variant text-[12px]">
                          {userRating === 0
                            ? 'Tap a star to rate'
                            : 'Review will be public'}
                        </p>
                        <button
                          onClick={handleSubmitReview}
                          disabled={userRating === 0}
                          className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer ${
                            userRating > 0
                              ? 'bg-primary-container text-on-primary-container hover:brightness-110 hover:scale-105'
                              : 'bg-white/5 text-white/20 cursor-not-allowed'
                          }`}
                        >
                          Submit Review
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Cast */}
              {cast.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-[24px] font-bold">Cast</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {cast.map((person) => (
                      <Link
                        key={person.id}
                        to={`/actor/${person.id}`}
                        className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer group"
                      >
                        {person.profile_path ? (
                          <img
                            className="w-14 h-14 rounded-full object-cover border border-white/10 group-hover:border-primary-container/40 transition-colors"
                            src={imageUrl(person.profile_path, 'w185')}
                            alt={person.name}
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center group-hover:border-primary-container/40 border border-transparent transition-colors">
                            <span className="material-symbols-outlined text-on-surface-variant">
                              person
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-on-surface font-bold text-[14px] leading-tight group-hover:text-primary-container transition-colors">
                            {person.name}
                          </p>
                          <p className="text-on-surface-variant text-[12px] tracking-[0.05em] font-medium">
                            {person.character}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* User Notes */}
                <div className="space-y-4">
                  <h3 className="text-[24px] font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">lock</span>
                    My Notes
                  </h3>
                  <div className="glass-panel p-6 rounded-xl border-dashed border-white/20 min-h-[300px] flex flex-col">
                    <textarea
                      className="bg-transparent border-none focus:ring-0 w-full h-full resize-none text-on-surface placeholder:text-white/20"
                      placeholder="Add a private note about this show..."
                    />
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      Auto-saved
                    </div>
                  </div>
                </div>

                {/* Show Info */}
                <div className="space-y-4">
                  <h3 className="text-[24px] font-bold">Details</h3>
                  <div className="glass-panel p-6 rounded-xl space-y-4">
                    {show.first_air_date && (
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant text-[14px]">First Air Date</span>
                        <span className="text-on-surface text-[14px] font-bold">{show.first_air_date}</span>
                      </div>
                    )}
                    {show.original_language && (
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant text-[14px]">Language</span>
                        <span className="text-on-surface text-[14px] font-bold uppercase">
                          {show.original_language}
                        </span>
                      </div>
                    )}
                    {show.status && (
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant text-[14px]">Status</span>
                        <span className="text-on-surface text-[14px] font-bold">{show.status}</span>
                      </div>
                    )}
                    {show.vote_count > 0 && (
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant text-[14px]">Total Votes</span>
                        <span className="text-on-surface text-[14px] font-bold">
                          {show.vote_count.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {show.networks?.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant text-[14px]">Network</span>
                        <span className="text-on-surface text-[14px] font-bold">
                          {show.networks[0].name}
                        </span>
                      </div>
                    )}
                    {show.origin_country?.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant text-[14px]">Country</span>
                        <span className="text-on-surface text-[14px] font-bold">
                          {show.origin_country.join(', ')}
                        </span>
                      </div>
                    )}
                    {show.episode_run_time?.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant text-[14px]">Episode Runtime</span>
                        <span className="text-on-surface text-[14px] font-bold">
                          {show.episode_run_time[0]} min
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {/* Where to Watch */}
              <div className="glass-panel p-6 rounded-xl space-y-6">
                <h3 className="text-[24px] font-bold">Where to Watch</h3>
                <div className="grid grid-cols-2 gap-4">
                  {STREAMERS.map((s) => (
                    <div
                      key={s.name}
                      className="bg-surface-container-high p-4 rounded-lg flex items-center gap-3 border border-white/5 hover:border-primary-container/40 transition-colors cursor-pointer group"
                    >
                      <div
                        className={`w-10 h-10 ${s.color} rounded flex items-center justify-center font-black text-white text-[10px] group-hover:scale-110 transition-transform`}
                      >
                        {s.abbr}
                      </div>
                      <div>
                        <span className="text-on-surface block font-bold leading-none">{s.name}</span>
                        <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                          Check
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="glass-panel p-6 rounded-xl space-y-6 overflow-hidden relative">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container/10 rounded-full blur-3xl" />
                <h3 className="text-[24px] font-bold">Quick Facts</h3>
                <div className="space-y-4">
                  {creator && (
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span className="text-[16px] text-on-surface flex-grow">{creator.name}</span>
                      <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                        Creator
                      </span>
                    </div>
                  )}
                  {show.first_air_date && (
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span className="text-[16px] text-on-surface flex-grow">{show.first_air_date}</span>
                      <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                        First Aired
                      </span>
                    </div>
                  )}
                  {show.genres?.slice(0, 2).map((g) => (
                    <div key={g.id} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span className="text-[16px] text-on-surface flex-grow">{g.name}</span>
                      <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                        Genre
                      </span>
                    </div>
                  ))}
                  {show.status && (
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span className="text-[16px] text-on-surface flex-grow">{show.status}</span>
                      <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                        Status
                      </span>
                    </div>
                  )}
                </div>
                <Link
                  to="/tv"
                  className="block w-full py-3 bg-white/5 border border-white/10 rounded-lg text-on-surface font-bold hover:bg-white/10 transition-colors text-center"
                >
                  Explore More Shows
                </Link>
              </div>

              {/* Similar Shows */}
              {similar.length > 0 && (
                <div className="glass-panel p-6 rounded-xl space-y-4">
                  <h3 className="text-[24px] font-bold">You Might Also Like</h3>
                  <div className="space-y-3">
                    {similar.slice(0, 4).map((s) => (
                      <Link
                        key={s.id}
                        to={`/tv/${s.id}`}
                        className="flex gap-3 group cursor-pointer"
                      >
                        <div className="w-16 h-24 rounded-lg overflow-hidden shrink-0 border border-white/10">
                          {s.poster_path ? (
                            <img
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                              src={imageUrl(s.poster_path, 'w92')}
                              alt={s.name}
                            />
                          ) : (
                            <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                              <span className="material-symbols-outlined text-on-surface-variant">
                                tv
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="text-on-surface font-bold text-[14px] leading-tight group-hover:text-primary-container transition-colors">
                            {s.name}
                          </p>
                          <p className="text-on-surface-variant text-[12px] tracking-[0.05em] font-medium">
                            {s.first_air_date?.split('-')[0] || 'TBA'}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <span
                              className="material-symbols-outlined text-secondary text-sm"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                            <span className="text-secondary text-[12px] font-bold">
                              {s.vote_average?.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
