import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home */}
        {/* <Route path="/LunchBuilder" element={<LunchBuilder />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
