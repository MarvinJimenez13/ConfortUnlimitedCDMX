<?php 

include_once 'DBController.php';
include_once 'models/Travel.php';

class PayController{

    public function getDataTravel($folio){
        $controladorConexion = new DBController();
        $conexion = $controladorConexion->getConexion();

        $consulta = $conexion->query("SELECT * FROM travels INNER JOIN users WHERE travels.folio = '$folio' AND users.iduser = travels.users_iduser");
        if($consulta){
            $num = mysqli_num_rows($consulta);
            if($num >= 1){//HAY REGISTRO
                $rowData = mysqli_fetch_array($consulta);
                $travel = new Travel();
                $travel = $rowData;
                /*
                $travel->idtravel = $rowData['idtravel'];
                $travel->users_idusers = $rowData['users_iduser'];
                $travel->origin = $rowData['origin'];
                $travel->destination = $rowData['destination'];
                $travel->origin_lat = $rowData['origin_lat'];
                $travel->origin_lng = $rowData['origin_lng'];
                $travel->destination_lat = $rowData['destination_lat'];
                $travel->destination_lng = $rowData['destination_lng'];
                $travel->price = $rowData['price'];
                $travel->status = $rowData['status'];
                $travel->date = $rowData['date'];
                $travel->drivers_iddriver = $rowData['drivers_iddriver'];
                
                //USER DATA
                $travel->email = $rowData['email'];
                $travel->phone = $rowData['phone'];
                $travel->name = $rowData['name'];
                $travel->last_name = $rowData['last_name'];*/

                http_response_code(200);
                return json_encode($travel);
            }else//NO HAY REGISTRO
                http_response_code(204);
        }
    }

}

?>