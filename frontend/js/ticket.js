exigirNombre();

const contenedorTicket = document.getElementById("ticket");
const botonDescargar = document.getElementById("descargarPdf");
const botonSalir = document.getElementById("salir");

const venta = JSON.parse(localStorage.getItem(CLAVE_VENTA));

if (!venta) {
    window.location.href = "productos.html";
} else {
    let filas = "";

    venta.items.forEach((i) => {
        filas += `
        <tr>
            <td>${i.nombre}</td>
            <td>${i.cantidad}</td>
            <td>${formatearPrecio(i.precio * i.cantidad)}</td>
        </td>
        `;
    });

    contenedorTicket.innerHTML = `
    <h2>¡Gracias por tu compra!</h2>
    <p>SoundMarket · tu ticket fue generado correctamente.</p>
    <p>
        Cliente: ${venta.cliente}<br>
        Fecha: ${venta.fecha}<br>
        N° de compra: #${venta.numero}
        
    </p>
    <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            ${filas}
        </tbody>
    </table>
    <p class="ticket-total">Total: ${formatearPrecio(venta.total)}</p>
    `;
}

botonDescargar.addEventListener("click", () =>{
    window.print();
})

botonSalir.addEventListener("click", () => {
    localStorage.removeItem(CLAVE_NOMBRE);
    localStorage.removeItem(CLAVE_CARRITO);
    localStorage.removeItem(CLAVE_VENTA);
    window.location.href = "index.html";
});