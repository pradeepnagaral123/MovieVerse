const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

export const tvPosterUrl = (path, size = 'w500') => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMG_BASE}/${size}${path}`;
};

export const tvBackdropUrl = (path, size = 'w1280') => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMG_BASE}/${size}${path}`;
};

const TV_GENRES = {
  10759: 'Action & Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  10762: 'Kids',
  9648: 'Mystery',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
  37: 'Western',
};

const MOCK_TV_SHOWS = [
  {
    id: 1396,
    name: 'Breaking Bad',
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student to secure his family's future.",
    poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    backdrop_path: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    first_air_date: '2008-01-20',
    vote_average: 8.9,
    vote_count: 13500,
    genre_ids: [18, 80],
    popularity: 950.5,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 1399,
    name: 'Game of Thrones',
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    poster_path: '/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
    backdrop_path: '/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
    first_air_date: '2011-04-17',
    vote_average: 8.4,
    vote_count: 22000,
    genre_ids: [10765, 18, 10759],
    popularity: 1200.3,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 66732,
    name: 'Stranger Things',
    overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    poster_path: '/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdrop_path: '/56v2KjBlYj3Ey2t4WDrYRAin39.jpg',
    first_air_date: '2016-07-15',
    vote_average: 8.6,
    vote_count: 17500,
    genre_ids: [18, 10765, 9648],
    popularity: 1500.8,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 94997,
    name: 'Squid Game',
    overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
    poster_path: '/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    backdrop_path: '/sJdGmNLmGMYVB2zcShhMbIbvtu.jpg',
    first_air_date: '2021-09-17',
    vote_average: 7.8,
    vote_count: 14800,
    genre_ids: [10759, 9648, 18],
    popularity: 1600.2,
    origin_country: ['KR'],
    original_language: 'ko',
  },
  {
    id: 76479,
    name: 'The Boys',
    overview: "A group of vigilantes known as 'The Boys' set out to take down corrupt superheroes who abuse their superpowers.",
    poster_path: '/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg',
    backdrop_path: '/7jjwdoIVPJp7GSBnRaq5Iw7MPLP.jpg',
    first_air_date: '2019-07-26',
    vote_average: 8.5,
    vote_count: 10200,
    genre_ids: [10765, 10759, 18],
    popularity: 880.4,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 93405,
    name: 'Squid Game: The Challenge',
    overview: "Inspired by the hit series Squid Game, this reality competition series pits 456 real players against each other for a life-changing cash prize.",
    poster_path: '/oKtuewRpZIzLwPpgkVW2kVbMxZH.jpg',
    backdrop_path: '/ukAmSyNdtWduHZfm27R2EOsguKt.jpg',
    first_air_date: '2023-11-22',
    vote_average: 6.8,
    vote_count: 420,
    genre_ids: [10764, 18],
    popularity: 350.6,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 60735,
    name: 'The Flash',
    overview: "After being struck by lightning, CSI investigator Barry Allen awakens from his coma to discover he's been given the power of super speed.",
    poster_path: '/lJA2RCMfsWoskqlQhXPSLFQGXEJ.jpg',
    backdrop_path: '/z59kJfcElR9eHO9rJbWp4qWMuee.jpg',
    first_air_date: '2014-10-07',
    vote_average: 7.8,
    vote_count: 11000,
    genre_ids: [18, 10765],
    popularity: 750.3,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 1398,
    name: 'Breaking Bad',
    overview: "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live.",
    poster_path: '/ztkUQFLlC19CCMYHW6nMTYhunnJ.jpg',
    backdrop_path: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    first_air_date: '2008-01-20',
    vote_average: 8.9,
    vote_count: 13500,
    genre_ids: [18, 80],
    popularity: 950.5,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 63174,
    name: 'Loki',
    overview: "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers: Endgame.",
    poster_path: '/voHUmluYmKyleFkTu3lOXQGCw6M.jpg',
    backdrop_path: '/kCZTj1WJBkFfGnTufQLfOoP3S7n.jpg',
    first_air_date: '2021-06-09',
    vote_average: 8.2,
    vote_count: 10500,
    genre_ids: [10765, 18],
    popularity: 680.9,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 100088,
    name: 'The Last of Us',
    overview: "Joel and Ellie navigate a post-apocalyptic America overrun by deadly infected and brutal survivors. A thrilling journey of love and survival.",
    poster_path: '/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
    backdrop_path: '/lGiRj7gSJRkGOFOKHs3I3sMdxiA.jpg',
    first_air_date: '2023-01-15',
    vote_average: 8.8,
    vote_count: 5600,
    genre_ids: [18, 10765],
    popularity: 1100.7,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 71712,
    name: 'The Good Place',
    overview: "Eleanor Shellstrop, an ordinary woman who, through an extraordinary string of events, enters the afterlife where she comes to realize that she hasn't been a very good person.",
    poster_path: '/qy4k7N4fbHxwj6BJju74Kvbv3Vr.jpg',
    backdrop_path: '/3lBDg3i6nn5R1EBYG0USqkaOkGR.jpg',
    first_air_date: '2016-09-19',
    vote_average: 8.2,
    vote_count: 3800,
    genre_ids: [35, 18],
    popularity: 420.5,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 110316,
    name: 'Alice in Borderland',
    overview: "An aimless gamer finds himself in a parallel world where he must compete in deadly games to survive and find a way back home.",
    poster_path: '/fSMFWqr2FvKO0vQB3U47dWxGGLa.jpg',
    backdrop_path: '/7F5fJhSRfbVzMFoWzCinXu8P2gq.jpg',
    first_air_date: '2020-12-10',
    vote_average: 8.0,
    vote_count: 2900,
    genre_ids: [10759, 9648, 18],
    popularity: 520.3,
    origin_country: ['JP'],
    original_language: 'ja',
  },
  {
    id: 82856,
    name: 'The Mandalorian',
    overview: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    poster_path: '/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg',
    backdrop_path: '/o0i4fK4Vi0wb8cP7s8hHzSjRfm.jpg',
    first_air_date: '2019-11-12',
    vote_average: 8.5,
    vote_count: 9200,
    genre_ids: [10765, 10759],
    popularity: 850.6,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 95557,
    name: 'Invincible',
    overview: "An adult animated series based on the Skybound/Image comic about a teenager whose father is the most powerful superhero on the planet.",
    poster_path: '/ydynG289nJbYGhGfzSpuLWfC7wH.jpg',
    backdrop_path: '/nWs0BjUfjdpHvd2lTqk1P3sW2C.jpg',
    first_air_date: '2021-03-25',
    vote_average: 8.7,
    vote_count: 3500,
    genre_ids: [16, 10759, 18],
    popularity: 620.8,
    origin_country: ['US'],
    original_language: 'en',
  },
  {
    id: 114461,
    name: 'Arcane',
    overview: "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
    poster_path: '/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
    backdrop_path: '/rkB4LyC3mWfbSMIXBQG1Lm0BGs7.jpg',
    first_air_date: '2021-11-06',
    vote_average: 8.7,
    vote_count: 4200,
    genre_ids: [16, 10765, 10759],
    popularity: 750.4,
    origin_country: ['US'],
    original_language: 'en',
  },
];

function normalizeTVShow(item) {
  return {
    id: item.id,
    name: item.name,
    overview: item.overview || '',
    poster_path: item.poster_path || null,
    backdrop_path: item.backdrop_path || null,
    first_air_date: item.first_air_date || '',
    vote_average: item.vote_average || 0,
    vote_count: item.vote_count || 0,
    genres: (item.genre_ids || []).map((id) => ({
      id,
      name: TV_GENRES[id] || 'Unknown',
    })).filter((g) => g.name !== 'Unknown'),
    popularity: item.popularity || 0,
    origin_country: item.origin_country || [],
    original_language: item.original_language || '',
    number_of_seasons: item.number_of_seasons || 0,
    number_of_episodes: item.number_of_episodes || 0,
    status: item.status || '',
    tagline: item.tagline || '',
  };
}

function getMockTrendingTV() {
  const shuffled = [...MOCK_TV_SHOWS].sort(() => Math.random() - 0.5);
  return { results: shuffled.slice(0, 10) };
}

function getMockPopularTV() {
  const shuffled = [...MOCK_TV_SHOWS].sort(() => Math.random() - 0.5);
  return { results: shuffled.slice(0, 12) };
}

function getMockTopRatedTV() {
  const sorted = [...MOCK_TV_SHOWS].sort((a, b) => b.vote_average - a.vote_average);
  return { results: sorted.slice(0, 10) };
}

async function fetchTMDB(endpoint, params = {}) {
  if (!TMDB_API_KEY) throw new Error('NO_TMDB_API_KEY');
  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set('api_key', TMDB_API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

export async function getTrendingTV(timeWindow = 'day') {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 600));
    return getMockTrendingTV();
  }
  const data = await fetchTMDB(`/trending/tv/${timeWindow}`);
  return {
    results: data.results.map(normalizeTVShow),
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}

export async function getPopularTV(page = 1) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 500));
    return getMockPopularTV();
  }
  const data = await fetchTMDB('/tv/popular', { page });
  return {
    results: data.results.map(normalizeTVShow),
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}

export async function getTopRatedTV(page = 1) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 500));
    return getMockTopRatedTV();
  }
  const data = await fetchTMDB('/tv/top_rated', { page });
  return {
    results: data.results.map(normalizeTVShow),
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}

export async function getTVShowDetails(id) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 400));
    const show = MOCK_TV_SHOWS.find((s) => s.id === Number(id));
    return show || MOCK_TV_SHOWS[0];
  }
  const data = await fetchTMDB(`/tv/${id}`);
  return {
    id: data.id,
    name: data.name,
    overview: data.overview || '',
    poster_path: data.poster_path || null,
    backdrop_path: data.backdrop_path || null,
    first_air_date: data.first_air_date || '',
    vote_average: data.vote_average || 0,
    vote_count: data.vote_count || 0,
    genres: (data.genres || []).map((g) => ({ id: g.id, name: g.name })),
    popularity: data.popularity || 0,
    origin_country: data.origin_country || [],
    original_language: data.original_language || '',
    number_of_seasons: data.number_of_seasons || 0,
    number_of_episodes: data.number_of_episodes || 0,
    status: data.status || '',
    tagline: data.tagline || '',
    created_by: data.created_by || [],
    networks: data.networks || [],
    production_companies: data.production_companies || [],
    seasons: data.seasons || [],
    episode_run_time: data.episode_run_time || [],
    next_episode_to_air: data.next_episode_to_air || null,
    last_episode_to_air: data.last_episode_to_air || null,
  };
}

export async function searchTVShows(query, page = 1) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 500));
    const q = query.toLowerCase();
    const filtered = MOCK_TV_SHOWS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.overview.toLowerCase().includes(q)
    );
    if (filtered.length > 0) {
      return { results: filtered, total_results: filtered.length, total_pages: 1 };
    }
    return { results: MOCK_TV_SHOWS.slice(0, 5), total_results: 5, total_pages: 1 };
  }
  const data = await fetchTMDB('/search/tv', { query, page });
  return {
    results: data.results.map(normalizeTVShow),
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}
