-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: May 18, 2025 at 12:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arr_prima_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `service` varchar(255) NOT NULL,
  `date1` date NOT NULL,
  `time1` time NOT NULL,
  `date2` date DEFAULT NULL,
  `time2` time DEFAULT NULL,
  `clientName` varchar(255) NOT NULL,
  `clientEmail` varchar(255) NOT NULL,
  `clientPhone` varchar(50) NOT NULL,
  `installAddress` text NOT NULL,
  `projectDetails` text DEFAULT NULL,
  `projectPhotoNames` text DEFAULT NULL,
  `submissionTimestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `service`, `date1`, `time1`, `date2`, `time2`, `clientName`, `clientEmail`, `clientPhone`, `installAddress`, `projectDetails`, `projectPhotoNames`, `submissionTimestamp`) VALUES
(1, 'sliding-doors', '2025-05-19', '15:46:00', '2025-05-21', '15:46:00', 'godwin', 'balco@gmail.com', '09657295103', 'Dahlia st. tala', '', '', '2025-05-18 07:43:27'),
(2, 'sliding-doors', '2025-05-20', '17:56:00', '2025-05-22', '17:56:00', 'godwin', 'balco@gmail.com', '43453', 'gdfzb', '', '', '2025-05-18 09:53:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
