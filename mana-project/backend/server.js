import express from "express";
import cors from "cors";
const app = express();
const PORT = 4000;
app.use(cors());












app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});