import SaleModels from "../models/sale.models.js";
import ProductModels from "../models/product.models.js";

// Registrar una venta
export const createSale = async (req, res) => {
    let saleId = null;

    try {
        const { userName, items } = req.body;

        //Validamos cada producto y calculamos el total con los precios de la base
        let total = 0;

        for (const item of items) {
            const [rows] = await ProductModels.selectProductById(item.id);
            const product = rows[0];

            if (!product || !product.active) {
                return res.status(400).json({
                    message: `El producto ${item.id} no existe o esta inactivo`
                });
            }

            total += Number(product.price) * item.quantity;
        }

        //Guardamos la venta
        const [saleResult] = await SaleModels.insertSale(total, userName);
        saleId = saleResult.insertId;

        //Una fila en product_sales por cada unidad comprada
        for (const item of items) {
            for (let i = 0; i < item.quantity; i++) {
                await SaleModels.insertProductSale(item.id, saleId);
            }
        }

        res.status(201).json({
            message: "Venta registrada exitosamente",
            saleId: saleId,
            total: total
        });

    } catch (error) {
        console.log("Error registrando venta: ", error);

        // Si la venta ya se habia creado se borra
        if (saleId) {
            try {
                await SaleModels.deleteSale(saleId);
            } catch (errorDelete) {
                console.log("No se pudo deshacer la venta: ", errorDelete);
            }
        }

        res.status(500).json({
            message: "Error interno al registrar la venta"
        });
    }
}


// Obtener todas las ventas
export const getAllSales = async (req, res) => {
    try {
        const [rows] = await SaleModels.selectAllSales(); 
        res.status(200).json({
            payload: rows
        });
    } catch (error) {
        console.log("Error obteniendo ventas: ", error);
        res.status(500).json({
            message: "Error interno al obtener las ventas"
        });
    }
}