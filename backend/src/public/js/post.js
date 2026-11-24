


// Alta de producto: mandamos el formulario a la API con fetch

const formulario = document.getElementById("createProductForm");
const contenedorMensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(formulario);

    const producto = {
        name: formData.get("name"),
        image: formData.get("image"),
        price: Number(formData.get("price")),
        category: formData.get("category")
    };

    try {
        const respuesta = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            let texto = datos.message;

            if (datos.listaErrores) {
                texto = datos.listaErrores.join(". ");
            }

            contenedorMensaje.innerHTML = `<p class="mensaje error centrado">${texto}</p>`;
            return;
        }

        window.location.href = "/dashboard/principal";

    } catch (error) {
        console.error(error);
        contenedorMensaje.innerHTML = `<p class="mensaje error centrado">No se pudo conectar con el servidor</p>`;
    }
});