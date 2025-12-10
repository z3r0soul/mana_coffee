-- =====================================================
-- ESQUEMA DE BASE DE DATOS PARA RESERVACIONES
-- Mana Coffee - Sistema de Reservas (sin platos)
-- =====================================================

-- Tabla de reservaciones
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    personas INT NOT NULL CHECK (personas >= 1 AND personas <= 35),
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado ENUM('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA') DEFAULT 'PENDIENTE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices para mejorar consultas
    INDEX idx_fecha (fecha),
    INDEX idx_estado (estado),
    INDEX idx_telefono (telefono)
);

-- =====================================================
-- CONSULTAS ÚTILES
-- =====================================================

-- Ver todas las reservaciones
-- SELECT * FROM reservas ORDER BY fecha, hora;

-- Ver reservaciones de una fecha específica
-- SELECT * FROM reservas WHERE fecha = '2025-12-25';

-- Ver reservaciones pendientes
-- SELECT * FROM reservas WHERE estado = 'PENDIENTE' ORDER BY fecha, hora;

-- Contar reservaciones por estado
-- SELECT estado, COUNT(*) as cantidad FROM reservas GROUP BY estado;
