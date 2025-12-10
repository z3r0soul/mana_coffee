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

// Crear una nueva reservación
export const createReservation = async (req, res) => {
  try {
    const { nombre, telefono, email, personas, fecha, hora } = req.body;
    
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
    
    // Insertar reservación
    const [result] = await db.query(`
      INSERT INTO reservas (nombre, telefono, email, personas, fecha, hora, estado)
      VALUES (?, ?, ?, ?, ?, ?, 'PENDIENTE')
    `, [nombre, telefono, email, personas, fecha, hora]);
    
    res.status(201).json({
      id: result.insertId,
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
