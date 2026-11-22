

//Rutas usuario

import { Router } from "express";
import { createNewUser } from "../controllers/user.controllers.js";
const router = Router();


// Crear nuevo usuario
router.post("/", createNewUser);

export default router;