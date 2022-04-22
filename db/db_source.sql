--
-- Database: `db_workshop`
--
DROP DATABASE `db_workshop`;
CREATE DATABASE IF NOT EXISTS `db_workshop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `db_workshop`;

-- --------------------------------------------------------

--
-- Table structure for table `coordenator`
--

CREATE TABLE `coordenator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `username` varchar(100) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `hash_password` varchar(30) NOT NULL,
  `access_token` varchar(355) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 
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
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `personal_code` varchar(100) NOT NULL,
  `scholar_year` varchar(30) NOT NULL,
  `degree_type` varchar(30) NOT NULL,
  `course_name` varchar(30) NOT NULL,
  `presential` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user_register`
--

INSERT INTO `user_register` (`id`, `email`, `full_name`, `personal_code`, `scholar_year`, `degree_type`, `course_name`, `presential`) VALUES
(1, 'algo6@uta.cv', 'PropMim6 Silva', 'yG0iut', '3', 'PhD', 'LEIT', 1),
(2, 'ffaw@mfs.c', 'Roberto Medina', 'Oumq63', '2º Ano', 'Bachelor', 'fwe wq ', 1);


--
-- Table structure for table `wsh_team`
--

CREATE TABLE `wsh_team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_first_member` int NOT NULL,
  `id_second_member` int DEFAULT NULL,
  `final_grade` int DEFAULT NULL,
  `team_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `wsh_grade`
--

DROP TABLE IF EXISTS `wsh_grade`;
CREATE TABLE `wsh_grade` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_team` int NOT NULL,
  `id_coordenator` int NOT NULL,
  `code_readability` int NOT NULL,
  `algorithm_efficiency` int NOT NULL,
  `completed_tasks` int NOT NULL,
  `solution_creactivity` int NOT NULL,
  `results_analysis` int NOT NULL, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `whs_main_calendar`
--

DROP TABLE IF EXISTS `whs_main_calendar`;
CREATE TABLE `whs_main_calendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_start_registration` varchar(30),
  `users_end_registration` varchar(30),
  `competition_start_registration` varchar(30),
  `competition_end_registration` varchar(30),
  `grade_proccess_end_date` varchar(30),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `whs_classes_calendar`
--

DROP TABLE IF EXISTS `whs_classes_calendar`;
CREATE TABLE `whs_classes_calendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_time` varchar(50),
  `location` varchar(100),
  `online_link` varchar(300),
  `main_content` varchar(400),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

