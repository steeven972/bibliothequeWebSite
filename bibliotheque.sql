-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 14 mars 2025 à 11:41
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bibliotheque`
--

-- --------------------------------------------------------

--
-- Structure de la table `livre`
--

CREATE TABLE `livre` (
  `ISBN` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `auteur` varchar(255) DEFAULT NULL,
  `date_parution` int(11) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `livre`
--

INSERT INTO `livre` (`ISBN`, `titre`, `auteur`, `date_parution`, `genre`, `description`) VALUES
(4948, 'Les miserables', 'Victor Hugo', 1862, 'Roman', 'Un roman sur la rédemption...'),
(5835, 'One Punch Man', 'ONE', 2012, 'Manga', 'Un super-héros qui bat ses ennemis...'),
(25649, '1984', 'George Orwell', 1949, 'Manga', 'Un monde totalitaire sous surveillance...');

-- --------------------------------------------------------

--
-- Structure de la table `livre_stock`
--

CREATE TABLE `livre_stock` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `auteur` varchar(255) DEFAULT NULL,
  `annee` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  `couverture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `livre_stock`
--

INSERT INTO `livre_stock` (`id`, `titre`, `auteur`, `annee`, `description`, `genre`, `quantity`, `disponible`, `couverture`) VALUES
(45659, 'Harry Potter à l\'école des sorciers ', 'J. K. Rowling', 1997, 'un sorcier', 'Roman', 4, 1, 'https://www.amazon.fr/Harry-Potter-Harry-l%C3%A9cole-sorciers/dp/2070643026');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `name`, `email`, `password`) VALUES
(1, 'sgzeg', 'zgzeg@zegz', 'zegzeg'),
(2, 'Steeven972', 'steeven@gmail.com', 'zegvzegzeg'),
(3, 'Steeven972', 'steeven@gmail.com', 'zegvzegzeg'),
(4, 'ezfzef', 'ezfgzeg@zegzg', 'zegzeg'),
(5, 'fzef', 'zefze@zef', 'zezev'),
(6, 'zefzeg', 'zegzeg@zegz', 'zegzeg'),
(7, 'zefzegf', 'zegzeg@zeg', 'sdvsdv'),
(8, 'efeazf', 'fafazf@faf', 'afafaf'),
(9, 'efeazf', 'fafazf@faf', 'afafaf'),
(10, 'rgeer', 'ehtrerh@erger', 'ergerh'),
(11, 'Steeveb', 'myEmail@gmailefz.zf', '$2b$10$OWFdZCSxC389n2tQBw7Jpe8REAlinjg.xeXIFIyf/Hx3yls4vSsyW'),
(12, 'Steeven9785', 'joj@zefz.eaf', '$2b$10$QBVaZw1Ix69PgNq6VQ1AzuOXClISXGyniKh/WF0nNdqu51S.b1zEq'),
(13, 'Steeven', 'jefojz@zefz', '$2b$10$vncVfWHOOUfQ9BTUk99.duF9TDCUVpG7bSGm6tz7ENvVfQdgaVt0O');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `livre`
--
ALTER TABLE `livre`
  ADD PRIMARY KEY (`ISBN`);

--
-- Index pour la table `livre_stock`
--
ALTER TABLE `livre_stock`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `livre`
--
ALTER TABLE `livre`
  MODIFY `ISBN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25650;

--
-- AUTO_INCREMENT pour la table `livre_stock`
--
ALTER TABLE `livre_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45660;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
