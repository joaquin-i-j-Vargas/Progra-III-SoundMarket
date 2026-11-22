import { Router } from "express";
import Authcontroller from "../controllers/auth.controller.js"

const router = Router();

router.get("/login", Authcontroller.renderLogin);
router.post("/login", Authcontroller.login);
router.post("/logout", Authcontroller.logout);

export default router;