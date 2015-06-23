(function (global) {
    "use strict";
    // $(function(){
    //   $('.button-collapse').sideNav();
    // });
    var gotScript = 0;

    function onDeviceReady () {
        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);
		//navigator.geolocation.getCurrentPosition(loadMapsApi, onError);
        $('.button-collapse').sideNav();
        loadMapsApi();
    }

    function onOnline () {
        loadMapsApi();
    }

    function onResume () {
        loadMapsApi();
    }

    function loadMapsApi () {
        if(navigator.connection.type === Connection.NONE  || (global.google !== undefined && global.google.maps)) {
            return;
        }
        // if (!gotContacts){
        //     $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDiJNpwF9wcDO6wVQn2W4ktXOwFEtfqYLs&sensor=true&callback=onMapsApiLoaded', function() {
        //         gotContacts = 1;
        //     });
        // }
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDiJNpwF9wcDO6wVQn2W4ktXOwFEtfqYLs&sensor=true&callback=onMapsApiLoaded');
    }

    global.onMapsApiLoaded = function () {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };

    document.addEventListener("deviceready", onDeviceReady, false);
})(window);

var onSuccess = function(position) {
	var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;
    //alert(myLong+" "+myLat);            //MAP
    var mapOptions = {
        center: new google.maps.LatLng(myLat, myLong),
        zoom: 14
    };
	//alert(" ok2");
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//alert(" ok3");
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(myLat, myLong),
        map: map,
        title:"My Position"
    });

	var ctaLayer = new google.maps.KmlLayer({
		url: 'https://sites.google.com/site/eticketkml/Jumbo.kml'
	});
	ctaLayer.setMap(map);
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
