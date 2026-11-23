import ProductModels from "../models/product.models.js";


/* - Vistas del panel admin - */

export const vistaPrincipal = async (req, res) => {
    try {
        const [rows] = await ProductModels.selectAllProducts();

        const productosCuerda = rows.filter((p) => p.category === "cuerda");
        const productosPercusion = rows.filter((p) => p.category === "percusion");

        res.render("index", {
            title: "Productos",
            about: "Listado de productos",
            productosCuerda,
            productosPercusion
        });

    } catch (error) {
        console.error("Error cargando el panel:", error);
        res.status(500).send("Error interno al cargar el panel");
    }
};

export const vistaConsultar = (req, res) => {
    res.render("get", {
        title: "Consultar producto",
        about: "Consultar producto por id"
    });
};

export const vistaCrear = (req, res) => {
    res.render("post", {
        title: "Agregar producto",
        about: "Agregar producto"
    });
};

export const vistaModificar = (req, res) => {
    res.render("put", {
        title: "Modificar producto",
        about: "Modificar producto por id",
        idInicial: req.query.id || ""
    });
};