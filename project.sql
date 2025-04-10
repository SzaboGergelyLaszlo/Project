-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 10. 06:27
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
  `Sex` enum('Male','Female') NOT NULL,
  `ProfilKép` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `actor`
--

INSERT INTO `actor` (`Id`, `Name`, `Nationality`, `Birthday`, `Oscar_award`, `Sex`, `ProfilKép`) VALUES
('35701b45-15c2-11f0-a9f4-2cf05d217b52', 'Elijah Wood', 'amerikai', '1981-01-28', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('357025e6-15c2-11f0-a9f4-2cf05d217b52', 'Viggo Mortensen', 'amerikai', '1958-10-20', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('4637fc0f-15c2-11f0-a9f4-2cf05d217b52', 'Mark Hamill', 'amerikai', '1951-09-25', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('4638068d-15c2-11f0-a9f4-2cf05d217b52', 'Harrison Ford', 'amerikai', '1942-07-13', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('5caf5db0-15c1-11f0-a9f4-2cf05d217b52', 'Tom Hanks', 'amerikai', '1956-07-09', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('5caf6fab-15c1-11f0-a9f4-2cf05d217b52', 'Robin Wright', 'amerikai', '1966-04-08', 0, 'Female', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('5da9c632-15c2-11f0-a9f4-2cf05d217b52', 'Hayley Atwell', 'brit', '1982-04-05', 0, 'Female', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('5da9d0fb-15c2-11f0-a9f4-2cf05d217b52', 'Tom Cruise', 'amerikai', '1962-07-03', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('70869583-15c2-11f0-a9f4-2cf05d217b52', 'Anna Faris', 'amerikai', '1976-11-29', 0, 'Female', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('7086a046-15c2-11f0-a9f4-2cf05d217b52', 'Regina Hall', 'amerikai', '1970-12-12', 0, 'Female', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('79d3309e-15c1-11f0-a9f4-2cf05d217b52', 'Al Pacino', 'amerikai', '1940-04-25', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('79d33ca7-15c1-11f0-a9f4-2cf05d217b52', 'Marlon Brando', 'amerikai', '1924-04-03', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('8b6f297c-15c1-11f0-a9f4-2cf05d217b52', 'Christian Bale', 'brit', '1974-01-30', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('8b6f3400-15c1-11f0-a9f4-2cf05d217b52', 'Heath Ledger', 'ausztrál', '1979-04-04', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('9ff1283c-15c1-11f0-a9f4-2cf05d217b52', 'Morgan Freeman', 'amerikai', '1937-06-01', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('9ff132ae-15c1-11f0-a9f4-2cf05d217b52', 'Tim Robbins', 'amerikai', '1958-10-16', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('b760769a-15c1-11f0-a9f4-2cf05d217b52', 'Uma Thurman', 'amerikai', '1970-04-29', 0, 'Female', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('b760813c-15c1-11f0-a9f4-2cf05d217b52', 'David Carradine', 'amerikai', '1936-12-08', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('f8ccbbc9-15c1-11f0-a9f4-2cf05d217b52', 'Jamie Foxx', 'amerikai', '1967-12-13', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('f8ccc65d-15c1-11f0-a9f4-2cf05d217b52', 'Christoph Waltz', 'osztrák', '1956-10-04', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png');

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
  `Sex` enum('Male','Female') NOT NULL,
  `ProfilKép` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `director`
--

INSERT INTO `director` (`Id`, `Name`, `Nationality`, `Birthday`, `Oscar_award`, `Sex`, `ProfilKép`) VALUES
('03dbf7a6-15ba-11f0-a9f4-2cf05d217b52', 'Keenen Ivory Wayans', 'amerikai', '1958-06-08', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('03dc01eb-15ba-11f0-a9f4-2cf05d217b52', 'Brian De Palma', 'amerikai', '1940-09-11', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('26807ae0-15ba-11f0-a9f4-2cf05d217b52', 'Robert Zemeckis', 'amerikai', '1952-05-14', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('26808594-15ba-11f0-a9f4-2cf05d217b52', 'Francis Ford Coppola', 'amerikai', '1939-04-07', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('3d685b35-15ba-11f0-a9f4-2cf05d217b52', 'Christopher Nolan', 'brit', '1970-07-30', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('3d6865c6-15ba-11f0-a9f4-2cf05d217b52', 'Frank Darabont', 'amerikai', '1959-01-28', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('536cda73-15ba-11f0-a9f4-2cf05d217b52', 'Quentin Tarantino', 'amerikai', '1963-03-27', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('536ce53e-15ba-11f0-a9f4-2cf05d217b52', 'Peter Jackson', 'új zélandi', '1961-08-31', 1, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('5dc8935e-15ba-11f0-a9f4-2cf05d217b52', 'Irvin Kershner', 'amerikai', '1923-04-29', 0, 'Male', 'http://kepek.noreplykalahora1992.nhely.hu/users.png');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `filmactor`
--

CREATE TABLE `filmactor` (
  `FilmId` char(36) NOT NULL,
  `ActorId` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `filmactor`
--

INSERT INTO `filmactor` (`FilmId`, `ActorId`) VALUES
('1f723c4b-15bc-11f0-a9f4-2cf05d217b52', '8b6f297c-15c1-11f0-a9f4-2cf05d217b52'),
('1f723c4b-15bc-11f0-a9f4-2cf05d217b52', '8b6f3400-15c1-11f0-a9f4-2cf05d217b52'),
('1f72470f-15bc-11f0-a9f4-2cf05d217b52', '9ff1283c-15c1-11f0-a9f4-2cf05d217b52'),
('1f72470f-15bc-11f0-a9f4-2cf05d217b52', '9ff132ae-15c1-11f0-a9f4-2cf05d217b52'),
('46927279-15bc-11f0-a9f4-2cf05d217b52', 'b760769a-15c1-11f0-a9f4-2cf05d217b52'),
('46927279-15bc-11f0-a9f4-2cf05d217b52', 'b760813c-15c1-11f0-a9f4-2cf05d217b52'),
('46927d0b-15bc-11f0-a9f4-2cf05d217b52', 'f8ccbbc9-15c1-11f0-a9f4-2cf05d217b52'),
('46927d0b-15bc-11f0-a9f4-2cf05d217b52', 'f8ccc65d-15c1-11f0-a9f4-2cf05d217b52'),
('ca90510c-15bc-11f0-a9f4-2cf05d217b52', '35701b45-15c2-11f0-a9f4-2cf05d217b52'),
('ca90510c-15bc-11f0-a9f4-2cf05d217b52', '357025e6-15c2-11f0-a9f4-2cf05d217b52'),
('ca905bec-15bc-11f0-a9f4-2cf05d217b52', '4637fc0f-15c2-11f0-a9f4-2cf05d217b52'),
('ca905bec-15bc-11f0-a9f4-2cf05d217b52', '4638068d-15c2-11f0-a9f4-2cf05d217b52'),
('caed375d-15bb-11f0-a9f4-2cf05d217b52', '5caf5db0-15c1-11f0-a9f4-2cf05d217b52'),
('caed375d-15bb-11f0-a9f4-2cf05d217b52', '5caf6fab-15c1-11f0-a9f4-2cf05d217b52'),
('caed4264-15bb-11f0-a9f4-2cf05d217b52', '79d3309e-15c1-11f0-a9f4-2cf05d217b52'),
('caed4264-15bb-11f0-a9f4-2cf05d217b52', '79d33ca7-15c1-11f0-a9f4-2cf05d217b52'),
('fa3b9774-15bc-11f0-a9f4-2cf05d217b52', '5da9c632-15c2-11f0-a9f4-2cf05d217b52'),
('fa3b9774-15bc-11f0-a9f4-2cf05d217b52', '5da9d0fb-15c2-11f0-a9f4-2cf05d217b52'),
('fa3ba2a6-15bc-11f0-a9f4-2cf05d217b52', '70869583-15c2-11f0-a9f4-2cf05d217b52'),
('fa3ba2a6-15bc-11f0-a9f4-2cf05d217b52', '7086a046-15c2-11f0-a9f4-2cf05d217b52');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `films`
--

CREATE TABLE `films` (
  `Id` char(36) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `Director` char(36) NOT NULL,
  `Genre` varchar(16) NOT NULL,
  `ReleaseYear` int(8) NOT NULL,
  `Length` int(4) NOT NULL,
  `AgeCertificates` int(2) NOT NULL,
  `Summary` text NOT NULL,
  `Kép` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `films`
--

INSERT INTO `films` (`Id`, `Name`, `Director`, `Genre`, `ReleaseYear`, `Length`, `AgeCertificates`, `Summary`, `Kép`) VALUES
('1f723c4b-15bc-11f0-a9f4-2cf05d217b52', 'The Dark Knight', '3d685b35-15ba-11f0-a9f4-2cf05d217b52', 'akcio', 2008, 152, 13, 'leiras', 'http://kepek.noreplykalahora1992.nhely.hu/The_Dark_Knight.jpg'),
('1f72470f-15bc-11f0-a9f4-2cf05d217b52', 'The Shawshank Redemption', '3d6865c6-15ba-11f0-a9f4-2cf05d217b52', 'dráma', 1994, 132, 18, 'leiras', 'http://kepek.noreplykalahora1992.nhely.hu/movie.png'),
('46927279-15bc-11f0-a9f4-2cf05d217b52', 'Kill Bill: volume 1', '536cda73-15ba-11f0-a9f4-2cf05d217b52', 'akcio', 2003, 111, 18, 'leiras', 'http://kepek.noreplykalahora1992.nhely.hu/movie.png'),
('46927d0b-15bc-11f0-a9f4-2cf05d217b52', 'Django Unchained', '536cda73-15ba-11f0-a9f4-2cf05d217b52', 'western', 2012, 165, 18, 'leiras', 'http://kepek.noreplykalahora1992.nhely.hu/movie.png'),
('ca90510c-15bc-11f0-a9f4-2cf05d217b52', 'The Lord of the rings: The Two Towers', '536ce53e-15ba-11f0-a9f4-2cf05d217b52', 'fantasy', 2002, 197, 13, 'leiras', 'http://kepek.noreplykalahora1992.nhely.hu/movie.png'),
('ca905bec-15bc-11f0-a9f4-2cf05d217b52', 'Star Wars: The Empire Strikes back', '5dc8935e-15ba-11f0-a9f4-2cf05d217b52', 'sci-fi', 1980, 124, 7, 'leiras', 'http://kepek.noreplykalahora1992.nhely.hu/movie.png'),
('caed375d-15bb-11f0-a9f4-2cf05d217b52', 'Forrest Gump', '26807ae0-15ba-11f0-a9f4-2cf05d217b52', 'dráma', 1994, 142, 13, 'leiras', 'http://kepek.noreplykalahora1992.nhely.hu/Forrest_Gump_poster.jpg'),
('caed4264-15bb-11f0-a9f4-2cf05d217b52', 'Godfather', '26808594-15ba-11f0-a9f4-2cf05d217b52', 'krimi', 1972, 175, 18, 'leiras', 'http://kepek.noreplykalahora1992.nhely.hu/Godfather_ver1.jpg'),
('fa3b9774-15bc-11f0-a9f4-2cf05d217b52', 'Mission: Impossible', '03dc01eb-15ba-11f0-a9f4-2cf05d217b52', 'akcio', 1996, 110, 13, 'leiras', 'http://kepek.noreplykalahora1992.nhely.hu/movie.png'),
('fa3ba2a6-15bc-11f0-a9f4-2cf05d217b52', 'Scary Movie', '03dbf7a6-15ba-11f0-a9f4-2cf05d217b52', 'paródia', 2000, 88, 18, 'leiras', 'http://kepek.noreplykalahora1992.nhely.hu/movie.png');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rating`
--

CREATE TABLE `rating` (
  `Id` char(36) NOT NULL,
  `FilmId` char(36) NOT NULL,
  `UserId` char(36) NOT NULL,
  `Review` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `rating`
--

INSERT INTO `rating` (`Id`, `FilmId`, `UserId`, `Review`) VALUES
('4357658b-15bd-11f0-a9f4-2cf05d217b52', '1f723c4b-15bc-11f0-a9f4-2cf05d217b52', '2df6faf4-b219-431c-a8e9-0876508507eb', 4),
('4357717d-15bd-11f0-a9f4-2cf05d217b52', '1f723c4b-15bc-11f0-a9f4-2cf05d217b52', 'caaa051f-ca0c-4725-92b1-478b474ff5c5', 8),
('4bd7ade5-15bd-11f0-a9f4-2cf05d217b52', '1f72470f-15bc-11f0-a9f4-2cf05d217b52', '2df6faf4-b219-431c-a8e9-0876508507eb', 4),
('4bd7bb57-15bd-11f0-a9f4-2cf05d217b52', '1f72470f-15bc-11f0-a9f4-2cf05d217b52', 'caaa051f-ca0c-4725-92b1-478b474ff5c5', 8),
('573786d1-15bd-11f0-a9f4-2cf05d217b52', '46927d0b-15bc-11f0-a9f4-2cf05d217b52', '2df6faf4-b219-431c-a8e9-0876508507eb', 8),
('573790d3-15bd-11f0-a9f4-2cf05d217b52', '46927d0b-15bc-11f0-a9f4-2cf05d217b52', 'caaa051f-ca0c-4725-92b1-478b474ff5c5', 4),
('5d58a232-15bd-11f0-a9f4-2cf05d217b52', '46927279-15bc-11f0-a9f4-2cf05d217b52', '2df6faf4-b219-431c-a8e9-0876508507eb', 10),
('5d58ac8d-15bd-11f0-a9f4-2cf05d217b52', '46927279-15bc-11f0-a9f4-2cf05d217b52', 'caaa051f-ca0c-4725-92b1-478b474ff5c5', 5),
('7383e105-15bd-11f0-a9f4-2cf05d217b52', 'ca905bec-15bc-11f0-a9f4-2cf05d217b52', '2df6faf4-b219-431c-a8e9-0876508507eb', 10),
('7383eb6b-15bd-11f0-a9f4-2cf05d217b52', 'ca905bec-15bc-11f0-a9f4-2cf05d217b52', 'caaa051f-ca0c-4725-92b1-478b474ff5c5', 10),
('9f725117-15bd-11f0-a9f4-2cf05d217b52', 'ca90510c-15bc-11f0-a9f4-2cf05d217b52', '2df6faf4-b219-431c-a8e9-0876508507eb', 5),
('9f725b55-15bd-11f0-a9f4-2cf05d217b52', 'ca90510c-15bc-11f0-a9f4-2cf05d217b52', 'caaa051f-ca0c-4725-92b1-478b474ff5c5', 7),
('b6a15357-15bd-11f0-a9f4-2cf05d217b52', 'caed375d-15bb-11f0-a9f4-2cf05d217b52', '2df6faf4-b219-431c-a8e9-0876508507eb', 8),
('b6a15dbb-15bd-11f0-a9f4-2cf05d217b52', 'caed375d-15bb-11f0-a9f4-2cf05d217b52', 'caaa051f-ca0c-4725-92b1-478b474ff5c5', 7),
('c10a6f99-15bd-11f0-a9f4-2cf05d217b52', 'caed4264-15bb-11f0-a9f4-2cf05d217b52', '2df6faf4-b219-431c-a8e9-0876508507eb', 4),
('c10a79fc-15bd-11f0-a9f4-2cf05d217b52', 'caed4264-15bb-11f0-a9f4-2cf05d217b52', 'caaa051f-ca0c-4725-92b1-478b474ff5c5', 7),
('c9e8afb6-15bd-11f0-a9f4-2cf05d217b52', 'fa3b9774-15bc-11f0-a9f4-2cf05d217b52', 'caaa051f-ca0c-4725-92b1-478b474ff5c5', 4),
('c9e8b9a5-15bd-11f0-a9f4-2cf05d217b52', 'fa3b9774-15bc-11f0-a9f4-2cf05d217b52', '2df6faf4-b219-431c-a8e9-0876508507eb', 4),
('d1380fa7-15bd-11f0-a9f4-2cf05d217b52', 'fa3ba2a6-15bc-11f0-a9f4-2cf05d217b52', '2df6faf4-b219-431c-a8e9-0876508507eb', 1),
('d1381b19-15bd-11f0-a9f4-2cf05d217b52', 'fa3ba2a6-15bc-11f0-a9f4-2cf05d217b52', 'caaa051f-ca0c-4725-92b1-478b474ff5c5', 10);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `role`
--

CREATE TABLE `role` (
  `Id` int(10) NOT NULL,
  `Name` varchar(10) NOT NULL,
  `Description` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `role`
--

INSERT INTO `role` (`Id`, `Name`, `Description`) VALUES
(1, 'Admin', 'Admin User'),
(2, 'User', 'Normal user');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` char(36) NOT NULL,
  `Name` varchar(40) NOT NULL,
  `FelhasznaloNev` varchar(100) NOT NULL,
  `Hash` varchar(64) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `Sex` enum('Male','Female') NOT NULL,
  `Joined` date NOT NULL DEFAULT current_timestamp(),
  `Role` int(10) NOT NULL,
  `ProfilKép` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`Id`, `Name`, `FelhasznaloNev`, `Hash`, `Email`, `Sex`, `Joined`, `Role`, `ProfilKép`) VALUES
('2df6faf4-b219-431c-a8e9-0876508507eb', 'user', 'user', '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb', 'user@user.com', 'Female', '2025-04-09', 2, 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
('caaa051f-ca0c-4725-92b1-478b474ff5c5', 'admin', 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin@admin.com', 'Male', '2025-04-09', 1, 'http://kepek.noreplykalahora1992.nhely.hu/users.png');

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
-- A tábla indexei `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `FilmId` (`FilmId`,`UserId`),
  ADD KEY `UserId` (`UserId`);

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
  ADD UNIQUE KEY `Email_2` (`Email`),
  ADD UNIQUE KEY `FelhasznaloNev` (`FelhasznaloNev`),
  ADD KEY `Role` (`Role`);

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
-- Megkötések a táblához `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`FilmId`) REFERENCES `films` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Role`) REFERENCES `role` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
