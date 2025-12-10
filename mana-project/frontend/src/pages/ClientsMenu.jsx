import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Coffee, Utensils, Croissant, Loader2, Moon } from 'lucide-react';
import ClientMenuCard from '../components/ClientMenuCard';

const ClientsMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('todos');

    // Categorías definidas con sus iconos y etiquetas
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
                const response = await axios.get('http://localhost:4000/api/menu');
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    // Función para obtener items filtrados según la categoría activa
    const getFilteredItems = () => {
        if (activeCategory === 'todos') {
            return menuItems;
        }

        return menuItems.filter(item =>
            item.tipo?.toLowerCase() === activeCategory.toLowerCase()
        );
    };

    const filteredItems = getFilteredItems();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#FAFAFA]">
                <Loader2 className="w-12 h-12 text-mana-brown animate-spin" />
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

            {/* Navegación de Categorías */}
            <div className="sticky top-0 z-30 bg-white shadow-md py-4">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl min-w-[100px] transition-all duration-300 transform hover:scale-105 ${isActive
                                        ? 'bg-mana-brown text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-mana-cream'
                                        }`}
                                >
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-sm font-semibold whitespace-nowrap">
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Contador de resultados */}
            <div className="container mx-auto px-4 mt-6">
                <p className="text-gray-600 text-center">
                    Mostrando <span className="font-bold text-mana-brown">{filteredItems.length}</span> {filteredItems.length === 1 ? 'producto' : 'productos'}
                    {activeCategory !== 'todos' && (
                        <span> en <span className="font-semibold text-mana-gold">
                            {categories.find(c => c.id === activeCategory)?.label}
                        </span></span>
                    )}
                </p>
            </div>

            {/* Sección con Fondo de Collage */}
            <div className="relative mt-8 pb-20">
                {/* Fondo con la foto del collage */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
                    style={{ backgroundImage: "url('/src/assets/collage/collage.jpg')" }}
                >
                    {/* Overlay para suavizar la imagen */}
                    <div className="absolute inset-0 bg-black/10"></div>
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
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-600 mb-2">
                                No hay productos en esta categoría
                            </p>
                            <p className="text-gray-500">
                                Intenta con otra categoría
                            </p>
                            <button
                                onClick={() => setActiveCategory('todos')}
                                className="mt-6 bg-mana-brown text-white px-6 py-3 rounded-lg hover:bg-mana-gold transition-colors"
                            >
                                Ver todos los productos
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientsMenu;