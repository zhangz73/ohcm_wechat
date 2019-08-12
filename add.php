<?php
  include('common.php');
  $course = course_parse($_POST["course"]);
  $usr = $_POST["username"];
  $image_dir = "./qr_code/" . $course . "_19au.png";
    #unlink($image_dir);
    #$uploaded = move_uploaded_file($_FILES["qr_code"]["tmp_name"], $image_dir);
    file_put_contents($image_dir, base64_decode($_POST["fdata"]));
  date_default_timezone_set("America/Los_Angeles");
  $time = date("Y-m-d G:i:s");
  if(strlen(trim($course)) > 0){
    $db->query("insert into Logs values(\"{$usr}\", \"{$course}\", \"upload\", \"{$time}\")");
    $db->close();
  }
    //header("Content-Type: application/json");
    //print($_FILES["qr_code"]["tmp_name"]);
?>
