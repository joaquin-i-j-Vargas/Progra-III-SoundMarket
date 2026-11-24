

// Modal de confirmacion para dar de baja (active = 0) o reactivar (active = 1) un producto

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
            name: boton.getAttribute("data-name"),
            image: boton.getAttribute("data-image"),
            price: Number(boton.getAttribute("data-price")),
            category: boton.getAttribute("data-category"),
            active: Number(boton.getAttribute("data-active"))
        };

        let accion;

        if (productoSeleccionado.active === 1) {
            accion = "dar de baja";
        } else {
            accion = "reactivar";
        }

        textoModal.textContent = `¿Seguro que querés ${accion} "${productoSeleccionado.name}"?`;
        modal.classList.add("abierto");
    });
});

botonCancelar.addEventListener("click", () => {
    modal.classList.remove("abierto");
});

botonConfirmar.addEventListener("click", async () => {
    let nuevoEstado;

    if (productoSeleccionado.active === 1) {
        nuevoEstado = 0;
    } else {
        nuevoEstado = 1;
    }

    try {
        const respuesta = await fetch("/api/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...productoSeleccionado, active: nuevoEstado })
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo cambiar el estado");
        }

        window.location.href = "/dashboard/principal";

    } catch (error) {
        console.error(error);
        alert("No se pudo cambiar el estado del producto");
        modal.classList.remove("abierto");
    }
});