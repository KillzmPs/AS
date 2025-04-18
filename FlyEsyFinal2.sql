-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 18-Abr-2025 às 03:32
-- Versão do servidor: 8.0.41-0ubuntu0.24.04.1
-- versão do PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `FlyEasy`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Aeroporto`
--

CREATE TABLE `Aeroporto` (
  `Id` int NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Morada` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Id_Pais` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Aeroporto`
--

INSERT INTO `Aeroporto` (`Id`, `Nome`, `Morada`, `Id_Pais`) VALUES
(1, 'Aeroporto Humberto Delgado', 'Alameda das Comunidades Portuguesas, Lisboa', 142),
(2, 'Aeroporto Francisco Sá Carneiro', 'Pedras Rubras, Maia, Porto', 142),
(3, 'Aeroporto de Faro', 'Faro', 142),
(4, 'Aeroporto da Madeira', 'Santa Cruz, Madeira', 142),
(5, 'Aeroporto João Paulo II', 'Ponta Delgada, Açores', 142),
(6, 'Aeroporto Charles de Gaulle', 'Roissy-en-France, Paris', 69),
(7, 'Aeroporto de Heathrow', 'Longford, Londres', 146),
(8, 'Aeroporto de Barajas', 'Av. de la Hispanidad, Madrid', 61),
(9, 'Aeroporto de Schiphol', 'Evert van de Beekstraat, Amsterdão', 134),
(10, 'Aeroporto de Frankfurt', 'Frankfurt am Main', 4),
(11, 'Aeroporto Internacional de Los Angeles', '1 World Way, Los Angeles', 63),
(12, 'Aeroporto Internacional de Miami', '2100 NW 42nd Ave, Miami', 63),
(13, 'Aeroporto de Guarulhos', 'Rod. Hélio Smidt, Guarulhos', 27),
(14, 'Aeroporto Internacional do México', 'Av. Capitán Carlos León, Cidade do México', 117),
(15, 'Aeroporto Internacional de Dubai', 'Dubai', 56),
(16, 'Aeroporto Internacional de Abu Dhabi', 'Abu Dhabi', 56),
(17, 'Aeroporto Internacional de Tóquio-Haneda', 'Hanedakuko, Ota City, Tóquio', 95),
(18, 'Aeroporto de Changi', 'Airport Blvd, Singapura', 166),
(19, 'Aeroporto de Sydney', 'Sydney Airport', 12),
(20, 'Aeroporto de Joanesburgo', '1 Jones Rd, Kempton Park, Joanesburgo', 2),
(21, 'Aeroporto Internacional do Cairo', 'Oruba Road, Heliopolis, Cairo', 55);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Bilhete`
--

CREATE TABLE `Bilhete` (
  `Id` int NOT NULL,
  `Id_Utilizador` int NOT NULL,
  `Data_emissao` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Bilhete`
--

INSERT INTO `Bilhete` (`Id`, `Id_Utilizador`, `Data_emissao`) VALUES
(1, 1, '2025-04-24 19:56:59');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Bilhete_Lugar`
--

CREATE TABLE `Bilhete_Lugar` (
  `Id_Bilhete` int NOT NULL,
  `Id_Lugar` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Bilhete_Lugar`
--

INSERT INTO `Bilhete_Lugar` (`Id_Bilhete`, `Id_Lugar`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Bilhete_Quarto`
--

CREATE TABLE `Bilhete_Quarto` (
  `Id_Bilhete` int NOT NULL,
  `Id_Quarto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Bilhete_Quarto`
--

INSERT INTO `Bilhete_Quarto` (`Id_Bilhete`, `Id_Quarto`) VALUES
(1, 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Classe`
--

CREATE TABLE `Classe` (
  `Id` int NOT NULL,
  `Tipo_Classe` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Classe`
--

INSERT INTO `Classe` (`Id`, `Tipo_Classe`) VALUES
(1, 'Económica'),
(2, 'Económica Premium'),
(3, 'Executiva'),
(4, 'Primeira');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Companhia_Aerea`
--

CREATE TABLE `Companhia_Aerea` (
  `Id` int NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Abreviacao` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Companhia_Aerea`
--

INSERT INTO `Companhia_Aerea` (`Id`, `Nome`, `Abreviacao`) VALUES
(1, 'TAP', 'TAP'),
(2, 'Ryanair', 'RYR'),
(3, 'easyJet', 'EZY'),
(4, 'Air France', 'AFR'),
(5, 'Lufthansa', 'DLH'),
(6, 'KLM Royal Dutch Airlines', 'KLM'),
(7, 'British Airways', 'BAW'),
(8, 'Iberia', 'IBE'),
(9, 'Emirates', 'UAE'),
(10, 'Qatar Airways', 'QTR'),
(11, 'Turkish Airlines', 'THY'),
(12, 'Delta Air Lines', 'DAL'),
(13, 'United Airlines', 'UAL'),
(14, 'American Airlines', 'AAL'),
(15, 'LATAM Airlines', 'LAN'),
(16, 'Qantas', 'QFA'),
(17, 'Singapore Airlines', 'SIA'),
(18, 'Japan Airlines', 'JAL'),
(19, 'South African Airways', 'SAA'),
(20, 'Aeroméxico', 'AMX');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Disponibilidade`
--

CREATE TABLE `Disponibilidade` (
  `Id` int NOT NULL,
  `Disponivel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Disponibilidade`
--

INSERT INTO `Disponibilidade` (`Id`, `Disponivel`) VALUES
(1, 'Disponivel'),
(2, 'Não Dispónivel');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Estado`
--

CREATE TABLE `Estado` (
  `Id` int NOT NULL,
  `Tipo_Estado` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Estado`
--

INSERT INTO `Estado` (`Id`, `Tipo_Estado`) VALUES
(1, 'Aguardar Pagamento'),
(2, 'Pago'),
(3, 'Cancelada'),
(4, 'Expirada'),
(5, 'A Aguardar Resposta'),
(6, 'Resolvido');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Hotel`
--

CREATE TABLE `Hotel` (
  `Id` int NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Morada` varchar(255) NOT NULL,
  `Lotacao` int NOT NULL,
  `Avaliacao` int NOT NULL,
  `Id_Pais` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Hotel`
--

INSERT INTO `Hotel` (`Id`, `Nome`, `Morada`, `Lotacao`, `Avaliacao`, `Id_Pais`) VALUES
(1, 'Hotel Tivoli Lisboa', 'Av. da Liberdade 185, Lisboa', 300, 4, 142),
(2, 'Sheraton Porto Hotel', 'Rua Tenente Valadim 146, Porto', 250, 5, 142),
(3, 'Vila Galé Albacora', 'Bairro do Lago, Alcácer do Sal', 120, 4, 142),
(4, 'Pestana Palace', 'Rua Jau 54, Lisboa', 180, 5, 142),
(5, 'The Yeatman', 'Rua do Choupelo, Vila Nova de Gaia', 150, 5, 142),
(6, 'Martinhal Sagres', 'Quinta do Martinhal, Sagres', 200, 4, 142),
(7, 'EPIC SANA Lisboa', 'Av. Eng. Duarte Pacheco, Lisboa', 350, 5, 142),
(8, 'Vidago Palace', 'Parque de Vidago, Chaves', 120, 5, 142),
(9, 'Pousada Mosteiro Guimarães', 'Largo Domingos Leite de Castro, Guimarães', 80, 4, 142),
(10, 'Altis Belém', 'Doca do Bom Sucesso, Lisboa', 160, 5, 142),
(11, 'Vila Galé Collection Braga', 'Av. General Carrilho da Silva Pinto, Braga', 220, 4, 142),
(12, 'Pestana Porto Santo', 'Porto Santo, Madeira', 300, 4, 142),
(13, 'Bela Vista Hotel', 'Av. Tomás Cabreira, Portimão', 90, 4, 142),
(14, 'Quinta do Lago', 'Almancil, Algarve', 250, 5, 142),
(15, 'Pousada Convento Évora', 'Largo do Conde de Vila Flor, Évora', 100, 5, 142),
(16, 'The Vintage Lisboa', 'Rua Rodrigo da Fonseca 2, Lisboa', 130, 4, 142),
(17, 'Monverde Wine Experience', 'Quinta da Lixa, Amarante', 70, 4, 142),
(18, 'Pine Cliffs Resort', 'Praia da Falésia, Albufeira', 400, 5, 142),
(19, 'Fortaleza do Guincho', 'Estrada do Guincho, Cascais', 60, 5, 142),
(20, 'São Lourenço do Barrocal', 'Montemor-o-Novo', 85, 5, 142),
(21, 'Hotel Açores Atlântico', 'Av. João Bosco Mota Amaral, Ponta Delgada', 200, 4, 142),
(22, 'Vila Vita Parc', 'Rua Anneliese Pohl, Porches', 180, 5, 142),
(23, 'Conrad Algarve', 'Estrada da Quinta do Lago, Almancil', 150, 5, 142),
(24, 'Pousada D. Maria', 'Rua 5 de Outubro, Viseu', 90, 4, 142),
(25, 'Hotel Quinta das Lágrimas', 'Rua António Augusto Gonçalves, Coimbra', 110, 5, 142),
(26, 'Vila Joya', 'Praia da Galé, Albufeira', 40, 5, 142),
(27, 'Pestana CR7 Lisboa', 'Av. 24 de Julho, Lisboa', 160, 4, 142),
(28, 'Hotel Cascais Miragem', 'Av. Marginal, Cascais', 220, 5, 142),
(29, 'Pousada de Óbidos', 'Paço Real, Óbidos', 75, 4, 142),
(30, 'Six Senses Douro Valley', 'Quinta de Vale Abraão, Lamego', 100, 5, 142),
(31, 'Hotel Ritz Madrid', 'Plaza de la Lealtad 5, Madrid', 200, 5, 61),
(32, 'W Barcelona', 'Plaça Rosa dels Vents 1, Barcelona', 350, 5, 61),
(33, 'Parador de Santiago', 'Plaza do Obradoiro 1, Santiago de Compostela', 150, 5, 61),
(34, 'Hotel Arts Barcelona', 'Marina 19-21, Barcelona', 400, 5, 61),
(35, 'Gran Hotel La Florida', 'Ctra. Vallvidrera al Tibidabo, Barcelona', 90, 5, 61),
(36, 'Hotel María Cristina', 'Paseo República Argentina 4, San Sebastián', 180, 5, 61),
(37, 'Parador de Granada', 'Calle Real de la Alhambra, Granada', 120, 5, 61),
(38, 'Hotel Único Madrid', 'Claudio Coello 67, Madrid', 80, 5, 61),
(39, 'Hotel Alfonso XIII', 'San Fernando 2, Sevilla', 200, 5, 61),
(40, 'Meliá Bilbao', 'Lehendakari Leizaola 29, Bilbao', 250, 4, 61),
(41, 'Hotel Marqués de Riscal', 'Calle Torrea 1, Elciego', 70, 5, 61),
(42, 'Parador de Ronda', 'Plaza de España, Ronda', 100, 4, 61),
(43, 'Hotel Cotton House', 'Gran Via de les Corts Catalanes 670, Barcelona', 120, 5, 61),
(44, 'Parador de Toledo', 'Cerro del Emperador, Toledo', 130, 5, 61),
(45, 'Hotel Hospes Palacio del Bailío', 'Ramírez de las Casas Deza 10, Córdoba', 90, 5, 61),
(46, 'Hotel Puerta América', 'Av. de América 41, Madrid', 300, 5, 61),
(47, 'Parador de Cádiz', 'Av. Duque de Nájera 9, Cádiz', 150, 4, 61),
(48, 'Hotel Silken Gran Domine', 'Alameda Mazarredo 61, Bilbao', 110, 4, 61),
(49, 'Parador de Ávila', 'Marqués de Canales de Chozas 2, Ávila', 100, 5, 61),
(50, 'Hotel H10 Casanova', 'Gran Via de les Corts Catalanes 559, Barcelona', 200, 4, 61),
(51, 'Parador de Cuenca', 'Subida a San Pablo, Cuenca', 80, 5, 61),
(52, 'Hotel NH Collection Palacio de Tepa', 'San Sebastián 2, Madrid', 140, 4, 61),
(53, 'Parador de Santillana del Mar', 'Plaza de Ramón Pelayo 11, Santillana del Mar', 90, 5, 61),
(54, 'Hotel Mercer Barcelona', 'Carrer dels Lledó 7, Barcelona', 60, 5, 61),
(55, 'Parador de Jaén', 'Castillo de Santa Catalina, Jaén', 110, 5, 61),
(56, 'Hotel Orfila', 'Orfila 6, Madrid', 50, 5, 61),
(57, 'Parador de Alcalá de Henares', 'Colegios 10, Alcalá de Henares', 120, 4, 61),
(58, 'Hotel Claris', 'Pau Claris 150, Barcelona', 180, 5, 61),
(59, 'Parador de Málaga Gibralfaro', 'Castillo de Gibralfaro, Málaga', 100, 5, 61),
(60, 'Hotel Villa Magna', 'Paseo de la Castellana 22, Madrid', 200, 5, 61),
(61, 'Hôtel de Crillon', '10 Place de la Concorde, Paris', 150, 5, 69),
(62, 'Le Negresco', '37 Promenade des Anglais, Nice', 180, 4, 69),
(63, 'Hôtel Plaza Athénée', '25 Av. Montaigne, Paris', 200, 5, 69),
(64, 'Le Bristol Paris', '112 Rue du Faubourg Saint-Honoré, Paris', 190, 5, 69),
(65, 'Hôtel du Cap-Eden-Roc', 'Boulevard J. F. Kennedy, Antibes', 120, 5, 69),
(66, 'Four Seasons Hotel George V', '31 Av. George V, Paris', 250, 5, 69),
(67, 'Hôtel Ritz Paris', '15 Place Vendôme, Paris', 170, 5, 69),
(68, 'Château de la Chèvre d\'Or', 'Rue du Barri, Èze', 60, 5, 69),
(69, 'Hôtel Martinez', '73 Bd de la Croisette, Cannes', 300, 5, 69),
(70, 'Hôtel Barrière Le Majestic', '10 La Croisette, Cannes', 250, 5, 69),
(71, 'Le Royal Monceau', '37 Av. Hoche, Paris', 150, 5, 69),
(72, 'Hôtel Byblos', 'Av. Paul Signac, Saint-Tropez', 100, 5, 69),
(73, 'Hôtel Lutetia', '45 Bd Raspail, Paris', 180, 5, 69),
(74, 'Château Saint-Martin & Spa', '2490 Av. des Templiers, Vence', 80, 5, 69),
(75, 'Hôtel de Paris Monte-Carlo', 'Place du Casino, Monaco', 200, 5, 69),
(76, 'Hôtel Hermitage Monte-Carlo', 'Square Beaumarchais, Monaco', 150, 5, 69),
(77, 'Hôtel Belles Rives', '33 Bd Edouard Baudoin, Juan-les-Pins', 90, 5, 69),
(78, 'Hôtel du Palais', '1 Av. de l\'Impératrice, Biarritz', 180, 5, 69),
(79, 'Château de la Messardière', 'Route des Salins, Saint-Tropez', 70, 5, 69),
(80, 'Hôtel Le Burgundy', '6-8 Rue Duphot, Paris', 110, 5, 69),
(81, 'Hôtel Westminster', '13 Rue de la Paix, Paris', 130, 5, 69),
(82, 'Hôtel Mont-Blanc', '62 Rue du Mont-Blanc, Chamonix', 100, 4, 69),
(83, 'Hôtel Les Airelles', 'Route du Grand-Bornand, Courchevel', 60, 5, 69),
(84, 'Hôtel Le Meurice', '228 Rue de Rivoli, Paris', 160, 5, 69),
(85, 'Hôtel Le Cinq Codet', '5 Rue Louis Codet, Paris', 90, 5, 69),
(86, 'Hotel Danieli', 'Riva degli Schiavoni 4196, Veneza', 150, 5, 93),
(87, 'Hotel Hassler Roma', 'Piazza della Trinità dei Monti 6, Roma', 120, 5, 93),
(88, 'Grand Hotel Tremezzo', 'Via Regina 8, Tremezzo', 100, 5, 93),
(89, 'Belmond Hotel Cipriani', 'Giudecca 10, Veneza', 90, 5, 93),
(90, 'Four Seasons Hotel Firenze', 'Borgo Pinti 99, Florença', 110, 5, 93),
(91, 'Hotel Santa Caterina', 'S.S. Amalfitana 9, Amalfi', 80, 5, 93),
(92, 'Palazzo Avino', 'Via San Giovanni del Toro 28, Ravello', 70, 5, 93),
(93, 'Hotel de Russie', 'Via del Babuino 9, Roma', 130, 5, 93),
(94, 'Il Sereno Lago di Como', 'Via Torrazza 10, Torno', 60, 5, 93),
(95, 'Hotel Splendido', 'Salita Baratta 16, Portofino', 90, 5, 93),
(96, 'Palazzo Margherita', 'Corso Umberto I 70, Bernalda', 50, 5, 93),
(97, 'JK Place Roma', 'Via di Monte d\'Oro 30, Roma', 70, 5, 93),
(98, 'Hotel Eden', 'Via Ludovisi 49, Roma', 140, 5, 93),
(99, 'Palazzo Manfredi', 'Via Labicana 125, Roma', 80, 5, 93),
(100, 'Villa d\'Este', 'Via Regina 40, Cernobbio', 150, 5, 93),
(101, 'Hotel Principe di Savoia', 'Piazza della Repubblica 17, Milão', 200, 5, 93),
(102, 'San Domenico Palace', 'Piazza San Domenico 5, Taormina', 120, 5, 93),
(103, 'Grand Hotel Excelsior Vittoria', 'Piazza Tasso 34, Sorrento', 100, 5, 93),
(104, 'Hotel Lungarno', 'Borgo San Jacopo 14, Florença', 90, 5, 93),
(105, 'Palazzo Montemartini Roma', 'Largo Giovanni Montemartini 1, Roma', 160, 5, 93),
(106, 'Hotel Majestic', 'Via Vittorio Veneto 50, Roma', 130, 5, 93),
(107, 'Grand Hotel Quisisana', 'Via Camerelle 2, Capri', 110, 5, 93),
(108, 'Hotel Villa Cimbrone', 'Via Santa Chiara 26, Ravello', 60, 5, 93),
(109, 'Palazzo Seneca', 'Via Cesare Battisti 12, Norcia', 70, 5, 93),
(110, 'Hotel Byron', 'Via della Libertà 64, Forte dei Marmi', 80, 5, 93),
(111, 'The Plaza New York', '768 5th Ave, New York', 400, 5, 63),
(112, 'Beverly Hills Hotel', '9641 Sunset Blvd, Beverly Hills', 220, 5, 63),
(113, 'Waldorf Astoria New York', '301 Park Ave, New York', 350, 5, 63),
(114, 'The Breakers Palm Beach', '1 S County Rd, Palm Beach', 300, 5, 63),
(115, 'The St. Regis New York', '2 E 55th St, New York', 250, 5, 63),
(116, 'Four Seasons Hotel Las Vegas', '3960 Las Vegas Blvd S, Las Vegas', 280, 5, 63),
(117, 'The Langham Chicago', '330 N Wabash Ave, Chicago', 200, 5, 63),
(118, 'The Jefferson Washington DC', '1200 16th St NW, Washington', 180, 5, 63),
(119, 'The Ritz-Carlton San Francisco', '600 Stockton St, San Francisco', 220, 5, 63),
(120, 'The Peninsula Beverly Hills', '9882 Santa Monica Blvd, Beverly Hills', 150, 5, 63),
(121, 'The Carlyle New York', '35 E 76th St, New York', 190, 5, 63),
(122, 'Montage Laguna Beach', '30801 Coast Hwy, Laguna Beach', 170, 5, 63),
(123, 'The Lowell New York', '28 E 63rd St, New York', 120, 5, 63),
(124, 'The Chanler at Cliff Walk', '117 Memorial Blvd, Newport', 60, 5, 63),
(125, 'The Greenwich Hotel', '377 Greenwich St, New York', 130, 5, 63),
(126, 'The Sebastian Vail', '16 Vail Rd, Vail', 140, 5, 63),
(127, 'The White Elephant Nantucket', '50 Easton St, Nantucket', 100, 5, 63),
(128, 'The Cloister at Sea Island', '100 Cloister Dr, Sea Island', 180, 5, 63),
(129, 'The Little Nell Aspen', '675 E Durant Ave, Aspen', 150, 5, 63),
(130, 'The Hermitage Hotel', '231 6th Ave N, Nashville', 160, 5, 63),
(131, 'The Brown Palace Denver', '321 17th St, Denver', 200, 5, 63),
(132, 'The Pfister Hotel Milwaukee', '424 E Wisconsin Ave, Milwaukee', 220, 5, 63),
(133, 'The Willard InterContinental Washington', '1401 Pennsylvania Ave NW, Washington', 250, 5, 63),
(134, 'The Broadmoor Colorado Springs', '1 Lake Ave, Colorado Springs', 400, 5, 63),
(135, 'The Phoenician Scottsdale', '6000 E Camelback Rd, Scottsdale', 300, 5, 63),
(136, 'The Ritz-Carlton New Orleans', '921 Canal St, New Orleans', 280, 5, 63),
(137, 'The Umstead Hotel Cary', '100 Woodland Pond Dr, Cary', 150, 5, 63),
(138, 'The Kahala Hotel Honolulu', '5000 Kahala Ave, Honolulu', 200, 5, 63),
(139, 'The Lodge at Sea Island', '100 Retreat Ave, St Simons Island', 120, 5, 63),
(140, 'The Surrey New York', '20 E 76th St, New York', 180, 5, 63),
(141, 'Copacabana Palace', 'Av. Atlântica 1702, Rio de Janeiro', 280, 5, 27),
(142, 'Hotel Fasano São Paulo', 'Rua Vittorio Fasano 88, São Paulo', 160, 5, 27),
(143, 'Emiliano Rio', 'Av. Atlântica 3804, Rio de Janeiro', 120, 5, 27),
(144, 'Hotel Unique', 'Av. Brigadeiro Luís Antônio 4700, São Paulo', 150, 5, 27),
(145, 'Belmond Hotel das Cataratas', 'Rodovia Br 469, Foz do Iguaçu', 180, 5, 27),
(146, 'Pestana Convento do Carmo', 'Largo do Carmo, Salvador', 130, 5, 27),
(147, 'Hotel Fasano Rio', 'Av. Vieira Souto 80, Rio de Janeiro', 140, 5, 27),
(148, 'Tivoli Ecoresort Praia do Forte', 'Av. do Farol 2500, Mata de São João', 200, 5, 27),
(149, 'Grand Hyatt São Paulo', 'Av. das Nações Unidas 13301, São Paulo', 300, 5, 27),
(150, 'Hotel Santa Teresa', 'Rua Almirante Alexandrino 660, Rio de Janeiro', 90, 5, 27),
(151, 'UXUA Casa Hotel', 'Rua São Jorge 265, Trancoso', 50, 5, 27),
(152, 'Pousada Maravilha', 'Rua do Céu 100, Fernando de Noronha', 40, 5, 27),
(153, 'Hotel Fasano Boa Vista', 'Rodovia Engenheiro Constâncio Cintra, Porto Feliz', 120, 5, 27),
(154, 'Ponta dos Ganchos', 'Rua do Balneário, Governador Celso Ramos', 60, 5, 27),
(155, 'Nannai Resort', 'Av. Senador Dinarte Mariz 7825, Porto de Galinhas', 150, 5, 27),
(156, 'Tivoli Mofarrej São Paulo', 'Alameda Santos 1437, São Paulo', 220, 5, 27),
(157, 'Hotel Fasano Angra dos Reis', 'Rodovia Rio-Santos, Angra dos Reis', 100, 5, 27),
(158, 'Pousada Picinguaba', 'Rodovia Rio-Santos, Ubatuba', 45, 5, 27),
(159, 'Hotel Fasano Belo Horizonte', 'Rua São Paulo 2320, Belo Horizonte', 130, 5, 27),
(160, 'Pousada do Caparaó', 'Alto do Caparaó, MG', 55, 5, 27),
(161, 'Burj Al Arab Jumeirah', 'Jumeirah St, Dubai, Emirados Árabes', 200, 5, 56),
(162, 'Marina Bay Sands', '10 Bayfront Ave, Singapore', 500, 5, 166),
(163, 'The Savoy London', 'Strand, London', 300, 5, 146),
(164, 'Mandarin Oriental Tokyo', '2-1-1 Nihonbashi Muromachi, Tokyo', 250, 5, 95),
(165, 'The Fullerton Bay Hotel Singapore', '80 Collyer Quay, Singapore', 180, 5, 166),
(166, 'Shangri-La Hotel Paris', '10 Av. d\'Iéna, Paris', 200, 5, 69),
(167, 'The Oberoi Udaivilas Udaipur', 'Haridasji Ki Magri, Udaipur', 150, 5, 86),
(168, 'Aman Tokyo', 'The Otemachi Tower, Tokyo', 180, 5, 95),
(169, 'The Ritz London', '150 Piccadilly, London', 230, 5, 146),
(170, 'Four Seasons Hotel Istanbul', 'Çırağan Cad. No:28, Istanbul', 170, 5, 186),
(171, 'The Peninsula Hong Kong', 'Salisbury Rd, Hong Kong', 300, 5, 41),
(172, 'Taj Lake Palace Udaipur', 'Pichola, Udaipur', 100, 5, 86),
(173, 'The Siam Bangkok', '3/2 Thanon Khao, Bangkok', 60, 5, 176),
(174, 'Belmond Hotel Caruso', 'Piazza San Giovanni del Toro 2, Ravello', 70, 5, 93),
(175, 'One&Only Cape Town', 'Dock Rd, Victoria & Alfred Waterfront, Cape Town', 150, 5, 2),
(176, 'Amangiri Utah', '1 Kayenta Rd, Canyon Point', 50, 5, 63),
(177, 'Singita Boulders Lodge', 'Sabi Sand Game Reserve, Sabi Sand', 30, 5, 2),
(178, 'The Datai Langkawi', 'Jln Teluk Datai, Langkawi', 120, 5, 109),
(179, 'Soneva Fushi Maldives', 'Kunfunadhoo Island, Baa Atoll', 100, 5, 111),
(180, 'Cheval Blanc Randheli', 'Randheli Island, Noonu Atoll', 90, 5, 111),
(181, 'Four Seasons Resort Bora Bora', 'Motu Tehotu, Bora Bora', 120, 5, 73),
(182, 'Amanpulo Philippines', 'Pamalican Island, Cuyo Archipelago', 80, 5, 67),
(183, 'Saffire Freycinet Tasmania', '2352 Coles Bay Rd, Coles Bay', 40, 5, 12),
(184, 'Tierra Patagonia Hotel', 'Ruta Y-150, Torres del Paine', 60, 5, 40),
(185, 'Singita Grumeti Tanzania', 'Grumeti Reserves, Serengeti', 45, 5, 179),
(186, 'North Island Seychelles', 'North Island, Seychelles', 20, 5, 162),
(187, 'Royal Mansour Marrakech', 'Rue Abou Abbas El Sebti, Marrakech', 70, 5, 114),
(188, 'Amanyara Turks and Caicos', 'Providenciales, Turks and Caicos', 50, 5, 15),
(189, 'Six Senses Zil Pasyon Seychelles', 'Felicite Island, Seychelles', 60, 5, 162),
(190, 'Nayara Tented Camp Costa Rica', 'Arenal Volcano National Park, La Fortuna', 30, 5, 49),
(191, 'Four Seasons Tented Camp Golden Triangle', 'Chiang Saen, Chiang Rai', 30, 5, 176),
(192, 'Aman Venice', 'Palazzo Papadopoli, Venice', 50, 5, 93),
(193, 'Belmond Hotel Monasterio Cusco', 'Calle Palacio 136, Cusco', 120, 5, 140),
(194, 'The Oberoi Amarvilas Agra', 'Taj East Gate Rd, Agra', 100, 5, 86),
(195, 'Taj Falaknuma Palace Hyderabad', 'Engine Bowli, Hyderabad', 120, 5, 86),
(196, 'The Chedi Muscat', 'North Ghubra 32, Muscat', 150, 5, 133),
(197, 'Alila Jabal Akhdar Oman', 'Al Jabal Al Akhdar, Nizwa', 80, 5, 133),
(198, 'Anantara Chiang Mai Resort', '123-123/1 Charoen Prathet Rd, Chiang Mai', 90, 5, 176),
(199, 'The Ritz-Carlton Kyoto', 'Kamogawa Nijo-Ohashi Hotori, Kyoto', 120, 5, 95),
(200, 'Amanemu Japan', '2165 Hazako Hamajima-cho, Shima', 40, 5, 95),
(201, 'The Mulia Bali', 'Jl. Raya Nusa Dua Selatan, Bali', 300, 5, 87),
(202, 'Capella Singapore', '1 The Knolls, Sentosa Island', 120, 5, 166),
(203, 'The St. Regis Bali Resort', 'Kawasan Pariwisata, Nusa Dua', 200, 5, 87),
(204, 'Four Seasons Resort Bali at Sayan', 'Sayan, Ubud', 80, 5, 87),
(205, 'COMO Uma Ubud Bali', 'Jl. Raya Sanggingan, Ubud', 60, 5, 87),
(206, 'The Legian Bali', 'Jl. Kayu Aya, Seminyak', 100, 5, 87),
(207, 'Aman New Delhi', 'Lodhi Rd, New Delhi', 80, 5, 86),
(208, 'The Leela Palace New Delhi', 'Diplomatic Enclave, New Delhi', 200, 5, 86),
(209, 'Raffles Singapore', '1 Beach Rd, Singapore', 150, 5, 166),
(210, 'The Fullerton Hotel Singapore', '1 Fullerton Square, Singapore', 250, 5, 166);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Lugar`
--

CREATE TABLE `Lugar` (
  `Id` int NOT NULL,
  `Id_Viagem` int NOT NULL,
  `Lugar` varchar(255) NOT NULL,
  `Id_Disponivel` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Lugar`
--

INSERT INTO `Lugar` (`Id`, `Id_Viagem`, `Lugar`, `Id_Disponivel`) VALUES
(1, 3, 'H3', 1),
(2, 4, 'l2', 1),
(3, 5, 'A1', 1),
(4, 5, 'A2', 1),
(5, 5, 'A3', 2),
(6, 6, 'B1', 1),
(7, 6, 'B2', 2),
(8, 6, 'B3', 1),
(9, 7, 'C1', 1),
(10, 7, 'C2', 1),
(11, 7, 'C3', 2),
(12, 8, 'D1', 1),
(13, 8, 'D2', 1),
(14, 8, 'D3', 1),
(15, 9, 'E1', 2),
(16, 9, 'E2', 1),
(17, 9, 'E3', 1),
(18, 10, 'F1', 1),
(19, 10, 'F2', 2),
(20, 10, 'F3', 2),
(21, 11, 'G1', 1),
(22, 11, 'G2', 1),
(23, 11, 'G3', 1),
(24, 12, 'H1', 2),
(25, 12, 'H2', 2),
(26, 12, 'H3', 1),
(27, 13, 'I1', 1),
(28, 13, 'I2', 1),
(29, 13, 'I3', 2),
(30, 14, 'J1', 1),
(31, 14, 'J2', 2),
(32, 14, 'J3', 1),
(33, 15, 'K1', 1),
(34, 15, 'K2', 1),
(35, 15, 'K3', 1),
(36, 16, 'L1', 2),
(37, 16, 'L2', 1),
(38, 16, 'L3', 1),
(39, 17, 'M1', 2),
(40, 17, 'M2', 1),
(41, 17, 'M3', 2),
(42, 18, 'N1', 1),
(43, 18, 'N2', 1),
(44, 18, 'N3', 1),
(45, 19, 'O1', 2),
(46, 19, 'O2', 1),
(47, 19, 'O3', 1),
(48, 20, 'P1', 1),
(49, 20, 'P2', 1),
(50, 20, 'P3', 2),
(51, 21, 'Q1', 1),
(52, 21, 'Q2', 2),
(53, 21, 'Q3', 1),
(54, 22, 'R1', 2),
(55, 22, 'R2', 1),
(56, 22, 'R3', 1),
(57, 23, 'S1', 1),
(58, 23, 'S2', 2),
(59, 23, 'S3', 2),
(60, 24, 'T1', 1),
(61, 24, 'T2', 1),
(62, 24, 'T3', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Pagamento`
--

CREATE TABLE `Pagamento` (
  `Id` int NOT NULL,
  `Id_Bilhete` int NOT NULL,
  `Preco` float(7,2) NOT NULL,
  `Data_Pagamento` datetime DEFAULT NULL,
  `Id_Estado_Pagamento` int NOT NULL,
  `Id_Tipo_Pagamento` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Pagamento`
--

INSERT INTO `Pagamento` (`Id`, `Id_Bilhete`, `Preco`, `Data_Pagamento`, `Id_Estado_Pagamento`, `Id_Tipo_Pagamento`) VALUES
(1, 1, 3976.56, '2025-04-25 22:00:00', 2, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Pais`
--

CREATE TABLE `Pais` (
  `Id` int NOT NULL,
  `Nome_Pais` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Pais`
--

INSERT INTO `Pais` (`Id`, `Nome_Pais`) VALUES
(1, 'Afeganistão'),
(2, 'África do Sul'),
(3, 'Albânia'),
(4, 'Alemanha'),
(5, 'Andorra'),
(6, 'Angola'),
(7, 'Antiga e Barbuda'),
(8, 'Arábia Saudita'),
(9, 'Argélia'),
(10, 'Argentina'),
(11, 'Arménia'),
(12, 'Austrália'),
(13, 'Áustria'),
(14, 'Azerbaijão'),
(15, 'Bahamas'),
(16, 'Bangladexe'),
(17, 'Barbados'),
(18, 'Barém'),
(19, 'Bélgica'),
(20, 'Belize'),
(21, 'Benim'),
(22, 'Bielorrússia'),
(23, 'Birmânia'),
(24, 'Bolívia'),
(25, 'Bósnia e Herzegovina'),
(26, 'Botsuana'),
(27, 'Brasil'),
(28, 'Brunei'),
(29, 'Bulgária'),
(30, 'Burquina Faso'),
(31, 'Burúndi'),
(32, 'Butão'),
(33, 'Cabo Verde'),
(34, 'Camarões'),
(35, 'Camboja'),
(36, 'Canadá'),
(37, 'Catar'),
(38, 'Cazaquistão'),
(39, 'Chade'),
(40, 'Chile'),
(41, 'China'),
(42, 'Chipre'),
(43, 'Colômbia'),
(44, 'Comores'),
(45, 'Coreia do Norte'),
(46, 'Coreia do Sul'),
(47, 'Cosovo'),
(48, 'Costa do Marfim'),
(49, 'Costa Rica'),
(50, 'Croácia'),
(51, 'Cuaite'),
(52, 'Cuba'),
(53, 'Dinamarca'),
(54, 'Dominica'),
(55, 'Egito'),
(56, 'Emirados Árabes Unidos'),
(57, 'Equador'),
(58, 'Eritreia'),
(59, 'Eslováquia'),
(60, 'Eslovénia'),
(61, 'Espanha'),
(62, 'Estado da Palestina'),
(63, 'Estados Unidos'),
(64, 'Estónia'),
(65, 'Etiópia'),
(66, 'Fiji'),
(67, 'Filipinas'),
(68, 'Finlândia'),
(69, 'França'),
(70, 'Gabão'),
(71, 'Gâmbia'),
(72, 'Gana'),
(73, 'Geórgia'),
(74, 'Granada'),
(75, 'Grécia'),
(76, 'Guatemala'),
(77, 'Guiana'),
(78, 'Guiné'),
(79, 'Guiné Equatorial'),
(80, 'Guiné-Bissau'),
(81, 'Haiti'),
(82, 'Honduras'),
(83, 'Hungria'),
(84, 'Iémen'),
(85, 'Ilhas Marechal'),
(86, 'Índia'),
(87, 'Indonésia'),
(88, 'Irão'),
(89, 'Iraque'),
(90, 'Irlanda'),
(91, 'Islândia'),
(92, 'Israel'),
(93, 'Itália'),
(94, 'Jamaica'),
(95, 'Japão'),
(96, 'Jibuti'),
(97, 'Jordânia'),
(98, 'Laus'),
(99, 'Lesoto'),
(100, 'Letónia'),
(101, 'Líbano'),
(102, 'Libéria'),
(103, 'Líbia'),
(104, 'Listenstaine'),
(105, 'Lituânia'),
(106, 'Luxemburgo'),
(107, 'Macedónia do Norte'),
(108, 'Madagáscar'),
(109, 'Malásia'),
(110, 'Maláui'),
(111, 'Maldivas'),
(112, 'Mali'),
(113, 'Malta'),
(114, 'Marrocos'),
(115, 'Maurícia'),
(116, 'Mauritânia'),
(117, 'México'),
(118, 'Mianmar'),
(119, 'Micronésia'),
(120, 'Moçambique'),
(121, 'Moldávia'),
(122, 'Mónaco'),
(123, 'Mongólia'),
(124, 'Montenegro'),
(125, 'Namíbia'),
(126, 'Nauru'),
(127, 'Nepal'),
(128, 'Nicarágua'),
(129, 'Níger'),
(130, 'Nigéria'),
(131, 'Noruega'),
(132, 'Nova Zelândia'),
(133, 'Omã'),
(134, 'Países Baixos'),
(135, 'Palau'),
(136, 'Panamá'),
(137, 'Papua Nova Guiné'),
(138, 'Paquistão'),
(139, 'Paraguai'),
(140, 'Peru'),
(141, 'Polónia'),
(142, 'Portugal'),
(143, 'Quénia'),
(144, 'Quirguistão'),
(145, 'Quiribáti'),
(146, 'Reino Unido'),
(147, 'República Centro-Africana'),
(148, 'República Checa'),
(149, 'República Democrática do Congo'),
(150, 'República Dominicana'),
(151, 'Roménia'),
(152, 'Ruanda'),
(153, 'Rússia'),
(154, 'Salomão'),
(155, 'Salvador'),
(156, 'Samoa'),
(157, 'Santa Lúcia'),
(158, 'São Cristóvão e Neves'),
(159, 'São Marinho'),
(160, 'São Tomé e Príncipe'),
(161, 'São Vicente e Granadinas'),
(162, 'Seicheles'),
(163, 'Senegal'),
(164, 'Serra Leoa'),
(165, 'Sérvia'),
(166, 'Singapura'),
(167, 'Síria'),
(168, 'Somália'),
(169, 'Sri Lanca'),
(170, 'Suazilândia'),
(171, 'Sudão'),
(172, 'Sudão do Sul'),
(173, 'Suécia'),
(174, 'Suíça'),
(175, 'Suriname'),
(176, 'Tailândia'),
(177, 'Taiuão'),
(178, 'Tajiquistão'),
(179, 'Tanzânia'),
(180, 'Timor-Leste'),
(181, 'Togo'),
(182, 'Tonga'),
(183, 'Trindade e Tobago'),
(184, 'Tunísia'),
(185, 'Turcomenistão'),
(186, 'Turquia'),
(187, 'Tuvalu'),
(188, 'Ucrânia'),
(189, 'Uganda'),
(190, 'Uruguai'),
(191, 'Usbequistão'),
(192, 'Vanuatu'),
(193, 'Vaticano'),
(194, 'Venezuela'),
(195, 'Vietname'),
(196, 'Zâmbia'),
(197, 'Zimbábué');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Quarto`
--

CREATE TABLE `Quarto` (
  `Id` int NOT NULL,
  `Id_Hotel` int NOT NULL,
  `Numero_Quarto` int NOT NULL,
  `Id_Tipo_Quarto` int NOT NULL,
  `Preco` float(5,2) NOT NULL,
  `Id_Disponivel` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Quarto`
--

INSERT INTO `Quarto` (`Id`, `Id_Hotel`, `Numero_Quarto`, `Id_Tipo_Quarto`, `Preco`, `Id_Disponivel`) VALUES
(1, 1, 101, 1, 120.00, 1),
(2, 1, 102, 2, 180.00, 1),
(3, 1, 103, 1, 110.00, 1),
(4, 1, 104, 2, 170.00, 1),
(5, 1, 105, 2, 200.00, 1),
(6, 1, 201, 1, 125.00, 1),
(7, 1, 202, 2, 185.00, 1),
(8, 1, 203, 2, 210.00, 1),
(9, 1, 204, 1, 115.00, 1),
(10, 1, 205, 2, 190.00, 1),
(11, 2, 101, 1, 130.00, 1),
(12, 2, 102, 2, 190.00, 1),
(13, 2, 103, 2, 210.00, 1),
(14, 2, 104, 1, 140.00, 1),
(15, 2, 105, 2, 220.00, 1),
(16, 2, 201, 1, 135.00, 1),
(17, 2, 202, 2, 200.00, 1),
(18, 2, 203, 1, 145.00, 1),
(19, 2, 204, 2, 230.00, 1),
(20, 2, 205, 2, 240.00, 1),
(21, 4, 101, 1, 150.00, 1),
(22, 4, 102, 2, 250.00, 1),
(23, 4, 103, 2, 280.00, 1),
(24, 4, 104, 1, 160.00, 1),
(25, 4, 105, 2, 300.00, 1),
(26, 4, 201, 1, 155.00, 1),
(27, 4, 202, 2, 260.00, 1),
(28, 4, 203, 1, 165.00, 1),
(29, 4, 204, 2, 290.00, 1),
(30, 4, 205, 2, 310.00, 1),
(31, 5, 101, 1, 200.00, 1),
(32, 5, 102, 2, 350.00, 1),
(33, 5, 103, 2, 400.00, 1),
(34, 5, 104, 1, 220.00, 1),
(35, 5, 105, 2, 450.00, 1),
(36, 5, 201, 1, 210.00, 1),
(37, 5, 202, 2, 360.00, 1),
(38, 5, 203, 1, 230.00, 1),
(39, 5, 204, 2, 420.00, 1),
(40, 5, 205, 2, 470.00, 1),
(41, 7, 101, 1, 180.00, 1),
(42, 7, 102, 2, 280.00, 1),
(43, 7, 103, 1, 190.00, 1),
(44, 7, 104, 2, 300.00, 1),
(45, 7, 105, 2, 320.00, 1),
(46, 7, 201, 1, 185.00, 1),
(47, 7, 202, 2, 290.00, 1),
(48, 7, 203, 1, 195.00, 1),
(49, 7, 204, 2, 310.00, 1),
(50, 7, 205, 2, 330.00, 1),
(51, 31, 101, 1, 250.00, 1),
(52, 31, 102, 2, 400.00, 1),
(53, 31, 103, 1, 260.00, 1),
(54, 31, 104, 2, 420.00, 1),
(55, 31, 105, 2, 450.00, 1),
(56, 31, 201, 1, 270.00, 1),
(57, 31, 202, 2, 410.00, 1),
(58, 31, 203, 1, 280.00, 1),
(59, 31, 204, 2, 430.00, 1),
(60, 31, 205, 2, 460.00, 1),
(61, 32, 101, 1, 300.00, 1),
(62, 32, 102, 2, 500.00, 1),
(63, 32, 103, 1, 320.00, 1),
(64, 32, 104, 2, 520.00, 1),
(65, 32, 105, 2, 550.00, 1),
(66, 32, 201, 1, 310.00, 1),
(67, 32, 202, 2, 510.00, 1),
(68, 32, 203, 1, 330.00, 1),
(69, 32, 204, 2, 530.00, 1),
(70, 32, 205, 2, 560.00, 1),
(71, 61, 101, 1, 400.00, 1),
(72, 61, 102, 2, 700.00, 1),
(73, 61, 103, 1, 420.00, 1),
(74, 61, 104, 2, 720.00, 1),
(75, 61, 105, 2, 750.00, 1),
(76, 61, 201, 1, 410.00, 1),
(77, 61, 202, 2, 710.00, 1),
(78, 61, 203, 1, 430.00, 1),
(79, 61, 204, 2, 730.00, 1),
(80, 61, 205, 2, 760.00, 1),
(81, 86, 101, 1, 350.00, 1),
(82, 86, 102, 2, 600.00, 1),
(83, 86, 103, 1, 370.00, 1),
(84, 86, 104, 2, 620.00, 1),
(85, 86, 105, 2, 650.00, 1),
(86, 86, 201, 1, 360.00, 1),
(87, 86, 202, 2, 610.00, 1),
(88, 86, 203, 1, 380.00, 1),
(89, 86, 204, 2, 630.00, 1),
(90, 86, 205, 2, 660.00, 1),
(91, 111, 101, 1, 500.00, 1),
(92, 111, 102, 2, 900.00, 1),
(93, 111, 103, 1, 520.00, 1),
(94, 111, 104, 2, 920.00, 1),
(95, 111, 105, 2, 950.00, 1),
(96, 111, 201, 1, 510.00, 1),
(97, 111, 202, 2, 910.00, 1),
(98, 111, 203, 1, 530.00, 1),
(99, 111, 204, 2, 930.00, 1),
(100, 111, 205, 2, 960.00, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Resposta_Ticket`
--

CREATE TABLE `Resposta_Ticket` (
  `Id` int NOT NULL,
  `Id_Ticket` int DEFAULT NULL,
  `Id_Utilizador` int DEFAULT NULL,
  `Mensagem` text,
  `Data_Resposta` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Resposta_Ticket`
--

INSERT INTO `Resposta_Ticket` (`Id`, `Id_Ticket`, `Id_Utilizador`, `Mensagem`, `Data_Resposta`) VALUES
(1, 1, 1, 'Olá,\r\nNão consigo entrar na conta pq n paguei a conta da Vodafone\r\nObrigado', '2025-04-16 00:42:24'),
(2, 1, 2, 'Olá,\r\nJá tentaste vender fotos de pés para pagar a eles?\r\nObrigado e boa tarde', '2025-04-16 00:43:51');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Ticket`
--

CREATE TABLE `Ticket` (
  `Id` int NOT NULL,
  `Id_Utilizador` int DEFAULT NULL,
  `Assunto` varchar(150) DEFAULT NULL,
  `Data_Criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `Id_Estado` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Ticket`
--

INSERT INTO `Ticket` (`Id`, `Id_Utilizador`, `Assunto`, `Data_Criacao`, `Id_Estado`) VALUES
(1, 1, 'Problema de Login', '2025-04-16 00:41:47', 6);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Tipo_Pagamento`
--

CREATE TABLE `Tipo_Pagamento` (
  `Id` int NOT NULL,
  `TIpo_Pagamento` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Tipo_Pagamento`
--

INSERT INTO `Tipo_Pagamento` (`Id`, `TIpo_Pagamento`) VALUES
(1, 'MBWay'),
(2, 'Referência Multibanco'),
(3, 'Stripe');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Tipo_Quarto`
--

CREATE TABLE `Tipo_Quarto` (
  `Id` int NOT NULL,
  `Nome_Tipo_Quarto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Tipo_Quarto`
--

INSERT INTO `Tipo_Quarto` (`Id`, `Nome_Tipo_Quarto`) VALUES
(1, 'Solteiro'),
(2, 'Duplo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Tipo_Utilizador`
--

CREATE TABLE `Tipo_Utilizador` (
  `Id` int NOT NULL,
  `Nome_Tipo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Tipo_Utilizador`
--

INSERT INTO `Tipo_Utilizador` (`Id`, `Nome_Tipo`) VALUES
(1, 'Administrador'),
(2, 'Cliente');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Utilizador`
--

CREATE TABLE `Utilizador` (
  `Id` int NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Telemovel` int NOT NULL,
  `Palavra_passe` text NOT NULL,
  `Id_Pais` int NOT NULL,
  `Id_Tipo_Utilizador` int NOT NULL,
  `Ativo_2FA` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Utilizador`
--

INSERT INTO `Utilizador` (`Id`, `Nome`, `Email`, `Telemovel`, `Palavra_passe`, `Id_Pais`, `Id_Tipo_Utilizador`, `Ativo_2FA`) VALUES
(1, 'Henrique Malzaver', 'henriquemalzaver@ua.pt', 987654321, 'cheiroaleite123!', 142, 2, 0),
(2, 'Developer', 'developer@flyeasy.pt', 987879678, 'algumacoisa', 142, 1, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Viagem`
--

CREATE TABLE `Viagem` (
  `Id` int NOT NULL,
  `Id_Aeroporto_Origem` int NOT NULL,
  `Id_Aeroporto_Destino` int NOT NULL,
  `Id_Companhia_Aerea` int NOT NULL,
  `Data_Partida` datetime DEFAULT NULL,
  `Data_Chegada` datetime DEFAULT NULL,
  `Preco` float(7,2) NOT NULL,
  `Lotacao` int NOT NULL,
  `Id_Classe` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `Viagem`
--

INSERT INTO `Viagem` (`Id`, `Id_Aeroporto_Origem`, `Id_Aeroporto_Destino`, `Id_Companhia_Aerea`, `Data_Partida`, `Data_Chegada`, `Preco`, `Lotacao`, `Id_Classe`) VALUES
(3, 1, 6, 1, '2024-05-24 06:00:00', '2025-05-24 07:15:00', 198.80, 150, 1),
(4, 6, 1, 1, '2025-08-20 15:00:00', '2025-08-20 16:15:00', 198.60, 150, 1),
(5, 1, 2, 1, '2025-07-01 06:00:00', '2025-07-01 08:30:00', 320.00, 180, 1),
(6, 2, 3, 2, '2025-07-03 09:15:00', '2025-07-03 11:45:00', 450.00, 160, 2),
(7, 3, 4, 3, '2025-07-05 13:00:00', '2025-07-05 16:30:00', 700.00, 200, 3),
(8, 4, 5, 4, '2025-07-07 17:45:00', '2025-07-07 21:00:00', 820.00, 190, 1),
(9, 5, 1, 5, '2025-07-10 07:00:00', '2025-07-10 09:15:00', 300.00, 150, 4),
(10, 1, 3, 2, '2025-08-02 10:00:00', '2025-08-02 13:20:00', 560.00, 180, 2),
(11, 2, 4, 1, '2025-08-04 14:00:00', '2025-08-04 17:45:00', 610.00, 170, 3),
(12, 3, 5, 3, '2025-08-06 18:30:00', '2025-08-06 21:00:00', 480.00, 160, 1),
(13, 4, 1, 4, '2025-08-08 05:45:00', '2025-08-08 08:15:00', 400.00, 190, 2),
(14, 5, 2, 5, '2025-08-10 09:30:00', '2025-08-10 11:50:00', 350.00, 140, 4),
(15, 1, 4, 3, '2025-08-12 12:45:00', '2025-08-12 16:10:00', 720.00, 200, 3),
(16, 2, 5, 2, '2025-08-14 17:00:00', '2025-08-14 20:30:00', 810.00, 185, 2),
(17, 3, 1, 1, '2025-08-16 06:30:00', '2025-08-16 09:15:00', 330.00, 180, 1),
(18, 4, 2, 4, '2025-08-18 10:00:00', '2025-08-18 13:00:00', 500.00, 175, 2),
(19, 5, 3, 5, '2025-08-20 14:15:00', '2025-08-20 17:00:00', 610.00, 160, 4),
(20, 1, 5, 2, '2025-09-01 18:30:00', '2025-09-01 21:45:00', 890.00, 180, 3),
(21, 2, 1, 3, '2025-09-03 07:00:00', '2025-09-03 09:30:00', 400.00, 150, 2),
(22, 3, 2, 4, '2025-09-05 10:15:00', '2025-09-05 13:30:00', 610.00, 170, 1),
(23, 4, 3, 5, '2025-09-07 14:00:00', '2025-09-07 17:00:00', 730.00, 190, 4),
(24, 5, 4, 1, '2025-09-09 18:45:00', '2025-09-09 21:15:00', 540.00, 180, 3),
(25, 1, 2, 2, '2025-09-11 06:30:00', '2025-09-11 08:45:00', 310.00, 160, 1),
(26, 2, 3, 3, '2025-09-13 09:00:00', '2025-09-13 11:50:00', 470.00, 150, 2),
(27, 3, 4, 4, '2025-09-15 12:30:00', '2025-09-15 15:45:00', 690.00, 190, 3),
(28, 4, 5, 5, '2025-09-17 16:00:00', '2025-09-17 18:50:00', 820.00, 200, 4),
(29, 5, 1, 1, '2025-09-19 19:30:00', '2025-09-19 22:00:00', 390.00, 170, 2),
(30, 1, 3, 4, '2025-10-01 07:00:00', '2025-10-01 10:00:00', 520.00, 180, 1),
(31, 2, 4, 2, '2025-10-03 11:00:00', '2025-10-03 14:20:00', 680.00, 190, 3),
(32, 3, 5, 3, '2025-10-05 15:30:00', '2025-10-05 18:45:00', 590.00, 150, 2),
(33, 4, 1, 5, '2025-10-07 19:00:00', '2025-10-07 22:15:00', 810.00, 200, 4),
(34, 5, 2, 1, '2025-10-09 06:15:00', '2025-10-09 08:30:00', 330.00, 180, 1),
(35, 1, 4, 2, '2025-10-11 09:45:00', '2025-10-11 13:00:00', 580.00, 170, 2),
(36, 2, 5, 3, '2025-10-13 14:00:00', '2025-10-13 17:15:00', 720.00, 160, 3),
(37, 3, 1, 4, '2025-10-15 18:30:00', '2025-10-15 21:45:00', 890.00, 190, 4),
(38, 4, 2, 5, '2025-11-01 07:00:00', '2025-11-01 09:30:00', 400.00, 150, 2),
(39, 5, 3, 1, '2025-11-03 10:30:00', '2025-11-03 13:45:00', 690.00, 180, 1),
(40, 1, 5, 2, '2025-11-05 14:15:00', '2025-11-05 17:30:00', 740.00, 200, 3),
(41, 2, 1, 3, '2025-11-07 18:00:00', '2025-11-07 20:50:00', 500.00, 170, 4),
(42, 3, 2, 4, '2025-11-09 06:00:00', '2025-11-09 08:45:00', 310.00, 160, 1),
(43, 4, 3, 5, '2025-11-11 09:30:00', '2025-11-11 12:15:00', 570.00, 180, 2),
(44, 5, 4, 1, '2025-11-13 13:00:00', '2025-11-13 15:30:00', 630.00, 200, 3),
(45, 1, 2, 2, '2025-11-15 16:15:00', '2025-11-15 18:45:00', 820.00, 190, 4),
(46, 2, 3, 3, '2025-12-01 07:00:00', '2025-12-01 09:25:00', 350.00, 170, 1),
(47, 3, 4, 4, '2025-12-03 10:00:00', '2025-12-03 13:00:00', 690.00, 150, 2),
(48, 4, 5, 5, '2025-12-05 14:00:00', '2025-12-05 17:15:00', 710.00, 180, 3),
(49, 5, 1, 1, '2025-12-07 18:30:00', '2025-12-07 21:30:00', 880.00, 200, 4),
(50, 1, 3, 2, '2025-12-09 06:45:00', '2025-12-09 10:00:00', 500.00, 190, 2),
(51, 2, 4, 3, '2025-12-11 11:30:00', '2025-12-11 14:45:00', 610.00, 160, 1),
(52, 3, 5, 4, '2025-12-13 15:30:00', '2025-12-13 18:30:00', 770.00, 180, 3),
(53, 4, 1, 5, '2025-12-15 19:15:00', '2025-12-15 22:30:00', 900.00, 170, 4);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `Aeroporto`
--
ALTER TABLE `Aeroporto`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Pais` (`Id_Pais`);

--
-- Índices para tabela `Bilhete`
--
ALTER TABLE `Bilhete`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Utilizador` (`Id_Utilizador`);

--
-- Índices para tabela `Bilhete_Lugar`
--
ALTER TABLE `Bilhete_Lugar`
  ADD KEY `Id_Bilhete` (`Id_Bilhete`),
  ADD KEY `Id_Lugar` (`Id_Lugar`);

--
-- Índices para tabela `Bilhete_Quarto`
--
ALTER TABLE `Bilhete_Quarto`
  ADD KEY `Id_Bilhete` (`Id_Bilhete`),
  ADD KEY `Id_Quarto` (`Id_Quarto`);

--
-- Índices para tabela `Classe`
--
ALTER TABLE `Classe`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `Companhia_Aerea`
--
ALTER TABLE `Companhia_Aerea`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `Disponibilidade`
--
ALTER TABLE `Disponibilidade`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `Estado`
--
ALTER TABLE `Estado`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `Hotel`
--
ALTER TABLE `Hotel`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Pais` (`Id_Pais`);

--
-- Índices para tabela `Lugar`
--
ALTER TABLE `Lugar`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Viagem` (`Id_Viagem`),
  ADD KEY `Id_Disponivel` (`Id_Disponivel`);

--
-- Índices para tabela `Pagamento`
--
ALTER TABLE `Pagamento`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Bilhete` (`Id_Bilhete`),
  ADD KEY `Id_Estado_Pagamento` (`Id_Estado_Pagamento`),
  ADD KEY `Id_Tipo_Pagamento` (`Id_Tipo_Pagamento`);

--
-- Índices para tabela `Pais`
--
ALTER TABLE `Pais`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `Quarto`
--
ALTER TABLE `Quarto`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Hotel` (`Id_Hotel`),
  ADD KEY `Id_Tipo_Quarto` (`Id_Tipo_Quarto`),
  ADD KEY `Id_Disponivel` (`Id_Disponivel`);

--
-- Índices para tabela `Resposta_Ticket`
--
ALTER TABLE `Resposta_Ticket`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Ticket` (`Id_Ticket`),
  ADD KEY `Id_Utilizador` (`Id_Utilizador`);

--
-- Índices para tabela `Ticket`
--
ALTER TABLE `Ticket`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Utilizador` (`Id_Utilizador`),
  ADD KEY `Id_Estado` (`Id_Estado`);

--
-- Índices para tabela `Tipo_Pagamento`
--
ALTER TABLE `Tipo_Pagamento`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `Tipo_Quarto`
--
ALTER TABLE `Tipo_Quarto`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `Tipo_Utilizador`
--
ALTER TABLE `Tipo_Utilizador`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `Utilizador`
--
ALTER TABLE `Utilizador`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Tipo_Utilizador` (`Id_Tipo_Utilizador`),
  ADD KEY `Id_Pais` (`Id_Pais`);

--
-- Índices para tabela `Viagem`
--
ALTER TABLE `Viagem`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Classe` (`Id_Classe`),
  ADD KEY `Id_Aeroporto_Origem` (`Id_Aeroporto_Origem`),
  ADD KEY `Id_Aeroporto_Destino` (`Id_Aeroporto_Destino`),
  ADD KEY `fk_bilhete_companhia` (`Id_Companhia_Aerea`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Aeroporto`
--
ALTER TABLE `Aeroporto`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `Bilhete`
--
ALTER TABLE `Bilhete`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `Classe`
--
ALTER TABLE `Classe`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `Companhia_Aerea`
--
ALTER TABLE `Companhia_Aerea`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `Disponibilidade`
--
ALTER TABLE `Disponibilidade`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `Estado`
--
ALTER TABLE `Estado`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `Hotel`
--
ALTER TABLE `Hotel`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT de tabela `Lugar`
--
ALTER TABLE `Lugar`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de tabela `Pagamento`
--
ALTER TABLE `Pagamento`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `Pais`
--
ALTER TABLE `Pais`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;

--
-- AUTO_INCREMENT de tabela `Quarto`
--
ALTER TABLE `Quarto`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de tabela `Resposta_Ticket`
--
ALTER TABLE `Resposta_Ticket`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `Ticket`
--
ALTER TABLE `Ticket`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `Tipo_Pagamento`
--
ALTER TABLE `Tipo_Pagamento`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `Tipo_Quarto`
--
ALTER TABLE `Tipo_Quarto`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `Utilizador`
--
ALTER TABLE `Utilizador`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `Viagem`
--
ALTER TABLE `Viagem`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `Aeroporto`
--
ALTER TABLE `Aeroporto`
  ADD CONSTRAINT `Aeroporto_ibfk_1` FOREIGN KEY (`Id_Pais`) REFERENCES `Pais` (`Id`);

--
-- Limitadores para a tabela `Bilhete`
--
ALTER TABLE `Bilhete`
  ADD CONSTRAINT `Bilhete_ibfk_1` FOREIGN KEY (`Id_Utilizador`) REFERENCES `Utilizador` (`Id`);

--
-- Limitadores para a tabela `Bilhete_Lugar`
--
ALTER TABLE `Bilhete_Lugar`
  ADD CONSTRAINT `Bilhete_Viagem_ibfk_1` FOREIGN KEY (`Id_Bilhete`) REFERENCES `Bilhete` (`Id`),
  ADD CONSTRAINT `Bilhete_Viagem_ibfk_2` FOREIGN KEY (`Id_Lugar`) REFERENCES `Lugar` (`Id`);

--
-- Limitadores para a tabela `Bilhete_Quarto`
--
ALTER TABLE `Bilhete_Quarto`
  ADD CONSTRAINT `Bilhete_Quarto_ibfk_1` FOREIGN KEY (`Id_Bilhete`) REFERENCES `Bilhete` (`Id`),
  ADD CONSTRAINT `Bilhete_Quarto_ibfk_2` FOREIGN KEY (`Id_Quarto`) REFERENCES `Quarto` (`Id`);

--
-- Limitadores para a tabela `Hotel`
--
ALTER TABLE `Hotel`
  ADD CONSTRAINT `Hotel_ibfk_1` FOREIGN KEY (`Id_Pais`) REFERENCES `Pais` (`Id`);

--
-- Limitadores para a tabela `Lugar`
--
ALTER TABLE `Lugar`
  ADD CONSTRAINT `Lugar_ibfk_1` FOREIGN KEY (`Id_Viagem`) REFERENCES `Viagem` (`Id`),
  ADD CONSTRAINT `Lugar_ibfk_2` FOREIGN KEY (`Id_Disponivel`) REFERENCES `Disponibilidade` (`Id`);

--
-- Limitadores para a tabela `Pagamento`
--
ALTER TABLE `Pagamento`
  ADD CONSTRAINT `Pagamento_ibfk_1` FOREIGN KEY (`Id_Bilhete`) REFERENCES `Bilhete` (`Id`),
  ADD CONSTRAINT `Pagamento_ibfk_2` FOREIGN KEY (`Id_Estado_Pagamento`) REFERENCES `Estado` (`Id`),
  ADD CONSTRAINT `Pagamento_ibfk_3` FOREIGN KEY (`Id_Tipo_Pagamento`) REFERENCES `Tipo_Pagamento` (`Id`);

--
-- Limitadores para a tabela `Quarto`
--
ALTER TABLE `Quarto`
  ADD CONSTRAINT `Quarto_ibfk_1` FOREIGN KEY (`Id_Hotel`) REFERENCES `Hotel` (`Id`),
  ADD CONSTRAINT `Quarto_ibfk_2` FOREIGN KEY (`Id_Tipo_Quarto`) REFERENCES `Tipo_Quarto` (`Id`),
  ADD CONSTRAINT `Quarto_ibfk_3` FOREIGN KEY (`Id_Disponivel`) REFERENCES `Disponibilidade` (`Id`);

--
-- Limitadores para a tabela `Resposta_Ticket`
--
ALTER TABLE `Resposta_Ticket`
  ADD CONSTRAINT `Resposta_Ticket_ibfk_1` FOREIGN KEY (`Id_Ticket`) REFERENCES `Ticket` (`Id`),
  ADD CONSTRAINT `Resposta_Ticket_ibfk_2` FOREIGN KEY (`Id_Utilizador`) REFERENCES `Utilizador` (`Id`);

--
-- Limitadores para a tabela `Ticket`
--
ALTER TABLE `Ticket`
  ADD CONSTRAINT `Ticket_ibfk_1` FOREIGN KEY (`Id_Utilizador`) REFERENCES `Utilizador` (`Id`),
  ADD CONSTRAINT `Ticket_ibfk_2` FOREIGN KEY (`Id_Estado`) REFERENCES `Estado` (`Id`);

--
-- Limitadores para a tabela `Utilizador`
--
ALTER TABLE `Utilizador`
  ADD CONSTRAINT `Utilizador_ibfk_1` FOREIGN KEY (`Id_Tipo_Utilizador`) REFERENCES `Tipo_Utilizador` (`Id`),
  ADD CONSTRAINT `Utilizador_ibfk_2` FOREIGN KEY (`Id_Pais`) REFERENCES `Pais` (`Id`);

--
-- Limitadores para a tabela `Viagem`
--
ALTER TABLE `Viagem`
  ADD CONSTRAINT `fk_bilhete_companhia` FOREIGN KEY (`Id_Companhia_Aerea`) REFERENCES `Companhia_Aerea` (`Id`),
  ADD CONSTRAINT `Viagem_ibfk_1` FOREIGN KEY (`Id_Classe`) REFERENCES `Classe` (`Id`),
  ADD CONSTRAINT `Viagem_ibfk_2` FOREIGN KEY (`Id_Aeroporto_Origem`) REFERENCES `Aeroporto` (`Id`),
  ADD CONSTRAINT `Viagem_ibfk_3` FOREIGN KEY (`Id_Aeroporto_Destino`) REFERENCES `Aeroporto` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
