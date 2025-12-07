import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const password = process.env.ADMIN_HASH;
const email = process.env.ADMIN_EMAIL;
const JWT_SECRET = process.env.JWT_SECRET;

export const verificarTokenHTML = (req, res, next) => {
  // recoge el token jwt primero
  let token = req.cookies.acces_token;
  
  // Si no está en cookies, buscar en el header Authorization
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  if (!token) {
    alert('No has iniciado sesion. Redirigiendo a inicio');
    return res.json({success: false, redirect: "/"})

  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.error(' Token inválido, redirigiendo a login');
    return res.json({success: false, redirect: "/"})

  }
};



export const verificarToken = (req, res, next) => {

  let token = req.cookies.token;
  

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }
  
  if (!token) {
    console.log(' No se encontró token en cookies ni en Authorization header');
    return res.status(401).json({ error: "Acceso no autorizado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    console.log(' Token verificado:', { id: decoded.id, email: decoded.email });
    next();
  } catch (error) {
    console.error(' Error al verificar token:', error.message);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};


export const verificarAdmin = async (req, res, next) => {
  try {
    if (!req.usuario || !req.usuario.email) {
      console.log(' No hay una sesion activa');
      return res.json({success: false, redirect: "/"})
    }

    if (!email.includes(req.usuario.email)) {
      
      return res.json({success: false, redirect: "/"})
    }
    
    const [rows] = await db.query(
      "SELECT Contrasena FROM Cliente WHERE cliente_id = ?", 
      [req.usuario.id]
    );
    
    if (rows.length === 0) {
      console.log('Usuario no encontrado en BD');
      return res.json({success: false, redirect: "/"})
    }

    const match = await bcrypt.compare(password, rows[0].Contrasena);
    if (!match) {

      return res.json({success: false, redirect: "/"})
    }
    

    next(); 
  } catch (error) {

    console.error('Error en verificarAdmin:', error);
    return res.json({success: false, redirect: "/"})
  }
};