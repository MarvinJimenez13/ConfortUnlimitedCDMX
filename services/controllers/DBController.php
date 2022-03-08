<?php 

include_once 'Constants.php';

class DBController{

    public $DB_HOST = "localhost";
    public $DB_USUARIO = "root";
    public $DB_CONTRASENA = "";
    public $DB = "confort_unlimited_db";
    public $CHARSET = "UTF8";
    public $conexion;

    public function getConexion(){
        $this->conexion = mysqli_connect($this->DB_HOST, $this->DB_USUARIO, $this->DB_CONTRASENA);
        if(mysqli_connect_errno())
            return "Error en la conexión: ". mysqli_connect_error();

        mysqli_set_charset($this->conexion, $this->CHARSET);
        mysqli_select_db($this->conexion, $this->DB) or die(Constants::$ERROR_GET_CONEXION);
        
         return $this->conexion;
    }

}
?>