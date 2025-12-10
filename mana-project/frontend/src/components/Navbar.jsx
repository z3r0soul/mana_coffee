import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import ManaLogo from '../assets/LOGOFNUDE.jpeg';
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
    //Validacion para detectar si se esta en la pagina de reservas
    const isReservationsPage = location.pathname === '/reservations';
    // Detectar si estamos en Arma tu Almuerzo
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
                    <div className="flex items-center justify-between h-20">

                        {/* Lado Izquierdo: Logo y Menú Mobile */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`
                                    lg:hidden p-2 rounded-lg transition-all
                                    ${shouldHaveSolidBackground
                                        ? 'text-white hover:bg-white/10'
                                        : 'text-white hover:bg-black/20'
                                    }
                                `}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>

                            <Link to="/" className="flex items-center gap-3">
                                <img
                                    src={ManaLogo}
                                    alt="Mana Logo"
                                    className={`
                                        w-12 h-12 object-contain rounded-full transition-all
                                        ${shouldHaveSolidBackground
                                            ? 'bg-white'
                                            : 'bg-white/90 shadow-lg'
                                        }
                                    `}
                                />
                                <div className="hidden sm:block">
                                    <h1 className={`
                                        text-lg font-bold transition-all
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
                                        text-sm xl:text-base
                                        ${isActive(link.path)
                                            ? shouldHaveSolidBackground
                                                ? 'bg-white/20 text-white'
                                                : 'bg-white/30 text-white backdrop-blur-sm'
                                            : shouldHaveSolidBackground
                                                ? 'text-white/80 hover:bg-white/10 hover:text-white'
                                                : 'text-white/90 hover:bg-white/20 hover:text-white'
                                        }
                                    `}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Lado Derecho: CTA y Menú de Usuario */}
                        <div className="flex items-center gap-1 sm:gap-2">

                            {!isAdminPage && (
                                <Link
                                    to="/reservations"
                                    className="lg:hidden flex items-center p-2 rounded-full bg-[#E5B800] text-[#6F4E37] hover:bg-[#D4AC00] transition-colors shadow-md"
                                    aria-label="Hacer una reserva"
                                >
                                    <Calendar size={20} />
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
                <div className="bg-gradient-to-r from-mana-brown/90 to-mana-brown px-5 py-5">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-4">
                            <img
                                src={ManaLogo}
                                alt="Mana Logo"
                                className="w-12 h-12 object-contain bg-white rounded-full"
                            />
                            <div>
                                <h2 className="text-xl font-bold text-white">Mana Restobar</h2>
                                <p className="text-xs text-mana-gold">Sazón Natural</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Cerrar menú"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <p className="text-white/90 text-sm italic">
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
                                block px-6 py-4 font-medium transition-all border-l-4
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
                    <p className="text-sm font-semibold text-gray-700 mb-1">Horario de atención</p>
                    <p className="text-xs text-gray-500">
                        Lunes - Domingo: 7:30 AM - 9:00 PM
                    </p>
                </div>
            </div>
        </>
    );
}

export default Navbar;