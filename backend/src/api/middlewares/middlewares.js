

//MIDDLEWARES

// Middlewares logger
const loggerUrl = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
};


// Middleware de ruta para filtrar ids no validos
const validateId = (req, res, next) => {
    const id = Number(req.params.id); // Convierto a ID a num
    // Filtro por si no es NUmero o es 0
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El id debe ser un numero entero positivo"
        });
    }

    req.id = id;
    next(); // Damos paso al siguiente middleware o a la respuesta
}


// Middleware de ruta para validar los datos de un usuario
const validateUser = (req, res, next) => {
    const errores = [];
    const { name, email, password } = req.body;

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos dos caracteres");
    }

    if (typeof email !== "string" || !email.includes("@")) {
        errores.push("El email no es valido");
    }

    if (typeof password !== "string" || password.length < 6) {
        errores.push("La password debe tener al menos 6 caracteres");
    }

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next();
}



// Middleware de ruta para validar los campos de un formulario
const validateProduct = (req, res, next) => {
    const categoriasValidas = ["cuerda", "percusion"];
    const errores = []; // Array vacio de errores

    // Recogemos los datos del body
    const { name, image, price, category } = req.body;

    // Verificamos los datos de entrada
    if (!name || !image || !price || !category) {
        errores.push("Faltan campos requeridos");
    }

    // Verificamos el campo name
    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos dos caracteres");
    }

    // Convertimos Strings a Num y Verificamos el campo precio
    if (isNaN(Number(price)) || Number(price) <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    // Verificamos el campo category
    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida")
    }

    // Si existe algun error en nuestro array, devolveremos estos en un 400
    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next(); 
}


// Middleware de ruta para proteger las rutas (las vistas del dashboard)
const requireLogin = (req, res, next) => {
    // Si no existe usuario en la sesion, redirigimos a la pantalla login
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}


// Exportamos nuestros middlewares para llevarlos a otros modulos
export {
    loggerUrl,
    validateId,
    validateProduct,
    validateUser,
    requireLogin
}
    