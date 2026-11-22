import connection from "../database/db.js";

//crear usuario
export const insertNewUser = (name, email, password) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    return connection.query(sql, [name, email, password]);
}


// Buscar usuario por email
export const selectUserByEmail = (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    return connection.query(sql, [email]);
}