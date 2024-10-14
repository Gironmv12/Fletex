-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: transporte
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `almacenes`
--

DROP TABLE IF EXISTS `almacenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `almacenes` (
  `id_almacen` bigint NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `ubicacion` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` bigint NOT NULL,
  `updated_by` bigint NOT NULL,
  PRIMARY KEY (`id_almacen`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `almacenes_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `almacenes_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `almacenes`
--

LOCK TABLES `almacenes` WRITE;
/*!40000 ALTER TABLE `almacenes` DISABLE KEYS */;
INSERT INTO `almacenes` VALUES (5,'Almacén Central','Calle Principal 123','2024-10-10 22:11:28','2024-10-10 22:11:28',1,1),(6,'Almacén Norte','Avenida Secundaria 456','2024-10-10 22:11:28','2024-10-10 22:11:28',1,1),(7,'Almacén Central','Calle Falsa 123, Ciudad Ejemplo','2024-10-13 09:12:51','2024-10-13 09:12:51',1,1),(8,'Almacén Norte','Avenida Principal 456, Ciudad Norte','2024-10-13 09:13:23','2024-10-13 09:13:23',1,1),(9,'Almacén Sur','Boulevard del Sur 789, Ciudad Sur','2024-10-13 09:13:45','2024-10-13 09:13:45',1,1),(10,'Almacén Este','Calle Este 101, Ciudad Este','2024-10-13 09:13:54','2024-10-13 09:13:54',1,1),(11,'Almacén Oeste','Avenida de los Jardines 202, Ciudad Oeste','2024-10-13 09:14:02','2024-10-13 09:14:02',1,1);
/*!40000 ALTER TABLE `almacenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaciones_paquetes`
--

DROP TABLE IF EXISTS `asignaciones_paquetes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaciones_paquetes` (
  `id_asignacion` bigint NOT NULL AUTO_INCREMENT,
  `id_paquete` bigint DEFAULT NULL,
  `id_ruta` bigint DEFAULT NULL,
  `fecha_asignacion` date DEFAULT NULL,
  `fecha_completada` date DEFAULT NULL,
  `estado` enum('pendiente','en curso','completado','cancelado') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` bigint NOT NULL,
  `updated_by` bigint NOT NULL,
  PRIMARY KEY (`id_asignacion`),
  KEY `id_paquete` (`id_paquete`),
  KEY `id_ruta` (`id_ruta`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `asignaciones_paquetes_ibfk_1` FOREIGN KEY (`id_paquete`) REFERENCES `paquetes` (`id_paquete`),
  CONSTRAINT `asignaciones_paquetes_ibfk_2` FOREIGN KEY (`id_ruta`) REFERENCES `rutas` (`id_ruta`),
  CONSTRAINT `asignaciones_paquetes_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `asignaciones_paquetes_ibfk_4` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaciones_paquetes`
--

LOCK TABLES `asignaciones_paquetes` WRITE;
/*!40000 ALTER TABLE `asignaciones_paquetes` DISABLE KEYS */;
/*!40000 ALTER TABLE `asignaciones_paquetes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` bigint NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `direccion` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` bigint NOT NULL,
  `updated_by` bigint NOT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `clientes_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Juan Perez','123456789','juan.perez@example.com','Calle Falsa 123','2024-10-09 00:34:46','2024-10-09 00:34:46',1,1),(2,'Efrain morales','9611239878','Efrain@example.com','Calle de la amrgura 123','2024-10-09 00:35:58','2024-10-09 00:35:58',1,1),(3,'Josefa Ortiz','987654321','Josefa@example.com','Calle de la paz 345','2024-10-09 14:55:52','2024-10-09 14:55:52',1,1);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conductores`
--

DROP TABLE IF EXISTS `conductores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conductores` (
  `id_conductor` bigint NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `licencia` varchar(100) NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` bigint NOT NULL,
  `updated_by` bigint NOT NULL,
  PRIMARY KEY (`id_conductor`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `conductores_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `conductores_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conductores`
--

LOCK TABLES `conductores` WRITE;
/*!40000 ALTER TABLE `conductores` DISABLE KEYS */;
INSERT INTO `conductores` VALUES (1,'Pedro Martínez','LIC123456','555-9876','2024-10-10 22:20:11','2024-10-10 22:20:11',1,1),(2,'Laura Sánchez','LIC654321','555-4321','2024-10-10 22:20:11','2024-10-10 22:20:11',1,1);
/*!40000 ALTER TABLE `conductores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones_cliente`
--

DROP TABLE IF EXISTS `direcciones_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones_cliente` (
  `id_direccion` bigint NOT NULL AUTO_INCREMENT,
  `id_cliente` bigint NOT NULL,
  `direccion` text NOT NULL,
  `tipo` enum('remitente','destinatario') DEFAULT NULL,
  PRIMARY KEY (`id_direccion`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `direcciones_cliente_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones_cliente`
--

LOCK TABLES `direcciones_cliente` WRITE;
/*!40000 ALTER TABLE `direcciones_cliente` DISABLE KEYS */;
INSERT INTO `direcciones_cliente` VALUES (1,1,'Calle Falsa 123','remitente'),(2,2,'Avenida Siempre Viva 742','destinatario');
/*!40000 ALTER TABLE `direcciones_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_paquete`
--

DROP TABLE IF EXISTS `estado_paquete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_paquete` (
  `id_estado` bigint NOT NULL AUTO_INCREMENT,
  `estado` enum('preparado','en tránsito','entregado','devuelto') NOT NULL,
  `descripcion` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` bigint NOT NULL,
  `updated_by` bigint NOT NULL,
  PRIMARY KEY (`id_estado`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `estado_paquete_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `estado_paquete_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_paquete`
--

LOCK TABLES `estado_paquete` WRITE;
/*!40000 ALTER TABLE `estado_paquete` DISABLE KEYS */;
INSERT INTO `estado_paquete` VALUES (1,'preparado','El paquete está listo para ser enviado','2024-10-10 22:18:09','2024-10-10 22:18:09',1,1),(2,'en tránsito','El paquete está en camino','2024-10-10 22:18:09','2024-10-10 22:18:09',1,1),(3,'preparado','El paquete está listo para ser enviado','2024-10-10 22:13:46','2024-10-10 22:13:46',1,1),(4,'en tránsito','El paquete está en camino','2024-10-10 22:13:46','2024-10-10 22:13:46',1,1);
/*!40000 ALTER TABLE `estado_paquete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_estado_paquete`
--

DROP TABLE IF EXISTS `historial_estado_paquete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_estado_paquete` (
  `id_historial` bigint NOT NULL AUTO_INCREMENT,
  `id_paquete` bigint NOT NULL,
  `estado_anterior` enum('preparado','en tránsito','entregado','devuelto') DEFAULT NULL,
  `estado_nuevo` enum('preparado','en tránsito','entregado','devuelto') DEFAULT NULL,
  `fecha_cambio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_historial`),
  KEY `id_paquete` (`id_paquete`),
  CONSTRAINT `historial_estado_paquete_ibfk_1` FOREIGN KEY (`id_paquete`) REFERENCES `paquetes` (`id_paquete`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_estado_paquete`
--

LOCK TABLES `historial_estado_paquete` WRITE;
/*!40000 ALTER TABLE `historial_estado_paquete` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_estado_paquete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventarios`
--

DROP TABLE IF EXISTS `inventarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventarios` (
  `id_inventario` bigint NOT NULL AUTO_INCREMENT,
  `id_almacen` bigint NOT NULL,
  `descripcion` text,
  `cantidad` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` bigint NOT NULL,
  `updated_by` bigint NOT NULL,
  PRIMARY KEY (`id_inventario`),
  KEY `id_almacen` (`id_almacen`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `inventarios_ibfk_1` FOREIGN KEY (`id_almacen`) REFERENCES `almacenes` (`id_almacen`),
  CONSTRAINT `inventarios_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `inventarios_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventarios`
--

LOCK TABLES `inventarios` WRITE;
/*!40000 ALTER TABLE `inventarios` DISABLE KEYS */;
INSERT INTO `inventarios` VALUES (3,5,'Producto A',100,'2024-10-10 22:14:46','2024-10-10 22:14:46',1,1),(4,6,'Producto B',200,'2024-10-10 22:14:46','2024-10-10 22:14:46',1,1),(7,5,'Paquete PAQ-1728601156549',1,'2024-10-10 22:59:16','2024-10-10 22:59:16',1,1),(8,5,'Paquete PAQ-1728601589578',1,'2024-10-10 23:06:29','2024-10-10 23:06:29',1,1),(9,5,'Paquete PAQ-1728601690293',5,'2024-10-10 23:08:10','2024-10-10 23:08:10',1,1);
/*!40000 ALTER TABLE `inventarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paquetes`
--

DROP TABLE IF EXISTS `paquetes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paquetes` (
  `id_paquete` bigint NOT NULL AUTO_INCREMENT,
  `id_cliente` bigint NOT NULL,
  `id_estado` bigint NOT NULL,
  `id_inventario` bigint DEFAULT NULL,
  `descripcion` text,
  `peso` decimal(10,2) DEFAULT NULL,
  `dimensiones` text,
  `fecha_envio` date DEFAULT NULL,
  `fecha_entrega` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` bigint NOT NULL,
  `updated_by` bigint NOT NULL,
  `direccion_remitente` text NOT NULL,
  `direccion_destino` text NOT NULL,
  `metodo_envio` enum('normal','express') NOT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  `metodo_pago` enum('tarjeta_credito','transferencia','efectivo') NOT NULL,
  `etiqueta_envio` text,
  `codigo_rastreo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_paquete`),
  UNIQUE KEY `codigo_rastreo` (`codigo_rastreo`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_estado` (`id_estado`),
  KEY `id_inventario` (`id_inventario`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `paquetes_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `paquetes_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado_paquete` (`id_estado`),
  CONSTRAINT `paquetes_ibfk_3` FOREIGN KEY (`id_inventario`) REFERENCES `inventarios` (`id_inventario`),
  CONSTRAINT `paquetes_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `paquetes_ibfk_5` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paquetes`
--

LOCK TABLES `paquetes` WRITE;
/*!40000 ALTER TABLE `paquetes` DISABLE KEYS */;
INSERT INTO `paquetes` VALUES (12,1,1,NULL,'Paquete con artículos frágiles',2.50,'30x20x10','2023-10-01','2023-10-05','2024-10-10 22:21:31','2024-10-10 22:21:31',1,1,'456 Calle Verdadera, Ciudad, País','123 Calle Falsa, Ciudad, País','normal',50.00,'tarjeta_credito','\n            Código de Rastreo: PAQ-1728598891195\n            Cliente: 1\n            Dirección de Destino: 123 Calle Falsa, Ciudad, País\n            Peso: 2.5 KG\n            Dimensiones: 30x20x10\n            Estado: 1\n            Dirección del Remitente: 456 Calle Verdadera, Ciudad, País\n            Método de Envío: normal\n        ','PAQ-1728598891195'),(13,1,1,NULL,'Paquete con artículos frágiles',2.50,'30x20x10','2023-10-01','2023-10-05','2024-10-10 22:23:27','2024-10-10 22:23:27',1,1,'456 Calle Verdadera, Ciudad, País','123 Calle Falsa, Ciudad, País','normal',50.00,'tarjeta_credito','\n            Código de Rastreo: PAQ-1728599007516\n            Cliente: 1\n            Dirección de Destino: 123 Calle Falsa, Ciudad, País\n            Peso: 2.5 KG\n            Dimensiones: 30x20x10\n            Estado: 1\n            Dirección del Remitente: 456 Calle Verdadera, Ciudad, País\n            Método de Envío: normal\n        ','PAQ-1728599007516'),(14,1,1,7,'Paquete con artículos frágiles',2.50,'30x20x10','2023-10-01','2023-10-05','2024-10-10 22:59:16','2024-10-10 22:59:16',1,1,'456 Calle Verdadera, Ciudad, País','123 Calle Falsa, Ciudad, País','normal',50.00,'tarjeta_credito','\n            Código de Rastreo: PAQ-1728601156549\n            Cliente: 1\n            Dirección de Destino: 123 Calle Falsa, Ciudad, País\n            Peso: 2.5 KG\n            Dimensiones: 30x20x10\n            Estado: 1\n            Dirección del Remitente: 456 Calle Verdadera, Ciudad, País\n            Método de Envío: normal\n        ','PAQ-1728601156549'),(15,2,1,8,'Paquete con ropa y accesorios',3.00,'40x30x20','2023-10-02','2023-10-07','2024-10-10 23:06:29','2024-10-10 23:06:29',1,1,'101 Calle Real, Ciudad, País','789 Avenida Siempre Viva, Ciudad, País','express',75.00,'efectivo','\n            Código de Rastreo: PAQ-1728601589578\n            Cliente: 2\n            Dirección de Destino: 789 Avenida Siempre Viva, Ciudad, País\n            Peso: 3 KG\n            Dimensiones: 40x30x20\n            Estado: 1\n            Dirección del Remitente: 101 Calle Real, Ciudad, País\n            Método de Envío: express\n        ','PAQ-1728601589578'),(16,1,1,3,'Paquete con artículos frágiles y este fue esditado',2.50,'30x20x10','2023-10-01','2023-10-05','2024-10-10 23:08:10','2024-10-10 23:08:10',1,4,'456 Calle Verdadera, Ciudad, País editado','123 Calle Falsa, Ciudad, País','normal',50.00,'tarjeta_credito','Código de Rastreo: PAQ-123456789\nCliente: 1\nDirección de Destino: 123 Calle Falsa, Ciudad, País\nPeso: 2.5 KG\nDimensiones: 30x20x10\nEstado: 1\nDirección del Remitente: 456 Calle Verdadera, Ciudad, País\nMétodo de Envío: normal','PAQ-123456789');
/*!40000 ALTER TABLE `paquetes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutas`
--

DROP TABLE IF EXISTS `rutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutas` (
  `id_ruta` bigint NOT NULL AUTO_INCREMENT,
  `origen` text NOT NULL,
  `destino` text NOT NULL,
  `distancia_km` decimal(10,2) DEFAULT NULL,
  `tiempo_estimado` text,
  `id_vehiculo` bigint DEFAULT NULL,
  `id_conductor` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` bigint NOT NULL,
  `updated_by` bigint NOT NULL,
  PRIMARY KEY (`id_ruta`),
  KEY `id_vehiculo` (`id_vehiculo`),
  KEY `id_conductor` (`id_conductor`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `rutas_ibfk_1` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculos` (`id_vehiculo`),
  CONSTRAINT `rutas_ibfk_2` FOREIGN KEY (`id_conductor`) REFERENCES `conductores` (`id_conductor`),
  CONSTRAINT `rutas_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `rutas_ibfk_4` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutas`
--

LOCK TABLES `rutas` WRITE;
/*!40000 ALTER TABLE `rutas` DISABLE KEYS */;
INSERT INTO `rutas` VALUES (1,'Ciudad A','Ciudad B',100.50,'2 horas',1,1,'2024-10-10 22:20:17','2024-10-10 22:20:17',1,1),(2,'Ciudad C','Ciudad D',200.00,'4 horas',1,1,'2024-10-10 22:20:17','2024-10-10 22:20:17',1,1);
/*!40000 ALTER TABLE `rutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` bigint NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `rol` enum('administrador','operador') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Efrain penagos','efrain.perez@example.com','$2b$10$PuMA6cXmbmEX67EcorJ6qutCRoEPAOaXTPd9cyoNJqfKAagcWXALy','operador','2024-10-08 19:29:33','2024-10-08 19:29:33'),(4,'Francisco Giron','Francisco@example.com','$2b$10$fGePE4etSVGwbBtlEJr/1uWXy4NrwUZ0CRvCWB0dpl/JB0XfAgz8.','administrador','2024-10-09 22:57:51','2024-10-09 22:57:51'),(5,'Juan Pérez','juan.perez@example.com','password123','administrador','2024-10-10 22:06:11','2024-10-10 22:06:11'),(6,'Ana Gómez','ana.gomez@example.com','password456','operador','2024-10-10 22:06:11','2024-10-10 22:06:11');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculos` (
  `id_vehiculo` bigint NOT NULL AUTO_INCREMENT,
  `placa` varchar(20) NOT NULL,
  `marca` text,
  `modelo` text,
  `estado` enum('disponible','en uso','en mantenimiento') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` bigint NOT NULL,
  `updated_by` bigint NOT NULL,
  PRIMARY KEY (`id_vehiculo`),
  UNIQUE KEY `placa` (`placa`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `vehiculos_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `vehiculos_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
INSERT INTO `vehiculos` VALUES (1,'ABC123','Toyota','Corolla','disponible','2024-10-10 22:20:02','2024-10-10 22:20:02',1,1),(2,'XYZ789','Ford','Fiesta','en uso','2024-10-10 22:20:02','2024-10-10 22:20:02',1,1);
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-13  3:15:49
