import React, { useState } from 'react';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ClientMenuCard = ({ item }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(item);
        setAdded(true);
        
        // Resetear el estado después de 1.5 segundos
        setTimeout(() => {
            setAdded(false);
        }, 1500);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            {/* Imagen */}
            <div className="relative h-56 bg-gradient-to-br from-mana-cream to-mana-gold overflow-hidden">
                {item.imagen ? (
                    <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                            // Si la imagen falla al cargar, no mostrar nada especial
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl opacity-30">
                            {item.tipo === 'desayuno' && '🍳'}
                            {item.tipo === 'almuerzo' && '🍽️'}
                            {item.tipo === 'cena' && '🌙'}
                            {item.tipo === 'cafeteria' && '☕'}
                            {!['desayuno', 'almuerzo', 'cena', 'cafeteria'].includes(item.tipo) && '🍴'}
                        </div>
                    </div>
                )}

                {/* Badge de categoría */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-mana-brown uppercase">
                        {item.tipo}
                    </span>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-mana-brown mb-2 line-clamp-1">
                    {item.nombre}
                </h3>

                {item.descripcion && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.descripcion}
                    </p>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Precio</p>
                        <p className="text-2xl font-bold text-gray-800/80">
                            ${item.precio.toLocaleString('es-CO')}
                        </p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={added}
                        className={`flex items-center space-x-2 px-5 py-3 rounded-lg font-semibold transition-all transform active:scale-95 ${
                            added
                                ? 'bg-green-500 text-white'
                                : 'bg-mana-brown text-white hover:bg-mana-gold/30 hover:shadow-lg hover:-translate-y-0.5'
                        }`}
                    >
                        {added ? (
                            <>
                                <Check size={18} />
                                <span>Agregado</span>
                            </>
                        ) : (
                            <>
                                <Plus size={18} />
                                <span>Agregar</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientMenuCard;