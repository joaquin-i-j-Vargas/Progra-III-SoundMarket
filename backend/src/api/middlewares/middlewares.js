

//MIDDLEWARES

// Middlewares logger
const loggerUrl = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
};


// Middleware de ruta para filtrar ids no validos
const validateId = (req, res, next) => {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "El id debe ser un numero entero positivo"
        });
    }

    req.id = id;
    next(); 
}


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



const validateProduct = (req, res, next) => {
    const categoriasValidas = ["cuerda", "percusion"];
    const errores = []; // Array vacio de errores


    const { name, image, price, category } = req.body;


    if (!name || !image || !price || !category) {
        errores.push("Faltan campos requeridos");
    }


    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos dos caracteres");
    }


    if (isNaN(Number(price)) || Number(price) <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }


    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida")
    }


    if (req.method === "PUT") {
        const { id, active } = req.body;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            errores.push("El id debe ser un numero entero positivo");
        }

        if (![0, 1].includes(Number(active))) {
            errores.push("El campo active debe ser 0 o 1");
        }
    }


    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos",
            listaErrores: errores
        });
    }

    next(); 
}



const requireLogin = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}


export {
    loggerUrl,
    validateId,
    validateProduct,
    validateUser,
    requireLogin
}
    