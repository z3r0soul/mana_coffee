import express from 'express';
import multer from 'multer';
import { getLunchMenu, uploadLunchImage } from '../controllers/lunchController.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';

const router = express.Router();

// Configurar multer para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Límite de 5MB
  },
  fileFilter: (req, file, cb) => {
    // Aceptar solo imágenes
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  },
});

// Obtener la imagen del menú del día
router.get('/today', getLunchMenu);

// Subir/actualizar imagen del almuerzo (solo admin)
router.post('/upload', verificarToken, verificarAdmin, upload.single('imagen'), uploadLunchImage);

export default router;