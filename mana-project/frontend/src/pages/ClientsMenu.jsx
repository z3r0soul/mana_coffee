import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Coffee, Utensils, Croissant, Loader2, Moon, Search, Clock, AlertTriangle, XCircle } from 'lucide-react';
import ClientMenuCard from '../components/ClientMenuCard';

const ClientsMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('todos');
    const [searchTerm, setSearchTerm] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    // Horarios de cada categoría (en minutos desde medianoche)
    const schedules = {
        desayuno: { start: 7 * 60 + 30, end: 10 * 60 + 40, label: 'Desayunos', hours: '7:30 AM - 10:40 AM' },
        almuerzo: { start: 11 * 60 + 45, end: 15 * 60, label: 'Almuerzos', hours: '11:45 AM - 3:00 PM' },
        cena: { start: 17 * 60, end: 21 * 60, label: 'Cenas', hours: '5:00 PM - 9:00 PM' },
        cafeteria: { start: 7 * 60 + 30, end: 21 * 60, label: 'Cafetería', hours: '7:30 AM - 9:00 PM' }, // Disponible todo el día
    };

    // Actualizar hora cada minuto
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    // Obtener minutos desde medianoche
    const getMinutesSinceMidnight = () => {
        return currentTime.getHours() * 60 + currentTime.getMinutes();
    };

    // Verificar estado del horario de una categoría
    const getCategoryStatus = (categoryId) => {
        if (categoryId === 'todos' || categoryId === 'cafeteria') {
            // Cafetería siempre disponible durante horario general
            const schedule = schedules.cafeteria;
            const now = getMinutesSinceMidnight();
            if (now < schedule.start || now >= schedule.end) {
                return { status: 'closed', message: 'Cerrado' };
            }
            return { status: 'open', message: null };
        }

        const schedule = schedules[categoryId];
        if (!schedule) return { status: 'open', message: null };

        const now = getMinutesSinceMidnight();
        const minutesUntilClose = schedule.end - now;
        const minutesUntilOpen = schedule.start - now;

        // Cerrado
        if (now < schedule.start || now >= schedule.end) {
            if (now < schedule.start) {
                return { 
                    status: 'closed', 
                    message: `Abre a las ${formatTime(schedule.start)}`,
                    nextOpen: formatTime(schedule.start)
                };
            }
            return { 
                status: 'closed', 
                message: 'Cerrado por hoy',
                nextOpen: null
            };
        }

        // Por cerrar (menos de 30 minutos)
        if (minutesUntilClose <= 30 && minutesUntilClose > 0) {
            return { 
                status: 'closing', 
                message: `¡Cierra en ${minutesUntilClose} min!`,
                minutesLeft: minutesUntilClose
            };
        }

        // Abierto
        return { status: 'open', message: null };
    };

    // Formatear minutos a hora legible
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
    };

    const categories = [
        { id: 'todos', label: 'Todos', icon: Utensils },
        { id: 'desayuno', label: 'Desayunos', icon: Coffee },
        { id: 'almuerzo', label: 'Almuerzos', icon: Utensils },
        { id: 'cena', label: 'Cenas', icon: Moon },
        { id: 'cafeteria', label: 'Cafetería', icon: Croissant },
    ];

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('/api/menu');
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const getFilteredItems = () => {
        return menuItems.filter(item => {
            const categoryMatch = activeCategory === 'todos' || item.tipo?.toLowerCase() === activeCategory.toLowerCase();
            const term = searchTerm.toLowerCase();
            const searchMatch =
                item.nombre.toLowerCase().includes(term) ||
                (item.descripcion && item.descripcion.toLowerCase().includes(term));

            return categoryMatch && searchMatch;
        });
    };

    const filteredItems = getFilteredItems();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#FAFAFA]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[#8C705F] animate-spin mx-auto mb-4" />
                    <p className="text-[#6B5D4D]">Cargando delicias...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Header / Hero */}
            <div className="bg-[#6B3E26]/80 text-white py-16 px-4 text-center relative overflow-hidden pt-32">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Nuestro Menú</h1>
                <p className="text-white/90 text-lg max-w-2xl mx-auto relative z-10">
                    Descubre los sabores que tenemos para ti, preparados con pasión y los mejores ingredientes.
                </p>
            </div>

            {/* Navegación y Búsqueda) */}
            <div className="bg-white/95 backdrop-blur-sm shadow-md py-6">
                <div className="container mx-auto px-4">

                    {/* 1. Categorías */}
                    <div className="flex justify-center gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            const status = getCategoryStatus(cat.id);

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveCategory(cat.id);
                                        setSearchTerm("");
                                    }}
                                    className={`relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl min-w-[90px] transition-all duration-300 transform hover:scale-105 ${isActive
                                        ? 'bg-[#8C705F] text-white shadow-lg scale-105'
                                        : status.status === 'closed' && cat.id !== 'todos'
                                            ? 'bg-gray-200 text-gray-400'
                                            : 'bg-gray-100 text-gray-500 hover:bg-[#F0EBE0] hover:text-[#6B5D4D]'
                                        }`}
                                >
                                    {/* Indicador de estado */}
                                    {cat.id !== 'todos' && (
                                        <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                            status.status === 'open' ? 'bg-green-500' :
                                            status.status === 'closing' ? 'bg-yellow-500 animate-pulse' :
                                            'bg-red-500'
                                        }`} />
                                    )}
                                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-xs font-semibold whitespace-nowrap">
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Banner de estado de horario */}
                    {activeCategory !== 'todos' && activeCategory !== 'cafeteria' && (() => {
                        const status = getCategoryStatus(activeCategory);
                        const schedule = schedules[activeCategory];
                        
                        if (status.status === 'closed') {
                            return (
                                <div className="max-w-2xl mx-auto mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                                    <div className="bg-red-100 p-2 rounded-full">
                                        <XCircle className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-red-700">
                                            {schedule.label} no disponible
                                        </p>
                                        <p className="text-sm text-red-600">
                                            Horario: {schedule.hours}
                                            {status.nextOpen && ` • Abre a las ${status.nextOpen}`}
                                        </p>
                                    </div>
                                </div>
                            );
                        }
                        
                        if (status.status === 'closing') {
                            return (
                                <div className="max-w-2xl mx-auto mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 animate-pulse">
                                    <div className="bg-amber-100 p-2 rounded-full">
                                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-amber-700">
                                            ¡{schedule.label} cierra pronto!
                                        </p>
                                        <p className="text-sm text-amber-600">
                                            Quedan {status.minutesLeft} minutos para ordenar • Hasta las {formatTime(schedule.end)}
                                        </p>
                                    </div>
                                    <Clock className="w-6 h-6 text-amber-500" />
                                </div>
                            );
                        }
                        
                        return (
                            <div className="max-w-2xl mx-auto mt-4 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <p className="text-sm text-green-700">
                                    <span className="font-semibold">{schedule.label}</span> disponible • {schedule.hours}
                                </p>
                            </div>
                        );
                    })()}

                    {/* 2. Barra de Búsqueda */}
                    <div className="max-w-md mx-auto mt-4 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-[#8C705F]" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-[#E8E4D9] rounded-full leading-5 bg-[#FAF9F6] placeholder-[#9A8C7D] focus:outline-none focus:placeholder-gray-400 focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] transition duration-150 ease-in-out shadow-sm text-[#4A4036]"
                            placeholder="Buscar plato, ingrediente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {/* Contador de resultados */}
            <div className="container mx-auto px-4 mt-6">
                <p className="text-[#6B5D4D] text-center text-sm">
                    Mostrando <span className="font-bold text-[#8C705F]">{filteredItems.length}</span> {filteredItems.length === 1 ? 'producto' : 'productos'}
                    {activeCategory !== 'todos' && (
                        <span> en <span className="font-semibold text-[#8B7355]">
                            {categories.find(c => c.id === activeCategory)?.label}
                        </span></span>
                    )}
                </p>
            </div>

            {/* Sección con Fondo de Collage */}
            <div className="relative mt-6 pb-20">
                {/* Fondo con la foto del collage */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none fixed-bg"
                    style={{ backgroundImage: "url('/src/assets/collage/collage.jpg')" }}
                >
                    <div className="absolute inset-0 bg-white/40"></div>
                </div>

                {/* Grid de Productos */}
                <div className="container mx-auto px-4 relative z-10">
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredItems.map((item) => {
                                // Verificar disponibilidad del item según su tipo
                                const itemType = item.tipo?.toLowerCase();
                                const itemStatus = getCategoryStatus(itemType);
                                const schedule = schedules[itemType];
                                const isAvailable = itemStatus.status !== 'closed';
                                const closedMessage = !isAvailable && schedule 
                                    ? `Disponible: ${schedule.hours}` 
                                    : '';

                                return (
                                    <div
                                        key={item.id}
                                        className="animate-fade-in"
                                        style={{ animationDelay: `${filteredItems.indexOf(item) * 0.05}s` }}
                                    >
                                        <ClientMenuCard 
                                            item={item} 
                                            isAvailable={isAvailable}
                                            closedMessage={closedMessage}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl mx-4 border border-[#E8E4D9]">
                            <div className="w-16 h-16 bg-[#F0EBE0] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-[#8C705F]" />
                            </div>
                            <p className="text-xl text-[#6B5D4D] mb-2 font-medium">
                                No encontramos "{searchTerm}"
                            </p>
                            <p className="text-[#9A8C7D] text-sm">
                                Intenta con otra palabra o cambia de categoría.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setActiveCategory('todos');
                                }}
                                className="mt-6 bg-[#8C705F] text-white px-6 py-2.5 rounded-full hover:bg-[#6F4E37] transition-all shadow-md active:scale-95 text-sm font-bold"
                            >
                                Ver todo el menú
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientsMenu;