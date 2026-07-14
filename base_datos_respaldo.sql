-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-06-2026 a las 15:22:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda_salud`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id_cita` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('pendiente','confirmada','cancelada','completada') DEFAULT 'pendiente',
  `motivo` varchar(200) DEFAULT NULL,
  `recordatorio_enviado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`id_cita`, `id_paciente`, `id_medico`, `fecha`, `hora`, `estado`, `motivo`, `recordatorio_enviado`) VALUES
(3, 1, 1, '2026-02-23', '08:00:00', 'pendiente', 'dolor de cabeza intenso', 0),
(4, 2, 1, '2026-02-23', '09:00:00', 'pendiente', 'golpe en la rodilla izquiera', 0),
(5, 12, 4, '2026-02-23', '08:00:00', 'pendiente', 'revisión mensual', 0),
(6, 3, 4, '2026-02-23', '09:00:00', 'pendiente', 'cambios de amalgamas', 0),
(7, 8, 3, '2026-02-23', '08:00:00', 'pendiente', 'revisión, por lagrimeo constante', 0),
(8, 6, 3, '2026-02-23', '09:00:00', 'pendiente', 'posible cambio de formula medica visual', 0),
(9, NULL, 1, '2026-05-28', '09:20:00', 'pendiente', 'dolor intenso en la espalda baja', 0),
(10, NULL, 2, '2026-05-29', '08:20:00', 'pendiente', 'dolor de estomago', 0),
(11, NULL, 1, '2029-05-29', '08:00:00', 'pendiente', 'dolor de espalda fuerte', 0),
(34, 11, 6, '2026-06-22', '14:00:00', 'pendiente', 'el niño no quiere comer', 0),
(36, 11, 1, '2026-06-22', '08:20:00', 'pendiente', 'control de azucar', 0),
(37, 11, 6, '2026-06-04', '16:22:00', 'pendiente', 'vomitos', 0),
(38, 11, 1, '2026-06-14', '23:45:00', 'pendiente', 'dolor de cabeza constante', 0),
(39, 11, 5, '2026-06-14', '23:48:00', 'pendiente', 'rasquiña', 0),
(40, 11, 5, '2026-06-21', '23:19:00', 'pendiente', 'manchitas rojas', 0),
(41, 11, 4, '2026-06-15', '08:20:00', 'pendiente', 'dolor de muela', 0),
(42, 11, 3, '2026-06-15', '08:20:00', 'pendiente', 'vision doble', 0),
(43, 11, 1, '2026-06-10', '08:20:00', 'pendiente', 'd0lor de estomago', 0),
(44, 11, 2, '2026-06-13', '16:00:00', 'pendiente', 'revision de rx', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialista`
--

CREATE TABLE `especialista` (
  `id_especialista` int(11) NOT NULL,
  `nombre_especialidad` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialista`
--

INSERT INTO `especialista` (`id_especialista`, `nombre_especialidad`, `descripcion`, `estado`) VALUES
(1, 'Medicina General', 'Atención medica integral a pacientes de todas las edades', 'activo'),
(2, 'Medicina General', 'Atención medica integral a pacientes de todas las edades', 'activo'),
(3, 'Optometria', 'Evaluación, diagnóstico y cuidado de la salud visual', 'activo'),
(4, 'Odontología', 'Diagnóstico, tratamiento y cuidado de la salud oral', 'activo'),
(5, 'Dermatología ', 'Diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas', 'activo'),
(6, 'Pediatría', 'Diagnóstico y tratamiento de enfermedades en niños y adolescentes', 'activo'),
(7, 'Ginecología', 'Diagnóstico y tratamiento de enfermedades del sistema reproductor femenino\r\n', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historia_clinica`
--

CREATE TABLE `historia_clinica` (
  `id_historia` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `diagnostico` text DEFAULT NULL,
  `tratamiento` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historia_clinica`
--

INSERT INTO `historia_clinica` (`id_historia`, `id_paciente`, `id_medico`, `fecha`, `diagnostico`, `tratamiento`, `observaciones`, `estado`) VALUES
(1, 1, NULL, '2026-02-23', 'Migraña cronica confirmada. Se evalua condicion medica del paciente.', 'Manejo de Aspirina 2 cada ocho horas y reposo absoluto.', 'Se remite con medico especialista para descartar otras lesiones.', 'activo'),
(2, 2, 1, '2026-02-23', 'golpe fuerte en rodilla izquierda. Posible ruptura de meniscos.', 'se le formula medicamento para el dolor \"Ibuprofeno 400\" una capsula cada 8 horas.\r\ny un ungüento a base de mariguana para  desinflamar la zona afectada.', 'se remite al paciente con el área de diagnostico, con cita para el especialista ', 'activo'),
(3, 12, 4, '2026-02-23', 'revisión y limpieza de su dentadura. ', 'lavar sus dientes tres veces al día, utilizar hilio dental y enjuague bucal.', 'Revisión en seis meses.', 'activo'),
(4, 3, 4, '2026-02-23', 'cambio de amalgamas, de muelas traseras  izquierdas y derechas.', 'cambio de dos amalgamas izquierdas y una amalgama derecha, y limpieza bucal.', 'revisión y cambie de las amalgamas restantes en 30 días', 'activo'),
(5, 8, 3, '2026-02-23', 'lagrimeo contante en ojo derecho, irritación por objeto desconocido en el parpado.', 'Extracción y limpieza del objeto de origen metálico en parpado.', 'Cubrir ojo derecho, y protegerlo de la luz  solar, aplicar gotas a base de manzanilla para desinflar su ojito.  revisión en una semana', 'activo'),
(6, 6, 3, '2026-02-23', 'revisión y cambio de formula medica ocular.', 'examen de optometría para verificar valores visuales, ojo izquierdo 15/20, ojo derecho, 10/20.', 'aumentó de astigmatismo en ojo derecho y aumento de formula en dicho ojo.\r\n revisión en 6 meses', 'activo'),
(7, 1, NULL, '2024-05-20', 'Riñitis alergica estacional', 'Ceterizina 10mg cada 24 horas', 'Paciente refiere mejoria con el tratamiento previo', 'activo'),
(8, 1, 1, '2023-10-26', 'Paciente con sintomas de fatiga - ACTUALIZADO', 'Descanso por 48 horas y analgesicos', 'Se agrega recomendacion de dieta ligera.', 'activo'),
(9, 1, 1, '2025-05-30', 'Infeccion respiratoria aguda', 'Amoxicilina 500mg cada 8 horas por 7 dias, y cita con especialista', 'Se recomienda control en una semana', 'activo'),
(10, 1, 1, '2024-02-15', 'Riñitis alergica severa', 'Antihistaminicos cad 12 horas por 5 dias', 'Paciente presenta mejoria tras la primera dosis', 'activo'),
(11, 1, 1, '2025-02-15', 'Dolor Articular severo', 'Ibuprofeno 400mg cad 8 horas por 7 dias', 'Pedir valoracion con especialista', 'activo'),
(12, 1, 1, '2024-05-20', 'El paciente presenta cuadro febril leve.', 'Reposo por 3 dias y mucha hidratacion.', 'Se recomienda control en 48 horas.', 'activo'),
(13, 1, 1, '2024-05-28', 'Gripe comun con congestion leve', 'Reposo e hidratacion constante por 3 dias', 'Se recomienda control si la fiebre persiste', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id_horario` int(11) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `dia` enum('lunes','martes','miercoles','jueves','viernes','sabado','domingo') DEFAULT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`id_horario`, `id_medico`, `dia`, `hora_inicio`, `hora_fin`, `estado`) VALUES
(1, 1, 'lunes', '07:00:00', '13:00:00', 'activo'),
(2, 1, 'martes', '07:00:00', '13:00:00', 'activo'),
(3, 1, 'miercoles', '07:00:00', '13:00:00', 'activo'),
(4, 1, 'jueves', '07:00:00', '13:00:00', 'activo'),
(5, 1, 'viernes', '07:00:00', '13:00:00', 'activo'),
(6, 1, 'sabado', '07:00:00', '13:00:00', 'activo'),
(7, 2, 'lunes', '13:00:00', '19:00:00', 'activo'),
(8, 2, 'martes', '13:00:00', '19:00:00', 'activo'),
(9, 2, 'miercoles', '13:00:00', '19:00:00', 'activo'),
(10, 2, 'jueves', '13:00:00', '19:00:00', 'activo'),
(11, 2, 'viernes', '13:00:00', '19:00:00', 'activo'),
(12, 2, 'sabado', '13:00:00', '19:00:00', 'activo'),
(13, 3, 'lunes', '07:00:00', '12:00:00', 'activo'),
(14, 3, 'lunes', '14:00:00', '19:00:00', 'activo'),
(15, 3, 'martes', '07:00:00', '12:00:00', 'activo'),
(16, 3, 'martes', '14:00:00', '19:00:00', 'activo'),
(17, 3, 'miercoles', '07:00:00', '12:00:00', 'activo'),
(18, 3, 'miercoles', '14:00:00', '19:00:00', 'activo'),
(19, 3, 'jueves', '07:00:00', '12:00:00', 'activo'),
(20, 3, 'jueves', '14:00:00', '19:00:00', 'activo'),
(21, 3, 'viernes', '07:00:00', '12:00:00', 'activo'),
(22, 3, 'viernes', '14:00:00', '19:00:00', 'activo'),
(23, 4, 'lunes', '07:00:00', '12:00:00', 'activo'),
(24, 4, 'lunes', '14:00:00', '19:00:00', 'activo'),
(25, 4, 'martes', '07:00:00', '12:00:00', 'activo'),
(26, 4, 'martes', '14:00:00', '19:00:00', 'activo'),
(27, 4, 'miercoles', '07:00:00', '12:00:00', 'activo'),
(28, 4, 'miercoles', '14:00:00', '19:00:00', 'activo'),
(29, 4, 'jueves', '07:00:00', '12:00:00', 'activo'),
(30, 4, 'jueves', '14:00:00', '19:00:00', 'activo'),
(31, 4, 'viernes', '07:00:00', '12:00:00', 'activo'),
(32, 4, 'viernes', '14:00:00', '19:00:00', 'activo'),
(33, 5, 'lunes', '07:00:00', '12:00:00', 'activo'),
(34, 5, 'lunes', '14:00:00', '19:00:00', 'activo'),
(35, 5, 'martes', '07:00:00', '12:00:00', 'activo'),
(36, 5, 'martes', '14:00:00', '19:00:00', 'activo'),
(37, 5, 'miercoles', '07:00:00', '12:00:00', 'activo'),
(38, 5, 'miercoles', '14:00:00', '19:00:00', 'activo'),
(39, 5, 'jueves', '07:00:00', '12:00:00', 'activo'),
(40, 5, 'jueves', '14:00:00', '19:00:00', 'activo'),
(41, 5, 'viernes', '07:00:00', '12:00:00', 'activo'),
(42, 5, 'viernes', '14:00:00', '19:00:00', 'activo'),
(43, 6, 'lunes', '07:00:00', '12:00:00', 'activo'),
(44, 6, 'lunes', '14:00:00', '19:00:00', 'activo'),
(45, 6, 'martes', '07:00:00', '12:00:00', 'activo'),
(46, 6, 'martes', '14:00:00', '19:00:00', 'activo'),
(47, 6, 'miercoles', '07:00:00', '12:00:00', 'activo'),
(48, 6, 'miercoles', '14:00:00', '19:00:00', 'activo'),
(49, 6, 'jueves', '07:00:00', '12:00:00', 'activo'),
(50, 6, 'jueves', '14:00:00', '19:00:00', 'activo'),
(51, 6, 'viernes', '07:00:00', '12:00:00', 'activo'),
(52, 6, 'viernes', '14:00:00', '19:00:00', 'activo'),
(53, 7, 'lunes', '07:00:00', '12:00:00', 'activo'),
(54, 7, 'lunes', '14:00:00', '19:00:00', 'activo'),
(55, 7, 'martes', '07:00:00', '12:00:00', 'activo'),
(56, 7, 'martes', '14:00:00', '19:00:00', 'activo'),
(57, 7, 'miercoles', '07:00:00', '12:00:00', 'activo'),
(58, 7, 'miercoles', '14:00:00', '19:00:00', 'activo'),
(59, 7, 'jueves', '07:00:00', '12:00:00', 'activo'),
(60, 7, 'jueves', '14:00:00', '19:00:00', 'activo'),
(61, 7, 'viernes', '07:00:00', '12:00:00', 'activo'),
(62, 7, 'viernes', '14:00:00', '19:00:00', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medico`
--

CREATE TABLE `medico` (
  `id_medico` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_especialista` int(11) DEFAULT NULL,
  `tarjeta_profesional` varchar(50) DEFAULT NULL,
  `experiencia_clinica` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo','pendiente') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medico`
--

INSERT INTO `medico` (`id_medico`, `id_usuario`, `id_especialista`, `tarjeta_profesional`, `experiencia_clinica`, `estado`) VALUES
(1, 13, 1, 'MG-NUEVA-2024', 20, 'activo'),
(2, 14, 2, '10000987456', 15, 'activo'),
(3, 15, 3, '1000654123', 8, 'activo'),
(4, 16, 4, '1000321321', 15, 'activo'),
(5, 17, 5, '10000987789', 12, 'activo'),
(6, 18, 6, '10000357951', 15, 'activo'),
(7, 19, 7, '10002159864', 10, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id_paciente` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `tipo_sangre` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') DEFAULT NULL,
  `sexo` enum('masculino','femenino','otro') DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `id_usuario`, `tipo_sangre`, `sexo`, `fecha_nacimiento`, `telefono`, `direccion`, `estado`) VALUES
(1, 1, 'O+', 'masculino', '1972-11-15', '3257894560', 'calle 35 su # 12-18', 'activo'),
(2, 2, 'O+', 'masculino', '1985-05-10', '3012589878', 'Carrera 12Este # 165-22', 'activo'),
(3, 3, 'B-', 'femenino', '1969-11-30', '3216589789', 'calle 53 sur # 29-15', 'activo'),
(4, 4, 'A+', 'masculino', '1994-10-08', '3134119988', 'calle 63A sur # 72-81', 'activo'),
(5, 5, 'A+', 'femenino', '1972-05-01', '3236547890', 'calle 63A sur #72-81', 'activo'),
(6, 6, 'A-', 'masculino', '1975-04-28', '3112365213', 'carrera 72 # 63A-84 sur', 'activo'),
(7, 7, 'A+', 'masculino', '1988-12-24', '3017899874', 'Carrera 73 # 64A-22 sur', 'activo'),
(8, 8, 'A-', 'masculino', '1994-08-17', '3507896510', 'Diagonal 63 SUR # 74-00', 'activo'),
(9, 9, 'O-', 'masculino', '1999-08-30', '3125987410', 'Calle 64 Sur # 74a-85', 'activo'),
(10, 10, 'O+', 'femenino', '2000-07-22', '3152312654', 'Carrera 75A # 65-17 sur', 'activo'),
(11, 11, 'O-', 'femenino', '1970-06-15', '3236542319', ' Carrera 75A # 65A 52 Sur', 'activo'),
(12, 12, 'O+', 'femenino', '1989-02-28', '3002316547', 'Calle 63A sur # 72A-84', 'activo'),
(21, 30, 'B+', 'masculino', '1972-05-13', '3124671542', 'Carrera 67 #58-31 sur', 'activo'),
(55, 115, 'B+', 'masculino', '1994-01-08', '3124671542', 'Carrera 67 #58-31 sur', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pqr`
--

CREATE TABLE `pqr` (
  `id_pqr` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tipo_solicitud` enum('Peticion','Queja','Reclamo','Sugerencia') NOT NULL,
  `asunto` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `estado` enum('Pendiente','En proceso','Resuelta') DEFAULT 'Pendiente',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pqr`
--

INSERT INTO `pqr` (`id_pqr`, `id_usuario`, `tipo_solicitud`, `asunto`, `descripcion`, `estado`, `fecha_creacion`) VALUES
(1, 115, 'Queja', 'Demora en la atencion', 'el medico llego20 mi nuros tarde a la consulta.', 'Pendiente', '2026-06-16 12:17:32'),
(2, 15, 'Reclamo', 'Error el facturacion', 'Me cobraron el doble de la couta moderadora.', 'Pendiente', '2026-06-16 12:20:33'),
(3, 115, 'Sugerencia', 'Nueva ${tipoSolicitud} desde la web', 'Opino que el personal de limpieza debe ser mas cuidadoso con los implementos utilizados, no dejar traperos ni escobas, en lugares donde los usuarios se puedan tropezar.', 'Pendiente', '2026-06-16 12:56:28'),
(4, 115, 'Queja', 'Nueva ${tipoSolicitud} desde la web', 'El medico llego tarde a la consulta y en estado de alicoramiento. ', 'Pendiente', '2026-06-16 12:58:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `tipo_usuario` enum('admin','paciente','medico') NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `tipo_documento` enum('cedula_de_ciudadania','tarjeta_identidad','pasapaporte','cedula_extranjeria','registro_civil') NOT NULL,
  `documento` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `codigo_recuperacion` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `tipo_usuario`, `nombre`, `apellido`, `tipo_documento`, `documento`, `correo`, `password`, `codigo_recuperacion`) VALUES
(1, 'medico', 'Juan Jose', 'Gomez', 'cedula_de_ciudadania', '12345678', 'juan@correo.com', 'Perico#123', NULL),
(2, 'paciente', 'Jhonn Armando ', 'Caceres Rojas', 'cedula_de_ciudadania', '79865123', 'caceresrojasj@gmail.com', 'perico2', NULL),
(3, 'paciente', 'Nataly Maria', 'Álvarez Nuñez', 'cedula_de_ciudadania', '52312654', 'natalyalvarezn@gmail.com', 'cacatua1', NULL),
(4, 'paciente', 'Steven Alberto', 'Zapata Carvajal', 'cedula_de_ciudadania', '79898877', 'zapatacarvajals@gmail.com', 'prerico3', NULL),
(5, 'paciente', 'Carmen Rosa', 'Petro Wilches', 'cedula_de_ciudadania', '51465321', 'petropresidentec@gmail.com', 'Cacatua2', NULL),
(6, 'paciente', 'Julio Manuel', 'Villamil Sotelo', 'cedula_de_ciudadania', '79032145', 'villamiljuliom@gmail.com', 'jaguar1', NULL),
(7, 'paciente', 'Samuel Maria', 'Moreno Rojas', 'cedula_de_ciudadania', '1024654987', 'smariar@gmail.com', 'jaguar2', NULL),
(8, 'paciente', 'Daniel Felipe', 'Caca Mora', 'cedula_de_ciudadania', '1024012365', 'cocamorad@gmail.com', 'perico4', NULL),
(9, 'paciente', 'Esteban Andres', 'Sanchez Ariel', 'cedula_de_ciudadania', '1024987789', 'sanchezaa@gmail.com', 'jaguar3', NULL),
(10, 'paciente', 'Andrea Viviana', 'Bolaños Lopez', 'cedula_de_ciudadania', '52987456', 'bolañoslopeza@gmail.com', 'cacatua3', NULL),
(11, 'paciente', 'Jenny Lorena', 'Smith lopez', 'cedula_de_ciudadania', '52303001', 'jennysmithl@gmail.com', 'cacatua4', NULL),
(12, 'paciente', 'Maria Daniela', 'Gonzáles Gonzales ', 'cedula_de_ciudadania', '52909818', 'gonzalesmariag@gmail.com', 'cacatua4', NULL),
(13, 'medico', 'Juan de Jesus', 'Perez Almanza', 'cedula_de_ciudadania', '79335226', 'almanzaperezj@gmail.com', 'elefante1', NULL),
(14, 'medico', 'Camilo Andres', 'Rubiano Garces', 'cedula_de_ciudadania', '79101515', 'rubianocamiloa@gmail.com', 'elefante2', NULL),
(15, 'medico', 'Maria Alejandra ', 'Bohorquez Pineda', 'cedula_de_ciudadania', '1001332211', 'bohorquezpinedam@gmail.com', 'aguila1J', NULL),
(16, 'medico', 'Judy Marcela ', 'Angarita Perez', 'cedula_de_ciudadania', '52003501', 'angaritaperezj@gmail.com', 'piraña1', NULL),
(17, 'medico', 'Estefany', 'Ramos Perez', 'cedula_de_ciudadania', '1001908087', 'ramospreze@gmail.com', 'granero10', NULL),
(18, 'medico', 'jhonn Steven', 'Garzon Morales', 'cedula_de_ciudadania', '1024687788', 'garzonmoralezjs@gmail.com', 'gatico1', NULL),
(19, 'medico', 'Daylyn Marleny', 'Rojas Huertas', 'cedula_de_ciudadania', '52998801', 'rojasmarlenyd@gmail.com', 'girafa1', NULL),
(30, 'admin', 'Henry', 'Gámez Villamil', 'cedula_de_ciudadania', '79583295', 'admin@centromedico.com', '$2b$10$Xt9VRiu.Km3U9qbZbiPPXOWrXOvqeHgzmCpYEoR2gs6D3aC6DL.L6', NULL),
(115, 'paciente', 'Jhonn Steven', 'Gámez Wilches', 'cedula_de_ciudadania', '1024547987', 'gamezvillamilhenry@gmail.com', '$2b$10$uIEb51wz0mT9ToE9jnJ/2.GGszDX9tDZO0xyszqHNXEWlGoxfbr4S', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `especialista`
--
ALTER TABLE `especialista`
  ADD PRIMARY KEY (`id_especialista`);

--
-- Indices de la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD PRIMARY KEY (`id_historia`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id_horario`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`id_medico`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD UNIQUE KEY `tarjeta_profesional` (`tarjeta_profesional`),
  ADD UNIQUE KEY `tarjeta_profesional_2` (`tarjeta_profesional`),
  ADD KEY `id_especialista` (`id_especialista`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id_paciente`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `pqr`
--
ALTER TABLE `pqr`
  ADD PRIMARY KEY (`id_pqr`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `especialista`
--
ALTER TABLE `especialista`
  MODIFY `id_especialista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  MODIFY `id_historia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id_horario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `medico`
--
ALTER TABLE `medico`
  MODIFY `id_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `pqr`
--
ALTER TABLE `pqr`
  MODIFY `id_pqr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`),
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id_medico`);

--
-- Filtros para la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD CONSTRAINT `historia_clinica_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`),
  ADD CONSTRAINT `historia_clinica_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id_medico`);

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id_medico`);

--
-- Filtros para la tabla `medico`
--
ALTER TABLE `medico`
  ADD CONSTRAINT `medico_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `medico_ibfk_2` FOREIGN KEY (`id_especialista`) REFERENCES `especialista` (`id_especialista`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `pqr`
--
ALTER TABLE `pqr`
  ADD CONSTRAINT `pqr_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
