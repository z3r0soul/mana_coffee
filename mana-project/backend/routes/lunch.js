import express from 'express';
import { getLunchMenu } from '../controllers/lunchController.js';

const router = express.Router();

// Obtener la imagen del menú del día
router.get('/today', getLunchMenu);

export default router;