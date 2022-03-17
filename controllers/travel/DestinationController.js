var destinationApp = angular.module("Destination", ['Session']);

var destinationController = function($scope, $http, SessionService){
    $('#origin').val("Terminal 2, México (Lic. Benito Juárez), 15620 Ciudad de México, CDMX, México")
    var map;
    $scope.destination = {}

    $scope.continue = function(){

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
        const geocoder = new google.maps.Geocoder();

        var marker = new google.maps.Marker({
            position: myPos,
            title:"Hello World!"
        });

        marker.setMap(map)
        
        google.maps.event.addListener(map, "center_changed", function() {
            var center = this.getCenter();
            var latitude = center.lat();
            var longitude = center.lng();
            marker.setPosition(this.getCenter())

            
        });

        google.maps.event.addListener(map, "dragend", function() {
            console.log(marker.getPosition().lat() + " " + marker.getPosition().lng())
            geocoder.geocode({ location: marker.getPosition() })
            .then((response) => {
                if (response.results[0]) {
                    $('#destination').val(response.results[0].formatted_address)
                    $scope.destination.adress = response.results[0].formatted_address
                    $scope.destination.lat = marker.getPosition().lat()
                    $scope.destination.lng = marker.getPosition().lng()
                    SessionService.set("dataDestination", $scope.destination)
                } else {
                    window.alert("No results found");
                }
            }).catch((e) => window.alert("Geocoder failed due to: " + e));
        });
    

    }

    validateNavigator()

}

destinationApp.controller("DestinationController", ['$scope', '$http', 'SessionService', destinationController]);