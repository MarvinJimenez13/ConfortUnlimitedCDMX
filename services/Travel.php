<?php 

include_once 'controllers/TravelController.php';

$postdata = json_decode(file_get_contents('php://input'), false);
$travel = new TravelController();
$travel->saveTravel($postdata);


?>