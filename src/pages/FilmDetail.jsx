import { useState, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

const streamers = [
  { name: 'HBO Max', label: 'Stream', color: 'bg-black', abbr: 'MAX', priceColor: 'text-secondary' },
  { name: 'Prime Video', label: 'Rent $3.99', color: 'bg-blue-600', abbr: 'P+' },
  { name: 'Apple TV', label: 'Buy $14.99', color: 'bg-red-600', abbr: 'TV+' },
  { name: 'Netflix', label: 'N/A', color: 'bg-yellow-500', abbr: 'NET' },
];

const filmography = [
  { title: 'The Dark Knight', year: '2008', watched: true },
  { title: 'Inception', year: '2010', watched: true, current: true },
  { title: 'Interstellar', year: '2014', watched: true },
  { title: 'Oppenheimer', year: '2023', watched: false },
  { title: 'Following', year: '1998', watched: false },
];

const relatedMovies = [
  {
    title: 'Memento',
    year: '2000',
    rating: '8.4 / 10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu-E1PQWuO_aCobecwJ-fFlXGJbGt0PNCXlj0qdDgLIiCnpR8Um0PnxbflSedNMyJEkD8B_uBSxZaW4zZFq5dZ3XA3_NLUehEcQwYoRRIs29bhW4a8c6loSE0aEL8nbwXN0xf7e1mggFB0kitfrt1Oh90jgbPAAOw6B5viJgFyuEBYauIHfvVxfn8AFvhhd-BQXQHVd7CJQAgR1fs85QPRe5vA63LPStptTpvQBchdZdYOsWD2QZJN',
  },
  {
    title: 'Shutter Island',
    year: '2010',
    rating: '8.2 / 10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfJKcO2Pu7LuGKN3JK4nAYPGQ-YrjkoOHQy3vnktB90T7WywttMVMtxIWLJ-ape-8TCva6-fuI8Iid4yR1r7aQ48gUql-HdKKMQpLvxJq18gV-m5EJs3v3XUo-hqeyGp1PWIYlFSgH04tO9SuA0Snzl7ogHxlogAgJJrLb2995nAfTMRVCNCeF39t_KF9SseLfU1JAnCpyeoB3m2-d4bmCevTMAzIIHvESFLQLv7Qyov7JbLY5RLBz',
  },
  {
    title: 'Tenet',
    year: '2020',
    rating: '7.4 / 10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2r6wTvdWkmri8ybtAC5rx-WuXPSPLMgEtIW-kWHDcf_8bVbzB4tOqBP18NaYXrurLsjOq4YG66k-fuBR2ahFreHLOa38gfFh0v2U9nFYqk-SD4JBpslf0OYLpqoZq7tAVwfOpejydJhQDnpgiaB4od4ck5FU1zo06UVHVu823pBIsAlZVQ0RvwM3aNhV-hO1k0U4GqrT9kWdVVUOa8e-juWgAxVJBOlc1p41pYDRYdCc08BYzUpIt',
  },
  {
    title: 'The Prestige',
    year: '2006',
    rating: '8.5 / 10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8xMtxT6V38CRVQtwSECsgZ-TNYFdTyPl_NEP65Z_MoyzDbVQgi_s8DipZDaKA4UZbfIieTHWWILA39BR25A922KC7y1mvyu5mF75bdJ-1PM2DKLx2L91gQzWDwlIbQ1Iw1-hIRPFDOXC-nGx2b5d1kIvk5--oSEUo3s0zYSKzntx1DJyTm15qrtOZNrhpDurkZFpmMGxICnvvd0h0nTDjFs-9rxECmJATRPPV47-C0zpmHjI2OdC2',
  },
  {
    title: 'Blade Runner 2049',
    year: '2017',
    rating: '8.0 / 10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQIMrw11SA0MhCJ3pTwvQiZPCADdmjbRd8Lj48PZfK1KO14Sib21xI1CJUxPMZ4DsDPq0k7gxH1jRZTqmOIRtr1Vkl-ZlEysxsx6BU0QB2zb7yhbtGWpoTOTEQzQYOWSSByMTZaW52F1sf3Q_X_pBfP0_YSJZ9-VeTFSARhcrpgS-QhedMC85yhjIixd6eExd7A5mxsIr-nMvJZ0AJCMvn8aebgP5-m8lZaBUkMhOJ_GO-KU9_N69v',
  },
  {
    title: 'Paprika',
    year: '2006',
    rating: '7.7 / 10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfA_QZVHIk-wxg1ghhFZrw2qx_CBo7uau-1jpPn87S43zdkLGoDhOIZ1flqIzNYZLboi5iq_EAv6hxMxFGfXzecOJA2wS1PcrTDKDeX6Uy-9mGcgEUSamfGbLLBIN3RDE1dX072VtKq1jOh6xlCjRl-hZ4t5kncqy5cWPW-aeVsoC1u6DJPp_A61DOiqFfv7BVnMUamlz1yq5DaCWDYPCcqA7Nl2E5a7JtJOXQ4S6jOqvVQDTE6Sxy',
  },
];

const reviews = [
  {
    name: 'FilmFan_99',
    rating: '\u2605\u2605\u2605\u2605\u2605',
    text: '"A masterpiece of structural storytelling. The hallway fight scene is still unmatched."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_y_8nANgCTYogc2vrp30xbDq-tGoo0Mkqj32qxoLC-oXplSWqGFEQhxzazN2j-MPxbCDe5xrKk30IcnwAec5ubA6G8WyvK-HcY2J1LbCHdCa2PLBF6dJOThBDXeHAEX72Kel_s-y7jMa89aQxDpNWaBAhUomukD67RTfPowdcbEUNYXW7_UfqEwjOAG0VMz1TFn2Ryd3cmgN31lo1hrfeBQgZ_lavQIRoMGkt-63z9wGq6ft1NIhG',
  },
  {
    name: 'TheDailyCritic',
    rating: '\u2605\u2605\u2605\u2605\u2606',
    text: '"Nolan\'s most ambitious puzzle. Technically perfect, emotionally distant but brilliant."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdSnn2wx__IxOD0unWiV37tkBz9KX1h-iOed1xhlKrChgFGpNRFd9G6RSBlQS--C-Iod4OY_XLb92qyPZrbiuGFlLmYn9h1xHRtJlMhJz14LbFBTDCLWG1NYOpC9DVpTxicbmZG5dhdJ5xOwhdAuALK-2xnV6CLtLmRpKFcDNKvypIZsBgE0CyXH9N2kjEqgDC8GOx8Byj-kBHHRJCGAgsrVcDwTtjjap9mq2EwfnJHNLvXEz2KSSp',
  },
];

function RatingChart() {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const chart = document.querySelector('.rating-drift-line');
      if (chart) {
        const rect = chart.getBoundingClientRect();
        if (
          e.clientX > rect.left &&
          e.clientX < rect.right &&
          e.clientY > rect.top &&
          e.clientY < rect.bottom
        ) {
          chart.style.filter = 'drop-shadow(0 0 8px rgba(66, 252, 108, 0.8))';
        } else {
          chart.style.filter = 'none';
        }
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="glass-panel p-8 rounded-xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[24px] font-bold">Rating Drift</h3>
        <div className="flex items-center gap-4 text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-secondary rounded-full" /> Critic Consensus
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary-container rounded-full" /> Audience Drift
          </span>
        </div>
      </div>
      <div className="h-64 w-full flex items-end gap-1 relative pt-4">
        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
          <path
            className="rating-drift-line"
            d="M0 180 Q 200 120, 400 150 T 800 100 T 1200 60"
            fill="none"
            stroke="#42fc6c"
            strokeWidth="3"
          />
          <path
            d="M0 200 Q 200 180, 400 210 T 800 160 T 1200 140"
            fill="none"
            stroke="#ff8000"
            strokeDasharray="8 8"
            strokeWidth="3"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
          <div className="w-full h-px bg-white" />
        </div>
      </div>
      <div className="flex justify-between mt-4 text-[12px] tracking-[0.05em] font-medium text-on-surface-variant px-1">
        <span>RELEASE</span>
        <span>WEEK 2</span>
        <span>MONTH 1</span>
        <span>MONTH 6</span>
        <span>TODAY</span>
      </div>
    </div>
  );
}

export default function FilmDetail() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Movies" />

      <main className="mt-20">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
            <div
              className="w-full h-full bg-cover bg-center scale-105 blur-[2px]"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBIqwiMvnxKlRnHkievDMXdg6lHUtYYPPqUcnnC3IEbSMeFS8-3bp-_qWkV5Q5RwF7vUpQECe3QFwVmXxq0Opivt2QlFOVGz4QgdJt-XLDshLyB115fEpBIqGCl4PLb2CK4U3MkU1VpBVDrxfjLW01FWOp9uxx43xXH1r6iUebIUHwZMgegyefZ_2BAMKwVEs-aKBRIM1UqsgHmyCam-FjM859Fl8YBnwlbvFccCBX5Didp6Dj6SUP')",
              }}
            />
          </div>
          <div className="relative z-20 max-w-[1280px] mx-auto px-4 md:px-12 h-full flex items-end pb-8 md:pb-16">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-end w-full">
              {/* Poster */}
              <div className="shrink-0 w-40 md:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKWJcS5r1fKeYTUq0lTMqPNYv8lUaQxPxO9AGzwIfA6d_cmREDWC-qfhvfy23nBqrKqfmdaTVQDg14n8lT7FTOaKFeIqp9HYyp7xZoxnZZZpIcLb4TuD5ffA7CXbd7Xee3CeCpm8T605hdfZGK-m43cSlBhyCy8wcxd3NwA_1wJJYNN5_5Z0SjlfGXVRyJecCdyUoFQaDUr_9L6l1fjrXNiMUF1RUw1epAEVI-cNNssQ62-saPsr7U"
                  alt="Inception poster"
                />
              </div>
              {/* Movie Title & Basic Info */}
              <div className="flex-grow">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-container/20 text-primary-container text-[12px] tracking-[0.05em] font-medium rounded-full border border-primary-container/30 uppercase">
                    Sci-Fi
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-on-surface text-[12px] tracking-[0.05em] font-medium rounded-full border border-white/10">
                    148 MIN
                  </span>
                </div>
                <h1 className="text-[28px] md:text-[48px] text-on-surface mb-2 tracking-tight font-black">Inception</h1>
                <p className="text-[14px] md:text-[18px] text-on-surface-variant max-w-2xl mb-6 md:mb-8 leading-relaxed">
                  A thief who steals corporate secrets through the use of dream-sharing technology is
                  given the inverse task of planting an idea into the mind of a C.E.O.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 md:px-8 py-2.5 md:py-3 bg-primary-container text-on-primary-container text-[16px] md:text-[24px] rounded-lg flex items-center gap-2 hover:scale-105 transition-transform bloom-effect font-bold">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                    Watch Trailer
                  </button>
                  <button className="px-6 md:px-8 py-2.5 md:py-3 border border-white/20 text-on-surface text-[16px] md:text-[24px] rounded-lg hover:bg-white/5 transition-colors font-bold">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats & Content Grid */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-16">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-8 space-y-12">
              {/* Bento Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'DIRECTOR', value: 'Christopher Nolan' },
                  { label: 'BUDGET', value: '$160M' },
                  { label: 'REVENUE', value: '$836M' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-panel p-6 rounded-xl">
                    <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant block mb-2">
                      {stat.label}
                    </span>
                    <span className="text-[24px] font-bold text-on-surface">{stat.value}</span>
                  </div>
                ))}
                <div className="glass-panel p-6 rounded-xl border-primary-container/20">
                  <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant block mb-2">
                    GLOBAL RATING
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[32px] font-black text-secondary leading-none">8.8</span>
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Drift Chart */}
              <RatingChart />

              {/* Side-by-Side: Private & Public */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Private Annotations */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[24px] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-container">lock</span>
                      My Notes
                    </h3>
                    <button className="text-[12px] tracking-[0.05em] font-medium text-primary-container hover:underline">
                      NEW DRAFT
                    </button>
                  </div>
                  <div className="glass-panel p-6 rounded-xl border-dashed border-white/20 min-h-[300px] flex flex-col">
                    <textarea
                      className="bg-transparent border-none focus:ring-0 w-full h-full resize-none text-on-surface placeholder:text-white/20"
                      placeholder="Add a private note about the dream architecture..."
                    />
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      Last edited 2 hours ago
                    </div>
                  </div>
                </div>

                {/* Public Reviews */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[24px] font-bold">Community</h3>
                    <a className="text-[12px] tracking-[0.05em] font-medium text-primary-container hover:underline" href="#">
                      VIEW ALL
                    </a>
                  </div>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.name} className="glass-panel p-6 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-white/10 overflow-hidden">
                            <img className="w-full h-full object-cover" src={review.avatar} alt="" />
                          </div>
                          <div>
                            <span className="text-on-surface font-bold block leading-none">
                              {review.name}
                            </span>
                            <span className="text-[12px] tracking-[0.05em] font-medium text-secondary">
                              {review.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-[16px] text-on-surface-variant italic">{review.text}</p>
                      </div>
                    ))}
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
                  {streamers.map((s) => (
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
                        <span className={`text-[12px] tracking-[0.05em] font-medium ${s.priceColor || 'text-on-surface-variant'}`}>
                          {s.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filmography Completion */}
              <div className="glass-panel p-6 rounded-xl space-y-6 overflow-hidden relative">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container/10 rounded-full blur-3xl" />
                <div className="flex justify-between items-center">
                  <h3 className="text-[24px] font-bold">Nolan Completion</h3>
                  <span className="text-[32px] font-black text-primary-container leading-none">64%</span>
                </div>
                <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container w-[64%] shadow-[0_0_10px_#ff8000]" />
                </div>
                <div className="space-y-4">
                  {filmography.map((film) => (
                    <div
                      key={film.title}
                      className={`flex items-center gap-3 ${
                        film.current ? 'opacity-100 bg-white/5 p-2 -mx-2 rounded-lg border border-primary-container/20' : film.watched ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      {film.watched ? (
                        <span
                          className="material-symbols-outlined text-secondary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-on-surface-variant">
                          radio_button_unchecked
                        </span>
                      )}
                      <span className={`text-[16px] text-on-surface flex-grow ${film.current ? 'font-bold' : ''}`}>
                        {film.title}
                      </span>
                      <span className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                        {film.year}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-on-surface font-bold hover:bg-white/10 transition-colors">
                  Explore Full Catalog
                </button>
              </div>

              {/* AD/Promo Segment */}
              <div className="rounded-xl aspect-[3/4] overflow-hidden relative border border-white/10 group cursor-pointer">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwY6T5fodVMc83arLYMhluszWSnOPpdmyLfbd-G5fR6ewG4f93jn-zPCxYCILvqa7_9VikQ7dEwGBKJSSHLIBt1cOvgXG95pNre-jFYpNmYOl4ltOPcvaEN7cE_1tXqOU4TqlHeNV3ZruhaEr9_QDFJU2-ayZvBpKoi-m0qN5Du6qK3to4J6LooqAiiME6UvfwwgQRbwNHcE8yV85vMc4rjUOZEjfq_DMldgyWASvwzvoa7gG6eRi9"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[12px] tracking-[0.05em] font-medium text-primary-container block mb-1">
                    CINEVERSE EXCLUSIVE
                  </span>
                  <h4 className="text-[24px] font-bold text-white mb-2">Hans Zimmer Masterpiece</h4>
                  <p className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                    Limited 180g Vinyl Reprint
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-12 py-6 md:py-12 border-t border-white/5">
          <h2 className="text-[32px] font-black mb-8">Related Masterpieces</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {relatedMovies.map((movie) => (
              <div key={movie.title} className="space-y-3 group cursor-pointer">
                <div className="aspect-[2/3] rounded-xl overflow-hidden border border-white/10 relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={movie.image}
                    alt={movie.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-secondary font-bold">{movie.rating}</span>
                  </div>
                </div>
                <p className="text-[16px] text-on-surface font-bold leading-tight">{movie.title}</p>
                <p className="text-[12px] tracking-[0.05em] font-medium text-on-surface-variant">
                  {movie.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
