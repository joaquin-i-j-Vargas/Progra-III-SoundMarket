const CLAVE_NOMBRE = "nombreCliente";
const CLAVE_CARRITO = "carrito";
const CLAVE_VENTA = "ultimaVenta";


/*Boton de tema  */
const botonTema = document.getElementById("botonTema");

function actualizarIcono() {
    const temaActual = document.documentElement.getAttribute("data-tema");

    if (temaActual === "oscuro") {
        botonTema.textContent = "☀️";
    } else {
        botonTema.textContent = "🌙";
    }
}


actualizarIcono();

botonTema.addEventListener("click", () => {
    alternarTema();
    actualizarIcono();
});


/*Panel de admin */
const enlaceAdmin = document.getElementById("enlaceAdmin");

if (enlaceAdmin) {
    enlaceAdmin.href = API_URL + "/login";
}


/* VALIDACION DE CLIENTE */


function exigirNombre() {
    const nombre = localStorage.getItem(CLAVE_NOMBRE);

    if (!nombre) {
        window.location.href = "index.html";
    }
}


/* CARRITO */


function obtenerCarrito() {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    return JSON.parse(datos) || [];
}


function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    actualizarContador();
}


function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const item = carrito.find((i) => i.id === producto.id);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
}


function cambiarCantidad(id, delta) {
    const carrito = obtenerCarrito();
    const item = carrito.find((i) => i.id === id);

    if (item) {
        item.cantidad += delta;
    }

    const carritoActualizado = carrito.filter((i) => i.cantidad > 0);
    guardarCarrito(carritoActualizado);
}


function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito();
    const carritoActualizado = carrito.filter((i) => i.id !== id);
    guardarCarrito(carritoActualizado);
}

function cantidadEnCarrito(id) {
    const carrito = obtenerCarrito();
    const item = carrito.find((i) => i.id === id);

    if (item) {
        return item.cantidad;
    } else {
        return 0;
    }
}


function totalCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((suma, i) => suma + (i.precio * i.cantidad), 0);
}


function actualizarContador() {
    const contador = document.getElementById("contadorCarrito");

    if (contador) {
        const carrito = obtenerCarrito();
        const totalUnidades = carrito.reduce((total, i) => total + i.cantidad, 0);
        contador.textContent = totalUnidades;
    }
}


function formatearPrecio(numero) {
    return "$" + numero.toLocaleString("es-AR") + " ARS";
}


actualizarContador();