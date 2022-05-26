-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2022 at 01:29 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation-project`
--
CREATE DATABASE IF NOT EXISTS `vacation-project` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `vacation-project`;

-- --------------------------------------------------------

--
-- Table structure for table `followedvacations`
--

CREATE TABLE `followedvacations` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followedvacations`
--

INSERT INTO `followedvacations` (`userId`, `vacationId`) VALUES
(1, 19),
(1, 18),
(2, 18),
(2, 19),
(2, 21),
(3, 18),
(3, 19),
(3, 21),
(3, 22),
(13, 18),
(13, 19),
(13, 20),
(13, 23),
(13, 22),
(14, 18),
(14, 19),
(14, 21),
(14, 22),
(14, 25),
(1, 26);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(40) CHARACTER SET utf8 NOT NULL,
  `lastName` varchar(40) CHARACTER SET utf8 NOT NULL,
  `username` varchar(40) CHARACTER SET utf8 NOT NULL,
  `password` varchar(40) CHARACTER SET utf8 NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
(1, 'Assaf', 'Fink', 'admin', 'admin', 2),
(2, 'Assaf Fink', 'User', 'user', 'user', 1),
(3, 'north', 'north', 'north', 'north', 2),
(13, 'madona', 'ester', 'madona', 'madona', 1),
(14, 'trinity', 'neo', 'trinity', 'trinity', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `imageName` varchar(500) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `imageName`, `fromDate`, `toDate`, `price`) VALUES
(17, 'Go to Budepest', 'Budapest for history lovers', '4d0c84fc-dac6-4759-a161-1d6fc31e064a.jpg', '2022-03-27', '2022-03-31', '463.00'),
(18, 'Cool vacation in Prague', 'Prague', '05d993a9-e8f6-41c8-9d7f-9893d637b93b.jpg', '2022-03-13', '2022-03-17', '417.00'),
(19, 'Go to Paphos and hav bun', 'Paphos', 'b8b1fc17-3252-420f-b242-2701ba3aeeb9.jpg', '2022-03-20', '2022-03-24', '407.00'),
(20, 'Go to best history sites in Athens', 'Athens Vacastion', '1c98af03-a421-4ef1-a898-07015188b0ce.jpg', '2022-03-21', '2022-03-25', '281.00'),
(21, 'IBIS DUBAI AL BARSHA HOTEL   ', 'Dubai', '8c402889-42f6-4d09-bb10-4b73121c0798.jpg', '2022-03-14', '2022-03-17', '1048.00'),
(22, 'EBEN KING RESORT', 'Dubai', '8ddb43c5-9ae8-4f4a-a12c-1f0c11847974.jpg', '2022-04-14', '2022-04-20', '597.00'),
(23, 'Deluxe garden view', 'Zanzibar', 'fb1dbb91-4b31-408e-8579-e80f25522da9.jpg', '2022-04-05', '2022-04-12', '2990.00'),
(24, 'KURUMBA', 'Maldives', 'f3bb526d-12da-46a2-ba52-2f6e6bc22ad6.jpg', '2022-04-05', '2022-04-11', '2245.00'),
(25, 'Natural richness, with its volcanoes (Etna, Stromboli and Vulcano), its islands, its beaches and its magnificent nature reserves like the one in Zingaro.  And of course, the fabulous Italian Cuisine! (I am a big fan!), you will for sure enjoy your stay. Now the question is: Where to go in Sicily?  To help you plan your trip, here is the list of the best things to do in Sicily, as always accompanied by my best tips for a memorable stay!', 'Best Things to Do in Sicily Italy', '351b8777-c7ed-41b5-90b6-628d46f28e32.jpg', '2022-03-24', '2022-03-31', '1689.00'),
(26, 'Hawai resort', 'The best hawai vacation ever in passover', '6ead0b58-c853-4073-91bc-074a9555effd.jpg', '2022-04-22', '2022-04-30', '3650.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followedvacations`
--
ALTER TABLE `followedvacations`
  ADD KEY `userId` (`userId`) USING BTREE,
  ADD KEY `vacationId` (`vacationId`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followedvacations`
--
ALTER TABLE `followedvacations`
  ADD CONSTRAINT `followedvacations_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE,
  ADD CONSTRAINT `followedvacations_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
