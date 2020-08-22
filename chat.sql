-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2020 at 04:10 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` bigint(20) NOT NULL,
  `username` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `username`, `content`, `created`) VALUES
(1, 'U2FsdGVkX1/35RC/DObLBx', '0', '2020-08-22 22:02:29'),
(2, 'U2FsdGVkX19x5Lu4OLTfcB', '0', '2020-08-22 22:04:06'),
(3, 'U2FsdGVkX18+KlzPlYnCJk', 'U2FsdGVkX1917s0cVDF/pKtIYX2c4kG9OZ2glj65QYQ=', '2020-08-22 22:04:56'),
(4, 'U2FsdGVkX1+WYlNLjcnCxF', 'U2FsdGVkX1/XyT2e/3nth8soL9wWngU3oWq1x9adc9I=', '2020-08-22 22:05:02'),
(5, 'U2FsdGVkX19prk3ndXGtpK', 'U2FsdGVkX1/mKJZQQCu4gmFA26WZfSu7aha+X6vWCew=', '2020-08-22 22:05:55'),
(6, 'U2FsdGVkX1/7Lx9R9grfWH', 'U2FsdGVkX1+xaDKDq4B8SSxgRJzfKb+GFMMYy/RCHlk=', '2020-08-22 22:07:42'),
(7, 'U2FsdGVkX1930SypmKv9JT', 'U2FsdGVkX1/qCe7VWm3EbiMokSJUwG8Hd7Iq/KARniU=', '2020-08-22 22:08:06'),
(8, 'U2FsdGVkX199U6nSxEDFdv', 'U2FsdGVkX1+oN8yM+f+mGJzy3VWGYVJKWy9eiZseqXg=', '2020-08-22 22:09:05'),
(9, 'U2FsdGVkX1+R279F+/UvLvihSJKdiQW+/MvLYxLpu6o=', 'U2FsdGVkX18foDeDHSOzRlPsiNhtNw0oLqEsfPbmp4M=', '2020-08-22 22:09:31'),
(10, 'U2FsdGVkX1+z+gBXhiY8i9vuoz2ucIR4VwHYXdIcMmo=', 'U2FsdGVkX1/A+jSLwbeZTDFJ6Gt2g4ONLeXq/uK4kuU=', '2020-08-22 22:09:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
