<?php
    $url = $_POST["target"];
    if(isset($_POST["fname"])){
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        //$arr = array($_POST['fname'] => '@'. $_FILES[$_POST['fname']]['tmp_name']);
        //array_push($arr, $_POST);
        $_POST["fdata"] = base64_encode(file_get_contents($_FILES[$_POST['fname']]['tmp_name']));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);
        $result = curl_exec($ch);
        header('Content-Type: application/json');
        print($result);
        print(json_encode($_POST));
    } else{
        $options = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => "POST",
                'content' => http_build_query($_POST)
            )
        );
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        header('Content-Type: application/json');
        print($result);
    }
?>
