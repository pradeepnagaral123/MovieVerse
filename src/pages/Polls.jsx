import { useState, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import Footer from '../components/Footer';

const heroVillains = [
  {
    name: 'The Joker',
    movie: 'The Dark Knight',
    pct: 42,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_OXK28Xtbv1hauub1vkpWajf5eFGGHCPTPplz1Kwn8fZufQOztcWFkreYxvz0FMNW3L1KqhNMKuoIZfSbhl5ZaFz6Few6XvFxCBEabtKgvRrc_DvX-JnNnd4XgRGbK5biF4IFfVIYMZZWRun3C7Q3wdrKhsPxV8Kkam0mPPt-WhWGAUhWrPb-avQ0oxFRBdeDZnOCt25rRZJ4DVCHGGdRrNgnN87CvLJmN0a3XOm6puomU0Ciu4OA',
  },
  {
    name: 'Anton Chigurh',
    movie: 'No Country for Old Men',
    pct: 28,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6rz0_Daseq9VIA7IXc39_OFpM76C_T0vHE3boESXFZEGwhrgej_QDlwvC6gTdVZRhLIYwN_bVwhyoQ9P-Sga9tddxWv4yMxU_yOK_vbge32PbmsXMq7EUMTKD9EGl_5xGwNkAie63i-rRLKQDP_6VSUMHdJXQ3GTpFL-uH4YuT5gBy7S3vaksh7DhQNDVQPZmqeySxoY2t6sTbYKqUIg9aQm3MICBI4KJIS8qvIeljh0Y5Y0gpr7h',
  },
  {
    name: 'Hannibal Lecter',
    movie: 'Silence of the Lambs',
    pct: 15,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoPyJwyzRf3-QoHwaBif0OCgws5I4QVOkf4Yq-DHPYE9oWzmocR4XSJjMqBQ9Vi6F-6BagnIk1T0kyOnUIfJPapajP9nzsPbizFmW4wll2wonuj4oZaPmFv9SbfajKSF3hzcrJW9DMKrPrD5VRw9rMIX-aBLnJQ0nNT7Obj20XO1e6za3WwR70cuMAS7cxCVUzJKJFzLFOf7kqAJe7lOdWW0sRXDN3SHlS7JJmdme9f4dMqm84u_ZM',
  },
  {
    name: 'Darth Vader',
    movie: 'Star Wars',
    pct: 15,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDb8SrSzG_RsxrXiQ4EnuHIbt5KZZZUQ6eDIIruRY2tFnGvSx8dMQjREk9Cm6jwI-h5Z_MHbjyXMlWU0k44lORBIcrbLSOtf7MtZdGvx5xF6BjauJQfEURlCK8yrio6oIW5AwPCYu7r7YulCFZLaBBTsoJbVE4ktjL3dkcpnEMkhZBsVkDTer90IH4DzHOtXeFTFUUljBHb1yPMW5pdY8ybd68efI4vP6h4q8rkqI7gqGlVhcFyxCd7',
  },
];

const pollFilters = ['Active', 'Ending Soon', 'Movies', 'TV', 'Actors', 'Technical', 'Archive'];

const gridPolls = [
  {
    id: 1,
    category: 'Technical',
    categoryColor: 'text-secondary',
    votes: '2.1k',
    title: 'Best Cinematography of 2024?',
    options: [
      { name: 'Poor Things', pct: 45 },
      { name: 'Oppenheimer', pct: 38 },
      { name: 'Zone of Interest', pct: 17 },
    ],
  },
  {
    id: 2,
    category: 'Movies',
    categoryColor: 'text-primary-container',
    votes: '8.4k',
    title: 'Most Anticipated Sci-Fi Remake?',
    options: [
      { name: 'Dune: Part Two', pct: 62 },
      { name: 'Mickey 17', pct: 25 },
      { name: 'Tron: Ares', pct: 13 },
    ],
  },
  {
    id: 3,
    category: 'Archive',
    categoryColor: 'text-on-surface-variant',
    votes: '12.2k',
    title: 'Greatest Hitchcock Masterpiece?',
    voted: true,
    votedOption: 'Vertigo',
    options: [
      { name: 'Vertigo', pct: 41 },
      { name: 'Psycho', pct: 35 },
      { name: 'Rear Window', pct: 24 },
    ],
  },
  {
    id: 4,
    category: 'Movies',
    categoryColor: 'text-tertiary',
    votes: '5.7k',
    title: 'Best Animated Feature of the Decade?',
    options: [
      { name: 'Spider-Verse', pct: 51 },
      { name: 'Boy and the Heron', pct: 29 },
      { name: 'Pinocchio (del Toro)', pct: 20 },
    ],
  },
];

const pollWinners = [
  {
    title: 'Greatest War Movie Ever Made',
    winner: 'Apocalypse Now',
    time: '2 weeks ago',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlZNp91I8n3aIVSmPj0Un44MtKiastyGd0AAM8OkNPcbJvZNlDfzsgk1bh-ubhkm2C3F9RlTJjFcFvU-syGnUQ0PR-1h3RCdLmGawstga4bUcN1iFKlEpeuy5D0ZSw5FR-HfYPK54vV8co53W2-nS8fTJIK03Q2FXSwo0Dogkt3D85N4xyZ2u1Lo4MaFIE67hnXJs1pwRgiMmUoDJa1-8aDj7pEiXaoTJpET-A_AfyhwFFPg7pn9Bl',
  },
  {
    title: 'Actor of the Century (So Far)',
    winner: 'Meryl Streep',
    time: '1 month ago',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCPvQYwurtyc-TbX469YNR1jISY-nLz60_hYmyupgeVPlUhAyW4gNFDd4hhuHbuMasEAbPwTou1LKnm5LIHzJRDGqGkfJvjisjD3brq0vIuUsvpmM4pNA0Sls8zHe_0IBKEaQZjw7sdeZLHnFnNPLThqV2g7fg4vcIsVPZK_wjBbcJU_G88IikicQwREgZF-SsJveMmkUNKYfuGVlwpLKsAlGL1DEG8mXKKCApfqL7Tyvno4szhdUJH',
  },
  {
    title: 'Most Immersive Sci-Fi World',
    winner: 'Blade Runner 2049',
    time: 'Last Week',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFFWH9zRUtOLNnm2eUnQUsR2BnssvCr5bHntv_yKmUB6pm_c831tcHhko7a4squRaVjJ4JPNliUVIQuQbpigyI0C6chRk-UokuHqkXYXwrpEz_kAjp4iU83gxwUPsDoXwDA-VycpURk2uA6orS7Vsl2PFQ_7dlsJhKbzIfnN1LAMtmPiUGBHW29OkmATygBUu11oFgjnRb8AviYSwwo696k71Xj2MzbFc41AFTvtEnHzViW_-xcqDp',
  },
];

function ConfettiButton({ children, className, onClick: onClickProp, ...props }) {
  const handleClick = (e) => {
    for (let i = 0; i < 10; i++) {
      const dot = document.createElement('div');
      dot.className = 'fixed bg-primary-container rounded-full pointer-events-none z-[9999]';
      const size = Math.random() * 6 + 2;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      document.body.appendChild(dot);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      const start = Date.now();

      function move() {
        const elapsed = Date.now() - start;
        if (elapsed > 1000) {
          dot.remove();
          return;
        }
        const t = elapsed / 1000;
        dot.style.transform = `translate(${vx * t}px, ${vy * t + 500 * t * t}px)`;
        dot.style.opacity = 1 - t;
        requestAnimationFrame(move);
      }
      move();
    }
    onClickProp?.(e);
  };

  return (
    <button className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

function HeroPollCard({ villain, voted, onVote }) {
  const isWinner = voted && villain.pct === Math.max(...heroVillains.map((v) => v.pct));

  return (
    <div className="group relative overflow-hidden rounded-xl glass-card transition-all duration-300 hover:border-primary-container/50 !hover:transform-none">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={villain.image}
          alt={villain.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-bold text-lg leading-tight">{villain.name}</h3>
          <p className="text-xs text-on-surface-variant opacity-80">{villain.movie}</p>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span
            className={`font-mono font-bold text-xl ${
              voted ? 'text-primary-container' : 'text-on-surface-variant'
            }`}
          >
            {voted ? `${villain.pct}%` : `${villain.pct}%`}
          </span>
          {voted ? (
            <span className="text-xs text-primary-container font-bold">VOTED</span>
          ) : (
            <ConfettiButton
              className="bg-white/10 hover:bg-primary-container hover:text-surface-container-lowest px-4 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer"
              onClick={() => onVote(villain.name)}
            >
              Vote
            </ConfettiButton>
          )}
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              voted && isWinner ? 'bg-primary-container' : voted ? 'bg-on-surface-variant/40' : 'bg-primary-container'
            }`}
            style={{ width: `${villain.pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function GridPollCard({ poll, voted, onVote }) {
  const [localVoted, setLocalVoted] = useState(voted || poll.voted);

  const handleVote = () => {
    setLocalVoted(true);
    onVote?.(poll.id);
  };

  return (
    <div className="glass-card rounded-xl p-6 group !hover:transform-none hover:border-primary-container/30 transition-all flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs font-bold uppercase ${poll.categoryColor}`}>{poll.category}</span>
          <span className="text-[10px] font-mono text-on-surface-variant">{poll.votes} votes</span>
        </div>
        <h3 className="text-xl font-bold mb-6">{poll.title}</h3>
        <div className="space-y-4">
          {poll.options.map((opt) => (
            <div key={opt.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{opt.name}</span>
                <span className="font-mono">
                  {localVoted && opt.name === (poll.votedOption || poll.options[0].name) ? (
                    <span className="text-primary-container font-bold">VOTED</span>
                  ) : (
                    `${opt.pct}%`
                  )}
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    localVoted && opt.name === (poll.votedOption || poll.options[0].name)
                      ? 'bg-primary-container'
                      : localVoted
                        ? 'bg-white/20'
                        : 'bg-on-surface-variant/40'
                  }`}
                  style={{ width: `${opt.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {localVoted ? (
        <div className="mt-8 flex justify-center">
          <span className="text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            You've already voted
          </span>
        </div>
      ) : (
        <ConfettiButton
          className="w-full mt-8 py-2.5 rounded-lg border border-white/10 hover:border-primary-container hover:text-primary transition-all text-sm font-bold cursor-pointer"
          onClick={handleVote}
        >
          Cast Verdict
        </ConfettiButton>
      )}
    </div>
  );
}

export default function Polls() {
  const [activeFilter, setActiveFilter] = useState('Active');
  const [heroVoted, setHeroVoted] = useState(false);
  const [gridVoted, setGridVoted] = useState({});
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ h: 8, m: 42, s: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroVote = () => {
    setHeroVoted(true);
  };

  const handleGridVote = (id) => {
    setGridVoted((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = () => {
    if (suggestion.trim()) {
      setSubmitted(true);
      setSuggestion('');
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar activeLink="Community" />
      <SideNavBar />

      <main className="xl:ml-64 pt-28 px-4 md:px-12 pb-20 max-w-[1280px] mx-auto">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Side: Polls Feed */}
          <div className="flex-1 space-y-12">
            {/* Hero Section: Poll of the Day */}
            <section>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="bg-primary-container/20 text-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter mb-3 inline-block">
                    Poll of the Day
                  </span>
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
                    Who is the ultimate cinematic villain?
                  </h1>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-on-surface-variant text-sm">24,582 votes cast</p>
                  <p className="text-primary text-xs font-mono">
                    Ends in {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {heroVillains.map((v) => (
                  <HeroPollCard
                    key={v.name}
                    villain={v}
                    voted={heroVoted}
                    onVote={handleHeroVote}
                  />
                ))}
              </div>
            </section>

            {/* Filters */}
            <section>
              <div className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar">
                {pollFilters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      activeFilter === f
                        ? 'bg-primary-container text-surface-container-lowest'
                        : 'glass-card hover:bg-white/10 text-on-surface-variant font-medium !hover:transform-none'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </section>

            {/* Polls Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gridPolls.map((poll) => (
                <GridPollCard
                  key={poll.id}
                  poll={poll}
                  voted={gridVoted[poll.id]}
                  onVote={handleGridVote}
                />
              ))}
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full xl:w-80 space-y-6 flex-shrink-0">
            {/* Poll Winners */}
            <div className="glass-card rounded-2xl p-6 !hover:transform-none">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  trophy
                </span>
                Poll Winners
              </h2>
              <div className="space-y-6">
                {pollWinners.map((w) => (
                  <div key={w.title} className="flex gap-3">
                    <div className="w-12 h-16 rounded border border-white/10 overflow-hidden flex-shrink-0">
                      <img className="w-full h-full object-cover" src={w.image} alt={w.title} />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant font-mono">{w.time}</p>
                      <p className="text-sm font-bold leading-tight">{w.title}</p>
                      <p className="text-primary text-xs font-medium">Winner: {w.winner}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-sm text-on-surface-variant hover:text-primary transition-colors font-medium">
                View Hall of Fame →
              </button>
            </div>

            {/* Community Verdict */}
            <div className="glass-card rounded-2xl p-6 bg-primary-container/5 border-primary-container/20 !hover:transform-none">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">groups</span>
                Community Verdict
              </h2>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-xs text-primary-container font-bold mb-1">UNANIMOUS (90%+)</p>
                  <p className="text-sm">
                    Christopher Nolan is the most influential director of the 2010s.
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-xs text-on-surface-variant font-bold mb-1">DIVIDED (50/50)</p>
                  <p className="text-sm">
                    Is Die Hard a Christmas movie? The community remains deadlocked.
                  </p>
                </div>
              </div>
            </div>

            {/* Suggest a Poll */}
            <div className="relative overflow-hidden rounded-2xl p-6 group !hover:transform-none">
              <div className="absolute inset-0 bg-primary-container opacity-10" />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary-container mb-2">lightbulb</span>
                <h4 className="font-bold text-md mb-2">Suggest a Poll</h4>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Have a burning cinematic question? Submit it for the 'Poll of the Day' spotlight.
                </p>
                {submitted ? (
                  <div className="w-full py-2 bg-secondary-container/20 text-secondary text-xs font-bold rounded-lg text-center">
                    Suggestion submitted!
                  </div>
                ) : (
                  <>
                    <input
                      className="w-full bg-black/40 border border-white/10 rounded-lg text-sm px-4 py-2 focus:ring-primary-container focus:border-primary-container mb-3 text-on-surface placeholder:text-on-surface-variant/30 outline-none"
                      placeholder="Your question..."
                      type="text"
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                      onClick={handleSubmit}
                      className="w-full py-2 bg-primary-container text-surface-container-lowest text-xs font-bold rounded-lg hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      Submit Suggestion
                    </button>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
