var confirmApp = angular.module("MatchMod", ['Session']);

var matchController = function($scope, $http, SessionService){
    var map;
    $scope.folio;
    $scope.matchDriver = {}
    $scope.driver = {}
    $scope.travel = {}
    
    $scope.getParameter = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    $scope.match = function(){
        $scope.match = {}
        $scope.match.driver = $scope.driver
        $scope.match.travel = $scope.travel
        $http.post('../services/Moderator.php?match=true', JSON.stringify($scope.match), {headers : {'Content-Type' : 'application/json'}})
        .then((response) =>{
            if(response.status == 200){
                alert("Match realizado!")
                window.location.href = "match?folio=" + $scope.folio
            }
        })
    }

    $scope.check = function(){
        $http.get('../services/Moderator.php?check=true&plate=' + $scope.matchDriver.plate)
        .then((response)=>{
            if(response.status == 200){
                $scope.driver = response.data
                $('#modalDriver').modal('show')
            }
        })
    }

    $scope.checkFolio = function(){
        if($scope.getParameter('folio') != "")
            $scope.getDataTravel($scope.getParameter('folio'))
        else
            console.log('Al lobby prro');
    }

    $scope.getDataTravel = function(folio){
        $scope.folio = folio;
        $http.get('../services/Pay.php?getDataTravel=true&folio=' + $scope.folio)
        .then(function(response){
            if(response.status == 200){
                $scope.travel = response.data;    
                validateNavigator()
            }else if(response.status == 204){
                alert("Folio no encontrado, al lobby.")
            }else{
                alert('Ocurrio un error, intente de nuevo.')
            }
        })
    }

    //Error Callback
    function show_error(error){
        switch(error.code) {
             case error.PERMISSION_DENIED:
                 var my = new google.maps.LatLng(19.48074521064234, -99.1310051625);
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
              
                  var myLatlng = new google.maps.LatLng($scope.travel.origin_lat, $scope.travel.origin_lng);
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

          var destinationLatLng = new google.maps.LatLng($scope.travel.destination_lat, $scope.travel.destination_lng);

          directionsService.route({
              origin: myPos,
              destination: {
                lat: destinationLatLng.lat(),
                lng: destinationLatLng.lng()
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

      $scope.checkFolio()

}

confirmApp.controller("MatchModController", ['$scope', '$http', 'SessionService', matchController]);