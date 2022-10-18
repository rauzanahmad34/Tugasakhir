/*
 Navicat Premium Data Transfer

 Source Server         : aplikasi_rauzan_pakar
 Source Server Type    : MySQL
 Source Server Version : 50739
 Source Host           : newdemo.aplikasiskripsi.com:3306
 Source Schema         : aplikasi_rauzan_pakar

 Target Server Type    : MySQL
 Target Server Version : 50739
 File Encoding         : 65001

 Date: 07/09/2022 15:10:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pertanyaan_keamanan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `jawaban` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'Administrator', 'admin', '$2b$12$p9p6RvrDfBbQD0T9cLcMyOK91iVqYWpGWjXntpPcmyFKUZXdJNuUO', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `admin` VALUES (2, 'abc', 'admin', '$2b$12$X4.mWfYFX5SCds/1AiPizux83OmClgBmRgDK2DFP2v7vQN1rTHbJO', NULL, NULL, '2022-08-08 06:47:07', '2022-08-08 06:47:14', '2022-08-08 06:47:14');

-- ----------------------------
-- Table structure for gejala
-- ----------------------------
DROP TABLE IF EXISTS `gejala`;
CREATE TABLE `gejala`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode_gejala` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nama_gejala` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nilai` float NULL DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gejala
-- ----------------------------
INSERT INTO `gejala` VALUES (3, 'G01', 'Apakah anda takut atau cemas yang nyata tentang satu atau lebih situasi sosial di mana individu kemungkinan terpapar pengawasan oleh orang lain. Contohnya interaksi sosial, merasa diawasi, dan tampil didepan orang lain', 0.8, '2022-07-15 06:21:37', '2022-09-07 03:00:30', NULL);
INSERT INTO `gejala` VALUES (4, 'G02', 'Apakah anda takut bahwa anda akan bertindak dengan cara atau menunjukkan gejala kecemasan yang akan dievaluasi secara negatif (akan memalukan atau menyebabkan penolakan dan menyinggung orang lain).', 0.6, '2022-07-15 06:21:48', '2022-09-07 03:02:21', NULL);
INSERT INTO `gejala` VALUES (5, 'G03', 'Apakah anda mengalami situasi sosial yang menyebabkan ketakutan atau kecemasan setiap hari.', 0.6, '2022-07-15 06:22:00', '2022-09-07 03:02:40', NULL);
INSERT INTO `gejala` VALUES (6, 'G04', 'Apakah anda sering menghindari interaksi sosial karena kecemasan yang berlebihan.', 0.4, '2022-07-15 06:22:20', '2022-09-07 03:03:11', NULL);
INSERT INTO `gejala` VALUES (7, 'G05', 'Apakah anda mengalami ketakutan, kecemasan, atau penghindaran menyebabkan penderitaan yang signifikan secara klinis atau gangguan dalam fungsi sosial, pekerjaan, atau fungsi penting lainnya.', 0.6, '2022-07-15 06:22:32', '2022-09-07 03:03:50', NULL);
INSERT INTO `gejala` VALUES (8, 'G06', 'Apakah ketakutan, kecemasan, atau penghindaran terus-menerus, biasanya berlangsung selama 6 bulan atau lebih.', 0.3, '2022-07-15 06:23:00', '2022-09-07 03:05:01', NULL);
INSERT INTO `gejala` VALUES (9, 'G07', 'Apakah anda mengalami penurunan atau kenaikan berat badan ( Perubahan lebih dari 5% dari berat badan selama 1 bulan)', 0.2, '2022-08-25 06:28:26', '2022-09-07 03:05:30', NULL);

-- ----------------------------
-- Table structure for hasil_analisa
-- ----------------------------
DROP TABLE IF EXISTS `hasil_analisa`;
CREATE TABLE `hasil_analisa`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `kode_penyakit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `percentage` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hasil_analisa
-- ----------------------------
INSERT INTO `hasil_analisa` VALUES (1, 1, 'abc', 'P1', '1.7083', '2022-08-08 07:09:22', '2022-08-08 07:09:22', NULL);
INSERT INTO `hasil_analisa` VALUES (2, 1, 'xyz', 'P2', '0.68827', '2022-08-08 07:09:32', '2022-08-08 07:09:32', NULL);
INSERT INTO `hasil_analisa` VALUES (3, 2, 'Bambangkun', 'P2', '0.98163', '2022-08-09 07:13:50', '2022-08-09 07:13:50', NULL);
INSERT INTO `hasil_analisa` VALUES (4, 2, 'Bambangkun', 'P2', '0.98163', '2022-08-12 07:11:13', '2022-08-12 07:11:13', NULL);
INSERT INTO `hasil_analisa` VALUES (5, 3, 'Arkana', 'P1', '3.15529', '2022-08-19 04:04:24', '2022-08-19 04:04:24', NULL);
INSERT INTO `hasil_analisa` VALUES (6, 3, 'Arkana', 'P1', '1.44051', '2022-08-19 04:15:32', '2022-08-19 04:15:32', NULL);
INSERT INTO `hasil_analisa` VALUES (7, 4, 'Rauzan', 'P1', '1.34036', '2022-08-22 02:28:18', '2022-08-22 02:28:18', NULL);
INSERT INTO `hasil_analisa` VALUES (8, 4, 'Rauzan', 'P1', '1.99409', '2022-08-22 02:30:14', '2022-08-22 02:30:14', NULL);
INSERT INTO `hasil_analisa` VALUES (9, 4, 'Rauzan', 'P1', '0.70837', '2022-08-25 05:51:27', '2022-08-25 05:51:27', NULL);
INSERT INTO `hasil_analisa` VALUES (10, 4, 'Rauzan', 'P1', '2.125', '2022-08-25 05:51:42', '2022-08-25 05:51:42', NULL);
INSERT INTO `hasil_analisa` VALUES (11, 4, 'Rauzan', 'P2', '0.68827', '2022-08-25 05:52:13', '2022-08-25 05:52:13', NULL);
INSERT INTO `hasil_analisa` VALUES (12, 5, 'user_tes1', 'P2', '0.72022', '2022-08-25 06:28:50', '2022-08-25 06:28:50', NULL);
INSERT INTO `hasil_analisa` VALUES (13, 5, 'user_tes1', 'P2', '1.5138', '2022-08-25 06:31:22', '2022-08-25 06:31:22', NULL);
INSERT INTO `hasil_analisa` VALUES (14, 4, 'Rauzan', 'P1', '0.53124', '2022-09-06 17:50:19', '2022-09-06 17:50:19', NULL);
INSERT INTO `hasil_analisa` VALUES (15, 4, 'Rauzan', 'P1', '1.90271', '2022-09-06 18:18:09', '2022-09-06 18:18:09', NULL);
INSERT INTO `hasil_analisa` VALUES (16, 4, 'Rauzan', 'P1', '1.96593', '2022-09-07 03:08:14', '2022-09-07 03:08:14', NULL);

-- ----------------------------
-- Table structure for penyakit
-- ----------------------------
DROP TABLE IF EXISTS `penyakit`;
CREATE TABLE `penyakit`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode_penyakit` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nama_penyakit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `penyebab` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `solusi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of penyakit
-- ----------------------------
INSERT INTO `penyakit` VALUES (12, 'P1', 'Social Anxiety Disorder', 'Anxiety Disorder ada dari faktor keturunan,  Struktur otak yang disebut amigdala yang mana jika amygdala otak terlalu aktif yang kemudian merespon terhadap rasa takut yang kemudian menyebabkan kecemasan yang berlebih,  dan yang terkahir adalah faktor lingkungan yang terbentuk akibat pola asuh orangtua yang terlalu mengontrol dan protektif yang kemudian menimbulkan perasaan khawatir terhadap diri sendiri.', 'Dapat dilakukan Psikoterapi, Psikoterapi yang dapat dilakukan adalah CBT. Support Group dapat dilakukan untuk penderita Social Anxiety Disorder yang mana nantinya penderita memiliki suatu grup yang dapat menerima penilaian yang jujur untuk dirinya. Disini penderita dapat mempelajari bagaimana orang lain yang memilki keadaan yang sama menghadapi berbai situasi sosial yang sebelumnya ditakuti. Pengunaan obat obatan mungkin dapat menjadi pilihan tetapi harus dalam pengawasan dokter seperti obat antidepresan.', '2022-07-15 06:13:07', '2022-09-06 18:19:05', NULL);
INSERT INTO `penyakit` VALUES (13, 'P2', 'Major Depressive Disorder', 'Penyebab dari Major Depressive Disorder banyak pemicunya seperti stress yang berlebih yang dialami seperti kematian orang yang dicintai ataupun yang disayangi, stress tempat kerja, dan hancurnya sebuah hubungan. Faktor keturunan bisa juga penyebab dari Major Depressive Disorder. Dan orang dengan rasa percaya diri yang sering menyalahkan diri sendiri cenderung mengalami khawatir yang berlebih sehingga mengakibatkan Depresi yang berat', 'Penanganan untuk pengidap Major Depressive Disorder bisa menggunakan obat obatan tertentu yang dan menjumpai dokter yang akan memberikan rujukan yang tepat antara harus menemui Psikolog atau Psikiater.', '2022-07-15 06:20:53', '2022-09-06 18:19:25', NULL);
INSERT INTO `penyakit` VALUES (14, 'P3', 'Agoraphobia', 'Agoraphobia disebabkan dari tekanan lingkungan yang berperan menyebabkan agoraphobia. Agoraphobia berkembang ketika pengidap mengalami peristiwa seperti pelecehan, pernah diserang. Orang orang yang mengidap Agoraphobia sangat membatasi aktivitas dirinya sendiri. Jika sudah ke tahap akut pengidap tidak akan mau meniggalkan rumahnya karena takut dan trauma', 'Penyebuhan pengidap Agoraphobia adalah menemui dokter yang akan memberikan rujukan yang tepat untuk menemui Psikolog atau Psikiater. Kemungkinan obat obatan akan diperlukan seperti Antidepresan seperti fluoxetine. Untuk pengobatan dirumah dapat menghindari alkohol dan batasi jumlah kafein. Dan belajar menenangkan diri seperti meditasi. Untuk berpergian keluar rumah bisa minta bantuan keluarga atau kerabat sekaligus juga berlatih mengatasi rasa takut.', '2022-07-19 07:38:06', '2022-09-06 18:19:46', NULL);
INSERT INTO `penyakit` VALUES (15, 'P4', 'Post Traumatic Stress Disorder', 'Gangguan PTSD berkembang ketika seseorang mengalami peristiwa yang sangat menegangkan, menakutkan, menyedihkan yang kemudian berkembang.', 'Penderita dapat melakukan Psikoterapi seperti Terapi Kognitf atau Terapi Paparan. Obat obatan mungkin diperlukan untuk mengobati PTSD. Obat obat yang diperlukan mungkin berupa Antidepresan dan Prazosin tetapi dianjurkan dengan pengawasan ahlinya.', '2022-09-06 18:14:49', '2022-09-06 18:20:04', NULL);
INSERT INTO `penyakit` VALUES (16, 'P5', 'Panic Disorder', 'Panic Disorder bisa terjadi karena faktor genetik yang diturunkan dari anggota keluarga. Penilitian menyatakn bahwa pengidap memiliki kekeliruan dalam mengartikan sensasi tubuh yang sebenarnya tidak membahayakan tetapi tubuh menganngap itu adalah sebuah ancaman. ', 'Penderita dapat melakukan Psikoterapi seperti Terapi Kognitf atau Terapi Paparan. Obat obatan mungkin diperlukan untuk mengobati PTSD. Obat obat yang diperlukan mungkin berupa Antidepresan dan Prazosin tetapi dianjurkan dengan pengawasan ahlinya.', '2022-09-06 18:15:52', '2022-09-06 18:20:22', NULL);

-- ----------------------------
-- Table structure for rules
-- ----------------------------
DROP TABLE IF EXISTS `rules`;
CREATE TABLE `rules`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gejala_id` int(11) NULL DEFAULT NULL,
  `penyakit_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rules
-- ----------------------------
INSERT INTO `rules` VALUES (1, 3, 12, '2022-07-18 03:15:26', '2022-07-18 03:41:03', NULL);
INSERT INTO `rules` VALUES (2, 4, 12, '2022-07-18 03:20:37', '2022-07-18 03:20:37', NULL);
INSERT INTO `rules` VALUES (3, 5, 12, '2022-07-18 03:20:43', '2022-07-18 03:20:43', NULL);
INSERT INTO `rules` VALUES (4, 6, 13, '2022-07-18 03:20:50', '2022-07-18 03:20:50', NULL);
INSERT INTO `rules` VALUES (5, 7, 13, '2022-07-18 03:20:57', '2022-07-18 03:20:57', NULL);
INSERT INTO `rules` VALUES (6, 8, 13, '2022-07-18 03:21:03', '2022-07-18 03:21:03', NULL);
INSERT INTO `rules` VALUES (7, 5, 14, '2022-07-19 07:38:14', '2022-07-19 07:38:14', NULL);
INSERT INTO `rules` VALUES (8, 8, 14, '2022-07-19 07:38:22', '2022-07-19 07:38:22', NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'ira', '123456789', 'ira@gmail.com', '$2b$12$cIE2PYq.8PyVCgC0eS.k.OCCrS02yUrK58n09Tj0GIgn5eRrUS2am', '2022-08-08 04:41:55', '2022-08-08 04:41:55', NULL);
INSERT INTO `users` VALUES (2, 'Bambang', '123456789', 'bambangkun2021@gmail.com', '$2b$12$UNPjeo5b0NINf27tftZHc.QuUQXXbSwpZeibh0wUYlGdJwGzcRorK', '2022-08-09 07:11:50', '2022-08-09 07:11:50', NULL);
INSERT INTO `users` VALUES (3, 'Arkana', '0854744', 'arkana@gmail.com', '$2b$12$X3b0OS1TG610Fv2jb8RQ5.H/4I4JOK2RJeJ3.YGGQa2amr27U5U4a', '2022-08-11 09:56:29', '2022-08-11 09:56:29', NULL);
INSERT INTO `users` VALUES (4, 'Rauzan', '081361139642', 'rauzanahmad34@gmail.com', '$2b$12$ZYDIRVVLAiBjwFixDEj6AuFj68n5S93/CPMeSLeZ7tRW5nIpVjV02', '2022-08-22 02:27:24', '2022-08-22 02:27:24', NULL);
INSERT INTO `users` VALUES (5, 'user_tes1', '03494949', 'user1@gmail.com', '$2b$12$Ai2YQJysqPco1Q.UdP9aJOXddzhPY1No4P1DR6nZanQZPqcpJO/Ae', '2022-08-25 06:22:37', '2022-08-25 06:22:37', NULL);
INSERT INTO `users` VALUES (6, 'Rauzan', '12313', 'rafa@gmai.com', '$2b$12$7bY7wAHEzcpU.PDrEZI6rOmHN8oH6ZETlGLl0myONlXEgIVF3XKXu', '2022-09-06 17:51:29', '2022-09-06 17:51:29', NULL);

SET FOREIGN_KEY_CHECKS = 1;
