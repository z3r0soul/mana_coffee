import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="mt-20 p-10">
        <h1 className="text-3xl font-bold text-mana-brown">Probando el Navbar</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
