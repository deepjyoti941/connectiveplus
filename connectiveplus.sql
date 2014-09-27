-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2014 at 11:22 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `connectiveplus`
--

-- --------------------------------------------------------

--
-- Table structure for table `article_list`
--

CREATE TABLE IF NOT EXISTS `article_list` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `category_id` int(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `image_link` varchar(50) NOT NULL,
  `video_link` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `article_list`
--

INSERT INTO `article_list` (`id`, `category_id`, `title`, `content`, `image_link`, `video_link`) VALUES
(1, 3, 'general science title', 'demo general science content updated with image', '/images/uploads/Hydrangeas.jpg', ''),
(2, 3, 'general science title', 'demo general science content', '/images/uploads/Koala.jpg', ''),
(3, 1, 'engineering title', 'In addition to prebuilt grid classes for fast layouts, Bootstrap includes Less variables and mixins for quickly generating your own simple, semantic layouts.Variables\n             Variables determine the number of columns, the gutter width, and the media query point at which to begin floating columns. We use these to generate the predefined grid classes documented above, as well as for the custom mixins listed below\n				Variables determine the number of columns, the gutter width, and the media query point at which to begin floating columns. We use these to generate the predefined grid classes documented above, as well as for the custom mixins listed below.', '/images/uploads/Tulips.jpg', '//www.youtube.com/embed/-X32NacNnaI'),
(4, 1, 'engineering title', 'In addition to prebuilt grid classes for fast layouts, Bootstrap includes Less variables and mixins for quickly generating your own simple, semantic layouts.Variables\n             Variables determine the number of columns, the gutter width, and the media query point at which to begin floating columns. We use these to generate the predefined grid classes documented above, as well as for the custom mixins listed below\n				Variables determine the number of columns, the gutter width, and the media query point at which to begin floating columns. We use these to generate the predefined grid classes documented above, as well as for the custom mixins listed below.', '/images/uploads/Koala.jpg', '//www.youtube.com/embed/-X32NacNnaI'),
(5, 4, 'dxemo', 'demo content', '/images/uploads/Koala.jpg', ''),
(7, 3, 'demo', 'demo', '/images/uploads/Tulips.jpg', '');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Engineering'),
(2, 'Humanities'),
(3, 'General Science'),
(4, 'Commerce'),
(5, 'Medical'),
(6, 'Law'),
(7, 'Performing Arts'),
(8, 'Fine Arts');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'deep', '123');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
