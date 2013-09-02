# SQL Manager 2007 for MySQL 4.5.0.4
# ---------------------------------------
# Host     : komtender.local
# Port     : 3306
# Database : us


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS `us`;

CREATE DATABASE `us`
    CHARACTER SET 'utf8'
    COLLATE 'utf8_general_ci';

USE `us`;

#
# Structure for the `auth_group` table : 
#

DROP TABLE IF EXISTS `auth_group`;

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Structure for the `django_content_type` table : 
#

DROP TABLE IF EXISTS `django_content_type`;

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_label` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

#
# Structure for the `auth_permission` table : 
#

DROP TABLE IF EXISTS `auth_permission`;

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_type_id` (`content_type_id`,`codename`),
  KEY `auth_permission_37ef4eb4` (`content_type_id`),
  CONSTRAINT `content_type_id_refs_id_d043b34a` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

#
# Structure for the `auth_group_permissions` table : 
#

DROP TABLE IF EXISTS `auth_group_permissions`;

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id` (`group_id`,`permission_id`),
  KEY `auth_group_permissions_5f412f9a` (`group_id`),
  KEY `auth_group_permissions_83d7f98b` (`permission_id`),
  CONSTRAINT `group_id_refs_id_f4b32aac` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `permission_id_refs_id_6ba0f519` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

#
# Structure for the `auth_user` table : 
#

DROP TABLE IF EXISTS `auth_user`;

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(75) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Structure for the `auth_user_groups` table : 
#

DROP TABLE IF EXISTS `auth_user_groups`;

CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`group_id`),
  KEY `auth_user_groups_6340c63c` (`user_id`),
  KEY `auth_user_groups_5f412f9a` (`group_id`),
  CONSTRAINT `user_id_refs_id_40c41112` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `group_id_refs_id_274b862c` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Structure for the `auth_user_user_permissions` table : 
#

DROP TABLE IF EXISTS `auth_user_user_permissions`;

CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`permission_id`),
  KEY `auth_user_user_permissions_6340c63c` (`user_id`),
  KEY `auth_user_user_permissions_83d7f98b` (`permission_id`),
  CONSTRAINT `user_id_refs_id_4dc23c39` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `permission_id_refs_id_35d9ac25` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `django_admin_log` table : 
#

DROP TABLE IF EXISTS `django_admin_log`;

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_6340c63c` (`user_id`),
  KEY `django_admin_log_37ef4eb4` (`content_type_id`),
  CONSTRAINT `content_type_id_refs_id_93d2d1f8` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `user_id_refs_id_c0d12874` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Structure for the `django_session` table : 
#

DROP TABLE IF EXISTS `django_session`;

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_b7b81f0c` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `django_site` table : 
#

DROP TABLE IF EXISTS `django_site`;

CREATE TABLE `django_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Structure for the `menu_item` table : 
#

DROP TABLE IF EXISTS `menu_item`;

CREATE TABLE `menu_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `lft` int(10) unsigned NOT NULL,
  `rght` int(10) unsigned NOT NULL,
  `tree_id` int(10) unsigned NOT NULL,
  `level` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_item_410d0aac` (`parent_id`),
  KEY `menu_item_329f6fb3` (`lft`),
  KEY `menu_item_e763210f` (`rght`),
  KEY `menu_item_ba470c4a` (`tree_id`),
  KEY `menu_item_20e079f4` (`level`),
  CONSTRAINT `parent_id_refs_id_58b84d3a` FOREIGN KEY (`parent_id`) REFERENCES `menu_item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `south_migrationhistory` table : 
#

DROP TABLE IF EXISTS `south_migrationhistory`;

CREATE TABLE `south_migrationhistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_name` varchar(255) NOT NULL,
  `migration` varchar(255) NOT NULL,
  `applied` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Structure for the `user_staff` table : 
#

DROP TABLE IF EXISTS `user_staff`;

CREATE TABLE `user_staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `patronymic` varchar(255) DEFAULT NULL,
  `date_expire` date DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `user_dateduties` table : 
#

DROP TABLE IF EXISTS `user_dateduties`;

CREATE TABLE `user_dateduties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `date_expire` date DEFAULT NULL,
  `staff_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_dateduties_f0a7d083` (`staff_id`),
  CONSTRAINT `staff_id_refs_id_409329f6` FOREIGN KEY (`staff_id`) REFERENCES `user_staff` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `user_duties` table : 
#

DROP TABLE IF EXISTS `user_duties`;

CREATE TABLE `user_duties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `date` date DEFAULT NULL,
  `lft` int(10) unsigned NOT NULL,
  `rght` int(10) unsigned NOT NULL,
  `tree_id` int(10) unsigned NOT NULL,
  `level` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_duties_410d0aac` (`parent_id`),
  KEY `user_duties_329f6fb3` (`lft`),
  KEY `user_duties_e763210f` (`rght`),
  KEY `user_duties_ba470c4a` (`tree_id`),
  KEY `user_duties_20e079f4` (`level`),
  CONSTRAINT `parent_id_refs_id_9c386f5a` FOREIGN KEY (`parent_id`) REFERENCES `user_duties` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `user_staff_user` table : 
#

DROP TABLE IF EXISTS `user_staff_user`;

CREATE TABLE `user_staff_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_staff_user_staff_id_629e9851_uniq` (`staff_id`,`user_id`),
  KEY `user_staff_user_f0a7d083` (`staff_id`),
  KEY `user_staff_user_6340c63c` (`user_id`),
  CONSTRAINT `user_id_refs_id_eb1a7047` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `staff_id_refs_id_a5728b8e` FOREIGN KEY (`staff_id`) REFERENCES `user_staff` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for the `auth_group` table  (LIMIT 0,500)
#

INSERT INTO `auth_group` (`id`, `name`) VALUES 
  (1,'Ad'),
  (2,'Administration');
COMMIT;

#
# Data for the `django_content_type` table  (LIMIT 0,500)
#

INSERT INTO `django_content_type` (`id`, `name`, `app_label`, `model`) VALUES 
  (1,'permission','auth','permission'),
  (2,'group','auth','group'),
  (3,'user','auth','user'),
  (4,'content type','contenttypes','contenttype'),
  (5,'session','sessions','session'),
  (6,'site','sites','site'),
  (7,'log entry','admin','logentry'),
  (8,'migration history','south','migrationhistory'),
  (9,'item','menu','item'),
  (11,'duties','user','duties'),
  (12,'staff','user','staff'),
  (13,'date duties','user','dateduties');
COMMIT;

#
# Data for the `auth_permission` table  (LIMIT 0,500)
#

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES 
  (1,'Can add permission',1,'add_permission'),
  (2,'Can change permission',1,'change_permission'),
  (3,'Can delete permission',1,'delete_permission'),
  (4,'Can add group',2,'add_group'),
  (5,'Can change group',2,'change_group'),
  (6,'Can delete group',2,'delete_group'),
  (7,'Can add user',3,'add_user'),
  (8,'Can change user',3,'change_user'),
  (9,'Can delete user',3,'delete_user'),
  (10,'Can add content type',4,'add_contenttype'),
  (11,'Can change content type',4,'change_contenttype'),
  (12,'Can delete content type',4,'delete_contenttype'),
  (13,'Can add session',5,'add_session'),
  (14,'Can change session',5,'change_session'),
  (15,'Can delete session',5,'delete_session'),
  (16,'Can add site',6,'add_site'),
  (17,'Can change site',6,'change_site'),
  (18,'Can delete site',6,'delete_site'),
  (19,'Can add log entry',7,'add_logentry'),
  (20,'Can change log entry',7,'change_logentry'),
  (21,'Can delete log entry',7,'delete_logentry'),
  (22,'Can add migration history',8,'add_migrationhistory'),
  (23,'Can change migration history',8,'change_migrationhistory'),
  (24,'Can delete migration history',8,'delete_migrationhistory'),
  (25,'Can add item',9,'add_item'),
  (26,'Can change item',9,'change_item'),
  (27,'Can delete item',9,'delete_item'),
  (31,'Can add duties',11,'add_duties'),
  (32,'Can change duties',11,'change_duties'),
  (33,'Can delete duties',11,'delete_duties'),
  (34,'Can add staff',12,'add_staff'),
  (35,'Can change staff',12,'change_staff'),
  (36,'Can delete staff',12,'delete_staff'),
  (37,'Can add date duties',13,'add_dateduties'),
  (38,'Can change date duties',13,'change_dateduties'),
  (39,'Can delete date duties',13,'delete_dateduties');
COMMIT;

#
# Data for the `auth_group_permissions` table  (LIMIT 0,500)
#

INSERT INTO `auth_group_permissions` (`id`, `group_id`, `permission_id`) VALUES 
  (1,1,1),
  (2,1,2),
  (3,1,3),
  (4,1,4),
  (5,1,5),
  (6,1,6),
  (7,1,7),
  (8,1,8),
  (9,1,9),
  (10,1,10),
  (11,1,11),
  (12,1,12),
  (13,1,13),
  (14,1,14),
  (15,1,15),
  (16,1,16),
  (17,1,17),
  (18,1,18),
  (19,1,19),
  (20,1,20),
  (21,1,21),
  (22,1,22),
  (23,1,23),
  (24,1,24),
  (25,1,25),
  (26,1,26),
  (27,1,27);
COMMIT;

#
# Data for the `auth_user` table  (LIMIT 0,500)
#

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES 
  (1,'pbkdf2_sha256$10000$2Hy6BvdY9hOc$kS5MeM5MSmN2ZMtYQoapZHRqKFmGwzOexgmCoSVHnWM=','2013-09-01 22:10:28',1,'admin','','','info@vir-mir.ru',1,1,'2013-08-30 05:44:30');
COMMIT;

#
# Data for the `auth_user_groups` table  (LIMIT 0,500)
#

INSERT INTO `auth_user_groups` (`id`, `user_id`, `group_id`) VALUES 
  (1,1,1),
  (2,1,2);
COMMIT;

#
# Data for the `django_admin_log` table  (LIMIT 0,500)
#

INSERT INTO `django_admin_log` (`id`, `action_time`, `user_id`, `content_type_id`, `object_id`, `object_repr`, `action_flag`, `change_message`) VALUES 
  (1,'2013-09-01 23:07:42',1,2,'1','Ad',1,''),
  (2,'2013-09-01 23:07:57',1,2,'2','Administration',1,''),
  (3,'2013-09-01 23:08:18',1,3,'1','admin',2,'Изменен password и groups.');
COMMIT;

#
# Data for the `django_session` table  (LIMIT 0,500)
#

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES 
  ('8qqptzvowwktl1m1pd09aly75gnh637v','NTI4ZDE2ZjliOGM5YzhmMDdlMDhhMzY2ZGUyMjc2ZDY1ZGM1N2Y4MjqAAn1xAShVEl9hdXRoX3VzZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEDVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==','2013-09-15 22:10:28');
COMMIT;

#
# Data for the `django_site` table  (LIMIT 0,500)
#

INSERT INTO `django_site` (`id`, `domain`, `name`) VALUES 
  (1,'example.com','example.com');
COMMIT;

#
# Data for the `south_migrationhistory` table  (LIMIT 0,500)
#

INSERT INTO `south_migrationhistory` (`id`, `app_name`, `migration`, `applied`) VALUES 
  (1,'menu','0001_initial','2013-09-02 05:33:22'),
  (2,'mptt','0001_initial','2013-09-02 05:34:06'),
  (3,'user','0001_initial','2013-09-02 06:28:04');
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;