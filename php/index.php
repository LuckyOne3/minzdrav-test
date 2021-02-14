<?php
 ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
require_once 'connection.php'; // подключаем скрипт

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: content-type');
header('Vary: Origin');
 
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));
// выполняем операции с базой данных
 // ввод значения, по которому ищем

$_GET['query'];

if($_GET['query'] == 'true'){
  $result = mysqli_query($link,"SELECT `spMNN`.`MNN`,group_concat(spTN.TN SEPARATOR ';,\n') as TN,`spMNN`.`VEN` FROM `spTN` INNER JOIN `spMNN` ON `spMNN`.`id`=`spTN`.`MNN` WHERE `spMNN`.`VEN` = 'True'   GROUP BY `spMNN`.`MNN`");
$table=array();
while($row = mysqli_fetch_object($result)){
  array_push($table,$row);
  unset($row);
}
echo json_encode($table);
  
}
else{
}

if($_GET['query'] == 'false'){
   $result = mysqli_query($link,"SELECT `spMNN`.`MNN`,group_concat(spTN.TN SEPARATOR ';,\n') as TN,`spMNN`.`VEN` FROM `spTN` INNER JOIN `spMNN` ON `spMNN`.`id`=`spTN`.`MNN` WHERE `spMNN`.`VEN` = 'False'   GROUP BY `spMNN`.`MNN`");
$table=array();
while($row = mysqli_fetch_object($result)){
  array_push($table,$row);
  unset($row);
}
echo json_encode($table);
}
else{
}



// закрываем подключение
mysqli_close($link);
?>