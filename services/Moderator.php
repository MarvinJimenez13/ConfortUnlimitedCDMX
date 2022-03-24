<?php

include_once 'controllers/ModeratorController.php';

$moderator = new ModeratorController();

if(isset($_GET['check']) && isset($_GET['plate'])){
    echo $moderator->check($_GET['plate']);
}else if(isset($_GET['match'])){
    $postdata = json_decode(file_get_contents('php://input'), false);
    echo $moderator->match($postdata);
}

?>