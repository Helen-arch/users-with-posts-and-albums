import './App.css';
import { UserPosts } from './components/UserPosts';

function App() {
  return (
    <div className="section py-5">
    <UserPosts userId={11} />
  </div>
  );
}

export default App;
