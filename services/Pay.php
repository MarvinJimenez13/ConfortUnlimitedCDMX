<?php 

include_once 'controllers/PayController.php';

$pay = new PayController();

if(isset($_GET['getDataTravel']) && isset($_GET['folio'])){
    echo $pay->getDataTravel($_GET['folio']);
}else if(isset($_GET['confirm'])){
    $postdata = json_decode(file_get_contents('php://input'), false);
    echo $pay->confirm($postdata);
}

?>