import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import imgAlmuerzo from '../assets/FOTO1.jpeg';
import imgCena from '../assets/FOTO12.jpeg';
import imgMana from '../assets/FOTO10.jpeg';
import imgDesayuno from '../assets/FOTO7.jpeg';
import imgCafe from '../assets/bg-mana.png';
import WhatsAppFloat from '../components/WhatsappFloat';
import { Clock, Phone, MapPin, Instagram, Facebook, MessageCircle, ChefHat, Utensils, Coffee } from 'lucide-react';
import { RESTAURANT_INFO, SOCIAL_MEDIA } from '../utils/constants';

function Home() {
    // Estado para el índice del carrusel
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array de imágenes para el carrusel de "Sobre Nosotros"
    const aboutImages = [
        imgAlmuerzo,
        imgCena,
        imgDesayuno, // Puedes agregar más aquí
        imgMana
    ];

    // Efecto para cambiar la imagen automáticamente cada 4 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === aboutImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Cambia cada 4000ms (4 segundos)

        return () => clearInterval(interval);
    }, [aboutImages.length]);

    const services = [
        {
            title: 'Desayunos',
            time: `${RESTAURANT_INFO.schedule.desayuno.start} - ${RESTAURANT_INFO.schedule.desayuno.end}`,
            description: 'Empieza tu mañana con nuestros desayunos caseros',
            icon: <Coffee className="w-12 h-12 text-mana-gold" />,
            image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=400&fit=crop'
        },
        {
            title: 'Almuerzos',
            time: `${RESTAURANT_INFO.schedule.almuerzo.start} - ${RESTAURANT_INFO.schedule.almuerzo.end}`,
            description: 'Menú ejecutivo diario con ingredientes frescos',
            icon: <Utensils className="w-12 h-12 text-mana-gold" />,
            image: imgAlmuerzo
        },
        {
            title: 'Cenas',
            time: `${RESTAURANT_INFO.schedule.cena.start} - ${RESTAURANT_INFO.schedule.cena.end}`,
            description: 'Momentos especiales con sabor a hogar',
            icon: <ChefHat className="w-12 h-12 text-mana-gold" />,
            image: imgCena
        }
    ];

    return (
        <div className="w-full bg-[#FDFBF7]">

            {/* Hero */}
            <section className="relative h-[90vh] md:h-[100vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
                <img
                    src={imgCafe}
                    alt="Restaurante Mana"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-20 container-custom h-full flex flex-col justify-center text-white">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                        Bienvenidos a<br />
                        <span className="text-mana-gold">Mana Restobar</span>
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl text-white/95 font-light">
                        {RESTAURANT_INFO.tagline}
                    </p>

                    <p className="text-base md:text-lg mb-8 max-w-xl text-white/80">
                        Una experiencia donde cada comida es una aventura.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/ClientsMenu"
                            className="bg-white text-[#4A4036] px-8 py-4 rounded-full font-semibold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            Ver Menú
                        </Link>
                        <Link
                            to="/LunchBuilder"
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-white hover:text-[#4A4036] transition-all"
                        >
                            Arma tu almuerzo
                        </Link>
                        <Link
                            to="/reservations"
                            className="bg-[#8B7355] text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg shadow-xl hover:bg-[#6F5B43] transition-all hover:scale-105 active:scale-95"
                        >
                            Reservar Mesa
                        </Link>
                    </div>
                </div>
            </section>

            {/* Servicios */}
            <section className="py-20 bg-[#FDFBF7]">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#4A4036] mb-4">
                            Nuestros Servicios
                        </h2>
                        <p className="text-[#6B5D4D] text-base md:text-lg max-w-2xl mx-auto">
                            Desde el desayuno hasta la cena, cada momento del día merece una experiencia especial
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <div className="mb-3">{service.icon}</div>
                                    <h3 className="text-2xl font-bold mb-1">{service.title}</h3>
                                    <p className="text-[#E8E4D9] font-medium mb-3 text-sm">{service.time}</p>
                                    <p className="text-white/80 text-sm leading-relaxed">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sobre Nosotros - CARRUSEL DE ANCHO COMPLETO */}
            <section className="bg-[#F3E6D9] overflow-hidden">
                <div className="flex flex-col lg:flex-row min-h-[600px] lg:h-[700px]">

                    {/* COLUMNA IZQUIERDA: CARRUSEL DE IMÁGENES */}
                    {/* lg:w-1/2 ocupa la mitad, h-full ocupa toda la altura */}
                    <div className="w-full lg:w-1/2 h-[400px] lg:h-auto relative">
                        {aboutImages.map((img, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Sobre Mana ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay sutil para unificar tonos */}
                                <div className="absolute inset-0 bg-[#4A4036]/10 mix-blend-multiply"></div>
                            </div>
                        ))}

                        {/* Indicadores (Puntitos) */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                            {aboutImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all shadow-sm ${index === currentImageIndex
                                        ? 'bg-white scale-110'
                                        : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                    aria-label={`Ver imagen ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: TEXTO */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 bg-[#F3E6D9]">
                        <div className="max-w-xl">
                            <span className="text-[#8B7355] font-bold tracking-widest text-sm uppercase mb-2 block">
                                Nuestra Historia
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#4A4036] mb-8 leading-tight">
                                Tradición y Sazón <br /> en cada plato
                            </h2>

                            <p className="text-[#6B5D4D] text-lg leading-relaxed mb-6">
                                En <span className="font-bold text-[#8B7355]">Mana</span> creemos en el poder de la comida honesta,
                                preparada con ingredientes frescos y ese toque casero que nos ha acompañado desde siempre.
                                Somos un espacio donde cada plato está pensado para brindar comodidad, sabor y momentos especiales.
                            </p>

                            <p className="text-[#6B5D4D] text-lg leading-relaxed mb-8">
                                Nuestro equipo trabaja con dedicación para ofrecer desayunos reconfortantes, almuerzos ejecutivos
                                llenos de sazón y cenas que hacen sentir como en casa. Aquí no solo vienes a comer: vienes a disfrutar,
                                compartir y vivir la verdadera experiencia Mana.
                            </p>

                            <Link
                                to="/Us"
                                className="inline-flex items-center gap-2 bg-[#4A4036] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-[#3A3026] hover:shadow-xl transition-all active:scale-95"
                            >
                                Conócenos Más
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Contacto */}
            <section className="py-20 bg-[#FDFBF7]">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#4A4036] mb-4">
                            Contáctate con Nosotros
                        </h2>
                        <p className="text-[#6B5D4D] text-lg">
                            ¡Estamos para servirte en cualquiera de nuestras redes sociales!
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="bg-white w-full max-w-5xl rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#E8E4D9] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">

                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold text-[#4A4036] mb-2">
                                    Información de Contacto
                                </h3>
                                <p className="text-[#6B5D4D] mb-6">Haz tu pedido o reserva fácilmente</p>

                                <div className="space-y-4">
                                    <a href={SOCIAL_MEDIA.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#4A4036] hover:text-[#8B7355] transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-[#F0EBE0] flex items-center justify-center group-hover:bg-[#8B7355] transition-colors">
                                            <Phone className="w-5 h-5 text-[#8B7355] group-hover:text-white" />
                                        </div>
                                        <span className="font-semibold text-lg">{RESTAURANT_INFO.phone}</span>
                                    </a>

                                    <Link to="/locations" className="flex items-center gap-3 text-[#4A4036] hover:text-[#8B7355] transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-[#F0EBE0] flex items-center justify-center group-hover:bg-[#8B7355] transition-colors">
                                            <MapPin className="w-5 h-5 text-[#8B7355] group-hover:text-white" />
                                        </div>
                                        <span className="font-semibold text-lg">Ver Ubicación en Mapa</span>
                                    </Link>

                                    <div className="flex items-center gap-3 text-[#4A4036] group">
                                        <div className="w-10 h-10 rounded-full bg-[#F0EBE0] flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-[#8B7355]" />
                                        </div>
                                        <div>
                                            <span className="font-bold block">Lunes - Domingo</span>
                                            <span className="text-sm text-[#6B5D4D]">7:30 AM - 9:00 PM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Separador vertical */}
                            <div className="hidden md:block w-px h-64 bg-[#E8E4D9]"></div>

                            {/* Redes Sociales */}
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-[#4A4036] mb-6">Síguenos en Redes</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <a
                                        href={SOCIAL_MEDIA.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center justify-center w-28 h-28 bg-[#25D366]/10 rounded-2xl text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 group"
                                    >
                                        <MessageCircle className="w-8 h-8 mb-2 transform group-hover:scale-110 transition-transform" />
                                        <span className="font-semibold text-sm">WhatsApp</span>
                                    </a>

                                    <a
                                        href={SOCIAL_MEDIA.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center justify-center w-28 h-28 bg-[#E1306C]/10 rounded-2xl text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all duration-300 group"
                                    >
                                        <Instagram className="w-8 h-8 mb-2 transform group-hover:scale-110 transition-transform" />
                                        <span className="font-semibold text-sm">Instagram</span>
                                    </a>

                                    <a
                                        href={SOCIAL_MEDIA.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center justify-center w-28 h-28 bg-[#1877F2]/10 rounded-2xl text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 group"
                                    >
                                        <Facebook className="w-8 h-8 mb-2 transform group-hover:scale-110 transition-transform" />
                                        <span className="font-semibold text-sm">Facebook</span>
                                    </a>

                                    <a
                                        href={SOCIAL_MEDIA.tiktok}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center justify-center w-28 h-28 bg-black/5 rounded-2xl text-black hover:bg-black hover:text-white transition-all duration-300 group"
                                    >
                                        <span className="text-3xl font-bold mb-1 transform group-hover:scale-110 transition-transform">T</span>
                                        <span className="font-semibold text-sm">TikTok</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <WhatsAppFloat />
            <footer className="bg-[#4A4036] text-center text-[#E8E4D9] py-8 border-t border-[#6F5B43]">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()}
                    <span className="font-semibold text-[#8B7355]"> Mana Restobar</span>. Todos los derechos reservados.
                </p>
                <p className="text-xs mt-2 text-[#9A8C7D]">
                    Hecho con ❤️ en <span className='text-[#8B7355] font-semibold italic'>Pamplona</span>, Colombia
                </p>
            </footer>
        </div>
    );
}

export default Home;