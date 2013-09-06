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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

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
# Structure for the `menu_law` table : 
#

DROP TABLE IF EXISTS `menu_law`;

CREATE TABLE `menu_law` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fed` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

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
  `law_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_item_410d0aac` (`parent_id`),
  KEY `menu_item_329f6fb3` (`lft`),
  KEY `menu_item_e763210f` (`rght`),
  KEY `menu_item_ba470c4a` (`tree_id`),
  KEY `menu_item_20e079f4` (`level`),
  KEY `menu_item_558fdbbd` (`law_id`),
  CONSTRAINT `law_id_refs_id_f8c04fa8` FOREIGN KEY (`law_id`) REFERENCES `menu_law` (`id`),
  CONSTRAINT `parent_id_refs_id_58b84d3a` FOREIGN KEY (`parent_id`) REFERENCES `menu_item` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Structure for the `site_user_staff` table : 
#

DROP TABLE IF EXISTS `site_user_staff`;

CREATE TABLE `site_user_staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `patronymic` varchar(255) DEFAULT NULL,
  `date_expire` date DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Structure for the `menu_law_staff` table : 
#

DROP TABLE IF EXISTS `menu_law_staff`;

CREATE TABLE `menu_law_staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `law_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `menu_law_staff_law_id_6bf0a101_uniq` (`law_id`,`staff_id`),
  KEY `menu_law_staff_558fdbbd` (`law_id`),
  KEY `menu_law_staff_f0a7d083` (`staff_id`),
  CONSTRAINT `staff_id_refs_id_03b5de0e` FOREIGN KEY (`staff_id`) REFERENCES `site_user_staff` (`id`),
  CONSTRAINT `law_id_refs_id_52cc6d85` FOREIGN KEY (`law_id`) REFERENCES `menu_law` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for the `site_user_duties` table : 
#

DROP TABLE IF EXISTS `site_user_duties`;

CREATE TABLE `site_user_duties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `date` date DEFAULT NULL,
  `lft` int(10) unsigned NOT NULL,
  `rght` int(10) unsigned NOT NULL,
  `tree_id` int(10) unsigned NOT NULL,
  `level` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `site_user_duties_410d0aac` (`parent_id`),
  KEY `site_user_duties_329f6fb3` (`lft`),
  KEY `site_user_duties_e763210f` (`rght`),
  KEY `site_user_duties_ba470c4a` (`tree_id`),
  KEY `site_user_duties_20e079f4` (`level`),
  CONSTRAINT `parent_id_refs_id_70cdaa9e` FOREIGN KEY (`parent_id`) REFERENCES `site_user_duties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

#
# Structure for the `site_user_dateduties` table : 
#

DROP TABLE IF EXISTS `site_user_dateduties`;

CREATE TABLE `site_user_dateduties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `date_expire` date DEFAULT NULL,
  `staff_id` int(11) NOT NULL,
  `duty_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `site_user_dateduties_f0a7d083` (`staff_id`),
  KEY `site_user_dateduties_7185ea2d` (`duty_id`),
  CONSTRAINT `duty_id_refs_id_94f00652` FOREIGN KEY (`duty_id`) REFERENCES `site_user_duties` (`id`),
  CONSTRAINT `staff_id_refs_id_c455a768` FOREIGN KEY (`staff_id`) REFERENCES `site_user_staff` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Structure for the `site_user_staff_user` table : 
#

DROP TABLE IF EXISTS `site_user_staff_user`;

CREATE TABLE `site_user_staff_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_user_staff_user_staff_id_78484c28_uniq` (`staff_id`,`user_id`),
  KEY `site_user_staff_user_f0a7d083` (`staff_id`),
  KEY `site_user_staff_user_6340c63c` (`user_id`),
  CONSTRAINT `user_id_refs_id_1894af3d` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `staff_id_refs_id_aa73abb7` FOREIGN KEY (`staff_id`) REFERENCES `site_user_staff` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 AVG_ROW_LENGTH=4096;

#
# Structure for the `task_status` table : 
#

DROP TABLE IF EXISTS `task_status`;

CREATE TABLE `task_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `class_icon` varchar(255) NOT NULL,
  `class_alt` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Structure for the `task_task` table : 
#

DROP TABLE IF EXISTS `task_task`;

CREATE TABLE `task_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT NULL,
  `checked_id` int(11) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `date_checked` date DEFAULT NULL,
  `is_folder` smallint(6) DEFAULT NULL,
  `important` smallint(6) DEFAULT NULL,
  `main` smallint(6) DEFAULT NULL,
  `lft` int(10) unsigned NOT NULL,
  `rght` int(10) unsigned NOT NULL,
  `tree_id` int(10) unsigned NOT NULL,
  `level` int(10) unsigned NOT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `percent` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `task_task_410d0aac` (`parent_id`),
  KEY `task_task_48fb58bb` (`status_id`),
  KEY `task_task_9acd27ed` (`checked_id`),
  KEY `task_task_329f6fb3` (`lft`),
  KEY `task_task_e763210f` (`rght`),
  KEY `task_task_ba470c4a` (`tree_id`),
  KEY `task_task_20e079f4` (`level`),
  KEY `task_task_f0a7d083` (`staff_id`),
  CONSTRAINT `checked_id_refs_id_a8e2a691` FOREIGN KEY (`checked_id`) REFERENCES `site_user_staff` (`id`),
  CONSTRAINT `parent_id_refs_id_93725a10` FOREIGN KEY (`parent_id`) REFERENCES `task_task` (`id`),
  CONSTRAINT `staff_id_refs_id_a8e2a691` FOREIGN KEY (`staff_id`) REFERENCES `site_user_staff` (`id`),
  CONSTRAINT `status_id_refs_id_9054d0b1` FOREIGN KEY (`status_id`) REFERENCES `task_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Structure for the `task_task_responsible` table : 
#

DROP TABLE IF EXISTS `task_task_responsible`;

CREATE TABLE `task_task_responsible` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `duties_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `task_task_responsible_task_id_7aa78a0e_uniq` (`task_id`,`duties_id`),
  KEY `task_task_responsible_ef96c3b8` (`task_id`),
  KEY `task_task_responsible_3e381e78` (`duties_id`),
  CONSTRAINT `task_id_refs_id_bb86cd0d` FOREIGN KEY (`task_id`) REFERENCES `task_task` (`id`),
  CONSTRAINT `duties_id_refs_id_aacd71e5` FOREIGN KEY (`duties_id`) REFERENCES `site_user_duties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Structure for the `thumbnail_kvstore` table : 
#

DROP TABLE IF EXISTS `thumbnail_kvstore`;

CREATE TABLE `thumbnail_kvstore` (
  `key` varchar(200) NOT NULL,
  `value` longtext NOT NULL,
  PRIMARY KEY (`key`)
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
  (13,'date duties','user','dateduties'),
  (14,'duties','site_user','duties'),
  (15,'staff','site_user','staff'),
  (16,'date duties','site_user','dateduties'),
  (17,'status','task','status'),
  (20,'task','task','task'),
  (21,'law','menu','law'),
  (22,'kv store','thumbnail','kvstore');
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
  (39,'Can delete date duties',13,'delete_dateduties'),
  (40,'Can add duties',14,'add_duties'),
  (41,'Can change duties',14,'change_duties'),
  (42,'Can delete duties',14,'delete_duties'),
  (43,'Can add staff',15,'add_staff'),
  (44,'Can change staff',15,'change_staff'),
  (45,'Can delete staff',15,'delete_staff'),
  (46,'Can add date duties',16,'add_dateduties'),
  (47,'Can change date duties',16,'change_dateduties'),
  (48,'Can delete date duties',16,'delete_dateduties'),
  (49,'Can add status',17,'add_status'),
  (50,'Can change status',17,'change_status'),
  (51,'Can delete status',17,'delete_status'),
  (58,'Can add task',20,'add_task'),
  (59,'Can change task',20,'change_task'),
  (60,'Can delete task',20,'delete_task'),
  (61,'Can add law',21,'add_law'),
  (62,'Can change law',21,'change_law'),
  (63,'Can delete law',21,'delete_law'),
  (64,'Can add kv store',22,'add_kvstore'),
  (65,'Can change kv store',22,'change_kvstore'),
  (66,'Can delete kv store',22,'delete_kvstore');
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
  (1,'pbkdf2_sha256$10000$2Hy6BvdY9hOc$kS5MeM5MSmN2ZMtYQoapZHRqKFmGwzOexgmCoSVHnWM=','2013-09-02 23:10:06',1,'admin','','','info@vir-mir.ru',1,1,'2013-08-30 05:44:30'),
  (2,'pbkdf2_sha256$10000$mZ05uqs009aG$XHwsEG9+LkJx530RhVLiVFL5uzUYKjD0hONsjpuGicY=','2013-09-06 04:24:10',0,'test','','','',0,1,'2013-09-03 06:47:07'),
  (3,'pbkdf2_sha256$10000$6jYRsYE7sGYC$GjskVYnLndGRfNhM0R+MLxvP9742FYK2TfVs+KtzRLY=','2013-09-03 06:57:31',0,'new','','','',0,1,'2013-09-03 06:57:31'),
  (4,'pbkdf2_sha256$10000$MQlERv42yIjG$X59Z8Y3ZX4jhN2DjJHudow1MeUj/uZ048gIsJ0saUHw=','2013-09-04 14:06:55',0,'test1','','','',0,1,'2013-09-04 14:06:55');
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
  (3,'2013-09-01 23:08:18',1,3,'1','admin',2,'');
COMMIT;

#
# Data for the `django_session` table  (LIMIT 0,500)
#

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES 
  ('30887kazq3zpm1anfcfv477dr4cpvwst','NTI4ZDE2ZjliOGM5YzhmMDdlMDhhMzY2ZGUyMjc2ZDY1ZGM1N2Y4MjqAAn1xAShVEl9hdXRoX3VzZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEDVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==','2013-09-16 23:10:07'),
  ('8qqptzvowwktl1m1pd09aly75gnh637v','NTI4ZDE2ZjliOGM5YzhmMDdlMDhhMzY2ZGUyMjc2ZDY1ZGM1N2Y4MjqAAn1xAShVEl9hdXRoX3VzZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEDVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==','2013-09-15 22:10:28'),
  ('dwfo6rh6f0fcoitrdspbc25b1ioy43ri','ZTRhNzUwNDBjNDFmYWZhYjJkODViMDk2OWE1YWNjN2IzYWU1ZTliOTqAAn1xAShVEl9hdXRoX3VzZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEDVQ1fYXV0aF91c2VyX2lkcQSKAQJ1Lg==','2013-09-17 06:58:14'),
  ('forhkewheqos5g6ka237pnagnniucu2e','NTI4ZDE2ZjliOGM5YzhmMDdlMDhhMzY2ZGUyMjc2ZDY1ZGM1N2Y4MjqAAn1xAShVEl9hdXRoX3VzZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEDVQ1fYXV0aF91c2VyX2lkcQSKAQF1Lg==','2013-09-16 07:04:48'),
  ('t5k4jf7b06f106fzzrcrlofzl6g0xez6','ZTRhNzUwNDBjNDFmYWZhYjJkODViMDk2OWE1YWNjN2IzYWU1ZTliOTqAAn1xAShVEl9hdXRoX3VzZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHEDVQ1fYXV0aF91c2VyX2lkcQSKAQJ1Lg==','2013-09-20 04:24:10');
COMMIT;

#
# Data for the `django_site` table  (LIMIT 0,500)
#

INSERT INTO `django_site` (`id`, `domain`, `name`) VALUES 
  (1,'http://127.0.0.1:8001','http://127.0.0.1:8001');
COMMIT;

#
# Data for the `menu_law` table  (LIMIT 0,500)
#

INSERT INTO `menu_law` (`id`, `fed`) VALUES 
  (1,'super_user'),
  (2,'task'),
  (3,'');
COMMIT;

#
# Data for the `menu_item` table  (LIMIT 0,500)
#

INSERT INTO `menu_item` (`id`, `parent_id`, `name`, `url`, `lft`, `rght`, `tree_id`, `level`, `law_id`) VALUES 
  (1,NULL,'Главная','/',1,10,1,0,2),
  (2,1,'Админка','/admin/',2,7,1,1,3),
  (3,2,'Меню','/admin/menu/',3,4,1,2,1),
  (4,2,'Пользователи','/admin/user/',5,6,1,2,1),
  (5,1,'Задачи','/task/',8,9,1,1,2);
COMMIT;

#
# Data for the `site_user_staff` table  (LIMIT 0,500)
#

INSERT INTO `site_user_staff` (`id`, `name`, `surname`, `patronymic`, `date_expire`, `date`) VALUES 
  (1,'','Вакансия','',NULL,'2013-09-03'),
  (2,'Алексей','Фирсов','Андреевич',NULL,'2013-09-03'),
  (3,'Тествов','Тест','Тестовичь',NULL,'2013-09-03');
COMMIT;

#
# Data for the `site_user_duties` table  (LIMIT 0,500)
#

INSERT INTO `site_user_duties` (`id`, `parent_id`, `name`, `date`, `lft`, `rght`, `tree_id`, `level`) VALUES 
  (1,NULL,'фыв','2013-09-03',1,46,1,0),
  (2,1,'Под должность','2013-09-03',2,31,1,1),
  (3,2,'еще под должность','2013-09-03',3,12,1,2),
  (4,2,'Еще под должность','2013-09-03',13,18,1,2),
  (5,1,'Под должность 1','2013-09-03',32,37,1,1),
  (6,5,'под должность23','2013-09-03',33,36,1,2),
  (7,2,'123','2013-09-03',19,26,1,2),
  (8,2,'123-1','2013-09-03',27,30,1,2),
  (9,8,'12','2013-09-03',28,29,1,3),
  (10,7,'3455укацууафыафыв','2013-09-03',20,23,1,3),
  (11,10,'йцуйцуйцуйц','2013-09-03',21,22,1,4),
  (12,3,'лялял','2013-09-03',4,5,1,3),
  (13,3,'тополя','2013-09-03',6,7,1,3),
  (14,4,'не_яяя','2013-09-03',14,17,1,3),
  (15,14,'ываываа','2013-09-03',15,16,1,4),
  (16,6,'sdfsdf','2013-09-03',34,35,1,3),
  (17,1,'Вротая верхняяфыв','2013-09-03',38,41,1,1),
  (18,17,'123','2013-09-03',39,40,1,2),
  (19,1,'ввв','2013-09-03',42,43,1,1),
  (20,1,'фывва','2013-09-03',44,45,1,1),
  (21,3,'мирвам','2013-09-04',8,11,1,3),
  (22,21,'во всем','2013-09-04',9,10,1,4),
  (23,7,'12,2','2013-09-04',24,25,1,3);
COMMIT;

#
# Data for the `site_user_dateduties` table  (LIMIT 0,500)
#

INSERT INTO `site_user_dateduties` (`id`, `date`, `date_expire`, `staff_id`, `duty_id`) VALUES 
  (1,'2013-08-01',NULL,2,5),
  (2,'2013-08-05',NULL,2,16),
  (3,'2013-08-13',NULL,2,18),
  (4,'2013-08-13',NULL,3,17),
  (5,'2013-08-13',NULL,3,3),
  (6,'2013-08-13',NULL,2,2);
COMMIT;

#
# Data for the `site_user_staff_user` table  (LIMIT 0,500)
#

INSERT INTO `site_user_staff_user` (`id`, `staff_id`, `user_id`) VALUES 
  (1,2,1),
  (7,3,2),
  (9,3,3),
  (10,3,4);
COMMIT;

#
# Data for the `south_migrationhistory` table  (LIMIT 0,500)
#

INSERT INTO `south_migrationhistory` (`id`, `app_name`, `migration`, `applied`) VALUES 
  (1,'menu','0001_initial','2013-09-02 05:33:22'),
  (2,'site_user','0001_initial','2013-09-02 22:56:25'),
  (3,'site_user','0002_auto__add_field_dateduties_duty','2013-09-03 07:12:57'),
  (4,'task','0001_initial','2013-09-04 14:55:43'),
  (5,'menu','0002_auto__add_law','2013-09-05 01:19:04'),
  (6,'task','0002_auto__add_field_task_staff','2013-09-05 01:19:05'),
  (7,'menu','0003_auto__del_field_law_item__add_field_item_law','2013-09-05 03:23:39'),
  (8,'task','0003_auto__chg_field_task_status__chg_field_task_checked','2013-09-05 07:37:29'),
  (9,'task','0004_auto__chg_field_task_date_end__chg_field_task_date_start__chg_field_ta','2013-09-05 07:40:14'),
  (10,'task','0005_auto__add_field_task_percent','2013-09-05 09:46:05'),
  (11,'mptt','0001_initial','2013-09-05 22:30:44'),
  (12,'task','0006_auto__del_field_status_img__add_field_status_class_icon__add_field_sta','2013-09-05 22:30:45');
COMMIT;

#
# Data for the `task_status` table  (LIMIT 0,500)
#

INSERT INTO `task_status` (`id`, `name`, `class_icon`, `class_alt`) VALUES 
  (1,'Новая задача','icon-download-alt','label label-warning'),
  (2,'На проверке','icon-star','label label-success'),
  (3,'Перенесена','icon-share-alt','label label-inverse'),
  (4,'Снята','icon-off','label label-important'),
  (5,'Готова к выполнению','icon-hand-right','label'),
  (6,'Выполнена','icon-thumbs-up','label label-inverse');
COMMIT;

#
# Data for the `task_task` table  (LIMIT 0,500)
#

INSERT INTO `task_task` (`id`, `parent_id`, `name`, `status_id`, `checked_id`, `date_start`, `date_end`, `date_checked`, `is_folder`, `important`, `main`, `lft`, `rght`, `tree_id`, `level`, `staff_id`, `percent`) VALUES 
  (1,NULL,'тест23',1,NULL,'2013-09-05','2013-09-05',NULL,0,NULL,NULL,1,6,1,0,2,0),
  (2,1,'под задача теста - 2',5,NULL,'2013-08-05','2013-08-11',NULL,0,NULL,NULL,2,5,1,1,2,0),
  (3,2,'под задача под задачи',5,NULL,'2013-09-05','2013-09-05',NULL,0,NULL,NULL,3,4,1,2,2,0);
COMMIT;

#
# Data for the `task_task_responsible` table  (LIMIT 0,500)
#

INSERT INTO `task_task_responsible` (`id`, `task_id`, `duties_id`) VALUES 
  (1,1,16),
  (2,2,16),
  (3,3,16);
COMMIT;

#
# Data for the `thumbnail_kvstore` table  (LIMIT 0,500)
#

INSERT INTO `thumbnail_kvstore` (`key`, `value`) VALUES 
  ('sorl-thumbnail||image||b6ef54f8b61e282469c1d51b708a576e','{\"storage\": \"django.core.files.storage.FileSystemStorage\", \"name\": \"cache/5d/4b/5d4b9eada631a2ada551eb1ed389a7fd.jpg\", \"size\": [45, 50]}'),
  ('sorl-thumbnail||image||fcac27a2d64afc6e2c486b76ac70311c','{\"storage\": \"sorl.thumbnail.images.UrlStorage\", \"name\": \"http://127.0.0.1:8001/static/img/task.jpg\", \"size\": [170, 190]}'),
  ('sorl-thumbnail||thumbnails||fcac27a2d64afc6e2c486b76ac70311c','[\"b6ef54f8b61e282469c1d51b708a576e\"]');
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;