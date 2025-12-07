import express from "express";
import {
    registerUser,
    loginUser,
    getProfile,
} from "../controllers/authController.js";
import { verificarToken } from "../middleware/auth.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verificarToken, getProfile);

export default router;