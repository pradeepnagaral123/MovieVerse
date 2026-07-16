import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeFeed from './pages/HomeFeed';
import FilmDetail from './pages/FilmDetail';
import MovieDetail from './pages/MovieDetail';
import ActorDetail from './pages/ActorDetail';
import TVShows from './pages/TVShows';
import ShowDetail from './pages/ShowDetail';
import TVSearchResults from './pages/TVSearchResults';
import UserProfile from './pages/UserProfile';
import Watchlist from './pages/Watchlist';
import SearchResults from './pages/SearchResults';
import Community from './pages/Community';
import Polls from './pages/Polls';
import Recommendations from './pages/Recommendations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeFeed />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/tv/search" element={<TVSearchResults />} />
        <Route path="/tv/:id" element={<ShowDetail />} />
        <Route path="/film/inception" element={<FilmDetail />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/actor/:id" element={<ActorDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/polls" element={<Polls />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </Router>
  );
}

export default App;
