import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ManaLogo from '../assets/LOGOFNUDE.jpeg';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    {/*Arreglo para manejar los enlaces del menu segun el pathing propuesto*/ }
    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Menú', path: '/menu' },
        { name: 'Almuerzo del Día', path: '/LunchBuilder' },
        { name: 'Reservas', path: '/reservations' },
        { name: 'Ubicaciones', path: '/locations' },
        { name: 'Nosotros', path: '/about' },
        { name: 'Contacto', path: '/contact' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-start h-20">
                        {/* Menú lateral*/}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-mana-brown p-2 hover:bg-mana-cream rounded-lg transition-colors mr-4"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>

                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-5">
                            <img src={ManaLogo} alt="Mana Coffee Logo" className="w-14 h-14 object-contain bg-white rounded-full p-0" />
                            <div>
                                <h1 className="text-2xl font-bold text-mana-brown">Mana</h1>
                                <p className="text-xs text-gray-600">Sazón Natural</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Overlay oscuro cuando el menú está abierto */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Menú Lateral (Sidebar) */}
            <div
                className={`fixed top-0 left-0 h-full w-96 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header del menú lateral*/}
                <div className="bg-gradient-to-r from-mana-brown to-mana-gold p-5">

                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center space-x-5">
                            <img src={ManaLogo} alt="Mana Coffee Logo" className="w-12 h-12 object-contain bg-white rounded-full p-1" />
                            <div>
                                <h2 className="text-xl font-bold text-white">Mana Coffee</h2>
                                <p className="text-xs text-white/80">Sazón Natural</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
                            aria-label="Cerrar menú"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <p className="text-white/90 text-sm">
                        Comida casera con ingredientes frescos
                    </p>
                </div>

                {/* Enlaces del menú */}
                <div className="py-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-6 py-4 font-medium transition-all border-l-4 ${isActive(link.path)
                                ? 'bg-mana-brown text-mana-cream border-mana-brown hover:border-black/70'
                                : 'text-gray-700 border-transparent hover:bg-gray-50 hover:border-black/70'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Footer del menú */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Horario de atención</p>
                    <p className="text-xs text-gray-500">
                        Lun - Dom: 7:30 AM - 9:00 PM
                    </p>
                </div>
            </div>
        </>
    );
}

export default Navbar;