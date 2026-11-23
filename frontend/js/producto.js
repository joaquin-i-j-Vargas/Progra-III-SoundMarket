exigirNombre();

let categoriaActual = "cuerda";
let todosLosProductos = [];

const grilla = document.getElementById("grilla");
const pestanas = document.querySelectorAll(".pestana");


/* LLAMADO AL BACKEND */
async function cargar() {
    grilla.innerHTML = `<p class="vacio">Cargando productos...</p>`;

    try {
        todosLosProductos = await obtenerProductos();
        dibujarTarjetas();
    } catch (error) {
        console.error(error);
        grilla.innerHTML = `
            <div class="vacio">
                <p>No pudimos cargar los productos.</p>
                <button id="reintentar" class="boton boton-secundario" type="button">Reintentar</button>
            </div>
        `;

        const botonReintentar = document.getElementById("reintentar");
        botonReintentar.addEventListener("click", cargar);
    }
}


/* TARJETAS */
function dibujarTarjetas() {
    const productos = todosLosProductos.filter((p) => p.categoria === categoriaActual);

    if (productos.length === 0) {
        grilla.innerHTML = `<p class="vacio">No hay productos en esta categoría.</p>`;
        return;
    }

    let html = "";

    productos.forEach((p) => {
        const cant = cantidadEnCarrito(p.id);
        let controles;

        if (cant > 0) {
            controles = `
                <div class="cantidad">
                    <button type="button" data-accion="restar" data-id="${p.id}">−</button>
                    <span>${cant}</span>
                    <button type="button" data-accion="sumar" data-id="${p.id}">+</button>
                </div>
            `;
        } else {
            controles = `
                <button class="boton boton-principal" type="button" data-accion="sumar" data-id="${p.id}">
                    Agregar al carrito
                </button>
            `;
        }

        html += `
            <article class="tarjeta">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p class="tarjeta-precio">${formatearPrecio(p.precio)}</p>
                ${controles}
            </article>
        `;
    });

    grilla.innerHTML = html;

    // Asignamos los eventos a los botones recien dibujados
    const botonesAccion = grilla.querySelectorAll("button[data-accion]");

    botonesAccion.forEach((boton) => {
        boton.addEventListener("click", () => {
            const id = Number(boton.getAttribute("data-id"));
            const accion = boton.getAttribute("data-accion");

            if (accion === "restar") {
                cambiarCantidad(id, -1);
            } else if (cantidadEnCarrito(id) === 0) {
                const producto = todosLosProductos.find((p) => p.id === id);
                agregarAlCarrito(producto);
            } else {
                cambiarCantidad(id, 1);
            }

            dibujarTarjetas();
        });
    });
}


/* Filtros por categoria */
pestanas.forEach((pestana) => {
    pestana.addEventListener("click", () => {
        categoriaActual = pestana.getAttribute("data-categoria");

        pestanas.forEach((p) => p.classList.remove("activa"));
        pestana.classList.add("activa");

        dibujarTarjetas();
    });
});

cargar();