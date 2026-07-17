import { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';
import FloatingActionButton from '../components/FloatingActionButton';
import { posterUrl } from '../services/tmdb';

const stats = [
  { label: 'Films Watched', value: '342', icon: 'movie' },
  { label: 'Reviews', value: '89', icon: 'rate_review' },
  { label: 'Lists', value: '12', icon: 'format_list_bulleted' },
  { label: 'Watchlist', value: '47', icon: 'bookmark' },
];

const recentActivity = [
  { type: 'rated', movie: 'Dune: Part Two', rating: 4, time: '2 hours ago' },
  { type: 'reviewed', movie: 'The Substance', time: '5 hours ago' },
  { type: 'added', movie: 'Nosferatu', time: '1 day ago' },
  { type: 'rated', movie: 'Anora', rating: 5, time: '2 days ago' },
  { type: 'list', movie: 'Best of 2024', time: '3 days ago' },
];

const tabOptions = ['Overview', 'Reviews', 'Lists', 'Watchlist'];

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [favoriteMovies] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cineVerse_favorites') || '[]');
    } catch {
      return [];
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Profile" />

      {/* Profile Hero */}
      <section className="relative pt-20">
        <div className="h-64 bg-gradient-to-b from-primary-container/20 to-background" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 -mt-20">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="w-32 h-32 rounded-full border-4 border-primary-container overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                alt="Profile"
              />
            </div>
            <div className="flex-grow pb-2">
              <h1 className="text-[32px] md:text-[48px] font-black text-on-surface tracking-tight">
                John Doe
              </h1>
              <p className="text-on-surface-variant text-[16px]">@johncineVerse &bull; Film Critic</p>
            </div>
            <div className="flex gap-3 pb-2">
              <button className="px-6 py-2 bg-primary-container text-on-primary-container font-bold rounded-lg hover:scale-105 transition-transform text-[14px]">
                Edit Profile
              </button>
              <button className="px-6 py-2 border border-white/20 text-on-surface rounded-lg hover:bg-white/5 transition-colors text-[14px]">
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 rounded-2xl text-center">
              <span className="material-symbols-outlined text-primary-container text-3xl mb-2 block">
                {stat.icon}
              </span>
              <div className="text-[24px] font-black text-on-surface">{stat.value}</div>
              <div className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-12">
        <div className="flex gap-6 border-b border-white/10 mb-8">
          {tabOptions.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[14px] font-bold transition-colors ${
                activeTab === tab
                  ? 'text-primary-container border-b-2 border-primary-container'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Favorite Movies */}
            <div>
              <h2 className="text-[24px] font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">favorite</span>
                Favorites
                {favoriteMovies.length > 0 && (
                  <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant bg-white/10 px-2 py-0.5 rounded-full">
                    {favoriteMovies.length}
                  </span>
                )}
              </h2>
              {favoriteMovies.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {favoriteMovies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[2/3] rounded-xl overflow-hidden border border-white/10 relative poster-glow transition-all">
                        {movie.poster_path ? (
                          <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            src={posterUrl(movie.poster_path)}
                            alt={movie.title}
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface-variant text-5xl">movie</span>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-[14px] text-on-surface font-bold leading-tight group-hover:text-primary-container transition-colors">
                        {movie.title}
                      </p>
                      <p className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 rounded-xl text-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-4xl mb-3 block">favorite_border</span>
                  <p className="text-on-surface-variant text-[14px]">
                    No favorites yet. Tap the heart on any movie to add it here.
                  </p>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-[24px] font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">history</span>
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-card p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors"
                  >
                    <span
                      className={`material-symbols-outlined text-2xl ${
                        item.type === 'rated'
                          ? 'text-primary-container'
                          : item.type === 'reviewed'
                          ? 'text-secondary'
                          : item.type === 'list'
                          ? 'text-tertiary-container'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      {item.type === 'rated'
                        ? 'star'
                        : item.type === 'reviewed'
                        ? 'rate_review'
                        : item.type === 'list'
                        ? 'format_list_bulleted'
                        : 'bookmark'}
                    </span>
                    <div className="flex-grow">
                      <p className="text-[14px] text-on-surface">
                        {item.type === 'rated' && (
                          <>
                            Rated{' '}
                            <span className="font-bold">{item.movie}</span>{' '}
                            {'\u2605'.repeat(item.rating)}
                          </>
                        )}
                        {item.type === 'reviewed' && (
                          <>
                            Reviewed <span className="font-bold">{item.movie}</span>
                          </>
                        )}
                        {item.type === 'added' && (
                          <>
                            Added <span className="font-bold">{item.movie}</span> to watchlist
                          </>
                        )}
                        {item.type === 'list' && (
                          <>
                            Created list <span className="font-bold">{item.movie}</span>
                          </>
                        )}
                      </p>
                      <p className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* About */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-[24px] font-bold mb-4">About</h3>
              <p className="text-[16px] text-on-surface-variant leading-relaxed mb-4">
                Passionate film critic with a love for cinematography and visual storytelling.
                Currently exploring the works of Wong Kar-wai and Andrei Tarkovsky.
              </p>
              <div className="space-y-2 text-[14px]">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  Joined March 2023
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  234 Friends
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-[24px] font-bold mb-4">Top Genres</h3>
              <div className="space-y-3">
                {[
                  { genre: 'Sci-Fi', pct: 32 },
                  { genre: 'Drama', pct: 28 },
                  { genre: 'Thriller', pct: 20 },
                  { genre: 'Animation', pct: 12 },
                ].map((g) => (
                  <div key={g.genre}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[14px] text-on-surface">{g.genre}</span>
                      <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                        {g.pct}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-container rounded-full"
                        style={{ width: `${g.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-[24px] font-bold mb-4">Badges</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: 'local_fire_department', label: 'Streak' },
                  { icon: 'emoji_events', label: 'Top Critic' },
                  { icon: 'auto_awesome', label: '100 Club' },
                ].map((badge) => (
                  <div key={badge.label} className="text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-primary-container/20 flex items-center justify-center mb-2">
                      <span className="material-symbols-outlined text-primary-container text-2xl">
                        {badge.icon}
                      </span>
                    </div>
                    <p className="text-[10px] tracking-[0.05em] font-medium text-on-surface-variant">
                      {badge.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActionButton />
      <MobileNav />
    </div>
  );
}
