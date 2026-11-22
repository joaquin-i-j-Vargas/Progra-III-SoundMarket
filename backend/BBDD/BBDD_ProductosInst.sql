SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` enum('cuerda','percusion') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `active`) VALUES
(1, 'Guitarra Criolla Clasica', '/Img/Instrumentos/Guitarra criolla.jpg', 'cuerda', '120000.00', 1),
(2, 'Guitarra Acustica Folk', '', 'cuerda', '185000.00', 1),
(3, 'Guitarra Electrica Stratocaster', '', 'cuerda', '350000.00', 1),
(4, 'Guitarra Electrica Les Paul', '', 'cuerda', '420000.00', 1),
(5, 'Bajo Electrico Precision 4 Cuerdas', '', 'cuerda', '310000.00', 1),
(6, 'Bajo Electrico Jazz Bass 5 Cuerdas', '', 'cuerda', '390000.00', 1),
(7, 'Ukelele Soprano Caoba', '', 'cuerda', '65000.00', 1),
(8, 'Ukelele Concierto Electroacustico', '', 'cuerda', '95000.00', 1),
(9, 'Violin Acustico 4/4 con Estuche', '', 'cuerda', '160000.00', 1),
(10, 'Violonchelo Estudio 4/4', '', 'cuerda', '540000.00', 1),
(11, 'Set de Bongo de Madera', '', 'percusion', '95000.00', 1),
(12, 'Arpa Celta 22 Cuerdas', '', 'cuerda', '680000.00', 1),
(13, 'Pandereta Media Luna', '', 'percusion', '18000.00', 1),
(14, 'Bateria Acustica 5 Cuerpos Completa', '', 'percusion', '780000.00', 1),
(15, 'Bateria Electronica Mesh Pads', '', 'percusion', '650000.00', 1),
(16, 'Redoblante Metalico 14 Pulgadas', '', 'percusion', '115000.00', 1),
(17, 'Platillo Crash 16 Pulgadas', '', 'percusion', '140000.00', 1),
(18, 'Platillos Hi-Hat 14 Pulgadas', '', 'percusion', '175000.00', 1),
(19, 'Congas Par 10 y 11 Pulgadas', '', 'percusion', '320000.00', 1),

CREATE TABLE `product_sales` (
  `product_id` int NOT NULL,
  `sale_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `product_sales` (`product_id`, `sale_id`) VALUES
(, ),
(, ),
(, ),
(, ),
(, ),
(, ),
(, ),
(, ),
(, ),
(, ),
(, ),
(, ),
(, );


CREATE TABLE `sales` (
  `id` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(10,2) NOT NULL,
  `user_name` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `sales` (`id`, `date`, `total_price`, `user_name`) VALUES
(1, '', '', ''),
(2, '', '', ''),
(3, '', '', ''),
(4, '', '', ''),
(5, '', '', '');


CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, '', '', ''),
(2, '', '', ''),
(3, '', '', ''),
(4, '', '', ''),
(5, '', '', '');
(6, '', '', ''),
(7, '', '', ''),
(8, '', '', ''),
(9, '', '', ''),
(10, '', '', '');
(11, '', '', ''),
(12, '', '', ''),
(13, '', '', ''),
(14, '', '', ''),
(15, '', '', '');
(16, '', '', ''),
(17, '', '', ''),
(18, '', '', ''),

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;


ALTER TABLE `sales`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;


ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;


ALTER TABLE `product_sales`
  ADD CONSTRAINT `product_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_sales_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;