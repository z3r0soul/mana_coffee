import db from "../config/db.js";

// Obtener todas las reservaciones
export const getReservations = async (req, res) => {
  try {
    const [reservations] = await db.query(`
      SELECT * FROM reservas ORDER BY fecha DESC, hora DESC
    `);
    
    res.json(reservations);
  } catch (error) {
    console.error("Error al obtener reservaciones:", error);
    res.status(500).json({ error: "Error al obtener reservaciones" });
  }
};

// Obtener una reservación por ID
export const getReservation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [reservations] = await db.query(`
      SELECT * FROM reservas WHERE id = ?
    `, [id]);
    
    if (reservations.length === 0) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }
    
    res.json(reservations[0]);
  } catch (error) {
    console.error("Error al obtener reservación:", error);
    res.status(500).json({ error: "Error al obtener reservación" });
  }
};

// Obtener reservaciones del usuario autenticado
export const getUserReservations = async (req, res) => {
  try {
    // Usar el cliente_id del token
    const clienteId = req.usuario?.id;
    
    if (!clienteId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }
    
    const [reservations] = await db.query(
      "SELECT * FROM reservas WHERE cliente_id = ? ORDER BY fecha DESC, hora DESC",
      [clienteId]
    );
    
    res.json(reservations);
  } catch (error) {
    console.error("Error al obtener reservaciones del usuario:", error);
    res.status(500).json({ error: "Error al obtener reservaciones" });
  }
};

// Crear una nueva reservación
export const createReservation = async (req, res) => {
  try {
    const { nombre, telefono, email, personas, fecha, hora } = req.body;
    
    // Obtener cliente_id del token
    const clienteId = req.usuario?.id;
    
    if (!clienteId) {
      return res.status(401).json({ error: "Debes iniciar sesión para hacer una reserva" });
    }
    
    // Validaciones
    if (!nombre || !telefono || !email || !personas || !fecha || !hora) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    
    if (personas < 1 || personas > 35) {
      return res.status(400).json({ error: "El número de personas debe ser entre 1 y 35" });
    }
    
    // Validar hora (7:30 AM - 7:00 PM)
    const horaNum = parseInt(hora.split(':')[0]);
    const minutos = parseInt(hora.split(':')[1]);
    if (horaNum < 7 || horaNum > 19 || (horaNum === 7 && minutos < 30) || (horaNum === 19 && minutos > 0)) {
      return res.status(400).json({ error: "La hora debe estar entre 7:30 AM y 7:00 PM" });
    }
    
    // Verificar disponibilidad de horario (2 horas entre reservas)
    const [existingReservations] = await db.query(`
      SELECT hora FROM reservas 
      WHERE fecha = ? AND estado NOT IN ('CANCELADA', 'COMPLETADA')
    `, [fecha]);
    
    const nuevaHoraMinutos = horaNum * 60 + minutos;
    
    for (const reserva of existingReservations) {
      const [h, m] = reserva.hora.split(':').map(Number);
      const reservaMinutos = h * 60 + m;
      const diferencia = Math.abs(nuevaHoraMinutos - reservaMinutos);
      
      if (diferencia < 120) { // 120 minutos = 2 horas
        return res.status(409).json({ 
          error: "Horario no disponible",
          message: "Ya existe una reserva cercana a este horario. Debe haber al menos 2 horas entre reservas."
        });
      }
    }
    
    // Insertar reservación
    const [result] = await db.query(`
      INSERT INTO reservas (cliente_id, nombre, telefono, email, personas, fecha, hora, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDIENTE')
    `, [clienteId, nombre, telefono, email, personas, fecha, hora]);
    
    res.status(201).json({
      id: result.insertId,
      cliente_id: clienteId,
      nombre,
      telefono,
      email,
      personas,
      fecha,
      hora,
      estado: 'PENDIENTE'
    });
  } catch (error) {
    console.error("Error al crear reservación:", error);
    res.status(500).json({ error: "Error al crear reservación" });
  }
};

// Actualizar estado de reservación
export const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    
    const estadosValidos = ['PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "Estado no válido" });
    }
    
    const [result] = await db.query(`
      UPDATE reservas SET estado = ? WHERE id = ?
    `, [estado, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }
    
    res.json({ message: "Estado actualizado correctamente", estado });
  } catch (error) {
    console.error("Error al actualizar reservación:", error);
    res.status(500).json({ error: "Error al actualizar reservación" });
  }
};

// Eliminar reservación
export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.query(`DELETE FROM reservas WHERE id = ?`, [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }
    
    res.json({ message: "Reservación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar reservación:", error);
    res.status(500).json({ error: "Error al eliminar reservación" });
  }
};

// Verificar disponibilidad de horarios para una fecha
export const checkAvailability = async (req, res) => {
  try {
    const { fecha } = req.query;
    
    if (!fecha) {
      return res.status(400).json({ error: "La fecha es requerida" });
    }
    
    // Obtener reservas activas del día
    const [reservations] = await db.query(`
      SELECT hora FROM reservas 
      WHERE fecha = ? AND estado NOT IN ('CANCELADA', 'COMPLETADA')
    `, [fecha]);
    
    // Horarios base disponibles
    const horariosBase = [
      "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
      "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
      "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
      "18:00", "18:30", "19:00"
    ];
    
    // Calcular horarios no disponibles (dentro de 2 horas de una reserva existente)
    const horasOcupadas = reservations.map(r => {
      const [h, m] = r.hora.split(':').map(Number);
      return h * 60 + m;
    });
    
    const horariosDisponibles = horariosBase.filter(horario => {
      const [h, m] = horario.split(':').map(Number);
      const minutos = h * 60 + m;
      
      // Verificar si está a menos de 2 horas de alguna reserva
      return !horasOcupadas.some(ocupada => Math.abs(minutos - ocupada) < 120);
    });
    
    res.json({
      fecha,
      horariosDisponibles,
      horariosOcupados: horariosBase.filter(h => !horariosDisponibles.includes(h))
    });
  } catch (error) {
    console.error("Error al verificar disponibilidad:", error);
    res.status(500).json({ error: "Error al verificar disponibilidad" });
  }
};
