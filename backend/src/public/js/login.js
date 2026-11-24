

// Boton de acceso rapido: completa los campos con un usuario de prueba para los testers

const botonAccesoRapido = document.getElementById("botonAccesoRapido");

botonAccesoRapido.addEventListener("click", () => {
    document.getElementById("emailUser").value = "joa@gmail.com";
    document.getElementById("passwordUser").value = "123456";
});