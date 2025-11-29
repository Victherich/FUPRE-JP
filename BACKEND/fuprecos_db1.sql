-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 27, 2025 at 03:27 PM
-- Server version: 11.4.9-MariaDB
-- PHP Version: 8.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fuprecos_db1`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_code` varchar(10) DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL,
  `affiliation` varchar(255) NOT NULL,
  `orcid` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `verification_token` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email_verified` tinyint(1) DEFAULT 0,
  `reset_token` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `full_name`, `email`, `phone_code`, `phone_number`, `affiliation`, `orcid`, `password`, `verification_token`, `created_at`, `email_verified`, `reset_token`) VALUES
(24, 'Elias Elemike', 'chemphilips@yahoo.com', '+234', '8035642445', 'Federal University of Petroleum Resources Effurun', '', '$2y$10$KEBsuzGIx3mFH7Y48xByPuMNTidT02.bURY7qLpLFnziQOZINTJuy', '6e3db982f50608fe5b8dd807042942eb', '2025-11-26 09:28:41', 0, NULL),
(23, 'FUPRE JP', 'fuprecos@fuprecosjournals.org', '+234', '123456789', 'FUPRE', '', '$2y$10$8QceUNI/fNfsZJ4wx8eYO.IubnyPcBK3Yu4kkVs.2Rbdb0KPy12ru', NULL, '2025-11-23 17:43:11', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `manuscript_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conference_registrations`
--

CREATE TABLE `conference_registrations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `abstract_path` varchar(255) DEFAULT NULL,
  `proof_path` varchar(255) DEFAULT NULL,
  `payment_status` enum('Pending','Confirmed') DEFAULT 'Pending',
  `registration_status` enum('Pending','Approved') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `conference_registrations`
--

INSERT INTO `conference_registrations` (`id`, `name`, `email`, `school`, `abstract_path`, `proof_path`, `payment_status`, `registration_status`, `created_at`) VALUES
(1, 'EbubeChukwu Victor Ndu', 'victherich@gmail.com', 'FUPRE', 'uploads/conference/1764250854_abstract_4781.pdf', 'uploads/conference/1764250855_proof_9484.pdf', 'Pending', 'Pending', '2025-11-27 13:40:56'),
(2, 'EbubeChukwu Victor Ndu', 'victherich@gmail.com', 'FUPRE', 'uploads/conference/1764250944_abstract_1187.pdf', 'uploads/conference/1764250945_proof_6716.pdf', 'Pending', 'Pending', '2025-11-27 13:42:27'),
(3, 'EbubeChukwu Victor Ndu', 'victherich@gmail.com', 'FUPRE', 'uploads/conference/1764251446_abstract_2338.pdf', 'uploads/conference/1764251447_proof_8244.pdf', 'Pending', 'Pending', '2025-11-27 13:50:48'),
(4, 'EbubeChukwu Victor Ndu', 'victherich@gmail.com', 'FUPRE', 'uploads/conference/1764251684_abstract_4221.', 'uploads/conference/1764251684_proof_5008.pdf', 'Pending', 'Pending', '2025-11-27 13:54:45');

-- --------------------------------------------------------

--
-- Table structure for table `editors`
--

CREATE TABLE `editors` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_code` varchar(10) DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL,
  `affiliation` varchar(255) NOT NULL,
  `orcid` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `verification_token` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email_verified` tinyint(1) DEFAULT 0,
  `reset_token` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `editors`
--

INSERT INTO `editors` (`id`, `full_name`, `email`, `phone_code`, `phone_number`, `affiliation`, `orcid`, `password`, `verification_token`, `created_at`, `email_verified`, `reset_token`) VALUES
(10, 'FUPTR JP', 'fuprecos@fuprecosjournals.org', '+234', '123456789', 'FUPRE', '', '$2y$10$IIDZLvm0U5RoRYQd6YlV9eHPzC6HLMRxmJI9h5RXU5mqxn6j4JMz.', NULL, '2025-11-23 17:29:52', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `manuscripts`
--

CREATE TABLE `manuscripts` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `abstract` text NOT NULL,
  `keywords` text NOT NULL,
  `co_authors` varchar(255) DEFAULT NULL,
  `article_category` varchar(255) NOT NULL,
  `article_code` varchar(9) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('1','2','3','4','5','6','7') DEFAULT '1',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `APC` enum('unpaid','paid') DEFAULT 'unpaid',
  `reviewer_id` int(11) DEFAULT NULL,
  `submission_type` varchar(50) NOT NULL,
  `original_article_code` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `manuscripts`
--

INSERT INTO `manuscripts` (`id`, `author_id`, `title`, `abstract`, `keywords`, `co_authors`, `article_category`, `article_code`, `file_path`, `created_at`, `status`, `updated_at`, `APC`, `reviewer_id`, `submission_type`, `original_article_code`) VALUES
(61, 23, 'High Index Body Centered Cubic (Bcc) Metals: Surface Energy Calculation', ' The study presents a detailed description of the analytical algorithm for equivalent crystal theory\r\n (AECT), focusing on its application to the study of surface energies. This study concentrates on\r\n one of the semi-empirical techniques known as the equivalent crystal theory method (ECT) and\r\n since its introduction in 1987 it has been extensively used to describe the energetic defect in metals\r\n and alloys. The major constraint in this implementation is the time-consuming steps in solving\r\n exponential equations. To overcome this problem a new analytical algorithm formulated by Zypman\r\n and Ferrante (2008) to invert the equations has been adopted in this study. ', 'Analytical equivalent crystal theory, Semi-empirical method, bcc metals, High index crystal  surfaces, Surface energy', '', '1', '875435168', 'uploads/submitted_manuscripts/1764004691_3723.pdf', '2025-11-24 17:18:11', '6', '2025-11-24 17:20:37', 'unpaid', NULL, 'New Submission', NULL),
(62, 23, 'Batch adsorption study of Iron (Fe3+) removal from industrial wastewater using  activated biochar', ' The persistent problem of industrial e uents causing heavy metal pollution in Nigerias ground\r\n and surface waters has been a longstanding concern. To create inexpensive adsorbents that can\r\n remove heavy metals from wastewater, this study looks into using activated bamboos biochar as\r\n a precursor. The objective of this study is to investigate the impact of variables (contact time,\r\n adsorbent dosage) on the adsorption e ciency of activated biochar in heavy metal removal from\r\n industrial wastewater. Utilising FTIR, SEM, and BET, the adsorbent was characterised. Atomic\r\n Absorption Spectrophotometry was used to analyse metallic elements. ', 'Adsorption, kinetics, activated biochar, bamboo, wastewater.', '', '1', '247537735', 'uploads/submitted_manuscripts/1764005033_4417.pdf', '2025-11-24 17:23:54', '6', '2025-11-24 17:26:26', 'unpaid', NULL, 'New Submission', NULL),
(60, 23, 'Physicochemical Assessment of Wastewater Discharged from a Battery Recycling  Facility and Its Impact on a River in Southeast Nigeria', 'In developing nations, vehicle batteries are often recycled using informal processes, which can\r\n lead to environmental contamination from the wastewater generated from the recycling process.\r\n This study assessed the physicochemical parameters of wastewater samples from a battery recycling\r\n facility and the receiving River in Southeast of Nigeria. Twenty-two water samples were collected\r\n during the wet and dry seasons from the study area. The following parameters were analyzed using\r\n standard laboratory methods: pH, electrical conductivity, TDS, turbidity, DO BOD, COD, TSS, ni\r\ntrate, phosphorus, chloride, sulphate, ammonia, phosphate and total hardness. The pH ranged from\r\n 2.18 to 7.35 (wet season) and 1.95 to 7.21 in the (dry season), while DO, BOD and COD ranged from\r\n 2.6 mg/L to 7.4 mg/L (wet season) and 2.3 mg/L to 7.1 mg/L (dry season), 2.5 mg/L to 36.3 mg/L\r\n (wet season) and 2.8 mg/L to 38.8 mg/L (dry season), 21.3 mg/L to 153.3 mg/L (wet season) and\r\n 22.5 mg/L to 172.1 mg/L (dry season).', 'Physicochemical, Wastewater, Battery recycling, Southeast, Nigeria', '', '1', '804856397', 'uploads/submitted_manuscripts/1764004376_5115.pdf', '2025-11-24 17:12:58', '6', '2025-11-24 17:15:34', 'unpaid', NULL, 'New Submission', NULL),
(59, 23, 'Impact of Arti cial Intelligence (AI) on Road Tra c Management in Lagos  Metropolis, Nigeria', 'Arti cial Intelligence techniques are gaining interest for tra c management due to their potential\r\n to provide real-time insights, predictive analytics, proactive decision-making, and optimization of\r\n tra c ow. These technologies have improved real-time tra c monitoring, congestion management,\r\n tra c signal control, public transportation systems, urban planning, and infrastructure develop\r\nment. The study utilized primary data from 160 pedestrians/drivers and 19 tra c agencies, using a\r\n strati ed sampling technique and employing descriptive and inferential statistics.The study found\r\n a strong positive correlation between Arti cial Intelligence-based tra c management strategies and\r\n improved tra c management, with 69.7% of the variability explained by these strategies. The study\r\n concluded that Arti cial Intelligence-powered solutions enhance tra c management e ciency, re\r\nduce travel times, improve road safety, and mitigate environmental impacts. It recommended the\r\n government invest in developing and deploying Arti cial Intelligence infrastructure for tra c man\r\nagement in Lagos Metropolis.', 'Arti cial Intelligence, Road Tra c Management, tra c monitoring, congestion management', '', '1', '811355081', 'uploads/submitted_manuscripts/1764003758_1716.pdf', '2025-11-24 17:02:39', '6', '2025-11-24 17:09:55', 'unpaid', NULL, 'New Submission', NULL),
(57, 23, 'Assessment of Polycyclic Aromatic Hydrocarbon Level of Orogodo River, Agbor,  Delta State.', 'The Orogodo River, situated in Agbor, Delta State, Nigeria, is a crucial water resource that sus\r\ntains numerous economic and recreational activities. However, the river faces signi cant pollution\r\n risks from various human-related sources, such as industrial and domestic waste, which can intro\r\nduce polycyclic aromatic hydrocarbons (PAHs) into the water. PAHs are toxic and carcinogenic\r\n substances that pose serious risks to both human health and the environment. This study focused\r\n on assessing the levels of PAHs in the Orogodo Rivers water. Water samples were gathered from ve\r\n distinct locations along the river and analyzed for PAHs using gas chromatography-mass spectrom\r\netry (GC-MS). The ndings revealed that PAH concentrations in the river surpassed the maximum\r\n permissible limits established by regulatory authorities.', 'Polycyclic aromatic hydrocarbons; Environmental sustainability; Contamination; Orogodo river.', '', '1', '965115688', 'uploads/submitted_manuscripts/1764002935_8592.pdf', '2025-11-24 16:48:56', '6', '2025-11-24 16:51:33', 'unpaid', NULL, 'New Submission', NULL),
(58, 23, 'Smart Car Park Management System based on Radio Frequency Identi cation', ' Carbon nanoparticles from Polyethylene Terephthalate (PET) bottles has attracted good atten\r\ntion owing to their exceptional properties such as wide surface area, lower cost, biocompatibility,\r\n cytotoxicity, catalytic properties, drug delivery and biosensing. The processed carbon nanoparticles\r\n from PET bottles, using hydrothermal method possesses an excellent adsorption quality for the\r\n removal of Fe (III) from waste water. The characteristics of the carbon nanoparticles were revealed\r\n using Fourier Transform Infrared Spectrometer (FTIR), Energy Dispersive Spectrometer (EDX),\r\n X-ray Di ractrometry (XRD), Scanning Electron Microscopy (SEM) and Transmission Electron\r\n Microscopy (TEM). The adsorption of Fe (III) from the waste water increases with increase in con\r\ntact time (15min 2 h) and dosage (0.1g- 0.8g). The characterization and application results showed\r\n that carbon nanoparticles from PET bottles synthesized by hydrothermal methods, possesses good\r\n surface chemistry that promote e ective adsorption of Fe (III) from waste water. This makes PET\r\n bottles a viable material for the synthesis of carbon nanoparticles for heavy metals removal from\r\n waste water.', 'RFID, IR sensors, C++, blynk IoT, Arduino IDE', '', '1', '353726075', 'uploads/submitted_manuscripts/1764003284_5549.pdf', '2025-11-24 16:54:45', '6', '2025-11-24 16:57:19', 'unpaid', NULL, 'New Submission', NULL),
(55, 23, 'Investigating the optoelectronic properties of silver-doped zirconium sul de  nanostructures synthesized via electrochemical deposition', ' This study primarily focuses on investigating a nanostructured material synthesized through the\r\n electrochemical deposition of zirconium sul de (ZrS) doped with silver (Ag). The study focuses on\r\n understanding the inuence of silver doping on the structural, optical, and electrical characteristics\r\n of ZrS nanostructures to enhance their potential for optoelectronic applications. The nanostructures\r\n were fabricated using a controlled electrochemical deposition technique, followed by structural char\r\nacterization through X-ray di raction (XRD) and scanning electron microscopy (SEM).', ' bandgap energy; zirconium, silver, metals, semiconductors, temperature;', '', '1', '362473931', 'uploads/submitted_manuscripts/1763927626_7612.pdf', '2025-11-23 19:53:47', '6', '2025-11-23 19:56:36', 'unpaid', NULL, 'New Submission', NULL),
(56, 23, 'Adsorption of Fe (III) from waste water using carbon nanoparticles obtained from  Polyethylene Terephthalate (PET) waste bottles.', 'Carbon nanoparticles from Polyethylene Terephthalate (PET) bottles has attracted good atten\r\ntion owing to their exceptional properties such as wide surface area, lower cost, biocompatibility,\r\n cytotoxicity, catalytic properties, drug delivery and biosensing. The processed carbon nanoparticles\r\n from PET bottles, using hydrothermal method possesses an excellent adsorption quality for the\r\n removal of Fe (III) from waste water. The characteristics of the carbon nanoparticles were revealed\r\n using Fourier Transform Infrared Spectrometer (FTIR), Energy Dispersive Spectrometer (EDX),\r\n X-ray Di ractrometry (XRD), Scanning Electron Microscopy (SEM) and Transmission Electron\r\n Microscopy (TEM). The adsorption of Fe (III) from the waste water increases with increase in con\r\ntact time (15min 2 h) and dosage (0.1g- 0.8g). The characterization and application results showed\r\n that carbon nanoparticles from PET bottles synthesized by hydrothermal methods, possesses good\r\n surface chemistry that promote e ective adsorption of Fe (III) from waste water. This makes PET\r\n bottles a viable material for the synthesis of carbon nanoparticles for heavy metals removal from\r\n waste water.', 'PET bottles, carbon nanoparticles, waste water, hydrothermal synthesis, adsorption', '', '1', '212838988', 'uploads/submitted_manuscripts/1763931289_8412.pdf', '2025-11-23 20:54:51', '6', '2025-11-23 21:01:09', 'unpaid', NULL, 'New Submission', NULL),
(53, 23, 'Design and Simulation of a Fuzzy Logic-based Washing Machine System for Visually  Impaired Users', 'This paper presents the design and simulation of a Fuzzy Logic-based washing machine system\r\n tailored for visually impaired users. Visually impaired individuals often face challenges operating\r\n conventional washing machines due to the lack of accessible interfaces. To address this, a dual-mode\r\n Fuzzy Logic control system was developed and simulated, o ering both automatic and custom\r\n washing options. The system integrates two Fuzzy Logic controllers for enhanced exibility and\r\n control. Simulation and system logic were implemented using MATLABs Fuzzy Logic Toolbox for\r\n modeling and Python for programmatic control. Key accessibility features include comprehensive\r\n audio feedback, ashing indicator buttons, tactile markings, and a simple, high-contrast physical\r\n layout. The system adheres to the guidelines set by the Research Institute for Disabled Customers\r\n (RIDC), aiming to make automated laundry services inclusive. Preliminary simulations indicate\r\n e ective customization of water intake, detergent use, spin speed, and drying time based on user or\r\n sensor input, suggesting high usability for visually impaired users.', 'Washing Machine, Visually Impaired, Fuzzy Logic, MATLAB, Python', '', '1', '511169550', 'uploads/submitted_manuscripts/1763926043_7471.pdf', '2025-11-23 19:27:24', '6', '2025-11-23 19:30:52', 'unpaid', NULL, 'New Submission', NULL),
(54, 23, 'Evaluation of the Characteristics of Some Niger Delta Crude Oils Using Saturate,  Aromatic, Resin and Aspaltene', 'Source rocks quality is essential by providing information on their kerogen type and organic\r\n matter quality, type of organic matter and characteristics, thermal maturity of the organic matter,\r\n and hydrocarbon type. In order to ascertain the bulk composition of oils, organic matter inputs,\r\n source depositional environment, and thermal maturation in comparison, a geochemical investigation\r\n was conducted on seven crude oil samples (Q, R, S, T, U, V and W) from OML X. Saturates,\r\n Aromatics, Resin, and Asphaltene (SARA) bulk compositions were separated from the crude oil\r\n samples using ASTMD4124-09 test standards. ASTMD5853 was used to measure the pour point\r\n parameter for the ow assurance application, while ASTMD664 was used to measure the total acid\r\n number (TAN). The Wavelength dispersive X-ray uorescence spectrometer (WDXRF) was used\r\n to measure the sulfur concentrations in accordance with ASTMD2622 guidelines. Using saturates\r\n extracts in selected ion monitoring (SIM), Gas chromatography- mass spectrometry (GC-MS) and\r\n Gas Chromatography- Flame Ionization Detection (GC-FID) were used to evaluate the biomarkers in\r\n accordance with ASTMD7169. The API values were between 10.90 and 16.10. The range of sulphur\r\n concentration in the crude oils showed that Q crude recorded the highest concentration, while S\r\n crude was found to be the least in concentration. The Saturates/Aromatic ratio for the crude ranges\r\n from 1.15 to 4.38, With W crude having the highest concentration and U crude having the lowest\r\n concentration. All seven oil wells produced para nic, undegraded (non-biodegraded) crude oil. The\r\n ndings demonstrated that all of the crude oil samples were heavy crude and they came from source\r\n rocks that include type I and type II kerogen from a marine agal source which had been deposited\r\n in an anoxic environment. The seven crude oil samples that were chosen from the oil wells were all\r\n mature, with some displaying a higher level of maturity than the others, according to the biomarker\r\n metrics CPI, Pr/Ph ratio, Pr/n-C17, Ph/n-C18, TAR, etc. utilized for maturity indices. Since the\r\n crudes are para nic, non-biodegraded and their features unchanged, we can reconstitute the nature\r\n of the source rock using the crude oil.', 'Mining, oil elds, SARA and biodegradation', '', '1', '484169243', 'uploads/submitted_manuscripts/1763926962_1911.pdf', '2025-11-23 19:42:44', '6', '2025-11-23 19:49:05', 'unpaid', NULL, 'New Submission', NULL),
(52, 23, 'Waste Generation and Management Practices in Construction Industries in Nigeria-A  case study of Cakasa Nigeria Company', ' This study focuses on the practice of waste management in the construction industry in Nigeria,\r\n using a case study of Cakasa Nigeria Company during the construction of a tank farm from 2019\r\n2022. The study analyzed waste data from consignment notes and found that metal waste (4370kg)\r\n was the most generated waste material on site, followed by concrete and bricks (3973 kg), timber\r\n (2850kg), masonry and plasterboard (2595 kg), and paper waste (1621 kg). Oil rags (16 kg) were the\r\n least generated waste. The factors inuencing material waste production during construction were\r\n identi ed as design changes, theft and vandalism, poor site conditions, poor waste minimization\r\n strategy, poor procurement management, poor materials handling on site, and poor implementation\r\n of waste management plan. Measures to minimize construction material waste included proper site\r\n supervision and management techniques, adequate material storage, sta training and awareness,\r\n and proper procurement management.', 'Construction, waste management, metal waste, procurement plan, environmental sustainability.', '', '1', '707717806', 'uploads/submitted_manuscripts/1763925299_6207.pdf', '2025-11-23 19:15:00', '6', '2025-11-23 19:20:41', 'unpaid', NULL, 'New Submission', NULL),
(50, 23, 'SEMAEco-IoT: A Secured IoT-based Smart Energy Monitor and Alert for Enhanced  Energy Conservation and Optimization', ' Today, there is a global demand for e cient energy consumption utilizing energy- t management\r\n solutions that are poised to deliver sustainable living practices with reduced consumption of en\r\nergy therein. These in their own right- have also continued to raise germane concern tailored at\r\n environmental, health and consumption regulations to yield global concern and priorities targeted\r\n at replacing traditional solutions with (alternate) intelligent, optimized models and strategies. Our\r\n study presents SEMAEco-IoT designed with the microcontroller ESP and sensor to observe en\r\nvironmental conditions and energy consumption by home appliances. It utilizes machine learning\r\n algorithm to analyze total energy consumed by each appliance and delivers optimal consumption\r\n that reduces energy waste. The system tested across multiple parameters yields e ectiveness,\r\n reliability, and e ciency. Our use of ESP8266 and ThingSpeak is able to handle expansive inputs\r\n without signi cant delays or data losses. Results a rm its capability to maintain stable performance\r\n even with more device connected.', ' Intrusion. DoS, Transfer Learning, Korhonen Neural Net, Genetic Algorithm', '', '1', '367106422', 'uploads/submitted_manuscripts/1763924093_3161.pdf', '2025-11-23 18:54:54', '6', '2025-11-23 18:58:21', 'unpaid', NULL, 'New Submission', NULL),
(51, 23, 'Uniaxial and Biaxial Strain E ect on the Bandgap of Semiconducting  Two-Dimensional TMDCS- A Review', ' Transition metal dichalcogenides (TMDCS) represent a large family of crystalline materials ar\r\nranged in layers, which are essentially composed of transition metals and chalcogens with chemical\r\n bonds within the layers. Many of the band gaps of these materials can be tuned to transition from\r\n indirect band gap semiconductors in bulk crystals to direct band gap semiconductors in monolayer\r\n nanosheets. This paper reviews the band gaps of two-dimensional (2D)-TMDCS materials, focus\r\ning on how uniaxial and biaxial strain can enhance the band gap and modify the electronic and\r\n optical properties of the material. The result observed proved that strain fundamentally changes\r\n the electronic and optical properties of these 2D-TMDCS, causes a phase transition, and changes\r\n semiconducting 2D TMDCS from semiconducting to metallic and vice versa. Bandgap modulation\r\n through tensile or compressive strains alters the optical spectra of the material by shifting the exci\r\ntonic peaks and the exciton binding energy, thereby inuencing the photoluminescence intensity and\r\n wavelength of 2D TMDCS. The experimental results are cross-veri ed with theoretical predictions\r\n and ab initio calculations executed based on the density functional theory (DFT). The bandgaps\r\n of 2D-TMDCS are more e ectively a ected by biaxial strain. When it comes to tuning the elec\r\ntronic and optical properties, strain engineering has proven to be a versatile, e ective, and e cient\r\n approach', 'TMDCs, Uniaxial strain, Biaxial strain, Bandgap Engineering', '', '1', '650438885', 'uploads/submitted_manuscripts/1763924640_5099.pdf', '2025-11-23 19:04:01', '6', '2025-11-23 19:11:15', 'unpaid', NULL, 'New Submission', NULL),
(48, 23, 'Investigating Intrusion Detection Using a Culturally-Inspired Genetic Algorithm Trained Neural Network Ensemble', 'Internet\'s popularity alongside proliferation of smartphones as mode of data exchange for busi-\r\nnesses as a great strategy for information sharing amongst users on a private company network.\r\nIt has consequently also, attracted adversaries with proliferation of attacks to exploit unsuspecting\r\nusers of resources for personal gain. Adversaries utilize socially-engineering attacks, to breach and\r\ngain unauthorized access to a compromised user device via subterfuge mode that can also deny such\r\nusers of access to resources on a network. With denial-of-service carefully crafted to wreak havoc\r\non network infrastructures, it has since become expedient to explore deep learning mode to predict\r\nsuch cases performance. We explore a scheme to eectively distinguish between genuine and mali-\r\ncious packets; And benchmarks our results using XGB, Random Forest, and Decision Tree. Result\r\nshows that our model yields F1 0.9945 that outperforms XGB, RF and DT with F1 of (0.9925,\r\n0.9881 and 0.9805). Its Accuracy of 0.9984 outperforms XGB, RF, and DT with (0.9981, 0.9964 and\r\n0.9815) respectively). Our model correctly classied 13,418 cases with 99.84% Accuracy with 283\r\ncases incorrectly classied. Thus, model eectively dierentiates genuine from malicious packets.', 'Intrusion. DoS, Transfer Learning, Korhonen Neural Net, Genetic Algorithm', '', '1', '991819145', 'uploads/submitted_manuscripts/1763920323_5172.pdf', '2025-11-23 17:52:04', '6', '2025-11-23 17:54:05', 'unpaid', NULL, 'New Submission', NULL),
(49, 23, 'Analysis of the e ects of fuel hike on transport operations on mobility of goods and  services in Oyo state', ' Fuel price hikes have a signi cant impact on a countrys economic development because they a ect\r\n travel patterns, freight and service travel, and the cost of operating public transportation, which\r\n a ects things like road tolls, car maintenance, and mobility costs. This study looks at how fuel\r\n price hikes a ect Ibadans public transport operators and how the citys transportation system is\r\n a ected by fuel prices. A study involving 286 respondents from ten automobile parks in Ibadan found\r\n that most respondents (29.7%) reported high mobility expenses, with customer satisfaction second\r\n (26.6%). Fuel price increases can lead to higher freight or service mobility costs, as fuel prices increase\r\n the cost of public transportation. A regression analysis showed a signi cant correlation between\r\n fuel price increases and public transportation operations in Ibadan.According to the report, rising\r\n gasoline prices have a direct impact on in ation and discourage people from taking public transit.\r\n According to the ndings, in order to lower in ation, the government should create an intervention\r\n program to discourage fuel hoarding among fuel marketers', ' Washing Machine, Visually Impaired, Fuzzy Logic, MATLAB, Python', '', '1', '690085084', 'uploads/submitted_manuscripts/1763922384_4026.pdf', '2025-11-23 18:26:28', '6', '2025-11-23 18:49:47', 'unpaid', NULL, 'New Submission', NULL),
(47, 23, 'Occurrence, potential risks and sources of BTEX in sediment of the Okpare creek, Niger Delta Nigeria', 'Benzene Toluene, Ethylbenzene and Xylene (BTEX) often enter the aquatic ecosystem due to\r\naccidental oil spills, leakage and improper oil-related waste disposals. Toxicity studies in the aquatic\r\necosystem have shown that BTEX have adverse eects on aquatic biota and humans. Therefore,\r\nthis study was conducted to examine the concentrations, potential risks and sources of BTEX in\r\nsediments of the Okpare creek in the Niger Delta of Nigeria. The\r\nP\r\nBTEX concentrations in the\r\nsediment ranged from 1.14 to 4.96 mg/kg. On average, toluene was predominant in the sediment.\r\nThe upstream section of the Okpare creek had higher average concentrations of\r\nP\r\nBTEX than\r\nthe mid- and downstream sections. The concentration of BTEX in the sediment were above the\r\nNigerian Upstream Petroleum Regulatory Commission (NUPRC) target values. The values of the\r\nhazard index due to human exposure to the BTEX in the sediments were < 1 which indicated the\r\nabsence of non-carcinogenic risk from BTEX exposure in the sediments. Moreover, the total cancer\r\nrisk values were less than 1  10ô€€€6 also suggesting that there is the absence of carcinogenic risk to\r\nhumans exposed to the BTEX in the sediments from the Okpare creek. The source identication\r\nindicated that the sources of BTEX in the creek were stationary sources like paints, solvents, gasoline\r\nand diesel spillage.', 'Occurrence, potential risks and sources of BTEX in sediment of the Okpare creek, Niger Delta Nigeria', '', '1', '535859358', 'uploads/submitted_manuscripts/1763920026_1799.pdf', '2025-11-23 17:47:07', '6', '2025-11-23 17:47:48', 'unpaid', NULL, 'New Submission', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

CREATE TABLE `publications` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `abstract` text NOT NULL,
  `keywords` varchar(255) NOT NULL,
  `co_authors` text DEFAULT NULL,
  `article_category` varchar(100) NOT NULL,
  `article_code` varchar(100) NOT NULL,
  `last_revised_article_code` varchar(100) DEFAULT NULL,
  `doiLink` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `editor_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`id`, `author_id`, `title`, `abstract`, `keywords`, `co_authors`, `article_category`, `article_code`, `last_revised_article_code`, `doiLink`, `file_path`, `created_at`, `editor_id`) VALUES
(55, 23, 'Physicochemical Assessment of Wastewater Discharged from a Battery Recycling  Facility and Its Impact on a River in Southeast Nigeria', ' lead to environmental contamination from the wastewater generated from the recycling process.\r\n This study assessed the physicochemical parameters of wastewater samples from a battery recycling\r\n facility and the receiving River in Southeast of Nigeria. Twenty-two water samples were collected\r\n during the wet and dry seasons from the study area. The following parameters were analyzed using\r\n standard laboratory methods: pH, electrical conductivity, TDS, turbidity, DO BOD, COD, TSS, ni\r\ntrate, phosphorus, chloride, sulphate, ammonia, phosphate and total hardness. The pH ranged from\r\n 2.18 to 7.35 (wet season) and 1.95 to 7.21 in the (dry season), while DO, BOD and COD ranged from\r\n 2.6 mg/L to 7.4 mg/L (wet season) and 2.3 mg/L to 7.1 mg/L (dry season), 2.5 mg/L to 36.3 mg/L\r\n (wet season) and 2.8 mg/L to 38.8 mg/L (dry season), 21.3 mg/L to 153.3 mg/L (wet season) and\r\n 22.5 mg/L to 172.1 mg/L (dry season).', 'Physicochemical, Wastewater, Battery recycling, Southeast, Nigeria', '', '1', '587698757', '804856397', '', 'uploads/published_articles/1764004523_5527.pdf', '2025-11-24 17:15:24', 10),
(56, 23, 'High Index Body Centered Cubic (Bcc) Metals: Surface Energy Calculation', ' The study presents a detailed description of the analytical algorithm for equivalent crystal theory\r\n (AECT), focusing on its application to the study of surface energies. This study concentrates on\r\n one of the semi-empirical techniques known as the equivalent crystal theory method (ECT) and\r\n since its introduction in 1987 it has been extensively used to describe the energetic defect in metals\r\n and alloys. The major constraint in this implementation is the time-consuming steps in solving\r\n exponential equations. To overcome this problem a new analytical algorithm formulated by Zypman\r\n and Ferrante (2008) to invert the equations has been adopted in this study. ', 'Analytical equivalent crystal theory, Semi-empirical method, bcc metals, High index crystal  surfaces, Surface energy', '', '1', '278041932', '875435168', '', 'uploads/published_articles/1764004820_8519.pdf', '2025-11-24 17:20:21', 10),
(54, 23, 'Impact of Arti cial Intelligence (AI) on Road Tra c Management in Lagos  Metropolis, Nigeria', 'Arti cial Intelligence techniques are gaining interest for tra c management due to their potential\r\n to provide real-time insights, predictive analytics, proactive decision-making, and optimization of\r\n tra c ow. These technologies have improved real-time tra c monitoring, congestion management,\r\n tra c signal control, public transportation systems, urban planning, and infrastructure develop\r\nment. The study utilized primary data from 160 pedestrians/drivers and 19 tra c agencies, using a\r\n strati ed sampling technique and employing descriptive and inferential statistics.The study found\r\n a strong positive correlation between Arti cial Intelligence-based tra c management strategies and\r\n improved tra c management, with 69.7% of the variability explained by these strategies. The study\r\n concluded that Arti cial Intelligence-powered solutions enhance tra c management e ciency, re\r\nduce travel times, improve road safety, and mitigate environmental impacts. It recommended the\r\n government invest in developing and deploying Arti cial Intelligence infrastructure for tra c man\r\nagement in Lagos Metropolis.', 'Arti cial Intelligence, Road Tra c Management, tra c monitoring, congestion management', '', '1', '296424783', '811355081', '', 'uploads/published_articles/1764004185_8482.pdf', '2025-11-24 17:09:45', 10),
(52, 23, 'Assessment of Polycyclic Aromatic Hydrocarbon Level of Orogodo River, Agbor,  Delta State.', ' The Orogodo River, situated in Agbor, Delta State, Nigeria, is a crucial water resource that sus\r\ntains numerous economic and recreational activities. However, the river faces signi cant pollution\r\n risks from various human-related sources, such as industrial and domestic waste, which can intro\r\nduce polycyclic aromatic hydrocarbons (PAHs) into the water. PAHs are toxic and carcinogenic\r\n substances that pose serious risks to both human health and the environment. This study focused\r\n on assessing the levels of PAHs in the Orogodo Rivers water. Water samples were gathered from ve\r\n distinct locations along the river and analyzed for PAHs using gas chromatography-mass spectrom\r\netry (GC-MS). The ndings revealed that PAH concentrations in the river surpassed the maximum\r\n permissible limits established by regulatory authorities.', 'Polycyclic aromatic hydrocarbons; Environmental sustainability; Contamination; Orogodo river.', '', '1', '215234715', '965115688', '', 'uploads/published_articles/1764003078_4925.pdf', '2025-11-24 16:51:18', 10),
(53, 23, 'Smart Car Park Management System based on Radio Frequency Identi cation', ' Carbon nanoparticles from Polyethylene Terephthalate (PET) bottles has attracted good atten\r\ntion owing to their exceptional properties such as wide surface area, lower cost, biocompatibility,\r\n cytotoxicity, catalytic properties, drug delivery and biosensing. The processed carbon nanoparticles\r\n from PET bottles, using hydrothermal method possesses an excellent adsorption quality for the\r\n removal of Fe (III) from waste water. The characteristics of the carbon nanoparticles were revealed\r\n using Fourier Transform Infrared Spectrometer (FTIR), Energy Dispersive Spectrometer (EDX),\r\n X-ray Di ractrometry (XRD), Scanning Electron Microscopy (SEM) and Transmission Electron\r\n Microscopy (TEM). The adsorption of Fe (III) from the waste water increases with increase in con\r\ntact time (15min 2 h) and dosage (0.1g- 0.8g). The characterization and application results showed\r\n that carbon nanoparticles from PET bottles synthesized by hydrothermal methods, possesses good\r\n surface chemistry that promote e ective adsorption of Fe (III) from waste water. This makes PET\r\n bottles a viable material for the synthesis of carbon nanoparticles for heavy metals removal from\r\n waste water.', 'RFID, IR sensors, C++, blynk IoT, Arduino IDE', '', '1', '428574125', '353726075', '', 'uploads/published_articles/1764003419_7804.pdf', '2025-11-24 16:57:01', 10),
(51, 23, 'Adsorption of Fe (III) from waste water using carbon nanoparticles obtained from  Polyethylene Terephthalate (PET) waste bottles.', 'Carbon nanoparticles from Polyethylene Terephthalate (PET) bottles has attracted good atten\r\ntion owing to their exceptional properties such as wide surface area, lower cost, biocompatibility,\r\n cytotoxicity, catalytic properties, drug delivery and biosensing. The processed carbon nanoparticles\r\n from PET bottles, using hydrothermal method possesses an excellent adsorption quality for the\r\n removal of Fe (III) from waste water. The characteristics of the carbon nanoparticles were revealed\r\n using Fourier Transform Infrared Spectrometer (FTIR), Energy Dispersive Spectrometer (EDX),\r\n X-ray Di ractrometry (XRD), Scanning Electron Microscopy (SEM) and Transmission Electron\r\n Microscopy (TEM). The adsorption of Fe (III) from the waste water increases with increase in con\r\ntact time (15min 2 h) and dosage (0.1g- 0.8g). The characterization and application results showed\r\n that carbon nanoparticles from PET bottles synthesized by hydrothermal methods, possesses good\r\n surface chemistry that promote e ective adsorption of Fe (III) from waste water. This makes PET\r\n bottles a viable material for the synthesis of carbon nanoparticles for heavy metals removal from\r\n waste water.', 'PET bottles, carbon nanoparticles, waste water, hydrothermal synthesis, adsorption', '', '1', '281240801', '212838988', '', 'uploads/published_articles/1763931652_6119.pdf', '2025-11-23 21:00:54', 10),
(49, 23, 'Evaluation of the Characteristics of Some Niger Delta Crude Oils Using Saturate,  Aromatic, Resin and Aspaltene', ' Source rocks quality is essential by providing information on their kerogen type and organic\r\n matter quality, type of organic matter and characteristics, thermal maturity of the organic matter,\r\n and hydrocarbon type. In order to ascertain the bulk composition of oils, organic matter inputs,\r\n source depositional environment, and thermal maturation in comparison, a geochemical investigation\r\n was conducted on seven crude oil samples (Q, R, S, T, U, V and W) from OML X. Saturates,\r\n Aromatics, Resin, and Asphaltene (SARA) bulk compositions were separated from the crude oil\r\n samples using ASTMD4124-09 test standards. ASTMD5853 was used to measure the pour point\r\n parameter for the ow assurance application, while ASTMD664 was used to measure the total acid\r\n number (TAN). The Wavelength dispersive X-ray uorescence spectrometer (WDXRF) was used\r\n to measure the sulfur concentrations in accordance with ASTMD2622 guidelines. Using saturates\r\n extracts in selected ion monitoring (SIM), Gas chromatography- mass spectrometry (GC-MS) and\r\n Gas Chromatography- Flame Ionization Detection (GC-FID) were used to evaluate the biomarkers in\r\n accordance with ASTMD7169. The API values were between 10.90 and 16.10. The range of sulphur\r\n concentration in the crude oils showed that Q crude recorded the highest concentration, while S\r\n crude was found to be the least in concentration. The Saturates/Aromatic ratio for the crude ranges\r\n from 1.15 to 4.38, With W crude having the highest concentration and U crude having the lowest\r\n concentration. All seven oil wells produced para nic, undegraded (non-biodegraded) crude oil. The\r\n findings demonstrated that all of the crude oil samples were heavy crude and they came from source\r\n rocks that include type I and type II kerogen from a marine agal source which had been deposited\r\n in an anoxic environment. The seven crude oil samples that were chosen from the oil wells were all\r\n mature, with some displaying a higher level of maturity than the others, according to the biomarker\r\n metrics CPI, Pr/Ph ratio, Pr/n-C17, Ph/n-C18, TAR, etc. utilized for maturity indices.. Since the\r\n crudes are para nic, non-biodegraded and their features unchanged, we can reconstitute the nature\r\n of the source rock using the crude oil.', 'Mining, oil elds, SARA and biodegradation', '', '1', '936498096', '484169243', '', 'uploads/published_articles/1763927327_2956.pdf', '2025-11-23 19:48:49', 10),
(50, 23, 'Investigating the optoelectronic properties of silver-doped zirconium sul de  nanostructures synthesized via electrochemical deposition', ' This study primarily focuses on investigating a nanostructured material synthesized through the\r\n electrochemical deposition of zirconium sul de (ZrS) doped with silver (Ag). The study focuses on\r\n understanding the inuence of silver doping on the structural, optical, and electrical characteristics\r\n of ZrS nanostructures to enhance their potential for optoelectronic applications. The nanostructures\r\n were fabricated using a controlled electrochemical deposition technique, followed by structural char\r\nacterization through X-ray di raction (XRD) and scanning electron microscopy (SEM). ', ' bandgap energy; zirconium, silver, metals, semiconductors, temperature;', '', '1', '193308871', '362473931', '', 'uploads/published_articles/1763927782_7674.pdf', '2025-11-23 19:56:24', 10),
(48, 23, 'Design and Simulation of a Fuzzy Logic-based Washing Machine System for Visually  Impaired Users', ' This paper presents the design and simulation of a Fuzzy Logic-based washing machine system\r\n tailored for visually impaired users. Visually impaired individuals often face challenges operating\r\n conventional washing machines due to the lack of accessible interfaces. To address this, a dual-mode\r\n Fuzzy Logic control system was developed and simulated, o ering both automatic and custom\r\n washing options. The system integrates two Fuzzy Logic controllers for enhanced exibility and\r\n control. Simulation and system logic were implemented using MATLABs Fuzzy Logic Toolbox for\r\n modeling and Python for programmatic control. Key accessibility features include comprehensive\r\n audio feedback, ashing indicator buttons, tactile markings, and a simple, high-contrast physical\r\n layout. The system adheres to the guidelines set by the Research Institute for Disabled Customers\r\n (RIDC), aiming to make automated laundry services inclusive. Preliminary simulations indicate\r\n e ective customization of water intake, detergent use, spin speed, and drying time based on user or\r\n sensor input, suggesting high usability for visually impaired users.', 'Washing Machine, Visually Impaired, Fuzzy Logic, MATLAB, Python', '', '1', '800194444', '511169550', '', 'uploads/published_articles/1763926233_3417.pdf', '2025-11-23 19:30:35', 10),
(47, 23, 'Waste Generation and Management Practices in Construction Industries in Nigeria-A  case study of Cakasa Nigeria Company', ' This study focuses on the practice of waste management in the construction industry in Nigeria,\r\n using a case study of Cakasa Nigeria Company during the construction of a tank farm from 2019\r\n2022. The study analyzed waste data from consignment notes and found that metal waste (4370kg)\r\n was the most generated waste material on site, followed by concrete and bricks (3973 kg), timber\r\n (2850kg), masonry and plasterboard (2595 kg), and paper waste (1621 kg). Oil rags (16 kg) were the\r\n least generated waste. The factors inuencing material waste production during construction were\r\n identi ed as design changes, theft and vandalism, poor site conditions, poor waste minimization\r\n strategy, poor procurement management, poor materials handling on site, and poor implementation\r\n of waste management plan. Measures to minimize construction material waste included proper site\r\n supervision and management techniques, adequate material storage, sta training and awareness,\r\n and proper procurement management.', 'Construction, waste management, metal waste, procurement plan, environmental sustainability.', '', '1', '466498666', '707717806', '', 'uploads/published_articles/1763925625_3090.pdf', '2025-11-23 19:20:25', 10),
(45, 23, 'SEMAEco-IoT: A Secured IoT-based Smart Energy Monitor and Alert for Enhanced  Energy Conservation and Optimization', ' Today, there is a global demand for e cient energy consumption utilizing energy- t management\r\n solutions that are poised to deliver sustainable living practices with reduced consumption of en\r\nergy therein. These in their own right- have also continued to raise germane concern tailored at\r\n environmental, health and consumption regulations to yield global concern and priorities targeted\r\n at replacing traditional solutions with (alternate) intelligent, optimized models and strategies. Our\r\n study presents SEMAEco-IoT designed with the microcontroller ESP and sensor to observe en\r\nvironmental conditions and energy consumption by home appliances. It utilizes machine learning\r\n algorithm to analyze total energy consumed by each appliance and delivers optimal consumption\r\n that reduces energy waste. The system tested across multiple parameters yields e ectiveness,\r\n reliability, and e ciency. Our use of ESP8266 and ThingSpeak is able to handle expansive inputs\r\n without signi cant delays or data losses. Results a rm its capability to maintain stable performance\r\n even with more device connected', 'Intrusion. DoS, Transfer Learning, Korhonen Neural Net, Genetic Algorithm', '', '1', '590007947', '367106422', '', 'uploads/published_articles/1763924270_5089.pdf', '2025-11-23 18:57:52', 10),
(46, 23, 'Uniaxial and Biaxial Strain E ect on the Bandgap of Semiconducting  Two-Dimensional TMDCS- A Review', ' Transition metal dichalcogenides (TMDCS) represent a large family of crystalline materials ar\r\nranged in layers, which are essentially composed of transition metals and chalcogens with chemical\r\n bonds within the layers. Many of the band gaps of these materials can be tuned to transition from\r\n indirect band gap semiconductors in bulk crystals to direct band gap semiconductors in monolayer\r\n nanosheets. This paper reviews the band gaps of two-dimensional (2D)-TMDCS materials, focus\r\ning on how uniaxial and biaxial strain can enhance the band gap and modify the electronic and\r\n optical properties of the material. The result observed proved that strain fundamentally changes\r\n the electronic and optical properties of these 2D-TMDCS, causes a phase transition, and changes\r\n semiconducting 2D TMDCS from semiconducting to metallic and vice versa. Bandgap modulation\r\n through tensile or compressive strains alters the optical spectra of the material by shifting the exci\r\ntonic peaks and the exciton binding energy, thereby inuencing the photoluminescence intensity and\r\n wavelength of 2D TMDCS. The experimental results are cross-veri ed with theoretical predictions\r\n and ab initio calculations executed based on the density functional theory (DFT). The bandgaps\r\n of 2D-TMDCS are more e ectively a ected by biaxial strain. When it comes to tuning the elec\r\ntronic and optical properties, strain engineering has proven to be a versatile, e ective, and e cient\r\n approach', 'TMDCs, Uniaxial strain, Biaxial strain, Bandgap Engineering', '', '1', '777033498', '650438885', '', 'uploads/published_articles/1763925005_9536.pdf', '2025-11-23 19:10:06', 10),
(44, 23, 'Analysis of the e ects of fuel hike on transport operations on mobility of goods and  services in Oyo state', ' Fuel price hikes have a signi cant impact on a countrys economic development because they a ect\r\n travel patterns, freight and service travel, and the cost of operating public transportation, which\r\n a ects things like road tolls, car maintenance, and mobility costs. This study looks at how fuel\r\n price hikes a ect Ibadans public transport operators and how the citys transportation system is\r\n a ected by fuel prices. A study involving 286 respondents from ten automobile parks in Ibadan found\r\n that most respondents (29.7%) reported high mobility expenses, with customer satisfaction second\r\n (26.6%). Fuel price increases can lead to higher freight or service mobility costs, as fuel prices increase\r\n the cost of public transportation. A regression analysis showed a signi cant correlation between\r\n fuel price increases and public transportation operations in Ibadan.According to the report, rising\r\n gasoline prices have a direct impact on in ation and discourage people from taking public transit.\r\n According to the ndings, in order to lower in ation, the government should create an intervention\r\n program to discourage fuel hoarding among fuel marketers', ' Washing Machine, Visually Impaired, Fuzzy Logic, MATLAB, Python', '', '1', '775530862', '690085084', '', 'uploads/published_articles/1763923763_3339.pdf', '2025-11-23 18:49:27', 10),
(43, 23, 'Investigating Intrusion Detection Using a Culturally-Inspired Genetic Algorithm Trained Neural Network Ensemble', 'Internet\'s popularity alongside proliferation of smartphones as mode of data exchange for busi-\r\nnesses as a great strategy for information sharing amongst users on a private company network.\r\nIt has consequently also, attracted adversaries with proliferation of attacks to exploit unsuspecting\r\nusers of resources for personal gain. Adversaries utilize socially-engineering attacks, to breach and\r\ngain unauthorized access to a compromised user device via subterfuge mode that can also deny such\r\nusers of access to resources on a network. With denial-of-service carefully crafted to wreak havoc\r\non network infrastructures, it has since become expedient to explore deep learning mode to predict\r\nsuch cases performance. We explore a scheme to eectively distinguish between genuine and mali-\r\ncious packets; And benchmarks our results using XGB, Random Forest, and Decision Tree. Result\r\nshows that our model yields F1 0.9945 that outperforms XGB, RF and DT with F1 of (0.9925,\r\n0.9881 and 0.9805). Its Accuracy of 0.9984 outperforms XGB, RF, and DT with (0.9981, 0.9964 and\r\n0.9815) respectively). Our model correctly classied 13,418 cases with 99.84% Accuracy with 283\r\ncases incorrectly classied. Thus, model eectively dierentiates genuine from malicious packets.', 'Intrusion. DoS, Transfer Learning, Korhonen Neural Net, Genetic Algorithm', '', '1', '554249096', '991819145', '', 'uploads/published_articles/1763920433_6935.pdf', '2025-11-23 17:53:54', 10),
(42, 23, 'Occurrence, potential risks and sources of BTEX in sediment of the Okpare creek, Niger Delta Nigeria', 'Benzene Toluene, Ethylbenzene and Xylene (BTEX) often enter the aquatic ecosystem due to\r\naccidental oil spills, leakage and improper oil-related waste disposals. Toxicity studies in the aquatic\r\necosystem have shown that BTEX have adverse eects on aquatic biota and humans. Therefore,\r\nthis study was conducted to examine the concentrations, potential risks and sources of BTEX in\r\nsediments of the Okpare creek in the Niger Delta of Nigeria. The\r\nP\r\nBTEX concentrations in the\r\nsediment ranged from 1.14 to 4.96 mg/kg. On average, toluene was predominant in the sediment.\r\nThe upstream section of the Okpare creek had higher average concentrations of\r\nP\r\nBTEX than\r\nthe mid- and downstream sections. The concentration of BTEX in the sediment were above the\r\nNigerian Upstream Petroleum Regulatory Commission (NUPRC) target values. The values of the\r\nhazard index due to human exposure to the BTEX in the sediments were < 1 which indicated the\r\nabsence of non-carcinogenic risk from BTEX exposure in the sediments. Moreover, the total cancer\r\nrisk values were less than 1  10ô€€€6 also suggesting that there is the absence of carcinogenic risk to\r\nhumans exposed to the BTEX in the sediments from the Okpare creek. The source identication\r\nindicated that the sources of BTEX in the creek were stationary sources like paints, solvents, gasoline\r\nand diesel spillage.', 'Occurrence, potential risks and sources of BTEX in sediment of the Okpare creek, Niger Delta Nigeria', '', '1', '158251720', '535859358', '', 'uploads/published_articles/1763920176_8522.pdf', '2025-11-23 17:49:37', 10),
(57, 23, 'Batch adsorption study of Iron (Fe3+) removal from industrial wastewater using  activated biochar', ' The persistent problem of industrial e uents causing heavy metal pollution in Nigerias ground\r\n and surface waters has been a longstanding concern. To create inexpensive adsorbents that can\r\n remove heavy metals from wastewater, this study looks into using activated bamboos biochar as\r\n a precursor. The objective of this study is to investigate the impact of variables (contact time,\r\n adsorbent dosage) on the adsorption e ciency of activated biochar in heavy metal removal from\r\n industrial wastewater. Utilising FTIR, SEM, and BET, the adsorbent was characterised. Atomic\r\n Absorption Spectrophotometry was used to analyse metallic elements. ', 'Adsorption, kinetics, activated biochar, bamboo, wastewater.', '', '1', '754094653', '247537735', '', 'uploads/published_articles/1764005171_5297.pdf', '2025-11-24 17:26:12', 10);

-- --------------------------------------------------------

--
-- Table structure for table `reviewers`
--

CREATE TABLE `reviewers` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_code` varchar(10) DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL,
  `affiliation` varchar(255) NOT NULL,
  `orcid` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `verification_token` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email_verified` tinyint(1) DEFAULT 0,
  `reset_token` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `reviewers`
--

INSERT INTO `reviewers` (`id`, `full_name`, `email`, `phone_code`, `phone_number`, `affiliation`, `orcid`, `password`, `verification_token`, `created_at`, `email_verified`, `reset_token`) VALUES
(10, 'FUPRE JP', 'fuprecos@fuprecosjournals.org', '+234', '123456789', 'FUPRE', '', '$2y$10$sS57hUbKKp16zmOfQrcPF.HJPKpBwmlbYbPokl.cbk7.EQsW3bmiq', NULL, '2025-11-23 17:39:17', 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conference_registrations`
--
ALTER TABLE `conference_registrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `editors`
--
ALTER TABLE `editors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `manuscripts`
--
ALTER TABLE `manuscripts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `article_code` (`article_code`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviewers`
--
ALTER TABLE `reviewers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `conference_registrations`
--
ALTER TABLE `conference_registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `editors`
--
ALTER TABLE `editors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `manuscripts`
--
ALTER TABLE `manuscripts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `publications`
--
ALTER TABLE `publications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `reviewers`
--
ALTER TABLE `reviewers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
