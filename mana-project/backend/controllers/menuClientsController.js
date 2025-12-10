import db from "../config/db.js";

// Obtener el menú para clientes (público)
export const getClientMenu = async (req, res) => {
    try {
        // Obtenemos todos los items,
        // El frontend agrupará por 'tipo'.
        const [rows] = await db.query(
            "SELECT * FROM menu ORDER BY tipo, nombre ASC"
        );
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener menú de clientes:", error);
        res.status(500).json({ error: "Error al obtener el menú" });
    }
};
