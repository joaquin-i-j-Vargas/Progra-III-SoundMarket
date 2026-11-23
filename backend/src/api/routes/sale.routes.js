
// Rutas Ventas

import { Router } from "express";
import { validateSale } from "../middlewares/middlewares.js";
import { createSale, getAllSales } from "../controllers/sale.controllers.js";

const router = Router();

router.get("/", getAllSales);
router.post("/", validateSale, createSale);

export default router;