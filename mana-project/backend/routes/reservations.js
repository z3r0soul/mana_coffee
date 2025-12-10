import express from "express";
import {
  getReservations,
  getReservation,
  getUserReservations,
  createReservation,
  updateReservationStatus,
  deleteReservation,
  checkAvailability,
} from "../controllers/reservationController.js";
import { verificarToken } from "../middleware/auth.js";

const router = express.Router();

// Rutas públicas
router.get("/availability", checkAvailability);

// Rutas protegidas (requieren autenticación)
router.get("/user", verificarToken, getUserReservations);
router.post("/", verificarToken, createReservation);

// Rutas de administración (requieren autenticación)
router.get("/", verificarToken, getReservations);
router.get("/:id", verificarToken, getReservation);
router.patch("/:id/status", verificarToken, updateReservationStatus);
router.delete("/:id", verificarToken, deleteReservation);

export default router;
