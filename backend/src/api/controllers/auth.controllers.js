import AuthModel from "../routes/models.auth.routes";

const Authcontroller = {
    renderLogin: (req, res) => {
        res.render("login", {
            title: "Login usuario",
            about: "Login usuario admin"
        });
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.render("login", {
                    title: "Login usuario",
                    about: "Login usuario admin",
                    error: "Todos los campos son requeridos"
                });
            }

            const user = await AuthModel.findUserByCredentials(email, password);

            if (!user) {
                return res.render("login", {
                    title: "Login usuario",
                    about: "Login usuario admin",
                    error: "Credenciales incorrectas"
                });
            }

            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            return res.redirect("/dashboar/principal");
        } catch (error) {
            console.error("Error en el login:", error);
            return res.status(500).json({
                message: "Error interno del servidor"
            });
        }
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error al destruir la sesión:", err);
                return res.status(500).json({
                    message: "Error al cerrar la sesión"
                });
            }

            return res.redirect("/login");
        });
    }
};

export default Authcontroller;