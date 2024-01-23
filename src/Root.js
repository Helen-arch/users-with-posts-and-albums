import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';
import App from './App';
import { UsersList } from './components/UsersList';
import { UserPosts } from './components/UserPosts';
import { AlbumsList } from './components/AlbumsList';
import { Album } from './components/Album';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<UsersList />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="posts">
          <Route path=":userId"element={<UserPosts />}/>
        </Route>
        <Route path="albums">
          <Route path=":userId" element={<AlbumsList />} />
          <Route path=":albumId" element={<Album />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);