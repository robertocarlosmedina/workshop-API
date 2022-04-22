-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 22, 2022 at 01:34 PM
-- Server version: 8.0.28-0ubuntu0.20.04.3
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
(3, 'rmedina@uta.cv', '', 'Roberto Medina', 'bm9zc29tb3M=', 'QnRvejZYQ2xIZGZFYzlPbUFzaUhHdVlQ');

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
(2, 'ffaw@mfs.c', 'Roberto Medina', 'Oumq63', '2º Ano', 'Bachelor', 'fwe wq ', 1),
(3, 'ana@gmail.com', 'Ana Celestina', 'pqnnTd', '1º Ano', 'Bachelor', 'LEIT Lt', 1),
(4, 'ra@gmail.com', 'Ricardo Alexandre', 'bWevg5', '1º Ano', 'Bachelor', 'LEIT Lt', 1),
(5, 'cm@gmail.com', 'Carlos Medina', '78ZHJD', '1º Ano', 'Bachelor', 'LEIT lt', 1);

-- --------------------------------------------------------

--
-- Table structure for table `whs_classes_calendar`
--

CREATE TABLE `whs_classes_calendar` (
  `id` int NOT NULL,
  `date_time` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `online_link` varchar(300) DEFAULT NULL,
  `main_content` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `whs_main_calendar`
--

CREATE TABLE `whs_main_calendar` (
  `id` int NOT NULL,
  `users_start_registration` varchar(30) DEFAULT NULL,
  `users_end_registration` varchar(30) DEFAULT NULL,
  `competition_start_registration` varchar(30) DEFAULT NULL,
  `competition_end_registration` varchar(30) DEFAULT NULL,
  `grade_proccess_end_date` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
  `solution_creactivity` int NOT NULL,
  `results_analysis` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `wsh_grade`
--

INSERT INTO `wsh_grade` (`id`, `id_team`, `id_coordenator`, `code_readability`, `algorithm_efficiency`, `completed_tasks`, `solution_creactivity`, `results_analysis`) VALUES
(1, 1, 1, 1, 2, 3, 4, 5),
(2, 2, 1, 1, 2, 3, 4, 5);

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
-- Dumping data for table `wsh_team`
--

INSERT INTO `wsh_team` (`id`, `id_first_member`, `id_second_member`, `final_grade`, `team_name`) VALUES
(1, 1, 1, NULL, 'Coders'),
(2, 3, 4, NULL, 'Programmers'),
(3, 2, 2, NULL, 'Weber');

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `whs_classes_calendar`
--
ALTER TABLE `whs_classes_calendar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `whs_main_calendar`
--
ALTER TABLE `whs_main_calendar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wsh_grade`
--
ALTER TABLE `wsh_grade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wsh_team`
--
ALTER TABLE `wsh_team`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `whs_classes_calendar`
--
ALTER TABLE `whs_classes_calendar`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `whs_main_calendar`
--
ALTER TABLE `whs_main_calendar`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wsh_grade`
--
ALTER TABLE `wsh_grade`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wsh_team`
--
ALTER TABLE `wsh_team`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
