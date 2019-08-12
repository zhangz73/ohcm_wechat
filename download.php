<?php
  include('common.php');
  $usr = $_POST["user"];
  $passcode = $_POST["password"];
  $cnt = 0;
  if(strlen(trim($usr)) > 0){
    $res = $db->query("select * from Downloaders where netid = \"{$usr}\" and passcode = \"{$passcode}\"");
    $cnt = $res->num_rows;
    $db->close();
  }
  $data["cnt"] = $cnt;
  header('Content-Type: application/json');
  print(json_encode($data));
?>
