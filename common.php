<?php
  $servername = 'vergil.u.washington.edu';
  $username = 'root';
  $password = 'Xdf2016zzh';
  $db = 'QR_code';
  $port = 20483;
  $db = new MySQLi($servername, $username, $password, $db, $port);
  if(!$db){
    die("Connection failed: ");
  }
  $db->query("use QR_code");

  function course_parse($str){
    $str = strtolower($str);
    $s = "";
    $num = false;
    for($i = 0; $i < strlen($str); $i++){
      if(ctype_alpha($str[$i])){
        $s = $s . $str[$i];
      } else if(is_numeric($str[$i])){
        if(!$num){
          $s = $s . " ";
          $num = true;
        }
        $s = $s . $str[$i];
      }
    }
    return $s;
  }
?>
