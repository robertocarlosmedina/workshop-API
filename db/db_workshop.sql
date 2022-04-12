-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 12, 2022 at 10:49 PM
-- Server version: 8.0.28-0ubuntu0.20.04.4
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_workshop`
--
CREATE DATABASE IF NOT EXISTS `db_workshop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `db_workshop`;

-- --------------------------------------------------------

--
-- Table structure for table `coordenator`
--

CREATE TABLE `coordenator` (
  `id` int NOT NULL,
  `email` varchar(250) NOT NULL,
  `username` varchar(100) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `hash_password` varchar(30) NOT NULL,
  `access_token` varchar(355) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `coordenator`
--

INSERT INTO `coordenator` (`id`, `email`, `username`, `full_name`, `hash_password`, `access_token`) VALUES
(3, 'rmedina@uta.cv', '', 'Roberto Medina', 'bm9zc29tb3M=', 'cUp6dzlUUnlOY2gyYU53V2E4aHJPYzg3');

-- --------------------------------------------------------

--
-- Table structure for table `user_register`
--

CREATE TABLE `user_register` (
  `id` int NOT NULL,
  `email` varchar(250) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `personal_code` varchar(100) NOT NULL,
  `scholar_year` varchar(30) NOT NULL,
  `degree_type` varchar(30) NOT NULL,
  `course_name` varchar(30) NOT NULL,
  `presential` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user_register`
--

INSERT INTO `user_register` (`id`, `email`, `full_name`, `personal_code`, `scholar_year`, `degree_type`, `course_name`, `presential`) VALUES
(1, 'algo6@uta.cv', 'PropMim6 Silva', 'yG0iut', '3', 'PhD', 'LEIT', 1),
(2, 'ffaw@mfs.c', 'Roberto Medina', 'Oumq63', '2º Ano', 'Bachelor', 'fwe wq ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `wsh_grade`
--

CREATE TABLE `wsh_grade` (
  `id` int NOT NULL,
  `id_team` int NOT NULL,
  `id_coordenator` int NOT NULL,
  `code_readability` int NOT NULL,
  `algorithm_efficiency` int NOT NULL,
  `completed_tasks` int NOT NULL,
  `creativity` int NOT NULL,
  `results_analysis` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `wsh_team`
--

CREATE TABLE `wsh_team` (
  `id` int NOT NULL,
  `id_first_member` int NOT NULL,
  `id_second_member` int DEFAULT NULL,
  `final_grade` int DEFAULT NULL,
  `team_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `coordenator`
--
ALTER TABLE `coordenator`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_register`
--
ALTER TABLE `user_register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_code` (`personal_code`);

--
-- Indexes for table `wsh_grade`
--
ALTER TABLE `wsh_grade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_team` (`id_team`),
  ADD KEY `id_coordenator` (`id_coordenator`);

--
-- Indexes for table `wsh_team`
--
ALTER TABLE `wsh_team`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `team_name` (`team_name`),
  ADD KEY `id_first_member` (`id_first_member`),
  ADD KEY `id_second_member` (`id_second_member`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coordenator`
--
ALTER TABLE `coordenator`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_register`
--
ALTER TABLE `user_register`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wsh_grade`
--
ALTER TABLE `wsh_grade`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wsh_team`
--
ALTER TABLE `wsh_team`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `wsh_grade`
--
ALTER TABLE `wsh_grade`
  ADD CONSTRAINT `wsh_grade_ibfk_1` FOREIGN KEY (`id_team`) REFERENCES `wsh_team` (`id`),
  ADD CONSTRAINT `wsh_grade_ibfk_2` FOREIGN KEY (`id_coordenator`) REFERENCES `coordenator` (`id`);

--
-- Constraints for table `wsh_team`
--
ALTER TABLE `wsh_team`
  ADD CONSTRAINT `wsh_team_ibfk_1` FOREIGN KEY (`id_first_member`) REFERENCES `user_register` (`id`),
  ADD CONSTRAINT `wsh_team_ibfk_2` FOREIGN KEY (`id_second_member`) REFERENCES `user_register` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
