import connection from "../database/db.js";


//Los placeholders -> "?" nos ayudan a evitar los ataques de inyeccion SQL. Es nuestra manera de hacer consultas SQL mas seguras


//Extrae los productos, solo los resultado de las consultas.
const selectAllProducts = () => {
    return connection.query("SELECT * FROM products");
}

//Obtener productos activos
const selectActiveProducts = () => {
    const sql = "SELECT * FROM products WHERE products.active = ?";
    return connection.query(sql, [1]);
}

//obtener productos por ID
const selectProductById = (id) => {
    const sql = `SELECT * FROM products WHERE products.id = ?`
    return connection.query(sql, [id]);
}

//Crear producto
const insertNewProduct = (name, image, category, price) =>{
    const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [name, image, category, price]);
}

//Modificar producto
const updateProduct = (name, image, price, category, active, id) => {
    const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ?, active = ? WHERE id = ?";
    return connection.query(sql, [name, image, price, category, active, id]);
}

//Eliminar producto
const deleteProduct = (id) => {
    const sql = "DELETE FROM products WHERE id = ?";
    return connection.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductById,
    insertNewProduct,
    updateProduct,
    deleteProduct,
    selectActiveProducts
}