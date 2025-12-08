import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import LunchBuilder from './pages/LunchBuilder';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Us from './pages/Us';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home */}
        <Route path="/LunchBuilder" element={<LunchBuilder />} />
        {/* <Route path="/LunchBuilder" element={<LunchBuilder />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Us" element={<Us />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
