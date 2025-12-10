import { Link } from 'react-router-dom';
import imgAlmuerzo from '../assets/FOTO1.jpeg';
import imgCena from '../assets/FOTO12.jpeg';
import imgMana from '../assets/bg-mana.png'
import WhatsAppFloat from '../components/WhatsappFloat';
import { Clock, Award, Heart, Phone, MapPin, Instagram, Facebook, MessageCircle, ChefHat, Utensils, Coffee } from 'lucide-react';
import { RESTAURANT_INFO, SOCIAL_MEDIA } from '../utils/constants';

function Home() {
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
        <div className="w-full bg-white">

            {/* Hero */}
            <section className="relative h-[1070px] md:h-[1070x] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
                <img
                    src={imgMana}
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
                            to="/menu"
                            className="bg-white text-mana-brown px-8 py-4 rounded-full font-semibold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            Ver Menú
                        </Link>
                        <Link
                            to="/LunchBuilder"
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-white hover:text-mana-brown transition-all"
                        >
                            Arma tu almuerzo
                        </Link>
                        <Link
                            to="/reservations"
                            className="bg-white text-mana-brown px-8 py-4 rounded-full font-semibold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            Reservar Mesa
                        </Link>
                    </div>
                </div>
            </section>

            {/* Servicios */}
            <section className="py-16 md:py-20">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-mana-brown mb-4">
                            Nuestros Servicios
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            Desde el desayuno hasta la cena, cada momento del día merece una experiencia especial
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="mb-3">{service.icon}</div>
                                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-mana-cream font-semibold mb-2 text-sm">{service.time}</p>
                                    <p className="text-white/90 text-sm">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Sobre Nosotros */}
            <section className="py-20 bg-[#F3E6D9]">
                <div className="container-custom flex flex-col lg:flex-row items-center gap-12">

                    {/* Imagen */}
                    <div className="w-full lg:w-1/2">
                        <img
                            src={imgAlmuerzo}
                            alt="Sobre Mana"
                            className="rounded-2xl shadow-xl object-cover w-full h-[380px]"
                        />
                    </div>

                    {/* Texto */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-mana-brown mb-6">
                            Sobre Nosotros
                        </h2>

                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            En <span className="font-semibold text-mana-brown">Mana</span> creemos en el poder de la comida honesta,
                            preparada con ingredientes frescos y ese toque casero que nos ha acompañado desde siempre.
                            Somos un espacio donde cada plato está pensado para brindar comodidad, sabor y momentos especiales.
                        </p>

                        <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            Nuestro equipo trabaja con dedicación para ofrecer desayunos reconfortantes, almuerzos ejecutivos
                            llenos de sazón y cenas que hacen sentir como en casa. Aquí no solo vienes a comer: vienes a disfrutar,
                            compartir y vivir la verdadera experiencia Mana.
                        </p>

                        <Link
                            to="/Us"
                            className="inline-block mt-4 bg-mana-brown text-white px-8 py-4 rounded-full font-semibold shadow-md hover:bg-mana-brown/90 transition-all"
                        >
                            Conócenos Más
                        </Link>
                    </div>

                </div>
            </section>

            {/* Contacto */}
            <section className="py-12 md:py-15 border-t border-brown-">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-mana-brown mb-4">
                            Contactate con Nosotros
                        </h2>
                        <p className="text-gray-600 text-lg ">
                            Estamos para servirte en cualquiera de nuestras redes sociales!
                        </p>
                    </div>

                    <div className="flex flex-row justify-center gap-6 max-w-4xl mx-auto">
                        {/* Información */}
                        <div className="bg-[#F3E6D9] w-full rounded-2xl p-8 text-center md:text-left shadow-xl border border-white/20">

                            <h3 className="text-2xl font-bold text-mana-brown mb-6">
                                Información
                            </h3>

                            <div className="space-y-6">

                                {/* Teléfono */}
                                <a
                                    href={SOCIAL_MEDIA.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center md:justify-start gap-4 group"
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center
                transition-all duration-300 group-hover:bg-mana-brown group-hover:scale-110">
                                        <Phone className="w-6 h-6 text-mana-brown group-hover:text-white transition-colors duration-300" />
                                    </div>

                                    <span className="font-semibold text-gray-800 group-hover:text-mana-brown transition-colors">
                                        {RESTAURANT_INFO.phone}
                                    </span>
                                </a>

                                {/* Horarios */}
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-mana-black/70" />
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-900">Lunes - Domingo</p>
                                        <p className="text-sm text-gray-700">7:30 AM - 9:00 PM</p>
                                    </div>
                                </div>

                                {/* Ubicación */}
                                <Link
                                    to="/locations"
                                    className="flex items-center justify-center md:justify-start gap-4 group"
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center
                transition-all duration-300 group-hover:bg-mana-brown group-hover:scale-110">
                                        <MapPin className="w-6 h-6 text-mana-brown group-hover:text-white transition-colors" />
                                    </div>

                                    <span className="font-semibold text-gray-800 group-hover:text-mana-brown transition-colors">
                                        Ver Ubicación
                                    </span>
                                </Link>

                            </div>
                        </div>



                        {/* Redes */}
                        <div className="bg-[#8A5A3A]/75 rounded-2xl p-8 text-white text-center md:text-left shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">Síguenos</h3>
                            <p className="mb-6 text-white/90">
                                Mantente al día con promociones y contenido especial
                            </p>

                            <div className="flex gap-3 justify-center md:justify-start">

                                <a
                                    href={SOCIAL_MEDIA.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-green-500 transition-all hover:scale-110"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                </a>

                                <a
                                    href={SOCIAL_MEDIA.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all hover:scale-110"
                                >
                                    <Instagram className="w-6 h-6" />
                                </a>

                                <a
                                    href={SOCIAL_MEDIA.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110"
                                >
                                    <Facebook className="w-6 h-6" />
                                </a>

                                <a
                                    href={SOCIAL_MEDIA.tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="TikTok"
                                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-black transition-all hover:scale-110"
                                >
                                    <span className="text-xl font-bold">T</span>
                                </a>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-10 bg-mana-brown text-white text-center">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Listo para Visitarnos?
                    </h2>

                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Te esperamos para ofrecerte la mejor experiencia gastronómica.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        {/* ENLACE CORREGIDO */}
                        <a
                            href={SOCIAL_MEDIA.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-all shadow-lg active:scale-95"
                        >
                            <Phone className="w-5 h-5" />
                            Llamar Ahora
                        </a>
                    </div>
                </div>
            </section>
            <WhatsAppFloat />
            <footer className="bg-mana-brown text-center text-white/80 py-6 border-t border-white/20">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()}
                    <span className="font-semibold text-mana-gold"> Mana Restobar</span>. Todos los derechos reservados.
                </p>
                <p className="text-xs mt-1">
                    Hecho con ❤️ en <span className='text-mana-gold font-semibold italic'>Pamplona</span>, Colombia
                </p>
            </footer>
        </div>
    );
}

export default Home;