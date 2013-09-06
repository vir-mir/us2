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

USE `us`;

#
# Data for the `task_status` table  (LIMIT 0,500)
#

TRUNCATE TABLE `task_status`;

INSERT INTO `task_status` (`id`, `name`, `class_icon`, `class_alt`) VALUES 
  (1,'Новая задача','icon-download-alt','label label-warning'),
  (2,'На проверке','icon-star','label label-success'),
  (3,'Перенесена','icon-share-alt','label label-inverse'),
  (4,'Снята','icon-off','label label-important'),
  (5,'Готова к выполнению','icon-hand-right','label'),
  (6,'Выполнена','icon-thumbs-up','label label-inverse');
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;