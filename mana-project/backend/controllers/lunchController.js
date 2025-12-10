import db from '../config/db.js';

// Controlador para obtener el menú de almuerzo del día
export const getLunchMenu = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT almuerzo FROM almuerzo_diario LIMIT 1');
    
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }
    
    const imagen = rows[0].almuerzo;
    
    if (!imagen) {
      return res.status(404).json({ error: 'No hay imagen disponible' });
    }
    
    // Convertir el buffer a base64 para enviarlo al frontend
    const base64Image = `data:image/jpeg;base64,${imagen.toString('base64')}`;
    
    res.json({ imageUrl: base64Image });
  } catch (error) {
    console.error('Error al obtener el menú de almuerzo:', error);
    res.status(500).json({ error: 'Error al obtener el menú de almuerzo' });
  }
};