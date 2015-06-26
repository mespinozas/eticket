'use strict';

var resultName;
var resultLat;
var resultLon;
var resultAddress;

document.addEventListener("deviceready", init, false);

function init() {
	//Event Listener para scan QR
	try {
		document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	} catch (e) {
	}
	//Cargar listado productos
	try {
		document.querySelector("#loadStores").addEventListener("touchend", loadStoreList, false);
	} catch (e) {
	}
	//Jquery actualizacion de Datos consulta
	resultName = document.querySelector("#name");
	resultLat = document.querySelector("#lat");
	resultLon = document.querySelector("#lon");
	resultAddress = document.querySelector("#address");
};

//Knockout observable extension to avoid null values
ko.extenders.defaultIfNull = function(target, defaultValue) {
    var result = ko.computed({
        read: target,
        write: function(newValue) {
            if (!newValue) {
                target(defaultValue);
            } else {
                target(newValue);
            }
        }
    });

    result(target());

    return result;
};

//Store View Model
var StoreViewModel = function(){
 	var self = this;

	self._name = ko.observable().extend({ defaultIfNull: "" });
	self._lat = ko.observable().extend({ defaultIfNull: "" });
	self._lon = ko.observable().extend({ defaultIfNull: "" });
	self._address = ko.observable().extend({ defaultIfNull: "" });
	self._storeList = ko.observableArray();
	self._id = ko.observable().extend({ defaultIfNull: 0 });
	self.showList = function(){
		self.getAll();
  	};

	//obtiene todas las tiedas
  	self.getAll = function()
	{
    	var url = 'http://etickettest-mespinozas.rhcloud.com/api/stores/';
	    $.ajax({
	        url: 	url,
	        type: 	'GET',
	        dataType: 'json',
	        contentType: 'application/json; charset=utf-8',
	        success: function(data){
				self._storeList(data);
	        },
	        error: function(xhr, type){
	            console.error(xhr);
	            console.error(type);
				//alert(xhr+" "+type );
	        }
    	});
	};

  /*self.get = function(uri){
		//var uri = 'http://etickettest-mespinozas.rhcloud.com:8000/api/products/';
    $.ajax({
        url: 	uri,
        type: 	'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            console.log(data);
						this =JSON.parse(data);
        },
        error: function(xhr, type){
            console.error(xhr);
            console.error(type);
        }
    });
  };*/
	//Get an specific Store by Id
	this.getStoreById = function(id)
	{
    	var uri = 'http://etickettest-mespinozas.rhcloud.com/api/stores/'+id;
	    $.ajax({
	        url: 	uri,
	        type: 'GET',
	        dataType: 'json',
	        contentType: 'application/json; charset=utf-8',
	        success: function(data){
				console.log(data);
				resultName.value=data._name;
				resultLat.value=data._lat;
				resultLon.value=data._lon;
				resultAddress.value=data._address;
	        },
	        error: function(xhr, type){
				alert('Code not associated to a store');
				console.error(xhr);
	            console.error(type);
	        }
	    });
  	};
};

//Binding de knockoutjs
var vm = new StoreViewModel();
ko.applyBindings(vm, $('#main-wrapper')[0]);

//Barcode scanner plugin integration
function startScan() {
	//
	cordova.plugins.barcodeScanner.scan(
		function (result) {
      		vm.getStoreById(result.text);
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}
function loadStoreList() {
    vm.getAll();
}
