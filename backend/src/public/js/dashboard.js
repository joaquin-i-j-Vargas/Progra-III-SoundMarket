

// Modal de confirmacion para eliminar un producto (baja fisica)(Me entere tarde que es requisito parcial.)
const modal = document.getElementById("modalBaja");
const textoModal = document.getElementById("textoModal");
const botonCancelar = document.getElementById("cancelarBaja");
const botonConfirmar = document.getElementById("confirmarBaja");
const botonesBaja = document.querySelectorAll(".boton-baja");

let productoSeleccionado = null;

botonesBaja.forEach((boton) => {
    boton.addEventListener("click", () => {
        productoSeleccionado = {
            id: Number(boton.getAttribute("data-id")),
            name: boton.getAttribute("data-name")
        };

        textoModal.textContent = `¿Seguro que querés eliminar "${productoSeleccionado.name}"? Esta acción no se puede deshacer.`;
        modal.classList.add("abierto");
    });
});

botonCancelar.addEventListener("click", () => {
    modal.classList.remove("abierto");
});

botonConfirmar.addEventListener("click", async () => {
    try {
        const respuesta = await fetch(`/api/products/${productoSeleccionado.id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo eliminar el producto");
        }

        window.location.href = "/dashboard/principal";

    } catch (error) {
        console.error(error);
        alert("No se pudo eliminar el producto");
        modal.classList.remove("abierto");
    }
});