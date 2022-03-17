<?php 

include_once 'controllers/QRValidateController.php';

if(isset($_GET['folio'])){
    $qrValidate = new QRValidateController();
    echo $qrValidate->validate($_GET['folio']);
}

?>