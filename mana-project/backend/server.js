import express from "express";
import cors from "cors";
import path from "path";
import menuRoutes from "./routes/menu.js";

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (imágenes subidas)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rutas
app.use("/api/menu", menuRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API de Mana Coffee funcionando correctamente" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});