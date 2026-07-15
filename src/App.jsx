import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeFeed from './pages/HomeFeed';
import FilmDetail from './pages/FilmDetail';
import MovieDetail from './pages/MovieDetail';
import TVShows from './pages/TVShows';
import UserProfile from './pages/UserProfile';
import Watchlist from './pages/Watchlist';
import SearchResults from './pages/SearchResults';
import Community from './pages/Community';
import Polls from './pages/Polls';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeFeed />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/film/inception" element={<FilmDetail />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/polls" element={<Polls />} />
      </Routes>
    </Router>
  );
}

export default App;
