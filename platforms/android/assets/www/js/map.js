// JavaScript Document
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}


var onSuccess = function(position) {
	var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;
                //MAP
    var mapOptions = {
        center: new google.maps.LatLng(myLat, myLong),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(myLat, myLong),
        map: map,
        title:"My Position"
    });
	var ctaLayer = new google.maps.KmlLayer({
		url: 'https://drive.google.com/open?id=0Bx7rjujOsf2bUFN3UEJhUXlVTDg&authuser=0'
	});
	ctaLayer.setMap(map);
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

// onSuccess Geolocation
			//


navigator.geolocation.getCurrentPosition(onSuccess, onError);
