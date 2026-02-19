# mana_coffee# Mana Restaurant - Sitio Web

![Mana Logo](./frontend/src/assets/LOGOFNUDE.jpeg)

> **Sazón Natural, Comida del Hogar**

Sitio web completo para Mana Restaurant, un restaurante-bar en Bogotá, Colombia, que ofrece desayunos, almuerzos y cenas con ingredientes frescos y sazón casera.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [Scripts Disponibles](#scripts-disponibles)
- [Variables de Entorno](#variables-de-entorno)
- [Despliegue](#despliegue)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## ✨ Características

- 🎨 **Diseño Moderno y Responsive**: Compatible con móviles, tablets y desktop
- 🍔 **Menú Interactivo**: Catálogo completo con filtros por categoría
- 🍽️ **Constructor de Almuerzos**: Arma tu almuerzo personalizado con precio en tiempo real
- 📅 **Sistema de Reservas**: Reserva mesas para eventos especiales
- 👤 **Autenticación de Usuarios**: Login/Register con perfiles personalizados
- 🔐 **Panel de Administración**: Para gestionar menú, reservas y pedidos (solo para Geraldine)
- 💬 **Integración WhatsApp**: Botón flotante y enlaces directos para pedidos
- 🗺️ **Mapa de Ubicación**: Encuentra el restaurante fácilmente
- 📱 **Redes Sociales**: Enlaces a Instagram, Facebook y TikTok

---

## 🛠️ Tecnologías

### **Frontend**
- ⚛️ React 18
- ⚡ Vite
- 🎨 TailwindCSS
- 🧭 React Router DOM
- 📡 Axios
- 🎯 Lucide React (iconos)
- 🗺️ Leaflet / React-Leaflet (mapas)

### **Backend**
- 🟢 Node.js
- 🚀 Express
- 🗄️ PostgreSQL
- 🔒 JWT (JSON Web Tokens)
- 🔐 Bcryptjs
- ✅ Express Validator

### **Herramientas**
- 📦 npm
- 🐙 Git & GitHub Desktop
- 🔧 VS Code

---

## 📁 Estructura del Proyecto

```
mana-restaurant/
│
├── frontend/                      # Aplicación React
│   ├── public/
│   │   └── logo.png
│   │
│   ├── src/
│   │   ├── assets/               # Imágenes y recursos
│   │   │   ├── LOGOFNUDE.jpeg
│   │   │   ├── bg-mana.png
│   │   │   ├── FOTO1.jpeg
│   │   │   └── collage/
│   │   │       └── collage-fondo.jpg
│   │   │
│   │   ├── components/           # Componentes reutilizables
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── UserMenu.jsx
│   │   │   ├── WhatsAppFloat.jsx
│   │   │   ├── MenuCard.jsx
│   │   │   └── ClientMenuCard.jsx
│   │   │
│   │   ├── pages/                # Páginas principales
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── ClientsMenu.jsx
│   │   │   ├── Lunch.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Locations.jsx
│   │   │   └── About.jsx
│   │   │
│   │   ├── hooks/                # Custom Hooks
│   │   │   └── useAuth.js
│   │   │
│   │   ├── services/             # Servicios API
│   │   │   └── api.js
│   │   │
│   │   ├── utils/                # Utilidades
│   │   │   └── constants.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.local
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                       # API Node.js
│   ├── controllers/              # Controladores
│   │   ├── authController.js
│   │   ├── menuController.js
│   │   ├── reservationController.js
│   │   └── lunchController.js
│   │
│   ├── routes/                   # Rutas de la API
│   │   ├── auth.js
│   │   ├── menu.js
│   │   ├── reservations.js
│   │   └── lunch.js
│   │
│   ├── middleware/               # Middlewares
│   │   └── auth.js
│   │
│   ├── prisma/                   # Configuración de base de datos
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 Instalación

### **Prerrequisitos**

- Node.js 18+ instalado
- PostgreSQL 14+ instalado y corriendo
- Git instalado
- GitHub Desktop (opcional)

### **Clonar el Repositorio**

```bash
git clone https://github.com/tu-usuario/mana-restaurant.git
cd mana-restaurant
```

### **Instalar Dependencias**

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

---

## ⚙️ Configuración

### **1. Base de Datos PostgreSQL**

Crea una base de datos en PostgreSQL:

```sql
CREATE DATABASE mana_db;
```

### **2. Variables de Entorno**

#### Frontend (`frontend/.env.local`)
```env
VITE_API_URL=http://localhost:4000/api
VITE_WHATSAPP_NUMBER=573150118386
```

#### Backend (`backend/.env`)
```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/mana_db"
JWT_SECRET="tu_clave_secreta_super_segura_cambiar_en_produccion"
PORT=4000
NODE_ENV=development
```

### **3. Migrar Base de Datos**

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

---

## 🎮 Uso

### **Desarrollo**

#### Iniciar Backend
```bash
cd backend
npm run dev
```
El servidor estará en `http://localhost:4000`

#### Iniciar Frontend
```bash
cd frontend
npm run dev
```
La aplicación estará en `http://localhost:5173`

### **Producción**

#### Build del Frontend
```bash
cd frontend
npm run build
```

#### Iniciar Backend en Producción
```bash
cd backend
npm start
```

---

## 🎯 Funcionalidades

### **Para Clientes**

#### 🏠 **Página Principal**
- Hero section con información del restaurante
- Servicios destacados (Desayunos, Almuerzos, Cenas)
- Sección "Sobre Nosotros"
- Información de contacto y redes sociales

#### 🍽️ **Menú**
- Catálogo completo de productos
- Filtros por categoría (Desayunos, Almuerzos, Cenas, Cafetería)
- Búsqueda de productos
- Botón de ordenar por WhatsApp en cada producto

#### 🍴 **Armado de Almuerzo**
- Constructor interactivo de almuerzo
- Selección de plato principal
- Hasta 2 acompañamientos
- Opciones de sopa y jugo
- Cálculo de precio en tiempo real
- Opciones adicionales (arroz, icopor)
- Envío de pedido por WhatsApp

#### 📅 **Reservas**
- Formulario de reserva para eventos
- Selección de fecha y hora
- Número de personas (hasta 40)
- Tipo de evento (Cumpleaños, Cena de Grado, etc.)
- Políticas de cancelación (2 días de anticipación)

#### 👤 **Autenticación**
- Registro de nuevos usuarios
- Inicio de sesión
- Perfil de usuario
- Cierre de sesión

#### 🗺️ **Ubicación**
- Mapa interactivo
- Dirección del restaurante
- Horarios de atención

### **Para Administradores (Geraldine)**

#### 📊 **Panel de Administración**
- Gestión del menú (crear, editar, eliminar platos)
- Visualización de reservas
- Gestión de pedidos de almuerzo
- Actualización del menú del día
- Estadísticas básicas

---

## 📜 Scripts Disponibles

### **Frontend**

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye para producción
npm run preview  # Previsualiza el build de producción
```

### **Backend**

```bash
npm run dev           # Inicia con nodemon (auto-reload)
npm start             # Inicia en modo producción
npm run prisma:studio # Abre Prisma Studio (interfaz de BD)
```

---

## 🔐 Variables de Entorno

### **Frontend (.env.local)**

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL base del backend | `http://localhost:4000/api` |
| `VITE_WHATSAPP_NUMBER` | Número de WhatsApp con código de país | `XXXXXXXXXXXX` |

### **Backend (.env)**

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | Conexión a PostgreSQL | `postgresql://user:pass@localhost:5432/mana_db` |
| `JWT_SECRET` | Clave secreta para JWT | `clave_super_secreta_123` |
| `PORT` | Puerto del servidor | `4000` |
| `NODE_ENV` | Entorno de ejecución | `development` / `production` |

---

## 🌐 Despliegue

### **Frontend**

1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno
3. Build command: `npm run build`
4. Output directory: `dist`

### **Backend (Railway/Render)**

1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno
3. Añade la base de datos PostgreSQL
4. Start command: `npm start`

---

## 📊 Base de Datos

### **Modelos Principales**

- **User**: Usuarios del sistema (clientes y admin)
- **MenuItem**: Elementos del menú regular
- **DailyMenu**: Menú ejecutivo del día
- **Reservation**: Reservas de eventos
- **LunchOrder**: Pedidos de almuerzos personalizados

Ver el esquema completo en `backend/prisma/schema.prisma`

---

## 🎨 Diseño

### **Colores**

- **Marrón Principal**: `#8B4513` (mana-brown)
- **Dorado**: `#D4AF37` (mana-gold)
- **Crema**: `#F5F5DC` (mana-cream)

### **Tipografía**

- Fuente principal: Inter / System UI

---

## 📱 Integración WhatsApp

El sitio integra WhatsApp en múltiples puntos:

- Botón flotante en todas las páginas
- Enlaces directos desde las tarjetas de producto
- Envío de pedidos personalizados de almuerzo
- Contacto directo desde footer y navbar

**Número de WhatsApp**: +57 XXX XXX XXXX

---

## 📈 Información del Restaurante

- **Nombre**: Mana Restobar
- **Ubicación**: Bogotá, Colombia
- **Apertura**: 29 de Enero de 2025
- **Capacidad**: 35-40 personas
- **Horarios**:
  - Desayunos: 7:30 AM - 10:40 AM
  - Almuerzos: 11:45 AM - 3:00 PM
  - Cenas: 5:00 PM - 9:00 PM

### **Logros**
- 11+ meses en el mercado
- 700+ hamburguesas vendidas en concursos Burger Show
- Servicio personalizado y chefs especializados

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👥 Equipo

- **Equipo de Desarrollo**: Santiago Vargas Gomez
- 
---

## 📞 Contacto

- **WhatsApp**: +57 xxx xx xxxx
- **Email**: contacto@manarestaurante.com
- **Instagram**: [@manarestaurante](https://instagram.com/manarestaurante)
- **Facebook**: [Mana Restaurant](https://facebook.com/manarestaurante)
- **TikTok**: [@manarestaurante](https://tiktok.com/@manarestaurante)

---

**Hecho con ❤️ en Bogotá, Colombia**

*Última actualización: Noviembre 2024*
