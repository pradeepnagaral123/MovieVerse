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

export const posterUrl = (path, size = 'w500') => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMG_BASE}/${size}${path}`;
};

export const backdropUrl = (path, size = 'w1280') => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMG_BASE}/${size}${path}`;
};

export const imageUrl = (path, size = 'w500') => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMG_BASE}/${size}${path}`;
};

export const isTmdbKeySet = () => TMDB_API_KEY && TMDB_API_KEY.length > 5;

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
    return {
      ...(show || MOCK_TV_SHOWS[0]),
      credits: { crew: [], cast: [] },
      videos: { results: [] },
      similar: { results: [] },
      recommendations: { results: [] },
    };
  }
  const data = await fetchTMDB(`/tv/${id}`, {
    append_to_response: 'credits,videos,similar,recommendations',
  });
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
    credits: data.credits || { crew: [], cast: [] },
    videos: data.videos || { results: [] },
    similar: data.similar || { results: [] },
    recommendations: data.recommendations || { results: [] },
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

const MOCK_MOVIES = [
  { id: 27205, title: 'Inception', overview: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.', release_date: '2010-07-16', vote_average: 8.4, vote_count: 34000, runtime: 148, poster_path: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg', backdrop_path: '/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg', genres: [{ id: 878, name: 'Sci-Fi' }, { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }], budget: 160000000, revenue: 836000000, status: 'Released', original_language: 'en', tagline: 'Your mind is the scene of the crime.', production_companies: [{ id: 174, name: 'Warner Bros. Pictures' }], credits: { crew: [{ job: 'Director', name: 'Christopher Nolan', profile_path: null }], cast: [{ id: 6193, name: 'Leonardo DiCaprio', character: 'Dom Cobb', profile_path: '/wo2h2pn1lEqmKvSvNGdAgIhFxjN.jpg' }, { id: 2037, name: 'Joseph Gordon-Levitt', character: 'Arthur', profile_path: '/blKKtDb2lTnM1rJt1ZvmLk1eAvo.jpg' }, { id: 3063, name: 'Ellen Page', character: 'Ariadne', profile_path: '/xuGk6LgFTRqQiS1s8QD92jz0zUq.jpg' }] }, videos: { results: [{ key: 'YoHD9XEKOC8', site: 'YouTube', type: 'Trailer' }] }, similar: { results: [] }, recommendations: { results: [] } },
  { id: 550, title: 'Fight Club', overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', release_date: '1999-10-15', vote_average: 8.4, vote_count: 27000, runtime: 139, poster_path: '/pB8BM7pdSp6B6Ih7QI4S2t0POoT.jpg', backdrop_path: '/hZkgoQYus5dXo3H8T7Uef6DNknx.jpg', genres: [{ id: 18, name: 'Drama' }], budget: 63000000, revenue: 100900000, status: 'Released', original_language: 'en', tagline: 'Mischief. Mayhem. Soap.', production_companies: [{ id: 508, name: 'Regency Enterprises' }], credits: { crew: [{ job: 'Director', name: 'David Fincher', profile_path: null }], cast: [{ id: 819, name: 'Edward Norton', character: 'The Narrator', profile_path: '/5HBiJ1Jl7RV5U3cc51oROz0wDp6.jpg' }, { id: 694, name: 'Brad Pitt', character: 'Tyler Durden', profile_path: '/oTB9eyGf1fVVNUUd8kfoE6duL9u.jpg' }] }, videos: { results: [{ key: 'SUXWAEX2jlg', site: 'YouTube', type: 'Trailer' }] }, similar: { results: [] }, recommendations: { results: [] } },
  { id: 680, title: 'Pulp Fiction', overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', release_date: '1994-09-10', vote_average: 8.5, vote_count: 26000, runtime: 154, poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', backdrop_path: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg', genres: [{ id: 53, name: 'Thriller' }, { id: 80, name: 'Crime' }], budget: 8000000, revenue: 214000000, status: 'Released', original_language: 'en', tagline: 'Just because you are a character doesn\'t mean you have character.', production_companies: [{ id: 174, name: 'Miramax' }], credits: { crew: [{ job: 'Director', name: 'Quentin Tarantino', profile_path: null }], cast: [{ id: 8891, name: 'John Travolta', character: 'Vincent Vega', profile_path: null }, { id: 12052, name: 'Samuel L. Jackson', character: 'Jules Winnfield', profile_path: null }] }, videos: { results: [{ key: 's7EdQ4FqbhY', site: 'YouTube', type: 'Trailer' }] }, similar: { results: [] }, recommendations: { results: [] } },
  { id: 155, title: 'The Dark Knight', overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent.', release_date: '2008-07-18', vote_average: 8.5, vote_count: 31000, runtime: 152, poster_path: '/qJ2tW6WMUDux911BTUgMe1nF1iC.jpg', backdrop_path: '/nMKdUUepR0i5zn0y1T4CsSB5ez.jpg', genres: [{ id: 28, name: 'Action' }, { id: 80, name: 'Crime' }, { id: 18, name: 'Drama' }], budget: 185000000, revenue: 1006000000, status: 'Released', original_language: 'en', tagline: 'Why So Serious?', production_companies: [{ id: 923, name: 'DC Entertainment' }], credits: { crew: [{ job: 'Director', name: 'Christopher Nolan', profile_path: null }], cast: [{ id: 3896, name: 'Christian Bale', character: 'Bruce Wayne', profile_path: null }, { id: 3897, name: 'Heath Ledger', character: 'Joker', profile_path: null }] }, videos: { results: [{ key: 'EXeTwQWrcwY', site: 'YouTube', type: 'Trailer' }] }, similar: { results: [] }, recommendations: { results: [] } },
  { id: 244786, title: 'Whiplash', overview: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.', release_date: '2014-10-10', vote_average: 8.4, vote_count: 15000, runtime: 107, poster_path: '/7fn624j544nwdf1DzMdCnLz7Luv.jpg', backdrop_path: '/6bbZ6XlDfj9uCOQm3bVcTb6Lq5Q.jpg', genres: [{ id: 18, name: 'Drama' }, { id: 10402, name: 'Music' }], budget: 3300000, revenue: 49000000, status: 'Released', original_language: 'en', tagline: 'The road to greatness can take you to the edge.', production_companies: [{ id: 73669, name: 'Blumhouse Productions' }], credits: { crew: [{ job: 'Director', name: 'Damien Chazelle', profile_path: null }], cast: [{ id: 30636, name: 'Miles Teller', character: 'Andrew Neiman', profile_path: null }, { id: 12052, name: 'J.K. Simmons', character: 'Terence Fletcher', profile_path: null }] }, videos: { results: [{ key: '7d_jQycdQGo', site: 'YouTube', type: 'Trailer' }] }, similar: { results: [] }, recommendations: { results: [] } },
  { id: 278, title: 'The Shawshank Redemption', overview: 'Over the course of several years, two convicts form a friendship, seeking consolation and eventual redemption through basic compassion.', release_date: '1994-09-23', vote_average: 8.7, vote_count: 25000, runtime: 142, poster_path: '/9cjIGRiQoRCgTNEMmcoAjM3lGRx.jpg', backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg', genres: [{ id: 18, name: 'Drama' }], budget: 25000000, revenue: 58300000, status: 'Released', original_language: 'en', tagline: 'Fear can hold you prisoner. Hope can set you free.', production_companies: [{ id: 97, name: 'Castle Rock Entertainment' }], credits: { crew: [{ job: 'Director', name: 'Frank Darabont', profile_path: null }], cast: [{ id: 2178, name: 'Tim Robbins', character: 'Andy Dufresne', profile_path: null }, { id: 2176, name: 'Morgan Freeman', character: 'Red', profile_path: null }] }, videos: { results: [{ key: '6hB3S9bIaco', site: 'YouTube', type: 'Trailer' }] }, similar: { results: [] }, recommendations: { results: [] } },
  { id: 240, title: 'The Godfather', overview: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.', release_date: '1972-03-14', vote_average: 8.7, vote_count: 19000, runtime: 175, poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg', genres: [{ id: 18, name: 'Drama' }, { id: 80, name: 'Crime' }], budget: 7000000, revenue: 250000000, status: 'Released', original_language: 'en', tagline: 'An offer you can\'t refuse.', production_companies: [{ id: 4, name: 'Paramount' }], credits: { crew: [{ job: 'Director', name: 'Francis Ford Coppola', profile_path: null }], cast: [{ id: 1771, name: 'Marlon Brando', character: 'Don Vito Corleone', profile_path: null }, { id: 11701, name: 'Al Pacino', character: 'Michael Corleone', profile_path: null }] }, videos: { results: [{ key: 'UaVTIH8mujA', site: 'YouTube', type: 'Trailer' }] }, similar: { results: [] }, recommendations: { results: [] } },
  { id: 13, title: 'Forrest Gump', overview: 'The history of the United States from the 1950s to the 70s unfolds from the perspective of an Alabama man with an IQ of 75.', release_date: '1994-07-06', vote_average: 8.5, vote_count: 26000, runtime: 142, poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', backdrop_path: '/3h1JZGDhZ8nzxdgvkxha0qBgiy7.jpg', genres: [{ id: 35, name: 'Comedy' }, { id: 18, name: 'Drama' }, { id: 10749, name: 'Romance' }], budget: 55000000, revenue: 678000000, status: 'Released', original_language: 'en', tagline: 'The world will never be the same once you\'ve seen it through the eyes of Forrest Gump.', production_companies: [{ id: 4, name: 'Paramount' }], credits: { crew: [{ job: 'Director', name: 'Robert Zemeckis', profile_path: null }], cast: [{ id: 13, name: 'Tom Hanks', character: 'Forrest Gump', profile_path: null }] }, videos: { results: [{ key: 'bLvqMNKzEA8', site: 'YouTube', type: 'Trailer' }] }, similar: { results: [] }, recommendations: { results: [] } },
  { id: 496243, title: 'Parasite', overview: 'All unemployed, Ki-taek\'s family takes peculiar interest in the wealthy Parks, becoming their employees one by one.', release_date: '2019-05-30', vote_average: 8.5, vote_count: 16000, runtime: 132, poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', backdrop_path: '/TU9HoIp5SBISigaSKyH1jHzU70k.jpg', genres: [{ id: 35, name: 'Comedy' }, { id: 53, name: 'Thriller' }, { id: 18, name: 'Drama' }], budget: 11400000, revenue: 266000000, status: 'Released', original_language: 'ko', tagline: 'Act like you own the place.', production_companies: [{ id: 2116, name: 'CJ Entertainment' }], credits: { crew: [{ job: 'Director', name: 'Bong Joon-ho', profile_path: null }], cast: [{ id: 1410698, name: 'Song Kang-ho', character: 'Kim Ki-taek', profile_path: null }] }, videos: { results: [{ key: '5xH0HfJHsaY', site: 'YouTube', type: 'Trailer' }] }, similar: { results: [] }, recommendations: { results: [] } },
  { id: 807, title: 'Se7en', overview: 'Two detectives hunt a serial killer who uses the seven deadly sins as his motives.', release_date: '1995-09-22', vote_average: 8.4, vote_count: 18000, runtime: 127, poster_path: '/6yoghtyTpznpBik8EngEmJskVUO.jpg', backdrop_path: '/4kJcPW1RKjBf1vB6De0zUxJbQjt.jpg', genres: [{ id: 80, name: 'Crime' }, { id: 9648, name: 'Mystery' }, { id: 53, name: 'Thriller' }], budget: 33000000, revenue: 327000000, status: 'Released', original_language: 'en', tagline: 'Seven deadly sins. Seven ways to die.', production_companies: [{ id: 508, name: 'Regency Enterprises' }], credits: { crew: [{ job: 'Director', name: 'David Fincher', profile_path: null }], cast: [{ id: 819, name: 'Brad Pitt', character: 'Detective David Mills', profile_path: null }, { id: 4785, name: 'Morgan Freeman', character: 'Detective William Somerset', profile_path: null }] }, videos: { results: [{ key: 'znmQ7oMiQrM', site: 'YouTube', type: 'Trailer' }] }, similar: { results: [] }, recommendations: { results: [] } },
];

export async function getTrendingMovies(timeWindow = 'day') {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 600));
    return { results: MOCK_MOVIES.slice(0, 10) };
  }
  const data = await fetchTMDB(`/trending/movie/${timeWindow}`);
  return {
    results: data.results,
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}

export async function getPopularMovies(page = 1) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 500));
    return { results: MOCK_MOVIES.slice(0, 12) };
  }
  const data = await fetchTMDB('/movie/popular', { page });
  return {
    results: data.results,
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}

export async function getTopRatedMovies(page = 1) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 500));
    const sorted = [...MOCK_MOVIES].sort((a, b) => b.vote_average - a.vote_average);
    return { results: sorted.slice(0, 10) };
  }
  const data = await fetchTMDB('/movie/top_rated', { page });
  return {
    results: data.results,
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}

export async function searchMovies(query, page = 1) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 500));
    const q = query.toLowerCase();
    const filtered = MOCK_MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.overview.toLowerCase().includes(q)
    );
    if (filtered.length > 0) {
      return { results: filtered, total_results: filtered.length, total_pages: 1 };
    }
    return { results: MOCK_MOVIES.slice(0, 5), total_results: 5, total_pages: 1 };
  }
  const data = await fetchTMDB('/search/movie', { query, page });
  return {
    results: data.results,
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}

export async function getUpcomingMovies(page = 1) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 500));
    return { results: MOCK_MOVIES.slice(3, 9) };
  }
  const data = await fetchTMDB('/movie/upcoming', { page });
  return {
    results: data.results,
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}

export async function getNowPlayingMovies(page = 1) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 500));
    return { results: MOCK_MOVIES.slice(0, 3) };
  }
  const data = await fetchTMDB('/movie/now_playing', { page });
  return {
    results: data.results,
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}

export async function getMovieDetails(id) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 400));
    const found = MOCK_MOVIES.find((m) => m.id === Number(id));
    if (found) return found;
    return { ...MOCK_MOVIES[0], id, title: `Movie #${id}` };
  }
  const data = await fetchTMDB(`/movie/${id}`, {
    append_to_response: 'credits,videos,similar,recommendations',
  });
  return {
    id: data.id,
    title: data.title,
    overview: data.overview || '',
    poster_path: data.poster_path || null,
    backdrop_path: data.backdrop_path || null,
    release_date: data.release_date || '',
    vote_average: data.vote_average || 0,
    vote_count: data.vote_count || 0,
    runtime: data.runtime || 0,
    genres: (data.genres || []).map((g) => ({ id: g.id, name: g.name })),
    budget: data.budget || 0,
    revenue: data.revenue || 0,
    tagline: data.tagline || '',
    original_language: data.original_language || '',
    status: data.status || '',
    production_companies: data.production_companies || [],
    credits: data.credits || { crew: [], cast: [] },
    videos: data.videos || { results: [] },
    similar: data.similar || { results: [] },
    recommendations: data.recommendations || { results: [] },
  };
}

export async function getPersonDetails(personId) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 400));
    return {
      id: Number(personId),
      name: 'Sample Actor',
      biography: 'Biography not available in demo mode.',
      birthday: null,
      deathday: null,
      place_of_birth: null,
      profile_path: null,
      known_for_department: 'Acting',
      popularity: 0,
    };
  }
  const data = await fetchTMDB(`/person/${personId}`);
  return {
    id: data.id,
    name: data.name || '',
    biography: data.biography || '',
    birthday: data.birthday || null,
    deathday: data.deathday || null,
    place_of_birth: data.place_of_birth || null,
    profile_path: data.profile_path || null,
    known_for_department: data.known_for_department || 'Acting',
    popularity: data.popularity || 0,
  };
}

export async function getPersonMovieCredits(personId) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 400));
    return { cast: [] };
  }
  const data = await fetchTMDB(`/person/${personId}/movie_credits`);
  const cast = (data.cast || []).map((m) => ({
    id: m.id,
    title: m.title || '',
    character: m.character || '',
    poster_path: m.poster_path || null,
    release_date: m.release_date || '',
    vote_average: m.vote_average || 0,
    overview: m.overview || '',
    genre_ids: m.genre_ids || [],
  }));
  return { cast };
}

export async function getMoviesByGenre(genreId, page = 1) {
  if (!TMDB_API_KEY) {
    await new Promise((r) => setTimeout(r, 500));
    const filtered = MOCK_MOVIES.filter((m) => m.genre_ids?.includes(genreId));
    return {
      results: filtered.length > 0 ? filtered : MOCK_MOVIES.slice(0, 6),
      total_results: filtered.length || MOCK_MOVIES.length,
      total_pages: 1,
    };
  }
  const data = await fetchTMDB('/discover/movie', {
    with_genres: genreId,
    sort_by: 'vote_average.desc',
    'vote_count.gte': '500',
    page,
  });
  return {
    results: data.results,
    total_results: data.total_results,
    total_pages: data.total_pages,
  };
}
