-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           10.4.32-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour mmo
CREATE DATABASE IF NOT EXISTS `mmo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `mmo`;

-- Listage de la structure de la table mmo. adventure
CREATE TABLE IF NOT EXISTS `adventure` (
  `userID` bigint(24) NOT NULL,
  `arene` int(1) NOT NULL DEFAULT 0,
  `carte1` varchar(255) NOT NULL,
  `carte2` varchar(255) NOT NULL,
  `carte3` varchar(255) NOT NULL,
  `carte4` varchar(255) NOT NULL,
  `carte5` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table mmo.adventure : ~0 rows (environ)

-- Listage de la structure de la table mmo. clans
CREATE TABLE IF NOT EXISTS `clans` (
  `ownerID` bigint(44) NOT NULL DEFAULT 0,
  `name` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(50) NOT NULL DEFAULT '',
  `image` varchar(50) NOT NULL DEFAULT '',
  `access` varchar(50) NOT NULL DEFAULT '',
  `clansID` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`ownerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table mmo.clans : ~0 rows (environ)

-- Listage de la structure de la table mmo. cooldown
CREATE TABLE IF NOT EXISTS `cooldown` (
  `userID` bigint(44) NOT NULL DEFAULT 0,
  `cooldowndaily` bigint(50) NOT NULL,
  `cooldownmonthly` bigint(50) NOT NULL,
  `cooldownweekly` bigint(50) NOT NULL,
  `cooldownTicket` bigint(50) NOT NULL,
  `cooldownAventure` bigint(50) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table mmo.cooldown : ~0 rows (environ)

-- Listage de la structure de la table mmo. eco
CREATE TABLE IF NOT EXISTS `eco` (
  `userID` bigint(24) NOT NULL DEFAULT 0,
  `elexir` bigint(255) NOT NULL DEFAULT 60,
  `ticket` bigint(255) NOT NULL DEFAULT 5,
  `premium` int(1) NOT NULL DEFAULT 1,
  `gems` bigint(255) NOT NULL DEFAULT 0,
  `common_potion` bigint(255) NOT NULL DEFAULT 0,
  `rare_potion` bigint(255) NOT NULL DEFAULT 0,
  `epic_potion` bigint(255) NOT NULL DEFAULT 0,
  `legendary_potion` bigint(255) NOT NULL DEFAULT 0,
  `champion_potion` bigint(255) NOT NULL DEFAULT 0,
  `isOwner` int(1) NOT NULL DEFAULT 0,
  `isOG` int(1) NOT NULL DEFAULT 1,
  `sponsor_code` varchar(20) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table mmo.eco : ~0 rows (environ)

-- Listage de la structure de la table mmo. sponsor
CREATE TABLE IF NOT EXISTS `sponsor` (
  `userID` bigint(44) NOT NULL DEFAULT 0,
  `sponsor_code` varchar(50) NOT NULL,
  `uses` bigint(44) NOT NULL DEFAULT 0,
  `sponsorGems` bigint(44) NOT NULL DEFAULT 0,
  `sponsorTicket` bigint(44) NOT NULL DEFAULT 0,
  `sponsorElexir` bigint(44) NOT NULL DEFAULT 0,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table mmo.sponsor : ~0 rows (environ)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
