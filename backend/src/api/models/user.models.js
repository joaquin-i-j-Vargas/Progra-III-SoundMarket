import connections from "../database/db.js";

export const insertNewUser = (user, email, password) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

     return connection.query(sql, [name, email, password]);

}