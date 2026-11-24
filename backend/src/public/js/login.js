

// Boton de acceso rapido: completa los campos con un usuario de prueba para los testers

const botonAccesoRapido = document.getElementById("accesoRapido");

botonAccesoRapido.addEventListener("click", () => {
    document.getElementById("emailUser").value = "lucas.fernandez@mail.com";
    document.getElementById("passwordUser").value = "password";
});