import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Coffee, Utensils, Croissant, Loader2, Moon, Search } from 'lucide-react';
import ClientMenuCard from '../components/ClientMenuCard';

const ClientsMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('todos');
    const [searchTerm, setSearchTerm] = useState("");

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

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveCategory(cat.id);
                                        setSearchTerm("");
                                    }}
                                    className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl min-w-[90px] transition-all duration-300 transform hover:scale-105 ${isActive
                                        ? 'bg-[#8C705F] text-white shadow-lg scale-105'
                                        : 'bg-gray-100 text-gray-500 hover:bg-[#F0EBE0] hover:text-[#6B5D4D]'
                                        }`}
                                >
                                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-xs font-semibold whitespace-nowrap">
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

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
                            {filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${filteredItems.indexOf(item) * 0.05}s` }}
                                >
                                    <ClientMenuCard item={item} />
                                </div>
                            ))}
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