import db from "../config/db.js";
import fs from "fs";
import path from "path";

// Obtener todos los items del menú
export const getMenuItems = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM menu ORDER BY fecha DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener menú:", error);
    res.status(500).json({ error: "Error al obtener el menú" });
  }
};

// Obtener un item por ID
export const getMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM menu WHERE id = ?", [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Item no encontrado" });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener item:", error);
    res.status(500).json({ error: "Error al obtener el item" });
  }
};

// Crear un nuevo item del menú con imagen
export const createMenuItem = async (req, res) => {
  try {
    const { nombre, descripcion, precio, tipo } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    if (!nombre || !precio) {
      return res.status(400).json({ error: "Nombre y precio son requeridos" });
    }

    const [result] = await db.query(
      "INSERT INTO menu (nombre, descripcion, precio, imagen, tipo) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion, precio, imagen, tipo]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      descripcion,
      precio,
      imagen,
      tipo,
      mensaje: "Item creado exitosamente",
    });
  } catch (error) {
    console.error("Error al crear item:", error);
    res.status(500).json({ error: "Error al crear el item" });
  }
};

// Actualizar un item del menú
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, tipo} = req.body;
    const nuevaImagen = req.file ? `/uploads/${req.file.filename}` : null;

    // Verificar si el item existe
    const [itemActual] = await db.query("SELECT * FROM menu WHERE id = ?", [id]);
    if (itemActual.length === 0) {
      return res.status(404).json({ error: "Item no encontrado" });
    }

    // Si hay una nueva imagen, eliminar la anterior
    if (nuevaImagen && itemActual[0].imagen) {
      const imagenAnterior = path.join(process.cwd(), "uploads", path.basename(itemActual[0].imagen));
      if (fs.existsSync(imagenAnterior)) {
        fs.unlinkSync(imagenAnterior);
      }
    }

    const imagen = nuevaImagen || itemActual[0].imagen;

    await db.query(
      "UPDATE menu SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, tipo = ? WHERE id = ?",
      [nombre, descripcion, precio, imagen, tipo, id]
    );

    res.json({
      id,
      nombre,
      descripcion,
      precio,
      imagen,
      tipo,
      mensaje: "Item actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar item:", error);
    res.status(500).json({ error: "Error al actualizar el item" });
  }
};

// Eliminar un item (soft delete)
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM menu WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Item no encontrado" });
    }

    // Soft delete
    await db.query("UPDATE menu SET activo = FALSE WHERE id = ?", [id]);

    res.json({ mensaje: "Item eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar item:", error);
    res.status(500).json({ error: "Error al eliminar el item" });
  }
};

// Eliminar permanentemente (con imagen)
export const hardDeleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM menu WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Item no encontrado" });
    }

    // Eliminar imagen física si existe
    if (rows[0].imagen) {
      const imagenPath = path.join(process.cwd(), "uploads", path.basename(rows[0].imagen));
      if (fs.existsSync(imagenPath)) {
        fs.unlinkSync(imagenPath);
      }
    }

    await db.query("DELETE FROM menu WHERE id = ?", [id]);

    res.json({ mensaje: "Item eliminado permanentemente" });
  } catch (error) {
    console.error("Error al eliminar item:", error);
    res.status(500).json({ error: "Error al eliminar el item" });
  }
};
