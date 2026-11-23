function traducirProducto(producto) {
    let rutaImagen;

    if (producto.image.startsWith("http")) {
        rutaImagen = producto.image;
    } else {
        rutaImagen = API_URL + producto.image;
    }

    return {
        id: producto.id,
        nombre: producto.name,
        imagen: rutaImagen,
        categoria: producto.category,
        precio: Number(producto.price)
    };
}

async function obtenerProductos() {
    const respuesta = await fetch(`${API_URL}/api/products/active`);

    if (respuesta.status === 404) {
        return [];
    }

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los productos");
    }

    const datos = await respuesta.json();
    return datos.payload.map(traducirProducto);
}

async function registrarVenta(cliente, items) {
    const itemsParaEnviar = items.map((i) => ({
        id: i.id,
        quantity: i.cantidad
    }));

    const respuesta = await fetch(`${API_URL}/api/sales`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName: cliente,
            items: itemsParaEnviar
        })
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo registrar la venta");
    }

    const datos = await respuesta.json();

    return {
        numero: datos.saleId,
        cliente: cliente,
        fecha: new Date().toLocaleString("es-AR"),
        items: items.map((i) => ({
            nombre: i.nombre,
            cantidad: i.cantidad,
            precio: i.precio
        })),
        total: Number(datos.total)
    };
}

