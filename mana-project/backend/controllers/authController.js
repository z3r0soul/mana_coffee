import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db.js";

dotenv.config();

const jwt_hash = process.env.JWT_SECRET;



const manejarErrorBD = (error) => {
  console.error('Error de base de datos:', error);
  
  if (error.code === 'ECONNREFUSED') {
    return { 
      status: 503, 
      message: "No se puede conectar a la base de datos." 
    };
  }
  
  if (error.code === 'ENOTFOUND') {
    return { 
      status: 503, 
      message: "Servidor de base de datos no encontrado." 
    };
  }
  
  if (error.code === 'ER_ACCESS_DENIED_ERROR') {
    return { 
      status: 503, 
      message: "Error de credenciales de base de datos." 
    };
  }
  
  if (error.code === 'ETIMEDOUT') {
    return { 
      status: 503, 
      message: "Timeout de conexión a la base de datos." 
    };
  }
  
  return { 
    status: 500, 
    message: "Error interno del servidor." 
  };
};

export const registerUser = async (req, res) => {
  const { nombre, apellido, telefono, email, password } = req.body;

  try {
    const [existing] = await db.query(
      "SELECT cliente_id FROM Cliente WHERE Email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO Cliente (Nombre, Apellido, Telefono, Email, Contrasena) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, telefono, email, hash]
    );

    const userId = result.insertId;

    /*const access_token = jwt.sign({ id: userId, email }, jwt_hash, {
      expiresIn: "8h",
    });
    */

    res.json({
      message: "Usuario registrado correctamente",
      user: { id: userId, nombre, email }
    });
  } catch (err) {
    console.error(err);
    const errorInfo = manejarErrorBD(err);
    res.status(errorInfo.status).json({ error: errorInfo.message });
  }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
    const [usuarios] = await db.query(
      "SELECT cliente_id, Nombre, Apellido, Telefono, Email, Contrasena FROM Cliente WHERE Email = ?",
      [email]
    );
    if (usuarios.length === 0) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }
    const user = usuarios[0];
    const match = await bcrypt.compare(password, user.Contrasena);
    if (!match) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }
    const access_token = jwt.sign(
      { id: user.cliente_id, email: user.Email },
      jwt_hash,{
        expiresIn: "8h",
      }
    );

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: false,
      maxAge: 8 * 60 * 60 * 1000, 
    });

    res.json({
      message: "Login exitoso",
      usuario: { id: user.cliente_id, nombre: user.Nombre, apellido: user.Apellido, email: user.Email },
      token: access_token,
    });

  } catch(err){

    console.error(err);
    const errorInfo = manejarErrorBD(err);
    res.status(errorInfo.status).json({ error: errorInfo.message });
  }
};

// Obtener perfil del usuario autenticado
export const getProfile = async (req, res) => {
  try {
    const userId = req.usuario.id;

    const [usuarios] = await db.query(
      "SELECT cliente_id, Nombre, Apellido, Telefono, Email FROM Cliente WHERE cliente_id = ?",
      [userId]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = usuarios[0];

    res.json({
      id: user.cliente_id,
      nombre: user.Nombre,
      apellido: user.Apellido,
      telefono: user.Telefono,
      email: user.Email,
    });
  } catch (err) {
    console.error(err);
    const errorInfo = manejarErrorBD(err);
    res.status(errorInfo.status).json({ error: errorInfo.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });
  
  res.json({ message: "Logout exitoso" });
};

// Verificar si el usuario es admin
export const checkAdmin = async (req, res) => {
  try {
    const userId = req.usuario.id;
    const userEmail = req.usuario.email;
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_HASH;

    if (!adminEmail || !adminEmail.includes(userEmail)) {
      return res.json({ isAdmin: false });
    }

    const [usuarios] = await db.query(
      "SELECT Contrasena FROM Cliente WHERE cliente_id = ?",
      [userId]
    );

    if (usuarios.length === 0) {
      return res.json({ isAdmin: false });
    }

    const match = await bcrypt.compare(adminPassword, usuarios[0].Contrasena);
    
    res.json({ isAdmin: match });
  } catch (err) {
    console.error("Error al verificar admin:", err);
    res.status(500).json({ error: "Error al verificar permisos" });
  }
};









