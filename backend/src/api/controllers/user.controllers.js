import { insertNewUser } from "../models/user.models";


export const createNewUser = async (req, res) => {

    try {

        const { name, mail, password } = req.body;

        console.log(result);

        res.render("createUser", {

            title: "Crear usuario",
            about: "Crear usuario admin",
            message: "Usuario creado exitosamente"


        });

    } catch(error){

        console.log("Error creando usuario: ", error);

        res.status(500).json({
            message: "Error interno al crear usuario"
        });

    }



}