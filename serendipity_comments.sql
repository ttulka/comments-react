-- phpMyAdmin SQL Dump
-- version 3.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Erstellungszeit: 04. Mrz 2019 um 17:07
-- Server Version: 5.5.57
-- PHP-Version: 5.4.45-0+deb7u11

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `net21blog`
--

--
-- Daten für Tabelle `serendipity_comments`
--

INSERT INTO `serendipity_comments` (`id`, `entry_id`, `parent_id`, `timestamp`, `title`, `author`, `email`, `url`, `ip`, `body`, `type`, `subscribed`, `status`, `referer`) VALUES
(1, 123, 0, 1529641553, '', 'Author 1', NULL, NULL, NULL, 'My test comment 1', 'regular', 'true', '', NULL),
(2, 123, 0, 1529741553, '', 'Author 1', NULL, NULL, NULL, 'My test comment 2', 'regular', 'true', '', NULL),
(4, 123, 0, 1529941553, '', 'Author 4', NULL, NULL, NULL, 'My test comment 4', 'regular', 'true', '', NULL),
(5, 123, 0, 1530041553, '', 'Author 5', NULL, NULL, NULL, 'My test comment 5', 'regular', 'true', '', NULL),
(6, 123, 0, 1540041553, '', 'Author 6', NULL, NULL, NULL, 'My test comment 6', 'regular', 'true', '', NULL),
(3, 123, 2, 1529841553, '', 'Author 3', NULL, NULL, NULL, 'My test answer 3', 'regular', 'true', '', NULL),
(7, 123, 5, 1550041553, '', 'Author 5', NULL, NULL, NULL, 'My test answer 7', 'regular', 'true', '', NULL),
(8, 123, 5, 1560041553, '', 'Author 8', NULL, NULL, NULL, 'My test answer 8', 'regular', 'true', '', NULL),
(10, 123, 5, 1580041553, '', 'Author 5', NULL, NULL, NULL, 'My test answer 10', 'regular', 'true', '', NULL),
(9, 123, 6, 1570041553, '', 'Author 9', NULL, NULL, NULL, 'My test answer 9', 'regular', 'true', '', NULL),
(11, 123, 5, 1590041553, '', 'Author 5', NULL, NULL, NULL, 'My test answer 11', 'regular', 'true', '', NULL),
(12, 123, 5, 1600041553, '', 'Author 12', NULL, NULL, NULL, 'My test answer 12', 'regular', 'true', '', NULL),
(13, 123, 5, 1700041553, '', 'Author 7', NULL, NULL, NULL, 'My test answer 13', 'regular', 'true', '', NULL),
(14, 123, 5, 1800041553, '', 'Author 14', NULL, NULL, NULL, 'My test answer 14', 'regular', 'true', '', NULL),
(15, 123, 0, 1551715183, NULL, 'Tomas', NULL, NULL, NULL, 'added 1', 'regular', 'true', '', NULL),
(16, 123, 1, 1551715522, NULL, 'Tomas', NULL, NULL, NULL, 'added 1', 'regular', 'true', '', NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
