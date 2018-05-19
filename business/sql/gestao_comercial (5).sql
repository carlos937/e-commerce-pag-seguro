-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 08-Abr-2018 às 08:55
-- Versão do servidor: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestao_comercial`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `configuracoes`
--

CREATE TABLE `configuracoes` (
  `cepDeOrigem` int(10) NOT NULL,
  `id` int(11) NOT NULL,
  `limite_do_estoque` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `configuracoes`
--

INSERT INTO `configuracoes` (`cepDeOrigem`, `id`, `limite_do_estoque`) VALUES
(25010310, 1, 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `fornecedor`
--

CREATE TABLE `fornecedor` (
  `id` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `tel` varchar(15) DEFAULT NULL,
  `nome` varchar(15) DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  `cidade` varchar(15) DEFAULT NULL,
  `rua` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `fotosprod`
--

CREATE TABLE `fotosprod` (
  `id` int(11) NOT NULL,
  `nome_foto` varchar(100) NOT NULL,
  `id_produto` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `fotosprod`
--

INSERT INTO `fotosprod` (`id`, `nome_foto`, `id_produto`) VALUES
(19, 'D08944FF-563F-439F-82AB-31EC7CD0C9A9.jpg', 106),
(20, '97B638ED-DDD8-4021-88CD-991387ED6DE9.jpg', 106),
(21, '1B06F071-C4BC-41FA-A211-7E859562CE18.jpg', 106),
(22, '1B06F071-C4BC-41FA-A211-7E859562CE18.jpg', 107),
(23, '97B638ED-DDD8-4021-88CD-991387ED6DE9.jpg', 107),
(24, 'D08944FF-563F-439F-82AB-31EC7CD0C9A9.jpg', 107),
(25, '1B06F071-C4BC-41FA-A211-7E859562CE18.jpg', 108),
(26, '97B638ED-DDD8-4021-88CD-991387ED6DE9.jpg', 108),
(27, 'D08944FF-563F-439F-82AB-31EC7CD0C9A9.jpg', 108),
(28, '1B06F071-C4BC-41FA-A211-7E859562CE18.jpg', 109),
(29, 'D08944FF-563F-439F-82AB-31EC7CD0C9A9.jpg', 109),
(30, 'D08944FF-563F-439F-82AB-31EC7CD0C9A9.jpg', 109),
(31, '1B06F071-C4BC-41FA-A211-7E859562CE18.jpg', 110),
(32, '97B638ED-DDD8-4021-88CD-991387ED6DE9.jpg', 110),
(33, 'D08944FF-563F-439F-82AB-31EC7CD0C9A9.jpg', 110),
(34, '1B06F071-C4BC-41FA-A211-7E859562CE18.jpg', 111),
(35, '97B638ED-DDD8-4021-88CD-991387ED6DE9.jpg', 111),
(36, 'D08944FF-563F-439F-82AB-31EC7CD0C9A9.jpg', 111),
(37, '1B06F071-C4BC-41FA-A211-7E859562CE18.jpg', 112),
(38, '97B638ED-DDD8-4021-88CD-991387ED6DE9.jpg', 112),
(39, 'D08944FF-563F-439F-82AB-31EC7CD0C9A9.jpg', 112),
(40, '1B06F071-C4BC-41FA-A211-7E859562CE18.jpg', 113),
(41, '97B638ED-DDD8-4021-88CD-991387ED6DE9.jpg', 113),
(42, 'D08944FF-563F-439F-82AB-31EC7CD0C9A9.jpg', 113),
(43, '83AC45FE-F281-41A0-AC52-416EC733D47C.jpg', 114),
(44, '359C495A-79EB-4C16-8353-BD2BF0C131E8.jpg', 114),
(45, '83675DAB-5CA2-4E0F-BED3-ADF92D03CBC0.jpg', 114),
(46, '83AC45FE-F281-41A0-AC52-416EC733D47C.jpg', 115),
(47, '359C495A-79EB-4C16-8353-BD2BF0C131E8.jpg', 115),
(48, '83675DAB-5CA2-4E0F-BED3-ADF92D03CBC0.jpg', 115),
(49, '83AC45FE-F281-41A0-AC52-416EC733D47C.jpg', 116),
(50, '359C495A-79EB-4C16-8353-BD2BF0C131E8.jpg', 116),
(51, '83675DAB-5CA2-4E0F-BED3-ADF92D03CBC0.jpg', 116),
(52, '83AC45FE-F281-41A0-AC52-416EC733D47C.jpg', 117),
(53, '83675DAB-5CA2-4E0F-BED3-ADF92D03CBC0.jpg', 117),
(54, '83675DAB-5CA2-4E0F-BED3-ADF92D03CBC0.jpg', 117),
(55, '83675DAB-5CA2-4E0F-BED3-ADF92D03CBC0.jpg', 118),
(56, '359C495A-79EB-4C16-8353-BD2BF0C131E8.jpg', 118),
(57, '83AC45FE-F281-41A0-AC52-416EC733D47C.jpg', 118),
(58, '83AC45FE-F281-41A0-AC52-416EC733D47C.jpg', 119),
(59, '359C495A-79EB-4C16-8353-BD2BF0C131E8.jpg', 119),
(60, '83675DAB-5CA2-4E0F-BED3-ADF92D03CBC0.jpg', 119),
(61, '83AC45FE-F281-41A0-AC52-416EC733D47C.jpg', 120),
(62, '359C495A-79EB-4C16-8353-BD2BF0C131E8.jpg', 120),
(63, '83675DAB-5CA2-4E0F-BED3-ADF92D03CBC0.jpg', 120),
(64, '83AC45FE-F281-41A0-AC52-416EC733D47C.jpg', 121),
(65, '359C495A-79EB-4C16-8353-BD2BF0C131E8.jpg', 121),
(66, '83675DAB-5CA2-4E0F-BED3-ADF92D03CBC0.jpg', 121),
(67, 'E47F5393-BB0B-4D0B-8BFF-9094563F06D6.jpg', 129),
(68, 'CA923BAE-1E0E-4575-A6FD-31005EE5B15C.jpg', 129),
(69, 'E47F5393-BB0B-4D0B-8BFF-9094563F06D6.jpg', 122),
(70, 'CA923BAE-1E0E-4575-A6FD-31005EE5B15C.jpg', 122),
(71, 'E47F5393-BB0B-4D0B-8BFF-9094563F06D6.jpg', 123),
(72, 'CA923BAE-1E0E-4575-A6FD-31005EE5B15C.jpg', 123),
(73, 'E47F5393-BB0B-4D0B-8BFF-9094563F06D6.jpg', 124),
(74, 'CA923BAE-1E0E-4575-A6FD-31005EE5B15C.jpg', 124),
(75, 'E47F5393-BB0B-4D0B-8BFF-9094563F06D6.jpg', 125),
(76, 'CA923BAE-1E0E-4575-A6FD-31005EE5B15C.jpg', 125),
(77, 'E47F5393-BB0B-4D0B-8BFF-9094563F06D6.jpg', 126),
(78, 'CA923BAE-1E0E-4575-A6FD-31005EE5B15C.jpg', 126),
(79, 'E47F5393-BB0B-4D0B-8BFF-9094563F06D6.jpg', 127),
(80, 'CA923BAE-1E0E-4575-A6FD-31005EE5B15C.jpg', 127),
(81, 'E47F5393-BB0B-4D0B-8BFF-9094563F06D6.jpg', 128),
(82, 'CA923BAE-1E0E-4575-A6FD-31005EE5B15C.jpg', 128),
(83, 'B3F42D0B-8FB0-47B1-9F46-283E84A7C5ED.jpg', 130),
(84, '73628465-68E9-4DAC-B276-BDC2569645F9.jpg', 130),
(85, 'ED9816B9-14EE-4AA9-8E2F-41EABDCD3282.jpg', 130),
(86, 'B3F42D0B-8FB0-47B1-9F46-283E84A7C5ED.jpg', 131),
(87, '73628465-68E9-4DAC-B276-BDC2569645F9.jpg', 131),
(88, 'ED9816B9-14EE-4AA9-8E2F-41EABDCD3282.jpg', 131),
(89, 'ED9816B9-14EE-4AA9-8E2F-41EABDCD3282.jpg', 132),
(90, '73628465-68E9-4DAC-B276-BDC2569645F9.jpg', 132),
(91, 'B3F42D0B-8FB0-47B1-9F46-283E84A7C5ED.jpg', 132),
(92, 'B3F42D0B-8FB0-47B1-9F46-283E84A7C5ED.jpg', 133),
(93, '73628465-68E9-4DAC-B276-BDC2569645F9.jpg', 133),
(94, 'ED9816B9-14EE-4AA9-8E2F-41EABDCD3282.jpg', 133),
(95, 'B3F42D0B-8FB0-47B1-9F46-283E84A7C5ED.jpg', 134),
(96, '73628465-68E9-4DAC-B276-BDC2569645F9.jpg', 134),
(97, 'ED9816B9-14EE-4AA9-8E2F-41EABDCD3282.jpg', 134),
(98, 'B3F42D0B-8FB0-47B1-9F46-283E84A7C5ED.jpg', 135),
(99, '73628465-68E9-4DAC-B276-BDC2569645F9.jpg', 135),
(100, 'ED9816B9-14EE-4AA9-8E2F-41EABDCD3282.jpg', 135),
(101, 'B3F42D0B-8FB0-47B1-9F46-283E84A7C5ED.jpg', 136),
(102, '73628465-68E9-4DAC-B276-BDC2569645F9.jpg', 136),
(103, 'ED9816B9-14EE-4AA9-8E2F-41EABDCD3282.jpg', 136),
(104, 'B3F42D0B-8FB0-47B1-9F46-283E84A7C5ED.jpg', 137),
(105, '73628465-68E9-4DAC-B276-BDC2569645F9.jpg', 137),
(106, 'ED9816B9-14EE-4AA9-8E2F-41EABDCD3282.jpg', 137),
(107, '0B155BAE-93DD-4790-8A73-26526682BB2C.jpg', 138),
(108, '93C5C3DE-4533-48C5-8A2B-9DBFAF1EF132.jpg', 138),
(109, 'AA260716-BDD4-4EC0-8084-E00825E73C83.jpg', 138),
(110, '0B155BAE-93DD-4790-8A73-26526682BB2C.jpg', 139),
(111, '93C5C3DE-4533-48C5-8A2B-9DBFAF1EF132.jpg', 139),
(112, 'AA260716-BDD4-4EC0-8084-E00825E73C83.jpg', 139),
(113, '0B155BAE-93DD-4790-8A73-26526682BB2C.jpg', 140),
(114, '93C5C3DE-4533-48C5-8A2B-9DBFAF1EF132.jpg', 140),
(115, 'AA260716-BDD4-4EC0-8084-E00825E73C83.jpg', 140),
(116, '0B155BAE-93DD-4790-8A73-26526682BB2C.jpg', 141),
(117, '93C5C3DE-4533-48C5-8A2B-9DBFAF1EF132.jpg', 141),
(118, 'AA260716-BDD4-4EC0-8084-E00825E73C83.jpg', 141),
(119, '0B155BAE-93DD-4790-8A73-26526682BB2C.jpg', 142),
(120, '93C5C3DE-4533-48C5-8A2B-9DBFAF1EF132.jpg', 142),
(121, 'AA260716-BDD4-4EC0-8084-E00825E73C83.jpg', 142),
(122, 'AA260716-BDD4-4EC0-8084-E00825E73C83.jpg', 143),
(123, '93C5C3DE-4533-48C5-8A2B-9DBFAF1EF132.jpg', 143),
(124, '0B155BAE-93DD-4790-8A73-26526682BB2C.jpg', 143),
(125, '0B155BAE-93DD-4790-8A73-26526682BB2C.jpg', 144),
(126, '93C5C3DE-4533-48C5-8A2B-9DBFAF1EF132.jpg', 144),
(127, 'AA260716-BDD4-4EC0-8084-E00825E73C83.jpg', 144),
(128, '0B155BAE-93DD-4790-8A73-26526682BB2C.jpg', 145),
(129, '93C5C3DE-4533-48C5-8A2B-9DBFAF1EF132.jpg', 145),
(130, 'AA260716-BDD4-4EC0-8084-E00825E73C83.jpg', 145);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(200) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `quant` bigint(255) DEFAULT NULL,
  `altura` int(255) NOT NULL,
  `cor` varchar(150) NOT NULL,
  `largura` int(255) NOT NULL,
  `peso` varchar(255) NOT NULL,
  `comprimento` int(255) NOT NULL,
  `dsPessoaFisica` int(255) NOT NULL,
  `dsPessoaJuridica` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `valor`, `quant`, `altura`, `cor`, `largura`, `peso`, `comprimento`, `dsPessoaFisica`, `dsPessoaJuridica`) VALUES
(106, 'Barra de Apoio - AlumÃ­nio', '40.00', 5, 12, 'Aluminio', 12, '1', 30, 0, 15),
(107, 'Barra de Apoio - AlumÃ­nio', '50.00', 8, 12, 'Aluminio', 12, '1', 40, 0, 15),
(108, 'Barra de Apoio - AlumÃ­nio', '60.00', 10, 12, 'Aluminio', 12, '1', 50, 0, 15),
(109, 'Barra de Apoio - AlumÃ­nio', '70.00', 8, 12, 'Aluminio', 12, '1', 60, 0, 20),
(110, 'Barra de Apoio - AlumÃ­nio', '80.00', 12, 12, 'Aluminio', 12, '1', 75, 0, 20),
(111, 'Barra de Apoio - AlumÃ­nio', '90.00', 11, 12, 'Aluminio', 12, '1', 80, 0, 20),
(112, 'Barra de Apoio - AlumÃ­nio', '100.00', 12, 12, 'Aluminio', 12, '1', 90, 0, 20),
(113, 'Barra de Apoio - AlumÃ­nio', '110.00', 12, 12, 'Aluminio', 12, '1', 100, 0, 20),
(114, 'Barra de Apoio - AlumÃ­nio', '60.00', 11, 12, 'Vermelho', 12, '1', 30, 0, 10),
(115, 'Barra de Apoio - AlumÃ­nio', '70.00', 12, 12, 'Vermelho', 12, '1', 40, 0, 10),
(116, 'Barra de Apoio - AlumÃ­nio', '80.00', 12, 12, 'Vermelho', 12, '1', 50, 0, 10),
(117, 'Barra de Apoio - AlumÃ­nio', '90.00', 12, 12, 'Vermelho', 12, '1', 60, 0, 10),
(118, 'Barra de Apoio - AlumÃ­nio', '100.00', 12, 12, 'Vermelho', 12, '1', 75, 0, 10),
(119, 'Barra de Apoio - AlumÃ­nio', '110.00', 12, 12, 'Vermelho', 12, '1', 80, 0, 10),
(120, 'Barra de Apoio - AlumÃ­nio', '120.00', 12, 12, 'Vermelho', 12, '1', 90, 0, 10),
(121, 'Barra de Apoio - AlumÃ­nio', '130.00', 12, 12, 'Vermelho', 12, '1', 100, 0, 10),
(122, 'Barra de Apoio - AlumÃ­nio', '60.00', 12, 12, 'Branco', 12, '1', 30, 0, 10),
(123, 'Barra de Apoio - AlumÃ­nio', '70.00', 12, 12, 'Branco', 12, '1', 40, 0, 10),
(124, 'Barra de Apoio - AlumÃ­nio', '80.00', 12, 12, 'Branco', 12, '1', 50, 0, 10),
(125, 'Barra de Apoio - AlumÃ­nio', '90.00', 12, 12, 'Branco', 12, '1', 60, 0, 10),
(126, 'Barra de Apoio - AlumÃ­nio', '100.00', 12, 12, 'Branco', 12, '1', 75, 0, 10),
(127, 'Barra de Apoio - AlumÃ­nio', '110.00', 12, 12, 'Branco', 12, '1', 80, 0, 10),
(128, 'Barra de Apoio - AlumÃ­nio', '120.00', 12, 12, 'Branco', 12, '1', 90, 0, 10),
(129, 'Barra de Apoio - AlumÃ­nio', '130.00', 12, 12, 'Branco', 12, '1', 100, 0, 10),
(130, 'Barra de Apoio - AlumÃ­nio', '60.00', 12, 12, 'Amarelo', 12, '1', 30, 0, 10),
(131, 'Barra de Apoio - AlumÃ­nio', '70.00', 12, 12, 'Amarelo', 12, '1', 40, 0, 10),
(132, 'Barra de Apoio - AlumÃ­nio', '80.00', 12, 12, 'Amarelo', 12, '1', 50, 0, 10),
(133, 'Barra de Apoio - AlumÃ­nio', '90.00', 12, 12, 'Amarelo', 12, '1', 60, 0, 10),
(134, 'Barra de Apoio - AlumÃ­nio', '100.00', 12, 12, 'Amarelo', 12, '1', 75, 0, 10),
(135, 'Barra de Apoio - AlumÃ­nio', '110.00', 12, 12, 'Amarelo', 12, '1', 80, 0, 10),
(136, 'Barra de Apoio - AlumÃ­nio', '120.00', 12, 12, 'Amarelo', 12, '1', 90, 0, 10),
(137, 'Barra de Apoio - AlumÃ­nio', '130.00', 12, 12, 'Amarelo', 12, '1', 100, 0, 10),
(138, 'Barra de Apoio - AlumÃ­nio', '60.00', 12, 12, 'Preto', 12, '1', 30, 0, 10),
(139, 'Barra de Apoio - AlumÃ­nio', '70.00', 12, 12, 'Preto', 12, '1', 40, 0, 10),
(140, 'Barra de Apoio - AlumÃ­nio', '80.00', 12, 12, 'Preto', 12, '1', 50, 0, 10),
(141, 'Barra de Apoio - AlumÃ­nio', '90.00', 12, 12, 'Preto', 12, '1', 60, 0, 10),
(142, 'Barra de Apoio - AlumÃ­nio', '100.00', 12, 12, 'Preto', 12, '1', 75, 0, 10),
(143, 'Barra de Apoio - AlumÃ­nio', '110.00', 12, 12, 'Preto', 12, '1', 80, 0, 10),
(144, 'Barra de Apoio - AlumÃ­nio', '120.00', 12, 12, 'Preto', 12, '1', 90, 0, 10),
(145, 'Barra de Apoio - AlumÃ­nio', '130.00', 12, 12, 'Preto', 12, '1', 100, 0, 10);

-- --------------------------------------------------------

--
-- Estrutura da tabela `registro_de_compras`
--

CREATE TABLE `registro_de_compras` (
  `id` int(255) NOT NULL,
  `id_usuario` int(255) NOT NULL DEFAULT '0',
  `id_produto` int(255) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Apenas Clicou Em Comprar',
  `quant` int(255) NOT NULL,
  `ref` varchar(150) DEFAULT 'A transacao ainda n possui referencia',
  `data_compra` varchar(20) DEFAULT NULL,
  `rastreamentoCorreios` varchar(70) NOT NULL DEFAULT 'Ainda nao possui um rastreamento',
  `vendedor` int(255) NOT NULL DEFAULT '0',
  `desconto` int(255) NOT NULL DEFAULT '0',
  `valorTotalC` decimal(10,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `registro_de_compras`
--

INSERT INTO `registro_de_compras` (`id`, `id_usuario`, `id_produto`, `status`, `quant`, `ref`, `data_compra`, `rastreamentoCorreios`, `vendedor`, `desconto`, `valorTotalC`) VALUES
(53, 2, 106, 'Compra De Balcao', 1, 'REF080420180722011', '08/04/2018  07:22', 'Ainda nao possui um rastreamento', 1, 12, '35.20'),
(54, 2, 106, 'Compra De Balcao', 1, 'REF080420180755271', '08/04/2018  07:55', 'Ainda nao possui um rastreamento', 1, 0, '40.00'),
(55, 2, 109, 'Compra De Balcao', 1, 'REF080420180755271', '08/04/2018  07:55', 'Ainda nao possui um rastreamento', 1, 0, '70.00'),
(56, 2, 106, 'Foi Ate O PagSeguro', 1, 'REF080420180302162', '08/04/2018  03:02', 'Ainda nao possui um rastreamento', 0, 0, '0.00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(20) DEFAULT NULL,
  `nivel` varchar(10) DEFAULT NULL,
  `senha` varchar(8) DEFAULT NULL,
  `login` varchar(10) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `tel` varchar(15) NOT NULL,
  `cell` varchar(15) NOT NULL,
  `rua` varchar(50) NOT NULL,
  `uf` varchar(4) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `cep` varchar(30) NOT NULL,
  `numero` int(15) NOT NULL,
  `ddd` int(5) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `complemento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `nivel`, `senha`, `login`, `email`, `tel`, `cell`, `rua`, `uf`, `cidade`, `cep`, `numero`, `ddd`, `bairro`, `complemento`) VALUES
(1, 'antonio carlos', 'adm', '123', 'jota', 'aaa@@', '3156-8769', '9978654', 'khgc', 'rj', 'duque de caxias', '25010310', 130, 21, '', ''),
(2, 'Antonio Carlos', 'cliente', '1234', 'jota2', 'jotakj@outlook.com', '37744527', '984155859', 'Toneleiro', 'RJ', 'duque de caxias', '25010310', 130, 21, 'Vila Paula', 'Em frente ao Esporte Clube.'),
(11, 'Adm Da Silva', 'cliente', 'adm', 'adm', 'jotakj@outlook.com', '23345678', '98675432', 'Toneleiro', 'RJ', 'duque de caxias', '25010310', 130, 21, 'vila paula', 'em frente ao campo'),
(12, 'Jerminio da Silva', 'cliente', '123', 'Jerminio', 'jotakj_@outlook.com', '37744527', '988775544', 'Toneleiro', 'RJ', 'Duque de Caxias', '25010310', 130, 21, 'Vila Paula', 'Em frente ao Caxias Esporte Clube'),
(13, 'adm', 'adm', '1000', 'graÃ§a', 'adm', 'adm', 'adm', '', 'adm', 'adm', 'adm', 0, 0, '', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `vendas`
--

CREATE TABLE `vendas` (
  `id` int(11) NOT NULL,
  `fk_idProd` int(255) DEFAULT NULL,
  `forma_pag` varchar(10) DEFAULT NULL,
  `quant` int(255) DEFAULT NULL,
  `fk_idUser` int(255) DEFAULT NULL,
  `data` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `configuracoes`
--
ALTER TABLE `configuracoes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fornecedor`
--
ALTER TABLE `fornecedor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fotosprod`
--
ALTER TABLE `fotosprod`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registro_de_compras`
--
ALTER TABLE `registro_de_compras`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendas`
--
ALTER TABLE `vendas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `configuracoes`
--
ALTER TABLE `configuracoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `fornecedor`
--
ALTER TABLE `fornecedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fotosprod`
--
ALTER TABLE `fotosprod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;
--
-- AUTO_INCREMENT for table `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;
--
-- AUTO_INCREMENT for table `registro_de_compras`
--
ALTER TABLE `registro_de_compras`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `vendas`
--
ALTER TABLE `vendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
