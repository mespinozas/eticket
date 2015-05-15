'use strict';

var resultName;
var resultLat;
var resultLon;
var resultAddress;

document.addEventListener("deviceready", init, false);

function init() {
	try {
		document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	} catch (e) {
	}
	try {
		document.querySelector("#loadStores").addEventListener("touchend", loadStoreList, false);
	} catch (e) {
	}
	resultName = document.querySelector("#name");
	resultLat = document.querySelector("#lat");
	resultLon = document.querySelector("#lon");
	resultAddress = document.querySelector("#address");
};

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
				alert(xhr+" "+type );
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
				alert('Tienda No Encontrada');
				console.error(xhr);
	            console.error(type);
	        }
	    });
  	};
};
var vm = new StoreViewModel();
ko.applyBindings(vm, $('#main-wrapper')[0]);

function startScan() {
	cordova.plugins.barcodeScanner.scan(
		function (result) {
      		vm.getStoreById(result.text);
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}
function loadProductList() {
    vm.getAll();
}
