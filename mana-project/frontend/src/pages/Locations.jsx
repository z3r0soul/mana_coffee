import { useState } from 'react';
import { MapPin, Phone, Clock, Car, Bus, Navigation, Share2 } from 'lucide-react';
import { RESTAURANT_INFO, SOCIAL_MEDIA } from '../utils/constants';

function Locations() {
    const [mapLoaded, setMapLoaded] = useState(false);
    //latitud y longitud de la ubicación
    const latitude = 7.374620649154491;
    const longitude = -72.64452128982836;
    const addressFull = "cra 9 calle 5 esquina, local 2, Ursua, Pamplona, Norte de Santander";

    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const wazeUrl = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
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
        const shareData = {
            title: 'Mana Restobar',
            text: `¡Visita Mana Restobar en ${addressFull}!`,
            url: googleMapsUrl
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(googleMapsUrl);
                alert('¡Enlace copiado al portapapeles!');
            }
        } catch (err) {
            console.error('Error al compartir:', err);
        }
    };

    return (
        // FONDO PRINCIPAL: #FDFBF7 
        <div className="min-h-screen bg-[#FDFBF7]">

            {/* Hero Section */}
            {/* FONDO HERO: #4A4036 */}
            <section className="relative bg-[#4A4036]/95 text-white py-20 md:py-24 pt-32">
                <div className="container-custom text-center px-4">
                    <MapPin className="w-16 h-16 mx-auto mb-4 animate-bounce text-mana-cream" />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#FDFBF7]">
                        Encuéntranos
                    </h1>
                    <p className="text-lg md:text-xl text-[#E8E4D9] max-w-2xl mx-auto">
                        Te esperamos con los brazos abiertos y la mejor <span className="font-bold text-mana-gold italic">sazón natural</span>
                    </p>
                </div>
            </section>

            {/* Mapa */}
            <section className="relative -mt-16 z-10 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E8E4D9]">

                        <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] bg-gray-200">
                            {!mapLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#F0EBE0]">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B7355] mx-auto mb-4"></div>
                                        <p className="text-[#6B5D4D]">Cargando mapa...</p>
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

                        {/* Info Box */}
                        <div className="p-6 md:p-8 bg-[#FAF9F6] border-t border-[#E8E4D9]">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#4A4036] mb-3">
                                        {RESTAURANT_INFO.name} Restobar
                                    </h3>

                                    <p className="text-[#6B5D4D] flex items-center gap-2 mb-2">
                                        <MapPin className="w-5 h-5 text-[#8B7355]" />
                                        <span>{addressFull}</span>
                                    </p>

                                    <p className="text-[#6B5D4D] flex items-center gap-2">
                                        <Phone className="w-5 h-5 text-[#8B7355]" />
                                        <a href={SOCIAL_MEDIA.whatsapp} className="hover:text-[#8B7355] transition-colors">
                                            {RESTAURANT_INFO.phone}
                                        </a>
                                    </p>
                                </div>

                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 bg-[#8B7355] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#6F5B43] transition-all shadow-md active:scale-95"
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
            <section className="py-16 md:py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4A4036] mb-12">
                        ¿Cómo Llegar?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                        {comoLlegar.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all group border border-[#E8E4D9]"
                            >
                                <div className="w-14 h-14 bg-[#F0EBE0] rounded-2xl flex items-center justify-center mb-4 text-[#8B7355] group-hover:bg-[#8B7355] group-hover:text-white transition-all">
                                    {item.icon}
                                </div>

                                <h3 className="text-xl font-bold text-[#4A4036] mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-[#6B5D4D] mb-6 min-h-12">
                                    {item.description}
                                </p>

                                {/* ENLACE */}
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#8B7355] font-bold hover:text-[#6F5B43] transition-colors"
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
            <section className="py-16 md:py-20 bg-white border-y border-[#E8E4D9] px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="w-16 h-16 bg-[#F0EBE0] rounded-full flex items-center justify-center mx-auto mb-5">
                                <Clock className="w-8 h-8 text-[#8B7355]" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#4A4036] mb-4">
                                Horarios de Atención
                            </h2>
                            <p className="text-[#6B5D4D]">
                                Estamos abiertos todos los días para servirte
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {horarios.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-[#FDFBF7] rounded-2xl p-6 text-center border border-[#E8E4D9] hover:border-[#8B7355]/30 transition-all shadow-sm"
                                >
                                    <p className="font-bold text-[#8B7355] mb-2 uppercase tracking-wide text-sm">{item.dia}</p>
                                    <p className="text-xl font-bold text-[#4A4036]">{item.horario}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-[#4A4036] text-white text-center px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FDFBF7]">
                        ¿Listo para Visitarnos?
                    </h2>

                    <p className="text-lg text-[#E8E4D9] mb-10 max-w-2xl mx-auto">
                        Te esperamos para ofrecerte la mejor experiencia gastronómica.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">

                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#FDFBF7] text-[#4A4036] px-8 py-4 rounded-xl font-bold hover:bg-[#E8E4D9] transition-all shadow-lg active:scale-95"
                        >
                            <Navigation className="w-5 h-5" />
                            Cómo Llegar
                        </a>

                        <a
                            href={SOCIAL_MEDIA.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#8B7355] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#6F5B43] transition-all shadow-lg active:scale-95"
                        >
                            <Phone className="w-5 h-5" />
                            Llamar Ahora
                        </a>
                    </div>
                </div>
            </section>

            <footer className="bg-[#3A3026] text-center text-[#E8E4D9] py-8 border-t border-[#4A4036]">
                <p className="text-sm">
                    © {new Date().getFullYear()}
                    <span className="font-semibold text-[#8B7355]"> Mana Restobar</span>. Todos los derechos reservados.
                </p>
                <p className="text-xs mt-2 text-[#9A8C7D]">
                    Hecho con ❤️ en <span className='text-[#8B7355] font-semibold italic'>Pamplona</span>, Colombia
                </p>
            </footer>

        </div>
    );
}

export default Locations;