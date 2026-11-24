


// Modificar producto: primero lo consultamos por id, despues mostramos el formulario con sus datos

const formConsulta = document.getElementById("getProductForm");
const inputId = document.getElementById("idProd");
const contenedorForm = document.getElementById("contenedor-form");
const contenedorMensaje = document.getElementById("mensaje");

function mostrarMensaje(texto, tipo) {
    contenedorMensaje.innerHTML = `<p class="mensaje ${tipo} centrado">${texto}</p>`;
}

async function consultarProducto() {
    contenedorMensaje.innerHTML = "";
    contenedorForm.innerHTML = "";

    try {
        const respuesta = await fetch(`/api/products/${inputId.value}`);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mostrarMensaje(datos.message, "error");
            return;
        }

        dibujarFormulario(datos.payload[0]);

    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo consultar el producto", "error");
    }
}

function dibujarFormulario(producto) {
    contenedorForm.innerHTML = `
        <form id="putProductForm">
            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" required>

            <label for="imageProd">Imagen (ruta o URL)</label>
            <input type="text" name="image" id="imageProd" required>

            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" min="1" required>

            <label for="categoryProd">Categoria</label>
            <select name="category" id="categoryProd">
                <option value="cuerda">Cuerdas</option>
                <option value="percusion">Percusión</option>
            </select>

            <input type="submit" value="Guardar cambios">
        </form>
    `;

    document.getElementById("nameProd").value = producto.name;
    document.getElementById("imageProd").value = producto.image;
    document.getElementById("priceProd").value = Number(producto.price);
    document.getElementById("categoryProd").value = producto.category;

    const formEdicion = document.getElementById("putProductForm");

    formEdicion.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(formEdicion);

        const productoEditado = {
            id: producto.id,
            name: formData.get("name"),
            image: formData.get("image"),
            price: Number(formData.get("price")),
            category: formData.get("category"),
            active: producto.active
        };

        try {
            const respuesta = await fetch("/api/products", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoEditado)
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                let texto = datos.message;

                if (datos.listaErrores) {
                    texto = datos.listaErrores.join(". ");
                }

                mostrarMensaje(texto, "error");
                return;
            }

            window.location.href = "/dashboard/principal";

        } catch (error) {
            console.error(error);
            mostrarMensaje("No se pudo guardar el producto", "error");
        }
    });
}

formConsulta.addEventListener("submit", (event) => {
    event.preventDefault();
    consultarProducto();
});

if (inputId.value) {
    consultarProducto();
}