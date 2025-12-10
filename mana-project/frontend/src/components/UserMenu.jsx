import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, UserCircle } from 'lucide-react';
const API_URL = "/api/auth/logout";
const PROFILE_API = "/api/auth/profile"; // endpoint protegido que usa verificarToken en backend

function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Cargar usuario usando endpoint protegido (usa verificarToken en backend)
    useEffect(() => {
        loadUser();
    }, [location.pathname]);

    const loadUser = () => {
        // Intentamos obtener las credenciales desde el endpoint protegido.
        // El backend aplica `verificarToken` y responderá 401 si no hay sesión válida.
        (async () => {
            try {
                const resp = await fetch(PROFILE_API, {
                    method: 'GET',
                    credentials: 'include', // incluir cookies con token
                });

                if (resp.ok) {
                    const data = await resp.json();
                    setUser(data);
                    try { localStorage.setItem('user', JSON.stringify(data)); } catch (e) { }
                } else {
                    // No autenticado o error -> limpiar
                    setUser(null);
                    localStorage.removeItem('user');
                }
            } catch (err) {
                console.error('Error al obtener perfil:', err);
                setUser(null);
                localStorage.removeItem('user');
            }
        })();
    };

    // Cerrar menú al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event) {
            // Permitimos el clic en el botón del avatar, pero no fuera de él.
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await fetch(API_URL, {
                method: "POST",
                credentials: "include", // Incluir cookies
            });
            // limpiar estado local
            setUser(null);
            localStorage.removeItem('user');
            alert("Sesión cerrada");
            navigate('/');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }

    };

    return (
        <div className="w-full flex justify-end">
            {/* El div principal debe ser relative para que el botón y el menú
            se consideren dentro del mismo contenedor al detectar clics fuera */}
            <div className="relative" ref={menuRef}>
                {/* Botón del Avatar */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    // El ref debe ir en el botón o en un contenedor que incluya el menú,
                    // pero dado que el menú estará fijo, es mejor dejarlo en el botón si el menú es fijo, 
                    // o mantener el ref en el div principal para manejar el cierre al hacer clic fuera del botón.
                    // Para un modal fijo, la lógica de useRef y handleClickOutside es menos crítica en el posicionamiento.
                    // Ajustaremos el useRef para que solo el botón lo active.
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-mana-cream/10 transition-colors"
                    aria-label="Menú de usuario"
                >
                    <div className="w-10 h-10 bg-[#F5F5DC]/75 rounded-full flex items-center justify-center">
                        {user ? (
                            <span className="text-[#4E2A1E] font-bold text-lg">
                                {user.nombre?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        ) : (
                            <User className="text-[#D4A056]" size={20} />
                        )}
                    </div>

                    {user && (
                        <span className="hidden md:block text-mana-gold font-medium">
                            {user.nombre}
                        </span>
                    )}
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <>
                        {/* 1. Overlay (Fondo oscuro) */}
                        <div
                            className="fixed inset-0 bg-black/30 z-40"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Menú */}
                        <div
                            className={`
                                /* CLASES PARA CENTRAR Y FIJAR EN PANTALLA */
                                fixed 
                                top-1/2 
                                left-1/2 
                                transform 
                                -translate-x-1/2 
                                -translate-y-1/2
                                z-50 
                                bg-white 
                                rounded-lg 
                                py-2 
                                border 
                                border-gray-200 
                                shadow-2xl /* Sombra fuerte para efecto modal */
                                animate-fade-in
                                
                                /* TAMAÑO CONSISTENTE */
                                w-[90vw] /* Ocupa 90% del ancho del viewport */
                                max-w-sm  /* Limita el tamaño máximo, ideal para centrado */
                            `}
                        >
                            {user ? (
                                <>
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <p className="text-sm font-medium text-gray-900">
                                            {user.nombre} {user.apellido}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.email}
                                        </p>
                                    </div>

                                    <Link
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center space-x-3 px-4 py-3 hover:bg-mana-cream transition-colors"
                                    >
                                        <UserCircle className="text-mana-brown" size={20} />
                                        <span className="text-gray-700">Mi Perfil</span>
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                                    >
                                        <LogOut className="text-red-600" size={20} />
                                        <span className="text-red-600">Cerrar Sesión</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <p className="text-sm font-medium text-gray-900">
                                            ¡Bienvenido a Mana!
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Inicia sesión o regístrate
                                        </p>
                                    </div>

                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center mx-4 my-2 px-4 py-2 bg-mana-brown text-white rounded-lg hover:bg-mana-brown/80 transition-colors font-medium"
                                    >
                                        Iniciar Sesión
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center mx-4 mb-2 px-4 py-2 border-2 border-mana-brown text-mana-brown rounded-lg hover:bg-mana-cream/30 transition-colors font-medium"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserMenu;