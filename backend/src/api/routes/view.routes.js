import { Router } from "express";
import { requireLogin } from "../middlewares/middlewares.js";
import {
    vistaPrincipal,
    vistaConsultar,
    vistaCrear,
    vistaModificar
} from "../controllers/view.controllers.js"

const router = Router();


/* - Rutas de vistas del panel adm - */

router.get("/", requireLogin, (req, res) => {
    res.redirect("/dashboard/principal");
});

router.get("/principal", requireLogin, vistaPrincipal);
router.get("/consultar", requireLogin, vistaConsultar);
router.get("/crear", requireLogin, vistaCrear);
router.get("/modificar", requireLogin, vistaModificar);

export default router;