exigirNombre();

const listaCarrito = document.getElementById("listaCarrito");
const resumen = document.getElementById("resumen");
const modal = document.getElementById("modalConfirmar");
const botonCancelar = document.getElementById("cancelarCompra");
const botonAceptar = document.getElementById("aceptarCompra");


/* RENDERIZADO DEL CARRITO */
function dibujar() {
    const items = obtenerCarrito();

    if (items.length === 0) {
        listaCarrito.innerHTML = `<p class="vacio">Todavía no agregaste productos.</p>`;
        resumen.innerHTML = `<a class="boton boton-principal" href="productos.html">Ver productos</a>`;
        return;
    }

    let html = "";

    items.forEach((p) => {
        html += `
            <article class="fila-carrito">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="fila-info">
                    <h3>${p.nombre}</h3>
                    <p>${formatearPrecio(p.precio)} c/u</p>
                </div>
                <div class="cantidad" style="margin-top:0">
                    <button type="button" data-accion="restar" data-id="${p.id}">−</button>
                    <span>${p.cantidad}</span>
                    <button type="button" data-accion="sumar" data-id="${p.id}">+</button>
                </div>
                <span class="fila-subtotal">${formatearPrecio(p.precio * p.cantidad)}</span>
                <button class="boton boton-secundario" type="button" data-accion="eliminar" data-id="${p.id}">Eliminar</button>
            </article>
        `;
    });

    listaCarrito.innerHTML = html;

    resumen.innerHTML = `
        <a class="boton boton-secundario" href="productos.html">← Seguir comprando</a>
        <span class="resumen-total">Total: ${formatearPrecio(totalCarrito())}</span>
        <button id="confirmar" class="boton boton-principal" type="button">Confirmar compra →</button>
    `;

    const botonesAccion = listaCarrito.querySelectorAll("button[data-accion]");

    botonesAccion.forEach((boton) => {
        boton.addEventListener("click", () => {
            const id = Number(boton.getAttribute("data-id"));
            const accion = boton.getAttribute("data-accion");

            if (accion === "sumar") {
                cambiarCantidad(id, 1);
            } else if (accion === "restar") {
                cambiarCantidad(id, -1);
            } else {
                eliminarDelCarrito(id);
            }

            dibujar();
        });
    });

    const botonConfirmar = document.getElementById("confirmar");
    botonConfirmar.addEventListener("click", () => {
        modal.classList.add("abierto");
    });
}


/* MODAL */
botonCancelar.addEventListener("click", () => {
    modal.classList.remove("abierto");
});

botonAceptar.addEventListener("click", async () => {
    try {
        const cliente = localStorage.getItem(CLAVE_NOMBRE);
        const items = obtenerCarrito();

        const venta = await registrarVenta(cliente, items);

        localStorage.setItem(CLAVE_VENTA, JSON.stringify(venta));
        guardarCarrito([]);
        window.location.href = "ticket.html";
    } catch (error) {
        console.error(error);
        alert("No pudimos registrar tu compra. Probá de nuevo en un momento.");
        modal.classList.remove("abierto");
    }
});

dibujar();