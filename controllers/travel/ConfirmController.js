var map;

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

if (navigator.geolocation){ 
  navigator.geolocation.getCurrentPosition(function(position){ 

      position.coords.latitude; 
      position.coords.longitude; 
  
      var myLatlng = new google.maps.LatLng(19.42175874606113, -99.08012728561806);
      initialize(myLatlng);  
  },  show_error);
}else
    console.log('Error en la geolocalizacion.');

function initialize(myPos) {
    var myOptions = {
        zoom: 15,
        center: myPos,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

    var marker = new google.maps.Marker({
        draggable: true,
        position: myPos, 
        map: map,
        title: "Tu locación."
    });
}