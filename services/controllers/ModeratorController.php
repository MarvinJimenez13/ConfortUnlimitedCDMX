<?php 

include_once 'DBController.php';
include_once 'models/Driver.php';

class ModeratorController{

    public function match($postdata){
        $controladorConexion = new DBController();
        $conexion = $controladorConexion->getConexion();

        $idDriver = $postdata->driver->iddriver;
        $idTravel = $postdata->travel->idtravel;

        $match = $conexion->query("UPDATE travels SET drivers_iddriver = '$idDriver' WHERE idtravel = '$idTravel'");
        if($match)
            http_response_code(200);
        else
            http_response_code(500);
    }

    public function check($plate){
        $controladorConexion = new DBController();
        $conexion = $controladorConexion->getConexion();

        $consultaPlate = $conexion->query("SELECT * FROM drivers WHERE plate_number = '$plate'");
        if($consultaPlate){
            $numRows = mysqli_num_rows($consultaPlate);
            //VERIFICAR QUE EXISTE PLATE
            if($numRows >= 1){
                $driver = new Driver();
                $rowData = mysqli_fetch_array($consultaPlate);
                $driver = $rowData;

                http_response_code(200);
                return json_encode($driver);
            }else
                http_response_code(204);
        }else
            http_response_code(500);
    }   

}

?>