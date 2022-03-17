<?php

include_once 'DBController.php';
include_once 'QRController.php';

class TravelController{

    public function saveTravel($postdata){
        $dbController = new DBController();
        $conexion = $dbController->getConexion();

        $user = $postdata->dataUser;
        $saveUser = $conexion->query("INSERT INTO users (email, phone, name, last_name) VALUES ('$user->email', '$user->phone', '$user->name', '$user->lastName')");

        //Consultamos el id del usuario con el email
        $getIDUser = $conexion->query("SELECT iduser FROM users WHERE email = '$user->email'");
        $rowID = mysqli_fetch_array($getIDUser);
        $idUser = $rowID['iduser'];

        $travelOrigin = $postdata->dataOrigin;
        $travelDestination = $postdata->dataDestination;
        date_default_timezone_set('America/Mexico_City');
        $date = date("Y-m-d H:i:s");

        $folio = $this->generateFolio($conexion);

        $daveTravel = $conexion->query("INSERT INTO travels (users_iduser, origin, destination, origin_lat, origin_lng, destination_lat, destination_lng, price,
                                            status, date, folio) VALUES ('$idUser', '$travelOrigin->adress', '$travelDestination->adress', '$travelOrigin->lat', '$travelOrigin->lng',
                                            '$travelDestination->lat', '$travelDestination->lng', '0.00', 'false', '$date', '$folio')");

        //Generar QR
        $QR = new QRController();
        $QR->generateQR($folio);
    }

    public function generateFolio($conexion){
        $dateFolio = date('Ymd');
        $folio = "CU".$dateFolio.rand(10, 99).rand(10, 99);

        $consultaExistencia = $conexion->query("SELECT folio FROM travels WHERE folio = '$folio'");
        $row = mysqli_num_rows($consultaExistencia);
        if($row >= 1)
            $this->generateFolio($conexion);
        else
            return $folio;
    }

}

?>