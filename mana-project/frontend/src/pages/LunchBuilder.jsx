import { useState } from 'react';
import { Check, Clock, AlertCircle, ShoppingCart, Coffee, Soup } from 'lucide-react';
import { RESTAURANT_INFO, SOCIAL_MEDIA } from '../utils/constants';
import imgTest from '../assets/FOTO3.jpeg';
import { useEffect } from 'react';
import axios from 'axios';

function LunchBuilder() {
    const [showImageModal, setShowImageModal] = useState(false);
    const [lunchImage, setLunchImage] = useState(imgTest); // Imagen por defecto

    // Verificar si está en horario permitido (11:45 AM - 3:00 PM)
    const isWithinOrderTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hours * 60 + minutes; // Convertir a minutos desde medianoche

        const startTime = 11 * 60 + 45; // 0 11*60
        const endTime = 15 * 60; // 24*60 

        return currentTime >= startTime && currentTime <= endTime;
    };

    // Cargar imagen del almuerzo desde la base de datos
    useEffect(() => {
        const fetchLunchImage = async () => {
            try {
                const response = await axios.get('/api/lunch/today');
                if (response.data.imageUrl) {
                    setLunchImage(response.data.imageUrl);
                }
            } catch (error) {
                console.error('Error al cargar imagen del almuerzo:', error);
                // Mantener imagen por defecto si hay error
            }
        };

        fetchLunchImage();
    }, []);

    const dailyMenu = {
        date: new Date().toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        basePrice: 14000,
        imageUrl: lunchImage,
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

    const selectMainDish = (dishId) => {
        setOrder({ ...order, mainDish: dishId });
    };

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

    const isFormValid = () => {
        return (
            customerData.name.trim() !== '' &&
            customerData.phone.trim() !== '' &&
            order.mainDish !== null
        );
    };

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

*Total: $${totalPrice.toLocaleString('es-CO')}*

Confirmaré 2 horas antes de la entrega.
    `.trim();

        const whatsappUrl = `${SOCIAL_MEDIA.whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-12">

            {/* Header / Hero */}
            <div className="bg-[#8C705F] text-white py-12 px-4 rounded-[2.5rem] shadow-xl relative overflow-hidden mx-4">
                <div className="absolute inset-0 bg-black/10"></div>

                <div className="container mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
                            Arma Tu Almuerzo
                        </h1>
                        <p className="text-xl text-[#F0EBE0] mb-4 capitalize font-medium">
                            {dailyMenu.date}
                        </p>
                        <div className="inline-flex items-center gap-2 bg-[#FDFBF7]/20 backdrop-blur-md px-4 py-2 rounded-full text-white border border-white/20">
                            <Clock size={18} />
                            <span className="text-sm font-medium">Disponible de {RESTAURANT_INFO.schedule.almuerzo.start} a {RESTAURANT_INFO.schedule.almuerzo.end}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* COLUMNA IZQUIERDA: Formulario de selección */}
                        <div className="lg:col-span-2 space-y-8">

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
                            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#E8E4D9]">
                                <img
                                    src={dailyMenu.imageUrl}
                                    alt="Almuerzo del día"
                                    className="w-full h-128 object-cover"
                                />
                                <div className="p-6 bg-white">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold text-[#6F4E37]">
                                                Menú Ejecutivo
                                            </h3>
                                            <p className="text-[#8C705F]">Sazón casera y natural</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-[#9A8C7D]">Precio base</p>
                                            <span className="font-bold text-[#8B7355] text-2xl">${dailyMenu.basePrice.toLocaleString('es-CO')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 1. Plato Principal */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-[#E8E4D9]">
                                <h3 className="text-xl font-bold text-[#6F4E37] mb-6 flex items-center gap-3 border-b border-[#E8E4D9] pb-4">
                                    <span className="w-8 h-8 bg-[#8B7355] text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                                    Elige tu Plato Principal <span className="text-red-400 text-sm">*</span>
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {dailyMenu.mainDishes.map(dish => (
                                        <button
                                            key={dish.id}
                                            onClick={() => selectMainDish(dish.id)}
                                            className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 group ${order.mainDish === dish.id
                                                ? 'border-[#8B7355] bg-[#F0EBE0] shadow-sm'
                                                : 'border-[#E8E4D9] bg-white hover:border-[#8B7355]/50'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className={`font-semibold ${order.mainDish === dish.id ? 'text-[#6F4E37]' : 'text-gray-700'}`}>{dish.name}</p>
                                                    {dish.price > 0 && (
                                                        <p className="text-sm text-[#8B7355] font-medium mt-1">+${dish.price.toLocaleString('es-CO')}</p>
                                                    )}
                                                </div>
                                                {order.mainDish === dish.id && (
                                                    <div className="w-6 h-6 bg-[#8B7355] rounded-full flex items-center justify-center text-white">
                                                        <Check size={14} />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Acompañamientos */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-[#E8E4D9]">
                                <h3 className="text-xl font-bold text-[#6F4E37] mb-6 flex items-center gap-3 border-b border-[#E8E4D9] pb-4">
                                    <span className="w-8 h-8 bg-[#8B7355] text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                                    Acompañamientos <span className="text-sm font-normal text-[#8C705F]">(Máximo 2)</span>
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {dailyMenu.sideDishes.map(dish => (
                                        <button
                                            key={dish.id}
                                            onClick={() => toggleSideDish(dish.id)}
                                            disabled={!order.sideDishes.includes(dish.id) && order.sideDishes.length >= 2}
                                            className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${order.sideDishes.includes(dish.id)
                                                ? 'border-[#8B7355] bg-[#F0EBE0] shadow-sm'
                                                : order.sideDishes.length >= 2
                                                    ? 'border-[#E8E4D9] bg-gray-50 opacity-50 cursor-not-allowed'
                                                    : 'border-[#E8E4D9] bg-white hover:border-[#8B7355]/50'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className={`font-semibold ${order.sideDishes.includes(dish.id) ? 'text-[#6F4E37]' : 'text-gray-700'}`}>{dish.name}</p>
                                                    {dish.price > 0 && (
                                                        <p className="text-sm text-[#8B7355] font-medium mt-1">+${dish.price.toLocaleString('es-CO')}</p>
                                                    )}
                                                </div>
                                                {order.sideDishes.includes(dish.id) && (
                                                    <div className="w-6 h-6 bg-[#8B7355] rounded-full flex items-center justify-center text-white">
                                                        <Check size={14} />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm text-[#9A8C7D] mt-4 text-right">
                                    Seleccionados: {order.sideDishes.length}/2
                                </p>
                            </div>

                            {/* 3. Sopa & Jugo (Grid) */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Sopa */}
                                <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#E8E4D9]">
                                    <div className="flex items-center justify-between mb-4 border-b border-[#E8E4D9] pb-3">
                                        <h3 className="text-lg font-bold text-[#6F4E37] flex items-center gap-2">
                                            <Soup size={20} className="text-[#8B7355]" /> Sopa
                                        </h3>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={order.includeSoup} onChange={(e) => setOrder({ ...order, includeSoup: e.target.checked })} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B7355]"></div>
                                        </label>
                                    </div>
                                    <div className="space-y-3">
                                        {dailyMenu.soups.map(soup => (
                                            <button
                                                key={soup.id}
                                                onClick={() => setOrder({ ...order, soup: soup.id })}
                                                disabled={!order.includeSoup}
                                                className={`w-full p-3 rounded-xl border text-left transition-all flex justify-between items-center ${!order.includeSoup
                                                    ? 'opacity-40 cursor-not-allowed border-gray-100'
                                                    : order.soup === soup.id
                                                        ? 'border-[#8B7355] bg-[#F0EBE0]'
                                                        : 'border-[#E8E4D9] hover:bg-[#FAF9F6]'
                                                    }`}
                                            >
                                                <span className="text-sm font-medium text-[#6F4E37]">{soup.name}</span>
                                                {soup.price > 0 && <span className="text-xs text-[#8B7355] font-bold">+${soup.price}</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Jugo */}
                                <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#E8E4D9]">
                                    <div className="flex items-center justify-between mb-4 border-b border-[#E8E4D9] pb-3">
                                        <h3 className="text-lg font-bold text-[#6F4E37] flex items-center gap-2">
                                            <Coffee size={20} className="text-[#8B7355]" /> Jugo
                                        </h3>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={order.includeJuice} onChange={(e) => setOrder({ ...order, includeJuice: e.target.checked })} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B7355]"></div>
                                        </label>
                                    </div>
                                    <div className="space-y-3">
                                        {dailyMenu.juices.map(juice => (
                                            <button
                                                key={juice.id}
                                                onClick={() => setOrder({ ...order, juice: juice.id })}
                                                disabled={!order.includeJuice}
                                                className={`w-full p-3 rounded-xl border text-left transition-all flex justify-between items-center ${!order.includeJuice
                                                    ? 'opacity-40 cursor-not-allowed border-gray-100'
                                                    : order.juice === juice.id
                                                        ? 'border-[#8B7355] bg-[#F0EBE0]'
                                                        : 'border-[#E8E4D9] hover:bg-[#FAF9F6]'
                                                    }`}
                                            >
                                                <span className="text-sm font-medium text-[#6F4E37]">{juice.name}</span>
                                                {juice.price > 0 && <span className="text-xs text-[#8B7355] font-bold">+${juice.price}</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* COLUMNA DERECHA: Resumen (Sticky) */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-28 border border-[#E8E4D9]">
                                <h3 className="text-2xl font-bold text-[#6F4E37] mb-6 flex items-center gap-2">
                                    <ShoppingCart size={24} className="text-[#8B7355]" />
                                    Tu Pedido
                                </h3>

                                {/* Inputs Datos Cliente */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-xs font-bold text-[#8C705F] uppercase tracking-wider mb-1">Nombre</label>
                                        <input
                                            type="text"
                                            value={customerData.name}
                                            onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                                            placeholder="Tu nombre"
                                            className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E8E4D9] rounded-xl focus:outline-none focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] transition-all text-[#4A4036]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#8C705F] uppercase tracking-wider mb-1">Teléfono</label>
                                        <input
                                            type="tel"
                                            value={customerData.phone}
                                            onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                                            placeholder="Tu teléfono"
                                            className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#E8E4D9] rounded-xl focus:outline-none focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] transition-all text-[#4A4036]"
                                        />
                                    </div>
                                </div>

                                {/* Lista de Items */}
                                <div className="space-y-3 mb-6 border-t border-dashed border-[#E8E4D9] pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#8C705F]">Base</span>
                                        <span className="font-medium text-[#6F4E37]">${dailyMenu.basePrice.toLocaleString('es-CO')}</span>
                                    </div>

                                    {order.mainDish && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#8C705F]">Extra Plato</span>
                                            <span className="font-medium text-[#6F4E37]">${(dailyMenu.mainDishes.find(d => d.id === order.mainDish)?.price || 0).toLocaleString('es-CO')}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Total */}
                                <div className="bg-[#6F4E37] rounded-xl p-4 mb-6 flex justify-between items-center text-white shadow-lg">
                                    <span className="text-lg font-medium">Total</span>
                                    <span className="text-3xl font-bold text-[#F0EBE0]">
                                        ${totalPrice.toLocaleString('es-CO')}
                                    </span>
                                </div>

                                {/* Botón Acción */}
                                <button
                                    onClick={sendOrder}
                                    disabled={!isFormValid()}
                                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md ${isFormValid()
                                        ? 'bg-[#8B7355] text-white hover:bg-[#6F5B43] active:scale-95'
                                        : 'bg-[#E8E4D9] text-[#9A8C7D] cursor-not-allowed'
                                        }`}
                                >
                                    Enviar Pedido
                                </button>

                                <div className="mt-4 flex gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                    <AlertCircle className="text-amber-600 flex-shrink-0" size={16} />
                                    <p className="text-xs text-amber-800 leading-tight">
                                        Al enviar, se abrirá WhatsApp con el detalle de tu pedido para confirmar.
                                    </p>
                                </div>

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