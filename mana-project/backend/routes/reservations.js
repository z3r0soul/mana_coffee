import express from "express";
import {
  getReservations,
  getReservation,
  createReservation,
  updateReservationStatus,
  deleteReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

// Rutas de reservaciones
router.get("/", getReservations);
router.get("/:id", getReservation);
router.post("/", createReservation);
router.patch("/:id/status", updateReservationStatus);
router.delete("/:id", deleteReservation);

export default router;
