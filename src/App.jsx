import { Routes, Route } from 'react-router-dom';
import Album from './pages/Album';
import Home from './Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/album" element={<Album />} />
    </Routes>
  );
}

export default App;
