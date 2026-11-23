const formNombre = document.getElementById("formNombre");
const inputNombre = document.getElementById("nombre");
const mensajeError = document.getElementById("mensajeError");

formNombre.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = inputNombre.value.trim();

    if (nombre === "") {
        mensajeError.textContent = "Ingresá tu nombre para continuar.";
        return;
    }

    if (nombre.length < 2) {
        mensajeError.textContent = "El nombre debe tener al menos 2 letras.";
        return;
    }

    mensajeError.textContent = "";
    localStorage.setItem(CLAVE_NOMBRE, nombre);
    window.location.href = "productos.html";
});