import express from "express";
import upload from "../config/multer.js";
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
router.post("/", upload.single("imagen"), createMenuItem);
router.put("/:id", upload.single("imagen"), updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.delete("/:id/hard", hardDeleteMenuItem);

export default router;
