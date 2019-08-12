<?php
  include('common.php');
  $usr = $_POST["username"];
  $course = course_parse($_POST["course"]);
  $time = date("Y-m-d G:i:s");
  $db->query("insert into Logs values(\"{$usr}\", \"{$course}\", \"download\", \"{$time}\")");
  $name = $course . "_19au.png";
  if(!file_exists("qr_code/" . $name)){
    $data["course"] = "none.png";
  } else{
    $data["course"] = $name;
  }
  header('Content-Type: application/json');
  print(json_encode($data));
?>
