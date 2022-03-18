<?php 

include_once 'controllers/PayController.php';

$pay = new PayController();

if(isset($_GET['getDataTravel']) && isset($_GET['folio']))
    echo $pay->getDataTravel($_GET['folio']);

?>