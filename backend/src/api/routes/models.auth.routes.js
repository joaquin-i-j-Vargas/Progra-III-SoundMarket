import connection from "../database/db";

const AuthModel = {
    findUserByCredentials: async(email, password) => {
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        const [rows] = await connection.query(sql, [email, password]);
        return rows [0];
    }
};

export default AuthModel;