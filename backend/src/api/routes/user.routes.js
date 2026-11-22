

//Rutas usuario
import { validateUser } from "../middlewares/middlewares.js";
import { Router } from "express";
import { createNewUser } from "../controllers/user.controllers.js";
const router = Router();


// Crear nuevo usuario
router.post("/", validateUser, createNewUser);

export default router;