'use strict';

var resultName;
var resultLat;
var resultLon;
var resultAddress;

document.addEventListener("deviceready", init, false);

function init() {
	//Event Listener to scan QR
	try {
		document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	} catch (e) {
	}
	//Load product list
	try {
		document.querySelector("#loadSales").addEventListener("touchend", loadSaleList, false);
	} catch (e) {
	}
	//Jquery update info
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

//Sale View Model
var SaleViewModel = function(){
 	var self = this;
	self._date = ko.observable().extend({ defaultIfNull: "" });
    self._store= ko.observable().extend({ defaultIfNull: "" });
    self._status= ko.observable().extend({ defaultIfNull: "" });
    self._client= ko.observable().extend({ defaultIfNull: "" });
    self._total= ko.observable().extend({ defaultIfNull: "" });

	self._cart: [{
        _units: {type: Number, required:true},
        _product: {type: String, required:true},
        _discount:  {type: Number, required:true},
        _cost: {type: Number, required:true}
        }]

	self._saleList = ko.observableArray();
	self._id = ko.observable().extend({ defaultIfNull: 0 });
	self.showList = function(){
		self.getAll();
  	};

	//obtiene todas las tiedas
  	self.getAll = function()
	{
    	var url = 'http://etickettest-mespinozas.rhcloud.com/api/sales/';
	    $.ajax({
	        url: 	url,
	        type: 	'GET',
	        dataType: 'json',
	        contentType: 'application/json; charset=utf-8',
	        success: function(data){
				self._saleList(data);
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
	//Get an specific Sale by Id
	this.getSaleById = function(id)
	{
    	var uri = 'http://etickettest-mespinozas.rhcloud.com/api/sales/'+id;
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
				alert('Code not associated to a sale');
				console.error(xhr);
	            console.error(type);
	        }
	    });
  	};
};

//Binding de knockoutjs
var vm = new SaleViewModel();
ko.applyBindings(vm, $('#main-wrapper')[0]);

//Barcode scanner plugin integration
function startScan() {
	//
	cordova.plugins.barcodeScanner.scan(
		function (result) {
      		vm.getSaleById(result.text);
		},
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
}
function loadSaleList() {
    vm.getAll();
}
