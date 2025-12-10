import { useState, useEffect } from 'react';
import { Check, Plus, Minus, ShoppingCart, Clock, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO, SOCIAL_MEDIA } from '../utils/constants';
import imgTest from '../assets/FOTO3.jpeg';

function LunchBuilder() {
    const [showImageModal, setShowImageModal] = useState(false);

    // Verificar si está en horario permitido (11:45 AM - 3:00 PM)
    const isWithinOrderTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hours * 60 + minutes; // Convertir a minutos desde medianoche
        
        const startTime = 11 * 60 + 45; // 11:45 AM
        const endTime = 15 * 60; // 3:00 PM
        
        return currentTime >= startTime && currentTime <= endTime;
    };

    const dailyMenu = {
        date: new Date().toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        basePrice: 14000,
        imageUrl: imgTest, /*TESTEO DE PRECIOS*/
        mainDishes: [
            { id: 'main1', name: 'Pechuga a la Plancha', price: 0 },
            { id: 'main2', name: 'Carne Asada', price: 2000 },
            { id: 'main3', name: 'Pescado Frito', price: 3000 },
            { id: 'main4', name: 'Pollo Guisado', price: 0 }
        ],
        sideDishes: [
            { id: 'side1', name: 'Papa Francesa', price: 0 },
            { id: 'side2', name: 'Plátano Maduro', price: 0 },
            { id: 'side3', name: 'Yuca Frita', price: 1000 },
            { id: 'side4', name: 'Ensalada', price: 0 },
            { id: 'side5', name: 'Patacón', price: 1500 }
        ],
        soups: [
            { id: 'soup1', name: 'Sopa de Verduras', price: 0 },
            { id: 'soup2', name: 'Sancocho', price: 1000 },
            { id: 'soup3', name: 'Ajiaco', price: 1500 }
        ],
        juices: [
            { id: 'juice1', name: 'Limonada Natural', price: 0 },
            { id: 'juice2', name: 'Jugo de Mora', price: 500 },
            { id: 'juice3', name: 'Jugo de Mango', price: 500 },
            { id: 'juice4', name: 'Jugo de Lulo', price: 500 }
        ]
    };

    // Estado del pedido
    const [order, setOrder] = useState({
        mainDish: null,
        sideDishes: [],
        soup: null,
        juice: null,
        includeSoup: true,
        includeJuice: true
    });

    // Datos del cliente
    const [customerData, setCustomerData] = useState({
        name: '',
        phone: ''
    });

    // Calcular precio total
    const calculateTotal = () => {
        let total = dailyMenu.basePrice;

        if (order.mainDish) {
            const main = dailyMenu.mainDishes.find(d => d.id === order.mainDish);
            total += main?.price || 0;
        }

        order.sideDishes.forEach(sideId => {
            const side = dailyMenu.sideDishes.find(d => d.id === sideId);
            total += side?.price || 0;
        });

        if (order.soup && order.includeSoup) {
            const soup = dailyMenu.soups.find(s => s.id === order.soup);
            total += soup?.price || 0;
        }

        if (order.juice && order.includeJuice) {
            const juice = dailyMenu.juices.find(j => j.id === order.juice);
            total += juice?.price || 0;
        }

        return total;
    };

    const totalPrice = calculateTotal();

    // Manejar selección de plato principal
    const selectMainDish = (dishId) => {
        setOrder({ ...order, mainDish: dishId });
    };

    // Manejar selección de acompañamientos (múltiple)
    const toggleSideDish = (dishId) => {
        if (order.sideDishes.includes(dishId)) {
            setOrder({
                ...order,
                sideDishes: order.sideDishes.filter(id => id !== dishId)
            });
        } else if (order.sideDishes.length < 2) {
            setOrder({
                ...order,
                sideDishes: [...order.sideDishes, dishId]
            });
        }
    };

    // Validar formulario
    const isFormValid = () => {
        return (
            customerData.name.trim() !== '' &&
            customerData.phone.trim() !== '' &&
            order.mainDish !== null
        );
    };

    // Enviar pedido por WhatsApp
    const sendOrder = () => {
        if (!isFormValid()) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        const mainDishName = dailyMenu.mainDishes.find(d => d.id === order.mainDish)?.name;
        const sideDishNames = order.sideDishes
            .map(id => dailyMenu.sideDishes.find(d => d.id === id)?.name)
            .join(', ');
        const soupName = order.soup && order.includeSoup
            ? dailyMenu.soups.find(s => s.id === order.soup)?.name
            : 'Sin sopa';
        const juiceName = order.juice && order.includeJuice
            ? dailyMenu.juices.find(j => j.id === order.juice)?.name
            : 'Sin jugo';

        const message = `
*PEDIDO DE ALMUERZO - MANA*

*Fecha:* ${dailyMenu.date}

*Cliente:*
- Nombre: ${customerData.name}
- Teléfono: ${customerData.phone}

*Mi Almuerzo:*
- Plato Principal: ${mainDishName}
- Acompañamientos: ${sideDishNames || 'Ninguno'}
- Sopa: ${soupName}
- Jugo: ${juiceName}

💰 *Total: $${totalPrice.toLocaleString('es-CO')}*

✅ Confirmaré 2 horas antes de la entrega.
    `.trim();

        const whatsappUrl = `${SOCIAL_MEDIA.whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-mana-brown text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Arma Tu Almuerzo
                        </h1>
                        <p className="text-xl text-white/90 mb-2">
                            {dailyMenu.date}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white/90">
                            <Clock size={20} />
                            <span>Disponible de {RESTAURANT_INFO.schedule.almuerzo.start} a {RESTAURANT_INFO.schedule.almuerzo.end}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Formulario de armado */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Alerta de horario */}
                            {!isWithinOrderTime() && (
                                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 shadow-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <AlertCircle className="text-red-600" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-red-800 mb-2">
                                                Fuera de Horario de Pedidos
                                            </h3>
                                            <p className="text-red-700">
                                                Los pedidos de almuerzo solo están disponibles de <strong>11:45 AM a 3:00 PM</strong>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Imagen del día */}
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={dailyMenu.imageUrl}
                                    alt="Almuerzo del día"
                                    onClick={() => setShowImageModal(true)}
                                    className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition"
                                />
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-mana-brown mb-2">
                                        Menú Ejecutivo del Día
                                    </h3>
                                    <p className="text-gray-600">
                                        Precio base: <span className="font-bold text-mana-brown text-xl">${dailyMenu.basePrice.toLocaleString('es-CO')}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Haz clic en la imagen para verla completa
                                    </p>
                                </div>
                            </div>

                            {/* Plato Principal */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-mana-brown mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-mana-gold text-white rounded-full flex items-center justify-center font-bold">1</span>
                                    Elige tu Plato Principal *
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {dailyMenu.mainDishes.map(dish => (
                                        <button
                                            key={dish.id}
                                            onClick={() => selectMainDish(dish.id)}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${order.mainDish === dish.id
                                                ? 'border-mana-gold bg-mana-cream'
                                                : 'border-gray-200 hover:border-mana-brown'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800">{dish.name}</p>
                                                    {dish.price > 0 && (
                                                        <p className="text-sm text-mana-gold font-medium">+${dish.price.toLocaleString('es-CO')}</p>
                                                    )}
                                                </div>
                                                {order.mainDish === dish.id && (
                                                    <Check className="text-mana-gold flex-shrink-0" size={24} />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Acompañamientos */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-mana-brown mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-mana-gold text-white rounded-full flex items-center justify-center font-bold">2</span>
                                    Elige tus Acompañamientos (máx. 2)
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {dailyMenu.sideDishes.map(dish => (
                                        <button
                                            key={dish.id}
                                            onClick={() => toggleSideDish(dish.id)}
                                            disabled={!order.sideDishes.includes(dish.id) && order.sideDishes.length >= 2}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${order.sideDishes.includes(dish.id)
                                                ? 'border-mana-gold bg-mana-cream'
                                                : order.sideDishes.length >= 2
                                                    ? 'border-gray-200 opacity-50 cursor-not-allowed'
                                                    : 'border-gray-200 hover:border-mana-brown'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800">{dish.name}</p>
                                                    {dish.price > 0 && (
                                                        <p className="text-sm text-mana-gold font-medium">+${dish.price.toLocaleString('es-CO')}</p>
                                                    )}
                                                </div>
                                                {order.sideDishes.includes(dish.id) && (
                                                    <Check className="text-mana-gold flex-shrink-0" size={24} />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-3">
                                    Seleccionados: {order.sideDishes.length}/2
                                </p>
                            </div>

                            {/* Sopa */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-mana-brown flex items-center gap-2">
                                        <span className="w-8 h-8 bg-mana-gold text-white rounded-full flex items-center justify-center font-bold">3</span>
                                        Sopa
                                    </h3>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={order.includeSoup}
                                            onChange={(e) => setOrder({ ...order, includeSoup: e.target.checked })}
                                            className="w-5 h-5 text-mana-gold rounded"
                                        />
                                        <span className="text-sm text-gray-600">Incluir sopa</span>
                                    </label>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {dailyMenu.soups.map(soup => (
                                        <button
                                            key={soup.id}
                                            onClick={() => setOrder({ ...order, soup: soup.id })}
                                            disabled={!order.includeSoup}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${!order.includeSoup
                                                ? 'opacity-50 cursor-not-allowed border-gray-200'
                                                : order.soup === soup.id
                                                    ? 'border-mana-gold bg-mana-cream'
                                                    : 'border-gray-200 hover:border-mana-brown'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800">{soup.name}</p>
                                                    {soup.price > 0 && (
                                                        <p className="text-sm text-mana-gold font-medium">+${soup.price.toLocaleString('es-CO')}</p>
                                                    )}
                                                </div>
                                                {order.soup === soup.id && order.includeSoup && (
                                                    <Check className="text-mana-gold flex-shrink-0" size={24} />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Jugo */}
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-mana-brown flex items-center gap-2">
                                        <span className="w-8 h-8 bg-mana-gold text-white rounded-full flex items-center justify-center font-bold">4</span>
                                        Jugo
                                    </h3>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={order.includeJuice}
                                            onChange={(e) => setOrder({ ...order, includeJuice: e.target.checked })}
                                            className="w-5 h-5 text-mana-gold rounded"
                                        />
                                        <span className="text-sm text-gray-600">Incluir jugo</span>
                                    </label>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {dailyMenu.juices.map(juice => (
                                        <button
                                            key={juice.id}
                                            onClick={() => setOrder({ ...order, juice: juice.id })}
                                            disabled={!order.includeJuice}
                                            className={`p-4 rounded-lg border-2 text-left transition-all ${!order.includeJuice
                                                ? 'opacity-50 cursor-not-allowed border-gray-200'
                                                : order.juice === juice.id
                                                    ? 'border-mana-gold bg-mana-cream'
                                                    : 'border-gray-200 hover:border-mana-brown'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800">{juice.name}</p>
                                                    {juice.price > 0 && (
                                                        <p className="text-sm text-mana-gold font-medium">+${juice.price.toLocaleString('es-CO')}</p>
                                                    )}
                                                </div>
                                                {order.juice === juice.id && order.includeJuice && (
                                                    <Check className="text-mana-gold flex-shrink-0" size={24} />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Resumen del Pedido */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
                                <h3 className="text-2xl font-bold text-mana-brown mb-6">
                                    Resumen del Pedido
                                </h3>

                                {/* Datos del Cliente */}
                                <div className="mb-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tu Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            value={customerData.name}
                                            onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                                            placeholder="Ej: Santiago"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mana-gold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Teléfono *
                                        </label>
                                        <input
                                            type="tel"
                                            value={customerData.phone}
                                            onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                                            placeholder="Ej: 3001234567"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mana-gold"
                                        />
                                    </div>
                                </div>

                                {/* Detalles del Pedido */}
                                <div className="border-t border-gray-200 pt-6 mb-6">
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Precio base</span>
                                            <span className="font-medium">${dailyMenu.basePrice.toLocaleString('es-CO')}</span>
                                        </div>
                                        {order.mainDish && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Plato principal</span>
                                                <span className="font-medium">
                                                    ${(dailyMenu.mainDishes.find(d => d.id === order.mainDish)?.price || 0).toLocaleString('es-CO')}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="bg-mana-cream rounded-lg p-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-800">Total</span>
                                        <span className="text-3xl font-bold text-mana-gold">
                                            ${totalPrice.toLocaleString('es-CO')}
                                        </span>
                                    </div>
                                </div>

                                {/* Alerta de confirmación */}
                                

                                {/* Botón de Enviar */}
                                <button
                                    onClick={sendOrder}
                                    disabled={!isFormValid() || !isWithinOrderTime()}
                                    className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${isFormValid() && isWithinOrderTime()
                                        ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg active:scale-95'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <ShoppingCart size={24} />
                                    Ordenar
                                </button>

                                {!isFormValid() && (
                                    <p className="text-sm text-red-500 text-center mt-3">
                                        Completa los campos requeridos (*)
                                    </p>
                                )}
                                {!isWithinOrderTime() && (
                                    <p className="text-sm text-red-500 text-center mt-3">
                                        Horario de pedidos: 11:45 AM - 3:00 PM
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Imagen Completa */}
            {showImageModal && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowImageModal(false)}
                >
                    <div className="relative max-w-4xl w-full">
                        <button
                            onClick={() => setShowImageModal(false)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 text-lg font-bold"
                        >
                            ✕ Cerrar
                        </button>
                        <img
                            src={dailyMenu.imageUrl}
                            alt="Almuerzo del día - Vista completa"
                            className="w-full h-auto rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default LunchBuilder;

