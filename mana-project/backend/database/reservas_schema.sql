-- =====================================================
-- ESQUEMA DE BASE DE DATOS PARA RESERVACIONES
-- Mana Coffee - Sistema de Reservas con relación a Cliente
-- =====================================================

-- Tabla de reservaciones
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    personas INT NOT NULL CHECK (personas >= 1 AND personas <= 35),
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado ENUM('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA') DEFAULT 'PENDIENTE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Llave foránea al cliente
    CONSTRAINT fk_reservas_cliente FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id) ON DELETE CASCADE,
    
    -- Índices para mejorar consultas
    INDEX idx_fecha (fecha),
    INDEX idx_estado (estado),
    INDEX idx_telefono (telefono),
    INDEX idx_cliente (cliente_id)
);

-- =====================================================
-- Si ya existe la tabla y necesitas agregar la columna cliente_id:
-- =====================================================

-- ALTER TABLE reservas ADD COLUMN cliente_id BIGINT NOT NULL AFTER id;
-- ALTER TABLE reservas ADD CONSTRAINT fk_reservas_cliente FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id) ON DELETE CASCADE;
-- ALTER TABLE reservas ADD INDEX idx_cliente (cliente_id);

-- =====================================================
-- CONSULTAS ÚTILES
-- =====================================================

-- Ver todas las reservaciones con datos del cliente
-- SELECT r.*, c.Nombre as cliente_nombre, c.Email as cliente_email 
-- FROM reservas r 
-- JOIN Cliente c ON r.cliente_id = c.cliente_id 
-- ORDER BY r.fecha, r.hora;

-- Ver reservaciones de un cliente específico
-- SELECT * FROM reservas WHERE cliente_id = 1 ORDER BY fecha DESC;

-- Ver reservaciones de una fecha específica
-- SELECT * FROM reservas WHERE fecha = '2025-12-25';

-- Ver reservaciones pendientes
-- SELECT * FROM reservas WHERE estado = 'PENDIENTE' ORDER BY fecha, hora;

-- Contar reservaciones por estado
-- SELECT estado, COUNT(*) as cantidad FROM reservas GROUP BY estado;
