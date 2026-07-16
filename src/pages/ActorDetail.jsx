import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getPersonDetails,
  getPersonMovieCredits,
  isTmdbKeySet,
  imageUrl,
} from '../services/tmdb';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

const MOVIE_GENRES = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 53: 'Thriller',
  10752: 'War', 37: 'Western',
};

export default function ActorDetail() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [bioClampable, setBioClampable] = useState(false);
  const bioRef = useRef(null);

  useEffect(() => {
    if (bioRef.current) {
      setBioClampable(bioRef.current.scrollHeight > bioRef.current.clientHeight);
    }
  }, [person?.biography]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([getPersonDetails(id), getPersonMovieCredits(id)])
      .then(([personData, creditsData]) => {
        setPerson(personData);
        const sorted = [...creditsData.cast].sort((a, b) => {
          const dateA = a.release_date || '9999';
          const dateB = b.release_date || '9999';
          return dateB.localeCompare(dateA);
        });
        setMovies(sorted);
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

  if (error || !person) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-error text-6xl mb-4">error</span>
        <h2 className="text-[24px] font-bold text-on-surface mb-2">Actor not found</h2>
        <p className="text-on-surface-variant text-[16px] mb-6">{error || 'Something went wrong.'}</p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary-container text-on-primary-container font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const profileImg = person.profile_path ? imageUrl(person.profile_path, 'h632') : null;

  const calculateAge = (birthday, deathday) => {
    if (!birthday) return null;
    const birth = new Date(birthday);
    const end = deathday ? new Date(deathday) : new Date();
    let age = end.getFullYear() - birth.getFullYear();
    const m = end.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && end.getDate() < birth.getDate())) age--;
    return age;
  };

  const age = calculateAge(person.birthday, person.deathday);

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Movies" />

      <main className="mt-20">
        {/* Demo Mode Banner */}
        {!isTmdbKeySet() && (
          <div className="max-w-[1280px] mx-auto px-4 md:px-12 pb-4 pt-4">
            <div className="p-4 bg-primary-container/10 border border-primary-container/30 rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container">info</span>
              <p className="text-on-surface text-[14px]">
                <span className="font-bold text-primary-container">Demo Mode</span> — Showing sample data. Add your TMDB API key to <code className="bg-white/10 px-2 py-0.5 rounded text-[12px]">.env</code> for real data.
              </p>
            </div>
          </div>
        )}

        {/* Actor Hero */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            {/* Profile Photo */}
            <div className="shrink-0 w-48 md:w-72 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {profileImg ? (
                <img
                  className="w-full h-full object-cover"
                  src={profileImg}
                  alt={person.name}
                />
              ) : (
                <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-8xl">
                    person
                  </span>
                </div>
              )}
            </div>

            {/* Actor Info */}
            <div className="flex-grow space-y-6">
              <h1 className="text-[32px] md:text-[56px] text-on-surface tracking-tight font-black leading-tight">
                {person.name}
              </h1>

              <div className="flex flex-wrap gap-3">
                {person.known_for_department && (
                  <span className="px-4 py-1.5 bg-primary-container/20 text-primary-container text-[12px] tracking-[0.05em] font-medium rounded-full border border-primary-container/30 uppercase">
                    {person.known_for_department}
                  </span>
                )}
                {person.birthday && (
                  <span className="px-4 py-1.5 bg-white/10 text-on-surface text-[12px] tracking-[0.05em] font-medium rounded-full border border-white/10">
                    Born {person.birthday}{age !== null ? ` (age ${age})` : ''}
                  </span>
                )}
                {person.deathday && (
                  <span className="px-4 py-1.5 bg-white/10 text-on-surface-variant text-[12px] tracking-[0.05em] font-medium rounded-full border border-white/10">
                    Died {person.deathday}
                  </span>
                )}
                {person.place_of_birth && (
                  <span className="px-4 py-1.5 bg-white/10 text-on-surface-variant text-[12px] tracking-[0.05em] font-medium rounded-full border border-white/10">
                    {person.place_of_birth}
                  </span>
                )}
              </div>

              {person.biography && (
                <div className="glass-panel p-6 rounded-xl relative overflow-hidden">
                  <h3 className="text-[18px] font-bold mb-3">Biography</h3>
                  <div
                    ref={bioRef}
                    className={`text-on-surface-variant text-[14px] leading-relaxed whitespace-pre-line transition-all duration-300 ${
                      !bioExpanded ? 'line-clamp-3' : ''
                    }`}
                  >
                    {person.biography}
                  </div>
                  {!bioExpanded && bioClampable && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-container to-transparent pointer-events-none" />
                  )}
                  {bioClampable && (
                    <button
                      onClick={() => setBioExpanded((prev) => !prev)}
                      className="mt-3 text-primary-container text-[13px] font-bold hover:underline cursor-pointer"
                    >
                      {bioExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              )}

              <div className="glass-panel p-6 rounded-xl inline-flex items-center gap-4">
                <div className="text-center">
                  <span className="text-[32px] font-black text-secondary leading-none">
                    {movies.length}
                  </span>
                  <p className="text-on-surface-variant text-[12px] tracking-[0.05em] font-medium mt-1">
                    Movies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filmography */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-12 pb-16">
          <h2 className="text-[28px] font-black text-on-surface mb-8">
            Filmography
          </h2>

          {movies.length === 0 ? (
            <div className="glass-panel p-12 rounded-xl text-center">
              <span className="material-symbols-outlined text-on-surface-variant text-5xl mb-4">
                movie
              </span>
              <p className="text-on-surface-variant text-[16px]">
                No movies found for this actor.
              </p>
            </div>
          ) : (
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
                      {movie.character && (
                        <p className="text-on-surface-variant text-[11px] tracking-[0.05em] font-medium mt-1 line-clamp-1">
                          as {movie.character}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-on-surface-variant text-[11px] tracking-[0.05em] font-medium">
                          {movie.release_date?.split('-')[0] || 'TBA'}
                        </span>
                        {movie.genre_ids?.slice(0, 1).map((gid) => (
                          MOVIE_GENRES[gid] && (
                            <span
                              key={gid}
                              className="text-on-surface-variant text-[10px] tracking-[0.05em] font-medium bg-white/5 px-1.5 py-0.5 rounded"
                            >
                              {MOVIE_GENRES[gid]}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
