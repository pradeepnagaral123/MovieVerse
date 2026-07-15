const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';
const IMG_BASE = 'https://image.tmdb.org/t/p';

export const imageUrl = (path, size = 'w500') => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMG_BASE}/${size}${path}`;
};

export const backdropUrl = (path, size = 'w1280') => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMG_BASE}/${size}${path}`;
};

export const posterUrl = (path, size = 'w500') => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMG_BASE}/${size}${path}`;
};

export const isApiKeySet = () => API_KEY && API_KEY.length > 5;

async function fetchOMDB(params = {}) {
  if (!isApiKeySet()) throw new Error('NO_API_KEY');
  const url = new URL(BASE_URL);
  url.searchParams.set('apikey', API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`OMDB API error: ${res.status}`);
  const data = await res.json();
  if (data.Response === 'False') throw new Error(data.Error || 'Movie not found');
  return data;
}

function parseRuntime(runtime) {
  if (!runtime || runtime === 'N/A') return 0;
  const match = runtime.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function parseGenres(genreStr) {
  if (!genreStr || genreStr === 'N/A') return [];
  return genreStr.split(',').map((g, i) => ({ id: i, name: g.trim() }));
}

function parseActors(actorsStr) {
  if (!actorsStr || actorsStr === 'N/A') return [];
  return actorsStr.split(',').map((a, i) => ({
    id: i,
    name: a.trim(),
    character: '',
    profile_path: null,
  }));
}

function parseDate(dateStr) {
  if (!dateStr || dateStr === 'N/A') return '';
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) return parsed.toISOString().split('T')[0];
  if (/^\d{4}$/.test(dateStr.trim())) return `${dateStr.trim()}-01-01`;
  return dateStr;
}

function normalizeSearchResult(item) {
  return {
    id: item.imdbID,
    title: item.Title,
    release_date: item.Year !== 'N/A' ? `${item.Year}-01-01` : '',
    poster_path: item.Poster !== 'N/A' ? item.Poster : null,
    backdrop_path: null,
    vote_average: 0,
    vote_count: 0,
    overview: '',
    genres: [],
    runtime: 0,
  };
}

function normalizeMovieDetail(data) {
  const rating = data.imdbRating !== 'N/A' ? parseFloat(data.imdbRating) : 0;
  const votes = data.imdbVotes !== 'N/A' ? parseInt(data.imdbVotes.replace(/,/g, ''), 10) : 0;

  return {
    id: data.imdbID,
    imdbID: data.imdbID,
    title: data.Title,
    overview: data.Plot !== 'N/A' ? data.Plot : '',
    release_date: parseDate(data.Released),
    vote_average: rating,
    vote_count: votes,
    runtime: parseRuntime(data.Runtime),
    poster_path: data.Poster !== 'N/A' ? data.Poster : null,
    backdrop_path: null,
    genres: parseGenres(data.Genre),
    budget: 0,
    revenue: 0,
    tagline: '',
    original_language: data.Language !== 'N/A' ? data.Language : '',
    status: data.Released !== 'N/A' ? 'Released' : 'N/A',
    production_companies: data.Production !== 'N/A' ? [{ name: data.Production }] : [],
    boxOffice: data.BoxOffice !== 'N/A' ? data.BoxOffice : null,
    rated: data.Rated !== 'N/A' ? data.Rated : null,
    awards: data.Awards !== 'N/A' ? data.Awards : null,
    credits: {
      crew: data.Director !== 'N/A'
        ? [{ job: 'Director', name: data.Director, profile_path: null }]
        : [],
      cast: parseActors(data.Actors),
    },
    videos: { results: [] },
    similar: { results: [] },
    recommendations: { results: [] },
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

function getMockMovies(query) {
  const q = query.toLowerCase();
  const filtered = MOCK_MOVIES.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.overview.toLowerCase().includes(q) ||
      m.credits?.crew?.some((c) => c.name.toLowerCase().includes(q)) ||
      m.genres?.some((g) => g.name.toLowerCase().includes(q))
  );
  if (filtered.length > 0) {
    return { results: filtered, total_results: filtered.length, total_pages: 1 };
  }
  const shuffled = [...MOCK_MOVIES].sort(() => Math.random() - 0.5);
  return { results: shuffled.slice(0, 5), total_results: 5, total_pages: 1 };
}

function getMockMovieDetails(id) {
  const found = MOCK_MOVIES.find((m) => m.id === Number(id) || m.id === id);
  if (found) return { ...found, similar: { results: MOCK_MOVIES.filter((m) => m.id !== Number(id) && m.id !== id).slice(0, 6) } };
  return { ...MOCK_MOVIES[0], id, title: `Movie #${id}`, similar: { results: MOCK_MOVIES.slice(0, 6) } };
}

export async function searchMovies(query, page = 1) {
  if (!isApiKeySet()) {
    await new Promise((r) => setTimeout(r, 500));
    return getMockMovies(query);
  }
  const data = await fetchOMDB({ s: query, type: 'movie', page });
  const results = (data.Search || []).map(normalizeSearchResult);
  const totalResults = data.totalResults ? parseInt(data.totalResults, 10) : 0;
  return {
    results,
    total_results: totalResults,
    total_pages: Math.ceil(totalResults / 10),
  };
}

export async function getMovieDetails(id) {
  if (!isApiKeySet()) {
    await new Promise((r) => setTimeout(r, 400));
    return getMockMovieDetails(id);
  }
  const data = await fetchOMDB({ i: id, plot: 'full' });
  return normalizeMovieDetail(data);
}

export async function getTrending() {
  if (!isApiKeySet()) {
    return { results: MOCK_MOVIES.slice(0, 5) };
  }
  const titles = ['Inception', 'Interstellar', 'The Matrix', 'The Dark Knight', 'Pulp Fiction'];
  const results = await Promise.all(
    titles.map(async (t) => {
      try {
        const data = await fetchOMDB({ t });
        return normalizeMovieDetail(data);
      } catch {
        return null;
      }
    })
  );
  return { results: results.filter(Boolean) };
}
