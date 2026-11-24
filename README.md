# SoundMarket
# SoundMarket

Autoservicio de instrumentos musicales. El cliente elige productos de dos categorías (**cuerda** y **percusión**), arma su carrito y, al confirmar la compra, recibe un ticket. Un administrador gestiona los productos desde un panel (backoffice).

Trabajo Práctico Integrador de **Programación III**, compuesto por dos proyectos que se comunican entre sí:

- **Frontend** (`frontend/`): aplicación del cliente (HTML, CSS y JavaScript).
- **Backend** (`backend/`): API REST en JSON + vistas EJS para el panel de administración, en el mismo servidor Node.js/Express, conectado a MySQL.

## Información académica

| | |
|---|---|
| Institución | UTN Avellaneda · Tecnicatura Universitaria en Programación |
| Materia | Programación III |
| Trabajo | TP Integrador "Autoservicio" |
| Ciclo lectivo | 2026 |
| Alumnos | [Vargas Joaquin] · [sanchez axel/amelia] |
| Comisión / Docentes | [ Javier Rodríguez Gallardo] |
| Repositorio | https://github.com/joaquin-i-j-Vargas/Progra-III-SoundMarket |

## Tecnologías

- **Backend:** Node.js (ES Modules), Express 4, EJS, MySQL (`mysql2`), `express-session`, `bcrypt`, `cors`, `dotenv`.
- **Frontend:** HTML, CSS y JavaScript sin frameworks. Comunicación con la API mediante `fetch`; el carrito y el tema se guardan en `localStorage`.
- **Base de datos:** MySQL / MariaDB (XAMPP + phpMyAdmin).

## Estructura del proyecto

```
soundmarket/
├── Img/                        Logo, ícono y videos del frontend
├── frontend/
│   ├── Front/                  Pantallas: index, productos, carrito, ticket (.html)
│   ├── Css/                    Estilos
│   └── Js/                     config.js, api.js, comun.js, tema.js y un script por pantalla
└── backend/
    ├── index.js                Punto de entrada del servidor
    ├── package.json
    ├── .env.example            Plantilla de variables de entorno
    ├── BBDD/
    │   └── BBDD_ProductosInst.sql      Script de la base de datos (estructura + datos de prueba)
    └── src/
        ├── api/                Arquitectura MVC
        │   ├── config/         Variables de entorno
        │   ├── database/       Pool de conexión a MySQL
        │   ├── routes/         Rutas (productos, ventas, usuarios, login y vistas)
        │   ├── middlewares/    Validaciones y protección de rutas
        │   ├── controllers/    Lógica de cada endpoint
        │   ├── models/         Consultas SQL
        │   └── utils/
        ├── views/              Plantillas EJS del backoffice (+ partials)
        └── public/             CSS, JS e imágenes que sirve el backend (incluye /img/Instrumentos)
```


