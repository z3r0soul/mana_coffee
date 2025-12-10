import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SOCIAL_MEDIA } from '../utils/constants';

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemsCount,
  } = useCart();

  // Generar mensaje para WhatsApp
  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return '';

    let message = '¡Hola! Me gustaría hacer el siguiente pedido:\n\n';
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.nombre}*\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio unitario: $${item.precio.toLocaleString('es-CO')}\n`;
      message += `   Subtotal: $${(item.precio * item.quantity).toLocaleString('es-CO')}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: $${getTotal().toLocaleString('es-CO')}*\n\n`;

    return message;
  };

  // Enviar pedido por WhatsApp
  const handleSendOrder = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `${SOCIAL_MEDIA.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Panel del carrito */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8C705F] to-[#6F4E37] text-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag size={24} />
              <div>
                <h2 className="text-xl font-bold">Tu Pedido</h2>
                <p className="text-white/80 text-sm">
                  {getItemsCount()} {getItemsCount() === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-[#FAF9F6] rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={40} className="text-[#8C705F]/50" />
              </div>
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Agrega productos del menú para comenzar tu pedido
              </p>
              <button
                onClick={closeCart}
                className="bg-[#8C705F] text-white px-6 py-2.5 rounded-full hover:bg-[#6F4E37] transition-colors font-medium"
              >
                Ver menú
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAF9F6] rounded-xl p-4 border border-[#E8E4D9]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#6F4E37] line-clamp-1">
                        {item.nombre}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">{item.tipo}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-[#E8E4D9]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-[#FAF9F6] rounded-l-lg transition-colors text-[#8C705F]"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold text-[#6F4E37]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-[#FAF9F6] rounded-r-lg transition-colors text-[#8C705F]"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Precio */}
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        ${item.precio.toLocaleString('es-CO')} c/u
                      </p>
                      <p className="font-bold text-[#8C705F]">
                        ${(item.precio * item.quantity).toLocaleString('es-CO')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Botón limpiar carrito */}
              <button
                onClick={clearCart}
                className="w-full text-center text-sm text-gray-500 hover:text-red-500 py-2 transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>

        {/* Footer con total y botón de WhatsApp */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#E8E4D9] p-5 bg-white">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total del pedido:</span>
              <span className="text-2xl font-bold text-[#6F4E37]">
                ${getTotal().toLocaleString('es-CO')}
              </span>
            </div>

            {/* Botón de WhatsApp */}
            <button
              onClick={handleSendOrder}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <MessageCircle size={22} />
              Enviar pedido por WhatsApp
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Se abrirá WhatsApp con tu pedido listo para enviar
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Cart;
