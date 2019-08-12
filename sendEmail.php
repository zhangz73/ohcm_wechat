<?php
    if(strlen(trim($_POST["user"])) > 0){
        $email = $_POST["user"] . "@uw.edu";
        $code = $_POST["code"];
        $from = "no-reply@ohcm.washington.edu";
        $message = "验证码为{$code}，请不要将验证码分享给别人";
        $subject = "Validation Code";
        $headers = "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: <" . $from . ">" . "\r\n";
        mail($email, $subject, $message, $headers);
    }
?>
