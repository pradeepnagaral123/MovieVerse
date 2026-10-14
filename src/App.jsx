import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
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
import Lists from './pages/Lists';
import ListDetail from './pages/ListDetail';
import ComingSoon from './pages/ComingSoon';
import MovieVerseChat from './components/MovieVerseChat';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomeFeed />} />
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
        <Route path="/lists" element={<Lists />} />
        <Route path="/lists/:slug" element={<ListDetail />} />
        <Route
          path="/friends"
          element={
            <ComingSoon
              title="Friends"
              icon="group"
              description="Follow your favourite critics, share watchlists and compare taste with the people who love film as much as you do. The friends hub is on its way."
            />
          }
        />
        <Route
          path="/activity"
          element={
            <ComingSoon
              title="Activity"
              icon="history"
              description="A timeline of your logs, ratings and reviews — plus everything your circle has been watching. Activity tracking is still being built."
            />
          }
        />
        <Route
          path="/settings"
          element={
            <ComingSoon
              title="Settings"
              icon="settings"
              description="Account, appearance, notifications and privacy controls will live here. Settings are still being built."
            />
          }
        />
      </Routes>
      <MovieVerseChat />
    </Router>
  );
}

export default App;
