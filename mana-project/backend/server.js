import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import menuRoutes from "./routes/menu.js";
import authRoutes from "./routes/auth.js";
import reservationRoutes from "./routes/reservations.js";
import lunchRoutes from "./routes/lunch.js";

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors({
  origin: ["http://localhost:5175", "https://subtemporal-conception-brusquely.ngrok-free.dev"], // URL del frontend
  credentials: true, // Permitir cookies
}));
app.use(cookieParser()); // Para leer cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (imágenes subidas)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rutas
app.use("/api/menu", menuRoutes); // Rutas de admin (CRUD)
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/lunch", lunchRoutes);
// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API de Mana Coffee funcionando correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});