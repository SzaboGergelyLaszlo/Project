-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 06. 18:54
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `project`
--
CREATE DATABASE IF NOT EXISTS `project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `project`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `actor`
--

CREATE TABLE `actor` (
  `Id` char(36) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Nationality` varchar(40) NOT NULL,
  `Birthday` date NOT NULL,
  `Oscar_award` tinyint(1) NOT NULL,
  `Sex` enum('Male','Female') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `actor`
--

INSERT INTO `actor` (`Id`, `Name`, `Nationality`, `Birthday`, `Oscar_award`, `Sex`) VALUES
('1089807e-f515-4c80-a322-a0c91c0d00fb', 'Nicola Laybourne', 'Ukraine', '1993-09-21', 0, 'Female'),
('26f4e489-2f83-467c-8c4a-5f98327a1353', 'string', 'Philippines', '1965-09-02', 1, 'Male'),
('2a8118ad-0880-4136-adb6-154f2e24d50c', 'Donnie Rattenbury', 'China', '2013-04-30', 0, 'Female'),
('2cbf6438-af2e-4505-b524-b172689fe7c7', 'Marylynne Lyven', 'Philippines', '1969-02-21', 0, 'Female'),
('36d446d4-b979-4d92-b976-96f63050b801', 'Liz Aldiss', 'Argentina', '1983-08-21', 0, 'Female'),
('3d43849a-c771-404c-96d1-44af96ffa1c0', 'Lorin Niset', 'Norway', '1962-01-12', 0, 'Male'),
('4527389f-6ec4-4c4f-86b5-685c0ae0f375', 'Gleda Saunder', 'Ukraine', '2003-03-12', 1, 'Female'),
('484f5341-748f-4d49-be29-804b480aff6e', 'Delmor Cuniam', 'China', '1967-03-04', 1, 'Male'),
('4b33f412-b3b7-4f9a-a439-39f3ae126b10', 'Shermie Dennett', 'Philippines', '1998-12-11', 1, 'Male'),
('56c96857-7328-4e30-8256-c0586caf27a7', 'Phoebe Arbon', 'China', '2000-06-08', 0, 'Female'),
('681bd4dc-a305-4d1e-8159-4f02b0fae42c', 'Harcourt Tarren', 'United States', '1997-08-22', 0, 'Male'),
('74df82a7-1025-4084-a888-4aaeca838459', 'Karna Greensall', 'China', '1967-02-24', 0, 'Female'),
('7cb9c3e3-556a-4aff-b24b-8fa97abcf186', 'Kristy Cettell', 'Poland', '1988-09-21', 0, 'Female'),
('8363832f-faa7-44d7-b54c-827aee75e65d', 'Vic Pedrazzi', 'China', '2005-08-03', 1, 'Male'),
('83eb01b0-08a4-4aee-b8b8-7d04c6c9ccdd', 'Rogerio Threadgall', 'Philippines', '1997-08-17', 0, 'Male'),
('9176392f-03b2-433f-8eba-df019ea7b119', 'Sarajane Ricks', 'Germany', '1968-03-01', 0, 'Female'),
('92f1e2dc-0892-4eb8-ac8f-9f3b072d19c4', 'Avram Mellanby', 'South Korea', '1972-01-29', 1, 'Male'),
('c04860f2-a800-4505-9e22-95f40d05fc8b', 'Arlina Canedo', 'Sudan', '1969-06-11', 1, 'Female'),
('c50cc6fd-bb98-4ec0-a281-0f8330e43b31', 'Raffaello Dives', 'Bangladesh', '1964-10-11', 1, 'Male'),
('d1447153-7523-4468-a3cd-01d30a6b650b', 'Estele Pic', 'China', '1962-12-26', 0, 'Female');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `director`
--

CREATE TABLE `director` (
  `Id` char(36) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Nationality` varchar(40) NOT NULL,
  `Birthday` date NOT NULL,
  `Oscar_award` tinyint(1) NOT NULL,
  `Sex` enum('Male','Female') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `director`
--

INSERT INTO `director` (`Id`, `Name`, `Nationality`, `Birthday`, `Oscar_award`, `Sex`) VALUES
('0a770d4f-7990-4b11-a632-490df31fd468', 'Bondie Risbridger', 'China', '1970-10-13', 1, 'Male'),
('0a9d1872-3ae8-46e6-ac9b-5635355cc80c', 'Trudey Denys', 'Ivory Coast', '1963-07-22', 1, 'Female'),
('129cf934-f68e-45d4-ab9b-130813d0db78', 'Angelina Hyatt', 'China', '1976-05-28', 1, 'Female'),
('1f32314f-5dd5-487e-816d-a32b8228cbd6', 'Marcie Saggs', 'China', '1958-07-19', 0, 'Female'),
('229a0fa2-2c9e-4bcb-bdf1-7297d416df02', 'Ania Reddish', 'United States', '1997-07-12', 0, 'Female'),
('36724a84-1988-4a5c-8cba-32662bb3aa16', 'Amalee O\'Scandall', 'China', '1996-02-13', 1, 'Female'),
('42459ca3-e376-4ecf-8c0b-5f3f2c92e525', 'Jamill Caldeiro', 'China', '1985-12-16', 0, 'Male'),
('4a18bf43-10e4-4bcc-b655-09f801d2e232', 'Torre Le febre', 'Indonesia', '1977-12-24', 0, 'Male'),
('584c4a69-cf2d-4d38-9eb6-bf070b7bd255', 'Germaine Barstowk', 'Ukraine', '1993-01-03', 0, 'Male'),
('5b7c59b1-b28f-4773-b13f-344cc8c83eaf', 'Decca Tilberry', 'Indonesia', '1988-04-16', 1, 'Male'),
('646bffc0-3ea7-4dca-9a7f-870ef2b1f32b', 'Rourke Simononsky', 'China', '1992-11-15', 1, 'Male'),
('65a382f3-fc8b-4973-8b8d-d6744f503958', 'Laurie Japp', 'Indonesia', '1973-09-24', 0, 'Male'),
('6abfb1da-6459-4180-917c-a8a69d863c53', 'Chris Petchey', 'China', '1956-05-03', 0, 'Female'),
('6ccaf359-1374-4f44-a8f4-62a8818b6e1b', 'Frannie Dubbin', 'Thailand', '1983-01-23', 0, 'Female'),
('b169af10-a618-43a8-ab9a-9b3a16a25798', 'Arther Gartan', 'Guatemala', '1990-03-15', 1, 'Male'),
('ccba083b-b956-4f1c-ab80-5ef019da6b1e', 'Jesus Notton', 'Japan', '1985-03-24', 0, 'Male'),
('e11499c3-ee1b-4154-aad9-ef527a2c6a3f', 'Lindsey Todman', 'Aland Islands', '1989-07-31', 1, 'Male'),
('e139d442-d57f-45f7-9e43-4ed1bbf05d25', 'Saba Bruni', 'Poland', '1964-07-06', 0, 'Female'),
('e84f9554-a6c5-4c08-9f4b-7e3d49878766', 'Dom Cookes', 'Oman', '1998-06-05', 1, 'Male'),
('fafd2e3f-6e99-499f-9cf7-9211909b7265', 'Fabiano Lorrie', 'Czech Republic', '1957-06-02', 1, 'Male');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `filmactor`
--

CREATE TABLE `filmactor` (
  `FilmId` char(36) NOT NULL,
  `ActorId` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `filmactor`
--

INSERT INTO `filmactor` (`FilmId`, `ActorId`) VALUES
('c8ab755b-f60b-11ef-af21-2cf05d217b52', '2a8118ad-0880-4136-adb6-154f2e24d50c'),
('c8ab755b-f60b-11ef-af21-2cf05d217b52', '2cbf6438-af2e-4505-b524-b172689fe7c7');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `films`
--

CREATE TABLE `films` (
  `Id` char(36) NOT NULL,
  `Name` char(36) NOT NULL,
  `Director` char(36) NOT NULL,
  `Genre` varchar(16) NOT NULL,
  `ReleaseYear` date NOT NULL,
  `Length` int(4) NOT NULL,
  `AgeCertificates` int(2) NOT NULL,
  `Summary` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `films`
--

INSERT INTO `films` (`Id`, `Name`, `Director`, `Genre`, `ReleaseYear`, `Length`, `AgeCertificates`, `Summary`) VALUES
('c8ab755b-f60b-11ef-af21-2cf05d217b52', 'Planes', '0a9d1872-3ae8-46e6-ac9b-5635355cc80c', 'Adventure|Animat', '0000-00-00', 132, 17, 'vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `role`
--

CREATE TABLE `role` (
  `Id` int(10) NOT NULL,
  `Name` varchar(10) NOT NULL,
  `Description` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `role`
--

INSERT INTO `role` (`Id`, `Name`, `Description`) VALUES
(1, 'Admin', 'Admin User'),
(2, 'User', 'Normal Activ User'),
(3, 'Not_active', 'Not activated user');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` char(36) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `Sex` enum('Male','Female') NOT NULL,
  `Joined` date NOT NULL DEFAULT current_timestamp(),
  `Role` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`Id`, `Name`, `Email`, `Sex`, `Joined`, `Role`) VALUES
('0d8e7fcb-a2f7-408d-b3fe-340a5295daa3', 'Happy', 'hscrowston6@ucoz.ru', 'Female', '2025-02-28', 1),
('1c835861-eaab-4d2d-8ee1-b55ef1d30c9e', 'Gilberta', 'gjennaway1@blog.com', 'Female', '2025-02-28', 2),
('47da6946-576d-4c39-8fa2-d87b35708557', 'Faye', 'figo2@google.com.br', 'Female', '2025-02-28', 2),
('48b5dcd7-70f5-43f5-9791-4ad88249af2b', 'Jaymee', 'jidenden9@hhs.gov', 'Female', '2025-02-28', 3),
('712e9ec1-b64e-4d25-9a8d-4122271dc9e6', 'Andie', 'aveitch5@ehow.com', 'Female', '2025-02-28', 3),
('9b5a5bb1-5c2d-439d-a3db-a8ae510346e3', 'Pammi', 'pkiossel8@ycombinator.com', 'Female', '2025-02-28', 2),
('a3ba80ef-05b0-4abd-84fc-8135d672663e', 'Shelli', 'slevecque7@quantcast.com', 'Female', '2025-02-28', 3),
('aa3c70cf-29b9-433c-b62d-9f7368f68b9f', 'Daniel', 'dventam0@e-recht24.de', 'Male', '2025-02-28', 2),
('b4144357-a3a0-4a64-aaf7-98828b1ab130', 'Kissee', 'kclaesens4@businesswire.com', 'Female', '2025-02-28', 3),
('cf121df9-5cc4-491f-a8f1-c13a0cc642c6', 'Charmain', 'cglauber3@timesonline.co.uk', 'Female', '2025-02-28', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userreview`
--

CREATE TABLE `userreview` (
  `UserId` char(36) NOT NULL,
  `FilmId` char(36) NOT NULL,
  `Review` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `actor`
--
ALTER TABLE `actor`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `director`
--
ALTER TABLE `director`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `filmactor`
--
ALTER TABLE `filmactor`
  ADD PRIMARY KEY (`FilmId`,`ActorId`),
  ADD KEY `ActorId` (`ActorId`);

--
-- A tábla indexei `films`
--
ALTER TABLE `films`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Director` (`Director`);

--
-- A tábla indexei `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Name`),
  ADD KEY `Role` (`Role`);

--
-- A tábla indexei `userreview`
--
ALTER TABLE `userreview`
  ADD KEY `UserId` (`UserId`,`FilmId`),
  ADD KEY `FilmId` (`FilmId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `role`
--
ALTER TABLE `role`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `filmactor`
--
ALTER TABLE `filmactor`
  ADD CONSTRAINT `filmactor_ibfk_1` FOREIGN KEY (`FilmId`) REFERENCES `films` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `filmactor_ibfk_2` FOREIGN KEY (`ActorId`) REFERENCES `actor` (`Id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `films`
--
ALTER TABLE `films`
  ADD CONSTRAINT `films_ibfk_1` FOREIGN KEY (`Director`) REFERENCES `director` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Role`) REFERENCES `role` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `userreview`
--
ALTER TABLE `userreview`
  ADD CONSTRAINT `userreview_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userreview_ibfk_2` FOREIGN KEY (`FilmId`) REFERENCES `films` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
