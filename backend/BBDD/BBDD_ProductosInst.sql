SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `SoundMarket`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
USE `SoundMarket`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- Estructura de tablas
-- --------------------------------------------------------

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` enum('cuerda','percusion') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `product_sales` (
  `product_id` int NOT NULL,
  `sale_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `sales` (
  `id` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(10,2) NOT NULL,
  `user_name` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Carga de datos de prueba
-- --------------------------------------------------------

INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `active`) VALUES
(1, 'Guitarra Criolla Clasica', '/Img/Instrumentos/Guitarra criolla.jpg', 'cuerda', '120000.00', 1),
(2, 'Guitarra Acustica Folk', '', 'cuerda', '185000.00', 1),
(3, 'Guitarra Electrica Stratocaster', '/Img/Instrumentos/Guitarra Electrica Stratocaster.png', 'cuerda', '350000.00', 1),
(4, 'Guitarra Electrica Les Paul', '/Img/Instrumentos/Guitarra Electrica Les Paul.png', 'cuerda', '420000.00', 1),
(5, 'Bajo Electrico Precision 4 Cuerdas', '/Img/Instrumentos/Bajo Electrico Precision 4 Cuerdas.png', 'cuerda', '310000.00', 1),
(6, 'Bajo Electrico Jazz Bass 5 Cuerdas', '/Img/Instrumentos/Bajo Electrico Jazz Bass 5 Cuerdas.png', 'cuerda', '390000.00', 1),
(7, 'Ukelele Soprano Caoba', '/Img/Instrumentos/Ukelele Soprano Caoba.png', 'cuerda', '65000.00', 1),
(8, 'Ukelele Concierto Electroacustico', '/Img/Instrumentos/Ukelele Concierto Electroacustico.png', 'cuerda', '95000.00', 1),
(9, 'Violin Acustico 4/4 con Estuche', '/Img/Instrumentos/Violin Acustico 44 con Estuche.png', 'cuerda', '160000.00', 1),
(10, 'Violonchelo Estudio 4/4', '/Img/Instrumentos/Violonchelo.png', 'cuerda', '540000.00', 1),
(11, 'Set de Bongo de Madera', '/Img/Instrumentos/bongos.png', 'percusion', '95000.00', 1),
(12, 'Arpa Celta 22 Cuerdas', '/Img/Instrumentos/Arpa.png', 'cuerda', '680000.00', 1),
(13, 'Pandereta Media Luna', '/Img/Instrumentos/Pandereta.png', 'percusion', '18000.00', 1),
(14, 'Bateria Acustica 5 Cuerpo Completa', '/Img/Instrumentos/Bateria1.png', 'percusion', '780000.00', 1),
(15, 'Bateria Electronica Mesh Pads', '/Img/Instrumentos/bateriaelectruca.png', 'percusion', '650000.00', 1),
(16, 'Redoblante Metalico 14 Pulgadas', '/Img/Instrumentos/redoble.png', 'percusion', '115000.00', 1),
(17, 'Platillo Crash 16 Pulgadas', '/Img/Instrumentos/platillo.png', 'percusion', '140000.00', 1),
(18, 'Platillos Hi-Hat 14 Pulgadas', '/Img/Instrumentos/platillos dobles.png', 'percusion', '175000.00', 1),
(19, 'Congas Par 10 y 11 Pulgadas', '/Img/Instrumentos/Bongosgrandes.png', 'percusion', '320000.00', 1);

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Lucas Fernandez', 'lucas.fernandez@mail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
(2, 'Valentina Gomez', 'valen.gomez@mail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
(3, 'Mateo Rodriguez', 'mateo.rod@mail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
(4, 'Camila Silva', 'camila.silva@mail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
(5, 'Julian Alvarez', 'julian.alv@mail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

INSERT INTO `sales` (`id`, `date`, `total_price`, `user_name`) VALUES
(1, '2026-11-15 14:30:00', '138000.00', 'Lucas Fernandez'),
(2, '2026-11-16 18:15:00', '350000.00', 'Valentina Gomez'),
(3, '2026-11-18 11:05:00', '1095000.00', 'Mateo Rodriguez'),
(4, '2026-11-19 20:45:00', '160000.00', 'Camila Silva'),
(5, '2026-11-21 16:20:00', '415000.00', 'Julian Alvarez');

INSERT INTO `product_sales` (`product_id`, `sale_id`) VALUES
(1, 1),   -- Guitarra Criolla (120000)
(13, 1),  -- Pandereta (18000) -> Total Venta 1: 138000.00
(3, 2),   -- Stratocaster (350000) -> Total Venta 2: 350000.00
(14, 3),  -- Bateria Acustica (780000)
(17, 3),  -- Platillo Crash (140000)
(18, 3),  -- Platillos Hi-Hat (175000) -> Total Venta 3: 1095000.00
(7, 4),   -- Ukelele Soprano (65000)
(8, 4),   -- Ukelele Concierto (95000) -> Total Venta 4: 160000.00
(19, 5),  -- Congas Par (320000)
(11, 5);  -- Set de Bongo (95000) -> Total Venta 5: 415000.00

-- --------------------------------------------------------
-- Índices, Auto-Increment y Claves Foráneas
-- --------------------------------------------------------

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `product_sales`
  ADD KEY `product_id` (`product_id`,`sale_id`),
  ADD KEY `sale_id` (`sale_id`);

ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

ALTER TABLE `sales`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `product_sales`
  ADD CONSTRAINT `product_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_sales_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;