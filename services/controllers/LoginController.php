<?php

include_once 'DBController.php';
include_once 'models/Vendor.php';
include_once 'models/Driver.php';
include_once 'models/Moderator.php';

class LoginController{

    public function loginVendor($posdata){
        $controladorConexion = new DBController();
        $conexion = $controladorConexion->getConexion();

        $consulta = $conexion->query("SELECT * FROM vendors WHERE BINARY email = '$posdata->email' AND BINARY password = '$posdata->password'");
        if($consulta){
            $num = mysqli_num_rows($consulta);
            if($num >= 1){
                $row = mysqli_fetch_array($consulta);
                $vendor = new Vendor();
                $vendor->name = $row['name'];
                $vendor->last_name = $row['last_name'];
                $vendor->email = $row['email'];

                return json_encode($vendor);
                http_response_code(200);
            }else
                http_response_code(204);
        }else
            http_response_code(500); 
    }

    public function loginDriver($posdata){
        $controladorConexion = new DBController();
        $conexion = $controladorConexion->getConexion();

        $consulta = $conexion->query("SELECT * FROM drivers WHERE BINARY email = '$posdata->email' AND BINARY password = '$posdata->password'");
        if($consulta){
            $num = mysqli_num_rows($consulta);
            if($num >= 1){
                $row = mysqli_fetch_array($consulta);
                $driver = new Driver();
                $driver->name = $row['name'];
                $driver->last_name = $row['last_name'];
                $driver->plate_number = $row['plate_number'];
                $driver->email = $row['email'];

                return json_encode($driver);
                http_response_code(200);
            }else
                http_response_code(204);
        }else
            http_response_code(500); 
    }

    public function loginModerator($posdata){
        $controladorConexion = new DBController();
        $conexion = $controladorConexion->getConexion();

        $consulta = $conexion->query("SELECT * FROM moderators WHERE BINARY email = '$posdata->email' AND BINARY password = '$posdata->password'");
        if($consulta){
            $num = mysqli_num_rows($consulta);
            if($num >= 1){
                $row = mysqli_fetch_array($consulta);
                $moderator = new Moderator();
                $moderator->name = $row['name'];
                $moderator->last_name = $row['last_name'];
                $moderator->email = $row['email'];

                return json_encode($moderator);
                http_response_code(200);
            }else
                http_response_code(204);
        }else
            http_response_code(500); 
    }

}

?>