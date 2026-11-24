const formulario = document.getElementById("getProductForm");
const contenedorProductos = document.getElementById("contenedor-productos");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("idProd").value;

    try {
        const respuesta = await fetch(`/api/products/${id}`);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
            contenedorProductos.innerHTML = `<p>${datos.message || "No se encontró el producto"}</p>`;
            return;
        }

        const producto = Array.isArray(datos.payload) ? datos.payload[0] : (datos.payload || datos);

        if (!producto) {
            contenedorProductos.innerHTML = `<p>No se encontró ningún producto con el ID ${id}</p>`;
            return;
        }

        mostrarProducto(producto);

    } catch (error) {
        console.error("Error al consultar producto:", error);
        contenedorProductos.innerHTML = `<p>Ocurrió un error al consultar el producto.</p>`;
    }
});

function mostrarProducto(producto) {
    const estadoClase = producto.active ? "estado-activo" : "estado-inactivo";
    const estadoTexto = producto.active ? "Activo" : "Inactivo";
    const cardClase = producto.active ? "card-producto" : "card-producto inactivo";

    contenedorProductos.innerHTML = `
        <div class="${cardClase}">
            <img class="card-img" src="${producto.image}" alt="${producto.name}">
            <h4>${producto.name}</h4>
            <p>Id: ${producto.id}</p>
            <p>Categoría: ${producto.category}</p>
            <p>$ ${Number(producto.price)}</p>
            <p>
                <span class="estado ${estadoClase}">${estadoTexto}</span>
            </p>
        </div>
    `;
}