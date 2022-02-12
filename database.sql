/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.11-MariaDB : Database - cms
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cms` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `cms`;

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`postId`),
  KEY `FK_94a85bb16d24033a2afdd5df060` (`postId`),
  KEY `FK_c0354a9a009d3bb45a08655ce3b` (`userId`),
  CONSTRAINT `FK_94a85bb16d24033a2afdd5df060` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;

/*Data for the table `comment` */

insert  into `comment`(`id`,`content`,`postId`,`userId`) values 
(28,'sdsvdgbfhn',28,6),
(29,'scdvfbcgn',28,6),
(30,'fdsdghjm',29,8),
(31,'afds',29,8),
(32,'adfdsdgfh',30,8),
(34,'fdsdghf',30,8),
(35,'afdsdg',29,6),
(36,'afsgt',29,6),
(37,'afds',31,6),
(38,'afdg',31,6),
(39,'eafrget',28,6),
(40,'34sgt',28,6),
(41,'aer3wt4e5hyf',29,6),
(42,'a4gsthd',29,6),
(44,'asdfsgf',31,8),
(45,'\\zdfxg',29,6);

/*Table structure for table `post` */

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `authorId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1077d47e0112cad3c16bbcea6cd` (`categoryId`),
  KEY `FK_c6fb082a3114f35d0cc27c518e0` (`authorId`),
  CONSTRAINT `FK_1077d47e0112cad3c16bbcea6cd` FOREIGN KEY (`categoryId`) REFERENCES `post_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;

/*Data for the table `post` */

insert  into `post`(`id`,`title`,`description`,`authorId`,`categoryId`) values 
(28,'Fist title','asfdgdfh\nafdhg\nafddhgafsghdf',6,2),
(29,'Fun title','afsgdh\nafsgdhf\nafsdgh',8,1),
(30,'Another post','some content',8,1),
(31,'afdsf','afsf',6,2),
(33,'\\sdfdgfj','zfdchv',8,1),
(34,'\\sdfdgfj','zfdchv',8,1),
(35,'sdfdgf','asfdghf',8,2);

/*Table structure for table `post_category` */

DROP TABLE IF EXISTS `post_category`;

CREATE TABLE `post_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Data for the table `post_category` */

insert  into `post_category`(`id`,`value`) values 
(1,'entertainment'),
(2,'business'),
(3,'finance'),
(4,'health'),
(5,'engineering'),
(6,'technology'),
(7,'politics');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `categoryId` int(11) DEFAULT 2,
  PRIMARY KEY (`id`),
  KEY `FK_4dd13cf5536c5ec906dba37cbef` (`categoryId`),
  CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`firstName`,`lastName`,`age`,`username`,`password`,`categoryId`) values 
(6,'Lazar','Milosavljevic',25,'laxi','/1rBkZBCSx2I+UGe+UmuVuaHWaCOAEwC9xnD06OYl4s=',1),
(8,'Jana','Kujundzic',23,'jana','/1rBkZBCSx2I+UGe+UmuVtS1MDs1Uqhfr6sLihEmzaQ=',2);

/*Table structure for table `user_category` */

DROP TABLE IF EXISTS `user_category`;

CREATE TABLE `user_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_category` */

insert  into `user_category`(`id`,`value`) values 
(1,'admin'),
(2,'user');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
