import { insertNewUser, selectUserByEmail } from "../models/user.models.js";

export const createNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Evitamos emails duplicados
        const [existing] = await selectUserByEmail(email);

        if (existing.length > 0) {
            return res.status(409).json({
                message: "Ya existe un usuario con ese email"
            });
        }

        const [result] = await insertNewUser(name, email, password);

        res.status(201).json({
            message: "Usuario creado exitosamente",
            userId: result.insertId
        });

    } catch (error) {
        console.log("Error creando usuario: ", error);

        res.status(500).json({
            message: "Error interno al crear usuario"
        });
    }
}