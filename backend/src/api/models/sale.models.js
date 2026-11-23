import connection from "../database/db.js";


//Obtener todas las ventas con sus productos
const selectAllSales = () => {
    const sql = 
        `SELECT s.id AS sale_id, s.date, s.total_price, s.user_name, p.id AS product_id, p.name, p.price
        FROM sales s
        INNER JOIN product_sales ps ON ps.sale_id = s.id
        INNER JOIN products p ON p.id = ps.product_id
        ORDER BY s.id DESC`;
    return connection.query(sql);
}

//Obtener venta por ID
const selectSaleById = (id) => {
    const sql = "SELECT * FROM sales WHERE sales.id = ?";
    return connection.query(sql, [id]);
}

//Crear venta
const insertSale = (totalPrice, userName) => {
    const sql = "INSERT INTO sales (total_price, user_name) VALUES (?, ?)";
    return connection.query(sql, [totalPrice, userName]);
}

//Registrar producto vendido en tabla intermedia
const insertProductSale = (productId, saleId) => {
    const sql = "INSERT INTO product_sales (product_id, sale_id) VALUES (?, ?)";
    return connection.query(sql, [productId, saleId]);
}

const deleteSale = (id) => {
    const sql = "DELETE FROM sales WHERE id = ?";
    return connection.query(sql, [id]);
}

export default {
    selectAllSales,
    selectSaleById,
    insertSale,
    insertProductSale,
    deleteSale
}