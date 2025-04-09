-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 09. 20:14
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
('d1447153-7523-4468-a3cd-01d30a6b650b', 'Estele Pic', 'China', '1962-12-26', 0, 'Female', '');

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
('fafd2e3f-6e99-499f-9cf7-9211909b7265', 'Fabiano Lorrie', 'Czech Republic', '1957-06-02', 1, 'Male', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `filmactor`
--

CREATE TABLE `filmactor` (
  `FilmId` char(36) NOT NULL,
  `ActorId` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(2, 'User', 'Normal user'),
(3, 'guest', 'guest user');

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
('a61bcac6-791b-4cf7-9324-aa980c9ef31a', 'Ati', 'ati', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'huszti.attila1226@gmail.com', '', '2025-04-07', 1, 'http://kepek.noreplykalahora1992.nhely.hu/users.png'),
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
