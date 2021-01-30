-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2021 at 04:08 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_telegram_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `friend_list`
--

CREATE TABLE `friend_list` (
  `id` varchar(128) NOT NULL,
  `myId` varchar(128) NOT NULL,
  `friendId` varchar(128) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friend_list`
--

INSERT INTO `friend_list` (`id`, `myId`, `friendId`, `createdAt`) VALUES
('0ad02f46-cf03-48b9-89a0-93d685a711f9', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'bf0d2fca-b1b6-4474-914f-4948def0009c', '2021-01-28 14:43:20'),
('204dcf74-09e8-4fee-9d2d-e49a13521c1b', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'cd9c1dce-9955-4568-9f41-73e05eebddac', '2021-01-27 14:50:49'),
('3f634b5b-1a7d-4f04-990a-f5c95e173df3', '9e38d1f8-71b0-4b77-a0c0-21db12deb27e', 'bf0d2fca-b1b6-4474-914f-4948def0009c', '2021-01-27 15:00:20'),
('7942d67b-1d37-43f1-8d5b-d584526c599a', '9e38d1f8-71b0-4b77-a0c0-21db12deb27e', 'cd9c1dce-9955-4568-9f41-73e05eebddac', '2021-01-27 15:00:23');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` varchar(128) NOT NULL,
  `idRoom` varchar(128) NOT NULL,
  `idUser` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `idRoom`, `idUser`) VALUES
('02eb3c4f-97e6-417f-adf3-c07676434b1f', 'b26e6c1f-061e-4f30-add7-6fb82d3048be', '9e38d1f8-71b0-4b77-a0c0-21db12deb27e'),
('3a054888-8e42-4c40-b3bd-83754d18ba5d', 'b26e6c1f-061e-4f30-add7-6fb82d3048be', 'bf0d2fca-b1b6-4474-914f-4948def0009c'),
('447d0057-8470-4a9e-bce9-8e4df68a1bcc', '5c10496a-c7a9-4e0b-bdee-b1938b5e1ae7', 'bf0d2fca-b1b6-4474-914f-4948def0009c'),
('da9a47f1-085b-4ff4-8249-1e5848aa7577', 'b26e6c1f-061e-4f30-add7-6fb82d3048be', 'cd9c1dce-9955-4568-9f41-73e05eebddac');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` varchar(128) NOT NULL,
  `idSender` varchar(128) NOT NULL,
  `idReceiver` varchar(128) NOT NULL,
  `message` varchar(191) NOT NULL,
  `momentjsTime` varchar(32) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `idSender`, `idReceiver`, `message`, `momentjsTime`, `createdAt`) VALUES
('3dc69c12-ee51-4ade-bf93-f40bfd2051aa', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'Not bad, it\'s just a little stressful :(', '8:34 AM', '2021-01-28 16:34:15'),
('3f7dffe8-10d3-4856-a37c-72a7dbb7c572', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'What\'s the problem friend?', '8:36 AM', '2021-01-28 16:36:32'),
('3fc26d99-2de4-4374-8af5-648a1716ed83', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'i was following the bootcamp, very tiring and a lot of work', '8:36 AM', '2021-01-28 16:36:51'),
('635d6591-a70b-4c7e-bdc0-84fffa1c9538', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'it\'s okay guys, maybe now it\'s very tiring. But someday you will fell the results of your hard work at this time', '8:37 AM', '2021-01-28 16:37:16'),
('71224f9f-8b0f-48a0-92ba-324d17a2a6e2', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'Wa\'alaikumussalam, hello nif', '8:33 AM', '2021-01-28 16:33:17'),
('797b3a65-9c35-4f90-a22c-bb7a53258a29', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'okay, thanks. I will be excited to continue learning', '8:38 AM', '2021-01-28 16:38:43'),
('a16b479c-e05b-455b-b208-3c95278ec5cb', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'Assalamu\'alaikum lam, i am hanif', '8:32 AM', '2021-01-28 16:32:56'),
('d8010928-a863-4852-9216-dc314aa10478', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'How are you?', '8:33 AM', '2021-01-28 16:33:25');

-- --------------------------------------------------------

--
-- Table structure for table `message_room`
--

CREATE TABLE `message_room` (
  `id` varchar(128) NOT NULL,
  `idRoom` varchar(128) NOT NULL,
  `idUser` varchar(128) NOT NULL,
  `message` varchar(191) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `message_room`
--

INSERT INTO `message_room` (`id`, `idRoom`, `idUser`, `message`, `createdAt`) VALUES
('24885688-aaa3-4fd8-a79f-8aee8cfb0bb1', 'b26e6c1f-061e-4f30-add7-6fb82d3048be', '9e38d1f8-71b0-4b77-a0c0-21db12deb27e', 'i know that, near the state satya square. there\'s a shop there for cat food', '2021-01-28 16:48:32'),
('4033f14e-2a65-45b7-ba4a-cf2e25c796cd', 'b26e6c1f-061e-4f30-add7-6fb82d3048be', '9e38d1f8-71b0-4b77-a0c0-21db12deb27e', 'Miauww miauww', '2021-01-28 16:47:39'),
('7eff405e-27ff-4244-9584-568cf9724ace', 'b26e6c1f-061e-4f30-add7-6fb82d3048be', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'Anyone know a cat food shop in the sukoarjo?', '2021-01-28 16:48:03'),
('9c519438-e684-4bd3-b594-44765c75924e', 'b26e6c1f-061e-4f30-add7-6fb82d3048be', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'Hello', '2021-01-28 16:47:31'),
('9d003755-dbd6-44e3-9888-be423b5455e2', 'b26e6c1f-061e-4f30-add7-6fb82d3048be', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'thanks bro! :)', '2021-01-28 16:48:44'),
('9d00db20-27ce-4630-8c89-5d6c573d86aa', 'b26e6c1f-061e-4f30-add7-6fb82d3048be', 'cd9c1dce-9955-4568-9f41-73e05eebddac', 'I don\'t know, i knew it was solo and it was quite far', '2021-01-28 16:48:20'),
('fe073791-8888-4813-a334-b11745e56796', 'b26e6c1f-061e-4f30-add7-6fb82d3048be', 'bf0d2fca-b1b6-4474-914f-4948def0009c', 'Hello guys!!?', '2021-01-28 16:47:11');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` varchar(128) NOT NULL,
  `name` varchar(191) NOT NULL,
  `photo` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `photo`) VALUES
('4e469707-3055-4d59-af55-be734295bf95', 'Cat Lovers :3', 'https://placekitten.com/310/310'),
('5c10496a-c7a9-4e0b-bdee-b1938b5e1ae7', 'Cat lovers 2', 'https://placekitten.coms/310/310'),
('719134fd-905b-4ded-b364-b795f9fba33f', 'Test', 'https://placekitten.com/310/310'),
('96d47635-df0d-4382-b628-62b9168854fa', 'Cat Shop ~', 'https://placekitten.com/310/310'),
('b26e6c1f-061e-4f30-add7-6fb82d3048be', 'Cat lovers', 'https://placekitten.com/310/310');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(128) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `username` varchar(64) DEFAULT NULL,
  `phoneNumber` varchar(32) DEFAULT NULL,
  `biodata` varchar(128) DEFAULT NULL,
  `photo` varchar(128) DEFAULT NULL,
  `socketId` varchar(32) DEFAULT NULL,
  `locationLat` float(10,8) DEFAULT NULL,
  `locationLng` float(11,8) DEFAULT NULL,
  `confirmed` tinyint(4) DEFAULT NULL,
  `createdAt` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `username`, `phoneNumber`, `biodata`, `photo`, `socketId`, `locationLat`, `locationLng`, `confirmed`, `createdAt`) VALUES
('9e38d1f8-71b0-4b77-a0c0-21db12deb27e', 'Fathoni Novantoro', 'hanip.mutu@gmail.com', '$2a$10$fo7PsofX3/4njQQq8GHNdOa6hYUSXhCDmXuZa9/xyiFN6cJi4UQUq', '@tonitoni', '08123123', 'Hello, my name is fathoni\n\n', 'https://placekitten.com/500/500', 'Online', -7.25400019, 112.74690247, 1, 'January 27, 2021 6:54 AM'),
('bf0d2fca-b1b6-4474-914f-4948def0009c', 'Hanif Kumara', 'hanifkumara00@gmail.com', '$2a$10$IXbXjeq32P/hbdOfbMzv8OsA738lYKLcUW7b0eNbUeiwUb91H3qyO', '@hanifkumara', NULL, 'Hello, my name is hanif kumara\n', 'http://localhost:5000/upload/photo-1611857587552-0014a2a1-500.jpg', 'Offline', -7.15097523, 110.14025879, 1, 'January 27, 2021 4:35 AM'),
('cd9c1dce-9955-4568-9f41-73e05eebddac', 'Allam Qobus', 'hnflasting@gmail.com', '$2a$10$DJHr8tjLuRg7uQ00Ck7rP.KQ/LqBGfIugsCf2Cn0AOeEPeKQRLbN6', '@allamsunset', '0829819282', 'Hello my name is Allam Qobus\n', 'http://localhost:5000/upload/photo-1611758858126-01-cat-names-nationalgeographic_1525054.jpg', 'Offline', -7.15097523, 110.14025879, 1, 'January 27, 2021 6:42 AM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friend_list`
--
ALTER TABLE `friend_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_fk2` (`idUser`),
  ADD KEY `member_fk` (`idRoom`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `message_fk1` (`idSender`),
  ADD KEY `message_fk2` (`idReceiver`);

--
-- Indexes for table `message_room`
--
ALTER TABLE `message_room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `message_room_fk2` (`idUser`),
  ADD KEY `message_room_fk` (`idRoom`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_fk` FOREIGN KEY (`idRoom`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `member_fk2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_fk1` FOREIGN KEY (`idSender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `message_fk2` FOREIGN KEY (`idReceiver`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `message_room`
--
ALTER TABLE `message_room`
  ADD CONSTRAINT `message_room_fk` FOREIGN KEY (`idRoom`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
