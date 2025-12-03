import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LunchBuilder from './pages/LunchBuilder';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> /* Home */
        <Route path="/LunchBuilder" element={<LunchBuilder />} /> /*Lunch */
      </Routes>
    </BrowserRouter>
  );
}

export default App;
