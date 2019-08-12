<?php
  include('common.php');
  $usr = $_POST["email"];
  $passcode = $_POST["password"];
    $db->query("insert into Downloaders values (\"{$usr}\", \"{$passcode}\")");
    $db->close();
?>
