import express from "express";
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  hardDeleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

// Rutas del menú
router.get("/", getMenuItems);
router.get("/:id", getMenuItem);
router.post("/", createMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.delete("/:id/hard", hardDeleteMenuItem);

export default router;
