import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import { searchMovies, posterUrl, tvPosterUrl, searchTVShows } from '../services/tmdb';
import Footer from '../components/Footer';

const movies = [
  {
    title: 'Neon Shadows',
    year: '2024',
    runtime: '1h 52m',
    match: 98,
    matchType: 'high',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHUU2I2t0kW-x5PpMZHRyUY86LZkKrnTRMBJezSHE2bzVMZMDP99as6amqHdKWxm4DhVSrY3SLuGv883bhpDYldeAaKqefIGHtv8NU2oVysBeI2RmzVwC9jZlFI-CSiiRs-wo48zkh6yGaT5DPrbTYg7AkV6hJmlGTQ9bQtEZNk6bCqigGRgdIhhKym1IvFmarOoqkN8MHq0IRQzrOkO-76HkApYASAI3SJQwKh4iIxiBKG1vNodWH',
    streamers: [
      { name: 'NETFLIX', color: 'bg-red-600' },
      { name: 'MAX', color: 'bg-blue-700' },
    ],
    extra: '+2 more',
  },
  {
    title: 'Prism Protocol',
    year: '2023',
    runtime: '2h 15m',
    match: 85,
    matchType: 'low',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyml3d3ItE-QRdtYC37autViYs7i8Lxsry4ccKXH_UBxnV0g2Gj51sWa50EzgCt4MXiot06jXx_ZIm888APQl9F9Y3wOmWL_bOv0sHeIK-k6xuWjRSZOyw1AhTputhEQXS5pFfYCL7N7Ycr_9l1GmfhvQ3EBdyWBYq060tF5-hVXiFWIWXh3nPuLSsyri_Ed8Fpi4aD5-YYdGwy9AR1cUIGwjy5PFRTlolFx_oKOARbS5SJJKpPn0E',
    streamers: [
      { name: 'PRIME', color: 'bg-blue-500' },
      { name: 'MUBI', color: 'bg-yellow-600' },
    ],
  },
  {
    title: 'The Silent Root',
    year: '2024',
    runtime: '1h 48m',
    match: 92,
    matchType: 'high',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYPmLjblzHzhENn-pin6rm57PV-nzaPUI4poY9RVR4gc9dPRXEu2htI-pzjK0ycYDNuVaSgp42CxJ6zVxConcxv9kTwLpPb9EzTI3mN1oxYldqjOdxm3esMRMl18RhrseUQ_FdAp2SYOHYJx-xnVDMOEw7x3VU2JEcLpgWdpfTUJEPtJ4Yi8uYnUtr-d0WH4-OF4mCV2TMIWirMtQbiQLtLeSpiaZKF9oWHOPctaJsH-LROisGfdgL',
    streamers: [{ name: 'HULU', color: 'bg-green-600' }],
  },
  {
    title: 'Overdrive II',
    year: '2024',
    runtime: '2h 05m',
    match: 79,
    matchType: 'low',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPaWx9vlQhYWVXKYBIo33UbdJHjXzQaz-HSFkIUhqg7POc3g6Qo9GP6C7t5DfWINHDEIodG6nh11hpOGKfasAsq9HwcNuqMxhUnZLVieVtxFsoas6Bk6h_SURsXqlWW5ckCSLAvRQ4t4tfbfsOwvheZa59L5_ZM4-wzK-Npclub2G2vSh7FYtHtCe3wWHAcMu6pXWtfshtex-eArpjZkeh9iG0-cJJ9-mze8ataZ1AWuQw22Vfa2AH',
    streamers: [
      { name: 'MAX', color: 'bg-blue-800' },
      { name: 'DSNY+', color: 'bg-red-700' },
    ],
  },
  {
    title: 'Blue Note Echoes',
    year: '2022',
    runtime: '1h 35m',
    match: 95,
    matchType: 'high',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz7eyyyQKuha2LCb3nU5VP4k3lDRsCvkN5ehxOTMsXdnUL1y1J4vuYW-L8uzgOjigH7o8oZZXyyIGBdAgaDUlgIdvDQ-rrixp5eagybwmoWgpw-7LRydSTILY-egF2zdnwkZJr109di5-F7fY3XPJ_UuOCqOH0ztTYELcU_d5hlf7q3EOT2qqclwMBrlRJyftrMWfXGpPuE0rBWphi-LsjZHiBskpKN7IzrngqJIeOvXLRc_ZqaX9u',
    streamers: [
      { name: 'APL+', color: 'bg-gray-600' },
      { name: 'MUBI', color: 'bg-yellow-600' },
    ],
  },
];

const marathons = [
  {
    title: 'Noir Nightcap',
    icon: 'nightlight',
    count: 4,
    duration: '7h 12m',
    iconBg: 'bg-primary-container/20',
    iconColor: 'text-primary-container',
    hoverBg: 'group-hover:bg-primary-container',
    hoverText: 'group-hover:text-on-primary-container',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBS9NX3mGyCG_vbm35jCUso1Jz6GPzNoBunhrXb2yp2qh3NfXlkuBWTHqGuuCc06T2SHbyZhIJ0z3j0jQUmZccNTzbphUkd-OlOeeynAxR8Ir_mbbABQL4Id1ybpkFVAre024hp1ifyn7aO5Ygqo9ApE7FWDPZTGbMNZX-lkr9FznwLZEd1vQ3FBhzgDxQr7fmiL6PZRfoeHv5g7pwRyClBPWJvqS5M746DE9POfCyrGQZ5BYyYP7JN',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpHEPYbI-ivXcWy7WAOJMfhGVc6iEmH8h7p80DXp0YqqT2KWNBGZIgJBK_tE4gr9lOlAEGWRIb8shNuVE4vFr_iq9kFKzdeBFJAnBTaVFlQA5sGTjS1Y-O_uhCqM3i-mCT2ZvRyS_tixBc9QrjyJQ2rtMILS7BTi7wpWgNM9QJqzM0-Nd9aubFW8u47s9hgoenrCSxevOQatUfriaXHehhXLsaMygVdWN0JFi5gDvyksYVlB1k6FtW',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDC3QB_mZsWrc8JDvSKQBaG_Jylknme2sdxwxJJj9PAcxqUc4CGodjW6Uazc1FK4Ba3ny1iDgrpHM-7daPYoZ2fnQfdJeFmQruljAWdHavknjMVKKoUxxo01BQtR_jGYd7Z47Xibg809gOnRdi4icgGemeA8Jpzw7zq1J1fpm7S4zD0fl3pUb00GMIuPRecXiBM0boYltLGxxQXePNXJ1Ne4J3U8iKD5AO6xlp1XLkhzNwPXLalsV-9',
    ],
  },
  {
    title: 'Techno-Optimism',
    icon: 'rocket_launch',
    count: 3,
    duration: '6h 45m',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary',
    hoverBg: 'group-hover:bg-secondary',
    hoverText: 'group-hover:text-on-secondary',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAI5m7hD0pV-1t5keFHs4gGYxjrHYF5s9VUMVt3_PqY4d5j_Su-rj1VAmDb043dr_6e33h2htv7Tzds_LvEYWeCYT2INbQexgDyM02b5In-v4NeH5YxHaaPjTgIB7hu3FMX2btdhxj_O3U9hHLSbHZ9V4AiOWDPcCQEH5PJUarWQe4bzsn8bLJeMy-ZW1Q52e-e5VIHOLCZJPmyoNELHpQ_pG9cwK8HW6wMJlfkEUy3wc900hC-XlAP',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDoixJB17GX-4Z5VS1J-gfqXpX2V3WDGqY84Z8FHAESvpAwO3WZzA2F23RyaevkhOwEK5n6vgPqdAfrAL7GQmwABNPnvSX6zjZ26saiD0ETVewunax0X5AyN7Yl2Gy4ZYOETm-vnOjSS7WDgtk2H-3BuoqvmVoMgmcdkSXd3LR1WjhQ9Y4xV06dBkXWN6jl-4hp6QjBmW9vlNfebJFzJnwebwJWFuDSRAej8rQQdaXKdgrSahQZp_63',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCPbz8dDomLU58HDnaPpSicPAJUMmrQ1HES6EhCTM_viI_l-4HidaP_najLfj2K5g47l3LZuQVshNkesbfI5p9hdwSKehOJZ7n_CgEAzNEkjRgoV3IY2cfVYoXzah4N5fWKm9atbJt7T40prjaLixio7TXGjn2EPecfTjzrSJuIvQXDAhjp0ZjQ0irVUFSm9drO5U2CHH8o7-tocFMBvFq3FWkg94xi68Hz7a6MG86ZlF-zaw62t2rE',
    ],
  },
  {
    title: 'Mind Benders',
    icon: 'psychology',
    count: 5,
    duration: '11h 20m',
    iconBg: 'bg-tertiary/20',
    iconColor: 'text-tertiary',
    hoverBg: 'group-hover:bg-tertiary',
    hoverText: 'group-hover:text-on-tertiary',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCeNhb8NbA_ikCe9mwA-58ZaXmkaBe6buafBheDoJPCl2CxhT1Imc9UamTckyB5qHsZAkWQVkv9UyDrJcjr-bx-4v5a4klaA34gdHkLlbHgr_hHpRM9CBkkCrQKk27kznJhWudHqakxFG7jGM3BzqFMTiGqUlmp8mC6AD47QtYlNTNXWAGhbRyzvq0fSAQZQXZLsrfrIQSIUH9lSA9KQRR96jnXUvXmuD_8VvFFRcJ-H87lacIQTevy',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvdmm9D2stPQTFwkwbZfLhUBDkjs3SGFaJInDEQ-MmLnc6sn4o-LkXcPKwkcoq-RW8d3yLyJKyoHvKrJzKk9F7JeGim9f7fSQBivCB6jfiMYIlvXzQDK3HLLgAeQ99dutgMNhXxpRCId2qdtDYywO3foiAKg3RmRS-MNLEj2hNsVCb7_YtYfR2BywAEVPaRhMFZjHD0aA4bMSf_376y2x4Th7UolLy9O5EpX8D1_wuqcwbr69Q-GuK',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDMlJjggufm6PJnKrTAwIf5IB6Ft_ffolgNLyVWVHiaIOLmLjFqmKSaPKb1Etw_4cS3bKETkIwQI83wNTUGvCOY7dhiLMaVIPw_bXgwLgmNt8ga7k5gwqt0ziI9-zhJvbK7gTcvnxtx3zPwrEW7DAvEdXZOQNriuHbuFjibfFAplWZWC7VVT4kH-YXMeR6jsyW1pa5PIchtvbVfT6ficK9T97KttSJdKrsf_DAHZjCaSGVwXDDVIJj3',
    ],
  },
];

function MovieCard({ movie, onRemove, onDetails }) {
  const isShow = movie.type === 'show';
  const poster = movie.image || (isShow ? tvPosterUrl(movie.poster_path) : posterUrl(movie.poster_path));
  const year = movie.year || (isShow
    ? (movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : '')
    : (movie.release_date ? new Date(movie.release_date).getFullYear() : ''));
  const runtime = movie.runtime || '';
  const displayName = isShow ? movie.name : movie.title;

  return (
    <div className="group relative glass-card rounded-xl overflow-hidden flex flex-col">
      <div className="aspect-[2/3] relative overflow-hidden">
        {poster ? (
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={poster}
            alt={movie.title}
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant">{isShow ? 'tv' : 'movie'}</span>
          </div>
        )}
        <div className="absolute inset-0 poster-gradient opacity-80" />
        {movie.matchType && (
          <div className="absolute top-3 right-3">
            <span
              className={`text-[10px] font-bold px-2 py-1 rounded border backdrop-blur-sm ${
                movie.matchType === 'high'
                  ? 'bg-secondary/20 text-secondary border-secondary/30'
                  : 'bg-primary/20 text-primary border-primary/30'
              }`}
            >
              {movie.match}% MATCH
            </span>
          </div>
        )}
        {movie.added && (
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-bold px-2 py-1 rounded border backdrop-blur-sm bg-tertiary/20 text-tertiary border-tertiary/30">
              ADDED
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 backdrop-blur-sm">
          <button className="w-full bg-primary-container text-on-primary-container py-2.5 md:py-3 rounded-lg font-bold flex items-center justify-center gap-2 mb-2 md:mb-3 active:scale-95 transition-transform text-[13px] md:text-[14px]">
            <span className="material-symbols-outlined text-[18px] md:text-[20px]">play_arrow</span> Watch Now
          </button>
          <div className="flex justify-between gap-2">
            <button
              onClick={() => onDetails?.({ ...movie, type: movie.type || 'movie' })}
              className="flex-1 border border-white/20 py-1.5 md:py-2 rounded-lg text-[11px] md:text-[12px] font-bold hover:bg-white/10"
            >
              DETAILS
            </button>
            <button
              onClick={() => onRemove(movie.id ?? movie.title)}
              className="w-10 md:w-12 border border-red-500/40 py-1.5 md:py-2 rounded-lg flex items-center justify-center hover:bg-red-500/20 text-red-400"
            >
              <span className="material-symbols-outlined text-[16px] md:text-[18px]">delete</span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-3 md:p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-[14px] md:text-[18px] text-white line-clamp-1 font-bold">{displayName}</h3>
          <div className="flex items-center gap-1.5 md:gap-2 text-on-surface-variant text-[10px] md:text-[12px] tracking-[0.05em] font-medium mt-0.5 md:mt-1">
            {year && <span>{year}</span>}
            {year && runtime && <span className="w-1 h-1 bg-white/20 rounded-full" />}
            {runtime && <span>{runtime}</span>}
          </div>
        </div>
        {movie.streamers && (
          <div className="mt-4 flex items-center gap-2">
            {movie.streamers.map((s) => (
              <div
                key={s.name}
                className={`w-6 h-6 rounded ${s.color} flex items-center justify-center text-[8px] font-bold`}
              >
                {s.name}
              </div>
            ))}
            {movie.extra && (
              <span className="text-[10px] text-on-surface-variant font-medium">{movie.extra}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MarathonCard({ marathon }) {
  return (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden group cursor-pointer vibe-glow">
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-full ${marathon.iconBg} flex items-center justify-center ${marathon.iconColor}`}
        >
          <span className="material-symbols-outlined">{marathon.icon}</span>
        </div>
        <div>
          <h4 className="text-[18px] text-white font-bold">{marathon.title}</h4>
          <p className="text-on-surface-variant text-[14px]">
            {marathon.count} films &bull; {marathon.duration} total
          </p>
        </div>
      </div>
      <div className="flex -space-x-4 mb-6">
        {marathon.images.map((img, i) => (
          <div
            key={i}
            className={`w-20 h-28 rounded-lg border-2 border-surface overflow-hidden transform transition-transform ${
              i === 0
                ? 'group-hover:-translate-y-2'
                : i === 1
                ? 'translate-y-2 group-hover:-translate-y-1 delay-75'
                : 'translate-y-4 group-hover:translate-y-0 delay-150'
            }`}
          >
            <img className="w-full h-full object-cover" src={img} alt="" />
          </div>
        ))}
      </div>
      <button
        className={`w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[14px] font-bold ${marathon.hoverBg} ${marathon.hoverText} transition-all`}
      >
        Start Marathon
      </button>
    </div>
  );
}

function SearchModal({ open, onClose, onAdd, addedIds }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('movies');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const q = query.trim();
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        if (activeTab === 'movies') {
          const data = await searchMovies(q);
          setResults(data.results.map((m) => ({ ...m, type: 'movie' })));
        } else {
          const data = await searchTVShows(q);
          setResults(data.results.map((s) => ({ ...s, type: 'show' })));
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, activeTab]);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    setActiveTab('movies');
    onClose();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResults([]);
    setQuery('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full sm:max-w-2xl sm:mx-4 bg-surface-container rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="text-[24px] font-bold text-on-surface">Add to Watchlist</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-4">
          <button
            onClick={() => handleTabChange('movies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-bold transition-all ${
              activeTab === 'movies'
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-white/5 text-on-surface-variant hover:bg-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">movie</span>
            Movies
          </button>
          <button
            onClick={() => handleTabChange('shows')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-bold transition-all ${
              activeTab === 'shows'
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-white/5 text-on-surface-variant hover:bg-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">tv</span>
            TV Shows
          </button>
        </div>

        <div className="px-6 pt-4 pb-2">
          <div className="relative">
            <input
              className="w-full bg-surface-container-high border-white/10 border p-4 pl-14 rounded-xl text-[16px] focus:ring-0 focus:outline-none placeholder:text-on-surface-variant/50"
              placeholder={activeTab === 'movies' ? 'Search movies by title...' : 'Search TV shows by title...'}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[22px]">
              search
            </span>
            {loading && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary-container text-[22px] animate-spin">
                progress_activity
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
          {loading && results.length === 0 && (
            <div className="space-y-4 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-16 h-24 rounded-lg bg-surface-container-high shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-surface-container-high rounded w-3/4" />
                    <div className="h-3 bg-surface-container-high rounded w-1/2" />
                    <div className="h-3 bg-surface-container-high rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/50 mb-3 block">
                {activeTab === 'movies' ? 'movie_filter' : 'tv'}
              </span>
              <p className="text-on-surface-variant text-[16px]">
                No {activeTab === 'movies' ? 'movies' : 'shows'} found. Try a different title.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2 pt-4">
              {results.map((item) => {
                const isShow = item.type === 'show';
                const displayName = isShow ? item.name : item.title;
                const date = isShow ? item.first_air_date : item.release_date;
                const imgSrc = isShow ? tvPosterUrl(item.poster_path) : posterUrl(item.poster_path);
                const icon = isShow ? 'tv' : 'movie';

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-xl hover:bg-surface-container-high transition-colors group cursor-pointer"
                  >
                    <div className="w-16 h-24 rounded-lg overflow-hidden bg-surface-container-high shrink-0 border border-white/10">
                      {item.poster_path ? (
                        <img
                          className="w-full h-full object-cover"
                          src={imgSrc}
                          alt={displayName}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-on-surface font-bold text-[14px] line-clamp-1 group-hover:text-primary-container transition-colors">
                          {displayName}
                        </h4>
                        <span className="text-[10px] tracking-[0.05em] font-medium text-on-surface-variant bg-white/10 px-1.5 py-0.5 rounded shrink-0">
                          {isShow ? 'SHOW' : 'MOVIE'}
                        </span>
                      </div>
                      <p className="text-on-surface-variant text-[12px] mt-0.5">
                        {date ? new Date(date).getFullYear() : 'N/A'}
                      </p>
                      {item.overview && (
                        <p className="text-on-surface-variant text-[11px] mt-1 line-clamp-2 leading-relaxed">
                          {item.overview}
                        </p>
                      )}
                    </div>
                    {addedIds?.has(item.id) ? (
                      <span className="self-center shrink-0 w-9 h-9 rounded-full border border-secondary/40 bg-secondary/10 text-secondary flex items-center justify-center opacity-100">
                        <span className="material-symbols-outlined text-[20px]">check</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => onAdd?.(item)}
                        className="self-center shrink-0 w-9 h-9 rounded-full border border-primary-container/40 text-primary-container hover:bg-primary-container hover:text-on-primary-container cursor-pointer flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                      >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {!query.trim() && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-3 block">
                {activeTab === 'movies' ? 'theaters' : 'tv'}
              </span>
              <p className="text-on-surface-variant text-[14px]">
                Search for {activeTab === 'movies' ? 'movies' : 'TV shows'} to add to your watchlist
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Watchlist() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [addedMovies, setAddedMovies] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cineVerse_watchlist') || '[]');
    } catch {
      return [];
    }
  });
  const [addedShows, setAddedShows] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cineVerse_show_watchlist') || '[]');
    } catch {
      return [];
    }
  });
  const [removedIds, setRemovedIds] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('cineVerse_watchlist_removed') || '[]'));
    } catch {
      return new Set();
    }
  });

  const addedIds = new Set([...addedMovies.map((m) => m.id), ...addedShows.map((s) => s.id)]);

  const handleAddMovie = (item) => {
    if (addedIds.has(item.id)) return;
    const isShow = item.type === 'show';

    if (isShow) {
      const entry = {
        id: item.id,
        name: item.name,
        poster_path: item.poster_path,
        first_air_date: item.first_air_date,
        added: true,
        type: 'show',
      };
      const updated = [entry, ...addedShows];
      setAddedShows(updated);
      localStorage.setItem('cineVerse_show_watchlist', JSON.stringify(updated));
    } else {
      const entry = {
        id: item.id,
        title: item.title,
        poster_path: item.poster_path,
        release_date: item.release_date,
        added: true,
        type: 'movie',
      };
      const updated = [entry, ...addedMovies];
      setAddedMovies(updated);
      localStorage.setItem('cineVerse_watchlist', JSON.stringify(updated));
    }
  };

  const handleRemoveMovie = (id) => {
    if (addedMovies.some((m) => m.id === id)) {
      const updated = addedMovies.filter((m) => m.id !== id);
      setAddedMovies(updated);
      localStorage.setItem('cineVerse_watchlist', JSON.stringify(updated));
    } else if (addedShows.some((s) => s.id === id)) {
      const updated = addedShows.filter((s) => s.id !== id);
      setAddedShows(updated);
      localStorage.setItem('cineVerse_show_watchlist', JSON.stringify(updated));
    } else {
      const updated = new Set(removedIds);
      updated.add(id);
      setRemovedIds(updated);
      localStorage.setItem('cineVerse_watchlist_removed', JSON.stringify([...updated]));
    }
  };

  const visibleStatic = movies.filter((m) => !removedIds.has(m.id ?? m.title));
  const totalFilms = visibleStatic.length + addedMovies.length + addedShows.length;

  const handleDetails = (item) => {
    if (item.type === 'show') {
      navigate(`/tv/${item.id}`);
    } else {
      navigate(`/movie/${item.id}`);
    }
  };
  return (
    <div className="min-h-screen bg-background relative">
      <TopNavBar activeLink="Watchlist" />
      <SideNavBar />

      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary-container/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary/5 blur-[180px] rounded-full" />
      </div>

      <main className="md:ml-64 pt-24 md:pt-28 pb-20 px-4 md:px-12 max-w-[1280px] mx-auto min-h-screen">
        {/* Hero Header */}
        <header className="mb-8 md:mb-12 relative">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-container/10 blur-[100px] pointer-events-none" />
          <h1 className="text-[28px] md:text-[48px] text-white mb-2 font-black tracking-tight">Your Watchlist</h1>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <span className="text-[10px] md:text-[12px] tracking-[0.05em] font-medium bg-primary-container/20 text-primary-container px-2 md:px-3 py-1 rounded-full border border-primary-container/30">
              {totalFilms} FILMS TO DISCOVER
            </span>
            <span className="text-[12px] md:text-[16px] text-on-surface-variant">Last updated 2 hours ago</span>
          </div>
        </header>

        {/* Filter & Sort Bar */}
        <section className="mb-6 md:mb-8 flex flex-wrap items-center gap-2 md:gap-4 p-3 md:p-4 glass-card rounded-xl">
          <div className="flex-grow flex flex-wrap gap-2 md:gap-3">
            {['Genre', 'Runtime', 'Where to Watch'].map((filter) => (
              <button
                key={filter}
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 border border-white/10 rounded-lg hover:border-primary-container transition-colors text-[11px] md:text-[12px] tracking-[0.05em] font-medium"
              >
                {filter}{' '}
                <span className="material-symbols-outlined text-[16px] md:text-[18px]">keyboard_arrow_down</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-on-surface-variant text-[11px] md:text-[12px] tracking-[0.05em] font-medium">
              Sort by
            </span>
            <button className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-surface-container-high rounded-lg text-primary-container text-[11px] md:text-[12px] tracking-[0.05em] font-medium border border-primary-container/20">
              Vibe Match{' '}
              <span className="material-symbols-outlined text-[16px] md:text-[18px]">bolt</span>
            </button>
          </div>
        </section>

        {/* Movie Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-6">
          {addedShows.map((show) => (
            <MovieCard key={`show-${show.id}`} movie={{ ...show, type: 'show' }} onRemove={handleRemoveMovie} onDetails={handleDetails} />
          ))}
          {addedMovies.map((movie) => (
            <MovieCard key={`added-${movie.id}`} movie={movie} onRemove={handleRemoveMovie} onDetails={handleDetails} />
          ))}
          {visibleStatic.map((movie) => (
            <MovieCard key={movie.title} movie={movie} onRemove={handleRemoveMovie} onDetails={handleDetails} />
          ))}
          <button
            onClick={() => setSearchOpen(true)}
            className="glass-card rounded-xl overflow-hidden flex flex-col cursor-pointer hover:border-primary-container/50 transition-all group"
          >
            <div className="aspect-[2/3] relative overflow-hidden border-2 border-dashed border-primary-container/50 flex items-center justify-center group-hover:border-primary-container group-hover:bg-primary-container/5 transition-all m-0">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-primary-container/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-container/10 transition-all">
                  <span className="material-symbols-outlined text-primary-container text-[32px]">add</span>
                </div>
                <span className="text-on-surface-variant text-[12px] tracking-[0.05em] font-medium group-hover:text-primary-container transition-colors">
                  Add to Watchlist
                </span>
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-[18px] text-primary-container/60 line-clamp-1 font-bold">Add New</h3>
                <div className="flex items-center gap-2 text-on-surface-variant text-[12px] tracking-[0.05em] font-medium mt-1">
                  <span>Tap to search</span>
                </div>
              </div>
            </div>
          </button>
        </section>

        {/* Vibe-based Marathons Footer */}
        <section className="mt-12 md:mt-24 border-t border-white/10 pt-8 md:pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-8 gap-3">
            <div>
              <h2 className="text-[22px] md:text-[32px] text-white mb-1 md:mb-2 font-black">Vibe-based Marathons</h2>
              <p className="text-on-surface-variant text-[13px] md:text-[16px] leading-[1.5] max-w-2xl">
                Don't know what to watch? We've curated these journeys from your watchlist based on
                your viewing habits and current cinematic mood.
              </p>
            </div>
            <button className="text-primary-container text-[11px] md:text-[12px] tracking-[0.05em] font-medium hover:underline flex items-center gap-2 md:mb-2">
              View all collections{' '}
              <span className="material-symbols-outlined text-[16px] md:text-[18px]">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marathons.map((m) => (
              <MarathonCard key={m.title} marathon={m} />
            ))}
          </div>
        </section>
      </main>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onAdd={handleAddMovie} addedIds={addedIds} />
      <Footer />
    </div>
  );
}
