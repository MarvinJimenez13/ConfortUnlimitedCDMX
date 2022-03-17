<?php 

include_once 'phpqrcode/qrlib.php';

class QRController{

    public $respuesta;
    public $jsonAuth;

    public function generateQR($folio){
        //set it to writable location, a place for temp generated PNG files
        $PNG_TEMP_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
        //html PNG location prefix
        $PNG_WEB_DIR = 'temp/';
        //ofcourse we need rights to create temp dir
        if (!file_exists($PNG_TEMP_DIR))
            mkdir($PNG_TEMP_DIR);

        $filename = $PNG_TEMP_DIR.'test.png';
        $matrixPointSize = 10;
        $errorCorrectionLevel = 'L';
        $filename = $PNG_TEMP_DIR.$folio.'.png';

        QRcode::png($folio, $filename, $errorCorrectionLevel, $matrixPointSize, 2); 

        $this->respuesta = $PNG_WEB_DIR.basename($filename);
        
        return $this->respuesta;
    }

}

?>