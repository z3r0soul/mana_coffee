// Información del restaurante
export const RESTAURANT_INFO = {
    name: 'Mana',
    tagline: 'Sazón Natural, Comida del Hogar',
    phone: '3150118386',
    whatsappNumber: '573150118386',
    email: 'contacto@manarestaurante.com',
    address: 'Bogotá, Colombia',
    openingDate: '29 de Enero de 2025',

    schedule: {
        desayuno: { start: '7:30 AM', end: '10:40 AM' },
        almuerzo: { start: '11:45 AM', end: '3:00 PM' },
        cena: { start: '5:00 PM', end: '9:00 PM' }
    },

    capacity: 40,

    policies: {
        cancelationDays: 2,
        modificationHours: 8,
        lunchConfirmationHours: 2
    },

    prices: {
        icopor: 1000,
        deliveryMin: 5000,
        deliveryMax: 7000
    },

    features: [
        'Ingredientes frescos diarios',
        'Chefs especializados',
        'Aliados estratégicos (Bimbo, La Duquesa)',
        'Servicio personalizado',
        'Domicilios disponibles'
    ]
};

// Redes sociales
export const SOCIAL_MEDIA = {
    whatsapp: `https://wa.me/${RESTAURANT_INFO.whatsappNumber}`,
    instagram: 'https://instagram.com/manarestaurante',
    facebook: 'https://facebook.com/manarestaurante',
    tiktok: 'https://tiktok.com/@manarestaurante'
};

// Categorías del menú
export const CATEGORIES = {
    DESAYUNO: 'desayuno',
    ALMUERZO: 'almuerzo',
    CENA: 'cena',
    RAPIDAS: 'rapidas',
    CAFETERIA: 'cafeteria',
    BEBIDAS: 'bebidas'
};

export const CATEGORY_LABELS = {
    desayuno: 'Desayunos',
    almuerzo: 'Almuerzos',
    cena: 'Cenas',
    rapidas: 'Comidas Rápidas',
    cafeteria: 'Cafetería',
    bebidas: 'Bebidas'
};

export const CATEGORY_ICONS = {
    desayuno: '🍳',
    almuerzo: '🍽️',
    cena: '🌙',
    rapidas: '🍔',
    cafeteria: '☕',
    bebidas: '🥤'
};

// Tipos de eventos
export const EVENT_TYPES = {
    CUMPLEANOS: 'cumpleaños',
    CENA_GRADO: 'cena_grado',
    GENERAL: 'general',
    CORPORATIVO: 'corporativo'
};

export const EVENT_TYPE_LABELS = {
    cumpleaños: 'Cumpleaños',
    cena_grado: 'Cena de Grado',
    general: 'Reserva General',
    corporativo: 'Evento Corporativo'
};

// Estados
export const STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed'
};

export const STATUS_LABELS = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    cancelled: 'Cancelada',
    completed: 'Completada'
};

// Datos de ejemplo para mostrar (temporal - luego vendrán del backend)
export const MOCK_MENU_ITEMS = [
    {
        id: '1',
        name: 'Desayuno Ejecutivo',
        description: 'Huevos al gusto, arepa, café y jugo natural',
        price: 12000,
        category: 'desayuno',
        imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500',
        available: true
    },
    {
        id: '2',
        name: 'Hamburguesa Mana',
        description: 'Carne de res, queso, lechuga, tomate y salsas especiales',
        price: 18000,
        category: 'rapidas',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        available: true
    },
    {
        id: '3',
        name: 'Bandeja Paisa',
        description: 'Frijoles, arroz, carne, chicharrón, huevo, plátano y aguacate',
        price: 25000,
        category: 'almuerzo',
        imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500',
        available: true
    },
    {
        id: '4',
        name: 'Café Americano',
        description: 'Café de grano seleccionado',
        price: 3500,
        category: 'cafeteria',
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500',
        available: true
    },
    {
        id: '5',
        name: 'Jugo Natural',
        description: 'Variedad de frutas frescas',
        price: 5000,
        category: 'bebidas',
        imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500',
        available: true
    },
    {
        id: '6',
        name: 'Cena Romántica',
        description: 'Entrada, plato fuerte y postre para dos personas',
        price: 65000,
        category: 'cena',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500',
        available: true
    }
];