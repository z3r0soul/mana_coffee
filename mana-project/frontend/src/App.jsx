import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import LunchBuilder from './pages/LunchBuilder';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home */}
        <Route path="/LunchBuilder" element={<LunchBuilder />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
