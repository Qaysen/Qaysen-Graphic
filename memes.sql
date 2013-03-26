-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 26-03-2013 a las 16:44:38
-- Versión del servidor: 5.5.29
-- Versión de PHP: 5.4.6-1ubuntu1.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `memes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen`
--

CREATE TABLE IF NOT EXISTS `imagen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `ruta` varchar(50) NOT NULL,
  `thumbs` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=154 ;

--
-- Volcado de datos para la tabla `imagen`
--

INSERT INTO `imagen` (`id`, `nombre`, `ruta`, `thumbs`) VALUES
(137, 'dsad', 'img/cha.jpg', 'img_thumbs/cha.jpg'),
(138, 'daniel', 'img/descarga (1).jpg', 'img_thumbs/descarga (1).jpg'),
(139, 'daniel1', 'img/descarga.jpg', 'img_thumbs/descarga.jpg'),
(140, 'daniel2', 'img/descarga (1).jpg', 'img_thumbs/descarga (1).jpg'),
(141, 'daniel3', 'img/descarga (2).jpg', 'img_thumbs/descarga (2).jpg'),
(142, 'daniel4', 'img/descarga (3).jpg', 'img_thumbs/descarga (3).jpg'),
(143, 'daniel5', 'img/descarga (4).jpg', 'img_thumbs/descarga (4).jpg'),
(144, 'daniel6', 'img/Enrique Martinez.jpg', 'img_thumbs/Enrique Martinez.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `meme_generado`
--

CREATE TABLE IF NOT EXISTS `meme_generado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_imagen` int(11) NOT NULL,
  `url_img_creado` varchar(200) NOT NULL,
  `like` int(11) NOT NULL,
  `id_fb_publish` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_imagen` (`id_imagen`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `nick` varchar(30) NOT NULL,
  `pass` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
