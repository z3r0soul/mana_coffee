import express from "express";
import {
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    checkAdmin,
} from "../controllers/authController.js";
import { verificarToken } from "../middleware/auth.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verificarToken, getProfile);
router.post("/logout", verificarToken, logoutUser);
router.get("/check-admin", verificarToken, checkAdmin);
export default router;