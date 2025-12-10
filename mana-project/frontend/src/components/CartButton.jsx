import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartButton = () => {
  const { toggleCart, getItemsCount } = useCart();
  const itemsCount = getItemsCount();

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 right-6 z-30 bg-[#8C705F] hover:bg-[#6F4E37] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 group"
      aria-label="Abrir carrito"
    >
      <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
      
      {/* Badge con cantidad */}
      {itemsCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce-in">
          {itemsCount > 99 ? '99+' : itemsCount}
        </span>
      )}

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </button>
  );
};

export default CartButton;
