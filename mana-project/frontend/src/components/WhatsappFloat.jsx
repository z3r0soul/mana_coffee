import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import iconWhatsapp from '../assets/whatsapp.png';
import { SOCIAL_MEDIA, RESTAURANT_INFO } from '../utils/constants';

function WhatsAppFloat() {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    // Aparece suavemente
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 400);
        return () => clearTimeout(timer);
    }, []);

    // Tooltip automático
    useEffect(() => {
        if (!isVisible) return;

        const timer = setTimeout(() => {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 5000);
        }, 2500);

        return () => clearTimeout(timer);
    }, [isVisible]);

    const handleClick = () => {
        const message = '¡Hola! Me gustaría hacer una consulta sobre Mana Restobar.';
        const whatsappUrl = `${SOCIAL_MEDIA.whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Botón flotante moderno */}
            <button
                onClick={handleClick}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-float overflow-hidden bg-[#25D366]"
                aria-label="Contactar por WhatsApp"
            >
                {/* Icono */}
                <img
                    src={iconWhatsapp}
                    alt="WhatsApp"
                    className="w-full h-full object-cover"
                />

                {/* Pulso externo */}
                <span
                    className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping"
                ></span>
            </button>

            {/* Aparatado de responsividad */}
            <div className="hidden lg:block absolute bottom-full right-0 mb-2 bg-[#25D366] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg whitespace-nowrap">
                {RESTAURANT_INFO.phone}
            </div>
        </div>
    );
}

export default WhatsAppFloat;