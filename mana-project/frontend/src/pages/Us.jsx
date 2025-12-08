import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

function About() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef(null);

    const sections = [
        {
            id: 0,
            title: "NUESTRA HISTORIA",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-food-being-cooked-in-a-professional-kitchen-46551-large.mp4",
            description: "Desde enero 2025, Mana nace de una pasión familiar por la comida casera y el servicio personalizado.",
            details: "11 meses compartiendo nuestra sazón natural con la comunidad. Más de 700 hamburguesas vendidas en Burger Show. Una familia de 3 socios comprometidos con la excelencia."
        },
        {
            id: 1,
            title: "NUESTRA FILOSOFÍA",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-cutting-vegetables-42551-large.mp4",
            description: "Ingredientes frescos, preparación artesanal y un toque de amor en cada plato.",
            details: "Creemos en la comida del hogar, sin exceso de condimentos. Trabajamos con proveedores de confianza como Bimbo y La Duquesa para garantizar la frescura de cada ingrediente."
        },
        {
            id: 2,
            title: "NUESTRO EQUIPO",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-food-in-a-restaurant-kitchen-43312-large.mp4",
            description: "Chefs especializados y personal capacitado que aman lo que hacen.",
            details: "Cada miembro de nuestro equipo está comprometido con brindarte una experiencia gastronómica memorable. Profesionales apasionados por la cocina y el servicio."
        },
        {
            id: 3,
            title: "NUESTRA COMUNIDAD",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-people-eating-at-a-restaurant-4254-large.mp4",
            description: "Más que un restaurante, somos un espacio de encuentro y celebración.",
            details: "Capacidad para 35-40 personas. Eventos especiales, cumpleaños y cenas de grado. Un lugar donde cada momento se convierte en un recuerdo especial."
        },
        {
            id: 4,
            title: "NUESTRO COMPROMISO",
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-chef-cooking-4253-large.mp4",
            description: "Calidad, frescura y servicio personalizado en cada experiencia.",
            details: "Nos comprometemos a ofrecer siempre lo mejor. Menús actualizados diariamente, atención personalizada y un ambiente acogedor que te hace sentir como en casa."
        }
    ];

    // Función para actualizar la barra de progreso
    const handleScrollProgress = () => {
        const container = containerRef.current;
        if (!container) return;

        const max = container.scrollWidth - container.clientWidth;
        const progress = (container.scrollLeft / max) * 100;
        setScrollProgress(progress);
    };
    useEffect(() => {
        const velocityRef = { current: 0 };
        const isAnimatingRef = { current: false };

        const animate = () => {
            const container = containerRef.current;
            if (!container) return;

            // Aplicar velocidad
            container.scrollLeft += velocityRef.current;

            // Reducir velocidad gradualmente
            velocityRef.current *= 0.92;

            // Actualizar barra de progreso
            handleScrollProgress();

            // Detener cuando ya no hay velocidad
            if (Math.abs(velocityRef.current) < 0.2) {
                velocityRef.current = 0;
                isAnimatingRef.current = false;
                return;
            }

            requestAnimationFrame(animate);
        };

        const startMomentumScroll = () => {
            if (isAnimatingRef.current) return;
            isAnimatingRef.current = true;
            requestAnimationFrame(animate);
        };

        const handleWheel = (e) => {
            e.preventDefault();
            // Acumula velocidad 
            velocityRef.current += e.deltaY * 0.4;
            startMomentumScroll();
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: false });
            return () => container.removeEventListener("wheel", handleWheel);
        }
    }, []);

    // Detectar teclas de flecha
    useEffect(() => {
        const handleKeyDown = (e) => {
            const container = containerRef.current;
            if (!container) return;

            const scrollAmount = 100;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                container.scrollLeft += scrollAmount;
                handleScrollProgress();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                container.scrollLeft -= scrollAmount;
                handleScrollProgress();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Calcular qué sección está más visible
    const getActiveSection = () => {
        const container = containerRef.current;
        if (!container) return 0;

        const scrollLeft = container.scrollLeft;
        const sectionWidth = container.scrollWidth / sections.length;
        return Math.round(scrollLeft / sectionWidth);
    };

    const activeSection = getActiveSection();

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            {/* Contenedor de scroll horizontal */}
            <div
                ref={containerRef}
                className="flex h-full w-full overflow-x-scroll overflow-y-hidden scrollbar-hide"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    scrollBehavior: 'auto'
                }}
            >
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        className="relative min-w-full h-full flex-shrink-0"
                    >
                        {/* Video de fondo */}
                        <video
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                            <source src={section.videoUrl} type="video/mp4" />
                        </video>

                        {/* Overlay oscuro */}
                        <div className="absolute inset-0 bg-black/60"></div>

                        {/* Título vertical (barra lateral) */}
                        <div className="absolute left-0 top-0 h-full w-16 sm:w-20 md:w-24 lg:w-32 bg-gradient-to-r from-[#A9806A] to-[#C9A886] flex items-center justify-center">
                            <h2
                                className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-widest whitespace-nowrap"
                                style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'mixed',
                                    transform: 'rotate(180deg)'
                                }}
                            >
                                {section.title}
                            </h2>
                        </div>

                        {/* Contenido */}
                        <div className="relative z-10 h-full flex items-center justify-center pl-16 sm:pl-20 md:pl-24 lg:pl-32">
                            <div className="max-w-3xl px-4 sm:px-6 md:px-12 lg:px-16 text-white">
                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                                    {section.description}
                                </h3>

                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8">
                                    {section.details}
                                </p>

                                {index === 0 && (
                                    <div className="flex items-center gap-3 text-[#FFFDD0] animate-pulse">
                                        <span className="text-xs sm:text-sm font-medium">
                                            <span className="hidden md:inline">Desliza con la rueda del ratón</span>
                                            <span className="md:hidden">Desliza para explorar</span>
                                        </span>
                                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 rotate-[-90deg]" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Barra de progreso horizontal */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 w-64 sm:w-80 md:w-96 z-20">
                {/* Fondo de la barra */}
                <div className="h-1 bg-mana-brown/30 rounded-full overflow-hidden backdrop-blur-sm">
                    {/* Progreso */}
                    <div
                        className="h-full bg-mana-cream/75 transition-all duration-100 ease-out rounded-full"
                        style={{ width: `${scrollProgress}%` }}
                    ></div>
                </div>


            </div>
            {/* Estilos para ocultar scrollbar */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}

export default About;