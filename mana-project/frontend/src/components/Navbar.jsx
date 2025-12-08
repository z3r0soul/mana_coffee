import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ManaLogo from '../assets/LOGOFNUDE.jpeg';
import UserMenu from './UserMenu';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Menú', path: '/menu' },
        { name: 'Almuerzo del Día', path: '/LunchBuilder' },
        { name: 'Reservas', path: '/reservations' },
        { name: 'Ubicaciones', path: '/locations' },
        { name: 'Nosotros', path: '/Us' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Navbar */}
            <nav className="bg-mana-brown/80 shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Lado Izquierdo */}
                        <div className="flex items-center">
                            {/* Menú */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-mana-white p-3 hover:bg-mana-cream/30 rounded-lg transition-colors mr-4"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>

                            {/* Logo */}
                            <Link to="/" className="flex items-center space-x-4">
                                <img
                                    src={ManaLogo}
                                    alt="Mana Coffee Logo"
                                    className="w-14 h-14 object-contain bg-white rounded-full"
                                />
                                <div>
                                    <h1 className="text-xl font-bold text-mana-white ">Mana Restobar</h1>

                                </div>
                            </Link>
                        </div>

                        {/* Lado Derecho: Menú de Usuario */}
                        <UserMenu />
                    </div>
                </div>
            </nav>

            {/* Overlay para cerrar el sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Menú Lateral (Sidebar) */}
            <div
                className={`fixed top-0 left-0 h-full w-96 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header del menú lateral */}
                <div className="bg-gradient-to-r from-mana-brown/90 to-mana-brown px-5 py-5">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center space-x-5">
                            <img
                                src={ManaLogo}
                                alt="Mana Coffee Logo"
                                className="w-14 h-14 object-contain bg-white rounded-full p-0.5 p-mana-gold"
                            />
                            <div>
                                <h2 className="text-xl font-bold text-white">Mana Coffee</h2>
                                <p className="text-xs text-mana-gold">Sazón Natural</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white px-5 hover:bg-white rounded-lg transition-colors"
                            aria-label="Cerrar menú"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <p className="text-white text-sm italic">
                        "Comida casera con ingredientes frescos"
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
                                ? 'bg-mana-cream text-mana-brown border-mana-gold'
                                : 'text-gray-700 border-transparent hover:bg-gray-50 hover:border-mana-brown'
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