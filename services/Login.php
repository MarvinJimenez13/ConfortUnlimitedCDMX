<?php 

include_once 'controllers/LoginController.php';

$login = new LoginController();
$postdata = json_decode(file_get_contents('php://input'), false);

if(isset($_GET['loginVendor']))
    echo $login->loginVendor($postdata);
else if(isset($_GET['loginDriver']))
    echo $login->loginDriver($postdata);
else if(isset($_GET['loginModerator']))
    echo $login->loginModerator($postdata);



?>