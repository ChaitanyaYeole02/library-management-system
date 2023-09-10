CREATE DATABASE  IF NOT EXISTS `library_management_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `library_management_dev`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: library_management_dev
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `publication_date` varchar(10) DEFAULT NULL,
  `availability_date` varchar(20) DEFAULT NULL,
  `borrowed_date` varchar(20) DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (119,'The Catcher in the Rye','J.D. Salinger','1951-07-16','2023-10-20 04:00:00',NULL,0,'2023-09-09 15:13:58','2023-09-09 20:00:10'),(120,'To Kill a Mockingbird','Harper Lee','1960-07-11','2023-10-21 12:00:00','2023-10-23 09:30:00',0,'2023-09-09 15:13:58','2023-09-09 19:20:12'),(121,'Pride and Prejudice','Jane Austen','1813-01-28','2023-10-22 14:15:00',NULL,0,'2023-09-09 15:13:58','2023-09-09 19:20:19'),(122,'1984','George Orwell','1949-06-08','2023-10-23 16:45:00','2023-10-25 11:20:00',1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(123,'The Great Gatsby','F. Scott Fitzgerald','1925-04-10','2023-10-24 10:00:00',NULL,1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(124,'Lord of the Rings','J.R.R. Tolkien','1954-07-29','2023-10-25 13:15:00','2023-10-27 14:30:00',1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(125,'Harry Potter and the Sorcerer\'s Stone','J.K. Rowling','1997-06-26','2023-10-26 09:30:00','2023-10-28 12:00:00',1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(126,'The Hobbit','J.R.R. Tolkien','1937-09-21','2023-10-27 14:45:00',NULL,1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(127,'To the Lighthouse','Virginia Woolf','1927-05-05','2023-10-28 11:15:00',NULL,1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(128,'The Road','Cormac McCarthy','2006-09-26','2023-10-29 08:00:00',NULL,1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(129,'The Chronicles of Narnia','C.S. Lewis','1950-10-16','2023-10-30 10:30:00',NULL,1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(130,'The Stranger','Albert Camus','1942-05-19','2023-10-31 12:00:00','2023-11-01 14:15:00',1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(131,'The Kite Runner','Khaled Hosseini','2003-05-29','2023-11-01 16:45:00',NULL,1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(132,'The Da Vinci Code','Dan Brown','2003-03-18','2023-11-02 09:30:00','2023-11-03 10:45:00',1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(133,'The Lord of the Rings','J.R.R. Tolkien','1954-07-29','2023-11-03 11:20:00',NULL,1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(134,'The Road Less Traveled','M. Scott Peck','1978-02-04','2023-11-04 12:30:00',NULL,1,'2023-09-09 15:13:58','2023-09-09 15:13:58'),(151,'Biography','PS','2023-09-09','2023-09-15 04:00:00','2023-09-09 04:00:00',1,'2023-09-09 19:46:20','2023-09-09 19:46:20');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-10  1:23:45
