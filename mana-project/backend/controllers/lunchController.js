import db from '../db.js';

// Controlador para obtener el menú de almuerzo del día
export const getLunchMenu = async (req, res) => {
  try {
    
    const [rows] = await db.query( 'SELECT almuerzo FROM almuerzo_diario' );
    if (!rows || rows.length === 0) {
            return res.status(404).send('Imagen no encontrada');
    }
    const imagen = rows[0];
    } catch (error) {

        console.error('Error al obtener el menú de almuerzo:', error);
        res.status(500).json({ error: 'Error al obtener el menú de almuerzo' });
    }
};