import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LunchBuilder from './pages/LunchBuilder';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Us from './pages/Us';
import Locations from './pages/Locations';
import ClientsMenu from './pages/ClientsMenu';
import Reservations from './pages/Reservations';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import CartButton from './components/CartButton';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home */}
          <Route path="/LunchBuilder" element={<LunchBuilder />} />
          {/* <Route path="/LunchBuilder" element={<LunchBuilder />} /> */}
          <Route path="/ClientsMenu" element={<ClientsMenu />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Us" element={<Us />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
        <Cart />
        <CartButton />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
