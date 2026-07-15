import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import FloatingActionButton from '../components/FloatingActionButton';
import Footer from '../components/Footer';

const hashtags = ['#noir-cyberpunk', '#wes-anderson-symmetry', '#90s-heartbreak'];

const feedItems = [
  {
    type: 'review',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbvL5YMj9lvk_VY4suzhJXYAqzgfF9dkPzTwYEgKfpweuDaVCcC7STt9WoPPAiRvwhIWVYZa3pcpBFrjrT7wJXOMZN0_x-J-pmjs9WdC5z4qQ4tKqUyCimmEyfx0weh6Fv5ENVYJ75YJ3_gY-Fy-fM03s10saBc95wGSrw9rm-1n8bFgi7W2gkjKzXoMpV105nn6Ob3By_oATUdLE1utWZeR2c5Vzcc3Lw4vw2UsbpgHmuWIp_o_O0',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMjKUzxhgl-ADFPCkFXupRrwtBWG20Ry0wHvDCul5NoB8n-RrHcqt7M8PhJdlq8LtACKfRowDmKKWm26ChUPR0LU5gfY1PbrfexGwkZsP9bPeUSw8yAulkd_hUOzDUYw_GhpJy-yrIM4eFi9RDJ-0a1ESSiKobB0qKWBA3QfnsEMc7gXz8rGu9gUsc_JMU10CgyWYQsGzvmF-nlO1TEsTSP_1O41aF2nuvfNqs9xGGwgZBWxDcMY74',
    name: 'Sarah Chen',
    action: 'reviewed',
    title: 'Neon Horizon',
    stars: 4.5,
    text: "The cinematography here is peak genre-defying. I haven't seen lighting used so effectively to tell a story of isolation since the early works of Kar-Wai...",
    likes: 'Mark and 12 others',
  },
  {
    type: 'list',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoda5EmtDJVLHEajBE4BwRrXIjICMxFXgc5SJwEqGl3Z2d9TwnJxAjV0ZTYYKB7fAzmhRT50bqEn2-qTcyIRDjtsLLnUHgZ8Oi4vzibUg-XP05qcvZ8SxI7bQ2TMSD6wzNj3ECYIRVEQ3W9q3nkzv6QG2RCYLijihr5Kr0YisNViVzl1knpgqgYz8xavGDFgYeZ70cwCYrgj0XyDgFFKKda2tz_0TyYE3dzuO-zhKYRHCGB9UCU__j',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2i1wbiVSyidbjyIaIeMUTlB_TrcdWXYvbuRxgLlDEigwCfqQBKiYZUe2JU_APqBGxEphlkTp9LqZzZbzmAB8Lv3MyFS1HAdEWdfENgFvN2VGksz1psB7OK7qQdkIqbT-kg2F9V0oG-A4chARK3OG_9Q3wmNuYLnicIX4w9qvRMts8hQOQievnpsRjiVkixUfw3lkJOslZJnsR9KU54AytKd7ju5ExQmZgoGNoSD37nBJuuMZv0IwA',
    name: 'David Miller',
    action: 'posted a',
    title: 'New List',
    heading: "Essential 70s Psych-Horror",
    text: "Curating the best of the decade's mind-bending cinema. From Giallo masterpieces to underground American cult classics...",
    stats: '14 Films \u2022 89 Saves',
  },
];

const nowPlaying = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7jEg5FxuWjswtuMiaoyvQsaSfq8Jpryz-mSJyIPV4EIIVwBHmjnLu2TehumIEpxPy2PXmhmGC1gwosw9DirokT5OfSvMMJvTvsS3-Ce1v0zy7unQZZreTEgdgmUYcIxqZbtVKr1zz_UqHyRRKd5UDvNjhWeNos9Oo4GnNoMKYAORw_PbeZZiFevHxffIOYaXqGh2XWi5et9JQzvQjgkedn0rzYV9Gj3gTlTtaroqPWFnRDL5mcFZP',
    title: 'Shadow Waltz',
    time: '9:30 PM \u2022 AMC Metreon',
    friends: 'Alex & 2 others going',
    hasFriends: true,
    primaryAction: 'Book Now',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-DVOVvIA3V1RjDs-twYBROQe4cBerxH_3_mxdm2D2LPij-hOin9wLDpU5T42tSrbKDMowH5xg1ytIx6L8slA2PPuOiJiLdsK_Ay_EtmyoC23zgDS_mB5p29Brlb6m-3Xdl9uzpzpVLekCXUFafRQ66VpNcR6i-El2RgB9SlANhmjtGNAYs32eEkJEekIHkZRgSdTK_GUD2gwjJyHTDme6b8S7cDWpfbJO8aBrO-Vtm5Uyvk-4P0DJ',
    title: 'The Void Portal',
    time: '10:15 PM \u2022 Alamo Drafthouse',
    distance: '2.4 miles away',
    primaryAction: 'Showtimes',
    isSecondary: true,
  },
];

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: full }).map((_, i) => (
        <span
          key={`full-${i}`}
          className="material-symbols-outlined text-primary-container text-lg"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
      {half && (
        <span
          className="material-symbols-outlined text-primary-container text-lg"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star_half
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`empty-${i}`} className="material-symbols-outlined text-primary-container text-lg">
          star
        </span>
      ))}
    </div>
  );
}

export default function HomeFeed() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Movies" />
      <SideNavBar />

      <main className="xl:ml-64 pt-28 px-4 md:px-12 pb-20 max-w-[1400px]">
        {/* Vibe Search Header */}
        <section className="mb-12">
          <div className="max-w-3xl">
            <h1 className="text-[32px] md:text-[48px] mb-6 leading-tight font-black tracking-tight">
              What's the <span className="text-primary-container">vibe</span> tonight?
            </h1>
            <form onSubmit={handleSearch} className="relative search-glow transition-all duration-300 rounded-2xl">
              <input
                className="w-full bg-surface-container-high border-white/10 border p-4 md:p-6 pl-14 md:pl-16 rounded-2xl text-[16px] md:text-[18px] focus:ring-0 focus:outline-none placeholder:text-on-surface-variant/50"
                placeholder="Search movies by mood, color, or director's era..."
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-primary-container hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined text-3xl">search</span>
              </button>
            </form>
            <div className="flex flex-wrap gap-2 mt-4">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-surface-container-highest rounded-full text-[12px] tracking-[0.05em] font-medium cursor-pointer hover:bg-primary-container/20 transition-colors border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Friends' Activity Feed (Left) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">forum</span>
                Recent Activity
              </h2>
              <div className="flex gap-2">
                <button className="text-[12px] tracking-[0.05em] font-medium uppercase text-primary-container border-b border-primary-container">
                  All
                </button>
                <button className="text-[12px] tracking-[0.05em] font-medium uppercase text-on-surface-variant hover:text-on-surface transition-colors">
                  Friends
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feed Item 1 - Review */}
              {feedItems.map((item, idx) => (
                <div key={idx} className="glass-card rounded-2xl overflow-hidden group">
                  <div className="h-48 relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={item.image}
                      alt=""
                    />
                    <div className="absolute inset-0 cinema-gradient" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden bg-surface">
                        <img className="w-full h-full object-cover" src={item.avatar} alt="" />
                      </div>
                      <div>
                        <p className="text-on-surface font-bold text-[12px]">{item.name}</p>
                        <p className="text-on-surface-variant text-[10px]">
                          {item.action} <span className="text-on-surface">{item.title}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    {item.type === 'review' && (
                      <>
                        <StarRating rating={item.stars} />
                        <p className="text-on-surface-variant text-[16px] leading-[1.5] line-clamp-3">
                          {item.text}
                        </p>
                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full border border-background overflow-hidden bg-surface-container" />
                            <div className="w-6 h-6 rounded-full border border-background overflow-hidden bg-surface-container" />
                            <span className="pl-4 text-[10px] text-on-surface-variant">
                              Liked by {item.likes}
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary-container transition-colors">
                            favorite
                          </span>
                        </div>
                      </>
                    )}
                    {item.type === 'list' && (
                      <>
                        <h3 className="text-on-surface font-bold text-[18px] mb-2">
                          {item.heading}
                        </h3>
                        <p className="text-on-surface-variant text-[16px] leading-[1.5] line-clamp-3">
                          {item.text}
                        </p>
                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                          <div className="text-secondary text-[10px] tracking-tighter uppercase font-medium">
                            {item.stats}
                          </div>
                          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary-container transition-colors">
                            bookmark
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Feed Item 3 - Poll (Spans 2 columns) */}
              <div className="glass-card rounded-2xl overflow-hidden md:col-span-2 flex flex-col md:flex-row">
                <div className="md:w-1/3 h-64 md:h-auto relative">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm0_z2P6lBGlEfGgfq-PYqp9V0dy0ukbLn-WBDvFV1M2RQvYjdmo-wuluuBBgObXg_vpdGVcMvZcMZl-mTGCtxXKvkVPXT-CP9_mSDoKPcUjKaG8AQCr8AfgGumXaaszn8XirfFXZWXuyydmRalebR9Kgv_NfsGUad2yyvvxkMEBe-udMRz8-VZGuaizIoQkSDHV1alxEGpxyI9qZe9gI3WlYnvwoWwsOMS2Ary_bh3MNM_V4cIp1k"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container" />
                </div>
                <div className="p-8 md:w-2/3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-secondary-container text-on-secondary-container text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                      Trending Community Poll
                    </span>
                  </div>
                  <h3 className="text-[24px] md:text-[32px] font-black text-on-surface mb-4 leading-tight">
                    Best Cinematography of 2024?
                  </h3>
                  <div className="space-y-3">
                    <div className="relative w-full h-10 bg-surface-container-highest rounded-lg overflow-hidden cursor-pointer group">
                      <div className="absolute inset-0 bg-primary-container/30 w-[65%]" />
                      <div className="absolute inset-0 flex items-center justify-between px-4">
                        <span className="text-on-surface font-bold text-[12px] tracking-[0.05em]">
                          The Last Horizon
                        </span>
                        <span className="text-on-surface-variant text-[12px] tracking-[0.05em]">65%</span>
                      </div>
                    </div>
                    <div className="relative w-full h-10 bg-surface-container-highest rounded-lg overflow-hidden cursor-pointer">
                      <div className="absolute inset-0 bg-primary-container/10 w-[22%]" />
                      <div className="absolute inset-0 flex items-center justify-between px-4">
                        <span className="text-on-surface font-bold text-[12px] tracking-[0.05em]">
                          Glass Whispers
                        </span>
                        <span className="text-on-surface-variant text-[12px] tracking-[0.05em]">22%</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-on-surface-variant text-[12px] tracking-[0.05em]">
                    2.4k members voted
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Now Playing Widget */}
            <section className="glass-card rounded-2xl p-6 border-primary-container/20">
              <h2 className="text-[24px] font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">
                  confirmation_number
                </span>
                Now Playing
              </h2>
              <div className="space-y-6">
                {nowPlaying.map((movie, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-20 h-32 rounded-xl overflow-hidden shrink-0 shadow-lg border border-white/10">
                      <img
                        className="w-full h-full object-cover"
                        src={movie.image}
                        alt={movie.title}
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-on-surface group-hover:text-primary-container transition-colors">
                        {movie.title}
                      </h4>
                      <div className="text-[11px] text-on-surface-variant mb-2">{movie.time}</div>
                      {movie.hasFriends && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full border border-background overflow-hidden bg-surface-container-high" />
                            <div className="w-6 h-6 rounded-full border border-background overflow-hidden bg-surface-container-high" />
                          </div>
                          <span className="text-[10px] text-secondary">{movie.friends}</span>
                        </div>
                      )}
                      {movie.distance && (
                        <div className="flex items-center gap-2 mb-3 text-on-surface-variant text-[10px]">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          {movie.distance}
                        </div>
                      )}
                      <button
                        className={`w-full py-2 rounded-lg text-[12px] tracking-[0.05em] font-medium transition-all ${
                          movie.isSecondary
                            ? 'border border-white/10 text-on-surface-variant hover:bg-white/5'
                            : 'border border-primary-container text-primary-container hover:bg-primary-container hover:text-on-primary-container'
                        }`}
                      >
                        {movie.primaryAction}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Community Stats */}
            <section className="space-y-4">
              <h2 className="text-[12px] tracking-[0.2em] uppercase text-on-surface-variant px-2 font-medium">
                Community Pulse
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-2xl border-white/5">
                  <div className="text-[10px] text-on-surface-variant uppercase mb-1">Active Now</div>
                  <div className="text-[24px] font-black text-secondary leading-[1.3]">4,821</div>
                </div>
                <div className="glass-card p-4 rounded-2xl border-white/5">
                  <div className="text-[10px] text-on-surface-variant uppercase mb-1">Film Logs</div>
                  <div className="text-[24px] font-black text-primary-container leading-[1.3]">
                    12k+
                  </div>
                </div>
              </div>
            </section>

            {/* Pro Membership CTA */}
            <div className="relative rounded-2xl p-6 overflow-hidden group">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
              <div className="relative z-10">
                <h3 className="text-[24px] font-black text-white mb-2">Go Pro</h3>
                <p className="text-white/70 text-[12px] tracking-[0.05em] mb-6">
                  Unlock deep analytics, personalized cinema matching, and ad-free browsing.
                </p>
                <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-[12px] tracking-[0.05em] hover:scale-105 transition-transform">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FloatingActionButton />
      <Footer />
    </div>
  );
}
