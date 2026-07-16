import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';

const topFilms = [
  {
    title: 'Interstellar',
    rating: 5.0,
    watches: 12,
    badge: "User's Choice",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEHlJQzlgnig3QAsCikGjWb0N9FVeG9G8PNNZADcvgqeLEYNFWIzHbpzeMLZ-QSHcLC_PlJNpjb4XRCNnMK98ZGVR8Vlw97P7h8OQZ_YHkLbozFfZf6DQGzZfb4kU36UgCdZOHxvqiQ1ENaNuAz0BlZ1gOCGf43ERc7zEGi2hkjMnJ0H_--DwkHf9YZ5aAalBKQgWlGZAO9cYw0NmJnjh1qp60NnWF__gAkxTNk2ILuEL-5l6nNaQt',
    border: 'border-2 border-primary-container shadow-[0_0_15px_rgba(255,128,0,0.3)]',
    rewatches: '4 REWATCHES',
    isFavorite: true,
  },
  {
    title: 'Blade Runner 2049',
    rating: 4.5,
    watches: 6,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAg14cxv0BwD3oXuxA7wo96WoVJSLvTL8rBRrtAKDsl0aNSPJ2Ts1akDW2gRYJuIAE44UePYEBtOn07ZCgXsTCBkJZNJtHglNCZ0-r8z_zssy094IngLBupXv-8MoNvZADZ9HTUChrFBtBZPMDDUiFiu-mxhiAZLG8NzgGcz3ocwlwIF5cXF5zgfAwlhRUNuxpc4B820WE7uuAUJUWBchhaIh3GePsjYaJio4wCP-HwXakWD-IniuWp',
    border: 'border border-white/10',
    rewatches: '2 REWATCHES',
  },
  {
    title: 'The Favourite',
    rating: 4.5,
    watches: 5,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_dg7Wn5xaO8dm5Bcguz6ju5yt4TrpSF78Q6pLfXVf4oLDs97m0Tobnr9Y-FcEVQ6R3_fTvc1tCrtQBt8CzujVRWXlpe9AvPablb3Hs27pXVOGSjqfI21BXnd4DhWIBrSqvrdKs03B36ZdUdcoHEuT0QIgqmr53SBou8Kfi2Y-0a9lQA_PWoYfKO-imomcdXQn6BGNpOqFJyZPCjyzSP9riJu5YFY73qx5cXVMqb5GJ05hy3okojFN',
    border: 'border border-white/10',
    rewatches: 'NEW WATCH',
  },
  {
    title: 'Heat',
    rating: 4.0,
    watches: 4,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIo2hOLvWh9vdqfMF00aJg6riNXd7ixuefJpUQuDnlLfIS0F79-qnVxnS3o2NokfmPW6LxvrAjDMhVPbEuPuZGocoT-AFNBgd71jqG_E5VL2wBoiVoYEPnLZ4NZFTx7uJ0Xggu2vJXi4ConfEcrsvjd7TjwN3cgGf41DDweppFjmLcnUU6FZ8RaNKX4c7ZFwdooi4GwmHVDCodt9Y2mY44Ky0Xio9jMbSutXvmzS80pp8bFWUVhExH',
    border: 'border border-white/10',
    rewatches: 'CLASSIC REWATCH',
  },
];

const heavyHitters = [
  ...topFilms,
  {
    title: 'The Lighthouse',
    rating: 5.0,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgMnQT4in9YwnUeS7G4ZL-0Eg1Tbqd1e3U8Q3AIPLSYufCaTbdWtrmdHOEPSafQz_ZHXS3aeksCFjJ2MrjTbQg3soHYAbNydEAXW87CH51XA9qRiqQzwF782x5EtrLwngSbALwPYGuRkUai_1U4enTGbL_XQzWrGPF_IE4u_eLYJKnk_SpIJ8u8zKVsbWr9ADO4YSwqj4x4a8ZV8tY-aHSlbBdxKFO6G1obrV-BVK0vI9fq1-vjvJL',
    rewatches: "CRITIC'S CHOICE",
    isFavorite: true,
  },
];

function StarBadge({ rating }) {
  const hasHalf = rating % 1 !== 0;
  const full = Math.floor(rating);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-secondary text-[12px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
      {hasHalf && (
        <span
          className="material-symbols-outlined text-secondary text-[12px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star_half
        </span>
      )}
      <span className="text-secondary text-[12px] font-bold">{rating}</span>
    </div>
  );
}

export default function Community() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Community" />
      <SideNavBar />

      <main className="xl:ml-64 pt-28 px-4 md:px-12 pb-24 md:pb-20 max-w-[1280px] mx-auto space-y-12">
        {/* Hero Section */}
        <section className="relative h-64 md:h-96 rounded-3xl overflow-hidden glass-card group">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-6 md:p-12">
            <div className="flex items-end justify-between w-full">
              <div className="space-y-2">
                <span className="text-[12px] uppercase tracking-widest text-primary-container font-medium">
                  2024 Recap
                </span>
                <h1 className="text-[28px] md:text-[48px] font-black text-white tracking-tight leading-[1.1]">
                  Your Year in Cinema
                </h1>
                <div className="flex gap-6 md:gap-12 mt-4 md:mt-6">
                  <div>
                    <div className="text-2xl md:text-4xl font-black text-primary">42,840</div>
                    <div className="text-sm text-on-surface-variant">Minutes Watched</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-4xl font-black text-primary">154</div>
                    <div className="text-xs md:text-sm text-on-surface-variant">Films Logged</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-4xl font-black text-primary">28</div>
                    <div className="text-sm text-on-surface-variant">First-time Watches</div>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-shrink-0 flex-col items-center rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,128,0,0.15)] bg-surface-container/60 backdrop-blur-md w-72">
                <div className="w-full overflow-hidden">
                  <img
                    className="w-full object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW_WsP_rWwVu3IkEsdfGbq8slZ3yNuUBsk2Hkr4mkDMte4KMx03t1raztNxSpb3xdhcoFO9ol7ch_KH33YlBWR8HZQiHFvccNpFW3ouKVVBNj-phrqhJowl6oHlAbu9Bw-pcTYJdCkAqdVj9faNk1GJAnrYucnnTASc7_DyxHAPkdA_3ja1tRzFNYGCT4_dG40YGs5ukdRmMpTqS0jlL3E3FJESSoUXgD26gV2CTsSj9F9bMZSxWgh"
                    alt="Profile"
                  />
                </div>
                <div className="w-full p-4 space-y-2 text-center">
                  <p className="text-sm font-bold text-on-surface">Your Profile</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">2024 Recap</p>
                  <div className="h-px w-full bg-white/10" />
                  <div className="flex justify-center gap-4 pt-1">
                    <div>
                      <div className="text-lg font-black text-primary">154</div>
                      <div className="text-[10px] text-on-surface-variant">Films</div>
                    </div>
                    <div>
                      <div className="text-lg font-black text-primary">4.2</div>
                      <div className="text-[10px] text-on-surface-variant">Avg Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Films of 2024 + Genre Evolution */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Top Films */}
          <div className="lg:col-span-8 glass-card rounded-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-[24px] font-bold">Top Films of 2024</h2>
                <p className="text-sm text-on-surface-variant">Your cinematic hall of fame</p>
              </div>
              <span className="text-xs font-medium text-primary-container px-3 py-1 bg-primary-container/10 rounded-full border border-primary-container/20">
                Showcasing Top 4
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topFilms.map((film) => (
                <div key={film.title} className="space-y-3">
                  <div className={`relative aspect-[2/3] rounded-xl overflow-hidden ${film.border}`}>
                    <img
                      alt={film.title}
                      className="w-full h-full object-cover"
                      src={film.image}
                    />
                    {film.badge && (
                      <div className="absolute top-2 left-2 bg-primary-container text-on-primary-container text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-tighter">
                        {film.badge}
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black to-transparent">
                      <div className="text-[10px] text-white font-bold">{film.watches} WATCHES</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm truncate">{film.title}</h4>
                    <StarBadge rating={film.rating} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Genre Evolution */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-8 flex flex-col">
            <h2 className="text-[24px] font-bold mb-2">Genre Evolution</h2>
            <p className="text-sm text-on-surface-variant mb-8">
              Your taste profile shifting over time
            </p>
            <div className="flex-grow flex items-center justify-center relative radar-grid rounded-xl border border-white/5">
              <div className="w-48 h-48 rounded-full border-2 border-primary/20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-primary/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-primary-container" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
                <span className="absolute top-4 text-white/50 text-[10px] font-medium">SCI-FI</span>
                <span className="absolute bottom-4 text-white/50 text-[10px] font-medium">DRAMA</span>
                <span className="absolute left-4 text-white/50 text-[10px] font-medium">HORROR</span>
                <span className="absolute right-4 text-white/50 text-[10px] font-medium">COMEDY</span>
              </div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                <polygon
                  fill="rgba(255,183,135,0.2)"
                  points="100,40 160,100 100,160 50,100"
                  stroke="#ffb787"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Completionist Goal + Top 1% Global */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 glass-card rounded-2xl p-10 flex flex-col md:flex-row gap-8 items-center border-l-4 border-primary-container">
            <div className="flex-grow w-full">
              <span className="text-[12px] text-primary-container uppercase tracking-widest mb-4 block font-medium">
                Completionist Goal
              </span>
              <h2 className="text-[24px] font-bold text-white mb-4">The Nolan Filmography</h2>
              <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-primary-container w-[83%] rounded-full shadow-[0_0_10px_rgba(255,128,0,0.5)]" />
              </div>
              <div className="flex flex-col sm:flex-row justify-between text-sm gap-2">
                <span className="text-on-surface font-bold">10 / 12 Films Completed</span>
                <span className="text-on-surface-variant italic">Next up: Insomnia (2002)</span>
              </div>
            </div>
            <div className="hidden lg:flex w-24 h-24 flex-shrink-0 items-center justify-center rounded-full bg-surface-container-high border border-white/10">
              <span className="material-symbols-outlined text-primary text-4xl">movie_filter</span>
            </div>
          </div>

          <div className="md:col-span-4 glass-card rounded-2xl p-10 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary-container text-4xl">trophy</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Top 1% Global</h3>
            <p className="text-on-surface-variant text-sm">
              You watched more cinema than 99% of CineVerse users in 2024.
            </p>
          </div>
        </section>

        {/* The Heavy Hitters Grid */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-[24px] font-bold">The Heavy Hitters</h2>
              <p className="text-on-surface-variant">Highest rated films from your collection</p>
            </div>
            <button className="text-primary hover:underline font-medium text-xs tracking-widest uppercase">
              View All 154
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {heavyHitters.map((film) => (
              <div
                key={film.title}
                className="group relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all poster-glow"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={film.image}
                  alt={film.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 p-4 w-full">
                  <div className="flex justify-between items-center">
                    <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {film.rating}
                    </span>
                    {film.isFavorite && (
                      <span
                        className="material-symbols-outlined text-white text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        favorite
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-sm mt-2 line-clamp-1">{film.title}</h3>
                  <p className="text-on-surface-variant text-[10px] uppercase tracking-tighter">
                    {film.rewatches}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
