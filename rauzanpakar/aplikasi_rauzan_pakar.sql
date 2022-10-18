/*
 Navicat Premium Data Transfer

 Source Server         : aplikasi_rauzan_pakar
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : newdemo.aplikasiskripsi.com:3306
 Source Schema         : aplikasi_rauzan_pakar

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 17/10/2022 10:00:54
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
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'Administrator', 'admin', '$2b$12$p9p6RvrDfBbQD0T9cLcMyOK91iVqYWpGWjXntpPcmyFKUZXdJNuUO', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `admin` VALUES (2, 'abc', 'admin', '$2b$12$X4.mWfYFX5SCds/1AiPizux83OmClgBmRgDK2DFP2v7vQN1rTHbJO', NULL, NULL, '2022-08-08 06:47:07', '2022-08-08 06:47:14', '2022-08-08 06:47:14');

-- ----------------------------
-- Table structure for berita
-- ----------------------------
DROP TABLE IF EXISTS `berita`;
CREATE TABLE `berita`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of berita
-- ----------------------------
INSERT INTO `berita` VALUES (1, 'zxczxJudul ABC', 'Isi nya Begini ASD', '2022-10-11 09:57:04', '2022-10-16 12:52:43', '2022-10-16 12:52:43');
INSERT INTO `berita` VALUES (2, 'ads', 'ad', '2022-10-15 08:19:32', '2022-10-16 12:52:45', '2022-10-16 12:52:45');
INSERT INTO `berita` VALUES (3, 'Memahami Kesehatan Mental dan Cara Menjaganya', 'Setiap orang memiliki kesehatan mental - seperti halnya kesehatan fisik, kita perlu menjaga dan memeliharanya. Menurut Organisasi Kesehatan Dunia (WHO), kesehatan mental adalah keadaan sejahtera di mana setiap individu bisa mewujudkan potensi mereka sendi', '2022-10-16 12:53:16', '2022-10-16 13:08:32', NULL);
INSERT INTO `berita` VALUES (4, 'Hari Kesehatan Jiwa Sedunia Tahun 2022, Kesehatan Mental Penting untuk Diperhatikan', 'Kesehatan mental merupakan hal yang penting untuk diperhatikan, termasuk membangun kesadaran akan pentingnya membangun mental yang kuat dan sehat. Sehingga, tanggal 10 Oktober ditetapkan sebagai Hari Kesehatan Mental Sedunia atau Hari Kesehatan Jiwa Sedun', '2022-10-16 14:39:21', '2022-10-16 14:39:21', NULL);
INSERT INTO `berita` VALUES (5, 'Memahami Apa Itu Kesehatan Mental Hingga Cara Menjaganya', 'Kesehatan mental mungkin kerap luput dari perhatian. Padahal, kondisi mental yang sehat menjadi salah satu kunci untuk menjaga kesehatan tubuh serta terhindar dari berbagai penyakit. Namun, apakah Anda sudah memahami apa itu kesehatan mental? Untuk lebih ', '2022-10-16 14:40:00', '2022-10-16 14:40:00', NULL);

-- ----------------------------
-- Table structure for gejala
-- ----------------------------
DROP TABLE IF EXISTS `gejala`;
CREATE TABLE `gejala`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kode_gejala` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nama_gejala` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nilai` float NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gejala
-- ----------------------------
INSERT INTO `gejala` VALUES (3, 'G01', 'Gejala A', 0.6, '2022-07-15 06:21:37', '2022-10-16 12:16:55', '2022-10-16 12:16:55');
INSERT INTO `gejala` VALUES (4, 'G02', 'Gejala B', 0.2, '2022-07-15 06:21:48', '2022-10-16 12:16:57', '2022-10-16 12:16:57');
INSERT INTO `gejala` VALUES (5, 'G03', 'Gejala C', 0.4, '2022-07-15 06:22:00', '2022-10-16 12:16:58', '2022-10-16 12:16:58');
INSERT INTO `gejala` VALUES (6, 'G04', 'Gejala D', 0.2, '2022-07-15 06:22:20', '2022-10-16 12:17:00', '2022-10-16 12:17:00');
INSERT INTO `gejala` VALUES (7, 'G05', 'Gejala E', 0.4, '2022-07-15 06:22:32', '2022-10-16 12:17:08', '2022-10-16 12:17:08');
INSERT INTO `gejala` VALUES (8, 'G06', 'Gejala F', 0.8, '2022-07-15 06:23:00', '2022-10-15 11:56:42', '2022-10-15 11:56:42');
INSERT INTO `gejala` VALUES (9, 'G1', 'Apakah anda mengalami ketakutan atau kecemasan yang nyata tentang satu atau lebih situasi sosial di mana individu terpapar kemungkinan pengawasan oleh orang lain. Seperti melakukan percakapan, bertemu orang yang tidak dikenal, dan bicara di depan orang.', 0.6, '2022-10-16 12:33:27', '2022-10-16 14:25:45', NULL);
INSERT INTO `gejala` VALUES (10, 'G2', 'Anda takut bahwa anda akan menunjukkan gejala kecemasan yang akan dievaluasi secara negatif (akan memalukan atau menyebabkan penolakan dan menyinggung orang lain).', 0.6, '2022-10-16 12:33:48', '2022-10-16 12:33:48', NULL);
INSERT INTO `gejala` VALUES (11, 'G3', 'Apakah anda mengalami Situasi sosial yang menyebabkan ketakutan atau kecemasan setiap hari.', 0.6, '2022-10-16 12:34:17', '2022-10-16 12:34:17', NULL);
INSERT INTO `gejala` VALUES (12, 'G4', 'Apakah anda sering menghindari interaksi sosial karena kecemasan yang berlebihan.', 0.4, '2022-10-16 12:34:34', '2022-10-16 12:34:34', NULL);
INSERT INTO `gejala` VALUES (13, 'G5', 'Apakah anda mengalami ketakutan, kecemasan, atau penghindaran menyebabkan gangguan dalam fungsi sosial, pekerjaan, atau fungsi penting lainnya.', 0.6, '2022-10-16 12:34:52', '2022-10-16 12:34:52', NULL);
INSERT INTO `gejala` VALUES (14, 'G6', 'Apakah anda mengalami ketakutan, kecemasan, atau penghindaran terus-menerus, biasanya berlangsung selama 6 bulan atau lebih.', 0.4, '2022-10-16 12:35:08', '2022-10-16 12:35:08', NULL);
INSERT INTO `gejala` VALUES (15, 'G7', 'Apakah anda mengalami kenaikan atau penurunan berat badan ( Perubahan lebih dari 5% dari berat badan selama 1 bulan)', 0.4, '2022-10-16 12:35:27', '2022-10-16 12:35:27', NULL);
INSERT INTO `gejala` VALUES (16, 'G8', 'Apakah anda mengalami Insomnia atau Hipersomnia hampir setiap hari.', 0.4, '2022-10-16 12:35:46', '2022-10-16 12:35:46', NULL);
INSERT INTO `gejala` VALUES (17, 'G9', 'Apakah anda merasa kelelahan atau kehabisan energi hampir setiap hari', 0.4, '2022-10-16 12:37:40', '2022-10-16 12:37:40', NULL);
INSERT INTO `gejala` VALUES (18, 'G10', 'Apakah anda sulit berkonsentrasi', 0.4, '2022-10-16 12:37:56', '2022-10-16 12:37:56', NULL);
INSERT INTO `gejala` VALUES (19, 'G11', 'Apakah anda mengalami perasaan tidak berharga atau rasa bersalah yang berlebihan atau tidak pantas (yang mungkin bersifat delusi) hampir setiap hari (bukan hanya mencela diri sendiri atau rasa bersalah karena sakit).', 0.8, '2022-10-16 12:38:14', '2022-10-16 12:38:14', NULL);
INSERT INTO `gejala` VALUES (20, 'G12', 'Apakah anda mengalami pikiran kematian yang berulang (bukan hanya ketakutan akan kematian), ide bunuh diri yang berulang tanpa rencana khusus, atau rencana khusus untuk bunuh diri.', 1, '2022-10-16 12:38:37', '2022-10-16 12:38:37', NULL);
INSERT INTO `gejala` VALUES (21, 'G13', 'Apakah anda mengalami kecemasan saat  : Menggunakan transportasi umum, Berada di tempat terbuka (Lapangan Parkir, pasar, jembatan), Berada di tempat tertutup (Bioskop, Teater, Toko), dalam antrian atau dalam keramaian.', 0.8, '2022-10-16 12:38:59', '2022-10-16 14:25:11', NULL);
INSERT INTO `gejala` VALUES (22, 'G14', 'Apakah anda mengalami kecemasan saat berada di suatu lokasi', 0.8, '2022-10-16 12:39:30', '2022-10-16 12:39:30', NULL);
INSERT INTO `gejala` VALUES (23, 'G15', 'Apakah saat melakukan aktivitas membutuhkan kehadiran pendamping.', 0.6, '2022-10-16 12:39:50', '2022-10-16 12:39:50', NULL);
INSERT INTO `gejala` VALUES (24, 'G16', 'Apakah Ketakutan, kecemasan, atau penghindaran terus-menerus, berlangsung 6 bulan atau lebih.', 0.6, '2022-10-16 12:40:16', '2022-10-16 12:40:16', NULL);
INSERT INTO `gejala` VALUES (25, 'G17', 'Apakah anda mengalami mengalami kejadian yang mengancam nyawa, cedera parah, atau kekerasan seksual melalui (salah satu) Pengalaman sendiri atau orang lain yang berefek ke diri sendiri.', 0.8, '2022-10-16 12:40:40', '2022-10-16 12:40:40', NULL);
INSERT INTO `gejala` VALUES (26, 'G18', 'Apakah anda mengalami mengalami gejala intrusi seperti memori yang berulang ulang tanpa disadari. Sering bermimpi buruk baik berkaitan ataupun tidak. Reaksi disosiatif seolah olah kejadian traumatis terjadi lagi. Stress berkepanjangan.', 0.8, '2022-10-16 12:41:01', '2022-10-16 14:23:19', NULL);
INSERT INTO `gejala` VALUES (27, 'G19', 'Apakah anda menghindari pemikiran yang berhubungan dengan kejadian traumatis seperti hal yang mengingatkan dengan kejadian traumatis seperti orang, tempat, aktivitas, dan objek.', 0.6, '2022-10-16 12:41:45', '2022-10-16 12:41:45', NULL);
INSERT INTO `gejala` VALUES (28, 'G20', 'Apakah anda mengalami perubahan suasana hati yang buruk sehingga tidak mampu mengingat kejadian pokok masalah kejadian traumatis. Menganggap semua orang jahat dan diri menganggap diri sendiri adalah sebuah kegagalan.', 0.6, '2022-10-16 12:42:11', '2022-10-16 12:42:11', NULL);
INSERT INTO `gejala` VALUES (29, 'G21', 'Apakah anda mengalami perubahan gairah dan reaktivitas dengan menunjukan perilaku agresif, Perilaku menyiksa diri, Merasa selalu dalam bahaya, Kesulitan berkonsentrasi, dan mengalami Gangguan Tidur', 0.4, '2022-10-16 12:42:31', '2022-10-16 12:42:31', NULL);
INSERT INTO `gejala` VALUES (30, 'G22', 'Mengalami kejadian G18, G19, G20,dan G21 lebih dari 1 bulan', 0.2, '2022-10-16 12:42:55', '2022-10-16 12:42:55', NULL);
INSERT INTO `gejala` VALUES (31, 'G23', 'Apakah anda sulit mengerjakan pekerjaan dan kehidupan sosial?', 0.4, '2022-10-16 12:43:13', '2022-10-16 12:43:13', NULL);
INSERT INTO `gejala` VALUES (32, 'G24', 'Ketika sedang panik, muncul 4 dari gejala-gejala berikut : Jantung berdegup kencang, berkeringat, gemetar, sesak nafas, merasa tercekik, nyeri dada, mual, merasa pusing, menggigil kedinginan atau panas, kebas, merasa seperti dipisahkan dari tubuh', 0.8, '2022-10-16 12:43:33', '2022-10-16 14:22:16', NULL);
INSERT INTO `gejala` VALUES (33, 'G25', 'Mengalami hal berikut :Kekhawatiran yang persisten akan terjadinya kembali serangan atau konsekuensinya (Misalnya serangan jantung) • Timbul perilaku maladaptive yang berhubungan dengan serangan dengan menghindari sesuatu yang tidak familiar', 0.6, '2022-10-16 12:44:04', '2022-10-16 14:21:10', NULL);
INSERT INTO `gejala` VALUES (34, 'G26', 'Apakah gejala-gejala yang timbul bukan akibat efek fisiologis dari penggunaan zat (misalnya NAPZA, obat-obatan) atau akibat kondisi medis lain (misalnya hipertiroid, gangguan jantung paru).', 0.4, '2022-10-16 12:44:21', '2022-10-16 12:44:21', NULL);
INSERT INTO `gejala` VALUES (35, 'G27', 'Apakah gangguan yang timbul tidak bisa dijelaskan oleh adanya gangguan mental lain. Serangan panik yang timbul tidak hanya pada situasi sosial yang menakutkan tetapi sebagai respon terhadap objek yang menjadi sumber fobia.', 0.6, '2022-10-16 12:44:39', '2022-10-16 12:44:39', NULL);

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
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hasil_analisa
-- ----------------------------
INSERT INTO `hasil_analisa` VALUES (1, 1, 'abc', 'P1', '1.7083', '2022-08-08 07:09:22', '2022-08-08 07:09:22', NULL);
INSERT INTO `hasil_analisa` VALUES (2, 1, 'xyz', 'P2', '0.68827', '2022-08-08 07:09:32', '2022-08-08 07:09:32', NULL);
INSERT INTO `hasil_analisa` VALUES (3, 2, 'Bambangkun', 'P2', '0.98163', '2022-08-09 07:13:50', '2022-08-09 07:13:50', NULL);
INSERT INTO `hasil_analisa` VALUES (4, 3, 'Arkan', 'P1', '0.98427', '2022-10-11 10:44:08', '2022-10-11 10:44:08', NULL);
INSERT INTO `hasil_analisa` VALUES (5, 4, 'Rauzan', 'P2', '2.74995', '2022-10-15 08:52:47', '2022-10-15 08:52:47', NULL);
INSERT INTO `hasil_analisa` VALUES (6, 4, 'Rauzan', 'M1', '0.23611', '2022-10-15 12:01:36', '2022-10-15 12:01:36', NULL);
INSERT INTO `hasil_analisa` VALUES (7, 5, 'Rauzan', 'M1', '0.23611', '2022-10-15 12:03:04', '2022-10-15 12:03:04', NULL);
INSERT INTO `hasil_analisa` VALUES (8, 5, 'Rauzan', 'M4', '1.21264', '2022-10-16 14:28:13', '2022-10-16 14:28:13', NULL);

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
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of penyakit
-- ----------------------------
INSERT INTO `penyakit` VALUES (12, 'P1', 'Penyakit A', 'Penyebab A', 'Solusi A', '2022-07-15 06:13:07', '2022-10-15 11:49:57', '2022-10-15 11:49:57');
INSERT INTO `penyakit` VALUES (13, 'P2', 'Penyakit B', 'Penyebab B', 'Solusi B', '2022-07-15 06:20:53', '2022-10-15 11:49:59', '2022-10-15 11:49:59');
INSERT INTO `penyakit` VALUES (14, 'P3', 'Penyakit C', 'Penyebab C', 'Solusi C', '2022-07-19 07:38:06', '2022-10-15 11:50:01', '2022-10-15 11:50:01');
INSERT INTO `penyakit` VALUES (15, 'M1', 'Social Anxiety Disorder', 'Social anxiety disorder atau fobia sosial bisa disebut kecemasan sosial berlebihan. Kamu mengalami ketakutan yang begitu ekstrem dalam suatu situasi sosial yang melibatkan performa tertentu. Ini lebih sering terjadi pada situasi yang benar-benar asing atau kamu merasa akan diawasi dan dinilai oleh orang lain. Anxiety Disorder ada dari faktor keturunan,  Struktur otak yang disebut amigdala yang mana jika amygdala otak terlalu aktif yang kemudian merespon terhadap rasa takut yang kemudian menyebabkan kecemasan yang berlebih,  dan yang terakhir adalah faktor lingkungan yang terbentuk akibat pola asuh orangtua yang terlalu mengontrol dan protektif yang kemudian menimbulkan perasaan khawatir terhadap diri sendiri.', 'Psikoterapi yang dapat dilakukan adalah CBT. Support Group dapat dilakukan untuk penderita Social Anxiety Disorder yang mana nantinya penderita memiliki suatu grup yang dapat menerima penilaian yang jujur untuk dirinya. Disini penderita dapat mempelajari bagaimana orang lain yang memiliki keadaan yang sama menghadapi berbagai situasi sosial yang sebelumnya ditakuti. Penggunaan obat obatan mungkin dapat menjadi pilihan tetapi harus dalam pengawasan dokter seperti obat antidepresan.', '2022-10-15 11:51:50', '2022-10-15 11:51:50', NULL);
INSERT INTO `penyakit` VALUES (16, 'M2', 'Major Depressive Disorder', 'Adalah gangguan mental yang ditandai dengan setidaknya dua minggu mood rendah yang hadir di sebagian besar situasi.banyak pemicunya seperti stress yang berlebih yang dialami seperti kematian orang yang dicintai ataupun yang disayangi, stress tempat kerja, dan hancurnya sebuah hubungan. Faktor keturunan bisa juga penyebab dari Major Depressive Disorder. Dan orang dengan rasa percaya diri yang sering menyalahkan diri sendiri cenderung mengalami khawatir yang berlebih sehingga mengakibatkan Depresi yang berat', 'Major Depressive Disorder bisa menggunakan obat obatan tertentu yang dan menjumpai dokter yang akan memberikan rujukan yang tepat antara harus menemui Psikolog atau Psikiater.', '2022-10-16 12:12:12', '2022-10-16 12:12:12', NULL);
INSERT INTO `penyakit` VALUES (17, 'M3', 'Agoraphobia', 'Agoraphobia disebabkan dari tekanan lingkungan yang berperan menyebabkan agoraphobia. Agoraphobia berkembang ketika pengidap mengalami peristiwa seperti pelecehan, pernah diserang. Orang orang yang mengidap Agoraphobia sangat membatasi aktivitas dirinya sendiri. Jika sudah ke tahap akut pengidap tidak akan mau meninggalkan rumahnya karena takut dan trauma', 'Penyembuhan pengidap Agoraphobia adalah menemui dokter yang akan memberikan rujukan yang tepat untuk menemui Psikolog atau Psikiater. Kemungkinan obat obatan akan diperlukan seperti Antidepresan seperti fluoxetine. Untuk pengobatan dirumah dapat menghindari alkohol dan batasi jumlah kafein. Dan belajar menenangkan diri seperti meditasi. Untuk berpergian keluar rumah bisa minta bantuan keluarga atau kerabat sekaligus juga berlatih mengatasi rasa takut.', '2022-10-16 12:12:56', '2022-10-16 12:12:56', NULL);
INSERT INTO `penyakit` VALUES (18, 'M4', 'Post Traumatic Stress Disorder', 'PTSD merupakan gangguan kecemasan yang membuat penderitanya teringat pada kejadian traumatis. Beberapa peristiwa traumatis yang dapat memicu PTSD adalah perang, kecelakaan, bencana alam, dan pelecehan seksual.Meski demikian, tidak semua orang yang teringat pada kejadian traumatis berarti terserang PTSD. Ada kriteria khusus yang digunakan untuk menentukan apakah seseorang mengalami PTSD.', 'Anda dapat melakukan Psikoterapi seperti Terapi Kognitif atau Terapi Paparan. Obat obatan mungkin diperlukan untuk mengobati PTSD. Obat obat yang diperlukan mungkin berupa Antidepresan dan Prazosin dan harus dengan pengawasan ahlinya.', '2022-10-16 12:15:38', '2022-10-16 12:15:38', NULL);
INSERT INTO `penyakit` VALUES (19, 'M5', 'Panic Disorder', 'Panic Disorder bisa terjadi karena faktor genetik yang diturunkan dari anggota keluarga. Penelitian menyatakan bahwa pengidap memiliki kekeliruan dalam mengartikan sensasi tubuh yang sebenarnya tidak membahayakan tetapi tubuh menganggap itu adalah sebuah ancaman. ', 'Penderita dapat melakukan Psikoterapi seperti Terapi Kognitif atau Terapi Paparan. Obat obatan mungkin diperlukan untuk mengobati PTSD. Obat obat yang diperlukan mungkin berupa Antidepresan dan Prazosin tetapi dianjurkan dengan pengawasan ahlinya.', '2022-10-16 12:16:21', '2022-10-16 12:16:21', NULL);

-- ----------------------------
-- Table structure for rules
-- ----------------------------
DROP TABLE IF EXISTS `rules`;
CREATE TABLE `rules`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gejala_id` int(11) NULL DEFAULT NULL,
  `penyakit_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rules
-- ----------------------------
INSERT INTO `rules` VALUES (1, 3, 12, '2022-07-18 03:15:26', '2022-10-15 11:55:49', '2022-10-15 11:55:49');
INSERT INTO `rules` VALUES (2, 4, 12, '2022-07-18 03:20:37', '2022-10-15 11:55:52', '2022-10-15 11:55:52');
INSERT INTO `rules` VALUES (3, 5, 12, '2022-07-18 03:20:43', '2022-10-15 11:55:55', '2022-10-15 11:55:55');
INSERT INTO `rules` VALUES (4, 6, 13, '2022-07-18 03:20:50', '2022-10-15 11:55:57', '2022-10-15 11:55:57');
INSERT INTO `rules` VALUES (5, 7, 13, '2022-07-18 03:20:57', '2022-10-15 11:55:59', '2022-10-15 11:55:59');
INSERT INTO `rules` VALUES (6, 8, 13, '2022-07-18 03:21:03', '2022-10-15 11:56:01', '2022-10-15 11:56:01');
INSERT INTO `rules` VALUES (7, 5, 14, '2022-07-19 07:38:14', '2022-10-15 11:56:03', '2022-10-15 11:56:03');
INSERT INTO `rules` VALUES (8, 8, 14, '2022-07-19 07:38:22', '2022-10-15 11:56:05', '2022-10-15 11:56:05');
INSERT INTO `rules` VALUES (9, 3, 15, '2022-10-15 11:56:10', '2022-10-16 12:16:36', '2022-10-16 12:16:36');
INSERT INTO `rules` VALUES (10, 4, 15, '2022-10-15 11:56:16', '2022-10-16 12:16:39', '2022-10-16 12:16:39');
INSERT INTO `rules` VALUES (11, 5, 15, '2022-10-15 11:56:21', '2022-10-16 12:16:44', '2022-10-16 12:16:44');
INSERT INTO `rules` VALUES (12, 6, 15, '2022-10-15 11:56:27', '2022-10-16 12:16:46', '2022-10-16 12:16:46');
INSERT INTO `rules` VALUES (13, 7, 15, '2022-10-15 11:56:34', '2022-10-16 12:16:48', '2022-10-16 12:16:48');
INSERT INTO `rules` VALUES (14, 9, 15, '2022-10-16 12:45:14', '2022-10-16 12:45:14', NULL);
INSERT INTO `rules` VALUES (15, 10, 15, '2022-10-16 12:45:19', '2022-10-16 12:45:19', NULL);
INSERT INTO `rules` VALUES (16, 11, 15, '2022-10-16 12:45:25', '2022-10-16 12:45:25', NULL);
INSERT INTO `rules` VALUES (17, 12, 15, '2022-10-16 12:45:30', '2022-10-16 12:45:30', NULL);
INSERT INTO `rules` VALUES (18, 13, 15, '2022-10-16 12:45:35', '2022-10-16 12:45:35', NULL);
INSERT INTO `rules` VALUES (19, 14, 15, '2022-10-16 12:45:41', '2022-10-16 12:45:41', NULL);
INSERT INTO `rules` VALUES (20, 15, 16, '2022-10-16 12:45:52', '2022-10-16 12:45:52', NULL);
INSERT INTO `rules` VALUES (21, 16, 16, '2022-10-16 12:45:58', '2022-10-16 12:45:58', NULL);
INSERT INTO `rules` VALUES (22, 17, 16, '2022-10-16 12:46:04', '2022-10-16 12:46:04', NULL);
INSERT INTO `rules` VALUES (23, 18, 16, '2022-10-16 12:46:25', '2022-10-16 12:46:25', NULL);
INSERT INTO `rules` VALUES (24, 19, 16, '2022-10-16 12:46:31', '2022-10-16 12:46:31', NULL);
INSERT INTO `rules` VALUES (25, 20, 16, '2022-10-16 12:46:38', '2022-10-16 12:46:38', NULL);
INSERT INTO `rules` VALUES (26, 21, 17, '2022-10-16 12:46:54', '2022-10-16 12:46:54', NULL);
INSERT INTO `rules` VALUES (27, 22, 17, '2022-10-16 12:47:01', '2022-10-16 12:47:01', NULL);
INSERT INTO `rules` VALUES (28, 23, 17, '2022-10-16 12:47:08', '2022-10-16 12:47:08', NULL);
INSERT INTO `rules` VALUES (29, 24, 17, '2022-10-16 12:47:13', '2022-10-16 12:47:13', NULL);
INSERT INTO `rules` VALUES (30, 25, 18, '2022-10-16 12:48:03', '2022-10-16 12:48:03', NULL);
INSERT INTO `rules` VALUES (31, 26, 18, '2022-10-16 12:48:11', '2022-10-16 12:48:11', NULL);
INSERT INTO `rules` VALUES (32, 27, 18, '2022-10-16 12:49:10', '2022-10-16 12:49:10', NULL);
INSERT INTO `rules` VALUES (33, 28, 18, '2022-10-16 12:49:18', '2022-10-16 12:49:18', NULL);
INSERT INTO `rules` VALUES (34, 29, 18, '2022-10-16 12:49:28', '2022-10-16 12:49:28', NULL);
INSERT INTO `rules` VALUES (35, 30, 18, '2022-10-16 12:49:35', '2022-10-16 12:49:46', NULL);
INSERT INTO `rules` VALUES (36, 31, 18, '2022-10-16 12:50:18', '2022-10-16 12:50:18', NULL);
INSERT INTO `rules` VALUES (37, 34, 18, '2022-10-16 12:50:31', '2022-10-16 12:50:31', NULL);
INSERT INTO `rules` VALUES (38, 32, 19, '2022-10-16 12:50:47', '2022-10-16 12:50:47', NULL);
INSERT INTO `rules` VALUES (39, 33, 19, '2022-10-16 12:50:54', '2022-10-16 12:50:54', NULL);
INSERT INTO `rules` VALUES (40, 34, 19, '2022-10-16 12:50:59', '2022-10-16 12:50:59', NULL);
INSERT INTO `rules` VALUES (41, 35, 19, '2022-10-16 12:51:07', '2022-10-16 12:51:07', NULL);

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
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `deleted_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'ira', '123456789', 'ira@gmail.com', '$2b$12$cIE2PYq.8PyVCgC0eS.k.OCCrS02yUrK58n09Tj0GIgn5eRrUS2am', '2022-08-08 04:41:55', '2022-08-08 04:41:55', NULL);
INSERT INTO `users` VALUES (2, 'Bambang', '123456789', 'bambangkun2021@gmail.com', '$2b$12$UNPjeo5b0NINf27tftZHc.QuUQXXbSwpZeibh0wUYlGdJwGzcRorK', '2022-08-09 07:11:50', '2022-08-09 07:11:50', NULL);
INSERT INTO `users` VALUES (3, 'Arkan', '0348939', 'arkana@gmail.com', '$2b$12$iir/M6DdsQVQBmZB0dj0..tI9jfqYiZ/2ZhBhQJzSzj0NtfV9X1qS', '2022-10-11 10:32:14', '2022-10-11 10:32:14', NULL);
INSERT INTO `users` VALUES (4, 'Rauzan', '081234567891', 'rauzan@gmail.com', '$2b$12$x/oBUNi38dAYFGd.KBTzbemR0qGFzrQB3gAjJFKZNAAX/x0x77EHq', '2022-10-15 08:17:58', '2022-10-15 08:17:58', NULL);
INSERT INTO `users` VALUES (5, 'Rauzan', '081361139642', 'rauzanahmad34@gmail.com', '$2b$12$w9Z9Hi3IAcyx1xEaeJTITu/mQL.JsZ8NWYDP9phoOCn0KtY6A6lRO', '2022-10-15 12:02:14', '2022-10-15 12:02:14', NULL);

SET FOREIGN_KEY_CHECKS = 1;
