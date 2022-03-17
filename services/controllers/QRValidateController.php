<?php 

include_once 'models/ResponseQRValidate.php';
include_once 'DBController.php';

class QRValidateController{

    public function validate($folio){
        $valid = new ResponseQRValidate();

        $controladorConexion = new DBController();
        $conexion = $controladorConexion->getConexion();

        $validar = $conexion->query("SELECT COUNT(*) AS num FROM travels WHERE folio = '$folio'");
        if($validar){
            $row = mysqli_fetch_array($validar);
            if($row['num'] == 0)
                $valid->isValid = false;
            else
                $valid->isValid = true;
        }else
            $valid->isValid = false;

        http_response_code(200);
        return json_encode($valid); 
    }

}

?>