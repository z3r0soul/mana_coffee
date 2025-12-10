import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import ManaLogo from '../assets/LogoNude2.png';
import UserMenu from './UserMenu';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Menú', path: '/ClientsMenu' },
        { name: 'Almuerzo del Día', path: '/LunchBuilder' },
        { name: 'Reservas', path: '/reservations' },
        { name: 'Ubicaciones', path: '/locations' },
        { name: 'Nosotros', path: '/Us' }
    ];

    const isActive = (path) => location.pathname === path;

    // Detectar páginas específicas para forzar el fondo sólido
    const isAdminPage = location.pathname.startsWith('/admin');
    const isReservationsPage = location.pathname === '/reservations';
    const isLunchPage = location.pathname === '/LunchBuilder';

    // Detectar scroll para cambiar el fondo de la navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 
    const shouldHaveSolidBackground = isScrolled || isAdminPage || isReservationsPage || isLunchPage;

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <nav
                className={`
                    fixed top-0 left-0 right-0 z-40
                    transition-all duration-300 ease-in-out
                    ${shouldHaveSolidBackground
                        ? 'bg-[#6F4E37] shadow-lg' // Fondo sólido (Marrón café)
                        : 'bg-transparent' // Fondo transparente
                    }
                `}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20 md:h-24">

                        {/* Lado Izquierdo: Logo y Menú Mobile */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`
                                    lg:hidden p-2 rounded-lg transition-all
                                    ${shouldHaveSolidBackground
                                        ? 'text-white hover:bg-white/10'
                                        : 'text-[#6F4E37] bg-white/80 hover:bg-white' // Icono café con fondo claro en transparente
                                    }
                                `}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={32} /> : <Menu size={32} />}
                            </button>

                            <Link to="/" className="flex items-center gap-3 group">
                                {/* MODIFICACIÓN AQUÍ: 
                                    Cuando la barra es transparente, usamos bg-[#6F4E37] (café) 
                                    en lugar de bg-white/90.
                                */}
                                <img
                                    src={ManaLogo}
                                    alt="Mana Logo"
                                    className={`
                                        w-14 h-14 md:w-16 md:h-16 object-contain rounded-full transition-all
                                        ${shouldHaveSolidBackground
                                            ? 'bg-transparent' // Sin fondo si la barra ya es café
                                            : 'bg-[#6F4E37] shadow-lg p-1' // Fondo café circular con sombra y un pequeño padding
                                        }
                                    `}
                                />
                                <div className="hidden sm:block">
                                    <h1 className={`
                                        text-xl md:text-2xl font-bold transition-all
                                        ${shouldHaveSolidBackground
                                            ? 'text-[#F5F5DC]' // Beige claro cuando el fondo es sólido
                                            : 'text-white drop-shadow-lg'
                                        }
                                    `}>
                                        <span className="italic font-bold text-mana-gold">Mana</span> Restobar
                                    </h1>
                                </div>
                            </Link>
                        </div>

                        {/* Centro: Links de navegación (desktop) */}
                        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`
                                        px-3 py-2 rounded-lg font-medium transition-all
                                        text-base xl:text-lg
                                        ${isActive(link.path)
                                            ? shouldHaveSolidBackground
                                                ? 'bg-white/20 text-white'
                                                : 'bg-[#6F4E37] text-white shadow-md' // Activo en transparente: fondo café
                                            : shouldHaveSolidBackground
                                                ? 'text-white/80 hover:bg-white/10 hover:text-white'
                                                : 'text-white/90 hover:bg-[#6F4E37]/80 hover:text-white' // Hover en transparente
                                        }
                                    `}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Lado Derecho: CTA y Menú de Usuario */}
                        <div className="flex items-center gap-2 sm:gap-3">

                            {!isAdminPage && (
                                <Link
                                    to="/reservations"
                                    className="lg:hidden flex items-center p-3 rounded-full bg-[#E5B800] text-[#6F4E37] hover:bg-[#D4AC00] transition-colors shadow-md"
                                    aria-label="Hacer una reserva"
                                >
                                    <Calendar size={24} />
                                </Link>
                            )}

                            <UserMenu isScrolled={shouldHaveSolidBackground} />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Mobile */}
            <div
                className={`
                    fixed top-0 left-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-40
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="bg-gradient-to-r from-mana-brown/90 to-mana-brown px-5 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <img
                                src={ManaLogo}
                                alt="Mana Logo"
                                className="w-16 h-16 object-contain bg-white rounded-full p-1"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-white">Mana Restobar</h2>
                                <p className="text-sm text-mana-gold">Sazón Natural</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Cerrar menú"
                        >
                            <X size={28} />
                        </button>
                    </div>
                    <p className="text-white/90 text-base italic">
                        "Comida casera con ingredientes frescos"
                    </p>
                </div>

                <div className="py-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={handleLinkClick}
                            className={`
                                block px-6 py-4 text-lg font-medium transition-all border-l-4
                                ${isActive(link.path)
                                    ? 'bg-mana-cream text-mana-brown border-mana-brown'
                                    : 'text-gray-700 border-transparent hover:bg-gray-50 hover:border-mana-brown'
                                }
                            `}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t border-gray-200">
                    <p className="text-base font-semibold text-gray-700 mb-1">Horario de atención</p>
                    <p className="text-sm text-gray-500">
                        Lunes - Domingo: 7:30 AM - 9:00 PM
                    </p>
                </div>
            </div>
        </>
    );
}

export default Navbar;