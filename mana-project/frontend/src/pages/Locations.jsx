import { useState } from 'react';
import { MapPin, Phone, Clock, Car, Bus, Navigation, Share2 } from 'lucide-react';
import { RESTAURANT_INFO, SOCIAL_MEDIA } from '../utils/constants';

function Locations() {
    const [mapLoaded, setMapLoaded] = useState(false);
    //latitud y longitud de la ubicación, proveniente de Google Maps
    const latitude = 7.374620649154491;
    const longitude = -72.64452128982836;
    const addressFull = "cra 9 calle 5 esquina, local 2, Ursua, Pamplona, Norte de Santander"; //Dirección completa

    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`; //URL de Google Maps
    const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`; //URL de Waze
    //URL del mapa incrustado, proveniente de Google Maps (iframe)
    const embedMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7913.630954738754!2d-72.6444699!3d7.3745677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e688153a8bf1953%3A0xb67c44d64f68830c!2sMana%20coffee!5e0!3m2!1ses-419!2sco!4v1765295997118!5m2!1ses-419!2sco`;

    const horarios = [
        { dia: 'Lunes - Viernes', horario: '7:30 AM - 9:00 PM' },
        { dia: 'Sábados', horario: '8:00 AM - 10:00 PM' },
        { dia: 'Domingos', horario: '8:00 AM - 8:00 PM' },
    ];

    const comoLlegar = [
        {
            icon: <Car className="w-6 h-6" />,
            title: 'En Auto',
            description: 'Encontraras parqueaderos disponibles',
            action: 'Abrir en Maps',
            url: googleMapsUrl
        },
        {
            icon: <Navigation className="w-6 h-6" />,
            title: 'Waze',
            description: 'Navegación en tiempo real',
            action: 'Abrir Waze',
            url: wazeUrl
        }
    ];

    const handleShare = async () => {
        // shareData es el objeto con la información que se va a compartir
        const shareData = {
            title: 'Mana Restobar',
            text: `¡Visita Mana Restobar en ${addressFull}!`,
            url: googleMapsUrl
        };
        //Verifica si el navegador soporta la API de compartir (share)
        try {
            if (navigator.share) {
                //Si el navegador soporta la API share, se comparte la información
                await navigator.share(shareData);
            } else {
                //Si el navegador no soporta la API share, se copia la URL al portapapeles
                await navigator.clipboard.writeText(googleMapsUrl);
                alert('¡Enlace copiado al portapapeles!');
            }
        } catch (err) {
            console.error('Error al compartir:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-mana-cream/30">

            {/* Hero Section */}
            <section className="relative bg-mana-brown/75 text-white py-16 md:py-20">
                <div className="container-custom text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4 animate-bounce" />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Encuéntranos
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                        Te esperamos con los brazos abiertos y la mejor <span className="font-bold text-mana-cream italic">sazón natural</span>
                    </p>
                </div>
            </section>

            {/* Mapa */}
            <section className="relative -mt-10 z-10">
                <div className="container-custom">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

                        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] bg-gray-200">
                            {!mapLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mana-brown mx-auto mb-4"></div>
                                        <p className="text-gray-600">Cargando mapa...</p>
                                    </div>
                                </div>
                            )}

                            <iframe
                                src={embedMapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                onLoad={() => setMapLoaded(true)}
                                title="Ubicación de Mana Restobar"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-6 md:p-8 bg-gradient-to-br from-mana-cream/40 to-white">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-mana-brown mb-2">
                                        {RESTAURANT_INFO.name} Restobar
                                    </h3>

                                    <p className="text-gray-700 flex items-center gap-2 mb-2">
                                        <MapPin className="w-5 h-5 text-mana-brown" />
                                        <span>{addressFull}</span>
                                    </p>

                                    <p className="text-gray-600 flex items-center gap-2">
                                        <Phone className="w-5 h-5 text-mana-brown" />
                                        <a href={SOCIAL_MEDIA.whatsapp} className="hover:text-mana-brown">
                                            {RESTAURANT_INFO.phone}
                                        </a>
                                    </p>
                                </div>

                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 bg-mana-brown text-white px-6 py-3 rounded-full font-semibold hover:bg-mana-gold/10 hover:text-mana-brown transition-all shadow-lg active:scale-95"
                                >
                                    <Share2 className="w-5 h-5" />
                                    <span className="hidden sm:inline">Compartir Ubicación</span>
                                    <span className="sm:hidden">Compartir</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cómo llegar */}
            <section className="py-16 md:py-20">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-mana-brown mb-12">
                        ¿Cómo Llegar?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {comoLlegar.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all group"
                            >
                                <div className="w-14 h-14 bg-mana-brown rounded-full flex items-center justify-center mb-4 text-mana-cream/95 group-hover:bg-mana-cream/80 group-hover:text-mana-brown transition-all">
                                    {item.icon}
                                </div>

                                <h3 className="text-xl font-bold text-mana-brown mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 mb-4 min-h-12">
                                    {item.description}
                                </p>

                                {/* ENLACE */}
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-mana-brown font-semibold transition-colors"
                                >
                                    {item.action}
                                    <Navigation className="w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Horarios */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <Clock className="w-12 h-12 text-black/65 mx-auto mb-5" />
                            <h2 className="text-3xl md:text-4xl font-bold text-mana-brown mb-4">
                                Horarios de Atención
                            </h2>
                            <p className="text-gray-600">
                                Estamos abiertos todos los días para servirte
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {horarios.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-mana-cream/40 to-mana-cream/20 rounded-xl p-6 text-center border-2 border-mana-brown/10 hover:border-mana-brown/30 transition-all"
                                >
                                    <p className="font-bold text-mana-brown mb-2">{item.dia}</p>
                                    <p className="text-2xl font-bold text-gray-800">{item.horario}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-16 bg-mana-brown text-white text-center">
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
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-mana-brown px-8 py-4 rounded-full font-semibold hover:bg-mana-cream transition-all shadow-lg active:scale-95"
                        >
                            <Navigation className="w-5 h-5" />
                            Cómo Llegar
                        </a>

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

export default Locations;
