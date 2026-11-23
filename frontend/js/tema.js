const temaGuardado = localStorage.getItem("tema") || "claro";
document.documentElement.setAttribute("data-tema", temaGuardado);

function alternarTema() {
    const temaActual = document.documentElement.getAttribute("data-tema");
    let temaNuevo;

    if (temaActual === "oscuro") {
        temaNuevo = "claro";
    } else {
        temaNuevo = "oscuro";
    }

    document.documentElement.setAttribute("data-tema", temaNuevo);
    localStorage.setItem("tema", temaNuevo);
}