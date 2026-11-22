import ProductModels from "../models/product.models.js";



//Obtener todos los Productos 
export const getAllProducts = async (req, res) => {
        
        //Manejo de errores con un try/catch
        try {
        // El controlador llama al modelo
        const [rows] = await ProductModels.selectAllProducts();
        //Devolvuelve un codigo 404 si no se encuentran productos
        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }
        // Opcional, metadata util para el frontend
        res.status(200).json({
            payload: rows,
            total: rows.length         
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        //si hay un fallo la conexion a la BBDD
        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}



//Otener Productos activos
export const getActiveProducts = async (req, res) => {
    try {
        //llama al modelo para obtener productos activos
        const [rows] = await ProductModels.selectActiveProducts();

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos activos"
            });
        }

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log("Error obteniendo productos activos: ", error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}



//Obtener producto por ID
export const getProductById = async (req, res) => {

    try {

        const [rows] = await ProductModels.selectProductById(req.id);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontro producto con id ${req.id}`
            });
        }

        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}



//Crear Producto
export const createProduct = async (req, res) => {

    try {
        const { category, image, name, price } = req.body; // Extraemos los valores parseados del cuerpo de la peticion HTTP

        const [result] = await ProductModels.insertNewProduct(name, image, category, price);

        console.log(result);

        res.status(201).json({
            message: "Producto creado exitosamente",
            productId: result.insertId 
        });


    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}



//Modificar Producto
export const modifyProduct = async (req, res) => {

    try {

        const { id, name, image, price, category, active } = req.body;

        const [result] = await ProductModels.updateProduct(name, image, price, category, active, id);

        console.log(result);

    if (result.affectedRows === 0) {
        return res.status(404).json({
        message: `No se encontro producto con id ${id}`
        });
    }

        res.status(200).json({
            message: "Producto actualizado exitosamente"
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno al modificar productos"
        });
    }
}



//Eliminar Producto
export const removeProduct = async (req, res) => {

    try {

        await ProductModels.deleteProduct(req.id);
    
        res.status(200).json({
            message: `Producto con id ${req.id} eliminado exitosamente`
        });


    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}