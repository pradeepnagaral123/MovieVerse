import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchTVShows, tvPosterUrl, isTmdbKeySet } from '../services/tmdb';
import TopNavBar from '../components/TopNavBar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';

export default function TVSearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(query);
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  const doSearch = useCallback((q, p) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    searchTVShows(q, p)
      .then((data) => {
        if (!controller.signal.aborted) {
          setShows(data.results);
          setTotalPages(Math.min(data.total_pages, 20));
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!searchInput.trim()) {
      setShows([]);
      setTotalPages(0);
      setPage(1);
      return;
    }

    setPage(1);
    debounceRef.current = setTimeout(() => {
      doSearch(searchInput.trim(), 1);
      const newUrl = `/tv/search?q=${encodeURIComponent(searchInput.trim())}`;
      window.history.replaceState(null, '', newUrl);
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [searchInput, doSearch]);

  useEffect(() => {
    if (page > 1 && searchInput.trim()) {
      doSearch(searchInput.trim(), page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page, searchInput, doSearch]);

  useEffect(() => {
    if (query && query !== searchInput) {
      setSearchInput(query);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="TV Shows" />

      <main className="pt-28 pb-24 md:pb-20 px-4 md:px-12 max-w-[1280px] mx-auto">
        {!isTmdbKeySet() && (
          <div className="mb-6 p-4 bg-primary-container/10 border border-primary-container/30 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-container">info</span>
            <p className="text-on-surface text-[14px]">
              <span className="font-bold text-primary-container">Demo Mode</span> — Showing sample shows. To search real shows, add your TMDB API key to <code className="bg-white/10 px-2 py-0.5 rounded text-[12px]">.env</code>
            </p>
          </div>
        )}

        <section className="mb-10">
          <form onSubmit={handleSearch} className="relative search-glow transition-all duration-300 rounded-2xl max-w-3xl">
            <input
              className="w-full bg-surface-container-high border-white/10 border p-4 md:p-6 pl-14 md:pl-16 rounded-2xl text-[16px] md:text-[18px] focus:ring-0 focus:outline-none placeholder:text-on-surface-variant/50"
              placeholder="Search TV shows by title, genre, or actor..."
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              autoFocus
            />
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-primary-container text-3xl">
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
        </section>

        {searchInput.trim() && (
          <div className="mb-6">
            <h1 className="text-[24px] md:text-[32px] font-black text-white">
              Results for <span className="text-primary-container">"{searchInput.trim()}"</span>
            </h1>
            <p className="text-on-surface-variant text-[16px] mt-1">
              {shows.length > 0 ? `${shows.length} shows found` : ''}
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined text-primary-container text-5xl animate-spin">
              progress_activity
            </span>
          </div>
        ) : shows.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {shows.map((show) => (
                <Link
                  key={show.id}
                  to={`/tv/${show.id}`}
                  className="group space-y-3 cursor-pointer"
                >
                  <div className="aspect-[2/3] rounded-xl overflow-hidden border border-white/10 relative">
                    {show.poster_path ? (
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={tvPosterUrl(show.poster_path)}
                        alt={show.name}
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-surface-variant text-5xl">
                          tv
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-secondary font-bold">
                        {show.vote_average ? show.vote_average.toFixed(1) : 'N/A'} / 10
                      </span>
                    </div>
                    {show.vote_average >= 7.5 && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-secondary/20 text-secondary text-[10px] font-bold px-2 py-1 rounded border border-secondary/30 backdrop-blur-sm">
                          TOP RATED
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[16px] text-on-surface font-bold leading-tight line-clamp-1">
                      {show.name}
                    </p>
                    <p className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                      {show.first_air_date ? show.first_air_date.split('-')[0] : 'TBA'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-white/10 rounded-lg text-[14px] font-bold disabled:opacity-30 hover:bg-white/5 transition-colors"
                >
                  Previous
                </button>
                <span className="text-on-surface-variant text-[14px]">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-white/10 rounded-lg text-[14px] font-bold disabled:opacity-30 hover:bg-white/5 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : searchInput.trim() ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-on-surface-variant text-6xl mb-4">
              search_off
            </span>
            <h2 className="text-[24px] font-bold text-on-surface mb-2">No shows found</h2>
            <p className="text-on-surface-variant text-[16px]">
              Try a different search term or check the spelling.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-primary-container text-6xl mb-4">
              tv
            </span>
            <h2 className="text-[24px] font-bold text-on-surface mb-2">
              Search for any TV show
            </h2>
            <p className="text-on-surface-variant text-[16px] max-w-md">
              Type a show title, genre, actor, or network in the search bar above to discover
              series.
            </p>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
