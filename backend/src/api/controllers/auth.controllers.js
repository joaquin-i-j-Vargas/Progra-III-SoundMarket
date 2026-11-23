import { selectUserByEmail } from "../models/user.models.js";
import bcrypt from "bcrypt";

// Muestra el formulario de login
export const showLogin = (req, res) => {
    res.render("login", {
        title: "Login usuario",
        about: "Login usuario admin"
    });
}

// Procesa el login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("login", {
                title: "Login usuario",
                about: "Login usuario admin",
                error: "Todos los campos son requeridos"
            });
        }

        const [rows] = await selectUserByEmail(email);
        const user = rows[0];

        const passwordOk = user ? await bcrypt.compare(password, user.password) : false;



        if (!passwordOk) {
            return res.status(401).render("login", {
                title: "Login usuario",
                about: "Login usuario admin",
                error: "Credenciales incorrectas"
            });
        }



        // En la sesion guardamos solo lo necesario, nunca la password
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        res.redirect("/dashboard/principal");

    } catch (error) {
        console.log("Error en login: ", error);

        res.status(500).json({
            message: "Error interno al iniciar sesion"
        });
    }
}

// Cierra la sesion
export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
}