

//Rutas producto

// Router funciona como una "mini aplicacion de express"
import { Router } from "express"; 
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { createProduct, getActiveProducts, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

// Hacemos lo mismo que con const app = express();
const router = Router(); 


// Obetener todos los productos
router.get("/", getAllProducts);


// Obetenere productos activados
router.get("/active", getActiveProducts);


// Obetener productos por ID
router.get("/:id", validateId, getProductById);


// POST crear nuevo producto
router.post("/", validateProduct, createProduct);


// PUT producto
router.put("/", validateProduct, modifyProduct);



// Eliminar producto
router.delete("/:id", validateId, removeProduct);


// Exportamos todas estas rutas de producto
export default router;