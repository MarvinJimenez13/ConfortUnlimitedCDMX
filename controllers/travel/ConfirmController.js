var confirmApp = angular.module("Confirm", ['Session']);

var confirmController = function($scope, $http, SessionService){
    var map;

    $scope.dataUser = SessionService.tryGet("dataUser")
    $scope.dataDestination = SessionService.tryGet("dataDestination")

    $scope.confirm = function(){
      $scope.dataOrigin = {}
      $scope.travel = {}

      $scope.dataOrigin.adress = "Terminal 2, México (Lic. Benito Juárez), 15620 Ciudad de México, CDMX, México"
      $scope.dataOrigin.lat = 19.42175874606113
      $scope.dataOrigin.lng = -99.08012728561806
      $scope.travel.dataUser = $scope.dataUser
      $scope.travel.dataOrigin = $scope.dataOrigin
      $scope.travel.dataDestination = $scope.dataDestination

      $http.post('../services/Travel.php', JSON.stringify($scope.travel), {headers: {'Content-Type' : 'application/json'}})
      .then((response)=>{
        console.log(response)
      })
    }

    //Error Callback
    function show_error(error){
      switch(error.code) {
           case error.PERMISSION_DENIED:
               var my = new google.maps.LatLng(19.42175874606113, -99.08012728561806);
               initialize(my); 
               swal("¡Oh no!", "Permiso de usuario denegado para obtener su ubicación.", "warning");
               break;
           case error.POSITION_UNAVAILABLE:
               swal("¡Oh no!", "Locación no disponible.", "warning");
               break;
           case error.TIMEOUT:
               swal("¡Oh no!", "Petición fallida.", "warning");
               break;
           case error.UNKNOWN_ERROR:
               swal("¡Oh no!", "Error desconocido..", "warning");
               break;
       }
    }
       
    function validateNavigator(){
        if (navigator.geolocation){ 
            navigator.geolocation.getCurrentPosition(function(position){ 
                position.coords.latitude; 
                position.coords.longitude; 
            
                var myLatlng = new google.maps.LatLng(19.42175874606113, -99.08012728561806);
                initialize(myLatlng);  
            },  show_error);
        }else
              console.log('Error en la geolocalizacion.');
    }
    
    function initialize(myPos) {
        var myOptions = {
            zoom: 15,
            center: myPos,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 
    
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#000000" } });
        directionsDisplay.setMap(map);

        directionsService.route({
            origin: myPos,
            destination: {
              lat: $scope.dataDestination.lat,
              lng: $scope.dataDestination.lng
            },
            travelMode: 'DRIVING'
          }, function (response, status) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
    }

    validateNavigator()

}

confirmApp.controller("ConfirmController", ['$scope', '$http', 'SessionService', confirmController]);
